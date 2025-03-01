from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app import bot
from app.controller import notification_channels
from app.controller import tg
from app.settings import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await bot.bot.set_webhook(
        url=settings.tg_webhook_url,
        allowed_updates=bot.dispatcher.resolve_used_update_types(),
        drop_pending_updates=True,
    )
    yield
    await bot.bot.delete_webhook()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173", "https://закуп-ай.рф"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notification_channels.router, prefix="/notification_channels")
app.include_router(tg.router, prefix="/tg")


@app.get("/health")
def health():
    return "ok"
