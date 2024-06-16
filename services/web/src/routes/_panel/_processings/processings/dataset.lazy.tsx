import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_panel/_processings/processings/dataset')({
    component: () => <div>Hello /_panel/processings/dataset!</div>,
});
