import { Node } from 'reactflow';

import { IncreaseTargetActionData } from '@/features/graph-designer/nodes/increase-target-node';
import { DatasetNodeData } from '@/features/graph-designer/nodes/dataset-node';

export type ProcessingNode = Node<ProcessingNodeData, ProcessingNodeType>;

export type ProcessingNodeData = DatasetNodeData | IncreaseTargetActionData;
//     | DecreaseTargetActionData
//     | MultiplyTargetActionData
//     | AssignTargetActionData
//     | AssignFeatureTargetActionData;

// type DecreaseTargetActionData = {
//     type: 'dec_target';
//     parameters: [{ name: 'X'; value: number }];
// };

// type MultiplyTargetActionData = {
//     type: 'mul_target';
//     parameters: [{ name: 'X'; value: number }];
// };

// type AssignTargetActionData = {
//     type: 'assign_target';
//     parameters: [{ name: 'X'; value: number }];
// };

// type AssignFeatureTargetActionData = {
//     type: 'assign_feature_target';
//     parameters: { name: 'X'; value: number };
//     input: [{ name: 'Признак'; node: string }];
// };

export type ProcessingNodeType = ProcessingNodeData['type'];
