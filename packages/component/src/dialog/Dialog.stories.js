import { html } from 'lit-html';
import { DialogComponent } from './Dialog';
import { ModalComponent } from './Modal';
import { TooltipComponent } from './Tooltip';
import { DialogStack } from './DialogStack';

window.__dialogStack = new DialogStack();

export default {
  title: 'Components/Dialog',
  component: 'in-dialog',
};

const DialogTemplate = ({
  targetId,
  targetSelector,
  templateSelector,
  variant,
}) => {
  return html`
    <in-dialog
      target="${targetSelector}"
      template="${templateSelector}"
      variant="${variant}"
    ></in-dialog>
    <button data-dialog-id="${targetId}" is="in-button" class="primary">
      Open
    </button>
  `;
};

export const Primary = DialogTemplate.bind({});
Primary.args = {
  targetId: 'dialog-hello-target',
  targetSelector: '[data-dialog-id="dialog-hello-target"]',
  templateSelector: '[data-template-id="dialog-hello"]',
  variant: 'modal',
};
