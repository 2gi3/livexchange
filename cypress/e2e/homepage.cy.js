const { createYield } = require("typescript");

describe("Home page renders and works correctly", () => {
  before(() => {
    cy.visit("/");
  });

  it("should display the correct average ticket value", () => {
    cy.findByText("Average Ticket Value").should("exist");
    cy.findByText("2333.33").should("exist");

    // cy.findByText("2000").should("exist");
    cy.findByText("2000")
      .should("exist")
      .should(($el) => {
        const color = $el.css("color");
        expect(color).to.equal("#00DB06");
      });

    cy.findByRole("button", { name: "BTC/USD" }).should("be.visible");
    cy.findByRole("button", { name: "BTC/GBP" }).should("be.visible");
    cy.get(".w-60 > :nth-child(4)")
      .should("contain", "open")
      .should("contain", 27820);

    cy.findByLabelText("Find a specific pair").type("BTC/EUR");
    cy.findByRole("button", { name: "BTC/USD" }).should("not.exist");
    cy.findByRole("button", { name: "BTC/GBP" }).should("not.exist");
    cy.findByRole("button", { name: "BTC/EUR" }).click();
    cy.get(".w-60 > :nth-child(4)")
      .should("contain", "open")
      .should("contain", 25497);
  });
});
