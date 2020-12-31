import db from '../Configs/connectDatabase'
export default {
  countusers: (result) => {
    const sql = 'SELECT COUNT(u_id) as user FROM users'
    db.get(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  countproducts: (result) => {
    const sql = 'SELECT COUNT(p_id) AS product FROM products'
    db.get(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  saletoday: (D, M, Y, result) => {
    const sql = `
      SELECT SUM(s_total) as total
      FROM sales 
      WHERE s_d = ? AND s_m = ? AND s_y = ?
    `
    db.get(sql, [D, M, Y], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  saletomonth: (M, Y, result) => {
    const sql = `
      SELECT SUM(s_total) as total
      FROM sales 
      WHERE s_m = ? AND s_y = ?
    `
    db.get(sql, [M, Y], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  saletoyear: (Y, result) => {
    const sql = `
      SELECT SUM(s_total) as total
      FROM sales 
      WHERE s_y = ?
    `
    db.get(sql, [Y], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  productsaletoday: (today, result) => {
    const sql = `
    SELECT pd.p_name AS p_name,(
      SELECT sum(qty) 
      FROM saledetails 
      WHERE sd_product = pd.p_id 
      AND sd_date BETWEEN ? AND ?
    ) AS product_qty 
    FROM products AS pd  
    ORDER BY product_qty 
    DESC LIMIT 5`
    db.all(sql, [today, today], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  chart_month: (M, Y, result) => {
    const sql = `
      SELECT s_d, SUM(s_total) AS total 
      FROM sales 
      WHERE s_m = ? AND s_y = ?
      GROUP BY s_d;
    `
    db.all(sql, [M, Y], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  chart_year: (Y, result) => {
    const sql = `
      SELECT s_m,SUM(s_total) AS total 
      FROM sales 
      WHERE s_y = ?
      GROUP BY s_m
    `
    db.all(sql, [Y], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  }

}
