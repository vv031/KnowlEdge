const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const isAdmin = require('../middleware/adminMiddleware.js');

router.post('/', isAdmin, courseController.createCourse);
router.put('/:id', isAdmin, courseController.updateCourse);
router.delete('/:id', isAdmin, courseController.deleteCourse);
router.get('/', courseController.getAllCourses); // no admin required here
router.get('/:id', courseController.getCourseDetails); // no admin required here

module.exports = router;
