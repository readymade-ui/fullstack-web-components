import { query, Component, attachShadow, css } from "@in/common";
import { DialogStack } from "./DialogStack";

declare global {
    interface Window {
        __dialogStack: DialogStack;
    }
}

window.__dialogStack = new DialogStack();

@Component({
    selector: "in-dialog",
    style: css`
        :host{
            display: none;
        }
    `
})
export class DialogComponent extends HTMLElement {
    public $target: Element;
    public $state: "open" | "close";
    public $targetSelector: string;
    public $templateSelector: string;
    public $variant: "modal" | "tooltip";
    public $container: Element;

    constructor () {
        super();
        attachShadow(this, {
            mode: "open" // todo
        });
    }

    static get observedAttributes() {
        return ["target", "template", "variant"];
    }

    attributeChangedCallback(name, prev, next) {
        switch(name) {
            case "target":

                if(window.__dialogStack.findTemplateIndex(next) === -1) {

                    window.__dialogStack.registerTemplate(next);
                
                    setTimeout(() => {
                        this.setTarget(next);
                    }, 1);
                }
                break;
            case "template":
                this.$templateSelector = next;
                break;
            case "variant":
                this.$variant = next;
                break;
        }
    }

    setTarget(selector: string) {
        this.$targetSelector = selector;
        this.$target = document.querySelector(this.$targetSelector);
        if(!this.$target) {
            console.error(`DialogComponent cannot find Element with selector ${selector}`);
            return;
        }

        this.$target.addEventListener(
            "click", 
            this.targetListener.bind(this), 
            false
        );
    }

    targetListener(ev: MouseEvent) {
        if(this.$state !== "open") {
            this.onOpen(ev);
        }
    }

    onOpen(ev: MouseEvent) {
        const template = query(
            this.$templateSelector
        ) as HTMLTemplateElement;
        
        if(!template) {
            console.error(
                `DialogComponent cannot find HTMLTemplateElement 
                with selector ${this.$templateSelector}`
            );
            return;
        }

        this.$container = document.createElement(`in-${this.$variant}`);
        const clone = template.content.cloneNode(true) as HTMLElement;

        // note: The next two lines does not exists in the book.
        // This update will allow DialogStack@removeDialog() to target dialog element
        // with the 'data-dialog-id' attribute.
        const templateId = template.getAttribute("data-template-id");
        this.$container.setAttribute("data-dialog-id", templateId);

        this.$container.classList.add(this.$variant);
        this.$container.appendChild(clone);

        window.__dialogStack.pushDialog(this.$container);

        if(this.$variant === "tooltip") {
            this.$container.dispatchEvent(
                new CustomEvent("position", {
                    detail: {
                        rect: (ev.target as Element).getBoundingClientRect()
                    }
                })
            )
        }

        this.$state = "open";

        const closeBtn = this.$container.querySelector(".dialog-close-button");
        if(closeBtn) {
            closeBtn.addEventListener("click", (ev) => {
                this.onClose();
            })
        }
    }

    onClose() {
        window.__dialogStack.removeDialog(this.$container);
        window.__dialogStack.removeTemplate(this.$targetSelector);
        this.$state = "close";
    }

    disconnectedCallback() {
        window.__dialogStack.removeTemplate(this.$targetSelector);
    }
}