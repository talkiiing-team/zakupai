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
        displayName: 'Присвоить целевую метрику',
        type: 'assign_target',
        defaultData: { type: 'assign_target', x: 1 },
        color: 'bg-gray-200',
    },
    {
        displayName: 'Используется в основной деятельности',
        type: 'used_in_core',
        defaultData: { type: 'used_in_core' },
        color: 'bg-yellow-200',
    },
    {
        displayName: 'Cпособ использования',
        type: 'usage_variants',
        defaultData: { type: 'usage_variants' },
        color: 'bg-yellow-200',
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
];
