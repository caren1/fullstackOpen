/* Provided piece of code from github/@smallsco in order to analyse and compare the solutions */

const dummy = blogs => 1

const totalLikes = (posts) => {
    const likes = posts.map(post => post.likes)
    const reducer = (sum, item) => sum + item
    return likes.length === 0 ? 0 : likes.reduce(reducer, 0)
}

// const totalLikes = blogs => (
//     blogs.reduce((sum, blog) => sum + blog.likes, 0)
//   )

const favouriteBlog = (blogs) => {
    const maxLiked = Math.max(...blogs.map(blog => blog.likes))
    if(maxLiked > 0) {
        let likes = blogs.map(blog => blog.likes)
        return blogs[likes.indexOf(maxLiked)];
    }else{
        return {}
    }
}

// Given a list of blogs, return the blog with the most likes.
// const favouriteBlog = blogs => {
//     let max = 0
//     let favourite = null
//     blogs.map((blog) => {
//       if (blog.likes > max) {
//         max = blog.likes
//         favourite = {
//           title: blog.title,
//           author: blog.author,
//           likes: blog.likes
//         }
//       }
//     })
//     return favourite
//   }

const mostBlogs = (blogs) => {
    const maxNumber = Math.max(...blogs.map(blog => blog.blogs))
    if(maxNumber > 0) {
        let blogsQuantity = blogs.map(blog => blog.blogs)
        return blogs[blogsQuantity.indexOf(maxNumber)];
    }else{
        return {}
    }
}

// Given a list of blogs, return the author with the largest amount
// const mostBlogs = blogs => {
//     if (blogs.length === 0) return null
//     const authorCounts = _.countBy(blogs, blog => blog.author)
//     return _.reduce(authorCounts, (max, numBlogs, author) => {
//       if (numBlogs > max.blogs) {
//         max.blogs = numBlogs
//         max.author = author
//       }    
//       return max
//     }, {'blogs': 0, 'author': ''})
//   }


// Given a list of blogs, return the author whos blog posts have the most total
// likes.
// const mostLikes = blogs => {
//     if (blogs.length === 0) return null
//     const authorGroups = _.groupBy(blogs, blog => blog.author)
//     const authors = Object.keys(authorGroups)
//     for (const author of authors) {
//       authorGroups[author] = totalLikes(authorGroups[author])
//     }
//     return _.reduce(authorGroups, (max, numLikes, author) => {
//       if (numLikes > max.likes) {
//         max.likes = numLikes
//         max.author = author
//       }    
//       return max
//     }, {'likes': 0, 'author': ''})
//   }

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs }