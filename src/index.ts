import type { Loader } from "cosmiconfig";
import { transformSync, type Options } from "@swc/core";
import vm from "vm";
import { safeRequire } from "./safeRequire";

const isCommonJS = !!globalThis.__dirname || process.env.NODE_ENV === "test";

export function TypeScriptSWCLoader(options?: Options): Loader {
  return (_path: string, content: string) => {
    const script = transformSync(content, {
      // TODO: migrate to `ts-config.json` based config (#3)
      module: {
        type: isCommonJS ? "commonjs" : "es6",
      },
      jsc: {
        target: "es5",

        parser: {
          syntax: "typescript",
        },
      },
      ...options,
    });
    const vmScript = new vm.Script(script.code);
    const sandbox = {
      module: { exports: {} },
      exports: {},
      require: safeRequire,
      console,
    };
    vmScript.runInNewContext(sandbox, options);
    return Object.keys(sandbox.module.exports).length > 0
      ? sandbox.module.exports
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sandbox.exports as any).default || sandbox.exports;
  };
}
