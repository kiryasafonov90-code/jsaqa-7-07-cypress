const makeUser = (username) => ({
  id: Date.now(), username, firstName: 'Test', lastName: 'Student',
  email: `${username}@example.com`, password: 'Test12345',
  phone: '1234567890', userStatus: 1
});

Cypress.Commands.add('createPetstoreUser', (username) => {
  const user = makeUser(username);
  return cy.request('POST', '/user', user).then((response) => {
    expect(response.status).to.eq(200);
    return user;
  });
});
