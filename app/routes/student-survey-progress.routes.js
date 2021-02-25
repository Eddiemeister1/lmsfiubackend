module.exports = app => {
    const stuSurveyProgress = require("../controllers/student-survey-progress.controller");

    /////// create a new survey progress 
    app.post("/stusurveyprogress", stuSurveyProgress.addProgressTracking)

    /////// Get all survey progress ----> Show all DB Data 
    app.get("/stusurveyprogress", stuSurveyProgress.findAll);

    /////// Get all survey progress for one Student
    app.get("/stusurveyprogress/:studentId", stuSurveyProgress.getAllStudentSurvey);

    /////// Get a survey progress by student_id and survey_id -----> if exist show True ---> only Boolean
    app.get("/stusurveyprogress/:studentId/:surveyId", stuSurveyProgress.getStudentSurveyProgressBoolean);

    /////// Get a survey progress by student_id and survey_id ------> if exist show only the Data.
    app.get("/stusurveyprogress/data/:studentId/:surveyId", stuSurveyProgress.getStudentSurveyProgress);

    /////// Update a survey progress  
    app.put("/stusurveyprogress/:studentId/:surveyId/:status/:score", stuSurveyProgress.setSurveyProgressStatus);

    /////// Delete All surveys progress ----> clean the DB
    app.delete("/stusurveyprogress/deleteAll", stuSurveyProgress.deleteAll);

};