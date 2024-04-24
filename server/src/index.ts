import { env } from "@/config/env.js";
import { createServer } from "@/server.js";
import closeWithGrace from "close-with-grace";

async function main() {
	const server = await createServer();

	await server.listen({ port: env.PORT, host: env.HOST });

	server.log.debug(env, "Here are the envs");

	server.log.debug(
		server.printRoutes({ commonPrefix: false, includeHooks: true }),
	);

	closeWithGrace({ delay: 3000 }, async ({ signal, err }) => {
		if (err)
			server.log.error({ message: "Server closed unexpectedly", error: err });
		server.log.debug({ message: "Server closing", signal });

		await server.close();
		server.log.info("Server closed successfully");
	});
}

main();
