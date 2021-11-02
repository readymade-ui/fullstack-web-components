describe('CardComponent', () => {
  it('should find slots in the card', () => {
    cy.visit('iframe.html?id=components-card--image-card');
    cy.get('in-card').shadow().find('slot[name="header"]').should('exist');
    cy.get('in-card').shadow().find('slot[name="content"]').should('exist');
    cy.get('in-card').shadow().find('slot[name="footer"]').should('exist');
  });
  it('should find the card slot content in light DOM', () => {
    cy.visit('iframe.html?id=components-card--image-card');
    cy.get('#root').find('[slot="header"]').get('img').should('exist');
    cy.get('#root').find('[slot="header"]').contains('Food');
    cy.get('#root').find('[slot="content"]').contains('Lorem ipsum');
    cy.get('#root').find('[slot="footer"]').contains('Read');
  });
});
