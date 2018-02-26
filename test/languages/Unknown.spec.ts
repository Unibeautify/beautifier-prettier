import { newUnibeautify, Beautifier, Language } from "unibeautify";
import beautifier from "../../src";
import options from "../../src/options";
test(`should fail to find a parser for the language`, () => {
  const unibeautify = newUnibeautify();
  const testLanguage: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLanguage",
    namespace: "test",
    since: "0.0.0",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguage(testLanguage);
  const testBeautifier = {
    ...beautifier,
    options: {
      [testLanguage.name]: true,
    }
  };
  unibeautify.loadBeautifier(testBeautifier);
  expect(unibeautify
    .beautify({
      languageName: testLanguage.name,
      options: {},
      text: "",
    })
  ).rejects.toThrowError(`Prettier Parser not found for langauge ${testLanguage.name}.`);
});
