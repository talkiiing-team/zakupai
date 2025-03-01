from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.bot import bot, dispatcher
from app.controller import tg, notification_channels, schedulers
from app.settings import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await bot.set_webhook(
        url=settings.tg_webhook_url,
        allowed_updates=dispatcher.resolve_used_update_types(),
        drop_pending_updates=True,
    )
    yield
    await bot.delete_webhook()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notification_channels.router, prefix="/notification_channels")
app.include_router(tg.router, prefix="/tg")
app.include_router(schedulers.router, prefix="/schedulers")


@app.get("/health")
def health():
    return "ok"
