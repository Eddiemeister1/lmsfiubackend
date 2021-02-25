module.exports = app => {
    const message = require("../controllers/message.controller");

    app.post("/messages", message.create);

    app.get("/messages/a/:courseId", message.findAdminsByCourseId);

    app.get("/messages/i/:courseId", message.findInstructorsByCourseId);

    app.get("/messages/s/:courseId", message.findStudentsByCourseId);

    app.get("/messages/r/p/:parentId", message.findRepliesByParentId);

    app.get("/messages/r/c/:courseId", message.findRepliesByCourseId);

    app.put("/messages/:messageId", message.updateChangedDateByMessageId);
    
};