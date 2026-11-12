describe('Бронирование билета', () => {
  it('выбирает сеанс в зале, название которого получено из админки, и бронирует место', function () {
    cy.fixture('selectors').then((selectors) => {
      cy.fixture('users').then(({ happy }) => {
        cy.visit('/admin');
        cy.get(selectors.admin.email).type(happy.email);
        cy.get(selectors.admin.password).type(happy.password);
        cy.get(selectors.admin.submit).click();

        cy.get(selectors.admin.adminSubtitle).should('contain.text', 'Администратор');
        cy.get(selectors.admin.hallTitles)
          .should('have.length.greaterThan', 0)
          .then(($halls) => {
            const hallNames = [...$halls].map((hall) => hall.firstChild.textContent.trim()).filter(Boolean);
            expect(hallNames, 'Названия залов получены из админки').not.to.be.empty;

            cy.visit('/');
            cy.get(selectors.booking.hallSections).should('have.length.greaterThan', 0).then(($sections) => {
              const matchingHall = [...$sections].find((section) => {
                const title = section.querySelector(selectors.booking.hallTitle);
                return title && hallNames.includes(title.textContent.trim()) &&
                  section.querySelector(selectors.booking.seance);
              });

              expect(matchingHall, 'На главной есть сеанс в одном из залов из админки').to.exist;
              const selectedHallName = matchingHall.querySelector(selectors.booking.hallTitle).textContent.trim();

              cy.wrap(matchingHall).find(selectors.booking.seance).first().click();
              cy.get(selectors.booking.hall).should('be.visible');
              cy.get(selectors.booking.hallName).should('contain.text', selectedHallName);
              cy.get(selectors.booking.availableSeat).first().should('be.visible').click();
              cy.get(selectors.booking.accept).should('be.enabled').click();
              cy.get('body').should(($page) => {
                expect($page.text()).to.match(/билет|заказ|брон|место/i);
              });
            });
          });
      });
    });
  });
});