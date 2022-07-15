describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'default',
      name: 'Default user',
      password: 'defaultPassword'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('.login-form')
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('default')
      cy.get('#password').type('defaultPassword')
      cy.get('#submit-button').click()
      cy.contains('Default user logged in')
      cy.contains('new blog')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('inexistent')
      cy.get('#password').type('wrongPassword')
      cy.get('#submit-button').click()
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Default user logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'default', password: 'defaultPassword' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Another blog')
      cy.get('#author-input').type('Another author')
      cy.get('#url-input').type('http://another.url')
      cy.get('#create-button').click()

      cy.get('html').should('contain', 'Another blog Another author view')
    })

    describe('When blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Default Blog', author: 'Default Author', url: 'http://default.url' })
      })

      it('Users can like a blog', function () {
        cy.contains('view').click()
        cy.get('.likes').should('contain', 'likes 0')
        cy.get('#like-button').click()
        cy.get('.likes').should('contain', 'likes 1')
      })
    })
  })
})
