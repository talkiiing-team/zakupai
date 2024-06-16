## Документация к модулю запуска алгоритма распределения (get_distribution_utils)
### Функция распределения сумм по основным средствам

Этот модуль реализует алгоритм распределения сумм по основным средствам, используя пользовательские алгоритмы. Код состоит из двух функций: `get_disrib_sums` и `cost_columns_to_datetime`.

#### Импорт необходимых модулей

```python
from tqdm import tqdm
import pandas as pd
from datetime import datetime

import all_blocks
```

#### Описание функций

### 1. Функция `get_disrib_sums`

Функция `get_disrib_sums` выполняет распределение сумм по основным средствам для каждого уникального счета (prime).

#### Параметры:
- `res_by_prime` (DataFrameGroupBy): Группированный DataFrame с данными о характеристиках основных средств в разрезе одного счета для распределения.
- `unique_primes` (array): Массив уникальных ключей (prime), для которых нужно выполнить распределение.
- `numeric_features` (list): Список численных фичей, распределение которых рассчитывается предварительно для использования в пользовательских алгоритмах.

#### Возвращаемое значение:
- `distrib_sums` (dict): Словарь, где ключи — уникальные `prime_id`, а значения — списки распределенных сумм.

#### Пример использования:
```python
# см. документацию по merge_contracts
# рассчитываем признаки для последующих алгоритмов
res, features = merger.start_merging(...)

numeric_features = [i[0] for i in features if i[2] != "date"]
date_features = [i[0] for i in features if i[2] == "date"]
res = cost_columns_to_datetime(res, date_features)
res_by_prime = res.groupby("prime")
raw_graph = # читаем граф с алгоритмом
all_blocks.init_graph(raw_graph, features)
unique_primes = res["prime"].unique()
distrib_sums = get_disrib_sums(res_by_prime, unique_primes, numeric_features)
```

### Предварительная инициализация

Перед использованием функции `get_disrib_sums`, необходимо выполнить инициализацию алгоритма распределения с помощью `all_blocks.init_graph`:

```python
raw_graph = # читаем граф с алгоритмом
all_blocks.init_graph(raw_graph, features)
```


### 2. Функция `cost_columns_to_datetime`

Функция `cost_columns_to_datetime` преобразует столбцы с датами в формат `datetime` и заполняет пропущенные значения.

#### Параметры:
- `res` (DataFrame): DataFrame с исходными данными.
- `datetime_columns` (list): Список столбцов, которые необходимо преобразовать в формат `datetime`.

#### Возвращаемое значение:
- `res` (DataFrame): Обновленный DataFrame с преобразованными столбцами дат.

#### Пример использования:
```python
res = cost_columns_to_datetime(res, date_features)
```


### Общий пример использования:

```python
# Получение исходных данных и характеристик
from merge_contracts import ContractsMerger
from get_distribution_utils import get_disrib_sums, cost_columns_to_datetime

# ...
res, features = merger.start_merging()

numeric_features = [i[0] for i in features if i[2] != "date"]
date_features = [i[0] for i in features if i[2] == "date"]

# Преобразование столбцов с датами
res = cost_columns_to_datetime(res, date_features)

# Группировка данных по prime
res_by_prime = res.groupby("prime")

# Инициализация алгоритма распределения
raw_graph = # ... читаем граф с алгоритмом
all_blocks.init_graph(raw_graph, features)

# Получение уникальных значений prime
unique_primes = res["prime"].unique()

# Распределение сумм
distrib_sums = get_disrib_sums(res_by_prime, unique_primes, numeric_features)
```

