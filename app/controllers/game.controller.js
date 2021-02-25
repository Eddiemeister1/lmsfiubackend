const Game = require("../models/game.model");

exports.getAllScoresByCourse = (req,res) =>{
    if (!req.params) {
        res.status(400).send({message: "Content cannot be empty!"});
    }
    const {course_id} = req.params;
    const game={
        course_id,
    }  
    Game.getAllScoresByCourse(game,(err,data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the all scores leaderboard"
            });
        }else {
            console.log("LEADERBOARD", data)
          
            res.send(data);
        } 
    }).then((res)=>{
        console.log("SUCCESSFULLY GOT ALL SCORES BY COURSE_ID",res)
    }).catch((err)=>{
        console.log("ERROR GETTING ALL SCORES BY COURSE_ID",err)
    })

};

exports.getHighScore = (req, res) => { // Validate request
    if (!req.params) {
        res.status(400).send({message: "Content cannot be empty!"});
    }
    
    const {course_id, student_id} = req.params;
    // const game = new Game({studentScore, courseHighScore, course_id, student_id})
    const game={
        course_id,
        student_id
    }
    
    Game.getHighScore(game, (err, data) => {
        
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the high score"
            });
        }else {
            console.log(data) 
            res.send(data);
        } 
        
    }).then((data) => {
        console.log('succesful!', data);
    }).catch((err) => {
        console.log(`Error getting high score\n${err}`);
    });
 
};

exports.setHighScore = (req, res) => { // Validate request
    if (!req.body) {
        res.status(400).send({message: "Content cannot be empty!"});
    }
    const {studentScore, course_id, student_id} = req.body;
    const game = {
        studentScore,
        course_id,
        student_id
    }


    Game.setHighScore(game, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message || "Some error occured while setting the high score"
            });
         else 
            res.send(data);
        
    }).then((res) => {
        console.log('succesful! updated student score', res);
    }).catch((err) => {
        console.log(`Error setting high score\n${err}`);
    });
 
};
exports.getCourseHighScore = (req,res)=>{
    if (!req.params) {
        res.status(400).send({message: "Content cannot be empty!"});
    }
    const {course_id, student_id} = req.params;

    const game ={
        course_id,
        student_id
    }

    Game.getCourseHighScore(game, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting the high score"
            });
        }else {
            //console.log(data)          
            res.send(data);
        } 

    }).then((res)=>{
        console.log('succesful,get course\'s highest score', res)
    }).catch((err)=>{
        console.log("ERROR happened when trying to get course\'s highest score", err)
    });
};
exports.setCourseHighScore = (req,res)=>{
    if (!req.body) {
        res.status(400).send({message: "Content cannot be empty!"});
    }
    //console.log("req.body", req.body);
    const {high_score, course_id, student_id} = req.body;
    const game = {
        high_score,
        course_id,
        student_id
    }
    Game.setCourseHighScore(game,(err,data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while setting the high score"
            });
        }else {
            //console.log(data)          
            res.send(data);
        } 

    }).then((res)=>{
        console.log('succesful,SET course\'s highest score', res)
    }).catch((err)=>{
        console.log("ERROR happened when trying to SET course\'s highest score", err)
    });

}