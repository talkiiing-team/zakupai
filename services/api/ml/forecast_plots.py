import sys
import json
import pandas as pd

from lib.graphs import generate_interactive_plots_all_data, generate_interactive_plots, generate_interactive_plots_notspecf_finaltable

check_id = int(sys.argv[1])

forecast_df = pd.read_csv('/mnt/bucket/forecast.csv', index=False)

generate_interactive_plots_all_data(forecast_df)
generate_interactive_plots(forecast_df, check_id = check_id)

plots = generate_interactive_plots_notspecf_finaltable(forecast_df)

with open('/mnt/bucket/forecast_plots.json', 'w') as f:
    json.dump(plots, f, ensure_ascii=False)
