import { ButtonComponent } from "./Button";
import { html } from "lit-html";

export default {
    title: "Components/Inputs/Button",
    component: "in-button"
}

const DisabledTemplate = ({label, variant}) => {
    return html`
        <button disabled
            class="${variant}" 
            is="in-button"
            >
            ${label}
        </button>
    `;
}

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
    variant: "primary",
    label: "Submit"
};

const Template = ({label, variant}) => {
    return html`
        <button 
            class="${variant}" 
            is="in-button"
            >
            ${label}
        </button>
    `;
}

export const Primary = Template.bind({});
Primary.args = {
    variant: "primary",
    label: "Submit"
};

export const Secondary = Template.bind({});
Secondary.args = {
    variant: "secondary",
    label: "Submit"
}


let icon = null;
if(window.FontAwesome) {
    icon = window.FontAwesome.icon({
        prefix: "fas",
        iconName: "plus"
    });
}
const svg = (icon!=null)? icon.node[0]: "";
if(svg) {
    svg.setAttribute("aria-hidden", true);
}

const IconTemplate = ({label, variant, svg}) => {
    return html`
        <button 
            class="${variant}" 
            is="in-button"
            aria-labelledby="close-button-label"
            >
            <span id="close-button-label" hidden>
                ${label}
            </span>
            ${svg}
        </button>
    `;
}

export const Icon = IconTemplate.bind({});
Icon.args = {
    variant: "icon icon-close",
    label: "Close",
    svg
}

