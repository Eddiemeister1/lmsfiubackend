const sql = require("./db");

// constructor
const StudentModuleProgress = function(stuModProg) {
    this.student_id = stuModProg.student_id;
    this.course_id = stuModProg.course_id;
    this.module_id = stuModProg.module_id;
    this.progressStatus = stuModProg.progressStatus;
    this.module_number = stuModProg.module_number;
};

StudentModuleProgress.create = (newProgress, result) => {
    return new Promise((resolve, reject) => {
        //sql.query("INSERT INTO testvideos(student_id, module_id, progressStatus, take, leftOffMoment) VALUES(?, ?, ?, ?, ?)", [newProgress.student_id, newProgress.module_id, newProgress.progressStatus, newProgress.take, newProgress.leftOffMoment], (err, res) => {
        sql.query("INSERT INTO studentModuleProgress SET ? ", newProgress, (err, res) => {    
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res[0]);
        });
    });
};

StudentModuleProgress.getProgress = (student_id, course_id, module_id, stuModProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentModuleProgress WHERE student_id = ? AND module_id = ?", [student_id ,module_id], (err, res) => {
            if(err) {
                console.log(err);
                result(err, null);
                return reject(err);
            }
            console.log(res);
            result(null, res);
            return resolve(res);
        });
    });
};

StudentModuleProgress.setProgress = (student_id, course_id, module_id, progressStatus, stuModProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE studentModuleProgress SET progressStatus= ?  WHERE (student_id= ? AND module_id = ?)", [progressStatus, student_id, module_id], (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            console.log(res);
            result(null, res);
            return resolve(res);
        });
    });
};

// GET from DB all modules progress by Course ID
StudentModuleProgress.getAllModules = (student_id, course_id, stuModProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentModuleProgress WHERE student_id = ? AND course_id = ?", [student_id, course_id], (err, res) => {
            if(err) {
                console.log(err);
                result(err, null);
                return reject(err);
            }
            console.log(res);
            result(null, res);
            return resolve(res);
        });
    });
};





module.exports = StudentModuleProgress;