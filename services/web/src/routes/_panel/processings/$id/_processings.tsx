/* eslint-disable react-hooks/rules-of-hooks */
import { getProcessingById } from '@/features/processings/api';
import { ProcessingStatus } from '@/features/processings/model';
import {
    Link,
    Outlet,
    createFileRoute,
    useParams,
} from '@tanstack/react-router';
import useSWR from 'swr';

export const Route = createFileRoute('/_panel/processings/$id/_processings')({
    component: () => {
        const { id: procId } = useParams({
            from: '/_panel/processings/$id/_processings',
        });

        const proc = useSWR(
            ['v1/processings', procId],
            ([, id]) => getProcessingById(id),
            {
                refreshInterval: 5_000,
            },
        );

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
                        {proc.data &&
                            proc.data.status >= ProcessingStatus.MERGED && (
                                <li>
                                    <Link
                                        to="/processings/$id/graph"
                                        params={{ id: procId }}
                                    >
                                        Алгоритм
                                    </Link>
                                </li>
                            )}
                        {proc.data &&
                            proc.data.status >=
                                ProcessingStatus.DISTRIBUTED && (
                                <li>
                                    <Link
                                        to="/processings/$id/distribution"
                                        params={{ id: procId }}
                                    >
                                        Распределение
                                    </Link>
                                </li>
                            )}
                        {proc.data &&
                            proc.data.status >=
                                ProcessingStatus.DISTRIBUTED && (
                                <li>
                                    <Link
                                        to="/processings/$id/forecast"
                                        params={{ id: procId }}
                                    >
                                        Предсказание
                                    </Link>
                                </li>
                            )}
                    </ul>
                </nav>
                <Outlet />
            </div>
        );
    },
});
