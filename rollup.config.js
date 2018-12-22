import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";
import pkg from "./package.json";

// see https://github.com/alexjoverm/typescript-library-starter/blob/master/rollup.config.ts
// for working example

export default [
  // browser-friendly UMD build
  {
    external: ["node-html-parser", "axios"],
    input: "src/index.ts",
    output: {
      name: "am-scraper",
      file: pkg.browser,
      format: "umd"
    },
    sourcemap: true,
    plugins: [
      resolve({ browser: true, module: true }),
      commonjs(),
      typescript({ verbosity: 2, abortOnError: false }),
      json()
    ]
  },
  {
    input: "src/index.ts",
    external: ["node-html-parser", "axios"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [typescript({ verbosity: 2, abortOnError: false })]
  }
];
