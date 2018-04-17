import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";
test("should successfully beautify Markdown text", () => {
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);

  const text = `##    test`;
  const beautifierResult = `<!-- @format -->\n\n## test\n`;

  return unibeautify
    .beautify({
      languageName: "Markdown",
      options: {
        Markdown: {
          pragma_insert: true
        },
      },
      text,
    })
    .then(results => {
      expect(results).toBe(beautifierResult);
    });
});
