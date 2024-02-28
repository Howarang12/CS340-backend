-- Group 109
-- Sean Doyle
-- Howard Wang

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Table structure for Users
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
	userID INT NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	PRIMARY KEY(userID)
);

-- Dump data for Users
INSERT INTO Users(email, username, firstName, lastName)
	VALUES('johndoe@gmail.com', 'jdoe', 'John', 'Doe'),
	('janedoe@gmail.com', 'janed', 'Jane', 'Doe'),
	('foobar@gmail.com', 'fbar', 'Foo', 'Bar'),
	('wanghow@oregonstate.edu', 'wanghow', 'Howard', 'Wang');


-- Table Structure for Groups
DROP TABLE IF EXISTS Groups;

CREATE TABLE Groups(
	groupID INT NOT NULL AUTO_INCREMENT,
	groupName varchar(255) NOT NULL,
	PRIMARY KEY(groupID)
);

-- Dump data for Groups
INSERT INTO Groups (groupName)
	VALUES('CS361'), ('CS340'), ('CS325');

-- Intersection Table for userGroup
DROP TABLE IF EXISTS userGroups;

CREATE TABLE userGroups(
	Users_userID INT NOT NULL,
	Groups_groupID INT NOT NULL,
	FOREIGN KEY(Users_userID) REFERENCES Users(userID) ON DELETE CASCADE,
	FOREIGN KEY(Groups_groupID) REFERENCES Groups(groupID) ON DELETE CASCADE
);

-- Dump data for userGroup
INSERT INTO userGroups(Users_userID, Groups_groupID)
	VALUES ((SELECT userID FROM Users WHERE username='jdoe'), (SELECT groupID FROM Groups WHERE groupName='CS361')),
	((SELECT userID FROM Users WHERE username='jdoe'), (SELECT groupID FROM Groups WHERE groupName='CS340')),
	((SELECT userID FROM Users WHERE username='jdoe'), (SELECT groupID FROM Groups WHERE groupName='CS325'));

-- Table structure for Posts
DROP TABLE IF EXISTS Posts;

CREATE TABLE Posts(
	postID INT NOT NULL AUTO_INCREMENT,
	description TEXT,
	Users_userID INT NOT NULL,
	createdAt DATETIME,
	PRIMARY KEY(postID),
	FOREIGN KEY(Users_userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Dump data for Posts
INSERT INTO Posts(description, Users_userID, createdAt)
	VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	(SELECT userID FROM Users WHERE username = 'jdoe'), NOW()),
	('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
	(SELECT userID FROM Users WHERE username = 'janed'), NOW()),
	('At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
	(SELECT userID FROM Users WHERE username = 'fbar'), NOW());


-- Table Structure for Comments
DROP TABLE IF EXISTS Comments;

CREATE TABLE Comments(
	commentID INT NOT NULL AUTO_INCREMENT,
	commentText varchar(255) NOT NULL,
	Posts_postID INT NOT NULL,
	Users_userID INT NOT NULL,
	PRIMARY KEY(commentID),
	FOREIGN KEY(Posts_postID) REFERENCES Posts(postID) ON DELETE CASCADE,
	FOREIGN KEY(Users_userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Dump data for Comments
INSERT INTO Comments(commentText, Posts_postID, Users_userID)
	VALUES('Hello Post 1!', 1, (SELECT userID FROM Users WHERE username='wanghow')),
	('Hello Post 2!', 2, (SELECT userID FROM Users WHERE username='wanghow')),
	('Hello Post 3!', 3, (SELECT userID FROM Users WHERE username='wanghow'));

-- Table structure for Likes
DROP TABLE IF EXISTS Likes;

CREATE TABLE Likes(
	likeID INT NOT NULL AUTO_INCREMENT,
	likeStatus BOOLEAN DEFAULT 0,
	Users_userID INT NOT NULL,
	Posts_postID INT NOT NULL,
	PRIMARY KEY(likeID),
	FOREIGN KEY(Users_userID) REFERENCES Users(userID) ON DELETE CASCADE,
	FOREIGN KEY(Posts_postID) REFERENCES Posts(postID) ON DELETE CASCADE
);

INSERT INTO Likes(likeStatus, Users_userID, Posts_postID)
	VALUES(1, (SELECT userID FROM Users WHERE username='wanghow'), 1),
	(1, (SELECT userID FROM Users WHERE username='jdoe'), 1),
	(1, (SELECT userID FROM Users WHERE username='wanghow'), 3);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;