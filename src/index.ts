import type { Loader } from "cosmiconfig";
import { transformSync, type Options } from "@swc/core";
import vm from "node:vm";

export function TypeScriptSWCLoader(options?: Options): Loader {
  return (_path: string, content: string) => {
    const script = transformSync(content, {
      module: {
        type: "commonjs",
      },
      jsc: {
        target: "es3",

        parser: {
          syntax: "typescript",
        },
      },
      ...options,
    });
    var vmScript = new vm.Script(script.code);
    const sandbox = { module: { exports: {} }, exports: {} };
    vmScript.runInNewContext(sandbox, options);
    const result: any = sandbox.exports;
    return result.default || result;
  };
}
