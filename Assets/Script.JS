var apiKey = '0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990';
var randomWord = 'https://wordsapiv1.p.rapidapi.com/words/';
var rhymeURL = 'http://wordsapiv1.p.mashape.com/words/cat/rhymes';
var giphyApiKey = 'Ctqe3iQ5R6rKCRyBufsfQTuwmkVQ44QH';
var giphyURL = 'https://api.giphy.com/v1/stickers/search?api_key=Ctqe3iQ5R6rKCRyBufsfQTuwmkVQ44QH&q=congratulations&limit=1&rating=g';

var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

function getRhymeWord(randomWord) {
	fetch(`https://wordsapiv1.p.rapidapi.com/words/${randomWord}/rhymes`, options)
	.then(function (response) { return response.json() })
	.then(function (response) { console.log(response) })
	.catch(function (err) { console.error(err) });
}



fetch(giphyURL)
	.then(function (response) { return response.json() })
	.then(function (response) { console.log(response) })
	.catch(function (err) { console.error(err) });



var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};


var randomWord = fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
	.then(function (response) { return response.json() })
	
	
	randomWord.then(function (randomWord_data) { 
		console.log(randomWord_data.word) 
		getRhymeWord(randomWord_data.word)})
	.catch(function (err) { console.error(err) });








$(".start-game").click(function () {
	$(".title").addClass("hide")
	$(".explanation").addClass("hide")
	$("button").addClass("hide")

	$(".word-section").append(`
    <p>Your word is "Dog"</p>
    `)

	$(".text-area-section").append(`
    <textarea name="textarea" id="text-area" cols="50" rows="10"></textarea>
    `)

	$(".submit-btn").append(`
    <button>Submit</button>
    `)

	$(".timer").append(`
    <p>Time: 20</p>
    `)
});