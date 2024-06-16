from tqdm import tqdm
import pandas as pd
from datetime import datetime

from lib import all_blocks

def get_disrib_sums(res_by_prime, unique_primes, numeric_features):
    distrib_sums = dict()

    for prime_id in tqdm(unique_primes):
        prime_features_group = res_by_prime.get_group(prime_id)
        full_sum_rub = prime_features_group["Стоимость без НДС"].iloc[0]

        dct_sum_by_feature = {}  # считаем ниже в цикле
        for column in numeric_features:
            sm = prime_features_group[column].sum()
            dct_sum_by_feature[column] = sm  # сохраняем чтобы потом нормаировать

        metric_values = []
        for _, row in prime_features_group.iterrows():
            metric_values.append(all_blocks.run_algo(row, dct_sum_by_feature))

        sum_metric = sum(metric_values)
        new_metrics = []
        for old_metric in metric_values:
            if sum_metric == 0:
                # если сумма метрик = 0 -- делим пропорционально
                new_metrics.append(1 / len(metric_values) * full_sum_rub)
            else:
                new_metrics.append(old_metric / sum_metric * full_sum_rub)

        # добиваем остаток после округления чтобы красиво все было
        new_metrics = [round(i, 2) for i in new_metrics]
        delta = full_sum_rub - sum(new_metrics)
        for i in range(len(new_metrics)):
            if new_metrics[i] + delta > 0:
                new_metrics[i] += delta
                break
        distrib_sums[prime_id] = new_metrics.copy()

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
