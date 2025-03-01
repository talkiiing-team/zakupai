from typing import List

from clickhouse_connect.dbapi import Connection
from clickhouse_connect.driver import Client

from app.dto.JoinSequenceDataInfoDto import JoinSequenceDataInfoDto, JoinSequenceDataInfoRuleDto, TableJoinDescription

sessions_to_customer_condition = 'sessions.customer_inn = customers.customer_inn'
sessions_to_winners_conditions = 'sessions.ks_prime_id = winners.ks_prime_id'
sessions_to_supplies_conditions = 'sessions.winner_inn = supplies.inn'
sessions_to_participants_conditions = 'sessions.ks_prime_id = participants.ks_prime_id'
customers_to_supplies_condition = 'customers.customer_inn = supplies.inn'
winners_to_participants_conditions = 'winners.ks_prime_id = participants.ks_prime_id'
supplies_to_winners_condition = 'supplies.inn = winners.winner_inn'
join_list = [
    JoinSequenceDataInfoRuleDto(
        left_join_table='sessions',
        right_join_table='customers',
        condition=sessions_to_customer_condition,
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='sessions',
        right_join_table='winners',
        condition=sessions_to_winners_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='sessions',
        right_join_table='supplies',
        condition=sessions_to_supplies_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='sessions',
        right_join_table='participants',
        condition=sessions_to_participants_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='customers',
        right_join_table='sessions',
        condition=sessions_to_customer_condition
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='customers',
        right_join_table='supplies',
        condition=customers_to_supplies_condition
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='winners',
        right_join_table='sessions',
        condition=sessions_to_winners_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='winners',
        right_join_table='participants',
        condition=winners_to_participants_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='supplies',
        right_join_table='sessions',
        condition=sessions_to_supplies_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='supplies',
        right_join_table='customers',
        condition=customers_to_supplies_condition
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='supplies',
        right_join_table='winners',
        condition=sessions_to_winners_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='participants',
        right_join_table='sessions',
        condition=sessions_to_participants_conditions
    ),
    JoinSequenceDataInfoRuleDto(
        left_join_table='participants',
        right_join_table='winners',
        condition=winners_to_participants_conditions
    )
]


def build_join_source(join_sequence_data_info: List[JoinSequenceDataInfoDto]) -> str:
    pass


def get_available_join_list():
    return list(
        map(
            lambda join_sequence_data_info_rule: JoinSequenceDataInfoDto(
                left_join_table=join_sequence_data_info_rule.left_join_table,
                right_join_table=join_sequence_data_info_rule.right_join_table
            ),
            join_list
        )
    )


def build_source(
        source_description: TableJoinDescription,
        connection: Client,
        limit: int | None
):
    select_part = f"SELECT * FROM {source_description.base_table}"
    for join in source_description.join_sequence:
        selection_rool = list(
            filter(
                lambda
                    join_sequence_data_info_rule: join_sequence_data_info_rule.left_join_table == join.left_join_table and
                                                  join_sequence_data_info_rule.right_join_table == join.right_join_table,
                join_list
            )
        )[0]
        select_part += f" JOIN {join.right_join_table} ON {selection_rool.condition}"
    if limit is not None:
        select_part += f" LIMIT {limit}"
    return get_select_data(select_part, connection)

def get_select_data(query: str, connection: Client) -> list[dict]:
    result = connection.query(query)
    columns = result.column_names
    result_list = [dict(zip(columns, row)) for row in result.result_rows]
    return result_list