describe('remove cart items', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn();
    });
  });

  it('should be able to remove item from cart', () => {
    cy.addProductToCartAndFollow();

    cy.contains('Remove').should('exist');

    cy.contains('Remove').click();

    cy.contains('Remove this item from your cart').should('exist');

    cy.get('[role="dialog"] button').contains('Remove').click();

    cy.contains('Cart: (0)').should('exist');
  });
});
