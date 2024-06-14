import sys
import pandas as pd
import time

from lib.merge_contracts import ContractsMerger

sys.argv = sys.argv[1:]

[merger_path, main_costs_path, squares_path, serv_codes_path, *pays_paths] = sys.argv

merger_df = pd.read_excel(merger_path)
main_costs_df = pd.read_excel(main_costs_path)
squares_df = pd.read_excel(squares_path)
serv_codes_df = pd.read_excel(serv_codes_path)

pays_df = pd.concat(map(lambda x: pd.read_excel(x), pays_paths), axis=0)

print('loaded all dataframes')

# merger = ContractsMerger(pays_df, merger_df, main_costs_df, squares_df, serv_codes_df)

# a, b = merger.start_merging()

# print(a, b)

# res.to_csv("res_datetimes.csv")
# with open("features.pkl", "wb") as f:
#     pickle.dump(features, f)
