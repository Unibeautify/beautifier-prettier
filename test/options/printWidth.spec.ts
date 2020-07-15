import { newUnibeautify, Beautifier, Unibeautify } from "unibeautify";
import beautifier from "../../src";

testWithPrintWidth(12);
testWithPrintWidth(20);
testWithPrintWidth(80);
testWithPrintWidth(120);

function testWithPrintWidth(printWidth: number) {
  test(`should successfully beautify JavaScript text with printWidth=${printWidth}`, () => {
    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);

    const shortString = "c";
    const veryLongString = "c".repeat(Math.ceil(printWidth / 2));

    const shortText = `["${shortString}", "${shortString}"];\n`;
    const shortBeautifierResult = shortText;

    if (shortText.length > printWidth) {
      throw new Error(
        `Test text will always wrap. Please use a printWidth value greater than ${shortText.length}.`
      );
    }
    const longText = `["${veryLongString}", "${veryLongString}"];\n`;
    const longBeautifierResult = `[\n  "${veryLongString}",\n  "${veryLongString}"\n];\n`;

    const indentSize = 2;
    return Promise.all([
      beautifyWithPrintWidth(unibeautify, shortText, printWidth).then(
        results => {
          expect(results).toBe(shortBeautifierResult);
        }
      ),
      beautifyWithPrintWidth(unibeautify, longText, printWidth).then(
        results => {
          expect(results).toBe(longBeautifierResult);
        }
      ),
    ]);
  });
}

function beautifyWithPrintWidth(
  unibeautify: Unibeautify,
  text: string,
  printWidth: number
) {
  const indentSize = 2;
  return unibeautify.beautify({
    languageName: "JavaScript",
    options: {
      JavaScript: {
        indent_style: "space",
        indent_size: indentSize,
        end_with_comma: false,
        wrap_line_length: printWidth,
      },
    },
    text,
  });
}
