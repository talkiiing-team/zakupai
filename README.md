# [РаспределяйAI](https://xn--80aicbulygci4n.xn--p1ai)

[Демонстрационный стенд](#демонстрационный-стенд)


## Демонстрационный стенд

Приложение развернуто на наших мощностях для удобства демонстрации на домене **[распределяй.рф](https://xn--80aicbulygci4n.xn--p1ai)**.

## Пользовательская документация
Описание платформы для пользователей **[Пользовательская документация](https://evergreen-scarer-984.notion.site/f960dc52059049dea0c9f63e7ee0e761?pvs=4)**

## Воспроизвдение. Быстрый старт
Инструкция по запуску сервисов описана в **[quick-start.md](https://github.com/talkiiing-team/zakupai/blob/main/docs/quick-start.md)**.

## Документация к различным модулям core-алгоритмов (python)
### Модуль предобработки данных
**Документация к модулю**: **[merge_contracts.md](https://github.com/talkiiing-team/zakupai/blob/main/docs/merge_contracts.md)**.

**Код модуля**: **[merge_contracts.py](https://github.com/talkiiing-team/zakupai/tree/main/services/api/ml/lib/merge_contracts.py)**.

**Описание модуля**: реализует начальную предобработку данных - генерирует признаки в разрезе "основное средство-здание-договор-счет"

-----------

### Модуль запуска алгоритма распределения
**[get_distribution_utils.md](https://github.com/talkiiing-team/zakupai/blob/main/docs/get_distribution_utils.md)**.

**Код модуля**: **[get_distribution_utils.py](https://github.com/talkiiing-team/zakupai/tree/main/services/api/ml/lib/get_distribution_utils.py)**.

**Описание модуля**: предподсчитывает необходимые данные и запускает обход по графу модуля all_blocks для всех основных средств

------

### Модуль с кодом обработки графа
**[all_blocks.md](https://github.com/talkiiing-team/zakupai/blob/main/docs/all_blocks.md)**.

**Код модуля**: **[all_blocks.py](https://github.com/talkiiing-team/zakupai/tree/main/services/api/ml/lib/all_blocks.py)**.

**Описание модуля**: Реализует проход по графу-алгоритма, созданному пользователем и расчет метрики, нужной для распределения. Через этот модуль можно увеличивать функционал платформы - создавать новые блоки, обработчики связей.
Базовые классы графов и блоков при этом остаются неизменными.

--------------

### Модуль представления результатов распределения в необходиомом формате
**Документация модуля:** **[generate_test.md](https://github.com/talkiiing-team/zakupai/blob/main/docs/generate_test.md)**.

**Код модуля**: **[generate_test.py](https://github.com/talkiiing-team/zakupai/tree/main/services/api/ml/lib/generate_test.py)**.

**Описание модуля**: в этом модуле происходит определение счета главной книги с помощью обученной модели

--------------

### Модуль прогнозирования расходов
**Документация модуля:** **[forecating.md](https://github.com/talkiiing-team/zakupai/blob/main/docs/forecasting.md)**.

**Код модуля**: Код модуля: **[forecasting.py](https://github.com/talkiiing-team/zakupai/tree/main/services/api/ml/lib/forecasting.py)**.

**Описание модуля:** Модуль для прогнозирования расходов на будущее


