from glob import glob
import pickle
import pandas as pd

from lib.merge_contracts import ContractsMerger

merger_df = pd.read_excel('/mnt/bucket/merger.xlsx')
main_costs_df = pd.read_excel('/mnt/bucket/mainCosts.xlsx')
squares_df = pd.read_excel('/mnt/bucket/squares.xlsx')
serv_codes_df = pd.read_excel('/mnt/bucket/servCodes.xlsx')

pays_df = pd.concat(map(lambda x: pd.read_excel(x), glob('/mnt/bucket/pay*.xlsx')), axis=0)

print('loaded all dataframes')

merger = ContractsMerger(pays_df, merger_df, main_costs_df, squares_df, serv_codes_df)
res, features = merger.start_merging()

print('merged')

res.to_csv("/mnt/bucket/res_datetimes.csv")
with open("/mnt/bucket/features.pkl", "wb") as f:
    pickle.dump(features, f)
