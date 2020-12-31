import express from 'express'
import Sale from '../Controllers/SaleController'
import Customer from '../Controllers/CustomerController'
const app = express.Router()

app.post('/sales/listsales', Sale.listsales)
app.put('/sales/listsale_info/:order', Sale.listsale_info)
app.post('/sales/find_product', Sale.find_product)
app.post('/sales/save_sale', Sale.save_sale)
app.post('/sales/save_sale_list', Sale.save_sale_list)
app.post('/sales/find_customer', Customer.find_customer)
app.put('/sales/updatecash/:id/:cash', Customer.updatecash)

export default app
