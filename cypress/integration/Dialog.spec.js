describe("Dialog Component", () => {
    beforeEach(() => {
        cy.wait(1);
    });

    // my own tests
    it("should display a dialog", () => {
        cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");
        cy.get("#root").find("[data-dialog-id]").click();
        cy.get("#root").get("in-modal").should("exist");
        cy.wait(500);
    });

    it("should open and close another dialog", () => {
        cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

        cy.get("#root").find("[data-dialog-id]").click();

        cy.get("#root").get("in-modal")
            .find("[slot='footer']")
            .find("[data-dialog-id='dialog-more-info-target']")
            .click();
        
        cy.get("#root").get("in-modal").eq(1).should("exist");
    
        cy.wait(500);

        cy.get("#root").get("in-modal").eq(1)
            .find("[slot='footer']")
            .find(".dialog-close-button")
            .click();
    
        cy.get("#root").get("in-modal").eq(1).should("not.exist");
   });

   it("should open and close tooltip", () => {

        cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

        cy.get("#root").find("[data-dialog-id]").click();

        cy.get("#root").get("in-modal")
            .find("[slot='footer']")
            .find("[data-dialog-id='dialog-more-info-target']")
            .click();

        cy.wait(500);

        cy.get("#root").get("in-modal").eq(1).find("[slot='content']")
            .find("[data-dialog-id='tooltip-help-target']")
            .click();
        cy.get("#root").get("in-tooltip").should("exist");

        cy.wait(500);

        cy.get("#root").click();
        cy.get("#root").get("in-tooltip").should("not.exist");
    });

    it("should close another dialog and tooltip", ()=> {

        cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

        cy.get("#root").find("[data-dialog-id]").click();
    
        cy.wait(500);

        cy.get("#root").get("in-modal")
            .find("[slot='footer']")
            .find("[data-dialog-id='dialog-more-info-target']")
            .click();

        cy.get("#root").get("in-modal").eq(1).find("[slot='content']")
            .find("[data-dialog-id='tooltip-help-target']")
            .click();

        cy.wait(500);

        // close tooltip
        cy.get("#root").click();
        cy.get("#root").get("in-tooltip").should("not.exist");

        cy.get("#root").get("in-modal").eq(1)
            .find("[slot='footer']")
            .find(".dialog-close-button")
            .click();
        
        cy.wait(500);
    
        // close another dialog
        cy.get("#root").get("in-modal").eq(1).should("not.exist");
    });

    // it("should display a dialog", () => {
    //     cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

    //     cy.get("#root").get("in-modal").should("exist");
    // });

    // it("should close a dialog", () => {
    //     cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

    //     cy.get("#root").get("in-modal").find("[slot='footer']").find(".dialog-close-button").click();

    //     cy.get("#root").get("in-modal").should("not-exist");
    // });

    // it("should close and open dialog again", () => {

    //     cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

    //     cy.get("#root").get("in-modal").find("[slot='footer']").find("[data-dialog-id]").click();

    //     cy.get("#root").get("in-modal").should("exist");
    // });

    // it("should open another dialog", () => {
    //     cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

    //     cy.get("#root").get("in-modal").find("[slot='footer']").find("[data-dialog-id]").click();

    //     // eq = specific index
    //     cy.get("#root").get("in-modal").eq(1).should("exist");
    // });

    // it("should open and close tooltip", () => {

    //     cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");

    //     cy.get("#root").get("in-modal").find("[slot='footer']").find("[data-dialog-id]").click();
        
    //     cy.get("#root").get("in-modal").eq(1).find("[slot='content']")
    //         .find("[data-dialog-id='tooltip-help-target']")
    //         .click();
        
    //     cy.get("#root").click();
    //     cy.get("#root").get("in-tooltip").should("not.exist");
    // });

    // it("should open and close all dialogs", () => {

    //     cy.visit("http://localhost:6006/iframe.html?id=components-dialog--primary");


    //     cy.get("#root").get("in-modal").find("[slot='footer']").find("[data-dialog-id]").click();
    //     cy.get("#root").get("in-modal").eq(1).find("[slot='content']")
    //         .find("[data-dialog-id='tooltip-help-target']")
    //         .click();

    //     cy.get("#root").click();
    //     cy.get("#root").get("in-modal").eq(1).find("[slot='footer']").find(".dialog-close-button").click();

    //     // todo: assert the close of 1st modal.
    //     // There's a bug/lacking lesson. The book teach an action button in the first modal, but it does not exist in the DOM
    // });
});