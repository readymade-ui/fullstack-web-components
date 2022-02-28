export function attachTemplate(context: any): void {
  const template = document.createElement('template');
  template.innerHTML = context.elementMeta.template;
  context.appendChild(template.content.cloneNode(true));
}

export function html(template: TemplateStringsArray, ...rest: any): string {
  let str = '';
  template.forEach((string, i) => {
    str += `${string} ${rest[i] || ''}`;
  });
  return str;
}

export function css(template: TemplateStringsArray, ...rest: any): string {
  let str = '';
  template.forEach((string, i) => {
    str += `${string} ${rest[i] || ''}`;
  });
  return str;
}
