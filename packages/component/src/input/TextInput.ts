import { IElementInternals as ElementInternals, ValidityStateFlags } from  "types/lib.elementInternals";
import { Validator, validate } from "./validator";
import { Component, attachShadow, css ,html, Listen } from "@in/common";

/**
 * Renders an input element.
 * @tag {string} in-textinput
 * @attr {string} name - Name of the form control. Submitted with the form as part of a name/value pair
 * @attr {string} type - Type of form control
 * @attr {boolean} required -  A value is required or must be check for the form to be submittable
 * @attr {string} minlength - Minimum length (number of characters) of value
 * @attr {string} maxlength - Maximum length (number of characters) of value
 * @attr {string} pattern - Pattern the value must match to be valid
 * @attr {string} list - Value of the id attribute of the <datalist> of autocomplete options
 * @attr {string} placeholder - Text that appears in the form control when it has no value set
 * @attr {boolean} readonly - The value is not editable
 * @attr {string} size - Size of the control
 * @attr {string} spellcheck - Defines whether the element may be checked for spelling errors.
 */
@Component({
    selector: "in-textinput",
    style: css`:host {
            display: block;
            font-family: var(--font-default);
            font-size: var(--font-body-sm);
        }
        input {
            height: var(--input-min-dimension);
            width: 100%;
            border-radius: var(--radius-sm);
            border: var(--border-default);
            font-size: var(--font-body-md);
            padding-left: var(--padding-sm);
            outline: none;
            box-sizing: border-box;
        }
        input:focus,
        input:focus:hover,
        input:active {
            border: var(--border-focus);
        }
        input.error,
        input.error:hover,
        input.error:focus,
        input.error:active {
            border: var(--border-error);
            outline: none;
            box-shadow: none;
            color: var(--color-error);
        }
        .message{
            margin-top: var(--margin-xxs);
            color: var(--color-error);
            font-weight: var(--font-weight-default);
        }
        input[disabled] {
            opacity: var(--color-disable);
            background: var(--color-disable);
            border: var(--border-disable);
        }
        input[disabled]:hover,
        input[disabled]:focus,
        input[disabled]:active {
            border: var(--border-disable);
            outline: none;
            box-shadow: none;
        }`,
    template: html`<div class="control">
            <input type="text" aria-describedby="message" />
        </div>
        <div id="message" 
            class="message"
            aria-role="alert"
            aria-live="assertive"
            >
        </div>`
})
export class TextInputComponent extends HTMLElement {

    static formAssociated = true;

    attachInternals: () => ElementInternals;

    private internals: ElementInternals;

    public $validator: Validator;

    private $attr = {};

    constructor () {
        super();
        this.internals = this.attachInternals();
        attachShadow(this);
    }

    static get observedAttributes() {
        return [
            "name",
            "type",
            "required",
            "minlength",
            "maxlength",
            "pattern",
            "list",
            "placeholder",
            "readonly",
            "spellcheck", 
            "value", 
            "disabled",
        ];
    }

    attributeChangedCallback (name, prev, next) {

        this.$attr[name] = next;

        switch(name) {
            case "value":
                this.value = next;
                break;
            case "required": 
                this.required = next;
                break;
            case "disabled":
                this.disabled = next;
                break;
            case "type":
                this.$input.setAttribute("type", next);
                break;
            case "minlength":
                this.$input.setAttribute("minlength", next);
                break;
            case "maxlength":
                this.$input.setAttribute("maxlength", next);
                break;
            case "pattern":
                this.$input.setAttribute("pattern", next);
                break;
            case "list":
                this.$input.setAttribute("list", next);
                break;
            case "placeholder":
                this.$input.setAttribute("placeholder", next);
                break;
            case "readonly":
                this.$input.setAttribute("readonly", next);
                break;
            case "spellcheck":
                this.$input.setAttribute("spellcheck", next);
                break;
        }
    }

    @Listen("blur", "input")
    onValidate () {
        validate(this, true);
    }

    @Listen("change", "input")
    @Listen("keyup", "input")
    onChange() {
        this.shadowRoot.querySelector(".message").innerHTML = "";
        this.$input.classList.remove("error");
        this.internals.setFormValue(this.value, this.value);
        this.$input.removeAttribute("aria-invalid");
    }

    connectedCallback () { 
        for (let prop in this.$attr) {
            this.$input.setAttribute(prop, this.$attr[prop]);
        }

        validate(this, false);
    }

    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }

    formStateRestoreCallback(state: string, mode: string) {
        this.value = state;
    }

    formResetCallback(state: string){
        this.value = this.getAttribute("value");
    }


    focus() {
        this.$input.focus();
    }

    blur () {
        this.$input.blur();
    }

    checkValidity () {
        return this.internals.checkValidity();
    }

    reportValidity () {
        return this.internals.reportValidity();
    }

    set value(value: string) {
        this.$input.value = value;
    }

    set disabled (disabled: boolean | string) {
        if(disabled === "true" || disabled === true) {
            this.$input.setAttribute("disabled", "true");
        }
        if(disabled === "false" || disabled === false) {
            this.$input.removeAttribute("disabled");
        }
    }

    set required(required: boolean | string) {
        if(required === "true" || required === true) {
            this.$input.setAttribute("required", "true");
        }
        if(required === "false" || required === false) {
            this.$input.removeAttribute("required");
        }
    }

    get disabled() {
        return this.$input.disabled;
    }

    get required(): boolean {
        return this.$input.required;
    }

    get value(): string {
        return this.$input.value;
    }

    get $input(): HTMLInputElement {
        return this.shadowRoot.querySelector("input");
    }

    get validity() {
        return this.internals.validity;
    }

    get validationMessage () {
        return this.internals.validationMessage;
    }

    get type () {
        return this.$input.type ?? "text";
    }

    set type(type: string) {
        this.$input.setAttribute("type", type);
    }

    get list() {
        return this.$input.list;
    }

    get minLength() {
        return this.$input.minLength;
    }

    set minLength(min: number) {
        this.$input.minLength = min;
    }

    get maxLength() {
        return this.$input.maxLength;
    }

    set maxLength(max: number) {
        this.$input.maxLength = max;
    }

    get readOnly() {
        return this.$input.readOnly;
    }

    get pattern () {
        return this.$input.pattern;
    }

    set pattern(pattern: string) {
        this.$input.pattern = pattern;
    }

    get spellcheck() {
        return this.$input.spellcheck;
    }

    get placeholder() {
        return this.$input.placeholder;
    }

    setValidity (
        flags: ValidityStateFlags,
        message?: string,
        anchor?: HTMLElement
    ): void {
        this.internals.setValidity(flags, message, anchor);
    }
}
