import moment from 'moment'
import SaleModel from '../Models/SaleModel'
import SaledetailModel from '../Models/SaledetailModel'
import ProductModel from '../Models/ProductModel'
export default {
  listsales: (_req, res) => {
    SaleModel.findAll((error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ lists: result })
    })
  },
  listsale_info: (req, res) => {
    const Order = req.params.order
    SaledetailModel.findOrder(Order, (error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ lists: result })
    })
  },
  find_product: (req, res) => {
    const barcode = req.body.barcode
    ProductModel.findbarcode(barcode, (error, result) => {
      if (error) { return res.json({ error }) }
      if (result) {
        if (result.stock <= 1) {
          res.json({ outstock: true })
        } else {
          res.json({ success: true, data: result })
        }
      } else {
        res.json({ nodata: true })
      }
    })
  },
  save_sale: (req, res) => {
    const total = req.body.total
    const customer = req.body.cus
    const saledata = {
      s_order: req.body.order_no,
      s_total: total,
      s_get: req.body.cash,
      s_change: req.body.chang_money,
      customer,
      payment: customer > 1 ? 2 : 1,
      s_date: moment().format('YYYY-MM-DD HH:mm'),
      s_d: moment().format('DD'),
      s_m: moment().format('MM'),
      s_y: moment().format('YYYY'),
      s_user: 1
    }
    if (saledata) {
      SaleModel.save_sale(saledata, (error, result) => {
        if (error) { return res.json({ error }) }
        if (result) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
    }
  },
  save_sale_list: (req, res) => {
    const id = req.body.p_id
    const qty = req.body.qty
    const listdata = {
      sd_order: req.body.order_no,
      sd_product: id,
      sd_price: req.body.price,
      qty,
      sd_date: moment().format('YYYY-MM-DD')
    }
    if (listdata) {
      SaleModel.save_sale_list(listdata, (error, result) => {
        if (error) { return res.json({ error }) }
        if (result) {
          SaleModel.updatestock(id, qty, (err) => {
            if (err) { return res.json({ error: err }) }
            res.json({ success: true })
          })
        } else {
          res.json({ success: false })
        }
      })
    }
  }
}
