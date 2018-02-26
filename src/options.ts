import {
  BeautifierOptions,
  OptionValues,
  BeautifierLanguageOptions,
  BeautifierLanguageOptionComplex,
} from "unibeautify";

const commonOptions: BeautifierLanguageOptions = {
  insertPragma: "pragma_insert",
  printWidth: "wrap_line_length",
  requirePragma: "pragma_require",
  semi: "end_with_semicolon",
  singleQuote: [
    ["quotes"],
    (options): boolean | undefined => {
      switch (options.quotes) {
        case "double":
          return false;
        case "single":
          return true;
        default:
          return undefined;
      }
    },
  ],
  tabWidth: "indent_size",
  useTabs: [
    ["indent_style"],
    (options): boolean => {
      if (options.indent_style === "tab") {
        return true;
      }
      return false;
    },
  ],
};

const markdownOptions: BeautifierLanguageOptions = {
  ...commonOptions,
  proseWrap: "wrap_prose",
};

const scriptOptions: BeautifierLanguageOptions = {
  ...commonOptions,
  arrowParens: [
    ["arrow_parens"],
    (options: OptionValues): "avoid" | "always" => {
      switch (options.arrow_parens) {
        case "always":
          return "always";
        case "as-needed":
          return "avoid";
        default:
          return "avoid";
      }
    },
  ],
  bracketSpacing: "object_curly_spacing",
  jsxBracketSameLine: "jsx_brackets",
  trailingComma: [
    ["end_with_comma"],
    (options: OptionValues): "none" | "es5" | "all" | undefined => {
      switch (options.end_with_comma) {
        case true:
          return "es5";
        case false:
          return "none";
        default:
          return undefined;
      }
    },
  ],
};

const options = {
  Markup: commonOptions,
  Markdown: markdownOptions,
  Script: scriptOptions,
  Style: commonOptions,
};

export default options;
