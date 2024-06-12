import pandas as pd
import numpy as np
from datetime import datetime
import multiprocessing as mp
from multiprocessing import Pool


cols = [
	'ID договора', 'ID здания', 'ID основного средства', 'ID услуги', 'prime', 'Год', 'Дата ввода в эксплуатацию', 
	'Дата выбытия', 'Дата начала действия связи с зданием', 'Дата окончания действия связи с зданием',
	'Дата отражения счета в учетной системе', 'Измер. действит. по','Измерение действ. с', 'Класс основного средства',
	'Компания', 'Конец владения', 'Начало владения', 'Номер счета', 'Отношение действ. до', 'Отношение действ. с',
	'Площадь', 'Позиция счета', 'Признак "Используется в основной деятельности"', 'Признак "Способ использования"',
	'Стоимость без НДС', "Площадь ОС"
]
garanted_bad_cols = ['Единица измерения', 'ЕИ площади', 'Здание', 'time']
garanted_numerical_features = ['Признак "Используется в основной деятельности"', 'Признак "Способ использования"',
							   "Стоимость без НДС", "Площадь ОС", "Площадь"]


def cost_columns_to_datetime(res):
    DATETIME_COLUMNS = ["Дата ввода в эксплуатацию", "Дата выбытия", "Дата выбытия", "Дата начала действия связи с зданием", "Начало владения",  "Отношение действ. с"]

    DATETIME_COLUMNS_2 = ["Дата окончания действия связи с зданием", "Измер. действит. по", "Конец владения", "Отношение действ. до",]

    for column in DATETIME_COLUMNS:
        res[column] = pd.to_datetime(res[column].astype(str), format="mixed")

    for column in DATETIME_COLUMNS_2:
        res[column] = pd.to_datetime(res[column].astype(str), format="mixed", errors = 'coerce')
        res[column] = res[column].fillna(datetime(year=2040, month=1, day=1))
    return res


