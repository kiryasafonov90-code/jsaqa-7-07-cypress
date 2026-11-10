describe('Авторизация администратора', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('/admin');
  });

  it('успешный вход — happy path', function () {
    cy.fixture('users').then(({ happy }) => {
      cy.get(this.selectors.admin.email).type(happy.email);
      cy.get(this.selectors.admin.password).type(happy.password);
      cy.get(this.selectors.admin.submit).first().click();
      cy.url().should('include', '/admin');
      cy.get('body').should('not.contain.text', 'Авторизация');
    });
  });

  it('отклоняет неверные учётные данные — sad path', function () {
    cy.fixture('users').then(({ sad }) => {
      cy.get(this.selectors.admin.email).type(sad.email);
      cy.get(this.selectors.admin.password).type(sad.password);
      cy.get(this.selectors.admin.submit).first().click();
      cy.get('body').should('be.visible');
      cy.get(this.selectors.admin.email).should('be.visible');
    });
  });
});
