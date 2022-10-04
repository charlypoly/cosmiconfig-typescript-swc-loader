import { cosmiconfig } from "cosmiconfig";
import { readFileSync } from "fs";
import { resolve } from "path";
import { TypeScriptSWCLoader } from "./index";

describe("TypeScriptSWCLoader", () => {
  const fixturesPath = resolve(__dirname, "fixtures");

  describe("loading a valid configuration typescript file", () => {
    describe("without options", () => {
      it("should return a valid config object", () => {
        expect(
          TypeScriptSWCLoader()(
            "",
            readFileSync(resolve(fixturesPath, "validFile.ts"), "utf8")
          )
        ).toEqual({
          test: true,
        });
      });
    });
    describe("with module options", () => {
      it("should return a valid config object", () => {
        expect(
          TypeScriptSWCLoader({ module: { type: "commonjs" } })(
            "",
            readFileSync(resolve(fixturesPath, "validFile.cts"), "utf8")
          )
        ).toEqual({
          test: true,
        });
      });
    });
  });

  describe("loading a valid configuration typescript file (without default export)", () => {
    describe("without options", () => {
      it("should return a valid config object", () => {
        expect(
          TypeScriptSWCLoader()(
            "",
            readFileSync(resolve(fixturesPath, "validFile2.ts"), "utf8")
          )
        ).toEqual({
          config: {
            test: true,
          },
        });
      });
    });
  });

  describe("loading an INVALID configuration typescript file", () => {
    describe("without options", () => {
      it("should throw an error", () => {
        expect(() =>
          TypeScriptSWCLoader()(
            "",
            readFileSync(resolve(fixturesPath, "invalidFile.ts"), "utf8")
          )
        ).toThrow("t is not defined");
      });
    });
  });

  describe("cosmiconfig integration tests", () => {
    describe("when loading a valid file", () => {
      it("should load config", async () => {
        const cfg = cosmiconfig("test", {
          loaders: {
            ".ts": TypeScriptSWCLoader(),
          },
        });
        const loadedCfg = await cfg.load(resolve(fixturesPath, "validFile.ts"));

        expect(loadedCfg?.config.test).toEqual(true);
      });
    });
    describe("when loading an INVALID file", () => {
      it("should load config", async () => {
        const cfg = cosmiconfig("test", {
          loaders: {
            ".ts": TypeScriptSWCLoader(),
          },
        });
        try {
          await cfg.load(resolve(fixturesPath, "invalidFile.ts"));
        } catch (e: unknown) {
          expect((e as unknown as Error).message).toEqual("t is not defined");
        }
      });
    });
  });
});
