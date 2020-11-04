import { assertEquals } from "https://deno.land/std@0.76.0/testing/asserts.ts";
import { denote } from "./denote.ts";

Deno.test({
  name: "compile templates with denote",
  fn(): void {
    assertEquals(
      "<h1>{}</h1>",
      denote("<h1>{}</h1>", undefined),
    );
    assertEquals(
      "<h1>hello world!</h1>",
      denote("<h1>{msg}</h1>", { msg: "hello world!" }),
    );
    assertEquals(
      "<h1>{hello world!}</h1>",
      denote("<h1>{{msg}}</h1>", { msg: "hello world!" }),
    );
    assertEquals(
      "<h1>Hello Alan</h1><h2>How are you?</h2>",
      denote(
        "<h1>Hello {name}</h1><h2>How {verb} you?</h2>",
        { name: "Alan", verb: "are" },
      ),
    );
  },
});
