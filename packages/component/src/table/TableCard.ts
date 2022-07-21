import { Component, attachShadow, html, css, Listen } from "@in/common";

/**
 * Renders a `TableComponent` in a stylized card
 * that displays buttons used for CRUD in the table.
 * @tag {string} in-tablecard
 * @attr {string} channel - the name of the channel used to communicate via `BroadcastChannel`, Required
 */
@Component({
    selector: "in-tablecard",
    style: css`
        :host .primary[is="in-button"],
        :host .secondary[is="in-button"] {
            min-width: 160px;
            margin-left: var(--margin-lg);
        }
        .table-footer {
            display: flex;
            justify-content: space-between;
            padding-top: var(--padding-md);
        }
        [hidden="true"] {
            display: none;
        }
    `,
    template: html`
        <in-card>
            <table is="in-table" slot="content"></table>

            <div class="table-footer" slot="footer">
                <div class="crud-actions">
                    <button class="icon icon-add button-add" is="in-button">
                        <svg aria-hidden="true" 
                            focusable="false" 
                            data-prefix="fas" 
                            data-icon="plus"
                            class="svg-inline--fa fa-plus fa-w-14"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path fill="currentColor" 
                            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                        </svg>
                    </button>
                </div>
                <div class="save-actions">
                    <button class="primary button-save" is="in-button" hidden="true">
                        Save
                    </button>
                    <button class="secondary button-cancel" is="in-button" hidden="true">
                        Cancel
                    </button>
                    <button class="secondary button-edit" is="in-button">
                        Edit
                    </button>
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

    get $addButton(): HTMLElement {
        return this.shadowRoot.querySelector(".button-add")
    }

    @Listen("click", ".button-add")
    add() {
        this.$addButton.blur();
        this.$editButton.setAttribute("hidden", "true");
        this.$saveButton.removeAttribute("hidden");
        this.$cancelButton.removeAttribute("hidden");
        
        this.channel.postMessage({
            type: "add"
        });
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
            type: 'readonly'
        });
    }

    @Listen("click", ".button-save")
    save() {
        this.channel.postMessage({
            type: "save"
        });

        this.readOnlyMode(); //
    }
}