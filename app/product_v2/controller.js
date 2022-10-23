const Product = require('./model')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { Op } = require('sequelize')

const index = async (req, res) => {
  try {
    const { search } = req.query
    if (search) {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.substring]: `${search}`,
          },
        },
      })
      res.send(products)
    } else {
      const products = await Product.findAll()
      res.send(products)
    }
  } catch (error) {
    res.send(error)
  }
}

const view = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        id: req.params.id,
      },
    })
    res.send(products)
  } catch (error) {
    res.send(error)
  }
}

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body
  const image = req.file
  try {
    if (image) {
      const target = path.join(__dirname, '../../uploads', image.originalname)
      fs.renameSync(image.path, target)
      await Product.sync()
      const product = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:8000/public/${image.originalname}`,
      })
      res.send(product)
    }
  } catch (error) {
    res.send(error)
  }
}

const update = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body
  const image = req.file
  try {
    if (image) {
      const product = await Product.update(
        {
          users_id,
          name,
          price,
          stock,
          status,
          image_url: `http://localhost:8000/public/${image.originalname}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      res.send({
        status: 'ok',
        message: 'Update data berhasil.',
      })
    } else {
      const product = await Product.update(
        {
          users_id,
          name,
          price,
          stock,
          status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      res.send({
        status: 'ok',
        message: 'Update data berhasil.',
      })
    }
  } catch (error) {
    res.send(error)
  }
}

const destroy = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.send({
      status: 'ok',
      message: 'Hapus data berhasil.',
    })
  } catch (error) {
    res.send(error)
  }
}

module.exports = { store, index, view, update, destroy }
