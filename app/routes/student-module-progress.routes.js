module.exports = app => {
    const stuModProgress = require("../controllers/student-module-progress.controller");
    //const passport = require('passport');

    // GET from DB all modules progress
    app.post("/stumodprogress", stuModProgress.addProgressTracking);

    // GET from DB the progress made by one student in a module 
   // app.get("/stumodprogress/:studentId/:moduleId", stuModProgress.getStudentModuleProgress);
    
    // PUT in DB The status for a module by Student ID and module ID
    app.put("/stumodprogress/:studentId/:moduleId/:status", stuModProgress.setModuleProgressStatus);
        
    // GET from DB all modules progress by Course ID
    app.get("/stumodprogress/:studentId/:courseId", stuModProgress.getAllStudentModules);
};