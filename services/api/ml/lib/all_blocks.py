import numpy as np
import pandas as pd

from datetime import datetime
from collections import defaultdict

cur_metric = 1

dct_blok_to_next_blocks = defaultdict(list) # по id-шнику лежат все следующие блоки
# в случае ветвлений лежит список [[ребра да][ребра нет]]
dct_id_to_block = dict()
dct_sum_by_feature = None
count_calls = 0

def run_algo(row, dct_sums):
    global dct_sum_by_feature
    dct_sum_by_feature = dct_sums
    init_run()

    dct_id_to_block["root"].forward(row)
    return get_metric_after_run()


def init_graph(raw_graph, features):
    global dct_id_to_block
    raw_nodes = raw_graph["nodes"]
    raw_edges = raw_graph["edges"]

    dct_id_to_block = {block_dct["id"]: get_block(block_dct, features) for block_dct in raw_nodes}

    init_run()
    reset_graph()

    for edge in raw_edges:
        source_id = edge["source"]
        target_id = edge["target"]
        if edge["sourceHandle"] is not None:
            if len(dct_blok_to_next_blocks[source_id]) == 0:
                dct_blok_to_next_blocks[source_id] = [[], []]

            true_or_false = int(edge["sourceHandle"] == "true")
            dct_blok_to_next_blocks[source_id][true_or_false].append(target_id)
        else:
            dct_blok_to_next_blocks[source_id].append(target_id)


def reset_graph():
    global dct_blok_to_next_blocks
    dct_blok_to_next_blocks = defaultdict(list)


def init_run():
    global cur_metric, count_calls
    cur_metric = 1
    count_calls = 0


def get_metric_after_run():
    global cur_metric
    return cur_metric


def run_all_next_blocks(blocks_to_go, next_row, next_input=None):
    for next_block_id in blocks_to_go:
        dct_id_to_block[next_block_id].main_forward(next_row, input=next_input)


def compare_values(one, two, op):
    if op not in [">", "=", "<"]:
        print("Warning! Unknown operator, default: <")

    if op == "=":
        return one == two

    if op == ">":
        return one > two

    return one < two


class Block():
    def forward(self, row, input=None):
        pass

    def main_forward(self, row, input=None):
        global count_calls
        count_calls += 1

        if count_calls == 100:
            return

        self.forward(row, input)


class Feature(Block):
    def __init__(self, id_block, column_name):
        super().__init__()
        self.column_name = column_name
        self.id_block = id_block

    def forward(self, row, input=None):
        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, self.column_name)


class RootBlock(Block):
    def __init__(self, id_block):
        self.id_block = id_block

    def forward(self, row, input=None):
        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


class PlusMainMetric(Block):
    def __init__(self, id_block, x):
        self.x = x
        self.id_block = id_block

    def forward(self, row, input=None):
        global cur_metric
        cur_metric += self.x
        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


class MinusMainMetric(Block):
    def __init__(self, id_block, x):
        self.x = x
        self.id_block = id_block

    def forward(self, row, input=None):
        global cur_metric
        cur_metric -= self.x
        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


class MultMainMetric(Block):
    def __init__(self, id_block, x):
        self.x = x
        self.id_block = id_block

    def forward(self, row, input=None):
        global cur_metric
        cur_metric *= self.x
        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


class SetEqualMainMetric(Block):
    def __init__(self, id_block, x):
        self.x = x
        self.id_block = id_block

    def forward(self, row, input=None):
        global cur_metric
        cur_metric = self.x
        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


# class SetProportionalWithCoef(Block):
#     def __init__(self, id_block, x):
#         self.x = x
#         self.id_block = id_block
#
#     def forward(self, row, input=None):
#         global dct_sum_by_feature, cur_metric
#         cur_metric += self.x * (row[input] / dct_sum_by_feature[input])
#         run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


class AddFeatureDistribution(Block):
    def __init__(self, id_block, x):
        self.x = x
        self.id_block = id_block

    def forward(self, row, input=None):
        global cur_metric, dct_sum_by_feature

        if input is None: raise Exception(f"У блока: {self} не указан тип входных данных")

        value = row[input]
        sum_cur_feature = dct_sum_by_feature[input]
        if sum_cur_feature == 0: sum_cur_feature += 1e-6
        cur_metric += self.x * value / sum_cur_feature

        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


