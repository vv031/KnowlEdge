const db = require('../db');

// create a new course
const createCourse = (req, res) => {
    const { name, description, price, discount } = req.body;
    const query = 'INSERT INTO courses (name, description, price, discount) VALUES (?, ?, ?, ?)';

    db.execute(query, [name, description, price, discount || '0.00'], (err, result) => {
        if (err) {
            console.error('Error adding course:', err);
            res.status(500).send({ message: 'Error adding course' });
        } else {
            res.status(200).send({ message: 'Course added successfully' });
        }
    });
};

// get all courses
const getAllCourses = (req, res) => {
    const query = 'SELECT * FROM courses';

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error retrieving courses:', err);
            res.status(500).send({ message: 'Error retrieving courses' });
        } else {
            res.status(200).send(results);
        }
    });
};

// get course details
const getCourseDetails = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM courses WHERE id = ?';

    db.execute(query, [id], (err, result) => {
        if (err) {
            console.error('Error retrieving course details:', err);
            res.status(500).send({ message: 'Error retrieving course details' });
        } else if (result.length == 0) {
            res.status(404).send({ message: 'Course not found' });
        } else {
            res.status(200).send(result[0]);
        }

    });
};

// update a course
const updateCourse = (req, res) => {
    const { id } = req.params;
    const { name, description, price, discount } = req.body;

    const checkQuery = 'SELECT * FROM courses WHERE id = ?';
    db.execute(checkQuery, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error retrieving course:', checkErr);
            return res.status(500).send({ message: 'Error retrieving course' });
        }

        if (checkResult.length === 0) {
            return res.status(404).send({ message: 'Course not found' });
        }

        const updateQuery = 'UPDATE courses SET name = ?, description = ?, price = ?, discount = ? WHERE id = ?';
        db.execute(updateQuery, [name, description, price, discount || '0.00', id], (updateErr, updateResult) => {
            if (updateErr) {
                // console.error('Error updating course:', updateErr);
                return res.status(500).send({ message: 'Error updating course' });
            }

            res.status(200).send({ message: 'Course updated successfully' });
        });
    });
};

// delete a course
const deleteCourse = (req, res) => {
    const { id } = req.params;

    const checkQuery = 'SELECT * FROM courses WHERE id = ?';
    db.execute(checkQuery, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error retrieving course:', checkErr);
            return res.status(500).send({ message: 'Error retrieving course' });
        }

        if (checkResult.length === 0) {
            return res.status(404).send({ message: 'Course not found' });
        }

        const deleteQuery = 'DELETE FROM courses WHERE id = ?';
        db.execute(deleteQuery, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error('Error deleting course:', deleteErr);
                return res.status(500).send({ message: 'Error deleting course' });
            }

            res.status(200).send({ message: 'Course deleted successfully' });
        });
    });
};

module.exports = { createCourse, getAllCourses, getCourseDetails, updateCourse, deleteCourse };
