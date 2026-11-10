describe('Petstore API — пользователи', () => {
  const uniqueName = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  it('создаёт пользователя', () => {
    const username = uniqueName('create');
    cy.createPetstoreUser(username).then((user) => {
      cy.request(`/user/${username}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(user.username);
        expect(response.body.email).to.eq(user.email);
      });
    });
  });

  it('изменяет данные пользователя', () => {
    const username = uniqueName('update');
    cy.createPetstoreUser(username).then((user) => {
      const updatedUser = { ...user, firstName: 'Updated', email: `updated_${username}@example.com` };
      cy.request('PUT', `/user/${username}`, updatedUser).its('status').should('eq', 200);
      cy.request(`/user/${username}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstName).to.eq('Updated');
        expect(response.body.email).to.eq(updatedUser.email);
      });
    });
  });

  it('удаляет пользователя', () => {
    const username = uniqueName('delete');
    cy.createPetstoreUser(username).then(() => {
      cy.request('DELETE', `/user/${username}`).then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.request({ url: `/user/${username}`, failOnStatusCode: false }).then((response) => {
        expect([404, 200]).to.include(response.status);
        if (response.status === 200) expect(response.body.message || '').to.match(/not found|does not exist/i);
      });
    });
  });
});
