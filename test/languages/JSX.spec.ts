import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";

test("should successfully beautify JSX text", () => {
  const unibeautify = newUnibeautify();
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
          indent_style: "space",
          indent_size: 2
        }
      },
      text
    })
    .then(results => {
      expect(results).toBe(beautifierResult);
    });
});
