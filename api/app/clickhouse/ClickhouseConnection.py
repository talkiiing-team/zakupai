import clickhouse_connect
from clickhouse_connect.driver import Client


def get_clickhouse_connection() -> Client:
    return clickhouse_connect.get_client(
        host="clickhouse.default.svc.cluster.local",
        port = 8123,
        password = "password",
        username = "admin"
    )
