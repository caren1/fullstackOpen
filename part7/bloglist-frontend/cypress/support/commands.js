Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})