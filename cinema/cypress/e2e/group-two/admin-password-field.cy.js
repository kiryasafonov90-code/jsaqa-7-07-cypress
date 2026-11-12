describe('Форма авторизации администратора', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('/admin');
  });

  it('использует поле скрытого ввода для пароля', function () {
    cy.get(this.selectors.admin.password)
      .should('be.visible')
      .and('have.attr', 'type', 'password');
  });
});
