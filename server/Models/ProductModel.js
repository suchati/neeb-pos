import db from '../Configs/connectDatabase'
export default {
  findAll: (result) => {
    const sql = 'SELECT * FROM products LEFT JOIN categorys ON categorys.cat_id = products.category'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  findOne: (id, result) => {
    const sql = 'SELECT * FROM products WHERE p_id = ?'
    db.get(sql, id, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  findbarcode: (code, result) => {
    const sql = 'SELECT * FROM products WHERE p_code = ?'
    db.get(sql, code, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  insert: (data, result) => {
    const sql = 'INSERT INTO products(p_code, p_name, cost_price, sale_price, stock, p_details, p_img, category, supplier, p_created_at) VALUES (?,?,?,?,?,?,?,?,?,?)'
    db.run(sql, [data.p_code, data.p_name, data.cost_price, data.sale_price, data.stock, data.p_details, data.p_img, data.category, data.supplier, data.p_created_at], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  update: (id, data, result) => {
    const sql = 'UPDATE products SET p_name = ?, cost_price = ?, sale_price = ?, stock = ?, p_details = ?, category = ?, p_updated_at = ? WHERE p_id = ?'
    db.run(sql, [data.p_name, data.cost_price, data.sale_price, data.stock, data.p_details, data.category, data.p_updated_at, id], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  delete: (id, result) => {
    const sql = 'DELETE FROM products WHERE p_id = ?'
    db.run(sql, id, (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  findbycategory: (id, result) => {
    const sql = 'SELECT * FROM products LEFT JOIN categorys ON categorys.cat_id = products.category WHERE category = ?'
    db.all(sql, id, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  notification: (result) => {
    const sql = 'SELECT COUNT(stock) as stock FROM products WHERE stock <= 10'
    db.get(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  notificationItem: (result) => {
    const sql = 'SELECT * FROM products WHERE stock <= 10'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  }
}
