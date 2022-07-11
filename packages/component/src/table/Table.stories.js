import { html } from "lit-html";
import { TableCardComponent } from "./TableCard";
import { ColumnData, TableComponent } from "./Table";
import { CardComponent } from "../card/Card";
import { TrComponent } from "./Tr";
import { TdComponent } from "./Td";
import { TextInputComponent } from "./../input/TextInput";

// export { TextInputComponent, TableCardComponent, TableComponent, ColumnData, CardComponent, TrComponent };

export default {
    title: "Components/Table",
    component: "in-tablecard"
}

const rowData = [
    {
        email: "jur@poras.com",
        phoneNumber: "(310) 555 5555",
        street: "100 Camino Real",
        city: "Los Angeles",
        region: "CA",
        postalCode: "90277"
    },
    {
        email: "jur@poras.com",
        phoneNumber: "(310) 555 5555",
        street: "100 Camino Real",
        city: "Los Angeles",
        region: "CA",
        postalCode: "90277"
    },
    {
        email: "jur@poras.com",
        phoneNumber: "(310) 555 5555",
        street: "100 Camino Real",
        city: "Los Angeles",
        region: "CA",
        postalCode: "90277"
    },
];

const columnData = [
    {
        property: "email",
        label: "email address",
        index: 0,
        align: "left",
        span: 10
    },
    {
        property: "postalCode",
        label: "postal code",
        index: 5,
        align: "left",
        span: 10
    },
    {
        property: "region",
        label: "state",
        index: 4,
        align: "left",
        span: 10
    },
    {
        property: "city",
        label: "city",
        index: 3,
        align: "left",
        span: 10
    },
    {
        property: "street",
        label: "street",
        index: 2,
        align: "left",
        span: 10
    },
    {
        property: "phoneNumber",
        label: "phone number",
        index: 1,
        align: "left",
        span: 10
    },
];

const TableContext = {
    rowData,
    columnData
};

const Template = ({ context, channelName }) => {

    const channel = new BroadcastChannel(channelName);

    setTimeout(() => {
        channel.postMessage({
            type: "data",
            detail: context
        });
    }, 0);

    return html`
        <in-tablecard channel="${channelName}"></in-tablecard>
    `;
}

export const Primary = Template.bind({});

Primary.args = {
    channelName: "table:one",
    context: TableContext
};

