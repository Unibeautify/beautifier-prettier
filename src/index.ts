import * as prettier from "prettier";
import { BuiltInParserName } from "prettier";
import { Beautifier, Language } from "unibeautify";
import { wrapBeautifier, AtomPackage } from "unibeautify-beautifier";

const pkg = require("../package.json");

export const beautifier: Beautifier = {
  name: "Prettier",
  // link: "https://prettier.io/",
  options: {
    _: {
      useTabs: [
        ["indent_with_tabs", "indent_char"],
        (options): boolean => {
          if (options.indent_with_tabs === true) {
            return true;
          } else {
            return options.indent_char === "\t";
          }
        }
      ],
      tabWidth: [
        ["indent_with_tabs", "indent_size"],
        (options): number => {
          if (options.indent_with_tabs === true) {
            return 1;
          } else {
            return options.indent_size || 1;
          }
        }
      ],
      singleQuote: [
        ["convert_quotes"],
        (options): boolean => {
          if (options.convert_quotes === "double") {
            return true;
          }
          return false;
        }
      ]
    },
    JavaScript: true,
    JSX: true,
    TypeScript: true,
    CSS: true,
    Less: true,
    SCSS: true,
    GraphQL: true,
    JSON: true,
    Markdown: true
  },
  beautify(data) {
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
        filepath: data.filePath
      });
      return resolve(text);
    }) as any;
  }
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

const config = {};

const wrappedBeautifier: Beautifier | AtomPackage = wrapBeautifier(
  pkg,
  beautifier,
  config
);
export { Beautifier, AtomPackage };
export default wrappedBeautifier;
