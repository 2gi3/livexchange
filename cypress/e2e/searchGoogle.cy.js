const { createYield } = require("typescript");

describe("Home page renders and works correctly", () => {
  before(() => {
    cy.visit("/");
  });

  it("should display the correct average ticket value", () => {
    cy.findByText("Average Ticket Value").should("exist");
    cy.findByText("2333.33").should("exist");
    cy.contains("Biggest Movers 24H / %");
  });

  it("should render a green bar for biggest gain and a red bar for biggest loss", () => {
    cy.get("#biggestMoversBar")
      .first()
      .should("have.attr", "width", "44px")
      .should("have.attr", "height", "95.52")
      .should("have.attr", "fill", "#00DB06");
  });

  // it("should return search results for ironman", () => {
  //   cy.findByText("BTC/USD: 2000 (0.5)").should("exist");
  //   cy.findByLabelText("Find a specific pair").type("btc/usd");
  //   cy.findByRole("button", { name: "BTC/USD" }).should("be.visible");
  //   cy.findByRole("button", { name: "BTC/EUR" }).should("not.exist");
  // });
});
