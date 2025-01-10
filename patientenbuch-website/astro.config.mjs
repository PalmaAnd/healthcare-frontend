// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "http://localhost:4321/", // TODO Add site: value
    integrations: [tailwind({
        applyBaseStyles: false,
      }), sitemap(), react()],
});