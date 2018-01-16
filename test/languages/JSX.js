import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

test("should successfully beautify JSX text", t => {
  const { unibeautify } = t.context;
  unibeautify.loadBeautifier(beautifier);

  const text = `<div>
<style jsx>{\`div{color:red}\`}</style>
</div>;`;
  const beautifierResult = `<div>
  <style jsx>{\`
    div {
      color: red;
    }
  \`}</style>
</div>;
`;

  return unibeautify
    .beautify({
      languageName: "JSX",
      options: {
        JSX: {
          indent_char: " ",
          indent_size: 2
        }
      },
      text
    })
    .then(results => {
      t.is(results, beautifierResult);
    });
});
