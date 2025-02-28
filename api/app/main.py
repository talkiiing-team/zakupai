from fastapi import FastAPI

from app.settings import settings

app = FastAPI()


@app.get("/health")
def health():
    return "ok"
