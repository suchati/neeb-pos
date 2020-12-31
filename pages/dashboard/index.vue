<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" lg="3" class="mt-5">
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet primary ml-2">
                <v-icon x-large dark>
                  mdi-calendar-today
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    ยอดขายวันนี้ / <span>฿</span>
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ saletoday || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3" class="mt-5">
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet success ml-2">
                <v-icon x-large dark>
                  mdi-calendar-month
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    ยอดขายเดือนนี้ / <span>฿</span>
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ saletomonth || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3" class="mt-5">
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet info ml-2">
                <v-icon x-large dark>
                  mdi-barcode
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    สินค้า / รายการ
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ productall || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3" class="mt-5">
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet orange ml-2">
                <v-icon x-large dark>
                  mdi-account-group
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    พนักงาน / คน
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ userall || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--------------// ROW Widget------------------->

    <!-------------- ROW CHART ------------------>
    <v-row>
      <v-container grid-list-xl>
        <v-layout wrap>
          <!--------------List ToDay ----------------->
          <v-flex md4>
            <v-card class="mt-5 mx-auto">
              <v-card-title>
                <span>สิ้นค้าขายดี</span>
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item , index) in producttoday" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.p_name }}</td>
                        <td>{{ item.product_qty }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-divider class="mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
          <!-------------- //List ToDay --------------->

          <!-------------- CHART Day  ----------------->
          <v-flex md8>
            <v-card class="mt-5 mx-auto">
              <v-card-text>
                <v-card-title>
                  <v-icon large left style="color:#1f8ef1">
                    mdi-poll
                  </v-icon>
                  <span class="title font-weight-light">
                    สรุปยอดขายเดือนนี้
                  </span>
                  <v-spacer />
                  <h3 class="display-1 font-weight">
                    {{ saletomonth || 0 }} ฿
                  </h3>
                </v-card-title>
                <v-divider class="mb-4 mt-n4" />
                <home-chart
                  v-if="load_M_data"
                  :chart-data="Monthdata"
                  :label="Monthlabel"
                  :height="M_h"
                  border-color="#1f8ef1"
                  rgb1="rgba(29,140,248,0.2)"
                  rgb2="rgba(29,140,248,0.0)"
                  rgb3="rgba(29,140,248,0)"
                />
                <v-divider class="mx-2 mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
          <!-------------- // CHART Day ------------->
        </v-layout>
      </v-container>
    </v-row>
    <!-------------- //ROW ------------------>

    <!-------------- CHART Month ----------------->
    <v-row>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex>
            <v-card class="mt-5 mx-auto">
              <v-card-text>
                <v-card-title>
                  <v-icon large left style="color:#00d6b4">
                    mdi-poll
                  </v-icon>
                  <span class="title font-weight-light">
                    สรุปยอดขายปีนี้
                  </span>
                  <v-spacer />
                  <h3 class="display-1 font-weight">
                    {{ saletoYear || 0 }} ฿
                  </h3>
                </v-card-title>
                <v-divider class="mb-4 mt-n4" />
                <home-chart
                  v-if="load_Y_data"
                  :chart-data="Yeardata"
                  :label="Yearlabel"
                  :height="Y_h"
                  border-color="#00d6b4"
                  rgb1="rgba(66,134,121,0.15)"
                  rgb2="rgba(66,134,121,0.05)"
                  rgb3="rgba(66,134,121,0)"
                />
                <v-divider class="mx-2 mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'Dashboard',
  data: () => ({
    load_M_data: false,
    Monthdata: [],
    Monthlabel: [],
    M_h: 115,
    load_Y_data: false,
    Yeardata: [],
    Yearlabel: [],
    Y_h: 100,
    producttoday: [],
    userall: '',
    productall: '',
    saletoday: '',
    saletomonth: '',
    saletoYear: ''
  }),
  head () {
    return { title: 'Dashboard' }
  },
  mounted () {
    this.AllData()
  },
  methods: {
    async AllData () {
      await this.$axios.$post('/home/all_users')
        .then((res) => {
          this.userall = res.data.user
        })
      await this.$axios.$post('home/productsaletoday')
        .then((res) => {
          this.producttoday = res.data
        })
      await this.$axios.$post('home/all_products')
        .then((res) => {
          this.productall = res.data.product
        })
      await this.$axios.$post('home/saletoday')
        .then((res) => {
          this.saletoday = res.data.total
        })
      await this.$axios.$post('home/saletomonth')
        .then((res) => {
          this.saletomonth = res.data.total
        })
      await this.$axios.$post('home/saletoyear')
        .then((res) => {
          this.saletoYear = res.data.total
        })
      await this.$axios.$post('home/chart_month')
        .then((res) => {
          this.load_M_data = true
          for (const m in res.data) {
            this.Monthdata.push(res.data[m].total)
            this.Monthlabel.push(res.data[m].s_d)
          }
        })
      await this.$axios.$post('home/chart_year')
        .then((res) => {
          const month = []
          month['01'] = 'January'
          month['02'] = 'February'
          month['03'] = 'March'
          month['04'] = 'April'
          month['05'] = 'May'
          month['06'] = 'June'
          month['07'] = 'July'
          month['08'] = 'August'
          month['09'] = 'September'
          month['10'] = 'October'
          month['11'] = 'November'
          month['12'] = 'December'
          this.load_Y_data = true
          for (const y in res.data) {
            this.Yeardata.push(res.data[y].total)
            this.Yearlabel.push(month[res.data[y].s_m])
          }
        })
    }
  }
}
</script>
