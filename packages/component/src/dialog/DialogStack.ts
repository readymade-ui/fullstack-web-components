import { query } from "@in/common";

export class DialogStack {

    stack: Element[] = [];
    templateId: string[] = [];

    last: Element;
    focused: Element;

    constructor() {
        this.addListeners();
    }

    addListeners() {
        document.body.addEventListener("click", this.onFocus.bind(this));
    }

    onFocus(ev: MouseEvent) {
        const closest = (ev.target as Element).closest("[data-dialog-id]");

        // console.log(this.focused);
        // console.log(this.focused.tagName)

        if(closest == null && this.focused && this.focused.tagName === "IN-TOOLTIP") {
            this.removeDialog(this.focused);
        }
        // else if(closest == null) {

        // }
    }

    focusDialog(element: Element) {
        this.last = this.focused;
        this.focused = element;
        setTimeout(() => {
          this.last = this.focused;
        }, 1);
      }

    registerTemplate(id: string) {
        if(!this.templateId.find((templateId) => templateId === id)) {
            this.templateId.push(id);
        }
    }

    findTemplateIndex(id: string) {

        return this.templateId.findIndex((templateId) => templateId === id);
    }

    removeTemplate(id: string) {
        const templateIndex = this.findTemplateIndex(id);
        if(templateIndex) {
            this.templateId.splice(templateIndex, 1);
        }
    }

    setZIndices() {
        const base = 9000;
        this.stack.forEach((element, index) => {
            (element as HTMLElement).style.zIndex = (base + index * 10).toString();
        });
    }

    pushDialog(element: Element) {
        this.stack.push(element);
        document.body.appendChild(element);

        this.setZIndices();
        this.focusDialog(element);  
    }

    findDialogIndex(element: Element): number {
        return this.stack.findIndex((elem) => elem === element);
    }

    removeDialog(element: Element) {

        const id = element.getAttribute('data-dialog-id');

        // Instead of data-target-id="${id}", I use the data-template-id="${id}"
        // The latter exists in DOM while the former do not.
        
        // const target = query(`[data-target-id="${id}"]`);
        const target = query(`[data-template-id="${id}"]`);
        

        if(target) {
            target.dispatchEvent(new CustomEvent("close"));
        }

        this.stack.splice(this.findDialogIndex(element), 1);
        document.body.removeChild(element);

        this.setZIndices();

        this.focusDialog(this.stack[this.stack.length - 1]);
    }
}