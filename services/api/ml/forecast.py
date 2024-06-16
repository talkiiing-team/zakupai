import sys
import pandas as pd

from lib.forecasting import make_predict_timeseries

proc_id = sys.argv[1]
asset_id = int(sys.argv[2])

distribution_df = pd.read_csv(f"/mnt/bucket/{proc_id}/distribution_result.csv")

_, _, forecast_df, plt = make_predict_timeseries(distribution_df, asset_id=asset_id, forecast_period=120)

plt.savefig(f'/mnt/bucket/{proc_id}/forecast.png')

forecast_df.to_csv(f"/mnt/bucket/{proc_id}/forecast.csv", index=False)
