import fs from 'fs'
import moment from 'moment'
import ProductModel from '../Models/ProductModel'
import CategoryModel from '../Models/CategoryModel'
export default {
  Allproducts: (_req, res) => {
    ProductModel.findAll((err, result) => {
      if (err) { return res.send(err) }
      res.json({ products: result })
    })
  },
  create_product: (req, res) => {
    const File = req.files.p_img
    const filename = `${Date.now()}-${File.name}`
    const newdata = {
      p_code: req.body.p_code,
      p_name: req.body.p_name,
      cost_price: req.body.cost_price,
      sale_price: req.body.sale_price,
      stock: req.body.stock,
      discontinued: 0,
      p_details: req.body.p_details,
      p_img: filename,
      category: req.body.category,
      supplier: '',
      p_created_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (newdata) {
      ProductModel.findbarcode(req.body.p_code, (error, result) => {
        if (error) { return res.send(error) }
        if (result) {
          return res.json({ error_code: true })
        } else {
          File.mv(`assets/images/uploads/products/${filename}`, (err) => {
            if (err) { return res.json({ erorr_img: true }) }
            ProductModel.insert(newdata, (errorinsert) => {
              if (errorinsert) { return res.json({ error: errorinsert }) }
              res.json({ success: true })
            })
          })
        }
      })
    }
  },
  update_product: (req, res) => {
    const id = req.params.id
    const data = {
      p_name: req.body.p_name,
      cost_price: req.body.cost_price,
      sale_price: req.body.sale_price,
      stock: req.body.stock,
      p_details: req.body.p_details,
      category: req.body.category,
      p_updated_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (id && data) {
      ProductModel.update(id, data, (err, result) => {
        if (err) { return res.send(err) }
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
  delete_product: (req, res) => {
    const id = req.params.id
    const code = req.params.code
    const img = req.params.img
    ProductModel.findOne(id, (errdata, resultdata) => {
      if (errdata) { return res.send(errdata) }
      if (resultdata) {
        if (code === resultdata.p_code) {
          ProductModel.delete(id, (errdelete, resultdelete) => {
            if (errdelete) { return res.send(errdelete) }
            if (resultdelete) {
              if (fs.existsSync(`assets/images/uploads/products/${img}`)) {
                fs.unlinkSync(`assets/images/uploads/products/${img}`)
              }
              res.json({ success: true })
            } else {
              res.json({ success: false })
            }
          })
        } else {
          res.json({ error_code: true })
        }
      } else {
        res.json({ Nodata: true })
      }
    })
  },
  productbycategory: (req, res) => {
    ProductModel.findbycategory(req.params.id, (err, result) => {
      if (err) { return res.send(err) }
      if (result.length > 0) {
        res.json({ success: true, products: result })
      } else {
        res.json({ success: false })
      }
    })
  },

  // -------------------------------------------------
  Allcategorys: (_req, res) => {
    CategoryModel.findAll((err, result) => {
      if (err) { return res.send(err) }
      res.json({ categorys: result })
    })
  },
  create_category: (req, res) => {
    const newdata = {
      cat_name: req.body.cat_name,
      cat_details: req.body.cat_details,
      cat_created_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (newdata) {
      CategoryModel.insert(newdata, (error) => {
        if (error) { return res.json({ success: false }) }
        res.json({ success: true })
      })
    }
  },
  update_category: (req, res) => {
    const id = req.params.id
    const data = {
      cat_name: req.body.cat_name,
      cat_details: req.body.cat_details,
      cat_updated_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (id && data) {
      CategoryModel.update(id, data, (err, result) => {
        if (err) { return res.send(err) }
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
  delete_category: (req, res) => {
    const id = req.params.id
    const code = req.params.code
    CategoryModel.findOne(id, (errdata, resultdata) => {
      if (errdata) { return res.send(errdata) }
      if (resultdata) {
        if (code === resultdata.cat_name) {
          CategoryModel.delete(id, (errdelete, resultdelete) => {
            if (errdelete) { return res.send(errdelete) }
            if (resultdelete) {
              res.json({ success: true })
            } else {
              res.json({ success: false })
            }
          })
        } else {
          res.json({ error_code: true })
        }
      } else {
        res.json({ Nodata: true })
      }
    })
  },

  // -------------------------------------------------
  product_notification: (_req, res) => {
    ProductModel.notification((err, result) => {
      if (err) { return res.send(err) }
      res.json({ data: result })
    })
  },
  product_notificationItem: (_req, res) => {
    ProductModel.notificationItem((err, result) => {
      if (err) { return res.send(err) }
      res.json({ data: result })
    })
  },

  checkbarcode: (req, res) => {
    ProductModel.findbarcode(req.body.code, (error, result) => {
      if (error) { return res.json({ error }) }
      if (result) {
        res.json({ success: true, data: result })
      } else {
        res.json({ success: false })
      }
    })
  }
}
