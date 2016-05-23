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

// Function to display song choice & remove song from list of possibilities
	function displaySong(singer){
		let songs;
		if(singer == 0){
			songs = jimmySongs;
		}
		else{
			songs = kennySongs;
		}
		//If one of the song lists runs out, this prompts the user to refresh the page
		if(songs.length == 50){
			document.getElementById("song-name").innerHTML = "<h4>You've reached the end of the library. Refresh the page to regenerate the lists and try again!</h4>";
			document.getElementById("jimmy").setAttribute("class", "off");
			document.getElementById("kenny").setAttribute("class", "off");
		}
		//If the song lists are populated, fire away!
		else{
		document.getElementById("song-name").innerHTML = songs.splice(getRandomInt(0,songs.length),1);
		}
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
		}
		else if(singer == "1"){
			toggle(kennyPic);
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
	
// Function to execute when you click your guess
	function guessClicked(button){
		guess = button;
		guessCount++;
		judgement(singerChoice, guess);
		showPic(singerChoice);
		accolades(result);
		
	}

// Set up the page!
	jimmySongs = songList("sirJames.json"),0;
	kennySongs = songList("sirKenneth.json"),1;
	function setup(){
		singerChoice = getRandomInt(0,2);
		displaySong(singerChoice);
	}
	

// Set up the page and run the whole darn thing
	setup();
	btnKenny.addEventListener("click", function(){
		reset();
		});
	btnJimmy.addEventListener("click", function(){
		reset();
		});	
	for(var i = 0; i < 2; i++){
		choices[i].addEventListener("click", function(){
			guessClicked(this.id);
			}
		);
	}
}
