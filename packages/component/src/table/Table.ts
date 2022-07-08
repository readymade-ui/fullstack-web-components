import { Component, attachTemplate, attachStyle, html, css } from "@in/common";

export interface Column {
    property: string;
    label: string;
    span?: number;
    align: "left" | "center" | "right" | "justify";
    index: number;
};

export type ColumnData = Column[];

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
        }
        [is="in-table"] tr {
            height: 58px;
            vertical-align: middle;
        }
        [is="in-table"] td, [is="in-table"] th {
            padding-left: var(--padding-xxs);
            padding-right: var(--padding-xxs);
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

    attributeChangedCallback(name, prev, next) {
        switch(name) {
            case 'channel':
                this.channel = new BroadcastChannel(next);
                this.channel.onmessage = this.onMessage.bind(this);
                break;
        }
    }

    onMessage(ev) {
        switch(ev.data.type) {
            case "data":
                this.onTableData(ev.data.detail);
                break;
        }
    }

    onTableData(next) {
        this.renderHeader(next.columnData);
        this.renderRows(next.rowData);
    }

    renderRows(rows: any[]) {
        this.$body.innerHTML = "";
        rows.forEach((rowData) => {
            const tr = document.createElement("tr");

            this.columnData.forEach((colData) => {
                const td = document.createElement("td");
                td.innerText = rowData[colData.property];
                tr.appendChild(td);
            });

            this.$body.appendChild(tr);
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
}

