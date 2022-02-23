import { Component, attachShadow, Listen, css, html } from '@in/common';

@Component({
  selector: 'in-tooltip',
  style: css`
    :host {
      display: block;
      position: fixed;
      min-width: 240px;
      max-width: 300px;
      z-index: 9000;
    }
    ::slotted(*) {
      position: absolute;
      width: 100%;
      height: auto;
    }
    ::slotted(in-card) {
      box-shadow: var(--shadow-tooltip);
    }
  `,
  template: html`<slot></slot>`,
})
export class TooltipComponent extends HTMLElement {
  constructor() {
    super();
    attachShadow(this, {
      mode: 'open',
    });
  }
  @Listen('position')
  onPosition(ev: CustomEvent) {
    const rect = ev.detail.rect;
    const leftDisplacement = this.$child.getBoundingClientRect().width / 2;
    this.style.top = `${rect.bottom + 12}px`;
    this.style.left = `${rect.left - leftDisplacement}px`;
    this.style.width = `${this.$child.getBoundingClientRect().width}px`;
    this.style.height = `${this.$child.getBoundingClientRect().height}px`;
    this.style.visibility = 'visible';
  }
  get $child(): Element {
    return this.shadowRoot.querySelector('slot').assignedNodes()[0] as Element;
  }
}
