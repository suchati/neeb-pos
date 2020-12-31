import sqlite from 'sqlite3'
import tb from './create_table'
const { Database } = sqlite
const db = new Database('server/Configs/.data/database.db', (error) => {
  if (error) {
    return error
  } else {
    db.run(tb.users)
    db.run(tb.products)
    db.run(tb.sales)
    db.run(tb.saledetails)
    db.run(tb.categorys)
    db.run(tb.customers)
    db.run(tb.payment)
    db.run(tb.suppliers)
  }
})

export default db
