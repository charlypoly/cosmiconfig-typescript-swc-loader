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
            readFileSync(resolve(fixturesPath, "validFile.ts"), 'utf8')
          )
        ).toEqual({
          test: true,
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
            readFileSync(resolve(fixturesPath, "invalidFile.ts"), 'utf8')
          )
        ).toThrow("t is not defined");
      });
    });
  });
});
