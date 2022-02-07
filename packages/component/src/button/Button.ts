import { attachStyle, Component, css } from '@in/common';

const buttonStyles = css`
  .in-button.primary {
    background: var(--color-blue-500);
    border: 2px solid var(--color-blue-500);
    box-sizing: border-box;
    border-radius: 12px;
    min-height: 44px;
    min-width: 180px;
    color: var(--color-white);
    font-size: var(--font-body-md);
    font-weight: var(--font-weight-button);
    cursor: pointer;
    padding: 0px;
  }
  .in-button.secondary {
    background: var(--color-white);
    border: 2px solid var(--color-blue-500);
    box-sizing: border-box;
    border-radius: 12px;
    min-height: 44px;
    min-width: 180px;
    color: var(--color-blue-500);
    font-size: var(--font-body-md);
    font-weight: var(--font-weight-button);
    cursor: pointer;
    padding: 0px;
  }
  .in-button.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-white);
    border: 2px solid var(--color-blue-500);
    box-sizing: border-box;
    border-radius: 12px;
    height: 44px;
    width: 44px;
    color: var(--color-blue-500);
    font-size: var(--font-body-icon);
    font-weight: var(--font-weight-button);
    cursor: pointer;
    padding: 0px;
    padding: var(--padding-xs);
  }
  .icon svg {
    width: 100%;
    height: 100%;
  }
  .icon.icon-close svg {
    transform: rotateZ(45deg);
  }
  .in-button.primary:focus,
  .in-button.secondary:focus,
  .in-button.icon:focus {
    background: var(--color-white);
    color: var(--color-black);
    border: 2px solid var(--color-black);
    outline: none;
  }
  .in-button.primary:active,
  .in-button.secondary:active,
  .in-button.icon:active {
    background: var(--color-white);
    color: var(--color-neutral-500);
    border: 2px solid var(--color-neutral-500);
    outline: none;
  }
  .in-button.primary[disabled],
  .in-button.secondary[disabled],
  .in-button.icon[disabled] {
    opacity: var(---color-disable);
    background: var(--color-disable);
    border: var(--border-disable);
    color: var(--color-neutral-500);
    cursor: default;
  }
  .in-button.primary[disabled]:focus,
  .in-button.secondary[disabled]:focus,
  .in-button.icon[disabled]:focus,
  .in-button.primary[disabled]:active,
  .in-button.secondary[disabled]:active,
  .in-button.icon[disabled]:active {
    border: var(--border-disable);
    outline: none;
    box-shadow: none;
  }
`;

/**
 * Customized built-in element that renders a styled button.
 *
 * `ButtonComponent` is displayed contextually as one of three variants: primary, secondary or icon. The variant is set using a CSS classname. The label is set via the content of the `HTMLButtonElement`. When displayed as the icon variant, ButtonComponent expects two direct children: `HTMLSVGElement` and `HTMLSpanElement` that displays a label exclusively for screen readers using the `hidden` HTML attribute.
 * @tag {string} in-button
 * @attr {string} is - "in-button", Required
 * @attr {string} class - Variant, can either be "primary" "secondary", or "icon"
 */
@Component({
  custom: { extends: 'button' },
  selector: 'in-button',
  style: buttonStyles,
})
export class ButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.classList.add('in-button');
    attachStyle(this);
  }
}
