package controllers;

import models.Game;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;

public class Application extends Controller {

	public static Result index() {

		if (request().accepts("text/html")) {
			return ok(index.render());
		} else {
			return ok(Json.toJson(Game.find.all()));
		}
	}

	/*
	 * Show game
	 * 
	 * GET: /game/:id
	 */
	public static Result show(Long id) {

		Game game = Game.find.byId(id);

		return ok(Json.toJson(game));
	}

	/*
	 * Create a new game
	 * 
	 * POST: /game
	 */
	@BodyParser.Of(BodyParser.Json.class)
	public static Result create() {
		System.out.println(request());
		JsonNode json = request().body().asJson();
		ObjectNode result = Json.newObject();

		if (json == null) {
			System.out.println("json er null :o");
			result.put("status", "Couldn't create game");
			result.put("message", "Could not parse contents of request body");
			return badRequest(result);
		}

		Game game = Json.fromJson(json, Game.class);
		System.out.println("Opponent: "
				+ game.getOpponent() + " Tiles played: "
				+ game.getTilesPlayed());
		game.save();
		return ok(Json.toJson(game));
	}

	/*
	 * Update an existing game
	 * 
	 * PUT: /game/:id
	 */
	@BodyParser.Of(BodyParser.Json.class)
	public static Result update(Long id) {
		JsonNode json = request().body().asJson();

		if (json == null) {
			System.out.println("json er null :o");
			ObjectNode result = Json.newObject();
			result.put("status", "Could not update game.");
			result.put("melding", "Could not parse contents of request body.");

			return badRequest(result);
		}

		Game game = Game.find.byId(id);

		Game updatedGame = Json.fromJson(json, Game.class);
		updatedGame.setId(id);
		game.update(updatedGame);
		game.save();

		System.out
				.println("id: " + id + " opponent: "
						+ game.getOpponent() + " tilesPlayed: "
						+ game.getTilesPlayed());

		return ok(Json.toJson(game));
	}

	/*
	 * Remove tile played from game.
	 * 
	 * PUT: /game/:id/removeTile
	 */
	@BodyParser.Of(BodyParser.Json.class)
	public static Result removeTile(Long id) {
		JsonNode json = request().body().asJson();
		
		if (json == null) {
			System.out.println("json er null :o");
			ObjectNode result = Json.newObject();
			result.put("status", "Could not update game.");
			result.put("melding", "Could not parse contents of request body.");

			return badRequest(result);
		}
		
		Game game = Game.find.byId(id);

		Game updatedGame = Json.fromJson(json, Game.class);
		updatedGame.setId(id);
		game.update(updatedGame);
		game.save();

		System.out
				.println("id: " + id + " opponent: "
						+ game.getOpponent() + " tilesPlayed: "
						+ game.getTilesPlayed());

		return ok(Json.toJson(game));
	}
	
	/*
	 * Delete game
	 * 
	 * DELETE: /game/:id
	 */
	@BodyParser.Of(BodyParser.Json.class)
	public static Result delete(Long id) {

		Game game = Game.find.byId(id);

		ObjectNode result = Json.newObject();
		if (id == null) {
			result.put("status", "KO");
			result.put("message", "Missing parameter [id]");
			return badRequest(result);
		} else if (game == null) {
			result.put("status", "KO");
			result.put("message", "Missing parameter [id]");
			return badRequest(result);
		} else {
			game.delete();

			result.put("status", "OK");
			result.put("message", "Game was deleted");
			return ok(result);
		}
	}
	
	/*
	 * Count games
	 * GET: /numberOfGames
	 * 
	 */
	public static Result count() {
		return ok(Json.toJson(Game.find.all().size()));
	}


}