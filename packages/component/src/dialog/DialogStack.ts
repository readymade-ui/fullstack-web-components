import { query } from '@in/common';

export class DialogStack {
  stack: Element[] = [];
  last: Element;
  focused: Element;
  templateId: string[] = [];
  constructor() {
    this.addListeners();
  }
  registerTemplate(id: string) {
    if (!this.templateId.find((templateId) => templateId === id)) {
      this.templateId.push(id);
    }
  }
  removeTemplate(id: string) {
    const templateIndex = this.findTemplateIndex(id);
    if (templateIndex) {
      this.templateId.splice(templateIndex, 1);
    }
  }
  findDialogIndex(element: Element) {
    return this.stack.findIndex((elem) => elem === element);
  }
  findTemplateIndex(id: string) {
    return this.templateId.findIndex((templateId) => templateId === id);
  }
  focusDialog(element: Element) {
    this.last = this.focused;
    this.focused = element;
    setTimeout(() => {
      this.last = this.focused;
    }, 1);
  }
  focusedDialog() {
    return this.stack[this.stack.length - 1];
  }
  pushDialog(element: Element) {
    this.stack.push(element);
    document.body.appendChild(element);
    this.setZIndices();
    this.focusDialog(element);
  }
  popDialog() {
    return this.stack.pop();
  }
  removeDialog(element: Element) {
    const id = element.getAttribute('data-dialog-id');
    const target = query(`[data-target-id="${id}"`);
    if (target) {
      target.dispatchEvent(new CustomEvent('close'));
    }
    this.stack.splice(this.findDialogIndex(element), 1);
    document.body.removeChild(element);
    this.setZIndices();
    this.focusDialog(this.stack[this.stack.length - 1]);
  }
  setZIndices() {
    const base = 9000;
    this.stack.forEach((element, index) => {
      (element as HTMLElement).style.zIndex = (base + index * 10).toString();
    });
  }
  addListeners() {
    document.body.addEventListener('click', this.onFocus.bind(this));
  }
  onFocus(ev: MouseEvent) {
    const closest = (ev.target as Element).closest('[data-dialog-id]');

    if (
      closest == null &&
      this.focused &&
      this.focused.tagName === 'IN-TOOLTIP'
    ) {
      this.removeDialog(this.focused);
    }
  }
}
