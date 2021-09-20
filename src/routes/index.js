const {Router} = require('express');
const router = Router();

const {getProducts, createProducts} = require('../controllers/productosController')
const {getRoles, createRoles} = require('../controllers/rolesController')
const {getUsers, createUsers, addRole, deletedUser} = require('../controllers/usersController')
const {getSales, createSales, updateSale, deletedSale} = require('../controllers/salesController')

//products
router.get('/products', getProducts);
router.post('/products', createProducts);
//roles
router.get('/roles', getRoles);
router.post('/roles', createRoles);
//users
router.get('/users', getUsers);
router.post('/users', createUsers);
router.put('/users/:id/add-role', addRole);
router.delete('/users/:id/delete', deletedUser);
//sales
router.get('/sales', getSales);
router.post('/sales', createSales);
router.put('/sales/:id/update', updateSale);
router.delete('/sales/:id/delete', deletedSale);

module.exports = router;