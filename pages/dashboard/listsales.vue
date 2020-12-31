<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table :items="lists" :search="search">
        <template #top>
          <v-card-title>
            <v-spacer />

            <v-flex xs3 class="mb-n6">
              <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search" filled dense />
            </v-flex>
          </v-card-title>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template #body="{ items }">
          <thead>
            <tr>
              <th>#</th>
              <th>OrderNO</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Get</th>
              <th>Change</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" @click="list_info(item)">
              <td>{{ index+1 }}</td>
              <td>{{ item.s_order }}</td>
              <td>{{ item.cus_name }}</td>
              <td>{{ item.s_total }}</td>
              <td>{{ item.s_get }}</td>
              <td>{{ item.s_change }}</td>
              <td>{{ item.pay_type }}</td>
              <td>{{ item.s_date }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="List_dialog" width="600">
      <v-card>
        <v-card-title class="headline">
          Order NO.{{ Order }}
          <v-spacer />
          <v-btn icon class="mt-n2 mr-n3" @click="List_dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in listsale_info" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.p_name }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.sd_price }}</td>
                  <td>{{ item.qty * item.sd_price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="List_dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'Dashboard',
  data: () => ({
    lists: [],
    listsale_info: [],
    search: '',
    List_dialog: false,
    Order: ''

  }),
  mounted () {
    this.Show_list()
  },
  methods: {
    async Show_list () {
      await this.$axios.$post('/sales/listsales')
        .then((res) => { this.lists = res.lists })
    },
    async list_info (item) {
      await this.$axios.$put(`sales/listsale_info/${item.s_order}`).then((res) => {
        this.listsale_info = res.lists
        this.Order = item.s_order
        this.List_dialog = true
      })
    }
  }
}
</script>

<style>

</style>
