import type { APIContext } from "astro";
import { drizzle } from "drizzle-orm/d1";
import { todos } from "..//db/schema";

export async function GET({ locals }: APIContext) {
  const db = drizzle(locals.runtime.env.DB);

  const result = await db.select().from(todos).all();

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}