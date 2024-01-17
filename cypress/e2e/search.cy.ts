describe('search products', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn();
    });
  });

  it('should be able to search for products', () => {
    cy.visit('/', {
      failOnStatusCode: false,
    });

    cy.searchByQuery('moletom');

    cy.location('pathname').should('include', '/search');
    cy.location('search').should('include', 'q=moletom');

    cy.get('a[href^="/product"]').should('exist');
  });

  it('should not be able to visit search without a search query', () => {
    cy.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('/search', {
      failOnStatusCode: false,
    });

    cy.get('a[href^="/product"]').should('exist');
  });
});
