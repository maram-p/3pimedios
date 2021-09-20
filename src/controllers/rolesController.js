const {v4} = require('uuid')
const {pool} = require('../database/conection')

const getRoles = async (req, res) => {
    const roles = await pool.query('SELECT * FROM roles');
    res.status(200).json(roles.rows);
}

const createRoles = async(req, res) => {
    const {name} = req.body;

    const id = v4();
    await pool.query('INSERT INTO roles(id, name) VALUES ($1, $2)', [id, name]);
    res.json({
        message: 'role added succesfully',
        body:{
            product: {
                id,
                name
            }
        }
    })
}

module.exports = {
    getRoles,
    createRoles
}