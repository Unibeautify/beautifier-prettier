import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";

test("should successfully beautify YAML text", () => {
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);

  // tslint:disable:max-line-length
  const text = `CHAR:
  var: ' '
  size:      2
CONST:
  var: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  indent: "0"
`;
  // tslint:enable:max-line-length

  const beautifierResult = `CHAR:
  var: ' '
  size: 2
CONST:
  var:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'
  indent: '0'
`;

  return unibeautify
    .beautify({
      languageName: "YAML",
      options: {
        YAML: {
          quotes: "single",
          wrap_prose: "always",
        },
      },
      text,
    })
    .then(results => {
      expect(results).toBe(beautifierResult);
    });
});
