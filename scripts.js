window.onload = function(){
// Global variables needed for upcoming functions
	var choices = document.getElementsByClassName("btn-primary");
	var guess;
	var guessCount = 0;
	var rightCount = 0;
	var wrongCount = 0;
	var result;
	var percent;
	var quiz = document.getElementById("quiz");
	var jimmyPic = document.getElementById("jimmy-pic");
	var kennyPic = document.getElementById("kenny-pic");
	var btnJimmy = document.getElementById("btn-jimmy");
	var btnKenny = document.getElementById("btn-kenny");
	var singerChoice;
	var songChoice;
	var jimmySongs;
	var kennySongs;
	var righto = document.getElementById("righto");
	var wrongo = document.getElementById("wrongo");

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
	
// Function to change guess counter
	function countUpdate(right,total){
		percent = Math.round((right / total)*100);
		document.getElementById("guess-counter").innerHTML = 
			"You've got "+ right + " correct out of "+total+
			"!<h4> Certified "+percent+"% island ready.</h4>";
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

// Helpful function to switch class from "off" to "on" or vice versa
	function toggle(elem){
		if(elem.className == "on"){
			elem.setAttribute("class","off");
		}
		else{
			elem.setAttribute("class", "on");
		}
	}
	
// Function to display the condescending or congratulatory message
	function accolades(grade){
		if(grade == "correct"){
			toggle(righto);
		}
		else if(grade == "incorrect"){
			toggle(wrongo);
		}
	}

// Function to replace div "quiz"'s contents with picture & button divs
	function showPic(singer){
		toggle(quiz);
		if(singer == "0"){
			toggle(jimmyPic);
			btnJimmy.addEventListener("click", function(){
				reset();
				});			
		}
		else if(singer == "1"){
			toggle(kennyPic);
			btnKenny.addEventListener("click", function(){
				reset();
				});	
		}
	}
	
// Function to make "try again" button work
	function reset(){
		jimmyPic.setAttribute("class","off");
		kennyPic.setAttribute("class","off");
		setup();
		quiz.setAttribute("class","on");
		righto.setAttribute("class","off");
		wrongo.setAttribute("class","off");
	}
	
// Function to execute on guess click
	function guessClicked(button){
		guess = button;
		guessCount++;
		judgement(singerChoice, guess);
		console.log(result);
		console.log("Right = " + rightCount + ", wrong = " + wrongCount); // For debugging	
		showPic(singerChoice);
		accolades(result);
		
	}
	
// Set up the page!
	jimmySongs = songList("sirJames.json");
	kennySongs = songList("sirKenneth.json");
	function setup(){
		singerChoice = getRandomInt(0,2);
		songChoice = getRandomInt(0,jimmySongs.length);
		displaySong(singerChoice, songChoice);
	}

	
// Set up the page and run the whole darn thing
	setup();
	for(var i = 0; i < 2; i++){
		choices[i].addEventListener("click", function(){
			guessClicked(this.id);
			}
		);
	}
}
