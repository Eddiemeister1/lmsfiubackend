const Message = require("../models/message.model");

//Create and Save a new Message
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const message = new Message({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        content: req.body.content,
        created: req.body.created,
        changed: req.body.changed,
        course_id: req.body.course_id,
        parent_id: req.body.parent_id
    });

    Message.create(message, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Message."
            });
        else res.send(data);
    }).then(() => {
        console.log('Created Message successfully!');
    }).catch((err) => {
        console.log(`Error creating the Message\n${err}`);
    });

};

exports.findAdminsByCourseId = (req, res) => {
    const className = "Messages";
    const reqParamId = req.params.courseId;

    Message.findAdminsByCourseId(reqParamId, (err, data) => {
        if(err) {
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: `Not found ${className} with id ${reqParamId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${className} with id ${reqParamId}`
                });
            }
        } else {
            res.send(data);
        }
    }).then(() => {
        console.log(`${className} findInstructorsByCourseId(${reqParamId}) was found`);
    }).catch((err) => {
        console.log(`Error findInstructorsByCourseId(${reqParamId}), couldn't find/retrieve ${className}\n${err}`);
    }) 
};

exports.findInstructorsByCourseId = (req, res) => {
    const className = "Messages";
    const reqParamId = req.params.courseId;

    Message.findInstructorsByCourseId(reqParamId, (err, data) => {
        if(err) {
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: `Not found ${className} with id ${reqParamId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${className} with id ${reqParamId}`
                });
            }
        } else {
            res.send(data);
        }
    }).then(() => {
        console.log(`${className} findInstructorsByCourseId(${reqParamId}) was found`);
    }).catch((err) => {
        console.log(`Error findInstructorsByCourseId(${reqParamId}), couldn't find/retrieve ${className}\n${err}`);
    }) 
};

exports.findStudentsByCourseId = (req, res) => {
    const className = "Messages";
    const reqParamId = req.params.courseId;

    Message.findStudentsByCourseId(reqParamId, (err, data) => {
        if(err) {
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: `Not found ${className} with id ${reqParamId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${className} with id ${reqParamId}`
                });
            }
        } else {
            res.send(data);
        }
    }).then(() => {
        console.log(`${className} findStudentsByCourseId(${reqParamId}) was found`);
    }).catch((err) => {
        console.log(`Error findStudentsByCourseId(${reqParamId}), couldn't find/retrieve ${className}\n${err}`);
    }) 
};

exports.findRepliesByParentId = (req, res) => {
    const className = "Replies";
    const reqParamId = req.params.parentId;

    Message.findRepliesByParentId(reqParamId, (err, data) => {
        if(err) {
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: `Not found ${className} with id ${reqParamId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${className} with id ${reqParamId}`
                });
            }
        } else {
            res.send(data);
        }
    }).then(() => {
        console.log(`${className} findRepliesByParentId(${reqParamId}) was found`);
    }).catch((err) => {
        console.log(`Error findRepliesByParentId(${reqParamId}), couldn't find/retrieve ${className}\n${err}`);
    }) 
}; 

exports.findRepliesByCourseId = (req, res) => {
    const className = "Replies";
    const reqParamId = req.params.courseId;

    Message.findRepliesByCourseId(reqParamId, (err, data) => {
        if(err) {
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: `Not found ${className} with id ${reqParamId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${className} with id ${reqParamId}`
                });
            }
        } else {
            res.send(data);
        }
    }).then(() => {
        console.log(`${className} findRepliesByCourseId(${reqParamId}) was found`);
    }).catch((err) => {
        console.log(`Error findRepliesByCourseId(${reqParamId}), couldn't find/retrieve ${className}\n${err}`);
    }) 
};

exports.updateChangedDateByMessageId = (req, res) => {
    const className = "Messages";
    const reqParamId = req.params.messageId;

    Message.updateChangedDateByMessageId(reqParamId, new Message(req.body), (err, data) => {
        if(err) {
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: `Not found ${className} with id ${reqParamId} and date.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${className} with id ${reqParamId} and date`
                });
            }
        } else {
            res.send(data);
        }
    }).then(() => {
        console.log(`${className} updateChangedDateByMessageId(${reqParamId}) was found`);
    }).catch((err) => {
        console.log(`Error updateChangedDateByMessageId(${reqParamId}), couldn't find/retrieve ${className}\n${err}`);
    });
};