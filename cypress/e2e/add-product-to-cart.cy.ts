describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click();

    cy.location('pathname').should('include', '/product');
    // select the size of the product
    cy.get('button').contains('P').click();

    cy.contains('Adicionar ao carrinho').click();

    // check if the product is in the cart
    cy.contains('Cart: (1)').should('exist');
  });

  it('should not count duplicated products on cart', () => {
    cy.get('a[href^="/product"]').first().click();

    cy.location('pathname').should('include', '/product');
    // select the size of the product
    cy.get('button').contains('P').click();

    cy.contains('Adicionar ao carrinho').click();
    // await for the toast to disappear
    cy.wait(3000);
    // click to add again
    cy.contains('Adicionar ao carrinho').click();

    // check if the product is in the cart
    cy.contains('Cart: (1)').should('exist');
  });

  it('should be able to search a product and add it to the cart', () => {
    cy.searchByQuery('moletom');

    cy.get('a[href^="/product"]').first().click();

    cy.location('pathname').should('include', '/product');

    cy.get('button').contains('P').click();

    cy.contains('Adicionar ao carrinho').click();

    cy.contains('Cart: (1)').should('exist');
  });
});
