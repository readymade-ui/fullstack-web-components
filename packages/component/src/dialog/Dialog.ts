import { Component, attachShadow, query } from '@in/common';
import { DialogStack } from './DialogStack';

declare global {
  interface Window {
    __dialogStack: DialogStack;
  }
}

/**
 * Controller for rendering a dialog from HTML template.
 *
 * `DialogComponent` requires an instance of `DialogStack` to be set on `window.__dialogStack` prior to instantiation. After specifying a `template`, `target`, and `variant` with HTML attributes, `DialogComponent` will display either a modal or tooltip that renders a HTML template.
 * @tag {string} in-dialog
 * @attr {string} template - Required, Selector that targets the HTML template, for use with `querySelector`.
 * @attr {string} target - Selector that targets the HTML element that triggers the dialog on click, for use with `querySelector`, Required
 * @attr {string} variant - Specifies whether to display a "modal" or "tooltip", Required
 */
@Component({
  selector: 'in-dialog',
  style: `
    :host {
      display: none;	
    }
  `,
})
export class DialogComponent extends HTMLElement {
  public $container: Element;
  public $state: 'open' | 'close';
  public $target: Element;
  public $targetSelector: string;
  public $templateSelector: string;
  public $variant: 'modal' | 'tooltip';
  constructor() {
    super();
    attachShadow(this, {
      mode: 'open',
    });
  }
  static get observedAttributes() {
    return ['target', 'template', 'variant'];
  }
  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'target':
        if (window.__dialogStack.findTemplateIndex(next) === -1) {
          window.__dialogStack.registerTemplate(next);
          setTimeout(() => this.setTarget(next), 1);
        }
        break;
      case 'template':
        this.$templateSelector = next;
        break;
      case 'variant':
        this.$variant = next;
        break;
    }
  }
  onOpen(ev: MouseEvent) {
    const template = document.querySelector(
      this.$templateSelector
    ) as HTMLTemplateElement;
    if (!template) {
      console.error(
        `DialogComponent cannot find HTMLTemplateElement with selector ${this.$templateSelector}`
      );
      return;
    }
    this.$container = document.createElement(`in-${this.$variant}`);
    const clone = template.content.cloneNode(true) as HTMLElement;
    this.$container.classList.add(this.$variant);
    this.$container.appendChild(clone);
    document.body.appendChild(this.$container);

    if (this.$variant === 'tooltip') {
      this.$container.dispatchEvent(
        new CustomEvent('position', {
          detail: {
            rect: (ev.target as Element).getBoundingClientRect(),
          },
        })
      );
    }

    const closeButton = this.$container.querySelector('.dialog-close-button');

    if (closeButton) {
      closeButton.addEventListener('click', (ev) => {
        this.onClose();
      });
    }
    this.$state = 'open';
    window.__dialogStack.pushDialog(this.$container);
  }
  onClose() {
    window.__dialogStack.removeDialog(this.$container);
    window.__dialogStack.removeTemplate(this.$targetSelector);
    this.$state = 'close';
  }
  setTarget(selector: string) {
    this.$targetSelector = selector;
    this.$target = query(this.$targetSelector);
    if (!this.$target) {
      console.error(
        `DialogComponent cannot find HTMLElement with selector ${selector}`
      );
      return;
    }
    this.$target.addEventListener(
      'click',
      this.targetListener.bind(this),
      false
    );
  }
  targetListener(ev: MouseEvent) {
    if (this.$state !== 'open') {
      this.onOpen(ev);
    }
  }
  disconnectedCallback() {
    window.__dialogStack.removeTemplate(this.$targetSelector);
  }
}
