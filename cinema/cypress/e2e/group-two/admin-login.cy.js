describe('Авторизация администратора', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('/admin');
  });

  it('успешный вход — happy path', function () {
    cy.fixture('users').then(({ happy }) => {
      cy.get(this.selectors.admin.email).should('be.visible').type(happy.email);
      cy.get(this.selectors.admin.password).type(happy.password);
      cy.get(this.selectors.admin.submit).click();

      cy.get(this.selectors.admin.adminSubtitle)
        .should('be.visible')
        .and('contain.text', 'Администратор');
      cy.get('#hall-control').should('be.visible');
      cy.get(this.selectors.admin.hallTitles).should('exist');
    });
  });

  it('отклоняет неверные учётные данные — sad path', function () {
    cy.fixture('users').then(({ sad }) => {
      cy.get(this.selectors.admin.email).should('be.visible').type(sad.email);
      cy.get(this.selectors.admin.password).type(sad.password);
      cy.get(this.selectors.admin.submit).click();

      cy.get(this.selectors.admin.loginTitle)
        .should('be.visible')
        .and('contain.text', 'Авторизация');
      cy.get(this.selectors.admin.email).should('be.visible');
    });
  });
});