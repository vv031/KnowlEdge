const db = require('../db');
const jwt = require('jsonwebtoken');

// login and send jwt token
const login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.execute(query, [email, password], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const token = jwt.sign({ id: user.id, username: user.username, admin: user.admin }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.cookie('jwt', token, { httpOnly: true, secure: true });
    res.status(200).send({ message: 'Login successful' , jwt: token, userID: user.id});
  });
};

// logout and expire jwt token
const logout = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, secure: true, expires: new Date(0) });
  res.status(200).send({ message: 'Logout successful' });
};

// create a new user
const createUser = (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.execute(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send({ message: 'Error adding user' });
    } else {
      res.status(200).send({ message: 'User added successfully' });
    }
  });
};

// get all users
const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users';

  db.execute(query, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send({ message: 'Error retrieving users' });
    } else {
      res.status(200).send(results);
    }
  });
};

// get user details
const getUserDetails = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.execute(query, [id], (err, result) => {
    if (err) {
      console.error('Error retrieving user details:', err);
      res.status(500).send({ message: 'Error retrieving user details' });
    } else if (result.length == 0) {
      res.status(404).send("User not found")
    } else {
      res.status(200).send(result);
    }
  });
};

// update a user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE id = ?';
  db.execute(checkQuery, [id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error retrieving user:', checkErr);
      return res.status(500).send({ message: 'Error retrieving user' });
    }

    if (checkResult.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const updateQuery = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    db.execute(updateQuery, [username, email, password, id], (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error updating user:', updateErr);
        return res.status(500).send({ message: 'Error updating user' });
      }

      res.status(200).send({ message: 'User updated successfully' });
    });
  });
};

// delete a user
const deleteUser = (req, res) => {
  const { id } = req.params;

  const checkQuery = 'SELECT * FROM users WHERE id = ?';
  db.execute(checkQuery, [id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error retrieving user:', checkErr);
      return res.status(500).send({ message: 'Error retrieving user' });
    }

    if (checkResult.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const deleteQuery = 'DELETE FROM users WHERE id = ?';
    db.execute(deleteQuery, [id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error('Error deleting user:', deleteErr);
        return res.status(500).send({ message: 'Error deleting user' });
      }

      res.status(200).send({ message: 'User deleted successfully' });
    });
  });
};

module.exports = { login, logout, createUser, getAllUsers, getUserDetails, updateUser, deleteUser };
