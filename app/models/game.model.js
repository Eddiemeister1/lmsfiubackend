const sql = require("./db");

const Game = function(game){
    this.studentScore = game.studentScore;
    this.courseHighScore = game.courseHighScore;
    this.course_id = game.course_id;
    this.student_id = game.student_id;
}
/**
 *   THIS MODEL USES TWO TABLES: 
 * - game_scores which is for storing the student_id and the student's high score.
 * - game_course_scores which is for storing the highest score of a student in that course.
 */

 Game.getAllScoresByCourse = (game,result)=>{
    return new Promise((resolve, reject) => {
        sql.query(`SELECT game_scores.student_score,students.f_name  FROM game_scores JOIN students ON game_scores.student_id = students.id WHERE course_id=${game.course_id};`, (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res);
            return resolve(res);
        })
    })
}

Game.setHighScore = (game,result) =>{

    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO game_scores(student_score, course_id,student_id) VALUES(${game.studentScore},${game.course_id}, ${game.student_id}) ON DUPLICATE KEY UPDATE student_score=${game.studentScore}`, (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res[0]);
            return resolve(res);
        })
    })
}

Game.getHighScore = (game,result) =>{
     //the query returns student_score=0 for when the player has no records of ever playing the game
    return new Promise((resolve, reject) => {
        sql.query(`SELECT IFNULL(MIN(student_score),0) AS student_score,IFNULL(MIN(course_id),${game.course_id}) AS course_id, IFNULL(MIN(student_id),${game.student_id}) AS student_id FROM game_scores WHERE student_id=${game.student_id} AND course_id=${game.course_id};`,  (err, res) => {
            if(err) {
                result(err, null);
                return reject(err);
            }
            result(null, res[0]);
            return resolve(res);
        })
    })
}
Game.setCourseHighScore = (game,result)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`INSERT INTO game_course_scores( course_id,high_score,student_id) VALUES(${game.course_id},${game.high_score},${game.student_id}) ON DUPLICATE KEY UPDATE high_score=${game.high_score}`,(err,res)=>{
            if(err){
                result(err,null);
                return reject(err);
            }
            result(null,res[0]);
            return resolve(res);
        })
    })
}
Game.getCourseHighScore = (game,result)=>{
    return new Promise((resolve, reject) => {
      sql.query(`SELECT IFNULL(MIN(course_id),${game.course_id}) AS course_id,IFNULL(MIN(high_score),0) AS high_score, IFNULL(MIN(student_id),0) AS student_id FROM game_course_scores WHERE course_id=${game.course_id};`,(err,res)=>{
        if(err){
            result(err,null);
            return reject(err);
        }
        result(null,res[0]);
        return resolve(res);
      })
    })
}

module.exports = Game;