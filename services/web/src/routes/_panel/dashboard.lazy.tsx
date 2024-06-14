import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_panel/dashboard')({
    component: () => {
        return (
            <main className="p-2">
                <h3>Welcome /panel!</h3>
            </main>
        );
    },
});
