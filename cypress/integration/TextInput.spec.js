describe("TextInputComponent", () => {

    it("should display error message on blur", () => {
        cy.visit("http://localhost:6006/iframe.html?id=components-inputs-textinput--form&viewMode=story");

        cy.get("#root").get("[name='username']").should("be.visible").click();

        cy.get("#root").get("[name='password']").should("be.visible").click();

        cy.get("#root").get(".submit").should("be.visible").click();


        cy.get("#root").get("[name='username']")
            .shadow()
            .find(".message")
            .contains("Error: Required, please enter username.");
        cy.get("#root").get("[name='password']")
            .shadow()
            .find(".message")
            .contains("Error: Please use at least one uppercase, special character, and number");
    });

    it("should not display error message when valid", () => {
        cy.visit("http://localhost:6006/iframe.html?id=components-inputs-textinput--form&viewMode=story");

        cy.get("#root").get("[name='username']")
            .shadow()
            .find("input")
            .type("jurerick.porras@gmail.com");
        cy.get("#root").get("[name='password']")
            .shadow()
            .find("input")
            .type("Qwerty123**");
        cy.get("#root").get(".submit")
            .click();
        
        cy.get("#root").get("[name='username']")
            .shadow()
            .find(".message")
            .should("include.text", "");
        cy.get("#root").get("[name='password']")
            .shadow()
            .find(".message")
            .should("include.text", "");
    });
});