const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const path = require('path')
const productRouter = require('./app/product/routes')
const productRouterV2 = require('./app/product_v2/router')

const cors = require('cors')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', productRouter)
app.use('/api/v2', productRouterV2)

app.use((req, res, next) => {
  res.status(404)
  res.send({
    status: 404,
    message: `Resource ${req.originalUrl} not found`,
  })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
