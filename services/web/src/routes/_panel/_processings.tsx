import { Link, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_panel/_processings')({
    component: () => (
        <div className="flex h-full w-full flex-col">
            <nav className="border-b border-zinc-300 p-4">
                <ul className="text-md flex flex-row gap-4 align-middle">
                    <li>
                        <Link to="/processings/upload">Датасет</Link>
                    </li>
                    <li>
                        <Link to="/processings/graph">Алгоритм</Link>
                    </li>
                    <li>
                        <Link to="/processings/distribution">
                            Распределение
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    ),
});
