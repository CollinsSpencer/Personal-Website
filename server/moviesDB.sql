-- Movies Project
-- Spencer Collins
-- for use on SpencerCollins.net

USE movies;

DROP TABLE IF EXISTS Movie;

CREATE TABLE Movie (
    movieId INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL DEFAULT '',
    notes VARCHAR(500),
    rating TINYINT(4) NOT NULL DEFAULT 0,
    priority TINYINT(4) NOT NULL DEFAULT 2,
    watched BOOLEAN NOT NULL DEFAULT FALSE
);

-- seed data --

INSERT INTO Movie (title, rating, priority, watched) 
    VALUES ("Harry Potter", 5, 3, TRUE);

INSERT INTO Movie (title, priority) 
    VALUES ("Dr. Strange", 3);

INSERT INTO Movie (title, rating, priority, watched) 
    VALUES ("Kubo", 3, 1, TRUE);
    
INSERT INTO Movie (title, rating, priority, watched) 
    VALUES ("Interstellar", 4, 1, TRUE);

INSERT INTO Movie (title, rating, priority, watched) 
    VALUES ("Good Will Hunting", 5, 1, TRUE);

INSERT INTO Movie (title, notes, rating, priority, watched) 
    VALUES ("La La Land", "It had a Great Gatsby-like feel to it.", 5, 1, TRUE);

INSERT INTO Movie (title) 
    VALUES ("Kingsman: The Golden Circle");
