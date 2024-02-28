-- Group 109
-- Sean Doyle
-- Howard Wang

-- get Users username and ID's to populate dropdown
SELECT userID, username  
	FROM Users;

-- get all Users and their email, username, firstName, and lastName for the Users page
SELECT userID, email, username, firstName, lastName  
	FROM Users;

-- add a new User
INSERT INTO Users(email, username, firstName, lastName)
	VALUES(:emailInput, :usernameInput, :fnameInput, :lnameInput);

-- delete a user
DELETE FROM Users WHERE userID = :user_ID_selected_from_dropdown;

-- update a User's data based on submission of the Update User form 
SELECT userID, email, username, firstName, lastName  
	FROM Users 
	WHERE userID = :user_ID_selected_from_dropdown;

UPDATE Users
	SET email = :emailInput, username = :usernameInput, firstName = :fnameInput,
	lastName =- :lnameInput 
	WHERE userID = :user_ID_selected_from_dropdown;


-- get all Group and their groupID and groupName for the Groups page, also select for drop down population, can be used for dropdowns
SELECT groupID, groupName   
	FROM Groups;

-- add a new Group
INSERT INTO Groups (groupName)
	VALUES(:groupNameInput);

-- delete a Group
DELETE FROM Groups WHERE groupID = :group_ID_selected_from_dropdown;

-- update a Group's data based on submission of the Update Group form 
SELECT groupID, groupName 
	FROM Groups 
	WHERE groupID = :group_ID_selected_from_dropdown;

UPDATE Groups
	SET groupName = :groupNameInput
	WHERE groupID = :group_ID_selected_from_dropdown;


-- get all userGroups and  their Groups_groupID and Users_userID along with the Groups.groupName and the Users.userName for the groups page
SELECT userGroups.Users_userID,Users.username, userGroups.Groups_groupID, Groups.groupName
	FROM userGroups
		INNER JOIN Users
		ON Users.userID = userGroups.Users_userID
		INNER JOIN Groups
		ON Groups.groupID = userGroups.Groups_groupID;

-- add a new userGroups
INSERT INTO userGroups (Users_userID, Groups_groupID)
	VALUES(:userIDInput, :groupIDInput);

-- delete a userGroups
DELETE FROM userGroups WHERE userGroupID = :userGroup_ID_selected_from_browse_userGroup_page;

-- update a userGroup's data based on submission of the Update userGroups form 
SELECT groupID, groupName 
	FROM Groups 
	WHERE groupID = :group_ID_selected_from_browse_group_page;

UPDATE Groups
	SET groupname = :groupnameInput
	WHERE groupID = :group_ID_selected_from_browse_group_page;
	

-- Get post description and the corresponding username for the post page
SELECT Posts.postID, Users.username, description, createdAt
	FROM Users
		INNER JOIN Posts
		ON Users.userID = Users_userID;

-- add a new Post
INSERT INTO Posts(description, Users_userID, createdAt)
	VALUES (:descriptionInput,
	:userIDInput, NOW());

-- delete a Post
DELETE FROM Posts WHERE postID = :postID_selected_from_browse_post_page;

-- update a Post's data based on submission of the Update Post form 
SELECT postID, description
	FROM Posts
	WHERE postID = :post_ID_selected_from_browse_post_page;

UPDATE Posts
	SET descripton = :descriptionInput, Users_userID = :userIDInput, createdAt = NOW()
	WHERE postID = :post_ID_selected_from_browse_post_page;


-- Get Comment's data along with it's corresponding Post and User
SELECT Users.username, Posts.postID, commentID, commentText
	FROM Users
		INNER JOIN Posts
		ON Users.userID = Posts.Users_userID
		INNER JOIN Comments
		ON Users.userID = Comments.Users_userID;

-- add a new Comment
INSERT INTO Comments(commentText, Posts_postID, Users_userID)
	VALUES(:commentTextInput, :postIDInput, :userIDInput);

-- delete a Comment
DELETE FROM Comments WHERE commentID = :comment_ID_selected_from_browse_comment_page;

-- update a Comment's data based on submission of the Update Comment form 
SELECT commentID, commentText 
	FROM Comments 
	WHERE commentID = :comment_ID_selected_from_browse_comment_page;

UPDATE Comments
	SET commentText = :commentTextInput
	WHERE commentID = :comment_ID_selected_from_browse_comment_page;


-- Get Likes's data along with it's corresponding Post and User
SELECT likeID, likeStatus, Users.username, Posts.postID
	FROM Likes
		INNER JOIN Users
		ON Likes.Users_userID = Users.userID
		INNER JOIN Posts
		ON Likes.Posts_postID = Posts.postID;

-- add a new Like
INSERT INTO Likes(likeStatus, Users_userID, Posts_postID)
	VALUES(:likeInput, :userIDInput, :postIDInput);

-- delete a Like
DELETE FROM Likes WHERE likeID = :like_ID_selected_from_browse_like_page;

-- update a Like's data based on submission of the Update Like form 
SELECT likeID, likeStatus
	FROM Likes 
	WHERE likeID = :like_ID_selected_from_browse_like_page;

UPDATE Likes
	SET likeStatus = :likeInput
	WHERE likeID = :like_ID_selected_from_browse_like_page;