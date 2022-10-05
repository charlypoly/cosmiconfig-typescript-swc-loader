import { resolve } from "path";
import { createRequire } from "module";

export const safeRequire = createRequire(resolve(__dirname, ".."));
