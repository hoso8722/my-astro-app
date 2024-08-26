import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  security: {
		checkOrigin: true
	},
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
});