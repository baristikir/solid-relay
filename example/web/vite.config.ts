import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import relay from "vite-plugin-relay";

export default defineConfig({
	plugins: [relay, solidPlugin()],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
});
