import { Component, attachShadow, html, css, Listen } from "@in/common";

@Component({
    selector: "in-tablecard",
    style: css``,
    template: html`
        <in-card>
            <table is="in-table" slot="content"></table>

            <div class="table-footer" slot="footer">
                <div class="table-footer" slot="footer">
                    <div class="save-actions">
                        <button class="primary button-save" is="in-button">
                            Save
                        </button>
                        <button class="secondary button-cancel" is="in-button">
                            Cancel
                        </button>
                        <button class="secondary button-edit" is="in-button">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </in-card>
    `
})
export class  TableCardComponent extends HTMLElement {

    private channel: BroadcastChannel;

    constructor () {
        super();
        attachShadow(this);
    }

    static get observedAttributes() {
        return [
            "channel"
        ];
    }

    attributeChangedCallback(name, prev, next) {
        switch(name) {
            case 'channel':
                this.channel = new BroadcastChannel(next);
                this.$table.setAttribute('channel', next);
                break;
        }
    }

    get $table(): HTMLTableElement {
        return this.shadowRoot.querySelector("table");
    }

    get $editButton(): HTMLElement {
        return this.shadowRoot.querySelector(".button-edit");
    }

    get $saveButton(): HTMLElement {
        return this.shadowRoot.querySelector(".button-save");
    }

    get $cancelButton(): HTMLElement {
        return this.shadowRoot.querySelector(".button-cancel");
    }

    @Listen('click', '.button-edit')
    editMode() {
        this.$editButton.setAttribute("hidden", "true");
        this.$saveButton.removeAttribute("hidden");
        this.$cancelButton.removeAttribute("hidden");
        this.channel.postMessage({
            type: 'edit'
        });
    }

    @Listen('click', '.button-cancel')
    readOnlyMode() {
        this.$editButton.removeAttribute("hidden");
        this.$saveButton.setAttribute("hidden", "true");
        this.$cancelButton.setAttribute("hidden", "true");
        this.channel.postMessage({
            type: 'readOnly'
        });
    }

    @Listen("click", ".button-save")
    save() {
        this.channel.postMessage({
            type: "save"
        })
    }
}