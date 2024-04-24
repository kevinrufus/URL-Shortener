import { FastifyReply, FastifyRequest } from "fastify";

import {
	createUserRequestBodyType,
	getUserByIdRequestParamsType,
	getUsersByRoleRequestParamsType,
} from "./users.schema.js";
import {
	createUser,
	getUserById,
	getUsers,
	getUsersByRole,
} from "./users.service.js";

export async function createUserHandler(
	req: FastifyRequest<{ Body: createUserRequestBodyType }>,
	res: FastifyReply,
) {
	const userData = req.body;

	const user = await createUser(userData);

	if (!user) {
		res.code(404);
		return { message: "User creation unsuccessful" };
	}

	return user;
}

export async function getUsersHandler() {
	const users = await getUsers();

	return users;
}

export async function getUsersByRoleHandler(
	req: FastifyRequest<{
		Params: getUsersByRoleRequestParamsType;
	}>,
	res: FastifyReply,
) {
	const { role } = req.params;

	const users = await getUsersByRole(role);

	if (!users) {
		res.code(404);
		return {
			message: "No users found with the provided Role",
		};
	}

	return users;
}

export async function getCurrentUserHandler(
	req: FastifyRequest,
	res: FastifyReply,
) {
	const { id } = req.user;

	const user = await getUserById(id);

	if (!user) {
		res.code(404);
		return {
			message: "Invalid User ID",
		};
	}

	const { password, ...rest } = user;

	const safeUser = {
		...rest,
	};

	return safeUser;
}

export async function getUserByIdHandler(
	req: FastifyRequest<{
		Params: getUserByIdRequestParamsType;
	}>,
	res: FastifyReply,
) {
	const { id } = req.params;

	const user = await getUserById(id);

	if (!user) {
		res.code(404);
		return {
			message: "Invalid User ID",
		};
	}

	const { password, ...rest } = user;

	const safeUser = {
		...rest,
	};

	return safeUser;
}
