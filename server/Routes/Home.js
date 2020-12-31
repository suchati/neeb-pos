import express from 'express'
import Home from '../Controllers/HomeController'
const app = express.Router()

app.post('/home/all_users', Home.all_users)
app.post('/home/all_products', Home.all_products)
app.post('/home/saletoday', Home.saletoday)
app.post('/home/saletomonth', Home.saletomonth)
app.post('/home/saletoyear', Home.saletoyear)
app.post('/home/productsaletoday', Home.productsaletoday)
app.post('/home/chart_month', Home.chart_month)
app.post('/home/chart_year', Home.chart_year)
app.post('/home/backupDB', Home.backup)

export default app
