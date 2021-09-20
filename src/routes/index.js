const {Router} = require('express');
const router = Router();

const ADMINID = "4fdf8dbd-fadd-4ef7-a142-d14daf50b6ce";
const CLIENTID = "17c90ae4-2a0e-47b5-94ec-9d0bfd9ab772";

const authAdmin = (req,res,next ) => {
    let auth = req.headers.auth
    if(auth === ADMINID){
        next();
    }
    else{
        res.status(200).json({
            message : 'Error 401'
        });
    }
}

const {getProducts, createProducts} = require('../controllers/productosController')
const {getRoles, createRoles} = require('../controllers/rolesController')
const {getUsers, createUsers, addRole, deletedUser} = require('../controllers/usersController')
const {getSales, getSalesToDate, getSalesToMonth,createSales, updateSale, deletedSale} = require('../controllers/salesController')

//products
router.get('/products', getProducts);
router.post('/products', [authAdmin, createProducts]);
//roles
router.get('/roles', getRoles);
router.post('/roles', [authAdmin, createRoles]);
//users
router.get('/users', [authAdmin, getUsers]);
router.post('/users', [authAdmin, createUsers]);
router.put('/users/:id/add-role', [authAdmin, addRole]);
router.delete('/users/:id/delete', [authAdmin, deletedUser]);
//sales
router.get('/sales', getSales);
router.get('/getSalesToDate/:date', [authAdmin, getSalesToDate]);
router.get('/getSalesToMonth/:date', [authAdmin, getSalesToMonth]);
router.post('/sales', createSales);
router.put('/sales/:id/update', [ authAdmin , updateSale]);
router.delete('/sales/:id/delete',[authAdmin, deletedSale]);

module.exports = router;