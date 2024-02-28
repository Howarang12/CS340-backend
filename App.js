const express = require('express')
const app = express()
const PORT = 3000

const UsersRoutes = require('./routes/UsersRoutes')
const PostsRoutes = require('./routes/PostsRoutes')
const GroupsRoutes = require('./routes/GroupsRoutes')
const UserGroupsRoutes = require('./routes/UserGroupsRoutes')


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
	res.send('Server running')
})

app.use('/users', UsersRoutes)
app.use('/posts', PostsRoutes)
app.use('/groups', GroupsRoutes)
app.use('/user-groups', UserGroupsRoutes)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) 