import { RootNode } from '@/features/graph-designer/ui/nodes/root-node';
import { IncreaseTargetActionNode } from '@/features/graph-designer/ui/nodes/increase-target-action-node';
import { DecreaseTargetActionNode } from '@/features/graph-designer/ui/nodes/decrease-target-action-node';
import { MultiplyTargetActionNode } from '@/features/graph-designer/ui/nodes/multiply-target-action-node';
import { AssignTargetActionNode } from '@/features/graph-designer/ui/nodes/assign-target-action-node';
import { UsedInCoreBooleanFeatureNode } from '@/features/graph-designer/ui/nodes/used-in-core-boolean-feature-node';
import { UsageVariantsBooleanFeatureNode } from '@/features/graph-designer/ui/nodes/usage-variants-boolean-feature-node';
import { BooleanConditionNode } from '@/features/graph-designer/ui/nodes/boolean-condition-node';
import { AssetAreaQuantityFeatureNode } from '@/features/graph-designer/ui/nodes/asset-area-quantity-feature-node';
import { QuantityConditionNode } from '@/features/graph-designer/ui/nodes/quantity-condition-node';
import { UsageStartDateFeatureNode } from '@/features/graph-designer/ui/nodes/usage-start-date-feature-node';
import { BuildingActionStartDateFeatureNode } from '@/features/graph-designer/ui/nodes/building-action-start-date-feature-node';
import { BillTrackingStartDateFeatureNode } from '@/features/graph-designer/ui/nodes/bill-tracking-start-date-feature-node';
import { DateConditionNode } from '@/features/graph-designer/ui/nodes/date-condition-node';

export const nodeTypes = {
    root: RootNode,
    inc_target: IncreaseTargetActionNode,
    dec_target: DecreaseTargetActionNode,
    mul_target: MultiplyTargetActionNode,
    assign_target: AssignTargetActionNode,
    used_in_core: UsedInCoreBooleanFeatureNode,
    usage_variants: UsageVariantsBooleanFeatureNode,
    boolean_condition: BooleanConditionNode,
    asset_area: AssetAreaQuantityFeatureNode,
    quantity_condition: QuantityConditionNode,
    usage_start: UsageStartDateFeatureNode,
    building_action_start: BuildingActionStartDateFeatureNode,
    bill_tracking_start: BillTrackingStartDateFeatureNode,
    date_condition: DateConditionNode,
};
