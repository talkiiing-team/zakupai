import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
# Helper function to convert Excel date serial numbers to datetime
def excel_date(num):
    return pd.to_datetime('1899-12-30') + pd.to_timedelta(num, 'D')

def convert_dates(date_series):
    converted_dates = []
    for date in date_series:
        try:
            # Attempt to parse standard date formats
            converted_dates.append(pd.to_datetime(date, format='%Y-%m-%d', errors='coerce'))
        except:
            try:
                # Handle Excel serial date numbers
                converted_dates.append(excel_date(float(date)))
            except:
                # If all else fails, leave as NaT
                converted_dates.append(pd.NaT)
    return pd.Series(converted_dates)

#графики по указанным зданию или ОС или номеру счёта - 2 таблица
def generate_interactive_plots(data, asset=None, check_id = None):
    data['Дата отражения в учетной системе'] = convert_dates(data['Дата отражения в учетной системе'])
        #Drop rows with NaT dates if necessary
    data = data.dropna(subset=['Дата отражения в учетной системе'])
    if asset:

        data_asset = data[data['ID основного средства'] == asset]

        # График Time-series по сумме распределения

        daily_agg = data_asset.set_index('Дата отражения в учетной системе').resample('D').agg({'Сумма распределения': 'sum'}).reset_index()
        daily_agg = daily_agg[daily_agg['Сумма распределения'] > 0]
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=daily_agg['Дата отражения в учетной системе'], y=daily_agg['Сумма распределения'], mode='lines+markers'))
        fig.update_layout(
            title=f'Сумма распределения по ОС с ID {asset}',
            xaxis_title='Дата',
            yaxis_title='Общая Сумма распределения',
            xaxis=dict(tickformat='%Y-%m-%d'),
            yaxis=dict(rangemode='tozero'),
            showlegend=False
        )
        return fig.to_json()

    elif check_id:
        check_data = data[data['Номер счета'] == check_id]

        # График суммы распределения по ID услуги
        check_data['Услуга'] = check_data['ID услуги'].astype(str)  # Преобразуем значения оси X в строки
        fig = px.bar(check_data, x='ID услуги', y='Сумма распределения',
                      labels={'Услуга': 'Услуга', 'Сумма распределения': 'Сумма распределения'},
                      title=f'Сумма распределения по каждому ID услуги в cчёте - {check_id}')
        return fig.to_json()





# grouped by графики по полной данным - 1 таблица
def generate_interactive_plots_all_data(data):

    plots = {}

    # Group by 'Здание' and calculate the number of unique 'ID основного средства'
    grouped = data.groupby('Здание')['ID основного средства'].nunique().reset_index()
    grouped = grouped.rename(columns={'ID основного средства': 'Unique Assets'})
    asset_counts = grouped['Unique Assets'].value_counts().reset_index()
    asset_counts = asset_counts.rename(columns={'index': 'Unique Assets', 'Unique Assets': 'Count'})
    fig1 = px.pie(asset_counts, values='Count', names='Count',
                  title='Доли уникальных средств по каждому зданию')
    fig1.update_layout(
        legend_title_text='Количество уникальных средств'
    )
    plots['unique_assets_pie'] = fig1.to_json()

    # Построение графика 2
    data_filtered = data[data['Площадь ОС'] > 0]
    bins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 150, 200, 300, 400, 500, np.inf]
    labels = [f'{bins[i]}-{bins[i+1]}' for i in range(len(bins)-1)]
    data_filtered['Площадь ОС Категория'] = pd.cut(data_filtered['Площадь ОС'], bins=bins, labels=labels, right=False)
    fig2 = px.histogram(data_filtered, x='Площадь ОС Категория', title='Распределение Площадь ОС по категориям',
                        labels={'Площадь ОС Категория': 'Площадь ОС', 'count': 'Частота'},
                        category_orders={"Площадь ОС Категория": labels})
    fig2.update_layout(
        xaxis_title='Площадь ОС',
        yaxis_title='Частота',
        bargap=0.1,
        margin=dict(l=50, r=50, t=50, b=50)
    )
    plots['area_distribution_histogram'] = fig2.to_json()

    # Стоимость без НДС
    data_filtered = data[data['Стоимость без НДС'] > 0]
    bins = [0, 20, 30, 40, 50, 60, 80, 100, 200, 300, 400, 500, 600, 700, 1000, 2000, 3000, 4000, 5000, np.inf]
    labels = [f'{bins[i]}-{bins[i+1]}' for i in range(len(bins)-1)]
    data_filtered['Стоимость без НДС Категория'] = pd.cut(data_filtered['Стоимость без НДС'], bins=bins, labels=labels, right=False)
    fig3 = px.histogram(data_filtered, x='Стоимость без НДС Категория', title='Распределение стоимости без НДС по категориям',
                        labels={'Стоимость без НДС Категория': 'Стоимость без НДС', 'count': 'Частота'},
                        category_orders={"Стоимость без НДС Категория": labels})
    fig3.update_layout(
        xaxis_title='Стоимость без НДС',
        yaxis_title='Частота',
        bargap=0.1,
        margin=dict(l=50, r=50, t=50, b=50)
    )
    plots['cost_distribution_histogram'] = fig3.to_json()

    # Распределение использования в основной деятельности
    grouped = data.groupby(['Признак "Используется в основной деятельности"']).size().reset_index(name='Counts')
    grouped['Признак "Используется в основной деятельности"'] = grouped['Признак "Используется в основной деятельности"'].astype(str)
    fig4 = px.bar(grouped, x='Признак "Используется в основной деятельности"', y='Counts',
                  barmode='group',
                  labels={'Признак "Используется в основной деятельности"': 'Используется в основной деятельности',
                          'Counts': 'Количество'},
                  color_discrete_map={'0': 'green', '1': 'blue'},
                  title='Распределение использования в основной деятельности по зданиям')
    fig4.update_layout(
        xaxis_title='Используется в основной деятельности',
        yaxis_title='Количество',
        xaxis={'categoryorder': 'total descending'}
    )
    plots['usage_distribution_bar'] = fig4.to_json()

    # Распределение по годам ввода в эксплуатацию


    return plots

