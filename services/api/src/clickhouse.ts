import { createClient } from '@clickhouse/client';

import { CLICKHOUSE_URL } from '@/env';

createClient({
    url: CLICKHOUSE_URL,
});
