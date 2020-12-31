import db from '../Configs/connectDatabase'
export default {
  findAll: (result) => {
    const sql = `
    SELECT sales.*, users.u_name, users.u_id, customers.cus_name, customers.cus_id, payment.pay_type 
    FROM sales 
    INNER JOIN users ON users.u_id = sales.s_user 
    INNER JOIN customers ON customers.cus_id = sales.customer 
    INNER JOIN payment ON payment.pay_id = sales.payment
    `
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  save_sale: (data, result) => {
    const sql = 'INSERT INTO sales(s_order, s_total, s_get, s_change, payment, s_user, customer, s_date, s_d, s_m, s_y) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    db.run(sql, [data.s_order, data.s_total, data.s_get, data.s_change, data.payment, data.s_user, data.customer, data.s_date, data.s_d, data.s_m, data.s_y], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  save_sale_list: (data, result) => {
    const sql = 'INSERT INTO saledetails(sd_order, sd_product, sd_price, qty, sd_date) VALUES (?,?,?,?,?)'
    db.run(sql, [data.sd_order, data.sd_product, data.sd_price, data.qty, data.sd_date], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  updatestock: (id, qty, result) => {
    const sql = 'UPDATE products SET stock = stock-? WHERE p_id = ?'
    db.run(sql, [qty, id], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  }
}
