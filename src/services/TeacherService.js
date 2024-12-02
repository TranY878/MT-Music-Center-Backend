const Teacher = require("../models/TeacherModel")

const createTeacher = (newTeacher) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, musicalInstrument, experience, address, phone, facebook, intro } = newTeacher
        try {
            const checkTeacher = await Teacher.findOne({
                name: name
            })
            if (checkTeacher !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Giáo viên đã tồn tại!'
                })
            }
            const newTeacher = await Teacher.create({
                name,
                image,
                musicalInstrument,
                experience,
                address,
                phone,
                facebook,
                intro,
            })
            if (newTeacher) {
                resolve({
                    status: 'OK',
                    message: 'Tạo giáo viên thành công!',
                    data: newTeacher
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateTeacher = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTeacher = await Teacher.findOne({
                _id: id
            })
            if (checkTeacher === null) {
                resolve({
                    status: 'ERR',
                    message: 'Giáo viên không tồn tại!'
                })
            }

            const updatedTeacher = await Teacher.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Cập nhật giáo viên thành công!',
                data: updatedTeacher
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsTeacher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const teacher = await Teacher.findOne({
                _id: id
            })
            if (teacher === null) {
                resolve({
                    status: 'ERR',
                    message: 'Giáo viên không tồn tại!'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy thông tin giáo viên thành công!',
                data: teacher
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteTeacher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTeacher = await Teacher.findOne({
                _id: id
            })
            if (checkTeacher === null) {
                resolve({
                    status: 'ERR',
                    message: 'Giáo viên không tồn tại!'
                })
            }

            await Teacher.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Xóa giáo viên thành công!',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyTeacher = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Teacher.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa giáo viên thành công!',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllTeacher = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalTeacher = await Teacher.countDocuments()
            if (filter) {
                const label = filter[0];
                const allobjectFilter = await Teacher.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Thành công!',
                    data: allobjectFilter,
                    total: totalTeacher,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalTeacher / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allTeacherSort = await Teacher.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Thành công!',
                    data: allTeacherSort,
                    total: totalTeacher,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalTeacher / limit)
                })
            }
            const allTeacher = await Teacher.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'Lấy tất cả giáo viên thành công!',
                data: allTeacher,
                total: totalTeacher,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalTeacher / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllMusicalInstrument = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allMusicalInstrument = await Teacher.distinct('musicalInstrument')
            resolve({
                status: 'OK',
                message: 'Lấy tất cả nhạc cụ thành công!',
                data: allMusicalInstrument,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createTeacher,
    updateTeacher,
    getDetailsTeacher,
    deleteTeacher,
    getAllTeacher,
    deleteManyTeacher,
    getAllMusicalInstrument
}