from tqdm import tqdm

import all_blocks

def get_disrib_sums(res_by_prime, unique_primes, NUMERIC_COLUMNS):
    distrib_sums = dict()

    for prime_id in tqdm(unique_primes):
        prime_features_group = res_by_prime.get_group(prime_id)

        dct_sum_by_feature = {}  # считаем ниже в цикле
        for column in NUMERIC_COLUMNS:
            sm = prime_features_group[column].sum()
            dct_sum_by_feature[column] = sm  # сохраняем чтобы потом нормаировать

        metric_values = []
        for _, row in prime_features_group.iterrows():
            metric_values.append(all_blocks.run_algo(row))
        distrib_sums[prime_id] = metric_values

    return distrib_sums