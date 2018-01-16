import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

testWithTabWidth(0, true);
testWithTabWidth(1, true);
testWithTabWidth(2, true);

testWithTabWidth(0, false);
testWithTabWidth(2, false);
testWithTabWidth(4, false);

function testWithTabWidth(tabWidth, useTabs = false) {
  test(`should successfully beautify JavaScript text with useTabs=${useTabs} and tabWidth=${tabWidth}`, t => {

    const { unibeautify } = t.context;
    unibeautify.loadBeautifier(beautifier);

    const indentChar = useTabs ? "\t" : " ";
    const indentation = useTabs ? "\t" : indentChar.repeat(tabWidth);

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
            indent_char: indentChar,
            indent_size: tabWidth
          }
        },
        text
      })
      .then(results => {
        t.is(results, beautifierResult);
      });
  });
}
