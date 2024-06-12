import pandas as pd
import numpy as np
from tqdm import tqdm


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
	serv_codes = {r["ID услуги"]: r["Класс услуги"] for _, r in serv_codes.iterrows()}

	pays_df["prime"] = pays_df["Номер счета"].astype(str) + "_" + pays_df["Позиция счета"].astype(str)
	pays_by_prime = pays_df.groupby("prime")
	res_by_prime = preds_df.groupby("prime")

	res_df = []
	j = 0
	for prime, dist in tqdm(pays_by_prime):
		prime_group = pays_by_prime.get_group(prime)
		j += 1
		try:
			data = res_by_prime.get_group(prime)
		except:
			continue
		d1 = pd.concat([prime_group.iloc[0], data.iloc[0]], axis=0)
		sums = distrib_sums[prime]
		for i, s in enumerate(sums):
			d = d1.copy()
			d["Номер позиции распределения"] = i+1
			d["Сумма распределения"] = s
			d.rename({"Год": "Год счета", "Дата отражения счета в учетной системе": "Дата отражения в учетной системе",
					  "ID услуги": "Услуга", "ID здания": "Здание", "Класс основного средства": "Класс ОС",
					  'Признак "Используется в основной деятельности"': "Признак использования в основной деятель",
					  'Признак "Способ использования"': "Признак передачи в аренду", "Площадь ОС": "Площадь"}, inplace=True)
			
			d = d[['Компания', 'Год счета', 'Номер счета', 'Позиция счета',
			   'Номер позиции распределения', 'Дата отражения в учетной системе',
			   'ID договора', 'Услуга', 'Здание', 'Класс ОС',
			   'ID основного средства', 'Признак использования в основной деятель',
			   'Признак передачи в аренду', 'Площадь', 'Сумма распределения']]
			d = pd.DataFrame(d).transpose()
			res_df.append(d)
	res_df = pd.concat(res_df)

	res_df = res_df.loc[:,~res_df.columns.duplicated()].copy()
	res_df["Счет главной книги"] = 7048209010
	res_df["ID услуги"] = res_df["Услуга"].map(serv_codes)

	return res_df