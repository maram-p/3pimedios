const {Router} = require('express');
const router = Router();

const {getProducts, createProducts} = require('../controllers/productosController')
const {getRoles, createRoles} = require('../controllers/rolesController')

//products
router.get('/products', getProducts);
router.post('/products', createProducts);
//roles
router.get('/roles', getRoles);
router.post('/roles', createRoles);



module.exports = router;