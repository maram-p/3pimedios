const {v4} = require('uuid')
const {pool} = require('../database/conection')

const getSales = async (req, res) => {
    const sales = await pool.query('SELECT * FROM sales');
    res.status(200).json(sales.rows);
}

const getSalesToDate = async (req, res) => {
    const {date} = req.params;

    const dateStart = date+' 00:00:00';
    const dateFinish = date+' 23:59:59';
    
    const sales = await pool.query('SELECT products_id, qty FROM sales where sale_at BETWEEN $1 AND $2',[dateStart, dateFinish]);

    let acum = 0;
    for (const sale of sales.rows) {
        const product = await pool.query('SELECT price FROM products where id = $1',[sale.products_id]);
        acum += parseInt(product.rows[0].price * sale.qty)
    }
    console.log(acum);
    res.status(200).json({
        date,
        total: acum
    });
}

const getSalesToMonth = async (req, res) => {
    const {date} = req.params;

    const dateStart = date+'-01 00:00:00';
    const dateFinish = date+'-30 23:59:59';
    
    const sales = await pool.query('SELECT products_id, qty FROM sales where sale_at BETWEEN $1 AND $2',[dateStart, dateFinish]);

    let acum = 0;
    for (const sale of sales.rows) {
        const product = await pool.query('SELECT price FROM products where id = $1',[sale.products_id]);
        acum += parseInt(product.rows[0].price * sale.qty)
    }
    console.log(acum);
    res.status(200).json({
        date,
        total: acum
    });
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
    getSalesToDate,
    getSalesToMonth,
    createSales,
    updateSale,
    deletedSale
}