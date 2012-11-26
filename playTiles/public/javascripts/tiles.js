// TODO: Legge til Ordspill og vanlig Scrabble som valg i tillegg til Wordfeud
// TODO: Telle bokstaver ved bildeanalyse av screenshot
// TODO: Responsive design
// TODO: Login
// TODO: Persistering når serveren går ned
// TODO: Brukerprofil

var gameCount = 0;
var loginForm;
var splashDiv;
var user;
$('document').ready(function() {

	if ($(window).width() < 1000) {
		$('.logo').attr("src", "assets/images/logotext.png")
	}

	$('.loginForm').submit(function() {

		var username = $('.username').val();
		user = username;
		var password = $('.password').val();

		var newGameForm = '<form class="newGameForm">' + 'Motstander: ' + '<input id="opponentInput" type="text"/>' + '<button id="newGameButton">Nytt spill</button>' + '</form>';

		$(this)[0].reset();
		loginForm = $(this);
		splash = $('.splash');
		splash.remove();
		$('#games').before(newGameForm);

		$('.loginForm').remove();
		var userDiv = '<div class="userdiv">' + username + '</div>';
		//$('.loginDiv').append(userDiv);
		$('.userdiv').append('<img class="userimg" src="assets/images/User.png")"/>');

		var numberOfGames = $.get("http://localhost:9000/numberOfGames", function(numberOfGames) {
			loadGames(username);
		});

		$('.newGameForm').submit(function() {

			var opponent = $("#opponentInput").val();
			var game = createGame(++gameCount, opponent);
			postGame(game);
			// Remove text from input field
			$(this)[0].reset();

			return false;
		});

		return false;
	});
});

function loadGames(username) {
	var i;
	var games;
	games = $.get("http://localhost:9000/game/" + username, function(games) {
		for ( i = 0; i < games.length; i++) {

			createGame(games[i].id, games[i].opponent);
			gameCount++;
			disableTiles(games[i].id, games[i].tilesPlayed);
		}
		return games.length;
	})
}

function updateNumberOfTilesLeft(id) {
	var i;

	var tilesInGame = $('#tiles' + id).children(".tile");
	var usedTilesInGame = $('#tiles' + id).children(".used");
	var tilesLeft = tilesInGame.length - usedTilesInGame.length;
	$('#tilesLeft' + id).text(tilesLeft);

}

function removeFromTilesPlayed(letter) {

}

function toggleTile(gameId, tile) {
	var gameId = tile.parent().attr('id').substring(5);
	var opponent = $('#opponent' + gameId).text();
	
	if (tile.hasClass("used")) {
		tile.removeClass("used");
		tile.unbind("click");


		tile.click(function() {
			toggleTile(gameId, $(this));
			updateGame(gameId, opponent, "-" + $(this).children('.letter').text());
		});

		if (tile.text() == "") {
			tile.addClass("blank");
			removeFromTilesPlayed("*");
		} else {
			tile.addClass(tile.text());
			removeFromTilesPlayed(tile.text());
		}

	} else {
		tile.addClass("used");
		tile.removeClass(tile.text());
		tile.unbind("click");
		tile.click(function() {
			toggleTile(gameId, $(this));
			updateGame(gameId, opponent, "-" + $(this).children('.letter').text());
		});	}

	updateNumberOfTilesLeft(gameId);
}

function disableTile(gameId, letter) {

	var firstTile;

	var tilesDivId = '#tiles' + gameId;
	var tiles = $(tilesDivId).children(':not(.used)');

	if (letter == "*") {
		firstTile = $(tilesDivId).children('.blank:not(.used)').first();
	} else {
		// Get the first tile containing the given letter
		var firstLetter = tiles.children('.' + letter).first()
		var firstTile = firstLetter.parent();

	}

	if (firstTile.val() == undefined) {
		alert("Ingen flere " + letter + "-brikker igjen!");
	} else {
		toggleTile(gameId, firstTile);
	}

};

function postGame(game) {
	$.ajax({
		url : "http://localhost:9000/game",
		type : 'POST',
		data : JSON.stringify(game),
		contentType : "application/json; charset=utf-8",
		dataType : "json",
	})

}

function updateGame(id, opponent, tilesPlayed) {
	var game = {
		player : user,
		opponent : opponent,
		tilesPlayed : tilesPlayed
	};
	$.ajax({
		url : "http://localhost:9000/game/" + user + "/" + id,
		type : 'PUT',
		data : JSON.stringify(game),
		contentType : "application/json; charset=utf-8",
		dataType : "json",
	});
}

function deleteGame(id) {
	var game = {
		id : id
	};
	$.ajax({
		url : "http://localhost:9000/game/" + id,
		type : 'DELETE',
		data : JSON.stringify(game),
		contentType : "application/json; charset=utf-8",
		dataType : "json",
	});
}

function disableTiles(gameId, tilesPlayed, updateDatabase) {
	var i = 0;
	for ( i = 0; i < tilesPlayed.length; i++) {
		disableTile(gameId, tilesPlayed[i]);
	}

	var opponent = $('#opponent' + gameId).text();
	updateNumberOfTilesLeft(gameId);
	if (updateDatabase) {
		updateGame(gameId, opponent, tilesPlayed);
	}
}

function createGame(id, opponent) {

	var gameId = 'game' + id;
	var tilesId = 'tiles' + id;
	var wordFormId = 'wordForm' + id;
	var wordInputId = 'wordInput' + id;
	var tilesLeftId = 'tilesLeft' + id;
	var opponentId = 'opponent' + id;

	var gameDiv = '<div id="' + gameId + '" class="game">' + '<label id="gameTitle">' + 'Spill mot ' + '<label id="' + opponentId + '">' + opponent + '</label>' + '</label>' + '<a class="close">X</a>' + '<div id="' + tilesId + '" class="tiles"></div>' + '</div>';
	var newWordForm = '<form id="' + wordFormId + '" class="wordForm">' + 'Nye bokstaver lagt: ' + '<input id="' + wordInputId + '" type="text"></input>' + '<button id="submit" type="submit">Legg til</button> <br />' + 'Antall brikker igjen: ' + '<label id="' + tilesLeftId + '"></label>' + '</form>';

	$('#games').append(gameDiv);
	$('#' + gameId).children('.close').click(function() {
		var id = $(this).parent().attr('id')[4];
		$(this).parent().remove();
		deleteGame(id);
	});

	var tilesDiv = $('#tiles' + id);
	createTiles(tilesDiv);
	// TODO: fix ugly code
	$('#' + gameId).append("<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>");
	$('#' + gameId).append('<div>' + newWordForm + '</div>');

	// if ($(window).width() < 1000) {
		// $('#' + tilesId).children('.tile').bind("touchstart", function(ev) {
			// toggleTile(id, $(this));
			// updateGame(id, opponent, $(this).children('.letter').text());
// 
			// // says ev.touches is undefined
		// });
	// }
	$('#' + tilesId).children('.tile').click(function() {
		toggleTile(id, $(this));
		updateGame(id, opponent, $(this).children('.letter').text());
	});

	$('#' + wordFormId).submit(function() {
		var gameId = wordFormId[8];
		var input = $('#' + wordInputId).val().toUpperCase();

		disableTiles(gameId, input, true);

		// Remove text from input field
		$(this)[0].reset();
		return false;
	});

	$('#games').css("visibility", "visible");

	updateNumberOfTilesLeft();

	var game = {
		player : user,
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