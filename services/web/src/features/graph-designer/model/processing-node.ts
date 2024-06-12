import { Node } from 'reactflow';

import { RootData } from '@/features/graph-designer/ui/nodes/root-node';
import { AssignTargetActionData } from '@/features/graph-designer/ui/nodes/assign-target-action-node';
import { DecreaseTargetActionData } from '@/features/graph-designer/ui/nodes/decrease-target-action-node';
import { IncreaseTargetActionData } from '@/features/graph-designer/ui/nodes/increase-target-action-node';
import { MultiplyTargetActionData } from '@/features/graph-designer/ui/nodes/multiply-target-action-node';
import { UsedInCoreBooleanFeatureData } from '@/features/graph-designer/ui/nodes/used-in-core-boolean-feature-node';
import { UsageVariantsBooleanFeatureData } from '@/features/graph-designer/ui/nodes/usage-variants-boolean-feature-node';
import { BooleanConditionData } from '@/features/graph-designer/ui/nodes/boolean-condition-node';
import { AssetAreaQuantityFeatureData } from '@/features/graph-designer/ui/nodes/asset-area-quantity-feature-node';
import { QuantityConditionData } from '@/features/graph-designer/ui/nodes/quantity-condition-node';
import { UsageStartDateFeatureData } from '@/features/graph-designer/ui/nodes/usage-start-date-feature-node';
import { BuildingActionStartDateFeatureData } from '@/features/graph-designer/ui/nodes/building-action-start-date-feature-node';
import { BillTrackingStartDateFeatureData } from '@/features/graph-designer/ui/nodes/bill-tracking-start-date-feature-node';
import { DateConditionData } from '@/features/graph-designer/ui/nodes/date-condition-node';

export type ProcessingNode = Node<ProcessingNodeData, ProcessingNodeType>;

export type ProcessingNodeData =
    | RootData
    | IncreaseTargetActionData
    | DecreaseTargetActionData
    | MultiplyTargetActionData
    | AssignTargetActionData
    | UsedInCoreBooleanFeatureData
    | UsageVariantsBooleanFeatureData
    | BooleanConditionData
    | AssetAreaQuantityFeatureData
    | QuantityConditionData
    | UsageStartDateFeatureData
    | BuildingActionStartDateFeatureData
    | BillTrackingStartDateFeatureData
    | DateConditionData;

export type ProcessingNodeType = ProcessingNodeData['type'];
