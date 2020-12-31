<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table :headers="headers" :items="products" :search="search">
        <template #top>
          <v-toolbar elevation="0" color="transparent">
            <v-divider class="mx-4" vertical />
            <v-btn color="primary" dark @click="AddProduct">
              <v-icon>mdi-plus-circle-outline</v-icon> NEW product
            </v-btn>
            <v-divider class="mx-4" vertical />

            <v-spacer />

            <v-flex xs3 class="mb-n6">
              <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search" filled dense />
            </v-flex>
            <v-divider class="mx-4" vertical />
            <v-autocomplete
              v-model="cateid"
              :items="categorys"
              item-text="cat_name"
              item-value="cat_id"
              label="Category"
              style="max-width:150px!important;"
              clearable
              class="mb-n3 mr-3"
              @change="productofcategory()"
            />

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="Addcategory"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>New Category</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="allcategory_dialog = true">
                  <v-icon>mdi-tag-multiple-outline</v-icon>
                </v-btn>
              </template>
              <span>All Category</span>
            </v-tooltip>

            <v-divider class="mx-4" vertical />
          </v-toolbar>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template #body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index+1 }}</td>
              <td>
                <div @click="SHOW_Barcode(item)">
                  <barcode
                    :value="item.p_code"
                    format="EAN13"
                    height="10"
                    width="1"
                  />
                </div>
              </td>
              <td>{{ item.p_name }}</td>
              <td>{{ item.cost_price | currency('', 2, { decimalSeparator: '.' }) }}</td>
              <td>{{ item.sale_price | currency('', 2, { decimalSeparator: '.' }) }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.cat_name }}</td>
              <td width="120" align="right">
                <v-btn small icon class="mr-2" color="success" @click="EditProduct(item)">
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn small color="error" icon @click="DeleteProduct(item)">
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-btn color="primary" @click="printproduct">
        print
      </v-btn>
    </v-card>
    <v-dialog v-model="barcode_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <v-spacer />
          <v-btn icon @click="barcode_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <barcode :value="barcode" format="EAN13" height="20" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirm" max-width="350">
      <v-card class="pa-3">
        <v-card-title class="headline">
          ยืนยันการลบ?
        </v-card-title>
        <v-card-text>
          <v-form ref="form_del">
            เมื่อคุณยืนยันการลบ คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้
            <p>
              Barcode <v-chip color="red lighten-4" class="ml-0 mr-2 black--text" label small>
                {{ productNameDel }}
              </v-chip>
            </p>
            <v-text-field
              v-model="productCodeDel"
              v-mask="mask_barcode"
              label="Barcode"
              :rules="[
                v => !!v || 'enter Barcode',
                v => (v && v.length >= 13) || 'Min 13 characters'
              ]"
              outlined
              dense
              class="px-5"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirm = false">
            Cancel
          </v-btn>
          <v-btn color="success" @click="submitDeleteproduct">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="tbl_print">
      <v-card id="tbl_product">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                #
              </th>
              <th scope="col">
                #
              </th>
              <th scope="col">
                #
              </th>
              <th scope="col">
                #
              </th>
              <th scope="col">
                #
              </th>
              <th scope="col">
                #
              </th>
              <th scope="col">
                #
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index" scope="row">
              <td>{{ index+1 }}</td>
              <td>{{ item.p_code }}</td>
              <td>{{ item.p_name }}</td>
              <td>{{ item.cost_price | currency('', 2, { decimalSeparator: '.' }) }}</td>
              <td>{{ item.sale_price | currency('', 2, { decimalSeparator: '.' }) }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.cat_name }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="allcategory_dialog" max-width="600">
      <v-card class="pa-5">
        <v-card-title class="mr-n5 mt-n5 headline">
          <span class="headline">Categorys</span>
          <v-spacer />
          <v-btn icon @click="allcategory_dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table :headers="headercategory" :items="categorys" :search="searchcategory">
          <template #top>
            <v-toolbar elevation="0" color="transparent">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="Addcategory"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>New Category</span>
              </v-tooltip>
              <v-divider class="mx-4" vertical />

              <v-spacer />

              <v-flex>
                <v-text-field
                  v-model="searchcategory"
                  append-icon="mdi-magnify"
                  placeholder="Search"
                  filled
                  dense
                  class="mb-n5"
                />
              </v-flex>
            </v-toolbar>
            <div class="py-2">
              <v-divider />
            </div>
          </template>
          <template #body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ index+1 }}</td>
                <td>{{ item.cat_name }}</td>
                <td>{{ item.cat_details }}</td>
                <td width="120" align="right">
                  <v-btn icon class="mr-2" color="success" @click="EditCategory(item)">
                    <v-icon small>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn color="error" icon @click="DeleteCategory(item)">
                    <v-icon small>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmCategory" max-width="350">
      <v-card class="pa-3">
        <v-card-title class="headline">
          ยืนยันการลบ?
        </v-card-title>
        <v-card-text>
          <v-form ref="form_del_Cate">
            เมื่อคุณยืนยันการลบ คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้
            <p>
              Category <v-chip color="red lighten-4" class="ml-0 mr-2 black--text" label small>
                {{ cateName }}
              </v-chip>
            </p>
            <v-text-field
              v-model="cateNameDel"
              label="Category Name"
              :rules="[
                v => !!v || 'Enter Category Name',
              ]"
              outlined
              dense
              class="px-5"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmCategory = false">
            Cancel
          </v-btn>
          <v-btn color="success" @click="submitDeletecategory">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <product-form ref="productform" @add="submitAddproduct" @edit="submitEditproduct" />
    <category-form ref="categoryform" @add="submitAddcategory" @edit="submitEditcategory" />
  </v-container>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  components: {
    barcode: VueBarcode
  },
  layout: 'Dashboard',
  data: () => ({
    products: [],
    id: '',
    img: '',
    headers: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      {
        text: 'Barcode',
        value: 'p_code'
      },
      {
        text: 'Name ',
        value: 'p_name '
      },
      {
        text: 'Cost',
        value: 'p_cost'
      },
      {
        text: 'Price',
        value: 'p_price'
      },
      {
        text: 'Stock',
        value: 'p_stock'
      },
      {
        text: 'Category',
        value: 'cat_name'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'right'
      }
    ],
    search: '',
    confirm: false,
    barcode_dialog: false,
    barcode: '',
    categorys: [],
    headercategory: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      {
        text: 'Name',
        value: 'cat_name'
      },
      {
        text: 'Details ',
        value: 'cat_details '
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'right'
      }
    ],
    cateid: '',
    tbl_print: false,
    cat_id: '',
    mask_barcode: '#############',
    productCodeDel: '',
    productNameDel: '',
    allcategory_dialog: false,
    cateNameDel: '',
    cateName: '',
    confirmCategory: false,
    searchcategory: ''
  }),
  head () {
    return { title: 'Stores' }
  },
  watch: {
    confirm (val) {
      if (!val) {
        this.$refs.form_del.reset()
        this.id = ''
        this.productNameDel = ''
      }
    }
  },
  mounted () {
    this.showproducts()
  },
  methods: {
    async showproducts () {
      await this.$axios.$post('/stores/products')
        .then((res) => { this.products = res.products })
      await this.$axios.$post('/stores/categorys')
        .then((res) => { this.categorys = res.categorys })
    },
    AddProduct () {
      this.$refs.productform.open('add')
    },
    async submitAddproduct (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      const product = this.DataForm(data)
      await this.$axios.$post('/stores/create_product', product, {
        headers: { 'Content-type': 'multipart/form-data' }
      }).then((res) => {
        if (res.success) {
          this.$store.commit('SET_SUCCESS', 'Add product success')
        } else if (res.error_code) {
          this.$store.commit('SET_ERROR', 'ERROR Product Code  ')
        } else if (res.erorr_img) {
          this.$store.commit('SET_ERROR', 'ERROR Product IMG  ')
        } else {
          this.$store.commit('SET_ERROR', 'Can`t Add product ')
        }
        this.showproducts()
        this.$refs.productform.close()
        this.$store.commit('LOADIND_DIALOG', false)
      })
    },
    EditProduct (data) {
      this.id = data.p_id
      this.$refs.productform.open('edit', data)
    },
    async submitEditproduct (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      const DATA = this.DataForm(data)
      await this.$axios.$put(`/stores/update_product/${this.id}`, DATA)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Update User success')
          } else {
            this.$store.commit('SET_ERROR', 'Error Update')
          }
          this.id = ''
          this.showproducts()
          this.$refs.productform.close()
          this.$store.commit('LOADIND_DIALOG', false)
        })
    },
    DeleteProduct (data) {
      this.id = data.p_id
      this.img = data.p_img
      this.productNameDel = data.p_code
      this.confirm = true
    },
    async submitDeleteproduct () {
      if (this.$refs.form_del.validate()) {
        this.confirm = false
        await this.$axios.$delete(`/stores/delete_product/${this.id}/${this.productCodeDel}/${this.img}`)
          .then((res) => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Delete Product success')
            } else if (res.error_code) {
              this.$store.commit('SET_ERROR', 'Error BARCODE')
            } else {
              this.$store.commit('SET_ERROR', 'Error Delete')
            }
            this.id = ''
            this.productNameDel = ''
            this.showproducts()
          })
      }
    },
    SHOW_Barcode (item) {
      this.barcode = item.p_code
      this.barcode_dialog = true
    },
    imgproduct (img) {
      if (!img) {
        return 'img-no-product.png'
      } else {
        return img
      }
    },
    DataForm (obj) {
      const Data = new FormData()
      for (const key in obj) {
        Data.append(key, obj[key])
      }
      return Data
    },
    async productofcategory () {
      if (this.cateid) {
        await this.$axios.$put(`/stores/productbycategory/${this.cateid}`).then((res) => {
          if (res.success) {
            this.products = res.products
          } else {
            this.$store.commit('SET_ERROR', 'Error Find DATA')
            setTimeout(() => {
              this.showproducts()
            }, 2000)
          }
        })
      } else {
        this.showproducts()
      }
    },
    Addcategory () {
      this.$refs.categoryform.open('add')
    },
    async submitAddcategory (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$post('/stores/create_category', data)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Add Category success')
          } else if (res.error_name) {
            this.$store.commit('SET_ERROR', 'ERROR Category Name')
          } else {
            this.$store.commit('SET_ERROR', 'Can`t Add Category ')
          }
          this.showproducts()
          this.$refs.categoryform.close()
          this.$store.commit('LOADIND_DIALOG', false)
        })
    },
    EditCategory (data) {
      this.id = data.cat_id
      this.$refs.categoryform.open('edit', data)
    },
    async submitEditcategory (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$put(`/stores/update_category/${this.id}`, data)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Update User success')
          } else {
            this.$store.commit('SET_ERROR', 'Error Update')
          }
          this.id = ''
          this.showproducts()
          this.$refs.categoryform.close()
          this.$store.commit('LOADIND_DIALOG', false)
        })
    },
    DeleteCategory (data) {
      this.id = data.cat_id
      this.cateName = data.cat_name
      this.confirmCategory = true
    },
    async submitDeletecategory () {
      if (this.$refs.form_del_Cate.validate()) {
        this.confirmCategory = false
        await this.$axios.$delete(`/stores/delete_category/${this.id}/${this.cateNameDel}`)
          .then((res) => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Delete Product success')
            } else if (res.error_code) {
              this.$store.commit('SET_ERROR', 'Error CODE')
            } else {
              this.$store.commit('SET_ERROR', 'Error Delete')
            }
            this.id = ''
            this.cateNameDel = ''
            this.showproducts()
          })
      }
    },
    printproduct () {
      /* this.tbl_print = true
        setTimeout(() => {
          this.$htmlToPaper('tbl_product')
          setTimeout(() => {
            this.tbl_print = false
          }, 1)
        }, 1) */
    }
  }
}
</script>

<style>

</style>
