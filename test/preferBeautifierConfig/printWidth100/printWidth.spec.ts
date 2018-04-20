import { newUnibeautify, Beautifier, Unibeautify } from "unibeautify";
import beautifier from "../../../src";
import * as path from "path";

const PRETTIERRC_PRINT_WIDTH = 100;

testWithPrintWidth(12);
testWithPrintWidth(20);
testWithPrintWidth(80);
testWithPrintWidth(120);

function testWithPrintWidth(printWidth: number) {
  describe(`Using .prettierrc config file with printWidth=${printWidth}`, () => {
    test(`should successfully beautify JavaScript text ignoring Unibeautify config with printWidth=${PRETTIERRC_PRINT_WIDTH}`, () => {
      const unibeautify = newUnibeautify();
      unibeautify.loadBeautifier(beautifier);

      const shortString = "c";
      const veryLongString = "c".repeat(Math.ceil(PRETTIERRC_PRINT_WIDTH / 2));

      const shortText = `["${shortString}", "${shortString}"];\n`;
      const shortBeautifierResult = shortText;

      if (shortText.length > printWidth) {
        throw new Error(
          `Test text will always wrap. Please use a printWidth value greater than ${
            shortText.length
          }.`
        );
      }
      const longText = `["${veryLongString}", "${veryLongString}"];\n`;
      const longBeautifierResult = `[\n  "${veryLongString}",\n  "${veryLongString}"\n];\n`;

      return Promise.all([
        beautifyWithPrintWidth(unibeautify, shortText, printWidth).then(results => {
          expect(results).toBe(shortBeautifierResult);
        }),
        beautifyWithPrintWidth(unibeautify, longText, printWidth).then(results => {
          expect(results).toBe(longBeautifierResult);
        })
      ]);
    });
  });
}

const filePath: string = path.resolve(__dirname, "test.js");

function beautifyWithPrintWidth(unibeautify: Unibeautify, text: string, printWidth: number) {
  const indentSize = 2;
  return unibeautify.beautify({
    filePath,
    languageName: "JavaScript",
    options: {
      JavaScript: {
        indent_style: "space",
        indent_size: indentSize,
        end_with_comma: false,
        wrap_line_length: printWidth,
        Prettier: {
          prefer_beautifier_config: true
        }
      } as any
    },
    text
  });
}
