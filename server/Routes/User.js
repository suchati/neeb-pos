import express from 'express'
import User from '../Controllers/UserController'
const app = express.Router()
app.post('/users', User.AllUsers)
app.post('/users/create', User.creatUser)
app.put('/users/update/:id', User.updateUser)
app.delete('/users/delete/:id/:username', User.deleteUser)
app.put('/users/activate/:id', User.activateUser)
export default app
