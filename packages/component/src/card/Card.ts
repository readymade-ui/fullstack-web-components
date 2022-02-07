import { Component, attachShadow, html, css } from '@in/common';

/**
 * Autonomous custom element that renders a card container.
 * `CardComponent` displays content in a header, content, footer layout.
 * @tag {string} in-card
 * @slot {string} header - displays header elements
 * @slot {string} content - displays content in between header and footer
 * @slot {string} footer - displays footer elements
 */
@Component({
  selector: 'in-card',
  style: css`
    :host {
      display: block;
      background: var(--color-white);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    ::slotted(*) {
      padding-left: var(--padding-lg);
      padding-right: var(--padding-lg);
    }
    ::slotted(a:link),
    ::slotted(a:visited) {
      display: block;
    }
    ::slotted(:last-child) {
      padding-bottom: var(--margin-lg);
    }
    ::slotted(img) {
      width: 100%;
      padding-left: 0px;
      padding-right: 0px;
    }
  `,
  template: html`
    <header>
      <slot name="header"></slot>
    </header>
    <section>
      <slot name="content"></slot>
    </section>
    <footer>
      <slot name="footer"></slot>
    </footer>
  `,
})
export class CardComponent extends HTMLElement {
  constructor() {
    super();
    attachShadow(this);
  }
}