class ContractsMerger:
	def __init__(self, pays_df, merger_df, main_costs_df, squares, serv_codes):
		"""
		Класс для мёрджинга всех данных для последующего анализа и генерации предсказаний.
		- pays_df: pd.DataFrame, счета на оплату (сконкатенированные в один DF);
		- merger_df: pd.DataFrame, связь договор - здание;
		- main_costs_df: pd.DataFrame, основные средства;
		- squares: pd.DataFrame, площади зданий;
		- serv_codes: pd.DataFrame, коды услуг.

		Use example:
			import pandas as pd
			from merge_contracts import ContractsMerger

			pays_df1 = pd.read_excel("data/Счета на оплату 3800-2023.XLSX")
			...
			pays_dfn = pd.read_excel("data/Счета на оплату n.XLSX")
			pays_df = pd.concat([pays_df1, ..., pays_dfn], axis=0)

			merger_df = pd.read_excel("data/Связь договор - здания.XLSX")
			main_costs_df = pd.read_excel("data/Основные средства.XLSX")
			squares = pd.read_excel("data/Площади зданий.XLSX")
			serv_codes = pd.read_excel("data/Коды услуг.XLSX")

			merger = ContractsMerger(pays_df, merger_df, main_costs_df, squares, serv_codes)
			res = merger.start_merging()
		"""
		self.pays_df = pays_df
		self.merger_df = merger_df
		self.main_costs_df = main_costs_df
		self.squares = squares
		self.serv_codes = serv_codes

		self.main_costs_df['Признак "Используется в основной деятельности"'] = self.main_costs_df['Признак "Используется в основной деятельности"'].map({"X": 1, np.nan: 0})
		self.main_costs_df['Признак "Способ использования"'] = self.main_costs_df['Признак "Способ использования"'].map({"X": 1, np.nan: 0})
		self.main_costs_df.rename({"Площадь": "Площадь ОС"}, inplace=True, axis=1)
		self.serv_codes = {r["ID услуги"]: r["Класс услуги"] for _, r in self.serv_codes.iterrows()}
		self.pays_df_groupped = self.pays_df.groupby("Номер счета")

		self.pays_df["prime"] = self.pays_df["Номер счета"].astype(str) + "_" + self.pays_df["Позиция счета"].astype(str)

		self.pays_by_agreem = self.pays_df.groupby("ID договора")
		self.merger_by_agreem = self.merger_df.groupby("ID договора")
		self.merger_unique_agreem = self.merger_df["ID договора"].unique()
		self.needed_pays_df = self.pays_df[self.pays_df["ID договора"].isin(self.merger_unique_agreem)]
		self.needed_pays_df["time"] = self.needed_pays_df["Год"].map(lambda x: datetime(year=x + 1, month=1, day=1))

		# удалим здания, у которых дата окончания действия меньше минимальной даты в списке договоров, они точно не подойдут
		self.main_costs_df = self.main_costs_df[self.main_costs_df["Дата окончания действия связи с зданием"] > self.needed_pays_df["time"].min()]
		self.main_costs_by_builds = self.main_costs_df.groupby("ID здания")
		self.main_costs_by_maintools = self.main_costs_df.groupby("ID основного средства")
		self.main_costs_build_ids = self.main_costs_df["ID здания"].unique()

		self.merger_df = self.merger_df[self.merger_df["ID здания"].isin(self.squares["Здание"])]
		self.merger_df = self.merger_df[self.merger_df["ID здания"].isin(self.main_costs_build_ids)]
		self.merger_by_agreem = self.merger_df.groupby("ID договора")
		self.merger_unique_agreem = self.merger_df["ID договора"].unique()
		self.needed_pays_df = self.needed_pays_df[self.needed_pays_df["ID договора"].isin(self.merger_df["ID договора"])]

		self.squares_by_build = self.squares.groupby("Здание")
		self.squares_dict = {}
		for gr_name, gr in self.squares_by_build:
			build_squares = gr.sort_values(by="Измер. действит. по")
			build_square = gr.iloc[0]
			self.squares_dict[gr_name] = build_square


	def parse_contract(self, contract):
		"""
		Вспомогательный метод для мёрджинга одной строчки из pays_df.
		"""
		samples = []
		id_agreem = contract["ID договора"]

		# получаем здания которые оплачивает тот же договор    
		builds = self.merger_by_agreem.get_group(id_agreem)
		
		# итерируемся по всем зданиям текущего договора
		for _, build in builds.iterrows():
			build_id = build["ID здания"]

			# подтягиваем инфу по зданию
			build_square = self.squares_dict[build_id]

			# по зданию получаем основные средства и датку о площади
			main_tools_for_build = self.main_costs_by_builds.get_group(build_id)
			unique_main_tools_ids = main_tools_for_build["ID основного средства"].unique()

			for main_tool_id in unique_main_tools_ids:
				main_tools = self.main_costs_by_maintools.get_group(main_tool_id)
				main_tools = main_tools.drop_duplicates()

				if len(main_tools) > 1:
					main_tools = main_tools.sort_values("Дата окончания действия связи с зданием")
					main_tools = main_tools.iloc[[-1]]

				main_tool = main_tools.iloc[0]

				# ! проверяем что основное средство имеет связь с зданием на момент выполнения услуг
				if main_tool["Дата окончания действия связи с зданием"] < contract["time"]:
					continue

				sample = [contract, build, build_square, main_tool]
				sample = pd.concat(sample, axis=0)
				#sample.rename({"Площадь": "Площадь ОС"}, inplace=True)
				samples.append(sample)
		return samples


	def start_merging(self):
		"""
		Основной метод, запускающий мёрджинг. Возвращает предобработанный смёрдженный pd.DataFrame
		"""
		with Pool(5) as p:
			res = p.map(self.parse_contract, [x[1] for x in self.needed_pays_df.iterrows()])

		res = sum(res, [])
		res = pd.concat(res, axis=1)
		res = res.transpose()
		res = res.loc[:,~res.columns.duplicated()].copy()

		cost_cols = set(res.columns) - set(cols)
		for col in garanted_bad_cols:
			if col in cost_cols:
				cost_cols.remove(col)
		numerical_cols = []
		for col in cost_cols:
			try:
				tmp = res[col].copy().astype(float)
				numerical_cols.append(col)
			except:
				continue
		numerical_cols.extend(garanted_numerical_features)

		DATETIME_COLUMNS = ["Дата ввода в эксплуатацию", "Дата выбытия", "Дата выбытия", 
		"Дата начала действия связи с зданием", "Начало владения",  "Отношение действ. с"]

		DATETIME_COLUMNS_2 = ["Дата окончания действия связи с зданием", "Измер. действит. по", 
		"Конец владения", "Отношение действ. до",]

		for column in DATETIME_COLUMNS:
			res[column] = pd.to_datetime(res[column].astype(str), format="mixed")

		for column in DATETIME_COLUMNS_2:
			res[column] = pd.to_datetime(res[column].astype(str), format="mixed", errors = 'coerce')
			res[column] = res[column].fillna(datetime(year=2040, month=1, day=1))

		return res, numerical_cols


