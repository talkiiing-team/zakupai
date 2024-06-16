import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.preprocessing import MinMaxScaler
from tqdm import tqdm
import random

# Загрузка данных
def load_data(path, type_in):
    if type_in == "csv":
        data = pd.read_csv(f'{path}')
    elif type_in == 'xlsx':
        data = pd.read_excel(f'{path}')
    return data

# Функция для удаления выбросов с использованием метода IQR
# def remove_outliers(series):
#     Q1 = series.quantile(0.25)
#     Q3 = series.quantile(0.75)
#     IQR = Q3 - Q1
#     lower_bound = Q1 - 1.5 * IQR
#     upper_bound = Q3 + 1.5 * IQR
#     return series.apply(lambda x: np.nan if x < lower_bound or x > upper_bound else x)

# Подготовка данных
def prepare_data(data, asset_id):
    data['Дата отражения в учетной системе'] = pd.to_datetime(data['Дата отражения в учетной системе'].astype(str),
                                                              format="mixed",errors = 'coerce')
    grouped_df = data.groupby(['ID основного средства', 'Дата отражения в учетной системе']).agg({'Сумма распределения': 'sum'}).reset_index()
    pivot_df = grouped_df.pivot(index='Дата отражения в учетной системе', columns='ID основного средства', values='Сумма распределения').fillna(0)
    daily_df = pivot_df.transpose()

    # Заполнение пропущенных значений
    df_filled = daily_df.copy()
    for col in tqdm(daily_df.columns):
        if daily_df.loc[asset_id, col] < 1000 or pd.isna(daily_df.loc[asset_id, col]):
            previous_data = daily_df.loc[asset_id, :col]    # .replace(0, np.nan)
            df_filled.loc[asset_id, col] = previous_data.mean()

    # Удаление выбросов
    # daily_df = daily_df.apply(remove_outliers, axis=1)

    values = df_filled.loc[asset_id].values
    values = values[~np.isnan(values)]

    return values, df_filled

# Основная функция
def make_predict_timeseries(data, asset_id, forecast_period):
    values, df_filled = prepare_data(data, asset_id)
    # values[0] += 1e-6

    # Set the SARIMAX parameters manually
    order = (1, 1, 5)  # (p, d, q) parameters for ARIMA
    seasonal_order = (1, 1, 0, 30)  # (P, D, Q, S) parameters for seasonal component

    # Fit the SARIMAX model
    model = SARIMAX(values, order=order, seasonal_order=seasonal_order, enforce_stationarity=False, enforce_invertibility=False)
    model_fit = model.fit(disp=False)

    # Прогнозирование
    forecast = model_fit.get_forecast(steps=forecast_period).predicted_mean

    # Подготовка дат для графика
    start_date = df_filled.loc[asset_id].first_valid_index()
    dates = pd.date_range(start=start_date, periods=len(values))
    forecast_dates = pd.date_range(start=dates[-1] + pd.Timedelta(days=1), periods=forecast_period, freq='D')

    # Визуализация результатов
    plt.figure(figsize=(14, 7))
    plt.plot(dates, values, label='Наблюдаемые')
    plt.plot(forecast_dates, forecast, label='Прогноз', color='green')
    plt.title('SARIMAX Прогнозирование')
    plt.xlabel('Дата')
    plt.ylabel('Значения')
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.tight_layout()

    # Сохранение предсказаний и дат в DataFrame
    forecast_df = pd.DataFrame({'Дата': forecast_dates, 'Прогноз': forecast})

    return model_fit, df_filled, forecast_df, plt

# Пример использования
# data = load_data('path_to_file.xlsx', 'xlsx')
# model_fit, df_filled, forecast_df = make_predict_timeseries(data, check_ID=38006080400228630, forecast_period=120)

# Сохранение предсказаний и дат в файл
# forecast_df.to_csv('forecast.csv', index=False)
