//variabelen
let questbutton = document.getElementById("questbutton");
let questitems = document.getElementById("questitems");
let currentexp = 0;
let exptext = document.getElementById("currentexp");
let leveltext = document.getElementById("currentlevel");
let level = 0;
let openable = false;
let gold = 0;
let goldtext = document.getElementById("gold");
let questrewardtext = document.getElementById("quest2");
let stickerbook = document.getElementById("stickerbook")
let boekshow = document.getElementById("boekshow");
let music = document.getElementById("music");
let musicmenu = document.getElementById("musicmenu")
let trophys = document.getElementById("trophys");
let trophymenu = document.getElementById("trophymenu")
let stickers = document.getElementById("stickers");
let stickermenu = document.getElementById("stickermenu")
let startingmenu = document.getElementById("startingmenu")

//startbutton function


	





//shopitems 













//boekcode






questbutton.addEventListener("click", function () {
	
	questitems.style.opacity = "1"




})







//questcode

questitems.addEventListener("click", function () {
	questitems.style.opacity = "0"
})


let baronquest = document.getElementById("quest1")
var current1 = 0;
var container1 = document.getElementById(".gamecontainer");
let claimed1;
let claimed2;
let claimed3;
let quest1done = false;
let completedbaron = false;

//krijg rewards van de quest met toggles
questrewardtext.addEventListener("click", function () {

	if (claimed1 == "unclaimable") {
		
	}
	else if (questbaronclaim = false) {
		console.log("nee")
	}

	if ( claimed2 == "unclaimable" ) {
	
		claimed2 = "claimable"
	}


	if ( claimed3 == "unclaimable" ) {
	
		claimed3 =  "claimable"
	}
	else if (questbaronclaim = false) {
		console.log("nee")
	}

	baronquest.innerHTML = "There are no avaiable quest right now"
	questbaronclaim = false
	questrewardtext.style.display = "none"






})




//audiofiles variables


let panic = new Audio();
let pirate = new Audio();
panic.src = "../../chapters/scream_for_amongus.mp3";
pirate.src= "../../music/pirate_music.mp3";


function changeMenu() {
	startingmenu.style.opacity = "0"
	panic.play();
pirate.play();
}
//audio functions


panic.volume = 1;
pirate.volume = 0.4;



panic.addEventListener("play", function() {
	pirate.volume = "0.1"
})

panic.addEventListener("ended", function() {
	pirate.volume = "0.4"
})
//quest codes


//settingsvolume


































