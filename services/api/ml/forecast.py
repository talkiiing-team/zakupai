import sys
import pandas as pd

from lib.forecasting import make_predict_timeseries

check_id = int(sys.argv[1])

distribution_df = pd.read_csv('/mnt/bucket/distribution_result.csv')

_, _, forecast_df = make_predict_timeseries(distribution_df, check_ID=check_id, forecast_period=120)

forecast_df.to_csv('/mnt/bucket/forecast.csv', index=False)
