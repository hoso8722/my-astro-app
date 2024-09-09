import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro:middleware";

import { initializeLucia } from "./utils/auth";
import type { User, Session } from "lucia"

let lucia: ReturnType<typeof initializeLucia>

export const onRequest = defineMiddleware(async(context, next) => {
	// console.log("---execute onRequest middleware.ts---")
	// console.log(context)
	// Initialize auth (Lucia)
	const DB = context.locals.runtime.env.DB
	if (!lucia) {
		lucia = initializeLucia(DB)
	}
	context.locals.runtime.env.lucia = lucia

	if (context.request.method !== "GET") {
		const originHeader = context.request.headers.get("Origin");
		const hostHeader = context.request.headers.get("Host");
		if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
			return new Response(null, {
				status: 403
			});
		}
	}

	const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		context.locals.runtime.env.user = null;
		context.locals.runtime.env.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}
	context.locals.runtime.env.session = session;
	context.locals.runtime.env.user = user;
	return next();
});