const mapTemplateRegExp = /<([a-z0-9-]*\b).*map:.*>[\s\S]+?<\/\1>/g;
const mapRegExp = /map:[^\}]*}/g;
const valueRegExp = /{[^{\}]*\}/g;

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
    const [mapSignature] = <any> mapTemplate.match(mapRegExp);
    const iterable = mapSignature.replace("map:", "").replace("=", "").replace(
      valueRegExp,
      "",
    );
    const [valueSignWithBrackets] = <any> mapSignature.match(valueRegExp);
    const valueSign = <string>valueSignWithBrackets.slice(1, -1).trim();
    if (keys.includes(iterable)) {
      const parts: string[] = [];
      for (const valueOrObject of dataOrEmptyObject[iterable]) {
        const templatePart = mapTemplate.replace(" " + mapSignature, "");
        if (typeof valueOrObject === 'object') {
          let transformedPart = templatePart;
          for (const propertyName of Object.keys(valueOrObject)) {
            const objectWithPropertyRegExp = new RegExp(`{[\\s]*${valueSign}.${propertyName}[\\s]*}`, 'g');
            transformedPart = transformedPart.replaceAll(objectWithPropertyRegExp, valueOrObject[propertyName]);
          }
          parts.push(transformedPart);
        }
        if (typeof valueOrObject === 'string') {
          const valueSignRegExp = new RegExp(`{[\\s]*${valueSign}[\\s]*}`, 'g');
          const transformedPart = templatePart.replaceAll(valueSignRegExp, valueOrObject);
          parts.push(transformedPart);
        }
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
