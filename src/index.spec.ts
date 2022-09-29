import { readFileSync } from "fs";
import { resolve } from "path";
import { TypeScriptSWCLoader } from ".";

describe("TypeScriptSWCLoader", () => {
  const fixturesPath = resolve(__dirname, "fixtures");

  describe("loading a valid configuration typescript file", () => {
    describe("without options", () => {
      it("should return a valid config object", () => {
        expect(
          TypeScriptSWCLoader()(
            "",
            readFileSync(resolve(fixturesPath, "validFile.ts")).toString()
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
            readFileSync(resolve(fixturesPath, "invalidFile.ts")).toString()
          )
        ).toThrow("t is not defined");
      });
    });
  });
});
