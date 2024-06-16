### Генерация предсказаний

Этот модуль предназначен для генерации таблицы с распределенными суммами для всех счетов,
а также классификации номера главной книги по информации о счёте.

### generate_preds
Основная функция для генерации таблицы с предсказаниями распределенными суммами и счетами главной книги.  
Принимает на вход:  
- **pays_df**: pd.DataFrame, счета на оплату (сконкатенированные в один DF), изначальный набор счетов;  
- **serv_codes**: pd.DataFrame, коды услуг;  
reds_df: pd.DataFrame, смёрдженная таблица, полученная через merge_contracts;  
- **distrib_sums**: dict, словарь с распределенной суммой для каждого номера счета + позиции счета. Имеет вид: 
*{f"{Номер счета}_{Позиция счета}: [список распределенных сумм]"}*.  
Возвращает pd.DataFrame с предсказаниями.

### Пример использования

```python
import pandas as pd
import pickle
from generate_test import generate_preds
pays_df1 = pd.read_excel("data/Счета на оплату 3800-2023.XLSX")
pays_df2 = pd.read_excel("data/Счета на оплату n.XLSX")
pays_df = pd.concat([pays_df1, pays_df2], axis=0)

serv_codes = pd.read_excel("data/Коды услуг.XLSX")
distrib_sums = pickle.load(open("graph_res/distrib_sums.pickle", "rb")) # получаем с помощью графового алгоритма
res_df = generate_preds(pays_df, serv_codes, distrib_sums)
```