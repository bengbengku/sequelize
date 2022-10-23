const router = require('express').Router()
const productController = require('./controller')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/product', upload.single('image'), productController.store)
router.get('/product', productController.index)
router.get('/product/:id', productController.view)
router.put('/product/:id', upload.single('image'), productController.update)
router.delete('/product/:id', upload.single('image'), productController.destroy)

module.exports = router
