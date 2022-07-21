import { Component, attachTemplate, attachStyle, html, css } from "@in/common";
import { TrComponent } from "./Tr";
import { TdComponent } from "./Td";

export interface Column {
    property: string;
    label: string;
    span?: number;
    align: "left" | "center" | "right" | "justify";
    index: number;
};

export type ColumnData = Column[];

/**
 * Renders a stylized `HTMLTableElement` that can display read-only or editable.
 * `TableComponent` is a customized built-in element that renders columns and rows through events dispatched on `BroadcastChannel`.
 * @attr {string} channel - the name of the channel used to communicate via `BroadcastChannel`, Required
 * @attr {string} is - "in-table", Required
 */
@Component({
    selector: 'in-table',
    custom: {
        extends: "table"
    },
    style: css`
        [is="in-table"] {
            font-family: var(--font-default);
            font-size: var(--font-body-md);
            font-weight: var(--font-weight-default);
            color: var(--color-neutral-500);
            width: 100%;
        }
        [is="in-table"] th {
            display: table-cell;
            vertical-align: middle;
            text-align: left;
            box-sizing: border-box;
            margin-top: var(--margin-xs);
            height: 44px;
            font-weight: var(--font-weight-default);
            padding-left: calc(var(--padding-xxs) + var(--padding-sm));
            padding-right: var(--padding-xxs);
        }
        [is="in-table"] tr {
            height: 58px;
            vertical-align: middle;
        }
        [is="in-table"] td {
            padding-left: var(--padding-xxs);
            padding-right: var(--padding-xxs);
        }
        [is="in-table"] th:first-child {
            padding-left: calc(var(--padding-lg) + var(--padding-sm));
        }
        [is="in-table"] td:first-child {
            padding-left: var(--padding-lg);
        }
        [is="in-table"] th:last-child,
        [is="in-table"] td:last-child {
            padding-right: var(--padding-lg);
        }
        [is="in-table"] td.delete-cell[readonly="true"] {
            display: none;
        }
        [is="in-table"] td.delete-cell button {
            transform: translateY(-2px);
        }
    `,
    template: html`
        <thead></thead>
        <tbody></tbody>
    `
})
export class TableComponent extends HTMLTableElement {

    private channel: BroadcastChannel;
    private columnData: ColumnData;
    private savedState: any[];
    private editIndex: number = 0;
    private blankRowData:any;

    constructor(){
        super();
        attachTemplate(this);
        attachStyle(this);
    }

    static get observedAttributes() {
        return ["channel"];
    }

    get $head() {
        return this.querySelector("thead");
    }

    get $body() {
        return this.querySelector("tbody");
    }

    get state() {
        const tableRows = this.$body.querySelectorAll("tr");

        const data = Array.from(tableRows).map((tr: TrComponent)=> {
            return tr.$rowData;
        }); 
        
        return data;
    }

    attributeChangedCallback(name, prev, next) {
        switch(name) {
            case 'channel':
                this.channel = new BroadcastChannel(next);
                this.channel.onmessage = this.onMessage.bind(this);
                break;
        }
    }

    handleCellListeners(td: TdComponent, index: number) {
        const tr = td.parentNode as TrComponent;
        const input = td.querySelector("in-textinput") as HTMLInputElement;
        const button = td.querySelector("[is='in-button']") as HTMLButtonElement;

        if(button) {
            td.setAttribute("readonly", "false");
            button.onclick = () => {
                this.editIndex = index;
                td.parentNode.dispatchEvent(
                    new CustomEvent("delete")
                );
            };
            button.onkeydown = (ev) => {
                ev.stopPropagation();
                if(ev.key === "Tab") {
                    this.editIndex = index;
                    this.onNext();
                }
                if(ev.key === "Enter" || ev.key === "Select") {
                    this.editIndex = index;
                    this.onNext();
                    td.parentNode.dispatchEvent(new CustomEvent("delete"));
                }
            }
        }

        if(input) {
            input.value = td.getAttribute("value");
            td.setAttribute("readonly", "false");

            input.onclick = (ev) => {
                const cells = this.querySelectorAll("td");
                this.editIndex = Array.from(cells).indexOf(td);
            };
            input.onkeyup = (ev) => {
                td.setAttribute("value", input.value);
                tr.dispatchEvent(
                    new CustomEvent("patch", {
                        detail: {
                            property: td.getAttribute("data-property"),
                            changes: td.getAttribute("value")
                        }
                    })
                )
            };
            input.onkeydown = (ev) => {
                ev.stopPropagation();
                if(ev.key === "Tab") {
                    this.editIndex = index;
                    this.onNext();
                }
            };
        }
    }

