/// <reference types="cypress" />
import { config } from "./config/config";

context("Login + Update Order Status", () => {
  beforeEach(() => {
    cy.visit(config.url);
  });

  it("Login and then update order status", () => {
    cy.get("#email").type("nitin.madelyn@gmail.com");
    cy.get("#password").type("ilovepermatech{enter}");

    cy.get('.makeStyles-rootOrder-13 li').first().then($el => {
      cy.wait(1000);
      cy.get('[name="orderStatus"]').first().click();
    });
    
  });
});
