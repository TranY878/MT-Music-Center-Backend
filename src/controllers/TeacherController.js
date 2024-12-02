const TeacherService = require('../services/TeacherService')

const createTeacher = async (req, res) => {
    try {
        const { name, image, musicalInstrument, experience, address, phone, facebook, intro } = req.body

        if (!name || !image || !musicalInstrument || !experience || !intro) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Thiếu thông tin!'
            })
        }
        const response = await TeacherService.createTeacher(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id
        const data = req.body
        if (!teacherId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID sản phẩm!'
            })
        }
        const response = await TeacherService.updateTeacher(teacherId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id
        if (!teacherId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID sản phẩm!'
            })
        }
        const response = await TeacherService.getDetailsTeacher(teacherId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id
        if (!teacherId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID!'
            })
        }
        const response = await TeacherService.deleteTeacher(teacherId)
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
        const response = await TeacherService.deleteManyTeacher(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllTeacher = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await TeacherService.getAllTeacher(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllMusicalInstrument = async (req, res) => {
    try {
        const response = await TeacherService.getAllMusicalInstrument()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createTeacher,
    updateTeacher,
    getDetailsTeacher,
    deleteTeacher,
    getAllTeacher,
    deleteMany,
    getAllMusicalInstrument
}