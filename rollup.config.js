import { dirname } from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import esmImportToUrl from "rollup-plugin-esm-import-to-url";
import svelteConfig from "./svelte.config";
import pkg from "./package.json";

const defaultPlugins = [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve({ browser: true }),
    commonjs({
      transformMixedEsModules: true,
    }),
  ],
  imports = {
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
  },
  external = [
    ...new Set(Object.keys(pkg.peerDependencies).concat(Object.keys(imports))),
  ];

export default [
  {
    input: pkg.svelte,
    output: [
      {
        file: "browser/index.js",
        format: "esm",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      esmImportToUrl({
        imports,
      }),
      ...defaultPlugins,
      typescript(),
      svelte({
        ...svelteConfig,
        compilerOptions: {
          accessors: true,
        },
        emitCss: false,
      }),
    ],
  },
  {
    input: pkg.svelte,
    output: [
      {
        dir: dirname(pkg.module),
        format: "esm",
        sourcemap: true,
        preserveModules: true,
      },
    ],
    external,
    plugins: [
      ...defaultPlugins,
      typescript({
        declaration: false,
        declarationDir: null,
      }),
      svelte({
        ...svelteConfig,
        compilerOptions: {
          accessors: true,
        },
        emitCss: false,
      }),
    ],
  },
];
