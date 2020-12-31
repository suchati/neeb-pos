import db from '../Configs/connectDatabase'
export default {
  findall: (result) => {
    const sql = 'SELECT * FROM customers'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  findOne: (id, result) => {
    const sql = 'SELECT * FROM customers WHERE cus_id = ?'
    db.all(sql, id, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  findcustomer: (cuscode, result) => {
    const sql = 'SELECT * FROM customers WHERE cus_code = ?'
    db.get(sql, cuscode, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  update_cash: (id, cash, result) => {
    const sql = 'UPDATE customers SET cus_cash = cus_cash-? WHERE cus_id = ?'
    db.run(sql, [cash, id], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  activate: (id, result) => {
    const data = 1
    const sql = 'UPDATE customers SET activate = ? WHERE cus_id = ?'
    db.run(sql, [data, id], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  }
}
