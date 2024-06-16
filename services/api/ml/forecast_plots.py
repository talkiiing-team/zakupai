import sys
import json
import pandas as pd

from lib.graphs import generate_interactive_plots_all_data, generate_interactive_plots, generate_interactive_plots_notspecf_finaltable

proc_id = sys.argv[1]
asset_id = int(sys.argv[2])

distribution_df = pd.read_csv(f"/mnt/bucket/{proc_id}/distribution_result.csv")

plots = generate_interactive_plots_notspecf_finaltable(distribution_df)
# generate_interactive_plots_all_data(distribution_df)
# plots['interactive_plot_check'] = generate_interactive_plots(distribution_df, check_id=check_id)
# plots['interactive_plot_asset'] = generate_interactive_plots(distribution_df, asset=asset_id)

with open(f"/mnt/bucket/{proc_id}/forecast_plots.json", "w") as f:
    json.dump(plots, f, ensure_ascii=False)
