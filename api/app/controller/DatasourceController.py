from typing import Annotated

from clickhouse_connect.dbapi import Connection
from clickhouse_connect.driver import Client
from fastapi import APIRouter, Depends

from app.clickhouse.ClickhouseConnection import get_clickhouse_connection
from app.dto.JoinSequenceDataInfoDto import TableJoinDescription, FilterDto, TableFilterFrontDto
from app.request_builder.RequestBuilder import get_available_join_list, build_source, get_all_available_filters

router = APIRouter()


@router.get("/get_available_join_tables")
def get_available_join_table():
    return get_available_join_list()


@router.get("/table_list")
def get_table_list() -> list[str]:
    return ['sessions', 'customers', 'winners', 'supplies', 'participants']


@router.post("/datasource_constructor")
def get_join_sequence_list(
        table_list: TableJoinDescription,
        connection: Annotated[Client, Depends(get_clickhouse_connection)],
        limit: int | None = 100
) -> list[dict]:
    return build_source(table_list, connection, limit)


@router.post("/get_table_filters")
def get_table_filters(table_join_description: TableJoinDescription) -> list[TableFilterFrontDto]:
    return get_all_available_filters(table_join_description)