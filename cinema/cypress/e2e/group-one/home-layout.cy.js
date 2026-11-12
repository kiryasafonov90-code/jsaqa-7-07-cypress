describe('Дополнительная проверка главной страницы', () => {
  it('показывает непустые названия дней в навигации', () => {
    cy.visit('/');
    cy.get('.page-nav__day')
      .should('have.length.greaterThan', 0)
      .each(($day) => {
        expect($day.text().trim()).not.to.equal('');
      });
  });
});