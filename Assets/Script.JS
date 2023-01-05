var apiKey = '0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990';
var randomWord = 'https://wordsapiv1.p.rapidapi.com/words/';
var baseURL = 'http://wordsapiv1.p.mashape.com/words/cat/rhymes';

var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
	.then(function(response){return response.json()})
	.then(function(response){console.log(response)})
	.catch(function(err){console.error(err)}); 


var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ae7e99fbfmshd97cb110dc86311p147747jsn8b3f079ea990',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

fetch('https://wordsapiv1.p.rapidapi.com/words/cat/rhymes', options)
	.then(function(response){return response.json()})
	.then(function(response){console.log(response)})
	.catch(function(err){console.error(err)});



