describe('Авторизация администратора', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('/admin');
  });

  it('успешный вход — happy path', function () {
    cy.fixture('users').then(({ happy }) => {
      cy.get(this.selectors.admin.email).should('be.visible').type(happy.email);
      cy.get(this.selectors.admin.password).should('be.visible').type(happy.password);
      cy.get(this.selectors.admin.submit).click();

      cy.url().should('include', '/admin/index.php');
      cy.get(this.selectors.admin.adminSubtitle)
        .should('be.visible')
        .and('contain.text', 'Администратор');
      cy.get(this.selectors.admin.hallControl).should('be.visible');
      cy.get(this.selectors.admin.hallTitles)
        .should('have.length.greaterThan', 0);
    });
  });

  it('отклоняет неверные учётные данные — sad path', function () {
    cy.fixture('users').then(({ sad }) => {
      cy.get(this.selectors.admin.email).should('be.visible').type(sad.email);
      cy.get(this.selectors.admin.password).type(sad.password);
      cy.get(this.selectors.admin.submit).click();

      // Сервер отвечает отдельной страницей ошибки, а не повторно показывает форму входа.
      cy.location('pathname')
        .should('include', '/admin/scripts/authorization.php');
      cy.get('body').should('contain.text', 'Ошибка авторизации!');
    });
  });
});
