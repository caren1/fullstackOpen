// const http = require('http')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')


const app = require('./app') // <- actual Express application
const http = require('http')
const config = require('./utils/config')
// const logger = require('./utils/logger')
// const server = http.createServer(app);

// server.listen(config.PORT, () => {
//     logger.info(`Server running on port ${config.PORT}`)
// })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log('Error occurred, when connecting to DB:', error.message);
})

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})