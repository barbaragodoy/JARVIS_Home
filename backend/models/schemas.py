"""Pydantic schemas for request/response validation."""

from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr


# ─── Token ────────────────────────────────────────────────────────────────────


class Token(BaseModel):
    """JWT token response schema."""

    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Data extracted from a JWT token."""

    email: Optional[str] = None


# ─── User ─────────────────────────────────────────────────────────────────────


class UserCreate(BaseModel):
    """Schema for creating a new user."""

    email: str
    username: str
    password: str


class UserUpdate(BaseModel):
    """Schema for updating an existing user."""

    email: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None


class UserResponse(BaseModel):
    """Schema for user API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    username: str
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: datetime


# ─── Session ──────────────────────────────────────────────────────────────────


class SessionCreate(BaseModel):
    """Schema for creating a new agent session."""

    name: str
    type: Optional[str] = None
    config: Optional[Dict[str, Any]] = None


class SessionUpdate(BaseModel):
    """Schema for updating an existing session."""

    name: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    config: Optional[Dict[str, Any]] = None


class SessionResponse(BaseModel):
    """Schema for session API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    status: str
    type: Optional[str]
    config: Optional[Dict[str, Any]]
    user_id: int
    created_at: datetime
    updated_at: datetime


# ─── Automation ───────────────────────────────────────────────────────────────


class AutomationCreate(BaseModel):
    """Schema for creating a new automation rule."""

    name: str
    description: Optional[str] = None
    trigger_type: str
    trigger_config: Optional[Dict[str, Any]] = None
    action_type: str
    action_config: Optional[Dict[str, Any]] = None
    is_active: bool = True


class AutomationUpdate(BaseModel):
    """Schema for updating an existing automation."""

    name: Optional[str] = None
    description: Optional[str] = None
    trigger_type: Optional[str] = None
    trigger_config: Optional[Dict[str, Any]] = None
    action_type: Optional[str] = None
    action_config: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None


class AutomationResponse(BaseModel):
    """Schema for automation API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: Optional[str]
    trigger_type: str
    trigger_config: Optional[Dict[str, Any]]
    action_type: str
    action_config: Optional[Dict[str, Any]]
    is_active: bool
    last_run: Optional[datetime]
    run_count: int
    user_id: int
    created_at: datetime
    updated_at: datetime


# ─── Event ────────────────────────────────────────────────────────────────────


class EventCreate(BaseModel):
    """Schema for creating a new event."""

    event_type: str
    source: str
    data: Optional[Dict[str, Any]] = None
    priority: str = "medium"


class EventResponse(BaseModel):
    """Schema for event API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    event_type: str
    source: str
    data: Optional[Dict[str, Any]]
    priority: str
    processed: bool
    created_at: datetime


# ─── Integration ──────────────────────────────────────────────────────────────


class IntegrationCreate(BaseModel):
    """Schema for creating a new integration."""

    name: str
    type: str
    config: Optional[Dict[str, Any]] = None


class IntegrationUpdate(BaseModel):
    """Schema for updating an existing integration."""

    name: Optional[str] = None
    type: Optional[str] = None
    config: Optional[Dict[str, Any]] = None
    status: Optional[str] = None


class IntegrationResponse(BaseModel):
    """Schema for integration API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    type: str
    config: Optional[Dict[str, Any]]
    status: str
    last_heartbeat: Optional[datetime]
    user_id: int
    created_at: datetime
    updated_at: datetime
