import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

test("should successfully beautify GraphQL text", t => {
  const { unibeautify } = t.context;
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
      t.is(results, beautifierResult);
    });
});
