import * as prettier from "prettier";
import { BuiltInParserName } from "prettier";
import { Beautifier, Language, BeautifierBeautifyData } from "unibeautify";
import * as readPkgUp from "read-pkg-up";

import options from "./options";
const { pkg } = readPkgUp.sync({ cwd: __dirname });

export const beautifier: Beautifier = {
  name: "Prettier",
  package: pkg,
  options: {
    CSS: options.Style,
    GraphQL: options.Script,
    JavaScript: options.Script,
    JSON: options.Script,
    JSX: options.Script,
    Less: options.Style,
    Markdown: options.Markdown,
    SCSS: options.Style,
    TypeScript: options.Script,
    Vue: options.Script,
  },
  beautify(data: BeautifierBeautifyData) {
    return new Promise<string>((resolve, reject) => {
      const parser = parserForLanguage(data.language);
      if (!parser) {
        return reject(
          new Error(
            `Prettier Parser not found for langauge ${data.language.name}.`
          )
        );
      }
      const text = prettier.format(data.text, {
        ...data.options,
        parser,
        filepath: data.filePath,
      });
      return resolve(text);
    }) as any;
  },
};

function parserForLanguage(language: Language): BuiltInParserName | undefined {
  const prettierLanguage = prettier
    .getSupportInfo()
    .languages.find(lang => lang.name === language.name);
  if (prettierLanguage) {
    return prettierLanguage.parsers[0] as BuiltInParserName;
  }
  return undefined;
}

export default beautifier;
