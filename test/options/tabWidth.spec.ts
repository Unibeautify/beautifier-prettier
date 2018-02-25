import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";

testWithTabWidth(0, true);
testWithTabWidth(1, true);
testWithTabWidth(2, true);

testWithTabWidth(0, false);
testWithTabWidth(2, false);
testWithTabWidth(4, false);

function testWithTabWidth(tabWidth: number, useTabs: boolean = false) {
  test(`should successfully beautify JavaScript text with useTabs=${useTabs} and tabWidth=${tabWidth}`, () => {

    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);

    const indentChar = useTabs ? "\t" : " ";
    const indentation = useTabs ? "\t" : indentChar.repeat(tabWidth);
    const indentArg = useTabs ? "tab" : "space";

    const text = `function test(n){return n+1;}`;
    const beautifierResult = `function test(n) {
${indentation}return n + 1;
}
`;

    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: {
            indent_style: indentArg,
            indent_size: tabWidth
          }
        },
        text
      })
      .then(results => {
        expect(results).toBe(beautifierResult);
      });
  });
}
