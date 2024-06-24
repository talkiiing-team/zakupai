import { ComponentType, useMemo } from 'react';
import { NodeProps, Position } from 'reactflow';

import { FeatureDataType, getFeatures } from '@/features/graph-designer/api';
import { RootNode } from '@/features/graph-designer/ui/nodes/root-node';
import {
    QuantityConditionCompareOperator,
    QuantityConditionNode,
} from '@/features/graph-designer/ui/nodes/quantity-condition-node';
import { IncreaseTargetActionNode } from '@/features/graph-designer/ui/nodes/increase-target-action-node';
import { DecreaseTargetActionNode } from '@/features/graph-designer/ui/nodes/decrease-target-action-node';
import { MultiplyTargetActionNode } from '@/features/graph-designer/ui/nodes/multiply-target-action-node';
import { AssignTargetActionNode } from '@/features/graph-designer/ui/nodes/assign-target-action-node';
import { AddWithCoefActionNode } from '@/features/graph-designer/ui/nodes/add-with-coef-action-node';
import { MultiplyWithCoefActionNode } from '@/features/graph-designer/ui/nodes/multiply-with-coef-action-node';
import { BooleanConditionNode } from '@/features/graph-designer/ui/nodes/boolean-condition-node';
import { DateConditionNode } from '@/features/graph-designer/ui/nodes/date-condition-node';
import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';
import { NodeColor } from '@/features/graph-designer/model/color';
import useSWRImmutable from 'swr/immutable';

type InventoryItem = {
    displayName: string;
    type: string;
    defaultData: object;
    color: NodeColor;
    component: ComponentType<NodeProps>;
};

const baseNodes: Array<InventoryItem> = [
    {
        displayName: 'Увеличить целевую метрику',
        type: 'inc_target',
        defaultData: {
            type: 'inc_target',
            x: 1,
            requirement: 'any',
            dataType: 'action',
        },
        color: 'gray',
        component: IncreaseTargetActionNode,
    },
    {
        displayName: 'Уменьшить целевую метрику',
        type: 'dec_target',
        defaultData: {
            type: 'dec_target',
            x: 1,
            requirement: 'any',
            dataType: 'action',
        },
        color: 'gray',
        component: DecreaseTargetActionNode,
    },
    {
        displayName: 'Изменить целевую метрику',
        type: 'mul_target',
        defaultData: {
            type: 'mul_target',
            x: 1,
            requirement: 'any',
            dataType: 'action',
        },
        color: 'gray',
        component: MultiplyTargetActionNode,
    },
    {
        displayName: 'Приравнять целевую метрику',
        type: 'assign_target',
        defaultData: {
            type: 'assign_target',
            x: 1,
            requirement: 'any',
            dataType: 'action',
        },
        color: 'gray',
        component: AssignTargetActionNode,
    },
    {
        displayName: 'Прибавить распределение характеристики с коэффицентом',
        type: 'add_with_coef',
        defaultData: {
            type: 'add_with_coef',
            x: 1,
            requirement: 'any',
            dataType: 'action',
        },
        color: 'gray',
        component: AddWithCoefActionNode,
    },
    {
        displayName: 'Умножить на распределение характеристики с коэффицентом',
        type: 'mul_with_coef',
        defaultData: {
            type: 'mul_with_coef',
            x: 1,
            requirement: 'any',
            dataType: 'action',
        },
        color: 'gray',
        component: MultiplyWithCoefActionNode,
    },
    {
        displayName: 'Булево условие',
        type: 'boolean_condition',
        defaultData: {
            type: 'boolean_condition',
            requirement: 'bool',
            dataType: 'bool',
        },
        color: 'red',
        component: BooleanConditionNode,
    },
    {
        displayName: 'Количественное условие',
        type: 'quantity_condition',
        defaultData: {
            type: 'quantity_condition',
            threshold: 1,
            compareOp: QuantityConditionCompareOperator.EQ,
            requirement: 'num',
            dataType: 'bool',
        },
        color: 'yellow',
        component: QuantityConditionNode,
    },
    {
        displayName: 'Условие по дате',
        type: 'date_condition',
        defaultData: {
            type: 'date_condition',
            date: new Date().toLocaleDateString(),
            requirement: 'date',
            dataType: 'bool',
        },
        color: 'blue',
        component: DateConditionNode,
    },
];

const colorByDataType: Record<FeatureDataType, NodeColor> = {
    bool: 'red',
    num: 'yellow',
    date: 'blue',
};

export const useGraphDesignerNodeTypes = (procId: number | string) => {
    const features = useSWRImmutable(
        ['v1/processings/features', procId],
        ([, id]) => getFeatures(id),
    );

    return useMemo(() => {
        const featuresNodes = features.data?.map<InventoryItem>(
            ({ dataType, displayName, type }) => ({
                type,
                displayName,
                defaultData: {
                    type,
                    requirement: 'any',
                    dataType,
                },
                color: colorByDataType[dataType],
                component: (props) => (
                    <BaseNode
                        title={displayName}
                        color={colorByDataType[dataType]}
                        handles={[
                            { position: Position.Left, type: 'target' },
                            { position: Position.Right, type: 'source' },
                        ]}
                        {...props}
                    />
                ),
            }),
        );

        const inventory = [...baseNodes, ...(featuresNodes ?? [])];

        const nodeTypes = inventory.reduce(
            (acc, { type, component }) => {
                acc[type] = component;
                return acc;
            },
            { root: RootNode } as Record<string, InventoryItem['component']>,
        );

        return {
            nodeTypes,
            inventory,
        };
    }, [features.data]);
};
