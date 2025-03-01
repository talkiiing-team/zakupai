import {
  generateSchemaTypes,
  generateFetchers
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  zakupai: {
    from: {
      source: "url",
      url: "https://api.\u0437\u0430\u043A\u0443\u043F-\u0430\u0439.\u0440\u0444/openapi.json",
    },
    outputDir: "src/shared/api",
    to: async (context) => {
      const filenamePrefix = "zakupai";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      }); 
    },
  },
});
