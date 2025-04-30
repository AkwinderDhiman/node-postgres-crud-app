
const db = require('../config/db');

exports.getUsers = (req, res) => {
    db.query(
        'SELECT * from users',
        (err, result) => {
            if (err) {
                console.error('Error retrieving users:', err.stack);
                return res.status(500).send('Error retrieving users');
              }
          
              res.status(200).json(result.rows); 
        }
    );
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    db.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email],
        (err, result) => {
            if (err) {
                console.error('Error retrieving users:', err.stack);
                return res.status(500).send('Error retrieving users');
              }
          
              res.status(200).json(result.rows); 
        }
    );
};

exports.getUserById = (req, res) => {
    const {id} = req.params
    db.query(
        'SELECT * from users WHERE id = $1',
        [id], (err, result) => {
            if (err) {
                console.error('Error retrieving user:', err.stack);
                return res.status(500).send('Error retrieving user');
              }
              if (result.rows.length === 0) {
                  return res.status(404).send('User not found');
              }
          
              res.status(200).json(result.rows); 
        }
    );
};

exports.updateUser = (req, res) =>{
    const { id, name, email } = req.body;
    db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [name, email, id], (err, result)  => {
            if (err) {
                console.error('Error updating user:', err.stack);
                return res.status(500).send('Error updating user');
              }
          
              if (result.rowCount === 0) {
                return res.status(404).send('User not found');
              }
          
              res.status(200).send('User updated successfully');
        }
    );
}

exports.deleteUser = (req, res) =>{
    const { id } = req.params;
    db.query(
        'DELETE FROM users WHERE id = $1',
         [id], (err, result) => {
            if (err) {
                console.error('Error deleting user:', err.stack);
                return res.status(500).send('Error deleting user');
              }
          
              if (result.rowCount === 0) {
                return res.status(404).send('User not found');
              }
          
              res.status(200).send('User deleted successfully');
        }
    );
}
