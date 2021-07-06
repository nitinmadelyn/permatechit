/// <reference types="cypress" />
import { config } from "./config/config";

context("Login + Update Product Status", () => {
  beforeEach(() => {
    cy.visit(config.url);
  });

  it("Login and then update product status", () => {
    cy.get("#email").type("nitin.madelyn@gmail.com");
    cy.get("#password").type("ilovepermatech{enter}");

    cy.get("#simple-tab-1").click();
    cy.wait(1000);

    cy.get(".expandMore")
      .first()
      .click()
      .then(($el) => {
        cy.wait(1000);
        cy.get('[name="productStatus"]').first().click();
      });
  });
});
