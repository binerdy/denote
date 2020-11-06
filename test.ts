import { assertEquals } from "https://deno.land/std@0.76.0/testing/asserts.ts";
import { denote } from "./@0.2.0/denote.ts";

const template =
  `<billboard-item onclick="read('{article.title}');" map:articles={article}>
  <small>{ article.date }</small>
  <h2>{ article.title }</h2>
  <summary>{ article.summary }</summary>
</billboard-item>
`;

const expectedResult = `<billboard-item onclick="read('birthday');">
  <small>23.04.1993</small>
  <h2>birthday</h2>
  <summary>my birthday</summary>
</billboard-item>
<billboard-item onclick="read('st. georges day');">
  <small>23.04.1993</small>
  <h2>st. georges day</h2>
  <summary>a special day</summary>
</billboard-item>
`;

Deno.test({
  name: "compile templates with denote",
  fn(): void {
    assertEquals(
      denote("<h1>{}</h1>", undefined),
      "<h1>{}</h1>",
    );
    assertEquals(
      denote("<h1>{msg}</h1>", { msg: "hello world!" }),
      "<h1>hello world!</h1>",
    );
    assertEquals(
      denote("<h1>{{msg}}</h1>", { msg: "hello world!" }),
      "<h1>{hello world!}</h1>",
    );
    assertEquals(
      denote(
        "<h1>Hello {name}</h1><h2>How {verb} you?</h2>",
        { name: "Alan", verb: "are" },
      ),
      "<h1>Hello Alan</h1><h2>How are you?</h2>",
    );
    assertEquals(
      denote(
        "<h1 map:parts={part}>{part}</h1>",
        { parts: ["Hello world!", "I like denote."] },
      ),
      "<h1>Hello world!</h1>\n<h1>I like denote.</h1>",
    );
    assertEquals(
      denote(
        "<div map:fruits={fruit}><h1>I ate {number} {fruit}.</h1></div>",
        { fruits: ["apples", "bananas"], number: 5 },
      ),
      "<div><h1>I ate 5 apples.</h1></div>\n<div><h1>I ate 5 bananas.</h1></div>",
    );
    assertEquals(
      denote(
        template,
        {
          articles: [
            { date: "23.04.1993", title: "birthday", summary: "my birthday" },
            {
              date: "23.04.1993",
              title: "st. georges day",
              summary: "a special day",
            },
          ],
        },
      ),
      expectedResult,
    );
  },
});

denote(
  template,
  {
    articles: [
      { date: "23.04.1993", title: "birthday", summary: "my birthday" },
      {
        date: "23.04.1993",
        title: "st. georges day",
        summary: "a special day",
      },
    ],
  },
);
