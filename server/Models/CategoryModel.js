import db from '../Configs/connectDatabase'
export default {
  findAll: (result) => {
    const sql = 'SELECT * FROM categorys'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  findOne: (id, result) => {
    const sql = 'SELECT * FROM categorys WHERE cat_id = ?'
    db.get(sql, id, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  insert: (data, result) => {
    const sql = 'INSERT INTO categorys(cat_name, cat_details, cat_created_at) VALUES (?,?,?)'
    db.run(sql, [data.cat_name, data.cat_details, data.cat_created_at], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  update: (id, data, result) => {
    const sql = 'UPDATE categorys SET cat_name = ?, cat_details = ?, cat_updated_at = ? WHERE cat_id = ?'
    db.run(sql, [data.cat_name, data.cat_details, data.cat_updated_at, id], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  delete: (id, result) => {
    const sql = 'DELETE FROM categorys WHERE cat_id = ?'
    db.run(sql, id, (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  }
}
