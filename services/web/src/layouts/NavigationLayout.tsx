import { FC } from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';

export const NavigationLayout: FC = () => {
    return (
        <div className="flex h-full w-full flex-row text-zinc-800">
            <nav className="flex w-52 flex-col items-start justify-start gap-4 border-r border-zinc-200 bg-gradient-to-b from-green-200 via-white to-white py-4">
                <section className="pl-3 text-2xl">
                    <PresentationChartLineIcon className="mr-2 inline h-8 w-8 align-middle" />
                    <span className="align-middle">РаспределAI</span>
                </section>
                <section className="flex flex-grow flex-col gap-4 pl-3 align-middle text-2xl">
                    <Link to="/" className="[&.active]:font-bold">
                        Home
                    </Link>
                    <Link to="/auth" className="[&.active]:font-bold">
                        Auth
                    </Link>
                </section>
                <section className="pl-3 align-middle text-2xl">
                    Auth aboba
                </section>
            </nav>
            <main>
                <Outlet />
            </main>
            <TanStackRouterDevtools position="top-right" />
        </div>
    );
};
