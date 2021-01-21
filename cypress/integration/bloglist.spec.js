describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#loginForm').exist
  })
})

describe('Blog app - logging in ', function () {
  const newUser = {
    name: 'Thomas Aquinas',
    username: 'stThomas',
    password: '1991-1958'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    cy.request('POST', 'http://localhost:3001/api/users/', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginForm').exist
    // ...
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(newUser.username)
      cy.get('#password').type(newUser.password)
      cy.get('#login-button').click()

      cy.contains(newUser.name.concat(' logged-in'))

    })

    it('fails with wrong credentials', function () {
      // ...
      cy.get('#username').type('wrong crendential')
      cy.get('#password').type('wrong crendential')
      cy.get('#login-button').click()
      cy.get('h2').should('not.contain', newUser.name.concat(' logged-in'))

    })
  })
})
