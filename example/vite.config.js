import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import esmImportToUrl from "rollup-plugin-esm-import-to-url";

const imports = {
  tslib: "https://unpkg.com/tslib@2/tslib.es6.js",
  svelte: "https://unpkg.com/svelte@3/internal/index.mjs",
  "svelte/animate": "https://unpkg.com/svelte@3/animate/index.mjs",
  "svelte/easing": "https://unpkg.com/svelte@3/easing/index.mjs",
  "svelte/internal": "https://unpkg.com/svelte@3/internal/index.mjs",
  "svelte/motion": "https://unpkg.com/svelte@3/motion/index.mjs",
  "svelte/ssr": "https://unpkg.com/svelte@3/ssr/index.mjs",
  "svelte/store": "https://unpkg.com/svelte@3/store/index.mjs",
  "svelte/transition": "https://unpkg.com/svelte@3/transition/index.mjs",
  "svelte/compiler": "https://unpkg.com/svelte@3/compiler.mjs",
  "svelte-hmr": "https://unpkg.com/svelte-hmr@0.14/index.js",
  "svelte-hmr/runtime/hot-api-esm.js":
    "https://unpkg.com/svelte-hmr@0.14/runtime/hot-api-esm.js",
  "svelte-hmr/runtime/proxy-adapter-dom.js":
    "https://unpkg.com/svelte-hmr@0.14/runtime/proxy-adapter-dom.js",
};

export default defineConfig({
  base: "/svelte-books/",
  optimizeDeps: {
    exclude: Object.keys(imports),
    include: [],
  },
  plugins: [
    {
      ...esmImportToUrl({
        imports,
      }),
      enforce: "pre",
    },
    svelte(),
  ],
});
