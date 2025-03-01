from pydantic import BaseModel

from app.dto.JoinSequenceDataInfoDto import TableJoinDescription, TableFilterFrontDto


class SelectedFilter(BaseModel):
    table: str
    column: str
    type: str


class DynamicFilterDto(BaseModel):
    table_join_description: TableJoinDescription
    requested_filter_value: TableFilterFrontDto
    selected_filters: list[SelectedFilter]