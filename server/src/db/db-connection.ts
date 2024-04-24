import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { env } from "@/config/env.js";

const { Pool } = pg;

const pool = new Pool({ connectionString: env.DATABASE_URI, ssl: true });

export const db = drizzle(pool);
