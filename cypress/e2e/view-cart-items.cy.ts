describe('Viewing cart items', () => {
  it('should display cart items after adding products and hovering the cart', () => {
    // Add products to the cart
    cy.visit('/products');
    cy.get('.product').first().click();
    cy.get('.add-to-cart-button').click();

    // Hover over the cart
    cy.get('.cart-icon').trigger('mouseover');

    // Verify that cart items are displayed
    cy.get('.cart-items').should('be.visible');
  });
});
