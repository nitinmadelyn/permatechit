/// <reference types="cypress" />
import { config } from "./config/config";

context("Login", () => {
  beforeEach(() => {
    cy.visit(config.url);
  });

  it("Customer Login", () => {
    cy.get("#email").type("nitin.madelyn@gmail.com");
    cy.get("#password").type("ilovepermatech{enter}");
  });
});
