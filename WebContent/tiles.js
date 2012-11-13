// TODO: Lage maps over bokstaver og antall bokstaver for Wordfeud, Ordspill osv.
// TODO: Telle bokstaver ved bildeanalyse av screenshot
// TODO: Flere games
// TODO: Responsive design
// TODO: Login
// TODO: Persistering
// TODO: Sett opp Play framework server for å persistere ting
var gameCounter = 0;

$('document').ready(function() {

	$('#newGameForm').submit(function() {
		var opponent = $("#opponentInput").val();
		createGame(opponent);
		// Remove text from input field
		$(this)[0].reset();
		return false;
	});
	
	//getDataFromDatabase();
});

function updateNumberOfTilesLeft() {
	var i;
	
	for (i = 1; i <= gameCounter; i++) {
		var tilesInGame = $('#tiles' + i).children(".tile");
		var usedTilesInGame = $('#tiles' + i).children(".used");
		var tilesLeft =  tilesInGame.length - usedTilesInGame.length;
		$('#tilesLeft' + i).text(tilesLeft);
	}
}

function toggleTile(gameNumber, tile) {
	if (tile.hasClass("used")) {
		tile.removeClass("used");
		if (tile.text() == "") {
			tile.addClass("blank");
		} else {
			tile.addClass(tile.text());
		}
	} else {
		tile.addClass("used");
		tile.removeClass(tile.text());
	}

	updateNumberOfTilesLeft();
}

function disableTile(form, letter) {

	var firstTile;
	 
	var gameNumber = form.attr("id")[8];
	if (letter == "*") {
		firstTile = $('#tiles' + gameNumber).children('.blank').first();
	} else {
		firstTile = $('#tiles' + gameNumber).children('.' + letter).first();
	}
	if (firstTile.val() == undefined) {
		alert("Ingen flere " + letter + "-brikker igjen!");
	} else if (firstTile.text() == "") {
		firstTile.addClass("used");
		firstTile.removeClass("blank");	
	} else {
		firstTile.addClass("used");
		firstTile.removeClass(letter);
	}
};

function addTile(tilesDiv, letter) {
	if (letter == "") {
		tilesDiv.append($('<div class="tile blank"></div>'));
	} else {
		
		tilesDiv.append($('<div class="tile ' + letter + '">' + letter
				+ '</div>'));
	}
}

function createGame(opponent) {
	gameCounter++;
	
	var gameId = 'game' + gameCounter;
	var tilesId = 'tiles' + gameCounter;
	var wordFormId = 'wordForm' + gameCounter;
	var wordInputId = 'wordInput' + gameCounter;
	var tilesLeftId = 'tilesLeft' + gameCounter;
	
	var gameDiv = '<div id="' + gameId + '" class="game">' + '<label id="gameTitle">Spill mot '
			+ opponent + '</label><div id="' + tilesId + '" class="tiles"></div>' + '</div>';
	var newWordForm = '<form id="' + wordFormId + '" class="wordForm">' + 
						'Nye bokstaver lagt: ' + 
						'<input id="' + wordInputId + '" type="text"></input>' +
						'<button id="submit" type="submit">Legg til</button> <br />' + 
						'Antall brikker igjen: ' +
						'<label id="' + tilesLeftId + '"></label>' +
					  '</form>';
	
	$('#games').append(gameDiv);
	
	var tilesDiv = $('#tiles' + gameCounter);
	createTiles(tilesDiv);
	// TODO: fix ugly code
	$('#' + gameId).append("<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>");
	$('#' + gameId).append(newWordForm);


	$('#' + tilesId).children(".tile").click(function() {
		toggleTile(gameCounter, $(this));
	});
	
	$('#' + wordFormId).submit(function() {
		var input = $('#' + wordInputId).val().toUpperCase();
		var i = 0;
		for (i = 0; i < input.length; i++) {
			disableTile($(this), input[i]);
		}
		// Remove text from input field
		$(this)[0].reset();
		
		
		updateNumberOfTilesLeft();
		return false;
	});
	
	$('#games').css("visibility", "visible");

	updateNumberOfTilesLeft();
	

	

}

function getDataFromDatabase() {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  alert("in the if");
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
		alert("i state-if");
	    $("#txtHint").innerHTML=xmlhttp.responseText;
	    }
	  };
	alert("skal kalle php");
	xmlhttp.open("GET","index.php",true);
	xmlhttp.send();
	alert("php kalt");
}

function createTiles(tilesDiv) {
	var i;

	// Add 7 As
	for (i = 0; i < 7; i++) {
		addTile(tilesDiv, "A");
	}

	// Add 3 Bs
	for (i = 0; i < 3; i++) {
		addTile(tilesDiv, "B");
	}

	// Etc.
	addTile(tilesDiv, "C");

	for (i = 0; i < 5; i++) {
		addTile(tilesDiv, "D");
	}

	for (i = 0; i < 9; i++) {
		addTile(tilesDiv, "E");
	}

	for (i = 0; i < 4; i++) {
		addTile(tilesDiv, "F");
	}

	for (i = 0; i < 4; i++) {
		addTile(tilesDiv, "G");
	}

	for (i = 0; i < 3; i++) {
		addTile(tilesDiv, "H");
	}

	for (i = 0; i < 6; i++) {
		addTile(tilesDiv, "I");
	}

	for (i = 0; i < 2; i++) {
		addTile(tilesDiv, "J");
	}

	for (i = 0; i < 4; i++) {
		addTile(tilesDiv, "K");
	}

	for (i = 0; i < 5; i++) {
		addTile(tilesDiv, "L");
	}

	for (i = 0; i < 3; i++) {
		addTile(tilesDiv, "M");
	}

	for (i = 0; i < 6; i++) {
		addTile(tilesDiv, "N");
	}

	for (i = 0; i < 4; i++) {
		addTile(tilesDiv, "O");
	}

	for (i = 0; i < 2; i++) {
		addTile(tilesDiv, "P");
	}

	for (i = 0; i < 7; i++) {
		addTile(tilesDiv, "R");
	}

	for (i = 0; i < 7; i++) {
		addTile(tilesDiv, "S");
	}

	for (i = 0; i < 7; i++) {
		addTile(tilesDiv, "T");
	}

	for (i = 0; i < 3; i++) {
		addTile(tilesDiv, "U");
	}

	for (i = 0; i < 3; i++) {
		addTile(tilesDiv, "V");
	}

	addTile(tilesDiv, "W");
	addTile(tilesDiv, "Y");
	addTile(tilesDiv, "Æ");

	for (i = 0; i < 2; i++) {
		addTile(tilesDiv, "Ø");
	}

	for (i = 0; i < 2; i++) {
		addTile(tilesDiv, "Å");
	}

	for (i = 0; i < 2; i++) {
		addTile(tilesDiv, "");
	}
}