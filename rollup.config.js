const {
  nodeResolve: nodeResolvePlugin,
} = require("@rollup/plugin-node-resolve");
const commonjsPlugin = require("@rollup/plugin-commonjs");
const typescriptPlugin = require("rollup-plugin-typescript2");

const pkg = require("./package.json");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/cjs/index.js",
      format: "cjs",
    },
    {
      file: "./dist/esm/index.js",
      format: "es",
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    nodeResolvePlugin(),
    commonjsPlugin(),
    typescriptPlugin({
      typescript: require("typescript"),
    }),
  ],
};
