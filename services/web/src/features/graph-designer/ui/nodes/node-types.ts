import { RootNode } from '@/features/graph-designer/ui/nodes/root-node';
import { IncreaseTargetNode } from '@/features/graph-designer/ui/nodes/increase-target-node';
import { DecreaseTargetNode } from '@/features/graph-designer/ui/nodes/decrease-target-node';
import { MultiplyTargetNode } from '@/features/graph-designer/ui/nodes/multiply-target-node';
import { AssignTargetNode } from '@/features/graph-designer/ui/nodes/assign-target-node';
import { UsedInCoreNode } from '@/features/graph-designer/ui/nodes/used-in-core-node';
import { UsageVariantsNode } from '@/features/graph-designer/ui/nodes/usage-variants-node';
import { AssetAreaNode } from '@/features/graph-designer/ui/nodes/asset-area-node';
import { QuantityConditionNode } from '@/features/graph-designer/ui/nodes/quantity-condition-node';

export const nodeTypes = {
    root: RootNode,
    inc_target: IncreaseTargetNode,
    dec_target: DecreaseTargetNode,
    mul_target: MultiplyTargetNode,
    assign_target: AssignTargetNode,
    used_in_core: UsedInCoreNode,
    usage_variants: UsageVariantsNode,
    asset_area: AssetAreaNode,
    quantity_condition: QuantityConditionNode,
};
