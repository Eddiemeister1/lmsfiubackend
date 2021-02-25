module.exports = app => {
    const stuVidProgress = require("../controllers/student-video-progress.controller");
    //const passport = require('passport');

    app.post("/stuvidprogress", stuVidProgress.addProgressTracking)
    app.get("/stuvidprogress/:studentId/:videoId", stuVidProgress.getStudentVideoProgress);
    app.put("/stuvidprogress/:studentId/:videoId/:status/:take", stuVidProgress.setVideoProgressStatus);

    app.get("/stuvidprogress/:studentId", stuVidProgress.getAllStudentVideos);

    //app.put("/stuvidprogress/:studentId/:videoId/:status/:take/:leftOff", courses.findOne);
};