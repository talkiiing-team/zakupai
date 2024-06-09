import { Hono } from 'hono';

import authRoutes from '@/routes/v1/auth';
import processingsRoutes from '@/routes/v1/processings';

export const v1Routes = new Hono();

v1Routes.route('/auth', authRoutes);
v1Routes.route('/processings', processingsRoutes);
