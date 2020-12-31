import fs from 'fs'
import moment from 'moment'
import HomeModel from '../Models/HomeModel'
export default {
  all_users: (_req, res) => {
    HomeModel.countusers((error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  all_products: (_req, res) => {
    HomeModel.countproducts((error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  saletoday: (_req, res) => {
    const D = moment().format('DD')
    const M = moment().format('MM')
    const Y = moment().format('YYYY')
    HomeModel.saletoday(D, M, Y, (error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  saletomonth: (_req, res) => {
    const M = moment().format('MM')
    const Y = moment().format('YYYY')
    HomeModel.saletomonth(M, Y, (error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  saletoyear: (_req, res) => {
    const Y = moment().format('YYYY')
    HomeModel.saletoyear(Y, (error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  productsaletoday: (_req, res) => {
    const today = moment().format('YYYY-MM-DD')
    HomeModel.productsaletoday(today, (error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  chart_month: (_req, res) => {
    const M = moment().format('MM')
    const Y = moment().format('YYYY')
    HomeModel.chart_month(M, Y, (error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  chart_year: (_req, res) => {
    const Y = moment().format('YYYY')
    HomeModel.chart_year(Y, (error, result) => {
      if (error) { return res.json({ error }) }
      res.json({ data: result })
    })
  },
  backup: (_req, res) => {
    const database = 'server/Configs/.data/database.db'
    const backupName = `Backup/backup-${moment().format('YYYYMMDDHHmm')}.db`
    if (fs.existsSync(database)) {
      fs.copyFile(database, backupName, (error) => {
        if (error) { res.json({ error }) }
        res.json({ success: true })
      })
    } else {
      res.json({ success: false })
    }
  }
}
