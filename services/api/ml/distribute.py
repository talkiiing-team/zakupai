import json
import pickle
from glob import glob
import pandas as pd

from lib.get_distribution_utils import cost_columns_to_datetime, get_disrib_sums
from lib.all_blocks import init_graph
from lib.generate_test import generate_preds

features = pickle.load(open("/mnt/bucket/features.pkl", "rb"))
res = pd.read_csv("/mnt/bucket/res_datetimes.csv", index_col=0)
raw_graph = json.load(open("/mnt/bucket/graph.json", "r"))
pays_df = pd.concat(map(lambda x: pd.read_excel(x), glob('/mnt/bucket/pay*.xlsx')), axis=0)
serv_codes_df = pd.read_excel('/mnt/bucket/servCodex.xlsx')

numeric_features = [i[0] for i in features if i[2] != "date"]
date_features = [i[0] for i in features if i[2] == "date"]

print(numeric_features)

print(date_features)

res = cost_columns_to_datetime(res, date_features)
res_by_prime = res.groupby("prime")

init_graph(raw_graph, features)

unique_primes = res["prime"].unique()
distrib_sums = get_disrib_sums(res_by_prime, res["prime"].unique(), numeric_features)

preds = generate_preds(pays_df, serv_codes_df, res, distrib_sums)
preds.to_csv('/mnt/bucket/distribution_result.csv')
