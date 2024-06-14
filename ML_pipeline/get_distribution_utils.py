from tqdm import tqdm
import pandas as pd
from datetime import datetime

import all_blocks

def get_disrib_sums(res_by_prime, unique_primes, numeric_features):
    distrib_sums = dict()

    for prime_id in tqdm(unique_primes):
        prime_features_group = res_by_prime.get_group(prime_id)

        dct_sum_by_feature = {}  # считаем ниже в цикле
        for column in numeric_features:
            sm = prime_features_group[column].sum()
            dct_sum_by_feature[column] = sm  # сохраняем чтобы потом нормаировать

        metric_values = []
        for _, row in prime_features_group.iterrows():
            metric_values.append(all_blocks.run_algo(row))
        distrib_sums[prime_id] = metric_values

    return distrib_sums


def cost_columns_to_datetime(res, datetime_columns):
    # DATETIME_COLUMNS = ["Дата ввода в эксплуатацию", "Дата выбытия", "Дата выбытия", "Дата начала действия связи с зданием", "Начало владения",  "Отношение действ. с"]
    # DATETIME_COLUMNS_2 = ["Дата окончания действия связи с зданием", "Измер. действит. по", "Конец владения", "Отношение действ. до",]
    # for column in DATETIME_COLUMNS:
    #     res[column] = pd.to_datetime(res[column].astype(str), format="mixed")

    for column in datetime_columns:
        res[column] = pd.to_datetime(res[column].astype(str), format="mixed", errors = 'coerce')
        res[column] = res[column].fillna(datetime(year=2040, month=1, day=1))
    return res
