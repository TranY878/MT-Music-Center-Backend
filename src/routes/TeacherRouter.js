const express = require("express");
const router = express.Router()
const TeacherController = require('../controllers/TeacherController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', TeacherController.createTeacher)
router.put('/update/:id', authMiddleWare, TeacherController.updateTeacher)
router.get('/get-details/:id', TeacherController.getDetailsTeacher)
router.delete('/delete/:id', authMiddleWare, TeacherController.deleteTeacher)
router.get('/get-all', TeacherController.getAllTeacher)
router.post('/delete-many', authMiddleWare, TeacherController.deleteMany)
router.get('/get-all-musical-instrument', TeacherController.getAllMusicalInstrument)

module.exports = router