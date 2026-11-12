describe('Главная страница кинотеатра', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('/');
  });

  it('отображает заголовок и навигацию по дням', function () {
    cy.get(this.selectors.home.pageTitle)
      .should('be.visible')
      .and(($title) => {
        expect($title.text().replace(/\\s/g, '')).to.match(/Идёмвкино/i);
      });
    cy.get(this.selectors.home.dayNavigation).should('be.visible').and('have.length.greaterThan', 0);
  });

  it('отображает карточки фильмов и сеансы', function () {
    cy.get(this.selectors.home.movieCards).should('have.length.greaterThan', 0);
    cy.get(this.selectors.home.movieTitle).first().should('be.visible').and('not.be.empty');
    cy.get(this.selectors.home.seanceLinks).should('have.length.greaterThan', 0);
  });
});