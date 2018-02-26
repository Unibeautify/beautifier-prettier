import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";

testWithTrailingComma("none");
testWithTrailingComma("es5");
testWithTrailingComma("all");

function testWithTrailingComma(trailingComma: string) {
  test(`should successfully beautify JavaScript text with trailingComma=${trailingComma}`, () => {
    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);

    const endWithComma = trailingComma === "es5";
    const veryLongString = "very".repeat(10) + "longstring";
    const text = `[\n"${veryLongString}",\n"${veryLongString}"\n];\n`;
    const beautifierResult = `[\n  "${veryLongString}",\n  "${veryLongString}"${
      endWithComma ? "," : ""
    }\n];\n`;

    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: {
            indent_style: "space",
            indent_size: 2,
            end_with_comma: endWithComma,
          },
        },
        text,
      })
      .then(results => {
        expect(results).toBe(beautifierResult);
      });
  });
}
