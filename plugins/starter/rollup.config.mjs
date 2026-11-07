import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "esbuild";
import { createPluginBundlerPresets } from "@paperclipai/plugin-sdk/bundlers";

const presets = createPluginBundlerPresets({ uiEntry: "src/ui/index.tsx" });

// Transpile TypeScript with esbuild. @rollup/plugin-typescript reads the classic
// `typescript` JS API at load time, which TypeScript 7 no longer exposes.
// Type checking stays with `tsc` (`pnpm typecheck`).
function esbuildTypeScript() {
  return {
    name: "esbuild-typescript",
    async transform(code, id) {
      const file = id.split("?")[0];
      if (file.includes("/node_modules/") || !/\.[cm]?tsx?$/.test(file)) return null;
      const result = await esbuild.transform(code, {
        loader: file.endsWith("x") ? "tsx" : "ts",
        jsx: "automatic",
        target: "es2022",
        sourcemap: true,
        sourcefile: file,
      });
      return { code: result.code, map: result.map };
    },
  };
}

function withPlugins(config) {
  if (!config) return null;
  return {
    ...config,
    plugins: [
      json(),
      nodeResolve({
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
      }),
      esbuildTypeScript(),
    ],
  };
}

export default [
  withPlugins(presets.rollup.manifest),
  withPlugins(presets.rollup.worker),
  withPlugins(presets.rollup.ui),
].filter(Boolean);
