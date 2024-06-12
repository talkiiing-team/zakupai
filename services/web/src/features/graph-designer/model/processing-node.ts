import { Node } from 'reactflow';

import { RootData } from '@/features/graph-designer/ui/nodes/root-node';
import { AssignTargetActionData } from '@/features/graph-designer/ui/nodes/assign-target-node';
import { DecreaseTargetActionData } from '@/features/graph-designer/ui/nodes/decrease-target-node';
import { IncreaseTargetActionData } from '@/features/graph-designer/ui/nodes/increase-target-node';
import { MultiplyTargetActionData } from '@/features/graph-designer/ui/nodes/multiply-target-node';
import { UsedInCoreFeatureData } from '@/features/graph-designer/ui/nodes/used-in-core-node';
import { UsageVariantsFeatureData } from '@/features/graph-designer/ui/nodes/usage-variants-node';
import { AssetAreaFeatureData } from '@/features/graph-designer/ui/nodes/asset-area-node';
import { QuantityConditionData } from '@/features/graph-designer/ui/nodes/quantity-condition-node';

export type ProcessingNode = Node<ProcessingNodeData, ProcessingNodeType>;

export type ProcessingNodeData =
    | RootData
    | IncreaseTargetActionData
    | DecreaseTargetActionData
    | MultiplyTargetActionData
    | AssignTargetActionData
    | UsedInCoreFeatureData
    | UsageVariantsFeatureData
    | AssetAreaFeatureData
    | QuantityConditionData;

export type ProcessingNodeType = ProcessingNodeData['type'];
