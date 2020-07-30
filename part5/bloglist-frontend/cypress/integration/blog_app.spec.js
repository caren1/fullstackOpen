const { func } = require("prop-types")

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const newTestUser = {
          name: 'wojt',
          username: 'wojt',
          password: 'wojt'
      }

      const newTestUser2 = {
          name: 'wojtek',
          username: 'wojtek',
          password: 'wojtek'
      }
      cy.request('POST', 'http://localhost:3001/api/users', newTestUser)
      cy.request('POST', 'http://localhost:3001/api/users', newTestUser2)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Please fill in the log in form:')
      cy.contains('login')
    })

    describe('login test', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login')
            cy.get('#username').type('wojt')
            cy.get('#password').type('wojt')
            cy.contains('login').click()
        })

        it('fails with invalid credentials', function() {
            if(cy.get('#logout')){
                cy.get('#logout').click()
            }
            cy.get('#username').type('wojt')
            cy.get('#password').type('wrong')
            cy.contains('login').click()
            cy.contains('Could not log in, provided invalid credentials')
            //Optional bonus exercise: Check that the notification shown with unsuccessful login is displayed red.
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.contains('login')
            cy.get('#username').type('wojt')
            cy.get('#password').type('wojt')
            cy.contains('login').click()

            cy.contains('create blog').click()
            cy.get('#title').type('new test blog')
            cy.get('#author').type('wojt')
            cy.get('#url').type('testblog.pl')
            cy.get('#create').click()
        })

        it('A blog can be created', function() {
            // cy.contains('create blog').click()
            // cy.get('#title').type('new test blog')
            // cy.get('#author').type('wojt')
            // cy.get('#url').type('testblog.pl')
            // cy.get('#create').click()
            cy.contains('new test blog by wojt')
        })

        it('Like can be clicked', function() {
            cy.get('.showDetails').click()
            cy.get('.likeBtn').click()
            cy.contains('like').click()
            cy.contains('Likes: 1')
            cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
        })

        it('blog can be deleted by the person who created it', function() {
            cy.contains('delete').click()
            cy.contains('new test blog by wojt').should('not.exist')
        })

        
    })
  })