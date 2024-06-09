import { createFileRoute } from '@tanstack/react-router';

import { NavigationLayout } from '@/layouts/NavigationLayout';

export const Route = createFileRoute('/panel/_layout')({
    component: NavigationLayout,
});
