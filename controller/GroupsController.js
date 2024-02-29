const db = require('../database/db-connector')

exports.addGroup = async(req, res) => {
	try {
		if (!req.body.groupNameInput){
			return res.status(400).send({
				message: 'All fields required',
			})
		}

		const { groupNameInput } = req.body

		const query = `
			INSERT INTO Groups (groupName)
				VALUES(?)
			`
		const [result] = await db.pool.query(
			query,
			[groupNameInput]
		)

		return res.status(200).json(result)
	} catch (error) {
		res.status(500).send({message: error})
	}

}

exports.getAllGroups = async(req, res) => {
	try {
		const query = `
			SELECT groupID, groupName   
				FROM Groups
			`
		const [rows] = await db.pool.query(query)

		return res.status(200).json(rows)
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.getGroupByID = async(req, res) => {
	try {

		const {id} = req.params
		const query = `
			SELECT groupID, groupName 
				FROM Groups
				WHERE groupID = ?
			`
		const [row] = await db.pool.query(query, [id])

		return res.status(200).json(row[0])
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.deleteGroupByID = async(req, res) => {
	try {
		
		const {id} = req.params

		// check if Group exists
		const [group] = await db.pool.query('SELECT * FROM Groups WHERE groupID = ?', [id])
		if (group.length === 0) {
			return res.status(404).send({message: 'Group not found'})
		}

		const query = `DELETE FROM Groups WHERE groupID = ?`
		await db.pool.query(query, [id])

		return res.status(204).send({message: 'Group deleted successfully'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.updateGroupByID = async(req, res) => {
	try {

		const {id} = req.params

		if (!req.body.groupNameInput ){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { groupNameInput } = req.body
		
		const query1 = `
			SELECT groupID, groupName
				FROM Groups 
				WHERE groupID = ?
			`
		const group = await db.pool.query(query1, [id])

		// if group exists, perform update
		if(group){
			const query2 = `
			UPDATE Groups
				SET groupName = ? 
				WHERE groupID = ?
			`
			await db.pool.query(query2, [groupNameInput, id])
		}
		
		return res.status(200).json({message: 'Group successfully updated'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}