var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var notStarted=true;
var level = 0;


$(document).keydown(function() {
    if(notStarted)
    {
        nextSequence();
        notStarted=false;
    }
});


$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).keydown(startOver());
    }
}


function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 50)
}


function startOver()
{
    level = 0;
    gamePattern =[];
    notStarted = true;
}