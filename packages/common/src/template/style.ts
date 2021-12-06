function closestRoot(base: Element): any {
  if (base.getRootNode() === document) {
    return document.head;
  } else if (base.getRootNode()) {
    return base.getRootNode();
  } else {
    return document.head;
  }
}

export function attachStyle(context: any): void {
  const id = `${context.elementMeta.selector}`;
  const closest = closestRoot(context);
  if (closest.tagName === 'HEAD' && document.getElementById(`${id}-in-style`)) {
    return;
  }
  if (closest.getElementById && closest.getElementById(`${id}-in-style`)) {
    return;
  }
  const template = document.createElement('style');
  template.setAttribute('id', `${id}-in-style`);
  template.innerText = context.elementMeta.style;
  closest.appendChild(template);
}
