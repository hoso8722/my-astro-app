// import { lucia } from "../../lib/auth";
import { generateId } from "lucia";
import { hash } from "@node-rs/argon2";
// import { db } from "../../lib/db";
import { SqliteError } from "better-sqlite3";
import { initializeDrizzle } from "../../utils/db";
import { todos } from "../..//db/schema";

import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
    console.log('=========formData')
    console.log(formData)
	const username = formData.get("username");
	// username must be between 6 ~ 30 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 6 || 30 < username.length ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return new Response(
			JSON.stringify({
				error: "Invalid username"
			}),
			{
				status: 400
			}
		);
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return new Response(
			JSON.stringify({
				error: "Invalid password"
			}),
			{
				status: 400
			}
		);
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateId(15);

    // initialize Drizzle orm
    const adapter = context.locals.runtime.env.DB
    const db = initializeDrizzle(adapter)
    const result = await db.select().from(todos).all();
    
    console.log(result)
    // check duplication username and passwordHash

    return new Response()
	// try {
	// 	db.prepare("INSERT INTO user (id, username, password_hash) VALUES(?, ?, ?)").run(
	// 		userId,
	// 		username,
	// 		passwordHash
	// 	);

	// 	const session = await lucia.createSession(userId, {});
	// 	const sessionCookie = lucia.createSessionCookie(session.id);
	// 	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	// 	return new Response();
	// } catch (e) {
	// 	if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
	// 		return new Response(
	// 			JSON.stringify({
	// 				error: "Username already used"
	// 			}),
	// 			{
	// 				status: 400
	// 			}
	// 		);
	// 	}
	// 	return new Response(
	// 		JSON.stringify({
	// 			error: "An unknown error occurred"
	// 		}),
	// 		{
	// 			status: 500
	// 		}
	// 	);
	// }
}