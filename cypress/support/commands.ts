/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/// <reference types="cypress" />
//
//
import 'cypress-real-events';

declare global {
  namespace Cypress {
    interface Chainable {
      searchByQuery(query: string): Chainable<void>;
      signIn(): Chainable<void>;
    }
  }
}
// -- This is a parent command --
Cypress.Commands.add('searchByQuery', (query: string) => {
  cy.visit('/', {
    failOnStatusCode: false,
  });
  cy.get('input[name=q]').type(query).parent('form').submit();
});

declare global {
  interface Window {
    Clerk: {
      isReady: () => boolean;
      client: {
        signIn: {
          create: (options: {
            identifier: string;
            password: string;
          }) => Promise<{ createdSessionId: string }>;
        };
      };
      setActive: (options: { session: string }) => Promise<void>;
    };
  }
}

Cypress.Commands.add('signIn', () => {
  cy.log(`Signing in.`);
  cy.visit(`/`);

  cy.window()
    .should((window: Window) => {
      expect(window).to.not.have.property(`Clerk`, undefined);
      expect(window.Clerk.isReady()).to.eq(true);
    })
    .then(async (window: Window) => {
      cy.clearCookies({ domain: window.location.hostname });
      const res = await window.Clerk.client.signIn.create({
        identifier: Cypress.env(`test_email`),
        password: Cypress.env(`test_password`),
      });

      await window.Clerk.setActive({
        session: res.createdSessionId,
      });

      cy.log(`Finished Signing in.`);
    });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
