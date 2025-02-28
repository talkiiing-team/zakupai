from fastapi import FastAPI

from app.controller import DatasourceController

app = FastAPI()

app.include_router(DatasourceController.router, prefix="/datasource")

@app.get("/health")
def health():
    return "ok"



print(app.routes)
