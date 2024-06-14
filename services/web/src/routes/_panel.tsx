import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';

export const Route = createFileRoute('/_panel')({
    component: () => {
        return (
            <div className="flex h-full w-full flex-row text-zinc-800">
                <nav className="flex w-56 flex-shrink-0 flex-grow-0 flex-col items-start justify-start gap-4 border-r border-zinc-200 bg-gradient-to-b from-green-200 via-white to-white py-4">
                    <div className="pl-4 text-2xl">
                        <PresentationChartLineIcon className="mr-2 inline h-8 w-8 align-middle" />
                        <span className="align-middle">РаспределAI</span>
                    </div>
                    <nav className="flex-grow pl-4">
                        <ul className="text-md flex flex-col gap-4 align-middle">
                            <li>
                                <Link to="/processings/upload">Загрузка</Link>
                            </li>
                            <li>
                                <Link to="/processings/dataset">Датасет</Link>
                            </li>
                            <li>
                                <Link to="/processings/graph">Граф</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="pl-4 align-middle">Auth aboba</div>
                </nav>
                <Outlet />
            </div>
        );
    },
});
