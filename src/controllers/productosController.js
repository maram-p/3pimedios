// import { v4 as uuidv4 } from 'uuid';
const {v4} = require('uuid')
const {pool} = require('../database/conection')

const getProducts = async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.status(200).json(products.rows);
}

const createProducts = async(req, res) => {
    const {name, description, price} = req.body;

    const id = v4();
    await pool.query('INSERT INTO products(id, name, description, price) VALUES ($1, $2, $3, $4)', [id, name, description, price])
    res.json({
        message: 'product added succesfully',
        body:{
            product: {
                id,
                name,
                description,
                price
            }
        }
    })
}

module.exports = {
    getProducts,
    createProducts
}