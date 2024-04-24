import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

import { env } from "@/config/env.js";

const { Client } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrator() {
	try {
		const client = new Client({
			connectionString: env.DATABASE_URI,
			ssl: true,
		});

		await client.connect();
		const dbMigration = drizzle(client);

		await migrate(dbMigration, {
			migrationsFolder: resolve(__dirname, "migrations"),
		});

		console.info("Migration done");
		process.exit(0);
	} catch (err) {
		console.error("Migration error: ", err);
		process.exit(1);
	}
}

migrator();
