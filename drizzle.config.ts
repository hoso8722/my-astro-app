import { defineConfig } from "drizzle-kit"
export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "sqlite", // "postgresql" | "mysql"
    out: "./drizzle",
    verbose: true,
    //driver: 'turso',
    dbCredentials: {
      url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/6ea854ffd46e946d09e17dc4b314eb1fc43f66c91b9e7d6bcb58dde40851fdea.sqlite',
    },
  
    // driver: "d1-http",
    // driver: "d1-http", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    // dbCredentials: {
    //     url: "",
    // }
})