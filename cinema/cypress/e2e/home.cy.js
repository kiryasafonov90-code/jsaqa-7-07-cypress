describe('Главная страница кинотеатра', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('/');
  });

  it('отображает заголовок и навигацию по дням', function () {
    cy.get(this.selectors.home.pageTitle).should('contain.text', 'Идём в кино');
    cy.get(this.selectors.home.dayNavigation).should('be.visible');
  });

  it('отображает карточки фильмов и сеансы', function () {
    cy.get(this.selectors.home.movieCards).should('have.length.greaterThan', 0);
    cy.get(this.selectors.home.movieTitle).first().should('be.visible').and('not.be.empty');
    cy.get(this.selectors.home.seanceLinks).should('have.length.greaterThan', 0);
  });
});
