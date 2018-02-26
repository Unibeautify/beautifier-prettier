import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";

testArrowParens("always");
testArrowParens("as-needed");

function testArrowParens(arrowParens: string) {
  test(`should successfully beautify JavaScript text with arrowParens=${arrowParens}`, () => {
    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);

    const addArrowParens = arrowParens === "always";
    const text = `a.then(${addArrowParens ? "foo" : "(foo)"} => {});\n`;
    const beautifierResult = `a.then(${
      addArrowParens ? "(foo)" : "foo"
    } => {});\n`;

    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: {
            arrow_parens: arrowParens,
          },
        },
        text,
      })
      .then(results => {
        expect(results).toBe(beautifierResult);
      });
  });
}
