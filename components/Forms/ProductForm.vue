<template>
  <v-dialog v-model="Product_dialog" max-width="400">
    <v-card class="px-5">
      <v-form ref="form_add_edit" @submit.prevent="save">
        <v-card-title>
          <span class="headline">{{ FormTitle }}</span>
          <v-spacer />
          <v-btn icon class="mr-n7 mt-n4" @click="Product_dialog=false">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="product.p_code"
                v-mask="mask_barcode"
                label="Barcode"
                :rules="[
                  v => !!v || 'enter Barcode',
                  v => (v && v.length >= 13) || 'Min 13 characters',
                  check_code || 'errorcode'
                ]"
                :disabled="mode=='edit'"
                validate-on-blur
                prepend-inner-icon="mdi-barcode"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex>
              <v-text-field
                v-model="product.p_name"
                label="ProductName"
                :rules="[v => !!v || 'enter_name']"
                validate-on-blur
                prepend-inner-icon="mdi-alphabetical-variant"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field
                v-model="product.cost_price"
                label="Price"
                :rules="[v => !!v || 'p_cost']"
                suffix="฿"
                type="number"
                validate-on-blur
                prepend-inner-icon="mdi-cart-arrow-down"
              />
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field
                v-model="product.sale_price"
                validate-on-blur
                label="Sale"
                suffix="฿"
                type="number"
                :rules="[v => !!v || 'sale_price', check_price || 'check_price']"
                prepend-inner-icon="mdi-cart-arrow-up"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs6 class="pr-1">
              <v-text-field
                v-model="product.stock"
                validate-on-blur
                label="Stock"
                type="number"
                :rules="[ v => !!v || 'p_stock']"
                prepend-inner-icon="mdi-store"
              />
            </v-flex>
            <v-flex xs6 class="pl-1">
              <v-select
                v-model="product.category"
                :items="categorys"
                item-text="cat_name"
                item-value="cat_id"
                label="Category"
                prepend-inner-icon="mdi-group"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="product.p_details"
                label="Details"
                prepend-inner-icon="mdi-clipboard-list-outline"
              />
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12>
              <v-file-input
                v-if="mode==='add'"
                v-model="product.p_img"
                label="Img"
                validate-on-blur
                :rules="imgRules"
                accept="image/*"
                class="py-0"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-5">
          <v-spacer />
          <v-btn color="error" @click="close">
            CLOSE
          </v-btn>
          <v-btn color="success" type="submit">
            {{ mode=='add'?'SAVE':'UPDATE' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    Product_dialog: false,
    mode: '',
    product: {
      p_id: '',
      p_code: '',
      p_name: '',
      cost_price: '',
      sale_price: '',
      stock: '',
      p_details: '',
      p_img: [],
      category: '',
      supplier: ''
    },
    mask_barcode: '#############',
    imgRules: [v => !v || v.size < 2000000 || 'Img size should be less than 2 MB!'],
    categorys: [],
    img: undefined,
    barcode: ''
  }),
  computed: {
    FormTitle () {
      return this.mode === 'add' ? 'New Product' : 'Edit Product'
    },
    check_price () {
      return Number(this.product.sale_price) >= Number(this.product.cost_price)
    },
    check_code () {
      return this.product.p_code !== this.barcode
    }
  },
  watch: {
    mode (val) {
      if (val === 'add') {
        this.reset_form()
      }
    },
    Product_dialog (val) {
      if (!val) {
        this.$refs.form_add_edit.reset()
      }
    },
    async 'product.p_code' (val) {
      if (val && val.length > 12) {
        await this.$axios.$post('/stores/checkbarcode', { code: val })
          .then((res) => {
            if (res.success) {
              this.barcode = res.data.p_code
            }
          })
      }
    }
  },
  mounted () {
    this.getcategory()
  },
  methods: {
    async getcategory () {
      await this.$axios.$post('/stores/categorys')
        .then((res) => { this.categorys = res.categorys })
    },
    open (mode, data) {
      this.Product_dialog = true
      this.mode = mode
      if (data) {
        this.product = { ...data }
      }
    },
    close () {
      this.Product_dialog = false
      this.reset_form()
    },
    reset_form () {
      this.product = {
        p_id: '',
        p_code: '',
        p_name: '',
        cost_price: '',
        sale_price: '',
        stock: '',
        p_details: '',
        p_img: [],
        category: '',
        supplier: ''
      }
    },
    save () {
      if (this.$refs.form_add_edit.validate()) {
        this.$emit(this.mode, this.product)
      }
    }
  }
}
</script>

<style>

</style>
