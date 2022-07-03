import { ValidityStateFlags } from "types/lib.elementInternals"

export type Validator = {
    validations: {
        flag: ValidityStateFlags;
        condition: (elem: HTMLElement) => boolean;
        message?: string;
    } [];
}

export function validate (elem: any, showError: boolean) {

    const messageElem = elem.shadowRoot.querySelector(".message");
    if(messageElem) {
        messageElem.innerHTML = "";
    }

    const activeValidators = [];

    if(!elem.$validator || !elem.$validator.validations) {
        return;
    }

    elem.$validator.validations.forEach(validator => {
        if(validator.condition(elem) === true) {
            elem.setValidity(validator.flag, validator.message);
            activeValidators.push(validator);

            if(showError) {
                if(elem.$input) {
                    elem.$input.classList.add("error");
                    elem.$input.setAttribute("aria-invalid", "true");
                }
                if(messageElem) {
                    const div = document.createElement("div");
                    div.innerHTML = validator.message;
                    messageElem.appendChild(div);
                }
            }
        }
    });

    if(!activeValidators.length) {
       elem.setValidity({}); 
       if(elem.$input) {
            elem.$input.classList.remove("error");
       }
       if(messageElem) {
            messageElem.innerHTML = "";
       }
    }

    elem.dispatchEvent(new CustomEvent("validate", {
        bubbles: true
    }));

    
}