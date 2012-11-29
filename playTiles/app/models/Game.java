package models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import play.db.ebean.Model;

@Entity
public class Game extends Model {

	private static final long serialVersionUID = -1417974568774077237L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String player;
	String opponent;
	String tilesPlayed;
	String gameType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPlayer() {
		return player;
	}

	public void setPlayer(String player) {
		this.player = player;
	}

	public String getOpponent() {
		return opponent;
	}

	public void setOpponent(String opponent) {
		this.opponent = opponent;
	}

	public String getTilesPlayed() {
		return tilesPlayed;
	}

	public void setTilesPlayed(String tilesPlayed) {
		this.tilesPlayed = tilesPlayed;
	}

	public String getGameType() {
		return gameType;
	}

	public void setGameType(String gameType) {
		this.gameType = gameType;
	}

	public static Finder<Long, Game> getFind() {
		return find;
	}

	public static void setFind(Finder<Long, Game> find) {
		Game.find = find;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void update(Game updatedGame) {
		this.setId(updatedGame.getId());
		this.setPlayer(updatedGame.getPlayer());
		this.setOpponent(updatedGame.getOpponent());
		this.setGameType(updatedGame.getGameType());
		
		if (updatedGame.getTilesPlayed().startsWith("-")) {
			System.out.println("starts with -");

			String letterToReplace = updatedGame.getTilesPlayed().substring(1);
			if (letterToReplace.equals("*")) {
				this.setTilesPlayed(this.tilesPlayed.replaceFirst("\\*", ""));
			}
			else {
				this.setTilesPlayed(this.tilesPlayed.replaceFirst(letterToReplace, ""));
			}
			System.out.println("letterToReplace: " + letterToReplace);
		} 
		else {
			this.setTilesPlayed(this.tilesPlayed + updatedGame.getTilesPlayed());
		}
	}

	public String toString() {
		return "player: " + player + " id: " + id + " opponent: " + opponent
				+ " tilesPlayed: " + tilesPlayed + " gameType: " + gameType;
	}

	public static Finder<Long, Game> find = new Finder<Long, Game>(Long.class,
			Game.class);

}