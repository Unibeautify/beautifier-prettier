import { BuiltInParserName, format, SupportInfo, Options } from "prettier";
import { Beautifier, Language, BeautifierBeautifyData, DependencyType, NodeDependency } from "unibeautify";
import * as readPkgUp from "read-pkg-up";

import options from "./options";
const { pkg } = readPkgUp.sync({ cwd: __dirname });

interface Prettier {
  format(source: string, options?: Options): string;
  getSupportInfo(): SupportInfo;
}

export const beautifier: Beautifier = {
  name: "Prettier",
  package: pkg,
  dependencies: [
    {
      type: DependencyType.Node,
      name: "Prettier",
      package: "prettier",
    }
  ],
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
  beautify({ text, options, language, filePath, dependencies }: BeautifierBeautifyData) {
    return new Promise<string>((resolve, reject) => {
      const prettier: Prettier = dependencies.get<NodeDependency>("Prettier").package;
      const parser = parserForLanguage(prettier, language);
      if (!parser) {
        return reject(
          new Error(
            `Prettier Parser not found for langauge ${language.name}.`
          )
        );
      }
      const result = prettier.format(text, {
        ...options,
        parser,
        filepath: filePath,
      });
      return resolve(result);
    }) as any;
  },
};

function parserForLanguage(prettier: Prettier, language: Language): BuiltInParserName | undefined {
  const prettierLanguage = prettier
    .getSupportInfo()
    .languages.find(lang => lang.name === language.name);
  if (prettierLanguage) {
    return prettierLanguage.parsers[0] as BuiltInParserName;
  }
  return undefined;
}

export default beautifier;
