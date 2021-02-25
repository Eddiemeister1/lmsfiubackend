const sql = require("./db");

// constructor
const StudentPdfProgress = function(stuPdfProg) {
    this.student_id = stuPdfProg.student_id;
    this.pdf_id = stuPdfProg.pdf_id;
    this.progressStatus = stuPdfProg.progressStatus;
};

StudentPdfProgress.create = (newProgress, result) => {
    return new Promise((resolve, reject) => {
        //sql.query("INSERT INTO testvideos(student_id, video_id, progressStatus, take, leftOffMoment) VALUES(?, ?, ?, ?, ?)", [newProgress.student_id, newProgress.video_id, newProgress.progressStatus, newProgress.take, newProgress.leftOffMoment], (err, res) => {
        sql.query("INSERT INTO studentpdfprogress SET ? ", newProgress, (err, res) => {    
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res[0]);
        });
    });
};

StudentPdfProgress.getAllPdfs = (student_id, stuPdfProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentpdfprogress WHERE student_id = ?", [student_id], (err, res) => {
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
/*
StudentPdfProgress.getProgress = (student_id, pdf_id, stuPdfProg , result) => {
    console.log("Getting Progress...");
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentpdfprogress WHERE student_id = ? AND pdf_id = ?", [student_id, pdf_id], (err, res) => {
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

StudentPdfProgress.setProgress = (pdf_id, progressStatus, stuPdfProg , result) => {
    console.log("Setting Progress...");
    return new Promise((resolve, reject) => {
        sql.query("UPDATE studentpdfprogress SET progressStatus= ? WHERE pdf_id= ?", [progressStatus, pdf_id], (err, res) => {
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

StudentPdfProgress.setStudentProgress = (student_id, pdf_id, progressStatus, stuPdfProg , result) => {
    console.log("Setting Progress for a Student...");
    return new Promise((resolve, reject) => {
        sql.query("UPDATE studentpdfprogress SET progressStatus= ? WHERE (student_id= ? AND pdf_id= ?)", [progressStatus, student_id, pdf_id], (err, res) => {
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

StudentPdfProgress.delete = (pdf_id, stuPdfProg, result) => {
    console.log("Deleting Progress...");
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM studentpdfprogress WHERE (pdf_id= ?) ", [pdf_id], (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            console.log(res);
            console.log(`deleted ${res.affectedRows} stuPdfProg`);            
            result(null, res);
            return resolve(res);
        });
    });
};
*/
module.exports = StudentPdfProgress;