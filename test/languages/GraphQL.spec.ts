import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";

test("should successfully beautify GraphQL text", () => {
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);

  const text = `{
project(name: "GraphQL") {
tagline
}
}`;
  const beautifierResult = `{
  project(name: "GraphQL") {
    tagline
  }
}
`;

  return unibeautify
    .beautify({
      languageName: "GraphQL",
      options: {
        GraphQL: {
          indent_char: " ",
          indent_size: 2
        }
      },
      text
    })
    .then(results => {
      expect(results).toBe(beautifierResult);
    });
});
