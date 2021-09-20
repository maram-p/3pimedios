const {v4} = require('uuid')
const {pool} = require('../database/conection')

const getSales = async (req, res) => {
    const sales = await pool.query('SELECT * FROM sales');
    res.status(200).json(sales.rows);
}

const createSales = async(req, res) => {
    const today = new Date();

    const {products_id, users_id, qty} = req.body;
    const id = v4();

    await pool.query('INSERT INTO sales(id, products_id, users_id, qty, sale_at) VALUES ($1, $2, $3, $4, $5)', [id, products_id, users_id, qty, today])
    res.json({
        message: 'sales added succesfully',
        body:{
            sales: {
                id,
                products_id,
                users_id, 
                qty,
                today
            }
        }
    })
}

const updateSale = async(req, res) => {
    const {id} = req.params;
    const {products_id, qty} = req.body;

    pool.query('UPDATE sales SET products_id = $1, qty = $2  WHERE id = $3', [products_id, qty, id])
    
    res.json({
        message: 'sales updated succesfully'
    })
}

const deletedSale = async(req, res) => {
    const {id} = req.params;
    
    const user = await pool.query('DELETE FROM sales WHERE id = $1', [id]);

    res.json({
        message: 'sale deleted succesfully'
    });
}

module.exports = {
    getSales,
    createSales,
    updateSale,
    deletedSale
}