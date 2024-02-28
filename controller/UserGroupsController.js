const db = require('../database/db-connector')

exports.addUserGroup = async(req, res) => {
	try {
		if (!req.body.userID || !req.body.groupID){
			return res.status(400).send({
				message: 'All fields required',
			})
		}

		const { userID, groupID } = req.body

		const query = `
			INSERT INTO userGroups (Users_userID, Groups_groupID)
				VALUES(?, ?)
			`
		const [result] = await db.pool.query(
			query,
			[userID, groupID]
		)

		return res.status(200).json(result)
	} catch (error) {
		res.status(500).send({message: error})
	}
}

exports.getAllUserGroups = async(req, res) => {
	try {
		const query = `
			SELECT userGroups.Users_userID,Users.username, userGroups.Groups_groupID, Groups.groupName
			FROM userGroups
				INNER JOIN Users
				ON Users.userID = userGroups.Users_userID
				INNER JOIN Groups
				ON Groups.groupID = userGroups.Groups_groupID
			`
		const [rows] = await db.pool.query(query)

		return res.status(200).json(rows)
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

