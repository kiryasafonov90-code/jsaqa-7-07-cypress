describe('Форма авторизации администратора', () => {
  it('использует поле скрытого ввода для пароля', () => {
    cy.visit('/admin');
    cy.get('input[name="password"]')
      .should('be.visible')
      .and('have.attr', 'type', 'password');
  });
});