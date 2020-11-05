const mapTemplateRegExp = new RegExp(/<([a-z0-9]*\b).*map:.*>[\s\S]+?<\/\1>/g);
const mapRegExp = new RegExp(/map:[^\}]*}/g);
const valueRegExp = new RegExp(/{[^{\}]*\}/g);

export function denote(template: string, data: any): string {
  const dataOrEmptyObject = data || {};
  template = transformMaps(template, dataOrEmptyObject);
  template = transformValues(template, dataOrEmptyObject);
  return template;
}

function transformMaps(template: string, dataOrEmptyObject: any): string {
  const mapTemplates = template.matchAll(mapTemplateRegExp);
  const keys = Object.keys(dataOrEmptyObject);

  for (const [mapTemplate] of mapTemplates) {
    const [iterableAndValueSign] = <any> mapTemplate.match(mapRegExp);
    const [mapSignature] = <any> iterableAndValueSign.match(mapRegExp);
    const iterable = mapSignature.replace("map:", "").replace("=", "").replace(
      valueRegExp,
      "",
    );
    const [valueSign] = <any> mapSignature.match(valueRegExp);
    if (keys.includes(iterable)) {
      const parts: string[] = [];
      for (const v of dataOrEmptyObject[iterable]) {
        const templatePart = mapTemplate.replace(" " + mapSignature, "");
        const transformedPart = templatePart.replace(valueSign, v);
        parts.push(transformedPart);
      }
      template = template.replace(mapTemplate, parts.join("\n"));
    }

    console.log(template);
  }
  return template;
}

function transformValues(template: string, dataOrEmptyObject: any): string {
  const signs = template.matchAll(valueRegExp);
  const keys = Object.keys(dataOrEmptyObject);
  for (const [curlySign] of signs) {
    const sign = curlySign.split("").slice(1, -1).join("");
    if (keys.includes(sign)) {
      template = template.replace(curlySign, dataOrEmptyObject[sign]);
    }
  }
  return template;
}
