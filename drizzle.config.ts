import { defineConfig } from "drizzle-kit"
export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "sqlite", // "postgresql" | "mysql"
    out: "./drizzle",
    verbose: true,
    // driver: "d1-http",
    // driver: "d1-http", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    // dbCredentials: {
    //     url: "",
    // }
})