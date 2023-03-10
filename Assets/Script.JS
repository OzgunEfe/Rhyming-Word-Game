// canvas javascript
const canvas = document.getElementById("sandbox");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

function Circle(x, y, r, c) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.c = c;

  this.dx = Math.floor(Math.random() * 4) + 1;
  this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  this.dy = Math.floor(Math.random() * 4) + 1;
  this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  this.animate = function () {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    this.draw();
  };
}

const balls = [];
for (let i = 0; i < 20; i++) {
  let r = Math.floor(Math.random() * 30) + 15;
  let x = Math.random() * (canvas.width - r * 2) + r;
  let y = Math.random() * (canvas.height - r * 2) + r;
  let c = "indianred";
  balls.push(new Circle(x, y, r, c));
}
/* BONUS FEATURE */
canvas.addEventListener("click", function (e) {
  let r = Math.floor(Math.random() * 30) + 15;
  balls.push(new Circle(e.clientX, e.clientY, r, "orange"));
});

function Update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.animate();
  }

  requestAnimationFrame(Update);
}
Update();
// canvas javascript
var apiKey = "0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990";
var randomWord = "https://wordsapiv1.p.rapidapi.com/words/";
var rhymeURL = "http://wordsapiv1.p.mashape.com/words/cat/rhymes";
var giphyApiKey = "Ctqe3iQ5R6rKCRyBufsfQTuwmkVQ44QH";
var giphyURL =
  "https://api.giphy.com/v1/stickers/search?api_key=Ctqe3iQ5R6rKCRyBufsfQTuwmkVQ44QH&q=congratulations&limit=1&rating=g";
var time = 20;
var date = moment().format("L");
var hour = moment().format("LT");

$("#staticBackdrop").modal("hide");

rhymeArray = [];
scoreArray = JSON.parse(localStorage.getItem("scores")) || [];

function getRhymeWord(randomWord) {
  fetch(`https://wordsapiv1.p.rapidapi.com/words/${randomWord}/rhymes`, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // console.log(response);
      rhymeArray.push(response);
      // console.log(rhymeArray[0].rhymes.all);
    })
    .catch(function (err) {
      console.error(err);
    });
}

// We use the gif api here.
function getGif() {
  fetch(giphyURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var gifImg = response.data[0].images.original.url;
      $("#gif-img").attr("src", gifImg);
      $("#user-score").append(`
	  	<p>Your Score: ${userScore}</p>
	  `);
      $("#staticBackdrop").modal("show");
    })
    .catch(function (err) {
      console.error(err);
    });
}

var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

// This code gets random word
window.randomWordValue;

function getData() {
  return fetch(
    "https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5&partOfSpeech=verb",
    options
  ).then(function (res) {
    return res.json();
  });
}

getData()
  .then(function (randomWord_data) {
    // console.log(randomWord_data.word);
    if (randomWord_data.word.includes(" ")) {
      getData().then(function (randomWord_data) {
        getRhymeWord(randomWord_data.word);
      });
    }
    getRhymeWord(randomWord_data.word);
    window.randomWordValue = randomWord_data.word;
  })
  .catch(function (err) {
    console.error(err);
  });

function timerFunction() {
  var timer = setInterval(function () {
    time--;

    $(".timer").text("Time: " + time);

    if (time === 0) {
      clearInterval(timer);
      $(".game-screen").addClass("hide");
      getGif();
    }
  }, 1000);
}

// This function starts game
function startGame() {
  $(".start-game").click(function () {
    $(".start-screen").addClass("hide");
    $("#sandbox").addClass("hide");
    $(".jumbotron").addClass("hide");

    timerFunction();
    $(".game-screen").append(`
			  <div class="row justify-content-md-end">
				  <div class="timer col-md-auto timer align-self-end mb-5 mt-5 font-weight-bolder ">
					  Time: ${time}
				  </div>
			  </div>
			  <div class="row mb-5">
				  <div class="col">
					  <div class="row justify-content-md-center mb-4">
						  <div class="col-md-auto align-self-center">
							  <h5>Your Word: <span style="color: red; font-size: 36px;">${window.randomWordValue}</span></h5>
						  </div>
					  </div>
					  <div class="row justify-content-md-center">
						  <div class="col-md-auto word-section align-self-center">
							  <input class="form-control form-control-lg" id="input-area" type="text" placeholder="Enter your rhyming word">
						  </div>
					  </div>
				  </div>
			  </div>
			  <div class="row justify-content-md-center">
				  <div class="col-md-auto align-items-start mr-5">
					  <div class="card" style="width: 18rem;">
						  <div class="card-body">
							<h5 class="card-title correct">Correct</h5>
						  </div>
						  <ul class="list-group list-group-flush correct-card"></ul>
						</div>
				  </div>
				  <div class=" wrong-section col-md-auto align-items-start">
					  <div class="card" style="width: 18rem;">
						  <div class="card-body">
							<h5 class="card-title wrong">Wrong</h5>
						  </div>
						  <ul class="list-group list-group-flush wrong-card"></ul>
						</div>
				  </div>
			  </div>
		  
		  `);

    clickEnter();
  });
}

startGame();

var correctArray = [];

// This function checks the result when the user presses enter.
var userScore = 0;
function clickEnter() {
  $("#input-area").keypress(function (e) {
    if (e.which == 13) {
      var inputValue = $(this).val();
      if (
        inputValue == "" ||
        inputValue == " " ||
        inputValue === window.randomWordValue
      ) {
        $(this).val("");
      } else if (rhymeArray[0].rhymes.all.includes(inputValue)) {
        if (!correctArray.includes(inputValue)) {
          userScore++;
          $(".correct-card").append(`
				<li class="list-group-item">${inputValue}</li>
			`);
          correctArray.push(inputValue);
        }
      } else {
        $(".wrong-card").append(`
				<li class="list-group-item">${inputValue}</li>
			`);
      }
      $(this).val("");
    }
  });
}

// This function saves user score to the LocalStorage
function saveScoreList(arr) {
  localStorage.setItem("scores", JSON.stringify(arr));
}

// This function gets user score from the LocalStorage
function getScoreList() {
  return JSON.parse(localStorage.getItem("scores")) || [];
}

// This function deletes the LocalStorage data
function clearLocalStorage() {
  localStorage.removeItem("scores");
}

// This function save the user score to LocalStorage
$(".save-score").click(function () {
  $("#staticBackdrop").modal("hide");
  var userScoreSave = `${date} - ${hour} - Score: ${userScore}`;
  scoreArray.push(userScoreSave);
  saveScoreList(scoreArray);

  $(".score-screen").removeClass("hide");
  var displayScore = getScoreList();

  var reverseDisplay = displayScore.reverse();

  reverseDisplay.forEach(function (score) {
    $("#highscores").append(`
			<li>${score}</li>
		`);
  });
});

// Button-Click Sections
$(".go-back").click(function () {
  window.location.reload();
});

$(".close").click(function () {
  window.location.reload();
});

$("#clear").click(function () {
  clearLocalStorage();
  $("#highscores").children().remove();
});
