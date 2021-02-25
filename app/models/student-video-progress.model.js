const sql = require("./db");

// constructor
const StudentVideoProgress = function(stuVidProg) {
    this.student_id = stuVidProg.student_id;
    this.video_id = stuVidProg.video_id;
    this.progressStatus = stuVidProg.progressStatus;
    this.take = stuVidProg.take;
};

StudentVideoProgress.create = (newProgress, result) => {
    return new Promise((resolve, reject) => {
        //sql.query("INSERT INTO testvideos(student_id, video_id, progressStatus, take, leftOffMoment) VALUES(?, ?, ?, ?, ?)", [newProgress.student_id, newProgress.video_id, newProgress.progressStatus, newProgress.take, newProgress.leftOffMoment], (err, res) => {
        sql.query("INSERT INTO studentVideoProgress SET ? ", newProgress, (err, res) => {    
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res[0]);
        });
    });
};

StudentVideoProgress.getProgress = (student_id, video_id, stuVidProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentVideoProgress WHERE student_id = ? AND video_id = ?", [student_id, video_id], (err, res) => {
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

StudentVideoProgress.setProgress = (student_id, video_id, progressStatus, take, stuVidProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE studentVideoProgress SET progressStatus= ? , take= ? WHERE (student_id= ? AND video_id= ?)", [progressStatus, take, student_id, video_id], (err, res) => {
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


StudentVideoProgress.getAllVideos = (student_id, stuVidProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentVideoProgress WHERE student_id = ?", [student_id], (err, res) => {
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



module.exports = StudentVideoProgress;