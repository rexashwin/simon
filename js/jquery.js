var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function (event) {
    if (event.key == "a") {
        if (!started) {
            nextSequence();
            started = true;
        }
    }
});

$("#play-btn").click(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    if (started) {
        userClickedPattern.push(this.id);
        animatePress(this.id);
        playSound(this.id);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    // let randomChosenColour = [];
    // randomChosenColour.push(buttonColors[randomNumber]);
    gamePattern.push(buttonColors[randomNumber]);
    userClickedPattern = [];
    $("#" + buttonColors[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomNumber]);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("<span>Game Over, Score " + (level-1) + "</span><br>Press A to Restart");
        $("#play-btn").text("Re-start")
        $("#play-btn").text();
        setInterval(function () {
            $("#level-title span").fadeIn();
            $("#level-title span").fadeOut();
        }, 1000);
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function animatePress(btn) {
    $("#" + btn).addClass("pressed");

    setTimeout(function () {
        $("#" + btn).removeClass("pressed");
    }, 100);
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(".help-icon").click(function () {
    $(".help").css({
        "transform": "scale(1, 1)"
    });
    $(document).click(function () {
        setTimeout(() => {
            $(".help").css({
                "transform": "scale(0, 1)"
            })
        }, 3000);
    });
});