module.exports = app => {
    const groups = require("../controllers/groups.controller");
    
    // create group for a course
    app.post("/groups/create", groups.create);
    
    // find and show all groups in a course
    app.get("/groups/findAll", groups.findAll);

    // find and show all groups in a course
    app.get("/groups/findAll/:courseId", groups.findAllbyCourse);

    // find and show a student groups by student id and course id
    //app.get("/groups/findGroup/:courseId/:studentId", groups.findStudentGroup);

    // update a groups by course id
   // app.put("/groups/update/:courseId", groups.updateGroups);

    // delete all groups in a course by course id
    //app.delete("/groups/delete/:courseId", groups.deleteALL);
};