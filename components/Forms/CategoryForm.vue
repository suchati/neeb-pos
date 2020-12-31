<template>
  <v-dialog
    v-model="category_dialog"
    width="400"
  >
    <v-card class="pa-5">
      <v-form ref="form_add_edit_category" @submit.prevent="save">
        <v-card-title class="headline">
          {{ FormTitle }}
          <v-spacer />
          <v-btn icon class="mr-n7 mt-n12" @click="category_dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-text-field
            ref="name"
            v-model="categorys.cat_name"
            label="Categoryname"
            clearable
            outlined
            validate-on-blur
            :rules="[v => !!v || 'val_Categoryname']"
          />

          <v-text-field
            ref="details"
            v-model="categorys.cat_details"
            label="Category Detail"
            clearable
            outlined
            validate-on-blur
            :rules="[v => !!v || 'val_details']"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
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
    category_dialog: false,
    mode: '',
    categorys: {
      cat_name: '',
      cat_details: ''
    }

  }),
  computed: {
    FormTitle () {
      return this.mode === 'add' ? 'New Category' : 'Edit Category'
    }
  },
  watch: {
    mode (val) {
      if (val === 'add') {
        this.reset_form()
      }
    },
    category_dialog (val) {
      if (!val) {
        this.$refs.form_add_edit_category.reset()
      }
    }
  },
  methods: {
    open (mode, data) {
      this.category_dialog = true
      this.mode = mode
      if (data) {
        this.categorys = { ...data }
      }
    },
    close () {
      this.category_dialog = false
      this.reset_form()
    },
    reset_form () {
      this.categorys = {
        cat_name: '',
        cat_details: ''
      }
    },
    save () {
      if (this.$refs.form_add_edit_category.validate()) {
        this.$emit(this.mode, this.categorys)
      }
    },
    namefocus () {
      this.categorys.cat_name = ''
      setTimeout(() => {
        this.$refs.name.focus()
      }, 50)
    },
    detailsfocus () {
      this.categorys.cat_details = ''
      setTimeout(() => {
        this.$refs.details.focus()
      }, 50)
    }
  }
}
</script>

<style>

</style>
