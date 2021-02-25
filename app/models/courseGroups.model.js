const sql = require("./db");

// constructor
const CourseGroups = function(courseGroups) {
    this.student_id = courseGroups.student_id;
    this.course_id = courseGroups.course_id;
    this.groupNumber = courseGroups.groupNumber;
};
// create group
CourseGroups.create = (newCourseGroup, result) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO groups SET ?", newCourseGroup, (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, { id: res.insertId, ...newCourseGroup });
            return resolve(res[0]);
        });
    });
};
// find all groups in one course
CourseGroups.findGroupByCourseId = (courseId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM groups WHERE course_id = ?", [courseId], (err, res) => {
            if (err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
}
// find all students in a group
CourseGroups.findGroup = (courseId, gNumber, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM groups WHERE course_id = ? AND groupNumber = ?", [courseId,gNumber], (err, res) => {
            if (err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
}
// find a student group in a course 
CourseGroups.findStudentGroup = (studentId,courseId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM groups WHERE student_id = ? AND course_id = ? ", [studentId, courseId], (err, res) => {
            if (err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
}

CourseGroups.delete = (courseId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM groups WHERE course_id = ?", courseId, (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res[0]);
        });
    });
};

CourseGroups.deleteAll = result => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM groups", (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            console.log(`deleted ${res.affectedRows} groups`);
            result(null, res);
            return resolve(res);
        });
    });
};



CourseGroups.getAll = (req, result) => {
    return new Promise((resolve, reject) => {
        sql.getConnection((err, connection) => {
            if(err){
                console.error('error getting connection:' + err.stack);
                return;
            }
            let numRows;
            let queryPagination;
            let numPerPage = parseInt(req.query.npp, 10) || 1;
            let page = parseInt(req.query.page, 10) || 0;
            let numPages;
            let skip = page * numPerPage;
            let limit = skip + ', ' + numPerPage;
            connection.beginTransaction((err) => {
                if(err) { throw err; }

                connection.query("SELECT count(*) as numRows FROM groups", (err, res) => {
                    if(err){
                        connection.rollback(() => {
                            throw err;
                        });
                    }

                    numRows = res[0].numRows;
                    numPages = Math.ceil(numRows / numPerPage);
                    console.log('number of pages: ', numPages);
                
                    connection.query("SELECT * FROM groups ORDER BY course_id ASC LIMIT ? , ?", [skip, numPerPage], (err, res) => {
                        if(err) {
                            connection.rollback(() => {
                                throw err;
                            });
                            result(err, null);
                            reject(err);
                        }
                        let responsePayload = {
                            res: res
                        };
                        if (page < numPages){
                            responsePayload.pagination = {
                                current: page,
                                perPage: numPerPage,
                                maxPages: numPages,
                                previous: page > 0 ? page - 1 : undefined,
                                next: page < numPages - 1 ? page + 1 : undefined
                            }
                        }
                        else responsePayload.pagination = {
                            err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                        }
                        result(null, responsePayload);
                        resolve(responsePayload);
                            connection.commit((err) => {
                                if(err){
                                    connection.rollback(() => {
                                        throw err;
                                    });
                                }
                                console.log("transaction complete");
                                connection.release();
                            })
                    });
                });

            });
        });
    });
};




module.exports = CourseGroups;