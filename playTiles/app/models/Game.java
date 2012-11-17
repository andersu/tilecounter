package models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import play.db.ebean.Model;

@Entity
public class Game extends Model {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1417974568774077237L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;	
	String opponent;
	String lettersPlayed;
	
	public Game(Long id, String opponent, String lettersPlayed) {
		this.id = id;
		this.opponent = opponent;
		this.lettersPlayed = lettersPlayed;
	}
	
	public static Finder<Long, Game> find = new Finder<Long, Game>(Long.class, Game.class);
	
}