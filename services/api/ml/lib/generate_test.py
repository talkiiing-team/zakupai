import pandas as pd
import numpy as np
import os
from tqdm import tqdm
import catboost
from catboost import Pool
import pickle


main_cost_clf = pickle.load(open(os.path.join(os.getcwd(), "ml/lib/main_cost_clf.pickle"), "rb"))
cat_features = ["Год счета", "Позиция счета", "Номер позиции распределения",
                "Услуга", "Класс услуги", "Класс ОС", 'Признак "Использование в основной деятельности"', 'Признак "Способ использования"']
x_features = ["Площадь ОС", "Сумма распределения"]


def generate_preds(pays_df, serv_codes, preds_df, distrib_sums):
	"""
	Функция для генерации таблицы с предиктами распределенных сумм.
	Принимает на вход:
		- pays_df: pd.DataFrame, счета на оплату (сконкатенированные в один DF), изначальный набор счетов;
		- serv_codes: pd.DataFrame, коды услуг;
		- preds_df: pd.DataFrame, смёрдженная таблица, полученная через merge_contracts;
		- distrib_sums: defaultDict, словарь с распределенной суммой для каждого номера счета + позиции счета.

	Возвращает pd.DataFrame со сгенерированной распределенной на каждую позицию счета суммой.
	"""
	serv_codes_dct = {r["ID услуги"]: r["Класс услуги"] for _, r in serv_codes.iterrows()}

	pays_df["prime"] = pays_df["Номер счета"].astype(str) + "_" + pays_df["Позиция счета"].astype(str)
	pays_by_prime = pays_df.groupby("prime")		# тут на каждый prime key одна строка
	res_by_prime = preds_df.groupby("prime")

	res_df = []
	j = 0
	for prime_id, group_res_original in tqdm(res_by_prime):
		group_res = group_res_original.copy()

		group_res = group_res.rename({"Год": "Год счета", "Дата отражения счета в учетной системе": "Дата отражения в учетной системе",
									  "ID здания": "Здание", "Класс основного средства": "Класс ОС", "ID услуги": "Услуга",
									  'Признак "Используется в основной деятельности"': 'Признак "Использование в основной деятельности"',
									  'Признак "Способ использования"': 'Признак "Способ использования"',}, axis=1)

		group_res["Класс услуги"] = group_res["Услуга"].map(serv_codes_dct)
		group_res["Сумма распределения"] = [i for i in distrib_sums[prime_id]]
		group_res["Номер позиции распределения"] = [i + 1 for i in range(len(group_res))]

		group_res = group_res[['Компания', 'Год счета', 'Номер счета', 'Позиция счета',
					   'Номер позиции распределения', 'Дата отражения в учетной системе',
					   'ID договора', 'Услуга', "Класс услуги", 'Здание', 'Класс ОС',
					   'ID основного средства', 'Признак "Использование в основной деятельности"',
					   'Признак "Способ использования"', 'Площадь ОС', 'Сумма распределения']]

		res_df.append(group_res)

	res_df = pd.concat(res_df)

	res_df = res_df.loc[:,~res_df.columns.duplicated()].copy()

	for_pred = res_df.copy()
	for_pred["Класс ОС"] = for_pred["Класс ОС"].fillna(0)
	preds = main_cost_clf.predict(Pool(for_pred[cat_features + x_features], cat_features=cat_features))[:, 0].astype("int64")

	res_df["Счет главной книги"] = preds
	res_df["ID услуги"] = res_df["Услуга"].map(serv_codes_dct)

	return res_df
