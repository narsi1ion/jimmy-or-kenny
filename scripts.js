window.onload = function(){
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
	var choices = document.getElementsByClassName("btn-primary");
	var guess;
	var guesscount = 0;
	var rightCount = 0;
	var wrongCount = 0;
	var result;
	
	for(var i = 0; i < 2; i++){
		choices[i].addEventListener("click", function(){
			guess = this.id;
			guesscount++;
			judgement(singerChoice, guess);
			console.log(result);
			console.log("Right = " + rightCount + ", wrong = " + wrongCount); // For debugging		
			});
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
	}

// Function to change guess counter

// Function to replace id main-container's contents with picture & result

// Get variables together

	var jimmySongs = songList("sirJames.json");
	var kennySongs = songList("sirKenneth.json");
	var singerChoice = getRandomInt(0,2);
	var songChoice = getRandomInt(0,jimmySongs.length);
	displaySong(singerChoice, songChoice);

	


}
