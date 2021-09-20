const {v4} = require('uuid')
const {pool} = require('../database/conection')

const getUsers = async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.status(200).json(users.rows);
}

const createUsers = async(req, res) => {
    const {name, last_name, document} = req.body;
    const id = v4();
    await pool.query('INSERT INTO users(id, name, last_name, document) VALUES ($1, $2, $3, $4)', [id, name, last_name, document])
    res.json({
        message: 'users added succesfully',
        body:{
            product: {
                id,
                name,
                last_name, 
                document
            }
        }
    })
}

const addRole = async(req, res) => {
    const {id} = req.params;
    const {roles_id} = req.body;

    const user = pool.query('UPDATE users SET roles_id = $1 WHERE id = $2', [roles_id, id])
    
    res.json({
        message: 'users updated succesfully'
    })
}

const deletedUser = async(req, res) => {
    const {id} = req.params;
    
    const user = await pool.query('DELETE FROM users WHERE id = $1', [id]);

    res.json({
        message: 'users deleted succesfully'
    });
}

module.exports = {
    getUsers,
    createUsers,
    addRole,
    deletedUser
}