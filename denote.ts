const indicate = new RegExp(/\{[^{\}]*\}/g);

export function denote(template: string, data: any): string {
  const d = data || {};
  const signs = template.matchAll(indicate);
  const keys = Object.keys(d);
  for (const [curlySign] of signs) {
    const sign = curlySign.split("").slice(1, -1).join("");
    if (keys.includes(sign)) {
      template = template.replace(curlySign, d[sign]);
    }
  }
  return template;
}
