const sql = require("./db");
const { result } = require("lodash");

const Message = function(message) {
    this.sender_id = message.sender_id;
    this.receiver_id = message.receiver_id;
    this.content = message.content;
    this.created = message.created;
    this.changed = message.changed;
    this.course_id = message.course_id;
    this.parent_id = message.parent_id;
}

Message.create = (newMessage, result) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, {id: res.insertId, ...newMessage });
            return resolve(res);
        });
    });
};

Message.findAdminsByCourseId = (courseId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentsincourses WHERE role='admin' AND course_id = ? ORDER BY l_name, f_name, student_id", [courseId], (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
};

Message.findInstructorsByCourseId = (courseId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentsincourses WHERE role='instructor' AND course_id = ? ORDER BY l_name, f_name, student_id", [courseId], (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
};

Message.findStudentsByCourseId = (courseId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentsincourses WHERE role = 'student' AND course_id = ? ORDER BY l_name, f_name, student_id", [courseId], (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
};

Message.findRepliesByParentId = (parentId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM inbox WHERE parent_id = ? ORDER BY created", [parentId], (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
};

Message.findRepliesByCourseId = (courseId, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM inbox WHERE course_id = ? AND parent_id IS NOT NULL ORDER BY created", [courseId], (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
};

Message.updateChangedDateByMessageId = (id, newMessage, result) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE messages SET changed = ? WHERE id = ?",
            [newMessage.changed, id], (err, res) => {
                if(err) {
                    result(err, null);
                    return reject(err);
                }
                result(null, { id: id, ...newMessage});
                return resolve(res[0]);
            });
    });
};

module.exports = Message;