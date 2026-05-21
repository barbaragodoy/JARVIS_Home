"""API dependencies for dependency injection."""

from typing import AsyncGenerator

import redis.asyncio as aioredis
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.security import oauth2_scheme, verify_token
from models.database import async_session_factory


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Provide a transactional database session.

    Yields:
        AsyncSession: SQLAlchemy async session instance.
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def get_redis(request: Request) -> aioredis.Redis:
    """Retrieve the Redis connection from application state.

    Args:
        request: FastAPI request object.

    Returns:
        Redis async client instance.
    """
    return request.app.state.redis


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Validate JWT token and return the current authenticated user.

    Args:
        token: JWT bearer token from the request.
        db: Database session dependency.

    Returns:
        User data dictionary from the database.

    Raises:
        HTTPException: If token is invalid or user is not found.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = verify_token(token)
    if payload is None:
        raise credentials_exception

    user_email: str | None = payload.get("sub")
    if user_email is None:
        raise credentials_exception

    from models.models import User
    from sqlalchemy import select

    result = await db.execute(select(User).where(User.email == user_email))
    user = result.scalar_one_or_none()

    if user is None:
        raise credentials_exception

    return user
