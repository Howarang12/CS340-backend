const db = require('../database/db-connector')

exports.addPost = async (req, res) => {
	try {
		if (
			!req.body.description ||
			!req.body.userID 
		){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { description, userID } = req.body

		const query = `
		INSERT INTO Posts(description, Users_userID, createdAt)
			VALUES (?, ?, NOW())
		`

		const [result] = await db.pool.query(query, [description, userID])
		return res.status(200).json(result)

	} catch (error) {
		console.log(error)
		res.status(500).send({message: error})
	}
}

exports.getAllPosts = async (req, res) => {
	try {
		const query = `
			SELECT Posts.postID, Users.username, description, createdAt
				FROM Users
				INNER JOIN Posts
				ON Users.userID = Users_userID
			`
		const [rows] = await db.pool.query(query)

		return res.status(200).json(rows)
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.deletePostByID = async (req, res) => {
	try {
		
		const {id} = req.params

		// check if Post exists
		const [post] = await db.pool.query('SELECT * FROM Posts WHERE postID = ?', [id])
		if (post.length === 0) {
			return res.status(404).send({message: 'Post not found'})
		}

		const query = `DELETE FROM Posts WHERE postID = ?`
		await db.pool.query(query, [id])

		return res.status(204).send({message: 'Post deleted successfully'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.updatePostByID = async (req, res) => {
	try {

		const {id} = req.params

		if (!req.body.description){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { description } = req.body
		
		const query1 = `SELECT * FROM Posts WHERE postID = ?`
		const post = await db.pool.query(query1, [id])

		// if post exists, perform update
		if(post){
			const query2 = `
			UPDATE Posts
				SET description = ?, createdAt = NOW()
				WHERE postID = ?
			`

			await db.pool.query(query2, [description, id])
		}
		
		return res.status(200).json({message: 'Post successfully updated'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}