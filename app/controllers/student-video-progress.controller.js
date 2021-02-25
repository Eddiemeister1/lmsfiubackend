const StudentVideoProgress = require("../models/student-video-progress.model");

exports.test = (req, res) => {
    // Validate request
    console.log("hello");
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
}

exports.setVideoProgressStatus = (req, res) => {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
        }
        const stuVidProgress = new StudentVideoProgress({
            student_id: req.body.student_id,
            video_id: req.body.video_id,
            progressStatus: req.body.progressStatus,
            take: req.body.take,
        });
    
        StudentVideoProgress.setProgress(req.params.studentId, req.params.videoId, req.params.status, req.params.take ,stuVidProgress, (err, data) => {
            if(err) {
                if(err.kind == "not_found") {
                    res.status(404).send({
                        message: `Not found video progress with id ${req.params.videoId}.`
                    });
                } else {
                    res.status(500).send({
                        message: err.message || "Error updating progress with id " + req.params.videoId
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
    const stuVidProgress = new StudentVideoProgress({
        student_id: req.body.student_id,
        video_id: req.body.video_id,
        progressStatus: req.body.progressStatus,
        take: req.body.take,
    });

    StudentVideoProgress.create(stuVidProgress, (err, data) => {
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

exports.getStudentVideoProgress = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuVidProgress = new StudentVideoProgress({
        student_id: req.body.student_id,
        video_id: req.body.video_id,
        progressStatus: req.body.progressStatus,
        take: req.body.take,
    });

    console.log(req.params.student_id);
    console.log(req.params.video_id);
    StudentVideoProgress.getProgress(req.params.studentId, req.params.videoId, stuVidProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the video progress."
            });
        } else if (data.length <= 0) { 
            res.send({ message: "Not found!"});
        } else { 
            res.send(data[0]);
        }
    }).then(() => {
        //console.log(data)
    }).catch((err) => {
        console.log(`Error getting the video progress\n${err}`);
    });


};


exports.getAllStudentVideos = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuVidProgress = new StudentVideoProgress({
        student_id: req.body.student_id,
        video_id: req.body.video_id,
        progressStatus: req.body.progressStatus,
        take: req.body.take,
    });

    console.log(req.params.student_id);
    StudentVideoProgress.getAllVideos(req.params.studentId, stuVidProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the video progress."
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
        console.log(`Error getting the video progress\n${err}`);
    });
};