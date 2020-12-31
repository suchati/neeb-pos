import express from 'express'
import Store from '../Controllers/StoreController'
const app = express.Router()
app.post('/stores/products', Store.Allproducts)
app.post('/stores/create_product', Store.create_product)
app.put('/stores/update_product/:id', Store.update_product)
app.delete('/stores/delete_product/:id/:code/:img', Store.delete_product)
app.put('/stores/productbycategory/:id', Store.productbycategory)
app.post('/stores/notification', Store.product_notification)
app.post('/stores/notificationItem', Store.product_notificationItem)

app.post('/stores/categorys', Store.Allcategorys)
app.post('/stores/create_category', Store.create_category)
app.put('/stores/update_category/:id', Store.update_category)
app.delete('/stores/delete_category/:id/:code', Store.delete_category)

app.post('/stores/checkbarcode', Store.checkbarcode)

export default app