    onNext(){
        const cells = this.querySelectorAll("td");
        if(!cells[this.editIndex]) {
            return;
        }
        const input = cells[this.editIndex].querySelector("in-textinput") as HTMLInputElement;
        if(input) {
            input.focus();
        }
    }

    onMessage(ev) {
        switch(ev.data.type) {
            case "data":
                this.onTableData(ev.data.detail);
                break;
            case "edit":
                this.onEdit();
                break;
            case "readonly":
                this.onReadOnly();
                break;
            case "save":
                this.onSave();
                break;
            case "add": 
                this.onAdd();
                break;
        }
    }

    onAdd() {
        if(!this.savedState) {
            this.savedState = JSON.parse(JSON.stringify(this.state));
        } 

        this.blankRowData  = {};
        this.columnData.forEach((colData) => {
            this.blankRowData[colData.property] = "";
        });

        const rowData = this.blankRowData;

        const tr = document.createElement("tr", {is: "in-tr"});
        this.columnData.forEach((colData) => {
            const td = document.createElement("td", {is: "in-td"});
            if(colData.align) {
                td.align = colData.align;
            }
            td.setAttribute("value", rowData[colData.property]);
            td.setAttribute("data-property", colData.property);
            td.setAttribute("readonly", "false");

            tr.appendChild(td);
        });
        this.createDeleteButton(tr);
        this.$body.appendChild(tr);

        tr.dispatchEvent(
            new CustomEvent("data", {
                detail: rowData
            })
        );
        const cells = this.querySelectorAll("td");
        cells.forEach(this.handleCellListeners.bind(this));

        this.editIndex = Array.from(cells).indexOf(
            tr.children[0] as HTMLTableCellElement
        );
        this.onNext();
    }

    onEdit() {
        const cells = this.querySelectorAll("td");

        if(!this.savedState) {
            this.savedState = JSON.parse(JSON.stringify(this.state));
        }

        cells.forEach(this.handleCellListeners.bind(this));

        this.onNext();
    }

    onReadOnly() {
        const cells = this.querySelectorAll("td");
        cells.forEach((td) => {
            td.setAttribute("readonly", "true");
        });

        if(this.savedState) {
            this.renderRows(this.savedState);
            this.savedState = undefined;
        }
        this.editIndex = 0;
    }

    onSave(){
        const data:TrComponent[] = this.state; // data object of table rows.

        if(this.querySelectorAll("td")[this.editIndex]) {
            this.querySelectorAll("td")[this.editIndex].setAttribute(
                "readonly",
                "true"
            );
        }

        this.savedState = undefined;
        this.editIndex = 0;

        this.channel.postMessage({
            type: "change",
            detail: data
        }); 

        this.renderRows(data);
    }

    onTableData(next) {
        this.renderHeader(next.columnData);
        this.renderRows(next.rowData);
    }

    renderRows(rows: any[]) {
        this.$body.innerHTML = "";
        rows.forEach((rowData) => {
            const tr = document.createElement("tr", {is: "in-tr"});

            this.columnData.forEach((colData) => {
                const td = document.createElement("td", {is: "in-td"});

                td.setAttribute("value", rowData[colData.property]);
                td.setAttribute("data-property", colData.property);
                td.setAttribute("readonly", "true");
                tr.appendChild(td);
            });

            this.createDeleteButton(tr);
            this.$body.appendChild(tr);

            const renderedData = new CustomEvent("data", {
                detail: rowData
            });

            tr.dispatchEvent(renderedData);
        });
    }

    renderHeader(cols: ColumnData) {

        this.columnData = cols.sort((a, b) => a.index - b.index);

        const tr = document.createElement("tr");

        cols.forEach((colData) => {
            const th = document.createElement("th");
            th.innerText = colData.label;
            tr.appendChild(th);
        });

        this.$head.innerHTML = "";
        this.$head.appendChild(tr);
    }

    createDeleteButton(tr: HTMLTableRowElement) {
        const deleteButtonTd = document.createElement("td");
        deleteButtonTd.classList.add("delete-cell");
        deleteButtonTd.setAttribute("readonly", "true");
        deleteButtonTd.innerHTML = `
            <button class="icon icon-trash" is="in-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                     d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
                </svg>
            </button>
        `;
        tr.appendChild(deleteButtonTd);
    }
}

