const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => {
    const likes = posts.map(post => post.likes)

    const reducer = (sum, item) => sum + item
      

    return likes.length === 0 ? 0 : likes.reduce(reducer, 0)
}

module.exports = { dummy, totalLikes }