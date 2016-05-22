window.onload = function(){
// Global variables needed for upcoming functions
	var choices = document.getElementsByClassName("btn-primary");
	var guess;
	var guessCount = 0;
	var rightCount = 0;
	var wrongCount = 0;
	var result;

// Function to grab song titles
	function songList(file){
		let songs;
		let request = new XMLHttpRequest();
		request.open('GET', file, false);
		request.onload = function(){
			if (this.status >= 200 && this.status < 400){
				//HTTP statuses between 200 & 400 are successful
				songs = JSON.parse(this.response);
			} 
			else{
			console.log("Your brain is dumb farts");
			}
		}
		request.send();
		return songs;
	}

// Helper function: get random integer

	function getRandomInt(min, max) {
 		 return Math.floor(Math.random() * (max - min)) + min;
	}

// Function to display song choice
	function displaySong(singer, song){
	let songs;
		if(singer == 0){
			songs = jimmySongs;
		}
		else{
			songs = kennySongs;
		}
	let songName = songs[song];
	document.getElementById("song-name").innerHTML = songName;	
	}
	
// Makes buttons respond to clicks, run the whole darn thing
	for(var i = 0; i < 2; i++){
		choices[i].addEventListener("click", function(){
			guess = this.id;
			guessCount++;
			judgement(singerChoice, guess);
			console.log(result);
			console.log("Right = " + rightCount + ", wrong = " + wrongCount); // For debugging		
			});
	}
	
// Function to change guess counter
	function countUpdate(right,total){
		document.getElementById("guess-counter").innerHTML = 
			"You've got "+ right + " correct out of "+total;
	}
		
// Function to evaluate answer as correct or incorrect
	function judgement(singer,answer){
		if(singer == 0 && answer == "jimmy"){
			result = "correct";
			rightCount++;
		}
		else if(singer == 1 && answer == "kenny"){
			result = "correct";
			rightCount++;
		}
		else if(singer == 0 && answer == "kenny"){
			result = "incorrect";
			wrongCount++;
		}
		else if(singer == 1 && answer == "jimmy"){
			result = "incorrect";
			wrongCount++;
		}
		else{
		console.log("Awaiting guesses");
		}
		countUpdate(rightCount,guessCount);
	}


// Function to replace id main-container's contents with picture & result

// Set up the page!

	var jimmySongs = songList("sirJames.json");
	var kennySongs = songList("sirKenneth.json");
	var singerChoice = getRandomInt(0,2);
	var songChoice = getRandomInt(0,jimmySongs.length);
	displaySong(singerChoice, songChoice);

	


}
