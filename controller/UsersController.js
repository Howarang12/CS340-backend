const db = require('../database/db-connector')

exports.addUser = async(req, res) => {
	try {

		if (
			!req.body.emailInput ||
			!req.body.usernameInput ||
			!req.body.fnameInput ||
			!req.body.lnameInput
		){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { emailInput, usernameInput, fnameInput, lnameInput } = req.body

		const query = `
			INSERT INTO Users(email, username, firstName, lastName)
				VALUES(?, ?, ?, ?)
			`
		const [result] = await db.pool.query(
			query, 
			[emailInput, usernameInput, fnameInput, lnameInput]
			)

		return res.status(200).json(result)
	} catch (error) {
		res.status(500).send({message: error})
	}
}

exports.getAllUsers = async(req, res) => {
	try {
		const query = `
			SELECT userID, email, username, firstName, lastName 
				FROM Users
			`
		const [rows] = await db.pool.query(query)

		return res.status(200).json(rows)
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.getUserByID = async(req, res) => {
	try {

		const {id} = req.params
		const query = `
			SELECT userID, email, username, firstName, lastName 
				FROM Users 
				WHERE userID = ?
			`
		const [row] = await db.pool.query(query, [id])

		return res.status(200).json(row[0])
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.deleteUserByID = async(req, res) => {
	try {
		
		const {id} = req.params

		// check if User exists
		const [user] = await db.pool.query('SELECT * FROM Users WHERE userID = ?', [id])
		if (user.length === 0) {
			return res.status(404).send({message: 'User not found'})
		}

		const query = `DELETE FROM Users WHERE userID = ?`
		await db.pool.query(query, [id])

		return res.status(204).send({message: 'User deleted successfully'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.updateUserByID = async(req, res) => {
	try {

		const {id} = req.params

		if (
			!req.body.emailInput ||
			!req.body.usernameInput ||
			!req.body.fnameInput ||
			!req.body.lnameInput
		){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { emailInput, usernameInput, fnameInput, lnameInput } = req.body
		
		const query1 = `
			SELECT userID, email, username, firstName, lastName 
				FROM Users 
				WHERE userID = ?
			`
		const user = await db.pool.query(query1, [id])

		// if user exists, perform update
		if(user){
			const query2 = `
			UPDATE Users
				SET email = ?, username = ?, firstName = ?, lastName = ? 
				WHERE userID = ?
			`

			await db.pool.query(query2, [emailInput, usernameInput, fnameInput, lnameInput, id])
		}
		
		return res.status(200).json({message: 'User successfully updated'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}


