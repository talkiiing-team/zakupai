from fastapi import APIRouter

router = APIRouter(prefix="/dynamic_router")

@router.post("/get_available_values")
def get_filter_values():
    pass