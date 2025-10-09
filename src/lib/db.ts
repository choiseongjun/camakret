import { Pool } from 'pg';

declare global {
  var pool: Pool | undefined;
}

let db: Pool;

if (process.env.NODE_ENV === 'production') {
  db = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  if (!global.pool) {
    global.pool = new Pool({
      connectionString: process.env.POSTGRES_URL || 'postgresql://user:password@localhost:5432/creator_store',
    });
  }
  db = global.pool;
}

export { db };
