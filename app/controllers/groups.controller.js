const Groups = require("../models/groups.model");


// Create and Save a new Group
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Group
    const groups = new Groups({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        groupNumber: req.body.groupNumber
    });

    // Save Group in the database
    Groups.create(groups, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Group."
            });
        else res.send(data);
    }).then(() => {
        console.log('Created Group successfully!');
    }).catch((err) => {
        console.log(`Error creating the Group\n${err}`);
    });
};

// Retrieve all groups from the database.
exports.findAll = (req, res) => {
    Groups.getAll(req, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Groups."
            });
        else res.send(data);
    }).then(() => {
        console.log('Found all groups successfully');
    }).catch((err) => {
        console.log(`Error retrieving the groups\n${err}`);
    })
};

exports.findAllbyCourse = (req, res) => {
    Groups.findByCourseId(req.params.course_id, (err, data) => {
    if (err) {
        if (err.kind == "not_found") {
            res.status(404).send({
                message: `Not found course with id ${req.params.course_id}.`
            });
        } else {
            res.status(500).send({
                message: "Error retrieving Course with id " + req.params.course_id
            });
        }
    } else {
        //res.send(data);
    }
    }).then((data) => {
        if (_.isEmpty(data)) {
            console.log("data is empty");
            res.status(404).json({ msg: "Course has no group" })
        }
        else {
            //console.log("data: " + data);
            res.send(data);
        }
    }).catch((reason) => {
        console.log("err: " + reason);
        res.status(500).json({ msg: "Error retrieving Groups " });
    })
};