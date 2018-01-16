import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

testWithPrintWidth(12);
testWithPrintWidth(20);
testWithPrintWidth(80);
testWithPrintWidth(120);

function testWithPrintWidth(printWidth) {
  test(`should successfully beautify JavaScript text with printWidth=${printWidth}`, t => {
    const { unibeautify } = t.context;
    unibeautify.loadBeautifier(beautifier);

    const shortString = "c";
    const veryLongString = "c".repeat(Math.ceil(printWidth / 2));

    const shortText = `["${shortString}", "${shortString}"];\n`;
    const shortBeautifierResult = shortText;

    if (shortText.length > printWidth) {
      throw new Error(`Test text will always wrap. Please use a printWidth value greater than ${shortText.length}.`);
    }
    const longText = `["${veryLongString}", "${veryLongString}"];\n`;
    const longBeautifierResult = `[\n  "${veryLongString}",\n  "${veryLongString}"\n];\n`;

    const indentSize = 2;
    return Promise.all([
      beautifyWithPrintWidth(unibeautify, shortText, printWidth).then(results => {
        t.is(results, shortBeautifierResult, "Short text should not wrap");
      }),
      beautifyWithPrintWidth(unibeautify, longText, printWidth).then(results => {
        t.is(results, longBeautifierResult, "Long text should wrap");
      })
    ]);
  });
}

function beautifyWithPrintWidth(unibeautify, text, printWidth) {
  const indentSize = 2;
  return unibeautify.beautify({
    languageName: "JavaScript",
    options: {
      JavaScript: {
        indent_char: " ",
        indent_size: indentSize,
        end_with_comma: false,
        wrap_line_length: printWidth
      }
    },
    text
  });
}

// function createWrappedText(printWidth) {
//   const indentation = "  ";
//   const veryLongString = "c".repeat(Math.ceil(printWidth / 2));

//   const beautifierResult = `[\n  "${veryLongString}",\n  "${veryLongString}"${
//     endWithComma ? "," : ""
//   }\n];\n`;

// }
