describe("Table Component", () => {
    beforeEach(() => {
        cy.wait(100);
    });

    it("should enter edit mode", () => {
        cy.visit("http://localhost:6006/iframe.html?id=components-table--primary");

        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='footer']")
            .find(".button-edit")
            .click();
        
        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='content']")
            .find("tbody")
            .find("tr")
            .find("td")
            .find("in-textinput")
            .should("exist");
    });
    
    it("should edit a text field", () => {
        cy.visit("http://localhost:6006/iframe.html?id=components-table--primary");

        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='footer']")
            .find(".button-edit")
            .click();
        
        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='content']")
            .find("tbody")
            .find("tr")
            .first()
            .find("td")
            .first()
            .find("in-textinput")
            .click()
            .shadow()
            .find("input")
            .clear();

        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='content']")
            .find("tbody")
            .find("tr")
            .first()
            .find("td")
            .first()
            .find("in-textinput")
            .click()
            .shadow()
            .find("input")
            .type("jane@doe.com");

        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='content']")
            .find("tbody")
            .find("tr")
            .first()
            .find("td")
            .first()
            .find("in-textinput")
            .click();
            
        cy.wait(100);

        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='footer']")
            .find(".button-save")
            .click(); 
        
        //TODO: The test below does not work! pls fix
        // cy.wait(1000);

        // cy.get("#root")
        //     .get("[channel='table:one']")
        //     .shadow()
        //     .find("[slot='content']")
        //     .find("tbody")
        //     .find("tr")
        //     .first()
        //     .find("td")
        //     .first()
        //     .find("span")
        //     .contains("jane@doe.com");
    });

    it("should cancel edit mode", () => {
        cy.visit("http://localhost:6006/iframe.html?id=components-table--primary");

        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='footer']")
            .find(".button-edit")
            .click(); 
        
        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='content']")
            .find("tbody")
            .find("tr")
            .first()
            .find("td")
            .first()
            .find("in-textinput")
            .click()
            .shadow()
            .find("input")
            .clear();
        
        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='content']")
            .find("tbody")
            .find("tr")
            .first()
            .find("td")
            .first()
            .find("in-textinput")
            .click()
            .shadow()
            .find("input")
            .type("jane@doe.com");
        
        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='footer']")
            .find(".button-cancel")
            .click(); 
        
        cy.get("#root")
            .get("[channel='table:one']")
            .shadow()
            .find("[slot='content']")
            .find("tbody")
            .find("tr")
            .first()
            .find("td")
            .first()
            .find("span")
            .contains("jur@poras.com");
    })
});