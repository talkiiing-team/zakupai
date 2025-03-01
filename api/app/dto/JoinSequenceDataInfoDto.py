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
