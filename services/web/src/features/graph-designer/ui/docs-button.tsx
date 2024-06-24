import { FC } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export const DocsButton: FC = () => (
    <a
        href="https://evergreen-scarer-984.notion.site/f960dc52059049dea0c9f63e7ee0e761"
        className="absolute bottom-32 right-4 block rounded-md border border-zinc-300 bg-white p-2 text-center align-middle shadow-md"
        target="_blank"
    >
        <InformationCircleIcon className="h-12 w-12" />
    </a>
);
