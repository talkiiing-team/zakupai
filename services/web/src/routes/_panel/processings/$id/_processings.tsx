/* eslint-disable react-hooks/rules-of-hooks */
import {
    Link,
    Outlet,
    createFileRoute,
    useParams,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_panel/processings/$id/_processings')({
    component: () => {
        const { id: procId } = useParams({
            from: '/_panel/processings/$id/_processings',
        });

        return (
            <div className="flex h-full w-full flex-col">
                <nav className="border-b border-zinc-300 p-4">
                    <ul className="text-md flex flex-row gap-4 align-middle">
                        <li>
                            <Link
                                to="/processings/$id/upload"
                                params={{ id: procId }}
                            >
                                Датасет
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/processings/$id/graph"
                                params={{ id: procId }}
                            >
                                Алгоритм
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/processings/$id/distribution"
                                params={{ id: procId }}
                            >
                                Распределение
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/processings/$id/forecast"
                                params={{ id: procId }}
                            >
                                Предсказание
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        );
    },
});