class MulFeatureDistribution(Block):
    def __init__(self, id_block, x):
        self.x = x
        self.id_block = id_block

    def forward(self, row, input=None):
        global cur_metric, dct_sum_by_feature

        if input is None: raise Exception(f"У блока: {self} не указан тип входных данных")

        value = row[input]
        sum_cur_feature = dct_sum_by_feature[input]
        if sum_cur_feature == 0: sum_cur_feature += 1e-6
        cur_metric *= self.x * value / sum_cur_feature

        run_all_next_blocks(dct_blok_to_next_blocks[self.id_block], row, input)


class IfBlockByValue(Block):
    def __init__(self, id_block, x, compare_op):
        super().__init__()
        self.x = x
        self.id_block = id_block
        self.compare_op = compare_op

    def forward(self, row, input=None):
        if input is None: raise Exception(f"У блока: {self} не указан тип входных данных")

        blocks_to_go = dct_blok_to_next_blocks[self.id_block][0]
        if compare_values(row[input], self.x, self.compare_op):
            blocks_to_go = dct_blok_to_next_blocks[self.id_block][1]
        run_all_next_blocks(blocks_to_go, row, None)


class IfBlockByCat(Block):
    def __init__(self, id_block):
        super().__init__()
        self.id_block = id_block

    def forward(self, row, input=None):
        if input is None: raise Exception(f"У блока: {self} не указан тип входных данных")

        blocks_to_go = dct_blok_to_next_blocks[self.id_block][0]
        if not pd.isnull(row[input]) and int(row[input]) == 1:
            blocks_to_go = dct_blok_to_next_blocks[self.id_block][1]
        run_all_next_blocks(blocks_to_go, row, None)


class IfBlockByDatetime(Block):
    def __init__(self, id_block, x):
        super().__init__()
        date_format = "%Y-%m-%d"
        self.x = datetime.strptime(x, date_format)
        self.id_block = id_block

    def forward(self, row, input=None):
        if input is None: raise Exception(f"У блока: {self} не указан тип входных данных")

        blocks_to_go = dct_blok_to_next_blocks[self.id_block][0]
        if row[input] > self.x:
            blocks_to_go = dct_blok_to_next_blocks[self.id_block][1]
        run_all_next_blocks(blocks_to_go, row, None)


def get_block(block_dct, features):
    # запоминаем по какому типу какой сотлбец дергать
    dct_feature_type_to_column = {typ:clmn for clmn, typ, _ in features}

    block_type = block_dct["type"]
    block_id = block_dct["id"]

    if block_type == "root":
        return RootBlock(block_id)

    # ПРИЗНАКИ

    #################### С НОВЫМ РЕДАКТОРОМ ГРАФОВ ВОТ ЭТО УБРАТЬ
    # if block_type == "usage_variants":
    #     return Feature(block_id, 'Признак "Способ использования"')
    #
    # if block_type == "used_in_core":
    #     return Feature(block_id, 'Признак "Используется в основной деятельности"')
    #
    # if block_type == "asset_area":
    #     return Feature(block_id, 'Площадь ОС')
    #
    # if block_type == "usage_start":
    #     return Feature(block_id, "Дата ввода в эксплуатацию")
    ########################################## ВОТ ЭТО ДОБАВИТЬ

    if block_type in dct_feature_type_to_column.keys():
        return Feature(block_id, dct_feature_type_to_column[block_type])


    # TARGET OPERATIONS
    if block_type == "mul_target":
        return MultMainMetric(block_id, x=block_dct["data"]["x"])

    if block_type == "inc_target":
        return PlusMainMetric(block_id, x=block_dct["data"]["x"])

    if block_type == "dec_target":
        return MinusMainMetric(block_id, x=block_dct["data"]["x"])

    if block_type == "assign_target":
        return SetEqualMainMetric(block_id, x=block_dct["data"]["x"])

    # CONDITIONS
    if block_type == "quantity_condition":
        return IfBlockByValue(block_id, x=block_dct["data"]["threshold"],
                              compare_op=block_dct["data"]["compareOp"])

    if block_type == "boolean_condition":
        return IfBlockByCat(block_id,)

    if block_type == "date_condition":
        return IfBlockByDatetime(block_id, x=block_dct["data"]["date"])

    if block_type == "add_with_coef":
        return AddFeatureDistribution(block_id, x=block_dct["data"]["x"])

    if block_type == "mul_with_coef":
        return MulFeatureDistribution(block_id, x=block_dct["data"]["x"])

    print(f"Warning: unknown block: {block_dct}")

