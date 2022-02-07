import { Component, attachShadow, Listen, html, css } from '@in/common';

/**
 * Renders a `TableComponent` in a stylized card
 * that displays buttons used for CRUD in the table.
 * @tag {string} in-tablecard
 * @attr {string} channel - the name of the channel used to communicate via `BroadcastChannel`, Required
 */
@Component({
  selector: 'in-tablecard',
  style: css`
    :host .primary[is='in-button'],
    :host .secondary[is='in-button'] {
      min-width: 160px;
      margin-left: var(--margin-lg);
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      padding-top: var(--padding-md);
    }

    [hidden] {
      display: none;
    }
  `,
  template: html`
    <in-card>
      <table is="in-table" slot="content"></table>
      <div class="table-footer" slot="footer">
        <div class="crud-actions"></div>
        <div class="save-actions">
          <button class="primary button-save" is="in-button" hidden>
            save
          </button>
          <button class="secondary button-cancel" is="in-button" hidden>
            cancel
          </button>
          <button class="secondary button-edit" is="in-button">edit</button>
        </div>
      </div>
    </in-card>
  `,
})
export class TableCardComponent extends HTMLElement {
  private channel: BroadcastChannel;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
  }
  connectedCallback() {
    const addButtonTemplate: HTMLTemplateElement = document.querySelector(
      '[data-template-id="button-add"]'
    );
    this.$crudActions.appendChild(addButtonTemplate.content.cloneNode(true));
  }
  static get observedAttributes() {
    return ['channel'];
  }
  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'channel':
        this.channel = new BroadcastChannel(next);
        this.$table.setAttribute('channel', next);
        break;
    }
  }
  @Listen('click', '.button-cancel')
  readOnlyMode() {
    this.$editButton.removeAttribute('hidden');
    this.$saveButton.setAttribute('hidden', 'true');
    this.$cancelButton.setAttribute('hidden', 'true');
    this.channel.postMessage({
      type: 'readOnly',
    });
  }
  @Listen('click', '.button-edit')
  editMode() {
    this.$editButton.setAttribute('hidden', 'true');
    this.$saveButton.removeAttribute('hidden');
    this.$cancelButton.removeAttribute('hidden');
    this.channel.postMessage({
      type: 'edit',
    });
  }
  @Listen('click', '.button-save')
  save() {
    this.channel.postMessage({
      type: 'save',
    });
    this.readOnlyMode();
  }

  @Listen('click', '.button-add')
  add() {
    this.$addButton.blur();
    this.$editButton.setAttribute('hidden', 'true');
    this.$saveButton.removeAttribute('hidden');
    this.$cancelButton.removeAttribute('hidden');
    this.channel.postMessage({
      type: 'add',
    });
  }
  get $table(): HTMLTableElement {
    return this.shadowRoot.querySelector('table');
  }
  get $crudActions(): HTMLElement {
    return this.shadowRoot.querySelector('.crud-actions');
  }
  get $addButton(): HTMLElement {
    return this.shadowRoot.querySelector('.button-add');
  }
  get $editButton(): HTMLElement {
    return this.shadowRoot.querySelector('.button-edit');
  }
  get $saveButton(): HTMLElement {
    return this.shadowRoot.querySelector('.button-save');
  }
  get $cancelButton(): HTMLElement {
    return this.shadowRoot.querySelector('.button-cancel');
  }
}
