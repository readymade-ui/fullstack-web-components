import { html } from "lit-html";
import { ButtonComponent } from "./../button/Button";
import { DialogComponent } from "./Dialog";
import { ModalComponent } from "./Modal";
import { TooltipComponent } from "./Tooltip";
import { DialogStack } from "./DialogStack";

// export { DialogStack, TooltipComponent, ModalComponent, DialogComponent, ButtonComponent  };


export default {
    title: "Components/Dialog",
    component: "in-dialog"
}

const DialogTemplate = ({ targetId, targetSelector, templateSelector, variant }) => {
    return html`
        <in-dialog template="${templateSelector}"
            target="${targetSelector}"
            variant="${variant}">
        </in-dialog>

        <button is="in-button" 
            class="primary"
            data-dialog-id="${targetId}"
            >
                Open
        </button>
    `;
}

export const Primary = DialogTemplate.bind({});
Primary.args = {
    targetId: "dialog-hello-target",
    targetSelector: "[data-dialog-id='dialog-hello-target']",
    templateSelector: "[data-template-id='dialog-hello']",
    variant: "modal"
};

