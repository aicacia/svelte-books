import { dirname } from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import esmImportToUrl from "rollup-plugin-esm-import-to-url";
import svelteConfig from "./svelte.config";
import pkg from "./package.json";

export default [
  {
    input: pkg.svelte,
    output: [
      {
        dir: dirname(pkg.module),
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      esmImportToUrl({
        imports: {
          tslib: "https://unpkg.com/tslib@2/tslib.es6.js",
          svelte: "https://unpkg.com/svelte@3/index.mjs",
          "svelte/internal": "https://unpkg.com/svelte@3/internal/index.mjs",
          "svelte/store": "https://unpkg.com/svelte@3/store/index.mjs",
        },
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      resolve({ browser: true }),
      commonjs(),
      typescript(),
      postcss({
        extract: "index.css",
      }),
      svelte({
        ...svelteConfig,
        compilerOptions: {
          accessors: true,
        },
        exclude: ["node_modules/**"],
        emitCss: true,
      }),
    ],
  },
];
