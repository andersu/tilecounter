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
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
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


	public static Finder<Long, Game> getFind() {
		return find;
	}


	public static void setFind(Finder<Long, Game> find) {
		Game.find = find;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	String opponent;
	String tilesPlayed;
	
	
	public static Finder<Long, Game> find = new Finder<Long, Game>(Long.class, Game.class);
	
}