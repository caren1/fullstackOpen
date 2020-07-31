const { func } = require("prop-types")

describe('Blog app testing', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')

      const newTestUser = { name: 'wojt', username: 'wojt', password: 'wojt' }
      cy.request('POST', 'http://localhost:3001/api/users', newTestUser)
      const newTestUser2 = { name: 'wojtek', username: 'wojtek', password: 'wojtek' }
      cy.request('POST', 'http://localhost:3001/api/users', newTestUser2)

      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Please fill in the log in form:')
      cy.get('#username')
      cy.get('#password')
      cy.contains('login')
    })

    describe('Login', function() {
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
            cy.get('.error').should('contain', 'Could not log in, provided invalid credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'wojt', password: 'wojt' })
        })

        it('A blog can be created', function() {
            cy.contains('create blog').click()
            cy.get('#title').type('new test blog')
            cy.get('#author').type('wojt')
            cy.get('#url').type('testblog.pl')
            cy.get('#create').click()
            cy.contains('new test blog by wojt')
        })

        it('Like can be clicked', function() {
            cy.addBlog({ title: 'test blog for likes', author: 'wojt', url: 'www.wojt.pl' })
            cy.get('.showDetails').click()
            cy.get('#likeBtn').click()
            cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
        })

        it('blog can be deleted by the person who created it', function() {
            cy.addBlog({ title: 'test blog for likes', author: 'wojt', url: 'www.wojt.pl' })
            cy.contains('delete').click()
            cy.contains('new test blog by wojt').should('not.exist')
        })

        it('blog cannot be deleted by other person', function() {
            cy.addBlog({ title: 'test blog for likes', author: 'wojt', url: 'www.wojt.pl' })
            cy.login({ username: 'wojtek', password: 'wojtek' })
            cy.contains('delete').click()
            cy.get('.error').should('contain', 'Could not delete the given blog, test blog for likes')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })      
    })
  })