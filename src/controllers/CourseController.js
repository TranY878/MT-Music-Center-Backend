const CourseService = require('../services/CourseService')

const createCourse = async (req, res) => {
    try {
        const { name, image, subject, price, description, type, level } = req.body

        if (!name || !image || !subject || !description || !price || !type || !level) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Thiếu thông tin!'
            })
        }
        const response = await CourseService.createCourse(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id
        const data = req.body
        if (!courseId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID sản phẩm!'
            })
        }
        const response = await CourseService.updateCourse(courseId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsCourse = async (req, res) => {
    try {
        const courseId = req.params.id
        if (!courseId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID sản phẩm!'
            })
        }
        const response = await CourseService.getDetailsCourse(courseId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id
        if (!courseId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID!'
            })
        }
        const response = await CourseService.deleteCourse(courseId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại các ID!'
            })
        }
        const response = await CourseService.deleteManyCourse(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCourse = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await CourseService.getAllCourse(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCourseLevel = async (req, res) => {
    try {
        const response = await CourseService.getAllCourseLevel()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCourseType = async (req, res) => {
    try {
        const response = await CourseService.getAllCourseType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCourseSubject = async (req, res) => {
    try {
        const response = await CourseService.getAllCourseSubject()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createCourse,
    updateCourse,
    getDetailsCourse,
    deleteCourse,
    getAllCourse,
    deleteMany,
    getAllCourseLevel,
    getAllCourseType,
    getAllCourseSubject
}