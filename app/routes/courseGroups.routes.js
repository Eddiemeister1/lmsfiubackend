module.exports = app => {
    const courseGroups = require("../controllers/courseGroups.controller");
    //const passport = require('passport');

    // create group for a course
    app.post("/groupsInCourse", courseGroups.create);

    app.get("/groupsInCourse", courseGroups.findAll);

    // find and show all groups in a course
    app.get("/groupsInCourse/ShowGroupsInCourse/:courseId", courseGroups.findGroupsInCourse);

    // find and show a student group by student id and course id
    app.get("/groupsInCourse/StudentGroup/:studentId/:courseId", courseGroups.findGroup);

    // find and show all students in a group by course id and group number.
    app.get("/groupsInCourse/AllStudentGroup/:courseId/:gNumber", courseGroups.findAllStudentsInGroup);

    // delete all groups by course id
    app.delete("/groupsInCourse/:courseId", courseGroups.delete);

    // Clear all Data in Table groups
    app.delete("/groupsInCourse", courseGroups.deleteAll); 


};