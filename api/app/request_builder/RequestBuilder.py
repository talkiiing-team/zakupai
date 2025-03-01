from typing import List

from clickhouse_connect.driver import Client

from app.dto.JoinSequenceDataInfoDto import JoinSequenceDataInfoDto, JoinSequenceDataInfoRuleDto, TableJoinDescription, \
    TableFiltersDto, FilterDto, TableFilterFrontDto

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

tables_filters = [
    TableFiltersDto(
        table="customers",
        filters=[
            FilterDto(column="customer_inn", type="select"),
            FilterDto(column="customer_name", type="select"),
            FilterDto(column="customer_region", type="select")
        ]
    ),
    TableFiltersDto(
        table="participants",
        filters=[
            FilterDto(column="ks_prime_id"),
            FilterDto(column="inns", is_array=True)
        ]
    ),
    TableFiltersDto(
        table="sessions",
        filters=[
            FilterDto(column="id_ks"),
            FilterDto(column="customer_inn"),
            FilterDto(column="ks_law"),
            FilterDto(column="ks_start_time", type="range"),
            FilterDto(column="ks_end_time", type="range"),
            FilterDto(column="winner_inn"),
            FilterDto(column="cte_url"),
            FilterDto(column="ks_start_price", type="range"),
            FilterDto(column="cte_name"),
            FilterDto(column="cte_count"),
            FilterDto(column="cte_price", type="range"),
            FilterDto(column="offer_price", type="range"),
            FilterDto(column="offer_start_time", type="range"),
            FilterDto(column="offer_end_time", type="range"),
            FilterDto(column="cte_id"),
            FilterDto(column="ks_prime_id"),
        ]
    ),
    TableFiltersDto(
        table="suppliers",
        filters=[
            FilterDto(column="inn"),
            FilterDto(column="cte_name"),
            FilterDto(column="kpgz_name")
        ]
    ),
    TableFiltersDto(
        table="winners",
        filters=[
            FilterDto(column="id_ks"),
            FilterDto(column="winner_inn"),
            FilterDto(column="ks_end_price", type="range"),
            FilterDto(column="winner_name"),
            FilterDto(column="winner_region"),
            FilterDto(column="ks_prime_id")
        ]
    ),
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


def build_source_query(
        source_description: TableJoinDescription
) -> str:
    select_part = f"FROM {source_description.base_table}"
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
    return select_part


def build_source(
        source_description: TableJoinDescription,
        connection: Client,
        limit: int | None
):
    select_part = build_source_query(source_description)
    if limit is not None:
        select_part += f" LIMIT {limit}"
    return get_select_data(select_part, connection)


def get_select_data(query: str, connection: Client) -> list[dict]:
    query = f"SELECT * {query}"
    result = connection.query(query)
    columns = result.column_names
    result_list = [dict(zip(columns, row)) for row in result.result_rows]
    return result_list


def get_all_tables(source_description: TableJoinDescription):
    all_tables = [source_description.base_table]
    for join in source_description.join_sequence:
        all_tables.append(join.right_join_table)
        all_tables.append(join.left_join_table)
    return set(all_tables)


def get_all_available_filters(source_descriptions: TableJoinDescription) -> list[TableFilterFrontDto]:
    sorted_available_tables = list(sorted(get_all_tables(source_descriptions)))
    existed_columns = set()
    ret_value = list()
    for table_filter in tables_filters:
        if table_filter.table not in sorted_available_tables:
            continue
        for f in table_filter.filters:
            if f.column in existed_columns:
                continue
            existed_columns.add(f.column)
            ret_value.append(TableFilterFrontDto(
                table=table_filter.table,
                column=f.column,
                type=f.type,
                is_array=f.is_array
            ))
    return ret_value
