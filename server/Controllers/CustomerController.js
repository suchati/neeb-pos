import CustomerModel from '../Models/CustomerModel'
export default {
  allcustomer: (_req, res) => {
    CustomerModel.findall((error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ customers: result })
    })
  },
  find_customer: (req, res) => {
    const cus = req.body.cus_code
    const total = req.body.total
    CustomerModel.findcustomer(cus, (error, result) => {
      if (error) { return res.json({ error }) }
      if (result) {
        if (result.cus_cash < total) {
          res.json({ error_cash: true })
        } else {
          res.json({ success: true, data: result })
        }
      } else {
        res.json({ nodata: true })
      }
    })
  },
  updatecash: (req, res) => {
    const cash = req.params.cash
    const id = req.params.id
    CustomerModel.update_cash(id, cash, (error) => {
      if (error) { return res.json({ error }) }
      res.json({ success: true })
    })
  },
  activateCustomer: (req, res) => {
    const id = req.params.id
    CustomerModel.findOne(id, (err, resultdata) => {
      if (err) { return res.json({ error: err }) }
      if (resultdata.length > 0) {
        CustomerModel.activate(id, (error, result) => {
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
