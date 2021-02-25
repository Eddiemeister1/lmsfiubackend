const StudentSurveyProgress = require("../models/student-survey-progress.model");
const { result } = require("lodash");

exports.test = (req, res) => {
    // Validate request
    console.log("hello");
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
}

/////////// Retrieve all surveys progress
exports.findAll = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuSurveyProgress = new StudentSurveyProgress({
        student_id: req.body.student_id,
        survey_id: req.body.survey_id,
        progressStatus: req.body.progressStatus,
        score: req.body.score,
    });
    
    StudentSurveyProgress.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving All from Table --- studentsurveyprogress."
            });
        else res.send(data);
    }).then(() => {
        // console.log(`Course UpdateSeatsByID(${req.params.courseId}) Promise resolved`);
    }).catch((err) => {
         //console.log(`Course UpdateSeatsById(${req.params.courseId}) Promise Rejected \n${err}`);
    });
};

/////////// Retrieve all surveys progress for one student
exports.getAllStudentSurvey = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuSurveyProgress = new StudentSurveyProgress({
        student_id: req.body.student_id,
        survey_id: req.body.survey_id,
        progressStatus: req.body.progressStatus,
        score: req.body.score,
    });
    console.log(req.params.student_id);

    StudentSurveyProgress.getAllSurveys(req.params.studentId, stuSurveyProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the survey progress."
            });
        } else if (data.length <= 0) { 
            res.send({ message: "Not found!"});
        } else { 
            res.send(data);
        }
    }).then(() => {
        //console.log(data)
    }).catch((err) => {
        console.log(`Error getting the video progress\n${err}`);
    });
}


/////////// Update a surveys progress
exports.setSurveyProgressStatus = (req, res) => {

        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
        }
        const stuSurveyProgress = new StudentSurveyProgress({
            student_id: req.body.student_id,
            survey_id: req.body.survey_id,
            progressStatus: req.body.progressStatus,
            score: req.body.score,
        });
    
        StudentSurveyProgress.setProgresss(req.params.studentId, req.params.surveyId, req.params.status, req.params.score ,stuSurveyProgress, (err, data) => {
            if(err) {
                if(err.kind == "not_found") {
                    res.status(404).send({
                        message: `Not found survey progress with id ${req.params.surveyId}.`
                    });
                } else {
                    res.status(500).send({
                        message: err.message || "Error updating progress with id " + req.params.surveyId
                    });
                }
            } else {
                res.send(data);
            }
        }).then(() => {
           console.log(`Survey Progress Update Promise resolved`);
        }).catch((err) => {
           console.log(`Survey Progress Update Promise Rejected \n${err}`);
        });

}

/////////// Create a surveys progress
exports.addProgressTracking = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuSurveyProgress = new StudentSurveyProgress({
        student_id: req.body.student_id,
        survey_id: req.body.survey_id,
        progressStatus: req.body.progressStatus,
        score: req.body.score,
    });

    StudentSurveyProgress.create(stuSurveyProgress, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the progress tracking."
            });
        else res.send(data);
    }).then(() => {
        console.log('Created Survey Progress successfully!');
    }).catch((err) => {
        console.log(`Error creating the Survey Progress\n${err}`);
    });
};

/////////// Show a surveys progress by student_id and survey_id ---> return True or False
exports.getStudentSurveyProgressBoolean = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuSurveyProgress = new StudentSurveyProgress({
        student_id: req.body.student_id,
        survey_id: req.body.survey_id,
        progressStatus: req.body.progressStatus,
        score: req.body.score,
    });

    console.log(req.params.student_id);
    console.log(req.params.survey_id);
    StudentSurveyProgress.getProgresssBoolean(req.params.studentId,req.params.surveyId, stuSurveyProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the survey progress."
            });
        } else if (data.length <= 0) { 
           // res.send({ message: "Not found!...."});
            res.send(false);
        } else { 
           // res.send(data[0]);
           console.log(data[0].progressStatus);
           if (data[0].progressStatus == "complete") {
            res.send(true);
           } else {
            res.send(false);
           }
            
        }
    }).then(() => {
        console.log(`Getting Survey Progress successfully!`)
    }).catch((err) => {
        console.log(`Error getting the Survey Progress\n${err}`);
    });


};

/////////// Show a surveys progress by student_id and survey_id ---> return data
exports.getStudentSurveyProgress = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuSurveyProgress = new StudentSurveyProgress({
        student_id: req.body.student_id,
        survey_id: req.body.survey_id,
        progressStatus: req.body.progressStatus,
        score: req.body.score,
    });

    console.log(req.params.student_id);
    console.log(req.params.survey_id);
    StudentSurveyProgress.getProgresss(req.params.studentId,req.params.surveyId, stuSurveyProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the survey progress."
            });
        } else if (data.length <= 0) { 
            res.send({ message: "Not found!...."});
           // res.send(false);
        } else { 
            res.send(data[0]);
           // res.send(true);
        }
    }).then(() => {
        console.log(`Getting Survey Progress successfully!`)
    }).catch((err) => {
        console.log(`Error getting the Survey Progress\n${err}`);
    });


};

/////////// Delete all surveys progress from the Table
exports.deleteAll = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!..."
        });
    }
    const stuSurveyProgress = new StudentSurveyProgress({
        student_id: req.body.student_id,
        survey_id: req.body.survey_id,
        progressStatus: req.body.progressStatus,
        score: req.body.score,
    });
    StudentSurveyProgress.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Survey Progress."
            });
        else
            res.send({ message: "All Survey Progress deleted successfully from the Table!" });
    });
};


