export function attachTemplate(context: any): void {
  const template = document.createElement('template');
  template.innerHTML = context.elementMeta.template;
  context.appendChild(template.content.cloneNode(true));
}

export function html(template: TemplateStringsArray): string {
  return template.toString();
}

export function css(template: TemplateStringsArray): string {
  return template.toString();
}
