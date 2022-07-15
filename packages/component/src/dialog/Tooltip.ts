import { Component, html, attachShadow, css } from "@in/common";

@Component({
    selector: "in-tooltip",
    style: css`
        :host {
            display: block;
            position: fixed;
            min-width: 240px;
            max-width: 300px;
            z-index: 900;
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
    template: html`<slot></slot>`
})
export class TooltipComponent extends HTMLElement {
    constructor() {
        super();
        attachShadow(this, {
            mode: "open"
        });
    }
}