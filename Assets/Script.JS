var apiKey = "0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990";
var randomWord = "https://wordsapiv1.p.rapidapi.com/words/";
var rhymeURL = "http://wordsapiv1.p.mashape.com/words/cat/rhymes";
var giphyApiKey = "Ctqe3iQ5R6rKCRyBufsfQTuwmkVQ44QH";
var giphyURL =
  "https://api.giphy.com/v1/stickers/search?api_key=Ctqe3iQ5R6rKCRyBufsfQTuwmkVQ44QH&q=congratulations&limit=1&rating=g";
var time = 20;

rhymeArray = [];

function getRhymeWord(randomWord) {
  fetch(`https://wordsapiv1.p.rapidapi.com/words/${randomWord}/rhymes`, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
	  rhymeArray.push(response)
	  console.log(rhymeArray[0].rhymes.all);
    })
    .catch(function (err) {
      console.error(err);
    });
}

fetch(giphyURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.error(err);
  });

var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

// This code gets random word
window.randomWordValue;

var randomWord = fetch(
  "https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5&partOfSpeech=verb",
  options
).then(function (response) {
  return response.json();
});

randomWord
  .then(function (randomWord_data) {
    console.log(randomWord_data.word);
	getRhymeWord(randomWord_data.word)
    window.randomWordValue = randomWord_data.word;
  })
  .catch(function (err) {
    console.error(err);
  });

  function timerFunction(){
	var timer = setInterval(function() {
		time--;
		
		$('.timer').text('Time: ' + time);
	
		if (time === 0) {
		  clearInterval(timer);
		}
	  }, 1000);
  }

// This function starts game
$(".start-game").click(function () {
  $(".start-screen").addClass("hide");

  timerFunction()
  $(".game-screen").append(`
		<div class="row justify-content-md-end">
            <div class="col-md-auto timer align-self-end mb-4 mt-3">
                Time: ${time}
            </div>
        </div>
        <div class="row mb-5">
            <div class="col">
                <div class="row justify-content-md-center mb-4">
                    <div class="col-md-auto align-self-center">
                        <h5>Your Word: ${window.randomWordValue}</h5>
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
            <div class="col-md-auto align-self-center mr-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Correct!</h5>
                    </div>
                    <ul class="list-group list-group-flush correct-card"></ul>
                  </div>
            </div>
            <div class="col-md-auto align-self-center ml-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Wrong!</h5>
                    </div>
                    <ul class="list-group list-group-flush wrong-card"></ul>
                  </div>
            </div>
        </div>
	
	`);

	clickEnter()

});


function clickEnter(){
	$("#input-area").keypress(function(e) {
		if(e.which == 13) {
		  var inputValue = $(this).val();
		  if (rhymeArray[0].rhymes.all.includes(inputValue)){
			$(".correct-card").append(`
				<li class="list-group-item">${inputValue}</li>
			`)
		  } else{
			$(".wrong-card").append(`
				<li class="list-group-item">${inputValue}</li>
			`)
		  }
		  $(this).val('');
		}
	  });
}

