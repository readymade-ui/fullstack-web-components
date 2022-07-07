import { TextInputComponent } from "./TextInput";
import { ButtonComponent } from "./../button/Button";
import { html } from "lit-html";

export default {
    title: "Components/Inputs/TextInput",
    component: "in-textinput"
}

const validators = {
    username: {
        validations: [
            {
                flag: { valueMissing: true },
                condition: (input) => {
                    if(input.required && input.value.length <= 0) {
                        return true;
                    }
                    return false;
                },
                message: "Error: Required, please enter username."
            },
            {
                flag: { tooShort: true },
                condition: (input) => {
                    if(input.minLength && input.value.length < input.minLength) {
                        return true;
                    }
                    return false;
                },
                message: "Error: Minimum length not met, please supply a value with at least 8 characters." 
            }
        ]
    },
    password: {
        validations: [
            {
                flag: { valueMissing: true },
                condition: (input) => {
                    if(input.required && input.value.length <= 0) {
                        return true;
                    }
                    return false;
                },
                message: "Error: Required, please enter password."
            },
            {
                flag: { tooShort: true },
                condition: (input) => {
                    if(input.minLength && input.value.length < input.minLength) {
                        return true;
                    }
                    return false;
                },
                message: "Error: Minimum length not met, please supply a value with at least 8 characters." 
            },
            {
                flag: { patternMismatch: true },
                message: "Error: Please use at least one uppercase, special character, and number",
                condition: (input) => {
                    if(input.pattern && input.value.match(new RegExp(input.pattern)) === null){
                        return true;
                    }
                    return false;
                }
            }
        ]
    }
}

const FormTemplate = ({ headline, validators, onSubmit, onValidate, onFormData }) => {
    setTimeout(() => {
        for(let prop in validators) {
            const input = document.querySelector(`[name="${prop}"]`);
            input.$validator = validators[prop];
        }
    }, 0);
    return html`
        <h4 slot="header">${headline}</h4>
        <form name="foo"
            slot="content"
            @formdata="${onFormData}"
            @validate="${onValidate}"
            @submit="${onSubmit}"
            >
            <fieldset>
                <legend>Login Form</legend>
                <label for="username">Username</label>
                <in-textinput name="username"
                    id="username"
                    type="text"
                    required
                    min-length="8"
                    class="form-control"
                ></in-textinput>

                <label for="password">Password</label>
                <in-textinput name="password"
                    id="password"
                    type="password"
                    required
                    min-length="8"
                    class="form-control"
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                ></in-textinput>

                <button class="primary submit" is="in-button" type="submit">
                    Submit
                </button>
            </fieldset>
        </form>
    `;
}
export const Form = FormTemplate.bind({});
Form.args = {
    headline: "Login",
    validators,
    onSubmit: (ev) => {
        console.log(new FormData(ev.target));
        ev.preventDefault()
    },
    onFormData: (ev) => {
        console.log(ev);
        for(let value of ev.formData.values()) {
            console.log(value);
        }
    },
    onValidate: () => {
        const validations = [];
        for(let prop in validators) {
            validations.push(
                document.querySelector(`[name="${prop}"]`).validity.valid
            );
        }
        if(validations.filter((val) => val === false).length){
            console.warn("INVALID");
        }
        else {
            console.log("VALID");
        }
    }
};

const PrimaryTemplate = ({onValidate, validators}) => {

    setTimeout(() => {
        const input = document.querySelector(`[name="username"]`);
        input.$validator = validators["username"];
    }, 0);

    return html`
    <form @validate="${onValidate}">
        <in-textinput name="username" required></in-textinput>
    </form>`
};

export const Primary = PrimaryTemplate.bind({});

Primary.args = {
    validators,
    onValidate: (ev) => {
        if(!document.querySelector(`[name="username"]`).validity.valid) {
            console.log("invalid!");
        }
        else {
            console.log("valid");
        }
    }
}


const DisabledTemplate = () => {

    return html`
        <in-textinput 
            value="disabled input!"
            disabled
            name="test-input"
        ></in-text-input>
    `;
};

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {};


const ErrorTemplate = () => {
    setTimeout(() => {
        const input = document.querySelector(`[name="username"]`);

        input.$validator = validators["username"];
        input.focus();
        input.blur();
    }, 0);
    return html`
        <in-textinput type="text"
            id="username"
            name="username"
            required
            class="form-control"
        ></in-textinput>
    `;
}
export const Error = ErrorTemplate.bind({});
ErrorTemplate.args = {};