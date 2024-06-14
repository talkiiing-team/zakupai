import sys
import pickle
import pandas as pd

from lib.merge_contracts import ContractsMerger

sys.argv = sys.argv[1:]


print('loading dataframes', sys.argv)

[merger_path, main_costs_path, squares_path, serv_codes_path, *pays_paths] = sys.argv

merger_df = pd.read_excel(merger_path)
main_costs_df = pd.read_excel(main_costs_path)
squares_df = pd.read_excel(squares_path)
serv_codes_df = pd.read_excel(serv_codes_path)

pays_df = pd.concat(map(lambda x: pd.read_excel(x), pays_paths), axis=0)

print('loaded all dataframes')

merger = ContractsMerger(pays_df, merger_df, main_costs_df, squares_df, serv_codes_df)
res, features = merger.start_merging()

print('merged')

res.to_csv("/mnt/bucket/res_datetimes.csv")
with open("/mnt/bucket/features.pkl", "wb") as f:
    pickle.dump(features, f)
