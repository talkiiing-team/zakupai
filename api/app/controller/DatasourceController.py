from fastapi import APIRouter

from app.request_builder.RequestBuilder import get_available_join_list

router = APIRouter()



@router.get("/get_available_join_tables")
def get_available_join_table():
    return get_available_join_list()


@router.get("/table_list")
def get_table_list() -> list[str]:
    return ['sessions', 'customers', 'winners', 'supplies', 'participants']
