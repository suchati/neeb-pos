import db from '../Configs/connectDatabase'
export default {
  findOrder: (order, result) => {
    const sql = `
    SELECT products.p_name, saledetails.qty, saledetails.sd_price
    FROM saledetails 
    INNER JOIN products ON products.p_id = saledetails.sd_product
    WHERE sd_order = ?
    `
    db.all(sql, order, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  }
}
