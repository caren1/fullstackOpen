describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const newTestUser = {
          name: 'wojt',
          username: 'wojt',
          password: 'wojt'
      }
      cy.request('POST', 'http://localhost:3001/api/users', newTestUser)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Please fill in the log in form:')
      cy.contains('login')
    })
  })