import { defineConfig } from "drizzle-kit"
export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "sqlite", // "postgresql" | "mysql"
    out: "./drizzle",
    verbose: true,
    //driver: 'turso',
    dbCredentials: {
      url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/5bec3fa482c6f208f966bb021a3207ffc38d6417d698b1e98e4ed831cdadb13d.sqlite',
    },
  
    // driver: "d1-http",
    // driver: "d1-http", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    // dbCredentials: {
    //     url: "",
    // }
})