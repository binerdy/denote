# denote
A simple [deno](https://deno.land/) templating language that lets you generate HTML markup

## Basic usage
```ts
import { denote } from "https://raw.githubusercontent.com/binerdy/denote/master/@0.1.0/denote.ts";
const result = denote('<h1>{text}</h1>', { text: 'hello world!' });
```

```ts
import { denote } from "https://raw.githubusercontent.com/binerdy/denote/master/@0.1.0/denote.ts";
const result = denote('<h1 map:parts={part}>{part}</h1>', { parts: [ 'hello world!', 'I like deno.' ] });
```
