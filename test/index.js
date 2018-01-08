import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

test("should successfully install beautifier", t => {
  const { unibeautify } = t.context;
  unibeautify.loadBeautifier(beautifier);

  t.is(unibeautify.beautifiers[0].name, beautifier.name);
});

test("should successfully beautify JavaScript text", t => {
  const { unibeautify } = t.context;
  unibeautify.loadBeautifier(beautifier);

  const text = `function test(n){return n+1;}`;
  const beautifierResult = `function test(n) {
  return n + 1;
}
`;

  return unibeautify
    .beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
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
