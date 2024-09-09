import { drizzle } from "drizzle-orm/d1"
import * as schema from "../db/schema"

export function initializeDrizzle(db: D1Database) {
  return drizzle(db)
}