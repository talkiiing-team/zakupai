import useSWR from 'swr';

import { createLazyFileRoute } from '@tanstack/react-router';
import { getProcessingsHistory } from '@/features/processings/api';

export const Route = createLazyFileRoute('/_panel/processings/')({
    component: () => {
        const history = useSWR('v1/processings/', getProcessingsHistory);

        return (
            <main className="relative flex h-full w-full flex-row">
                <div className="m-24 w-full">
                    <h1 className="mb-4 text-3xl">История распределений</h1>
                    <ul className="flex h-full flex-col gap-4 overflow-visible">
                        {history.data?.map(({ id, status, createdAt }) => (
                            <li className="border-zinc border p-4" key={id}>
                                <span>Распределение #{id}</span>
                                <span>{status}</span>
                                <div className="flex-grow"></div>
                                <span>Создано {createdAt}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        );
    },
});
