from typing import Optional
from sqlalchemy import Integer, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import mapped_column, Mapped

from app.database.metabase import Base


class NotificationChannel(Base):
    id = mapped_column(Integer, primary_key=True)
    tg_id: Mapped[Optional[str]]
    tg_chat_id: Mapped[Optional[int]]
    email: Mapped[Optional[str]]

    __table_args__ = (
        CheckConstraint("(tg_chat_id IS NULL AND tg_id is NULL) != (email IS NULL)"),
        UniqueConstraint("tg_id", "email"),
    )
