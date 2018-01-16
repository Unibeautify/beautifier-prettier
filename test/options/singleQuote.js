import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

testWithSingleQuote(true);
testWithSingleQuote(false);

function testWithSingleQuote(singleQuote) {
  test(`should successfully beautify JavaScript text with ${singleQuote ? "single" : "double"} quotes`, t => {
    const { unibeautify } = t.context;
    unibeautify.loadBeautifier(beautifier);

    const quote = singleQuote ? "'" : '"';
    const text = `console.log('hello world');\nconsole.log("hello world");\n`;
    const beautifierResult = `console.log(${quote}hello world${quote});\nconsole.log(${quote}hello world${quote});\n`;

    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: {
            indent_char: " ",
            indent_size: 2,
            convert_quotes: singleQuote ? "single" : "double",
          }
        },
        text
      })
      .then(results => {
        t.is(results, beautifierResult);
      });
  });
}
