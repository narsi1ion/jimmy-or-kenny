window.onload = function(){
	console.log("Your brain is moist turds");

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
	var songName = songs[song];
	document.getElementById("song-name").innerHTML = songName;	
	}
	
// Function to evaluate answer as correct or incorrect

// Function to change guess counter

// Function to replace id main-container's contents with picture & result

// Implement it all

var jimmySongs = songList("sirJames.json");
var kennySongs = songList("sirKenneth.json");
var singerChoice = getRandomInt(0,2);
var songChoice = getRandomInt(0,jimmySongs.length);
displaySong(singerChoice, songChoice);


}
