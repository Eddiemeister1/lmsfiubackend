const StudentPdfProgress = require("../models/student-pdf-progress.model");

exports.test = (req, res) => {
    // Validate request
    console.log("hello");
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
}

/*Update a PDF Progress status based on the module id, student id, and pdf id
exports.setPdfProgressStatus = (req, res) => {
    //Validate request
    console.log('Setting PDF Progress Status...');
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuPdfProgress = new StudentPdfProgress({
        pdf_id: req.body.pdf_id,
        progressStatus: req.body.progressStatus
    });

    console.log(req.params.pdf_id);

    //Put the parameters in variables
    const pdfProgress = "PDF Progress";
    const reqParamPdfID = req.params.pdf_id;

    StudentPdfProgress.setProgress(reqParamPdfID, stuPdfProgress, (err, data) => {
        if(err){
            if(err.kind == "not found") {
                res.status(404).send({
                    message: `Not found ${pdfProgress} with id ${reqParamPdfID}.`
                }); 
            } else {
                res.status(500).send({
                    message: err.message || `Error setting the ${pdfProgress} with id ${reqParamPdfID}.`
                });
            }
        } else {
            //Change the progress status to complete and then
            //Send the updated progress status to the database

            //res.body.progressStatus = 'complete';

            //or the progress status would be changed to complete in the model file and then you can send the data like this
            res.send(data);
        }

    }).then(()=> {
        console.log(`${pdfProgress} SetPDFProgressStatus(${reqParamPdfID}) Promise Resolved`);
    }).catch(() => {
        console.log(`${pdfProgress} SetPDFProgressStatus(${reqParamPdfID}) Promise Rejected\n${err}`);       
    });
};

exports.setStudentProgress = (req, res) => {
    //Validate request
    console.log('Setting PDF Progress Status for a Student...');
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuPdfProgress = new StudentPdfProgress({
        student_id: req.body.student_id,
        pdf_id: req.body.pdf_id,
        progressStatus: req.body.progressStatus
    });

    console.log(req.params.pdf_id);
    console.log(req.params.student_id);
    //Put the parameters in variables
    const pdfProgress = "PDF Progress";
    const reqParamPdfID = req.params.pdf_id;
    const reqParamStudentId = req.params.student_id;
    StudentPdfProgress.setStudentProgress(reqParamStudentId, reqParamPdfID, stuPdfProgress, (err, data) => {
        if(err){
            if(err.kind == "not found") {
                res.status(404).send({
                    message: `Not found ${pdfProgress} with ids ${reqParamStudentId} and ${reqParamPdfID}.`
                }); 
            } else {
                res.status(500).send({
                    message: err.message || `Error setting the ${pdfProgress} with ids ${reqParamStudentId} and ${reqParamPdfID}.`
                });
            }
        } else {
            res.send(data);
        }

    }).then(()=> {
        //console.log(`${pdfProgress} SetPDFProgressStatus(${reqParamStudentId}, ${reqParamPdfID}) Promise Resolved`);
    }).catch(() => {
        //console.log(`${pdfProgress} SetPDFProgressStatus(${reqParamStudentId}, ${reqParamPdfID}) Promise Rejected\n${err}`);       
    });
};
*/

exports.addProgressTracking = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuPdfProgress = new StudentPdfProgress({
        student_id: req.body.student_id,
        pdf_id: req.body.pdf_id,
        progressStatus: req.body.progressStatus,
    });

    StudentPdfProgress.create(stuPdfProgress, (err, data) => {
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

exports.getAllPdfProgress = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuPdfProgress = new StudentPdfProgress({
        student_id: req.body.student_id,
        pdf_id: req.body.pdf_id,
        progressStatus: req.body.progressStatus,
    });

    console.log(req.params.student_id);
    StudentPdfProgress.getAllPdfs(req.params.studentId, stuPdfProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the pdf progress."
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
        console.log(`Error getting the pdf progress\n${err}`);
    });
};
/*
exports.getStudentPdfProgress = (req, res) => {
    console.log('Getting student pdf progress');
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuPdfProgress = new StudentPdfProgress({
        student_id: req.body.student_id,
        pdf_id: req.body.pdf_id,
        progressStatus: req.body.progressStatus,
    });

    console.log(req.params.student_id);
    console.log(req.params.pdf_id);
    const reqParamStudentId = req.params.student_id;
    const reqParamPdfId = req.params.pdf_id;
    StudentPdfProgress.getProgress(reqParamStudentId, reqParamPdfId, stuPdfProgress, (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the pdf progress."
            });
        } else if (data.body == null) { 
            res.send({message: 'Not found'});
        } else { 
            //REMINDER: LOOK AT THIS STATEMENT BELOW!!!
            res.send(data[0]);
        }
    }).then(() => {
        console.log(data);
    }).catch((err) => {
        console.log(`Error getting the pdf progress\n${err}`);
    });


};

exports.deletePdf = (req, res) => {
    console.log("Deleting Student Pdf Progress Trackers...");
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const stuPdfProgress = new StudentPdfProgress({
        student_id: req.body.student_id,
        pdf_id: req.body.pdf_id,
        progressStatus: req.body.progressStatus
    });

    console.log(req.params.pdf_id);
    const reqParamPdfId = req.params.pdf_id;

    StudentPdfProgress.delete(reqParamPdfId, stuPdfProgress, (err, data) => {
        console.log(data);
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing Pdfs."
            });
        else
            res.send({ message: "The Pdf deleted successfully from the Table!" });
    });
*/
