// TODO: Lage maps over bokstaver og antall bokstaver for Wordfeud, Ordspill osv.
// TODO: Telle bokstaver ved bildeanalyse av screenshot
// TODO: Flere games
// TODO: Responsive design
// TODO: Login
// TODO: Persistering

$('document').ready(function() {
	
	updateNumberOfTilesLeft();

	$('#newGameForm').submit(function()  {
		var opponent = $("opponentInput").val();
		createGame(opponent);
		// Remove text from input field
		$(this)[0].reset();
		return false;
	});
	
	$('#wordForm').submit(function() {
		
		var input = $("#wordInput").val().toUpperCase();

		var i = 0;
		for (i = 0; i < input.length; i++) {
			disableTile(input[i]);
		}
		// Remove text from input field
		$(this)[0].reset();
		
		updateNumberOfTilesLeft();
		return false;
	});

	$("div.tile").click(function() {
		toggleTile($(this));
	});
});

function updateNumberOfTilesLeft() {
	var tilesLeft = $(".tile").length - $(".used").length;
	$("#tilesLeft").text(tilesLeft);
}
function toggleTile(tile) {
	if (tile.hasClass("used")) {
		tile.removeClass("used");
		if (tile.text() == "") {
			tile.addClass("blank");
		}
		else {
			tile.addClass(tile.text());
		}
	} else {
		tile.addClass("used");
		tile.removeClass(tile.text());
	}
	
	updateNumberOfTilesLeft();
}

function disableTile(letter) {

	var firstTile; 
	if (letter == "*") {
		firstTile = $('.blank').first();
	}
	else {
		firstTile = $('.' + letter).first();
	}
	if (firstTile.val() == undefined) {
		alert("Ingen flere " + letter + "-brikker igjen!");
	} 
	else if (firstTile.text() == "") {
		firstTile.addClass("used");
		firstTile.removeClass("blank");
	}
	else {
		firstTile.addClass("used");
		firstTile.removeClass(letter);
	}
};

function addTile(letter) {
	if (letter == "") {
		$('#tiles').append($('<div class="tile blank"></div>'));
	} else {
		$('#tiles').append(
				$('<div class="tile ' + letter + '">' + letter + '</div>'));
	}

}

function createGame(opponent) {
	$('#gameTitle').text('Spill mot ' + opponent);
	createTiles();
	$('#wordForm').css("visibility", "visible");
}

function createTiles() {
	var i;

	// Add 7 As
	for (i = 0; i < 7; i++) {
		addTile("A");
	}

	// Add 3 Bs
	for (i = 0; i < 3; i++) {
		addTile("B");
	}

	// Etc.
	addTile("C");

	for (i = 0; i < 5; i++) {
		addTile("D");
	}

	for (i = 0; i < 9; i++) {
		addTile("E");
	}

	for (i = 0; i < 4; i++) {
		addTile("F");
	}

	for (i = 0; i < 4; i++) {
		addTile("G");
	}

	for (i = 0; i < 3; i++) {
		addTile("H");
	}

	for (i = 0; i < 6; i++) {
		addTile("I");
	}

	for (i = 0; i < 2; i++) {
		addTile("J");
	}

	for (i = 0; i < 4; i++) {
		addTile("K");
	}

	for (i = 0; i < 5; i++) {
		addTile("L");
	}

	for (i = 0; i < 3; i++) {
		addTile("M");
	}

	for (i = 0; i < 6; i++) {
		addTile("N");
	}

	for (i = 0; i < 4; i++) {
		addTile("O");
	}

	for (i = 0; i < 2; i++) {
		addTile("P");
	}

	for (i = 0; i < 7; i++) {
		addTile("R");
	}

	for (i = 0; i < 7; i++) {
		addTile("S");
	}

	for (i = 0; i < 7; i++) {
		addTile("T");
	}

	for (i = 0; i < 3; i++) {
		addTile("U");
	}

	for (i = 0; i < 3; i++) {
		addTile("V");
	}

	addTile("W");
	addTile("Y");
	addTile("Æ");

	for (i = 0; i < 2; i++) {
		addTile("Ø");
	}

	for (i = 0; i < 2; i++) {
		addTile("Å");
	}

	for (i = 0; i < 2; i++) {
		addTile("");
	}

}