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
