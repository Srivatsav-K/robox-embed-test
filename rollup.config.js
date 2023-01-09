// rollup.config.js
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import url from "postcss-url";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

const srcDir = "src/scripts/";
const distDir = "build/";

const plugins = () => [
  resolve(),
  commonjs(),
  eslint({
    fix: true,
    exclude: ["./node_modules/**", "./src/styles/**"],
  }),
  babel({
    exclude: "node_modules/**",
    babelHelpers: "bundled",
  }),
  replace({
    exclude: "node_modules/**",
    preventAssignment: false,
    ENV: JSON.stringify(process.env.NODE_ENV || "development"),
  }),
  postcss({
    plugins: [
      url({
        url: "inline",
      }),
      autoprefixer(),
      cssnano(),
    ],
    inject: false,
    extract: true,
    sourceMap: process.env.NODE_ENV === "production" ? false : "inline",
    minimize: process.env.NODE_ENV === "production",
  }),
  process.env.NODE_ENV === "production" &&
    terser({ mangle: { reserved: ["tf"] } }),
];

function setupBuild(src, dist, name) {
  return {
    input: srcDir + src,
    output: {
      file: distDir + dist,
      format: "iife",
      name,
      sourcemap: process.env.NODE_ENV === "production" ? false : "inline",
    },
    plugins: plugins(),
    onwarn: function (warning, warner) {
      if (warning.code === "CIRCULAR_DEPENDENCY") {
        if (warning.importer && warning.importer.startsWith("node_modules/")) {
          return;
        }
      }
      warner(warning);
    },
  };
}

export default [
  setupBuild("robox.js", "robox.js", "Robox"),
  setupBuild("roboxScript.js", "roboxScript.js"),
];
