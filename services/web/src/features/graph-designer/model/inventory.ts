import {
    ProcessingNodeType,
    ProcessingNodeData,
} from '@/features/graph-designer/model/processing-node';
import { QuantityConditionCompareOperator } from '@/features/graph-designer/ui/nodes/quantity-condition-node';

export const inventory: Array<{
    displayName: string;
    type: ProcessingNodeType;
    defaultData: ProcessingNodeData;
    color: string;
}> = [
    {
        displayName: 'Увеличить целевую метрику',
        type: 'inc_target',
        defaultData: { type: 'inc_target', x: 1 },
        color: 'bg-gray-200',
    },
    {
        displayName: 'Уменьшить целевую метрику',
        type: 'dec_target',
        defaultData: { type: 'dec_target', x: 1 },
        color: 'bg-gray-200',
    },
    {
        displayName: 'Изменить целевую метрику',
        type: 'mul_target',
        defaultData: { type: 'mul_target', x: 1 },
        color: 'bg-gray-200',
    },
    {
        displayName: 'Приравнять целевую метрику',
        type: 'assign_target',
        defaultData: { type: 'assign_target', x: 1 },
        color: 'bg-gray-200',
    },
    {
        displayName: 'Используется в основной деятельности',
        type: 'used_in_core',
        defaultData: { type: 'used_in_core' },
        color: 'bg-red-200',
    },
    {
        displayName: 'Cпособ использования',
        type: 'usage_variants',
        defaultData: { type: 'usage_variants' },
        color: 'bg-red-200',
    },
    {
        displayName: 'Булево условие',
        type: 'boolean_condition',
        defaultData: {
            type: 'boolean_condition',
        },
        color: 'bg-red-200',
    },
    {
        displayName: 'Площадь основного средства',
        type: 'asset_area',
        defaultData: { type: 'asset_area' },
        color: 'bg-yellow-200',
    },
    {
        displayName: 'Количественное условие',
        type: 'quantity_condition',
        defaultData: {
            type: 'quantity_condition',
            threshold: 1,
            compareOp: QuantityConditionCompareOperator.EQ,
        },
        color: 'bg-yellow-200',
    },
    {
        displayName: 'Дата ввода в эксплуатацию',
        type: 'usage_start',
        defaultData: {
            type: 'usage_start',
        },
        color: 'bg-blue-200',
    },
    {
        displayName: 'Дата начала действия связи со зданием',
        type: 'building_action_start',
        defaultData: {
            type: 'building_action_start',
        },
        color: 'bg-blue-200',
    },
    {
        displayName: 'Дата отражения счёта в учетной системе',
        type: 'bill_tracking_start',
        defaultData: {
            type: 'bill_tracking_start',
        },
        color: 'bg-blue-200',
    },
    {
        displayName: 'Условие по дате',
        type: 'date_condition',
        defaultData: {
            type: 'date_condition',
            date: new Date().toLocaleDateString(),
        },
        color: 'bg-blue-200',
    },
];
