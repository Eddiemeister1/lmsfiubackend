const CourseGroups = require("../models/courseGroups.model");

// Create and Save a new Group
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Group
    const courseGroup = new CourseGroups({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        groupNumber: req.body.groupNumber
    });

    // Save group in the database
    CourseGroups.create(courseGroup, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Group."
            });
        else res.send(data);
    }).then(() => {
        console.log('Created group successfully!');
    }).catch((err) => {
        console.log(`Error creating the group\n${err}`);
    });
};

// Retrieve all groups in a course from the database.
exports.findAll = (req, res) => {
    CourseGroups.getAll(req, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving group."
            });
        else res.send(data);
    }).then(() => {
        console.log('Found all successfully');
    }).catch((err) => {
        console.log(`Error retrieving the students group.\n${err}`);
    })
};

// Find all groups in a Course with a course_id
exports.findGroupsInCourse = (req, res) => {
    CourseGroups.findGroupByCourseId(req.params.courseId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not found groups with id ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving groups with id " + req.params.courseId
                });
            }
        } else {
            res.send(data);
        }
    }).then((data) => {
        if (_.isEmpty(data)) {
            console.log("data is empty");
            res.status(404).json({ msg: "course has no group" })
        }
        else {
            //console.log("data: " + data);
            res.send(data);
        }
    }).catch((reason) => {
        console.log("err: " + reason);
        res.status(500).json({ msg: "Error retrieving group " });
    })
    
};

// Find all groups in a Course with a course_id
exports.findAllStudentsInGroup = (req, res) => {
    CourseGroups.findGroup(req.params.courseId, req.params.gNumber, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not found groups with id ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving groups with id " + req.params.courseId
                });
            }
        } else {
            res.send(data);
        }
    }).then((data) => {
        if (_.isEmpty(data)) {
            console.log("data is empty");
            res.status(404).json({ msg: "course has no group" })
        }
        else {
            //console.log("data: " + data);
            res.send(data);
        }
    }).catch((reason) => {
        console.log("err: " + reason);
        res.status(500).json({ msg: "Error retrieving group " });
    })
    
};

// Find the number of groups in a course with a courseId
exports.findGroup = (req, res) => {
    CourseGroups.findStudentGroup(req.params.studentId,req.params.courseId, (err, data) => {
        if(err) {
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: `Not found Course with id ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Course with id " + req.params.courseId
                });
            }
        } else {
            res.send(data);
        }
    }).then(() => {
        console.log(`Course findGroupById(${req.params.courseId}) was found`);
    }).catch((err) => {
        console.log(`Error findGroupById(${req.params.courseId}), couldn't find/retrieve course\n${err}`);
    })
};

// Delete all Group in a Course.
exports.delete = (req, res) => {
    CourseGroups.delete(req.params.courseId, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message: `Not found groups with id ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Groups with id " + req.params.courseId
                });
            }
        } else {
            res.send({ message: `All Groups on Course ${req.params.courseId} deleted successfully!`});
        }
    }).then(() => {
        console.log(`Resolved: Groups ${req.params.courseId} was deleted successfully!`);
    }).catch((err) => {
        if(err.kind == "not_found")
            console.log(`Rejected: Couldn't find Groups with id ${req.params.courseId}\n${err}`);
        else
            console.log(`Rejected: Could not delete Groups with id ${req.params.courseId}\n${err}`);
    })
};


// Delete all groups from the database (Clear all Table)
exports.deleteAll = (req, res) => {
    CourseGroups.deleteAll((err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all groups."
            });
        else
            res.send({ message: "All groups were deleted successfully!"});
    });
};










