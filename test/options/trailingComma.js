import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

testWithTrailingComma("none");
testWithTrailingComma("es5");
testWithTrailingComma("all");

function testWithTrailingComma(trailingComma) {
  test(`should successfully beautify JavaScript text with trailingComma=${trailingComma}`, t => {
    const { unibeautify } = t.context;
    unibeautify.loadBeautifier(beautifier);

    const endWithComma = trailingComma === "es5";
    const veryLongString = "very".repeat(10) + "longstring";
    const text = `[\n"${veryLongString}",\n"${veryLongString}"\n];\n`;
    const beautifierResult = `[\n  "${veryLongString}",\n  "${veryLongString}"${endWithComma ? "," : ""}\n];\n`;

    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: {
            indent_char: " ",
            indent_size: 2,
            end_with_comma: endWithComma,
          }
        },
        text
      })
      .then(results => {
        t.is(results, beautifierResult);
      });
  });
}
