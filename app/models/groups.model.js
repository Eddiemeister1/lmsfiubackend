const sql = require("./db");

const Groups = function(groups) {
    this.student_id = groups.student_id;
    this.course_id = groups.course_id;
    this.groupNumber = groups.groupNumber;
};

Groups.create = (newGroup, result) => {
    return new Promise((resolve, reject) => {
        //Inserting a new group
        sql.query("INSERT INTO groups SET ? ", newGroup, (err, res) => {    
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res[0]);
        });
    });
};

Student.getAll = result => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT id, student_id, course_id, groupNumber FROM groups", (err, res) => {
            if (err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
}

Groups.findByCourseId = (course_id, result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM groups WHERE course_id = ?", [course_id], (err, res) => {
            if (err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
}

module.exports = Groups;