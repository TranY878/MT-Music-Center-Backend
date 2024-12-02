const Course = require("../models/CourseModel")

const createCourse = (newCourse) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, subject, price, description, type, level } = newCourse
        try {
            const checkCourse = await Course.findOne({
                name: name
            })
            if (checkCourse !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Khóa học đã tồn tại!'
                })
            }
            const newCourse = await Course.create({
                name,
                image,
                subject,
                price,
                description,
                type,
                level
            })
            if (newCourse) {
                resolve({
                    status: 'OK',
                    message: 'Tạo khóa học thành công!',
                    data: newCourse
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateCourse = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCourse = await Course.findOne({
                _id: id
            })
            if (checkCourse === null) {
                resolve({
                    status: 'ERR',
                    message: 'Khóa học không tồn tại!'
                })
            }

            const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Cập nhật khóa học thành công!',
                data: updatedCourse
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.findOne({
                _id: id
            })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'Khóa học không tồn tại!'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy thông tin khóa học thành công!',
                data: course
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCourse = await Course.findOne({
                _id: id
            })
            if (checkCourse === null) {
                resolve({
                    status: 'ERR',
                    message: 'Khóa học không tồn tại!'
                })
            }

            await Course.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Xóa khóa học thành công!',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyCourse = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Course.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa khóa học thành công!',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCourse = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalCourse = await Course.countDocuments()
            if (filter) {
                const label = filter[0];
                const allobjectFilter = await Course.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Thành công!',
                    data: allobjectFilter,
                    total: totalCourse,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCourse / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allCourseSort = await Course.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Thành công!',
                    data: allCourseSort,
                    total: totalCourse,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCourse / limit)
                })
            }
            const allCourse = await Course.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'Lấy tất cả khóa học thành công!',
                data: allCourse,
                total: totalCourse,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalCourse / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCourseLevel = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCourseLevel = await Course.distinct('level')
            resolve({
                status: 'OK',
                message: 'Lấy tất cả cấp độ học thành công!',
                data: allCourseLevel,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCourseType = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCourseType = await Course.distinct('type')
            resolve({
                status: 'OK',
                message: 'Lấy tất cả hình thức học thành công!',
                data: allCourseType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCourseSubject = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCourseSubject = await Course.distinct('subject')
            resolve({
                status: 'OK',
                message: 'Lấy tất cả hình thức học thành công!',
                data: allCourseSubject,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createCourse,
    updateCourse,
    getDetailsCourse,
    deleteCourse,
    getAllCourse,
    deleteManyCourse,
    getAllCourseLevel,
    getAllCourseType,
    getAllCourseSubject
}