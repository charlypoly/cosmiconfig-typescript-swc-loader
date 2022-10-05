import { createRequire } from "module";

export const safeRequire = createRequire(process.cwd());
