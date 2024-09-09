import { initializeDrizzle } from "../utils/db"
import { defineMiddleware } from "astro:middleware";

let drizzle: ReturnType<typeof initializeDrizzle>

export const onRequest = defineMiddleware((context, next) => {
  const DB = context.locals.runtime.env.DB

  if (!drizzle) {
    drizzle = initializeDrizzle(DB)
  }

  context.locals.runtime.env.drizzle = drizzle
})

// declare module "h3" {
//   interface H3EventContext {
//     db: DrizzleD1Database
//   }
// }