#!/bin/bash

function help {
    echo "usage: migrate.sh <migrations_dir>"
}

if [[ -z "$1" ]]; then
    help
    exit 1
fi

if [[ -z "${CLICKHOUSE_URL}" ]]; then
    echo "CLICKHOUSE_URL is not defined"
    exit 1
fi

if [[ -z "${CLICKHOUSE_USER}" ]]; then
    echo "CLICKHOUSE_USER is not defined"
    exit 1
fi

if [[ -z "${CLICKHOUSE_PASSWORD}" ]]; then
    echo "CLICKHOUSE_PASSWORD is not defined"
    exit 1
fi

if [[ -z "${CLICKHOUSE_DB}" ]]; then
    echo "CLICKHOUSE_DB is not defined"
    exit 1
fi

echo "migrate $(pwd)/$1"
