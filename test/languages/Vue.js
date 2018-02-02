import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

test("should successfully beautify Vue text", t => {
  const { unibeautify } = t.context;
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
      t.is(results, beautifierResult);
    });
});
