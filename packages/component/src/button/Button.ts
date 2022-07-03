export class ButtonComponent extends HTMLButtonElement {


    public buttonStyles: string;

    constructor () {
        super();

        this.buttonStyles = `
            .in-button.primary {
                background: var(--color-blue-500);
                border: 2px solid var(--color-blue-500);
                box-siding: border-box;
                border-radius: 12px;
                min-height: 44px;
                min-width: 180px;
                color: var(--color-white);
                font-size: var(--font-body-md);
                font-weight: var(--font-weight-button);
                cursor: pointer;
                padding: 0;
            }
            .in-button.secondary {
                background: var(--color-white);
                border: 2px solid var(--color-blue-500);
                box-siding: border-box;
                border-radius: 12px;
                min-height: 44px;
                min-width: 180px;
                color: var(--color-blue-500);
                font-size: var(--font-body-md);
                font-weight: var(--font-weight-button);
                cursor: pointer;
                padding: 0;
            }
            .in-button.icon {
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--color-white);
                border: 2px solid var(--color-blue-500);
                box-siding: border-box;
                border-radius: 12px;
                height: 44px;
                width: 44px;
                color: var(--color-blue-500);
                font-size: var(font-body-icon);
                font-weight: var(--font-weight-button);
                cursor: pointer;
                padding: 0;
                padding: var(--padding-xs);
            }
            .icon svg {
                width: 100% !important;
                height: 100%;
            }
            .icon.icon-close svg {
                transform: rotateZ(45deg);
            }
            .in-button.primary:focus,
            .in-button.secondary:focus,
            .in-button.icon:focus {
                background: var(--color-white);
                color: var(--color-black);
                border: 2px solid var(--color-black);
                outline: none;
            }
            .in-button.primary:active {
                background: var(--color-blue-500);
                color: var(--color-white);
                border: 2px solid var(--color-blue-500);
                outline: none;
            }
            .in-button.secondary:active,
            .in-button.icon:active {
                background: var(--color-white);
                border: 2px solid var(--color-blue-500);
                color: var(--color-blue-500);
            }
            .in-button.primary[disabled],
            .in-button.secondary[disabled],
            .in-button.icon[disabled] {
                opacity: var(--color-disable);
                background: var(--color-disable);
                border: var(--border-disable);
                color: var(--color-neutral-500);
                cursor: default;
            }
        `;
            
    }

    addStylesheet() {
        const head = document.head;
        if(document.getElementById("in-button-style")) { return; }

        const style = document.createElement("style");
        style.setAttribute("id", "in-button-style");
        style.textContent = this.buttonStyles;

        head.appendChild(style);
    }

    connectedCallback () {
        this.classList.add("in-button");
        this.addStylesheet();
    }
}

customElements.define("in-button", ButtonComponent, {
    extends: "button"
});