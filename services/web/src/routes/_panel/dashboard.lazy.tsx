import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_panel/dashboard')({
    component: () => {
        return (
            <div className="p-2">
                <h3>Welcome /panel!</h3>
            </div>
        );
    },
});
