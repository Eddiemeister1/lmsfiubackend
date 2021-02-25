module.exports = app => {

    const Game = require("../controllers/game.controller");
 
    app.get("/getHighScore/:course_id/:student_id", Game.getHighScore)
    app.put("/setHighScore", Game.setHighScore);
    app.get("/getCourseHighScore/:course_id/:student_id", Game.getCourseHighScore);
    app.put("/setCourseHighScore", Game.setCourseHighScore);
    app.get("/getAllScoresByCourse/:course_id", Game.getAllScoresByCourse);
 
 
 }