from pydantic import BaseModel

from app.dto.JoinSequenceDataInfoDto import TableJoinDescription, TableFilterFrontDto


class SelectedFilter(BaseModel):
    table: str
    column: str
    type: str
    value_for_select: list[str] | None = None
    value_for_range: str | None = None
    comparator_sign_for_range: str | None = None
    is_array: bool = False


class DynamicFilterDto(BaseModel):
    table_join_description: TableJoinDescription
    requested_filter_value: TableFilterFrontDto
    selected_filters: list[SelectedFilter]

class DynamicFilterResponseDto(BaseModel):
    unique_values_for_options: list[str]