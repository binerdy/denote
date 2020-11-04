# denote
A simple [deno](https://deno.land/) templating language that lets you generate HTML markup

## Usage
```ts
import { denote } from "https://raw.githubusercontent.com/binerdy/denote/master/denote.ts";

const result = denote('<h1>{text}</h1>', { text: 'hello world!' });
```
