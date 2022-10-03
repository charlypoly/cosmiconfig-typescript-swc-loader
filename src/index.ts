import type { Loader } from "cosmiconfig";
import { transformSync, type Options } from "@swc/core";
import vm from "vm";

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
    const vmScript = new vm.Script(script.code);
    const sandbox = { module: { exports: {} }, exports: {} };
    vmScript.runInNewContext(sandbox, options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = sandbox.exports;
    return result.default || result;
  };
}
