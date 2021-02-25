const StudentModuleProgress = require("../models/student-module-progress.model");

exports.test = (req, res) => {
    // Validate request
    console.log("hello");
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
}

exports.setModuleProgressStatus = (req, res) => {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
        }
        const stuModProgress = new StudentModuleProgress({
            student_id: req.body.student_id,
            course_id: req.body.course_id,
            module_id: req.body.module_id,
            progressStatus: req.body.progressStatus,
            module_number: req.body.module_number
        });
    
        StudentModuleProgress.setProgress(req.params.studentId, req.params.course_id, req.params.moduleId, req.params.status ,stuModProgress, (err, data) => {
            if(err) {
                if(err.kind == "not_found") {
                    res.status(404).send({
                        message: `Not found module progress with id ${req.params.moduleId}.`
                    });
                } else {
                    res.status(500).send({
                        message: err.message || "Error updating progress with id " + req.params.moduleId
                    });
                }
            } else {
                res.send(data);
            }
        }).then(() => {
           // console.log(`Course UpdateSeatsByID(${req.params.courseId}) Promise resolved`);
        }).catch((err) => {
            //console.log(`Course UpdateSeatsById(${req.params.courseId}) Promise Rejected \n${err}`);
        });

}

exports.addProgressTracking = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuModProgress = new StudentModuleProgress({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        module_id: req.body.module_id,
        progressStatus: req.body.progressStatus,
        module_number: req.body.module_number
    });

    StudentModuleProgress.create(stuModProgress, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the progress tracking."
            });
        else res.send(data);
    }).then(() => {
        console.log('Created progress tracking successfully!');
    }).catch((err) => {
        console.log(`Error creating the progress\n${err}`);
    });
};

exports.getStudentModuleProgress = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuModProgress = new StudentModuleProgress({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        module_id: req.body.module_id,
        progressStatus: req.body.progressStatus,
        module_number: req.body.module_number
    });

    console.log(req.params.student_id);
    console.log(req.params.module_id);
    StudentModuleProgress.getProgress(req.params.studentId, req.params.course_id, req.params.moduleId, stuModProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the module progress."
            });
        } else if (data.length <= 0) { 
            res.send({ message: "Not found!"});
        } else { 
            res.send(data);
        }
    }).then(() => {
        //console.log(data)
    }).catch((err) => {
        console.log(`Error getting the module progress\n${err}`);
    });


};

// GET from DB all modules progress by Course ID
exports.getAllStudentModules = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuModProgress = new StudentModuleProgress({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        module_id: req.body.module_id,
        progressStatus: req.body.progressStatus,
        module_number: req.body.module_number
    });

    console.log(req.params.student_id);
    StudentModuleProgress.getAllModules(req.params.studentId, req.params.courseId, stuModProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the module progress."
            });
        } else if (data.length <= 0) { 
            res.send({ message: "Not found!"});
        } else { 
            // console.log("********");
            // console.log(data);
            res.send(data);
        }
    }).then(() => {
        //console.log(data)
    }).catch((err) => {
        console.log(`Error getting the module progress\n${err}`);
    });
};

