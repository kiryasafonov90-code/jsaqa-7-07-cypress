describe('Бронирование билета', () => {
  it('получает доступный зал из админки и бронирует место', function () {
    cy.fixture('selectors').then((selectors) => {
      cy.fixture('users').then(({ happy }) => {
        cy.visit('/admin');
        cy.get(selectors.admin.email).type(happy.email);
        cy.get(selectors.admin.password).type(happy.password);
        cy.get(selectors.admin.submit).first().click();

        cy.get(selectors.admin.hallTitles).should('have.length.greaterThan', 0).first()
          .invoke('text').then((hallName) => {
            const normalizedHallName = hallName.trim();
            expect(normalizedHallName, 'Название зала получено из админки').not.to.be.empty;

            cy.visit('/');
            cy.get(selectors.booking.seance).first().click();
            cy.get(selectors.booking.hall).should('be.visible');
            cy.get(selectors.booking.availableSeat).first().click();
            cy.get(selectors.booking.accept).should('be.enabled').click();
            cy.get('body').should(($page) => {
              expect($page.text()).to.match(/билет|заказ|брон|место/i);
            });
          });
      });
    });
  });
});
