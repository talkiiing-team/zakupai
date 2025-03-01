from typing import Annotated

from clickhouse_connect.driver import Client
from fastapi import APIRouter, Depends

from app.clickhouse.ClickhouseConnection import get_clickhouse_connection
from app.dto.DynamicFilterDto import DynamicFilterDto, DynamicFilterResponseDto
from app.request_builder.RequestBuilder import get_filter_value

router = APIRouter(prefix="/dynamic_filter")


@router.post("/get_available_values")
def get_filter_values(
        dynamic_filter_dto: DynamicFilterDto,
        client: Annotated[Client, Depends(get_clickhouse_connection)]
) -> DynamicFilterResponseDto | None:
    return get_filter_value(dynamic_filter_dto, client)
