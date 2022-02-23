import { Component, attachShadow, css, html } from '@in/common';

@Component({
  selector: 'in-modal',
  style: css`
    :host {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 50vw;
      z-index: 9000;
    }
    ::slotted(*) {
      position: absolute;
      width: 100%;
      height: auto;
      box-sizing: border-box;
    }
    ::slotted(in-card) {
      box-shadow: var(--shadow-modal);
    }
  `,
  template: html`<slot></slot>`,
})
export class ModalComponent extends HTMLElement {
  constructor() {
    super();
    attachShadow(this, {
      mode: 'open',
    });
  }
}
