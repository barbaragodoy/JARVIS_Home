"""JARVIS Home API - Main application module."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from models.database import engine, Base


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan handler for startup and shutdown events."""
    import redis.asyncio as aioredis

    # Startup: create database tables and connect to Redis
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    app.state.redis = aioredis.from_url(
        settings.REDIS_URL,
        encoding="utf-8",
        decode_responses=True,
    )

    yield

    # Shutdown: close Redis connection and dispose engine
    await app.state.redis.close()
    await engine.dispose()


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Sistema de automação residencial inteligente com agentes LangGraph",
    version=settings.VERSION,
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
# from api.routes import events, integrations, automations, sessions
# app.include_router(events.router, prefix=settings.API_PREFIX)
# app.include_router(integrations.router, prefix=settings.API_PREFIX)
# app.include_router(automations.router, prefix=settings.API_PREFIX)
# app.include_router(sessions.router, prefix=settings.API_PREFIX)


@app.get("/")
async def root() -> dict:
    """Root endpoint returning API status information."""
    return {
        "status": "online",
        "version": settings.VERSION,
        "project": settings.PROJECT_NAME,
    }


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint for monitoring and container orchestration."""
    return {
        "status": "healthy",
        "version": settings.VERSION,
    }
