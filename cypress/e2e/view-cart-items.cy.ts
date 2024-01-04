describe('Viewing cart items', () => {
  it('should display cart items after adding products and hovering the cart', () => {
    cy.searchByQuery('moletom');

    cy.get('a[href^="/product"]').first().click();

    cy.location('pathname').should('include', '/product');

    cy.get('button').contains('P').click();

    cy.contains('Adicionar ao carrinho').click();

    cy.get('[data-testid="add-to-cart-button"] > .flex').realHover();

    cy.get('.z-50').should('be.visible');

    cy.contains('1x').should('exist');
  });
});
