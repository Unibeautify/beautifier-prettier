import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";

test("should successfully beautify Vue text", () => {
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);

  const text = `<template >
  <h1 >{{greeting}}     world</h1 >
  <script>kikoo ( ) </script>
</template >

<script>
module  .  exports  =
{data : function () {return {
	greeting: "Hello"
}}
}
</script>

<style   scoped >
p { font-size : 2em ; text-align : center ; }
  </style >
`;
  const beautifierResult = `<template >
  <h1 >{{greeting}}     world</h1 >
  <script>kikoo ( ) </script>
</template >

<script>
module.exports = {
  data: function() {
    return {
      greeting: "Hello"
    };
  }
};
</script>

<style   scoped >
p {
  font-size: 2em;
  text-align: center;
}
</style >
`;

  return unibeautify
    .beautify({
      languageName: "Vue",
      options: {
        Vue: {
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