# по всем данным 2 таблица
def generate_interactive_plots_notspecf_finaltable(data):

    plots = {}

    # fig0 = px.histogram(data['Сумма распределения'])
    # fig0.show()

    count_main_book = pd.DataFrame(data['Счет главной книги'].value_counts()).reset_index()
    count_main_book['Счет главной книги'] = count_main_book['Счет главной книги'].astype('str')
    # print(count_main_book.reset_index())
    fig = px.bar(count_main_book.reset_index(), x = 'Счет главной книги', y = 'count',
                    labels={'Год ввода в эксплуатацию': 'Год ввода в эксплуатацию', 'Год': 'Количество'},
                    title='Распределение Главных Книг')
    plots['main_book_distrib'] = fig.to_json()


    # Group by 'Здание' and sum the 'Сумма распределения'
    grouped = data.groupby('Здание')['Сумма распределения'].sum().reset_index()
    top_7_buildings = grouped.sort_values(by='Сумма распределения', ascending=False).head(7)
    fig1 = px.bar(top_7_buildings, x='Здание', y='Сумма распределения',
                  title='Top 7 Buildings by Total Сумма распределения',
                  labels={'Здание': 'Здание', 'Сумма распределения': 'Total Сумма распределения'})
    plots['top_7_buildings'] = fig1.to_json()

    # Group by 'ID основного средства' and sum the 'Сумма распределения'
    grouped = data.groupby('ID основного средства')['Сумма распределения'].sum().reset_index()

    # Sort by 'Сумма распределения' in descending order and select the top 7
    top_7_assets = grouped.sort_values(by='Сумма распределения', ascending=False).head(7)

    # Convert 'ID основного средства' to string for better readability
    top_7_assets['ID основного средства'] = top_7_assets['ID основного средства'].astype(str)

    # Plot the results
    fig2 = px.bar(top_7_assets, x='ID основного средства', y='Сумма распределения',
                  title='Top 7 Assets by Total Сумма распределения',
                  labels={'ID основного средства': 'ID основного средства', 'Сумма распределения': 'Total Сумма распределения'})
    plots['top_7_assets'] = fig2.to_json()

    # Group by 'Компания' and count unique 'Здание'
    grouped = data.groupby('Компания')['Здание'].nunique().reset_index()
    grouped = grouped.rename(columns={'Здание': 'Unique Buildings'})

    # Sort by 'Unique Buildings' in descending order and select the top 7
    top_7_companies = grouped.sort_values(by='Unique Buildings', ascending=False).head(7)

    # Convert 'Компания' to string for better readability
    top_7_companies['Компания'] = top_7_companies['Компания'].astype(str)

    # Plot the results
    fig3 = px.bar(top_7_companies, x='Компания', y='Unique Buildings',
                  title='Top Companies by Number of Unique Buildings',
                  labels={'Компания': 'Компания', 'Unique Buildings': 'Number of Unique Buildings'})
    plots['top_7_companies_by_buildings'] = fig3.to_json()

    # Group by 'Компания' and sum the 'Сумма распределения'
    grouped = data.groupby('Компания')['Сумма распределения'].sum().reset_index()
    grouped = grouped.rename(columns={'Сумма распределения': 'Total Distribution Sum'})

    # Sort by 'Total Distribution Sum' in descending order and select the top 7
    top_7_companies = grouped.sort_values(by='Total Distribution Sum', ascending=False).head(7)

    # Convert 'Компания' to string for better readability
    top_7_companies['Компания'] = top_7_companies['Компания'].astype(str)

    # Plot the results
    fig4 = px.bar(top_7_companies, x='Компания', y='Total Distribution Sum',
                  title='Top Companies by Total Distribution Sum',
                  labels={'Компания': 'Компания', 'Total Distribution Sum': 'Total Distribution Sum'})
    plots['top_7_companies_by_distribution'] = fig4.to_json()

    # Group by 'Номер счета' and sum the 'Сумма распределения'
    grouped = data.groupby('Номер счета')['Сумма распределения'].sum().reset_index()
    grouped = grouped.rename(columns={'Сумма распределения': 'Total Distribution Sum'})

    # Sort by 'Total Distribution Sum' in descending order and select the top 7
    top_7_accounts = grouped.sort_values(by='Total Distribution Sum', ascending=False).head(7)

    # Convert 'Номер счета' to string for better readability
    top_7_accounts['Номер счета'] = top_7_accounts['Номер счета'].astype(str)

    # Plot the results
    fig5 = px.bar(top_7_accounts, x='Номер счета', y='Total Distribution Sum',
                  title='Top 7 Accounts by Total Distribution Sum',
                  labels={'Номер счета': 'Номер счета', 'Total Distribution Sum': 'Total Distribution Sum'})
    plots['top_7_accounts'] = fig5.to_json()

    # Group by 'Услуга' and sum the 'Сумма распределения'
    grouped = data.groupby('Услуга')['Сумма распределения'].sum().reset_index()
    grouped = grouped.rename(columns={'Сумма распределения': 'Total Distribution Sum'})

    # Sort by 'Total Distribution Sum' in descending order and select the top 7
    top_7_services = grouped.sort_values(by='Total Distribution Sum', ascending=False).head(7)
    top_7_services['Услуга'] = top_7_services['Услуга'].astype(str)

    # Plot the results
    fig6 = px.bar(top_7_services, x='Услуга', y='Total Distribution Sum',
                  title='Top 7 Services by Total Distribution Sum',
                  labels={'Услуга': 'Услуга', 'Total Distribution Sum': 'Total Distribution Sum'})
    plots['top_7_services'] = fig6.to_json()

    # Group by 'Компания' and sum the 'Площадь ОС'
    grouped = data.groupby('Компания')['Площадь ОС'].sum().reset_index()
    grouped = grouped.rename(columns={'Площадь ОС': 'Total Area'})

    # Sort by 'Total Area' in descending order and select the top 7
    top_7_companies = grouped.sort_values(by='Total Area', ascending=False).head(7)

    # Ensure 'Компания' is treated as a string
    top_7_companies['Компания'] = top_7_companies['Компания'].astype(str)

    # Plot the results
    fig7 = px.bar(top_7_companies, x='Компания', y='Total Area',
                  title='Top Companies by Total Area',
                  labels={'Компания': 'Компания', 'Total Area': 'Total Area'})
    plots['top_7_companies_by_area'] = fig7.to_json()

    return plots

# Example usage
# generate_interactive_plots_all_data(data) #подавать res_datetimes
# generate_interactive_plots(data, check_id = 5006170938) #подавать результат распределенные счета
# plots = generate_interactive_plots_notspecf_finaltable(data) #подавать результат распределенные счета
