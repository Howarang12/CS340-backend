const db = require('../database/db-connector')

exports.addComment = async (req, res) => {
	try {

		if (
			!req.body.commentText ||
			!req.body.userID ||
			!req.body.postID
		){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { commentText, userID, postID } = req.body

		const query = `
			INSERT INTO Comments(commentText, Posts_postID, Users_userID)
				VALUES(?, ?, ?)
			`
		const [result] = await db.pool.query(query, [commentText, postID, userID])

		return res.status(200).json(result)
	} catch (error) {
		res.status(500).send({message: error})
	}
}

exports.getAllComments = async (req, res) => {
	try {
			const query = `
			SELECT Users.username, Posts.postID, commentID, commentText
				FROM Comments
				INNER JOIN Users
				ON Users.userID = Comments.Users_userID
				INNER JOIN Posts
				ON Posts.postID = Comments.Posts_postID
			`
		const [rows] = await db.pool.query(query)
		console.log(rows)
		return res.status(200).json(rows)
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.deleteCommentByID = async (req, res) => {
	try {
		
		const {id} = req.params

		// check if Comment exists
		const [comment] = await db.pool.query('SELECT * FROM Comments WHERE commentID = ?', [id])
		if (comment.length === 0) {
			return res.status(404).send({message: 'Comment not found'})
		}

		const query = `DELETE FROM Comments WHERE commentID = ?`
		await db.pool.query(query, [id])

		return res.status(204).send({message: 'Comment deleted successfully'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.editCommentByID = async (req, res) => {
	try {

		const {id} = req.params

		if (!req.body.commentText){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { commentText } = req.body
		
		const query1 = `
			SELECT commentID, commentText 
				FROM Comments 
				WHERE commentID = ?
			`
		const comment = await db.pool.query(query1, [id])

		// if comment exists, perform update
		if(comment){
			const query2 = `
			UPDATE Comments
				SET commentText = ?
				WHERE commentID = ?
			`

			await db.pool.query(query2, [commentText, id])
		}
		
		return res.status(200).json({message: 'Comment successfully updated'})
	} catch (error) {
		return res.status(500).send({message: error.message})
	}
}