const { createYield } = require("typescript");

describe("Google search", () => {
  it("should return search results for ironman", () => {
    cy.visit("/");
    cy.get(".h-11").type("btc/usd");
    cy.findByRole("button", { name: "BTC/USD" }).should("be.visible");
    cy.findByRole("button", { name: "BTC/EUR" }).should("not.exist");
  });
});
