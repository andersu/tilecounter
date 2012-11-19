// TODO: Lage maps over bokstaver og antall bokstaver for Wordfeud, Ordspill osv.
// TODO: Telle bokstaver ved bildeanalyse av screenshot
// TODO: Flere games
// TODO: Responsive design
// TODO: Login
// TODO: Persistering
// TODO: Sett opp Play framework server for � persistere ting
var gameCounter = 0;

$('document').ready(function() {

	//loadGames();
	$('#newGameForm').submit(function() {
		var opponent = $("#opponentInput").val();
		var game = createGame(opponent);
		alert(JSON.stringify(game));
		postGame(game);
		// Remove text from input field
		$(this)[0].reset();

		return false;
	});
});

function loadGames() {
	$.get("http://localhost:9000/game/1", function(data) {
		alert("Data loaded: " + data);
	});
}

function updateNumberOfTilesLeft() {
	var i;

	for ( i = 1; i <= gameCounter; i++) {
		var tilesInGame = $('#tiles' + i).children(".tile");
		var usedTilesInGame = $('#tiles' + i).children(".used");
		var tilesLeft = tilesInGame.length - usedTilesInGame.length;
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
	var tilesDivId = '#tiles' + gameNumber;
	var tiles = $(tilesDivId).children(':not(.used)');

	if (letter == "*") {
		firstTile = $(tilesDivId + '> .blank').first();
	} else {
		// Get the first tile containing the given letter
		var firstLetter = tiles.children('.' + letter).first()
		var firstTile = firstLetter.parent();

	}

	if (firstTile.val() == undefined) {
		alert("Ingen flere " + letter + "-brikker igjen!");
	} else {
		toggleTile(gameNumber, firstTile);
	}
};

function postGame(game) {
	alert("postGame: " + JSON.stringify(game));

	// $.ajax("http://localhost:9000/game", {
	// data : JSON.stringify(game),
	// contentType : 'application/json',
	// type : 'POST',
	// });

	$.ajax({
		url : "http://localhost:9000/game",
		type : 'POST',
		data : JSON.stringify(game),
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function() {
			alert(data);
		}
	})
	
	// $.post('http://localhost:9000/game', {
		// json_string : JSON.stringify(game),
// 
	// });


	alert("Tried to post");

}

function updateGame(id, opponent, tilesPlayed) {
	var game = {
		id : id,
		opponent : opponent,
		tilesPlayed : tilesPlayed
	};
	$.ajax({
		url : "http://localhost:9000/game/" + id,
		method : 'PUT',
		data : {
			json_string : JSON.stringify(game)
		}
	});
}

function createGame(opponent) {
	gameCounter++;

	var gameId = 'game' + gameCounter;
	var tilesId = 'tiles' + gameCounter;
	var wordFormId = 'wordForm' + gameCounter;
	var wordInputId = 'wordInput' + gameCounter;
	var tilesLeftId = 'tilesLeft' + gameCounter;

	var gameDiv = '<div id="' + gameId + '" class="game">' + '<label id="gameTitle">Spill mot ' + opponent + '</label><div id="' + tilesId + '" class="tiles"></div>' + '</div>';
	var newWordForm = '<form id="' + wordFormId + '" class="wordForm">' + 'Nye bokstaver lagt: ' + '<input id="' + wordInputId + '" type="text"></input>' + '<button id="submit" type="submit">Legg til</button> <br />' + 'Antall brikker igjen: ' + '<label id="' + tilesLeftId + '"></label>' + '</form>';

	$('#games').append(gameDiv);

	var tilesDiv = $('#tiles' + gameCounter);
	createTiles(tilesDiv);
	// TODO: fix ugly code
	$('#' + gameId).append("<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>");
	$('#' + gameId).append(newWordForm);

	$('#' + tilesId).children(".tile").click(function() {
		toggleTile(gameCounter, $(this));
	});

	$('#' + wordFormId).submit(function() {
		var input = $('#' + wordInputId).val().toUpperCase();
		var i = 0;
		for ( i = 0; i < input.length; i++) {
			disableTile($(this), input[i]);
		}
		// Remove text from input field
		$(this)[0].reset();

		updateNumberOfTilesLeft();
		//updateGame(1, "arne,", "A");
		return false;
	});

	$('#games').css("visibility", "visible");

	updateNumberOfTilesLeft();

	var game = {
		opponent : opponent,
		tilesPlayed : ""
	};
	return game;

}

function createTiles(tilesDiv) {

	var tileDistribution = "7:A:1 3:B:4 1:C:10 5:D:1 9:E:1 4:F:2 4:G:4 3:H:3 6:I:2 2:J:4 4:K:3 5:L:2 3:M:2 6:N:1 " + "4:O:3 2:P:4 7:R:1 7:S:1 7:T:1 3:U:4 3:V:5 1:W:10 1:Y:8 1:Æ:8 2:Ø:4 2:Å:4 2:*:";

	$.map(tileDistribution.split(" "), function(tileBasis) {
		var numberOfTiles = tileBasis.split(":")[0];
		var letter = tileBasis.split(":")[1];
		var value = tileBasis.split(":")[2];

		var tile;

		var i;
		for ( i = 0; i < numberOfTiles; i++) {
			if (letter === '*') {
				tile = $('<div class="tile blank"></div>');
			} else {
				tile = $('<div class="tile">' + '<div class="letter ' + letter + '">' + letter + '</div>' + '<div class="value">' + value + '</div>' + '</div>');
			}
			tilesDiv.append(tile);
		}

		// Make the big letters smaller
		$('.W').addClass("smallerletter");
		$('.W').removeClass("letter");
		$('.Æ').addClass("smallerletter");
		$('.Æ').removeClass("letter");

		return tile;
	});
}