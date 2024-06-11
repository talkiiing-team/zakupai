import { FC } from 'react';
import { RouterProvider } from '@tanstack/react-router';

import { router } from '@/app/router';

import '@/app/index.css';

export const App: FC = () => {
    return <RouterProvider router={router} />;
};
