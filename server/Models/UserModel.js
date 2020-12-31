import db from '../Configs/connectDatabase'
export default {
  findAll: (result) => {
    const sql = 'SELECT u_id, email, username, u_name, phone, address, activate FROM users'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  findOne: (id, result) => {
    const sql = 'SELECT * FROM users WHERE u_id = ?'
    db.all(sql, id, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  insert: (data, result) => {
    const sql = 'INSERT INTO users(u_name, email, username, password, salt, address, phone, u_created_at) VALUES (?,?,?,?,?,?,?,?)'
    db.run(sql, [data.u_name, data.email, data.username, data.password, data.salt, data.address, data.phone, data.u_created_at], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  update: (id, data, result) => {
    const sql = 'UPDATE users SET u_name = ?, phone = ?, address = ?, u_updated_at = ? WHERE u_id = ?'
    db.run(sql, [data.u_name, data.phone, data.address, data.u_updated_at, id], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  delete: (id, result) => {
    const sql = 'DELETE FROM users WHERE u_id = ?'
    db.run(sql, id, (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  },
  activate: (id, result) => {
    const data = 1
    const sql = 'UPDATE users SET activate = ? WHERE u_id = ?'
    db.run(sql, [data, id], (err) => {
      if (err) {
        result(null, err)
      } else {
        result(null, true)
      }
    })
  }
}
