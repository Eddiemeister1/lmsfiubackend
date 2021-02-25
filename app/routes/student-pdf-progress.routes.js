module.exports = app => {
    const stuPdfProgress = require("../controllers/student-pdf-progress.controller");
    //const passport = require('passport');
    app.post("/stupdfprogress", stuPdfProgress.addProgressTracking);
    //app.get("/stupdfprogress/:studentId/:pdfId", stuPdfProgress.getStudentPdfProgress);
    //app.put("/stupdfprogress/:pdfId/:status", stuPdfProgress.setPdfProgressStatus);
    //app.put("/stupdfprogress/:studentId/:pdfId/:status", stuPdfProgress.setStudentProgress);
    //app.delete("/stupdfprogress/:pdfId", stuPdfProgress.deletePdf);
    //app.put("/stuvidprogress/:studentId/:videoId/:status/:take/:leftOff", courses.findOne);
    app.get("/stupdfprogress/:studentId", stuPdfProgress.getAllPdfProgress);
};