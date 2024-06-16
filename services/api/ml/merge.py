from glob import glob
import sys
import pickle
import pandas as pd

proc_id = sys.argv[1]

from lib.merge_contracts import ContractsMerger

merger_df = pd.read_excel(f"/mnt/bucket/{proc_id}/merger.xlsx")
main_costs_df = pd.read_excel(f"/mnt/bucket/{proc_id}/mainCosts.xlsx")
squares_df = pd.read_excel(f"/mnt/bucket/{proc_id}/squares.xlsx")
serv_codes_df = pd.read_excel(f"/mnt/bucket/{proc_id}/servCodes.xlsx")

pays_df = pd.concat(map(lambda x: pd.read_excel(x), glob(f"/mnt/bucket/{proc_id}/pay*.xlsx")), axis=0)

print("loaded all dataframes")

merger = ContractsMerger(pays_df, merger_df, main_costs_df, squares_df, serv_codes_df)
res, features = merger.start_merging()

print("merged")

res.to_csv(f"/mnt/bucket/{proc_id}/res_datetimes.csv")
with open(f"/mnt/bucket/{proc_id}/features.pkl", "wb") as f:
    pickle.dump(features, f)
