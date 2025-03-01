from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from aiogram.types import Update

from app import bot
from app.controller import NotificationChannelController
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
    allow_origin=["https://localhost:5173", "https://закуп-ай.рф"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    NotificationChannelController.router, prefix="/notification_channels"
)


@app.post("/tg/webhook")
async def tg_webhook(request: Request) -> None:
    update = Update.model_validate(await request.json(), context={"bot": bot.bot})
    await bot.dispatcher.feed_update(bot.bot, update)


@app.get("/health")
def health():
    return "ok"
