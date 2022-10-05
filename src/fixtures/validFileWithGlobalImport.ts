// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

type Config = { test?: boolean };

const config: Config = {
  test: true,
};

export default config;
