import express from 'express'
import body from 'body-parser'
import fileupload from 'express-fileupload'
import Users from './Routes/User'
import Stores from './Routes/Store'
import Sales from './Routes/Sale'
import Home from './Routes/Home'
import Customer from './Routes/Customer'
const app = express()
app.use(body.urlencoded({ extended: true }))
app.use(express.json())
app.use(body.json())
app.use(fileupload())
app.use(Users)
app.use(Stores)
app.use(Sales)
app.use(Home)
app.use(Customer)
export default app
