// Easy Mode Questions
var easyMode = [{
    question: "What is Thor's weapon of choice?",
    answers: ['Stones','Hammer','Shield','Mace'],
    correct: 'Hammer',
    animation: 'https://media.giphy.com/media/Nmmb3MW2tABiw/giphy.gif'
    },{
    question: "Daredevil is a superhero with what physical challenge?",
    answers: ['He is blind','He is mute','He is deaf','He is paralyzed'],
    correct: 'He is blind',
    animation: 'https://media.giphy.com/media/p43lANBrMOesM/giphy.gif'
    },{
    question: "Uncle Ben said to Spider-Man 'with great power comes great' what...?",
    answers: ['Accountability','Authority','Responsibility','Notoriety'],
    correct: 'Responsibility',
    animation: 'https://media.giphy.com/media/6JY3PsAvDclqM/giphy.gif'
    },{
    question: "What is Iron Man’s real name?",
    answers: ['Johnny Spark','Manny Chark','Kenny Shark','Tony Stark'],
    correct: 'Tony Stark',
    animation: 'https://media.giphy.com/media/F5qG0326VNRkc/giphy.gif'
    },{
    question: "Captain America was frozen in which war?",
    answers: ['World War I','World War II','American Civil War','Cold War'],
    correct: 'World War II',
    animation: 'https://media.giphy.com/media/12hYyPB6Rpq33q/giphy.gif'
    },{
    question: "The Fantastic Four are based in which city?",
    answers: ['New York City','Washington, D.C.','Los Angeles','Chicago'],
    correct: 'New York City',
    animation: 'https://media.giphy.com/media/CKo9J2gxqTIze/giphy.gif'
    },{
    question: "In what year did Marvel start?",
    answers: ['1939','1914','1918','1945'],
    correct: '1939',
    animation: 'https://media.giphy.com/media/PBln5fAX5FCpO/giphy.gif'
    }
];

//Geek Mode Questions
var geekMode = [{
    question: "What power source fuels Tony Stark's Iron Man suit?",
    answers: ['The Obsidian','Arc Reactor','The Arkenstone','The Tesseract'],
    correct: 'Arc Reactor',
    animation: 'https://media.giphy.com/media/xDyB4KAU7Y6qc/giphy.gif'
    },{
    question: "Which of these is NOT an alias used by Clint Barton?",
    answers: ['Golden Archer','Goliath','Trickshot','Ronin'],
    correct: 'Trickshot',
    animation: 'https://media.giphy.com/media/n9osT0pq8HACk/giphy.gif'
    },{
    question: "What team of teenage superheroes sparked the first Civil War?",
    answers: ['New Warriors','Young Avengers','Champions','Power Pack'],
    correct: 'New Warriors',
    animation: 'https://media.giphy.com/media/5iBnchha9rVZu/giphy.gif'
    },{
    question: "Which villain is the brother of Wonder Man?",
    answers: ['Bullseye','Grim Reaper','Living Laser','The Void'],
    correct: 'Grim Reaper',
    animation: 'https://media.giphy.com/media/cES7r58z2Ndte/giphy.gif'
    },{
    question: "Who was the first superhero created in the Marvel universe?",
    answers: ['Captain Marvel','The Human Torch','Captain America','Namor the Sub-Mariner'],
    correct: 'Namor the Sub-Mariner',
    animation: 'https://media.giphy.com/media/c6diAPLplWRLG/giphy.gif'
    },{
    question: "Who came up with the team name 'Avengers'?",
    answers: ['Wasp','Ant-Man','Captain America','Iron Man'],
    correct: 'Wasp',
    animation: 'https://media.giphy.com/media/4hRTnWlOGEDFm/giphy.gif'
    },{
    question: "Where did Black Widow receive her training?",
    answers: ['S.H.I.E.L.D.','The Red Room','Hydra','The Russian Room'],
    correct: 'The Red Room',
    animation: 'https://media.giphy.com/media/dmi9bckvFNS48/giphy.gif'
    }
];

var questions = [];

var timer; // Count-down timer for each questions
var interval; // Tracks and clears the timer
var ansTrack; // Tracks whether user answered the question or the timer timed out
var questionIndex; // Index of the question being displayed
var countCorrect; // Counts the number of correct responses
var countIncorrect; // Counts the number of incorrect responses
var countMissed; // Counts the questions left unanswered
var userChoice; // Stores the answer selected by the user for the current question
var correctAnswer; // Retrieves and displays the correct answer for the question

$("#btnEasy").on("click", function(){
    $("#splash").hide();
    questions = easyMode;
    resetGame();
});

$("#btnGeek").on("click", function(){
    $("#splash").hide();
    questions = geekMode;
    resetGame();
});

function resetGame(){
    $("#game-results").hide();
    questionIndex = 0; countCorrect = 0; countIncorrect =0; countMissed = 0;
    startGame();
}

function startGame(){
    ansTrack = true;
    $("#answer-message").text("");
    $("#correct-choice").text("");
    $("#animation").attr("src","");
    $("#choices").empty();
    console.log(questionIndex);
    $("#question").text(questions[questionIndex].question);
    $("#game-question").show();
    for(var i = 0; i < 4; i++) {
        var option = $("<div>");
        option.text(questions[questionIndex].answers[i]);
        option.addClass("options");
        $("#choices").append(option);
    }
    startTimer();
    $(".options").on("click", function(){
        clearInterval(interval);
        userChoice = $(this).text();
        ansTrack = true;
        gameAnswer();
    });
}

function startTimer(){
    timer = 20;
    $("#timeRem").html("<strong>Time Remaining: " + timer + "</strong>");
    interval = setInterval(displayTimer, 1000);
}

function displayTimer(){
    timer--;
    $("#timeRem").html("<strong>Time Remaining: " + timer + "</strong>");
    if(timer < 1){
        //Timed out before user selected an answer
        ansTrack = false;
        clearInterval(interval);
        gameAnswer();
    }
}

function gameAnswer(){
    $("#game-question").hide();
    correctAnswer = questions[questionIndex].correct;
    $("#animation").attr("src",questions[questionIndex].animation);
    
    if(userChoice == correctAnswer && ansTrack == true){
        $("#answer-message").text("You got it!");
        $("#correct-choice").text("");
        countCorrect++;
    } else if (userChoice != correctAnswer && ansTrack == true){
        $("#answer-message").text("Nope!");
        $("#correct-choice").text("The correct answer was: " + correctAnswer);
        countIncorrect++;
    } else {
        $("#answer-message").text("You ran out of time!");
        $("#correct-choice").text("The correct answer was: " + correctAnswer);
        countMissed++;
    }
       
    $("#game-answer").show();

    if(questionIndex != questions.length - 1){
        questionIndex++;
        setTimeout(startGame, 5000);
    }else{
        setTimeout(gameResult, 5000);
    }
}

function gameResult(){
    $("#game-answer").hide();
    $("#result-message").text("All done! Here's how you did");
    $("#correct-answers").text("Correct Answers: " + countCorrect);
    $("#incorrect-answers").text("Incorrect Answers: " + countIncorrect);
    $("#unanswered").text("Unanswered: " + countMissed);
    $("#game-results").show();
}

$("#btnRestart").on("click", function(){
    $("#game-results").hide();
    $("#splash").show();
});

$("#game-results").hide();
$("#game-answer").hide();
$("#splash").show();

