const {Router} = require('express');
const router = Router();

const {getProducts, createProducts} = require('../controllers/productosController')

router.get('/products', getProducts);
router.post('/products', createProducts);



module.exports = router;