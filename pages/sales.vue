<template>
  <v-container fluid>
    <v-row>
      <v-col class="py-0">
        <v-card class="pa-3">
          <v-tabs v-model="tabs" grow>
            <v-tab>
              Products
            </v-tab>
            <v-tab>
              AD
            </v-tab>
            <v-tab>
              CUMTOMER
            </v-tab>
          </v-tabs>

          <v-divider />

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card height="85vh" class="overflow-y-auto">
                <v-card-text>
                  <v-row>
                    <v-col
                      v-for="(product, index) in products"
                      :key="index"
                      cols="4"
                      md="2"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-card
                          tile
                          outlined
                          class="text-center pa-2"
                          :elevation="hover ? 3 : 0"
                          :disabled="item_disabled"
                          @click="get_product(product.p_code)"
                        >
                          <v-img
                            :src="imgproduct(product.p_img)"
                            aspect-ratio="1"
                            height="80px"
                          />
                          <v-card-text>
                            <span class="caption">
                              {{ product.p_name }}
                            </span>
                            <span>
                              {{ product.sale_price | currency('') }}
                            </span>
                          </v-card-text>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card height="85vh" class="overflow-y-auto">
                <v-card-text>
                  <v-img src="https://picsum.photos/id/11/500/300" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card height="85vh" class="overflow-y-auto">
                <v-card-text> text3</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

      <v-col cols="4" class="py-0">
        <v-card height="96vh" class="d-flex flex-column pa-3">
          <v-card class="pa-2" elevation="0">
            <v-form ref="form_barcode" @submit.prevent="find_barcode">
              <v-text-field
                id="barcode"
                ref="barcode"
                v-model="barcode"
                v-mask="mask_barcode"
                label="Barcode"
                :error-messages="errormessages"
                validate-on-blur
                maxlength="13"
                outlined
                clearable
                prepend-inner-icon="mdi-barcode"
                :disabled="item_disabled"
              >
                <template #append>
                  <v-divider class="mx-2 my-n2" vertical />
                  <v-icon @click="find_barcode">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
          </v-card>

          <v-card class="pa-2" outlined tile max-height="50vh">
            <v-simple-table dense fixed-header>
              <template #default>
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>
                      Name
                    </th>
                    <th>
                      Price
                    </th>
                    <th>
                      Qty
                    </th>
                    <th class="text-right">
                      ALL
                    </th>
                    <th class="text-center">
                      <v-icon :disabled="item_disabled" :color="listsale.length>0?'error':''" @click="Clear_All">
                        mdi-delete-forever-outline
                      </v-icon>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in listsale" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price | currency('') }}</td>
                    <td>{{ item.qty }}</td>
                    <td class="text-right">
                      {{ item.price * item.qty | currency('') }}
                    </td>
                    <td class="text-center">
                      <v-icon :disabled="item_disabled" small color="error" @click="removeItem(item)">
                        mdi-close
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>

          <v-card class="d-flex justify-space-between py-2 px-5 mt-auto" outlined tile>
            <div>
              <span class="font-weight-black title">
                รวม
              </span>
            </div>
            <div class="text-right">
              <span class="font-weight-black text-h5">
                {{ total | currency('') }}
              </span>
            </div>
          </v-card>

          <v-card v-if="!go_to" class="d-flex justify-space-between py-2 px-5" outlined tile>
            <div>
              <span class="font-weight-black title">
                รับเงิน
              </span>
            </div>
            <div class="text-right">
              <span class="font-weight-black text-h5 success--text">
                {{ cash || 0 | currency('') }}
              </span>
            </div>
          </v-card>

          <v-card v-if="!go_to" class="d-flex justify-space-between py-2 px-5" outlined tile>
            <div>
              <span class="font-weight-black title">
                เงินทอน
              </span>
            </div>
            <div class="text-right">
              <span class="font-weight-black text-h5 error--text">
                {{ chang_money || 0 | currency('') }}
              </span>
            </div>
          </v-card>

          <v-card v-if="go_to" flat class="d-flex justify-space-between pa-2">
            <div class="flex-grow-1 flex-shrink-1">
              <v-card
                class="pa-3 text-center mr-1"
                color="success"
                dark
                outlined
                @click="Check_bill"
              >
                <span class="headline font-weight-black">
                  <v-icon large>mdi-cash</v-icon> คิดเงิน (F9)
                </span>
              </v-card>
            </div>
            <div>
              <v-card
                class="pa-3 text-center ml-1"
                color="primary"
                dark
                outlined
                @click="Clear_All"
              >
                <span class="headline font-weight-black">
                  <v-icon large>mdi-cached</v-icon>
                </span>
              </v-card>
            </div>
          </v-card>

          <v-card v-else flat class="d-flex justify-space-between pa-2">
            <div>
              <v-card class="pa-3 text-center mr-1" color="primary" dark>
                <span class="headline font-weight-black">
                  <v-icon large>mdi-printer</v-icon>
                </span>
              </v-card>
            </div>
            <div class="flex-grow-1 flex-shrink-1">
              <v-card class="pa-3 text-center ml-1" color="primary" dark @click="Clear_All">
                <span class="headline font-weight-black">
                  <v-icon large>mdi-cached</v-icon> Clear
                </span>
              </v-card>
            </div>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="customer_dialog" width="450" persistent>
      <v-card>
        <v-form ref="form_customer" @submit.prevent="customer_pay_submit">
          <v-card-title>
            <span class="headline">Customer Payment</span>
            <v-spacer />
            <v-btn icon class="mr-n2 mt-n3" @click="customer_dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-5">
            <v-text-field
              ref="customer"
              v-model="cus_code"
              placeholder="Customer ID"
              outlined
              single-line
              class="text-h6 font-weight-black"
            >
              <template #append>
                <v-divider class="mx-2 mt-n1 my-n2" vertical />
                <v-icon>mdi-magnify</v-icon>
              </template>
            </v-text-field>

            <v-alert
              v-model="alertcustomer"
              dense
              outlined
              type="error"
              border="left"
              dismissible
              transition="scale-transition"
            >
              You've got <strong>5</strong> {{ error_customer }}.
            </v-alert>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="success" type="submit">
              comfrim
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="payment_dialog" width="450" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Cash</span>
          <v-spacer />
          <v-btn icon class="mr-n4 mt-n3" @click="close_checkbill">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-card flat class="d-flex justify-space-between px-2 pt-2 pb-0">
              <div class="flex-grow-1 flex-shrink-1">
                <v-form ref="form_cash" @submit.prevent="Get_cash">
                  <v-text-field
                    id="cash"
                    ref="cash"
                    v-model="cash"
                    v-mask="cash_value"
                    placeholder="Cash"
                    outlined
                    single-line
                    class="text-h4 font-weight-black align-center"
                    height="70"
                    maxlength="4"
                    :error-messages="cash_msg"
                  >
                    <template #prepend-inner>
                      <v-icon large>
                        mdi-currency-btc
                      </v-icon>
                      <v-divider class="mx-2 mt-n1 my-n2" vertical />
                    </template>
                    <template #append>
                      <v-divider class="mx-2 mt-n1 my-n2" vertical />
                      <v-icon large @click="drop">
                        mdi-backspace-outline
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-form>
              </div>
              <div class="mt-1 ml-2">
                <v-btn
                  dark
                  block
                  color="primary"
                  height="65"
                  width="65"
                  @click="customer_pay"
                >
                  <v-icon>mdi-account-cash-outline</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-row>

          <v-row no-gutters>
            <v-col cols="4" class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="cash_clear()"
              >
                <span class="headline font-weight-black">
                  Clear
                </span>
              </v-card>
            </v-col>
            <v-col cols="8" class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="success"
                tile
                outlined
                @click="Get_cash"
              >
                <span class="headline font-weight-black">
                  รับเงิน
                </span>
              </v-card>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(0)"
              >
                <span class="headline font-weight-black">
                  0
                </span>
              </v-card>
            </v-col>
            <v-col cols="4" class="pa-1">
              <v-card
                class="pa-4 text-center banknote banknote-20"
                tile
                outlined
                @click="addcash_bank(20)"
              >
                <span class="headline font-weight-black">
                  <!-- transparent--text"> -->
                  20
                </span>
              </v-card>
            </v-col>
            <v-col cols="4" class="pa-1">
              <v-card
                class="pa-4 text-center banknote banknote-50"
                tile
                outlined
                @click="addcash_bank(50)"
              >
                <span class="headline font-weight-black">
                  <!-- transparent--text"> -->
                  50
                </span>
              </v-card>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(1)"
              >
                <span class="headline font-weight-black">
                  1
                </span>
              </v-card>
            </v-col>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(2)"
              >
                <span class="headline font-weight-black">
                  2
                </span>
              </v-card>
            </v-col>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(3)"
              >
                <span class="headline font-weight-black">
                  3
                </span>
              </v-card>
            </v-col>
            <v-col cols="4" class="pa-1">
              <v-card
                class="pa-4 text-center banknote banknote-100"
                tile
                outlined
                @click="addcash_bank(100)"
              >
                <span class="headline font-weight-black">
                  <!-- transparent--text"> -->
                  100
                </span>
              </v-card>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(4)"
              >
                <span class="headline font-weight-black">
                  4
                </span>
              </v-card>
            </v-col>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(5)"
              >
                <span class="headline font-weight-black ">
                  5
                </span>
              </v-card>
            </v-col>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(6)"
              >
                <span class="headline font-weight-black">
                  6
                </span>
              </v-card>
            </v-col>
            <v-col cols="4" class="pa-1">
              <v-card
                class="pa-4 text-center banknote banknote-500"
                tile
                outlined
                @click="addcash_bank(500)"
              >
                <span class="headline font-weight-black">
                  <!-- transparent--text"> -->
                  500
                </span>
              </v-card>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(7)"
              >
                <span class="headline font-weight-black">
                  7
                </span>
              </v-card>
            </v-col>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(8)"
              >
                <span class="headline font-weight-black">
                  8
                </span>
              </v-card>
            </v-col>
            <v-col class="pa-1">
              <v-card
                class="pa-4 text-center white--text"
                color="primary"
                tile
                outlined
                @click="addcash(9)"
              >
                <span class="headline font-weight-black">
                  9
                </span>
              </v-card>
            </v-col>
            <v-col cols="4" class="pa-1">
              <v-card
                class="pa-4 text-center banknote banknote-1000 "
                tile
                outlined
                @click="addcash_bank(1000)"
              >
                <span class="headline font-weight-black">
                  <!-- transparent--text"> -->
                  1000
                </span>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    listsale: [],
    barcode: '',
    mask_barcode: '#############',
    errormessages: '',
    payment_dialog: false,
    cash: '',
    cash_msg: '',
    cash_value: '####',
    chang_money: '',
    order_no: '',
    user_id: '',
    item_disabled: false,
    go_to: true,
    products: [],
    tabs: null,
    items: ['Products', 'AD', 'CUMTOMER'],
    customer_dialog: false,
    cus_id: '',
    cus_code: '',
    alertcustomer: false,
    error_customer: ''
  }),
  computed: {
    total () {
      const all = this.listsale.reduce((value, data) => {
        return value + Number(data.price * data.qty)
      }, 0)
      return all
    }
  },
  watch: {
    customer_dialog (val) {
      if (!val) { this.cus_id = '' }
      this.cus_code = ''
    }
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F9') { this.Check_bill() }
    })
    this.show_products()
  },
  methods: {
    async show_products () {
      await this.$axios.$post('stores/products')
        .then(res => (this.products = res.products))
    },
    imgproduct (img) {
      if (img) {
        return require(`~/assets/images/uploads/products/${img}`)
      } else {
        return require('~/assets/images/uploads/products/img-no-product.png')
      }
    },
    find_barcode () {
      if (this.$refs.form_barcode.validate()) {
        this.get_product(this.barcode)
      } else {
        this.errormessages = 'errormessages'
        this.$refs.barcode.focus()
      }
    },
    async get_product (code) {
      await this.$axios.$post('sales/find_product', { barcode: code }).then((res) => {
        if (res.outstock) {
          this.$store.commit('SET_ERROR', 'ERROR outforstock')
          this.barcode = ''
          this.$refs.barcode.focus()
          this.errormessages = ''
        } else if (res.success) {
          this.barcode = ''
          this.$refs.barcode.focus()
          this.errormessages = ''
          let found = false

          for (let i = 0; i < this.listsale.length; i++) {
            if (this.listsale[i].barcode === res.data.p_code) {
              this.listsale[i].qty++
              found = true
              break
            }
          }

          if (!found) {
            this.listsale.push({
              p_id: res.data.p_id,
              barcode: res.data.p_code,
              name: res.data.p_name,
              qty: 1,
              price: res.data.sale_price
            })
          }
        } else {
          this.errormessages = 'errormessages'
          this.barcode = ''
          this.$refs.barcode.focus()
        }
      })
    },
    removeItem (Item) {
      this.listsale.splice(Item, 1)
    },
    Clear_All () {
      this.listsale = []
      // this.total = 0
      this.cash = 0
      this.go_to = true
      this.chang_money = 0
      this.item_disabled = false
      this.cus_id = ''
      setTimeout(() => {
        this.$refs.barcode.focus()
      }, 100)
    },
    Check_bill () {
      if (this.listsale.length > 0) {
        this.payment_dialog = true
        setTimeout(() => {
          this.$refs.cash.focus()
        }, 100)
      } else {
        this.errormessages = 'errormessages'
        this.$refs.barcode.focus()
      }
    },
    close_checkbill () {
      this.payment_dialog = false
      this.$refs.barcode.focus()
      this.cash = 0
    },
    drop () {
      if (this.cash === 20 || this.cash === 50 || this.cash === 100 || this.cash === 500 || this.cash === 1000) {
        this.cash = ''
      }
      this.$refs.cash.focus()
      if (this.cash !== 0) { this.cash = this.cash.slice(0, -1) }
      this.$refs.cash.focus()
    },
    addcash (e) {
      if (Number.isInteger(this.cash) || this.cash === 0) {
        this.cash = ''
      }
      if (this.cash.length !== 4) {
        this.cash += e
      }
      this.cash_msg = ''
      this.$refs.cash.focus()
    },
    addcash_bank (e) {
      this.cash = parseInt(e)
      this.cash_msg = ''
      this.$refs.cash.focus()
    },
    cash_clear () {
      this.cash = ''
      this.cash_msg = ''
      this.$refs.cash.focus()
    },
    Get_cash () {
      if (this.cash === '') {
        this.cash_msg = 'error cash'
      } else if (this.cash > 1000) {
        this.cash_msg = 'Not 1,000'
        this.cash = ''
      } else {
        this.cash_msg = ''
        if (this.cash < this.total) {
          this.$store.commit('SET_ERROR', 'Not mout Totel')
        } else {
          this.Save_sale_Order()
        }
      }
    },
    async Save_sale_Order () {
      this.order_no = new Date().getTime()
      this.chang_money = this.cash - this.total
      const Data = {
        order_no: this.order_no,
        cus: this.cus_id || 1,
        total: this.total,
        chang_money: this.chang_money,
        cash: this.cash
      }
      await this.$axios.$post('/sales/save_sale', Data).then(async (res) => {
        if (res.success) {
          if (this.cus_id > 1) {
            await this.$axios.$put(`/sales/updatecash/${this.cus_id}/${this.total}`)
          }
          for (let i = 0; i < this.listsale.length; i++) {
            const DataOrder = {
              order_no: this.order_no,
              p_id: this.listsale[i].p_id,
              qty: this.listsale[i].qty,
              price: this.listsale[i].price
            }
            await this.$axios.$post('/sales/save_sale_list', DataOrder).then((res) => {
              if (res.success) {
                this.payment_dialog = false
                this.customer_dialog = false
                this.go_to = false
                this.item_disabled = true
              }
            })
          }
        } else {
          this.$store.commit('SET_ERROR', 'Not SAVE')
        }
      })
    },
    customer_pay () {
      this.customer_dialog = true
      this.payment_dialog = false
    },
    async customer_pay_submit () {
      if (this.$refs.form_customer.validate()) {
        const Data = { cus_code: this.cus_code, total: this.total }
        await this.$axios.$post('sales/find_customer', Data).then((res) => {
          if (res.success) {
            this.cus_id = res.data.cus_id
            this.cash = this.total
            this.Save_sale_Order()
          } else if (res.error_cash) {
            this.$store.commit('SET_ERROR', 'error_cash')
            this.cus_code = ''
            this.$refs.customer.focus()
          } else {
            this.alertcustomer = true
            this.error_customer = 'error_customer'
            this.cus_code = ''
            this.$refs.customer.focus()
          }
        })
      }
    }
  }
}
</script>
