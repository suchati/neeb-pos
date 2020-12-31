import moment from 'moment'
// import store from 'store'
import UserModel from '../Models/UserModel'
import Hashpass from '../Libraries/Hashpassword'
import Random from '../Libraries/RandomInt'
import Salt from '../Libraries/Salt'
import find from '../Models/FindData'
export default {
  AllUsers: (req, res) => {
    UserModel.findAll((error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ users: result })
    })
  },
  creatUser: (req, res) => {
    const salt = Salt()
    const rand = Random(8)
    const password = Hashpass(rand, salt)
    const username = req.body.username
    const email = req.body.email
    const newdata = {
      u_name: req.body.u_name,
      username,
      salt,
      password,
      email,
      phone: req.body.phone,
      address: req.body.address,
      u_created_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (newdata) {
      find(username, 'username', 'username', 'users', (erruser, resuser) => {
        if (erruser) { return res.send(erruser) }
        if (resuser) {
          res.json({ erorr_user: true })
        } else {
          find(email, 'email', 'email', 'users', (erremail, resemail) => {
            if (erremail) { return res.send(erremail) }
            if (resemail) {
              res.json({ erorr_email: true })
            } else {
              UserModel.insert(newdata, (err) => {
                if (!err) {
                  res.json({ success: true })
                } else {
                  res.json({ success: false })
                }
              })
            }
          })
        }
      })
    }
  },
  updateUser: (req, res) => {
    const id = req.params.id
    const data = {
      u_name: req.body.u_name,
      phone: req.body.phone,
      address: req.body.address,
      u_updated_at: moment().format('YYYY-MM-DD HH:mm')
    }

    if (id && data) {
      UserModel.update(id, data, (error, result) => {
        if (error) { return res.json({ error }) }
        if (result) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
    } else {
      res.json({ success: false })
    }
  },
  deleteUser: (req, res) => {
    const id = req.params.id
    const username = req.params.username
    UserModel.findOne(id, (errdata, resultdata) => {
      if (errdata) { return res.json({ error: errdata }) }
      if (resultdata.length > 0) {
        if (username === resultdata[0].username) {
          UserModel.delete(id, (errdelete, resultdelete) => {
            if (errdelete) { return res.json({ error: errdelete }) }
            if (resultdelete) {
              res.json({ success: true })
            } else {
              res.json({ success: false })
            }
          })
        } else {
          res.json({ error_user: true })
        }
      } else {
        res.json({ Nodata: true })
      }
    })
  },
  activateUser: (req, res) => {
    const id = req.params.id
    UserModel.findOne(id, (err, resultdata) => {
      if (err) { return res.json({ error: err }) }
      if (resultdata.length > 0) {
        UserModel.activate(id, (error, result) => {
          if (error) { return res.json({ error }) }
          if (result) {
            res.json({ success: true })
          } else {
            res.json({ success: false })
          }
        })
      } else {
        res.json({ Nodata: true })
      }
    })
  }
}
