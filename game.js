var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var toogle = false;
var level = 0;

$(document).keydown(function () {
  if (!toogle) {
    $("#level-title").text("Level " + level);
    nextSequence();
    toogle = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  playSound(userChosenColour);
  animatedPress(userChosenColour);

  userClickedPattern.push(userChosenColour);

  CheckAnswer([userClickedPattern.length - 1]);
});

function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColours[randomNumber];

  gamePattern.push(randomChosenColor);

  let buttonColor = $("#" + randomChosenColor);

  playSound(randomChosenColor);
  buttonColor.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color) {
  const audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatedPress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function CheckAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  toogle = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
