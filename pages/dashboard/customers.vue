<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table
        :headers="headers"
        :items="customers"
        :search="search"
      >
        <template #top>
          <v-card-title>
            <v-spacer />
            <v-flex xs3 class="mb-n6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="Search"
                filled
                dense
              />
            </v-flex>
          </v-card-title>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template #body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.cus_code }}</td>
              <td>{{ item.cus_name }}</td>
              <td>{{ item.cus_email }}</td>
              <td>{{ item.cus_phone }}</td>
              <td>{{ item.cus_cash }}</td>
              <td align="right">
                <v-icon v-if="item.activate" large color="success">
                  mdi-check-circle-outline
                </v-icon>
                <v-btn v-else @click="activate(item.cus_id)">
                  Activate
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>

        <template #no-results>
          <div>
            <span>NO RESULTS HERE!</span>
            <v-btn color="primary" @click="getallcustomer">
              Reset
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'Dashboard',
  data: () => ({
    headers: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      {
        text: 'Code',
        value: 'cus_code'
      },
      {
        text: 'Name',
        value: 'cus_name'
      },
      {
        text: 'Email',
        value: 'cus_email'
      },
      {
        text: 'Phone',
        value: 'cus_phone'
      },
      {
        text: 'Cash',
        value: 'cus_cash'
      },
      {
        text: 'Activate',
        value: 'activate',
        sortable: false,
        align: 'right'
      }
    ],
    customers: [],
    search: ''
  }),
  head () {
    return { title: 'Customer' }
  },
  mounted () {
    this.getallcustomer()
  },
  methods: {
    async getallcustomer () {
      await this.$axios.$post('/customers').then((res) => {
        this.customers = res.customers
      })
    },
    async activate (id) {
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$put(`/customer/activate/${id}`)
        .then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Activate User success')
            } else {
              this.$store.commit('SET_ERROR', 'erorr Activate')
            }
            this.getallcustomer()
            this.$store.commit('LOADIND_DIALOG', false)
          }, 3000)
        })
    }
  }
}
</script>
