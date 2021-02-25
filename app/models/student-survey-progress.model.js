const sql = require("./db");

/////// constructor
const StudentSurveyProgress = function(stuSurveyProg) {
    this.student_id = stuSurveyProg.student_id;
    this.survey_id = stuSurveyProg.survey_id;
    this.progressStatus = stuSurveyProg.progressStatus;
    this.score = stuSurveyProg.score;
};

/////// Show All Survey Progress
StudentSurveyProgress.getAll = result => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentSurveyProgress", (err, res) => {
            if (err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        });
    });
}
/////// Show All Survey Progress for one student
StudentSurveyProgress.getAllSurveys = (student_id, stuSurveyProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentSurveyProgress WHERE student_id = ?", [student_id], (err, res) => {
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

/////// Create a Survey Progress
StudentSurveyProgress.create = (newProgress, result) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO studentSurveyProgress  SET ? ", newProgress, (err, res) => {    
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res[0]);
        });
    });
};

/////// Show a Surveys Progress by student_id and survey_id  ---- Boolean
StudentSurveyProgress.getProgresssBoolean = (student_id, survey_id, stuSurveyProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentSurveyProgress  WHERE student_id = ? AND survey_id = ?", [student_id, survey_id], (err, res) => {
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

/////// Show a Surveys Progress by student_id and survey_id --- data
StudentSurveyProgress.getProgresss = (student_id, survey_id, stuSurveyProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM studentSurveyProgress  WHERE student_id = ? AND survey_id = ?", [student_id, survey_id], (err, res) => {
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

/////// Update a Survey Progress
StudentSurveyProgress.setProgresss = (student_id, survey_id, progressStatus, score, stuSurveyProg , result) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE studentSurveyProgress  SET progressStatus= ? , score= ? WHERE (student_id= ? AND survey_id= ?)", [progressStatus, score, student_id, survey_id], (err, res) => {
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

/////// Delete All Surveys
StudentSurveyProgress.deleteAll = result => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM studentSurveyProgress", (err, res) => {
            if (err) {
                result(err, null);
                return reject(err);
            }
            console.log(`deleted ${res.affectedRows} stuSurveyProg`);
            result(null, res);
            return resolve(res);
        });
    });
};

module.exports = StudentSurveyProgress;