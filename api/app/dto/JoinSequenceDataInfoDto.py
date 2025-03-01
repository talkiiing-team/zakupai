from pydantic import BaseModel


class JoinSequenceDataInfoDto(BaseModel):
    left_join_table: str
    right_join_table: str


class JoinSequenceDataInfoRuleDto(BaseModel):
    left_join_table: str
    right_join_table: str
    condition: str

class TableJoinDescription(BaseModel):
    base_table: str
    join_sequence: list[JoinSequenceDataInfoDto]


class FilterDto(BaseModel):
    type: str = "select"
    column: str
    is_array: bool = False


class TableFiltersDto(BaseModel):
    table: str
    filters: list[FilterDto]

class TableFilterFrontDto(BaseModel):
    table: str
    type: str
    column: str
    is_array: bool
