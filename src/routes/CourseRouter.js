const express = require("express");
const router = express.Router()
const CourseController = require('../controllers/CourseController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', CourseController.createCourse)
router.put('/update/:id', authMiddleWare, CourseController.updateCourse)
router.get('/get-details/:id', CourseController.getDetailsCourse)
router.delete('/delete/:id', authMiddleWare, CourseController.deleteCourse)
router.get('/get-all', CourseController.getAllCourse)
router.post('/delete-many', authMiddleWare, CourseController.deleteMany)
router.get('/get-all-level', CourseController.getAllCourseLevel)
router.get('/get-all-type', CourseController.getAllCourseType)
router.get('/get-all-subject', CourseController.getAllCourseSubject)

module.exports = router