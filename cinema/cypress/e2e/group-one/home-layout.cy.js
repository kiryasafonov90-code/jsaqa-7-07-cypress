describe('Дополнительная проверка главной страницы', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('/');
  });

  it('показывает непустые названия дней в навигации', function () {
    cy.get(this.selectors.home.dayNavigation)
      .should('have.length.greaterThan', 0)
      .each(($day) => {
        expect($day.text().trim()).not.to.equal('');
      });
  });
});
