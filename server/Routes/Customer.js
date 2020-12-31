import express from 'express'
import Customer from '../Controllers/CustomerController'
const app = express.Router()

app.post('/customers', Customer.allcustomer)
app.put('/customer/activate/:id', Customer.activateCustomer)
export default app
