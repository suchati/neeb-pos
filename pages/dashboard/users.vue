<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table :headers="headers" :items="users" :search="search">
        <template #top>
          <v-card-title>
            <v-btn color="primary" dark @click="Add">
              <v-icon>mdi-plus-circle-outline</v-icon>
              <span class="ml-1">NEW</span>
            </v-btn>
            <v-divider class="mx-4" vertical />
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
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.u_name }}</td>
              <td>{{ item.phone }}</td>
              <td align="right" colspan="2">
                <v-btn
                  v-if="item.activate!==1"
                  :disabled="btnloading"
                  class="mr-2"
                  @click="activate(item.u_id)"
                  v-text="'Activate'"
                />
                <v-icon
                  v-else
                  large
                  color="success"
                  class="pr-12"
                >
                  mdi-check-circle-outline
                </v-icon>
                <v-btn small icon color="success" @click="editItem(item)">
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn small icon color="error" @click="deleteItem(item)">
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>

        <template #no-results>
          <div>
            <span>NO RESULTS HERE!</span>
            <v-btn color="primary" @click="getallusers">
              Reset
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="confirm" max-width="350">
      <v-card class="pa-3">
        <v-card-title class="headline">
          ยืนยันการลบ?
        </v-card-title>
        <v-card-text>
          <v-form ref="form_del" @submit.prevent="submitDelete">
            เมื่อคุณยืนยันการลบ คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้
            <p>
              Username
              <v-chip color="red lighten-4" class="ml-0 mr-2 black--text" label small>
                {{ UName }}
              </v-chip>
            </p>
            <v-text-field
              v-model="usernameDel"
              label="Username"
              :rules="[
                v => !!v || 'Enter Username',
              ]"
              outlined
              dense
              class="px-5"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirm = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text type="submit">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <user-form ref="UserForm" @add="submitAdd" @edit="submitEdit" />
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
        text: 'Username ',
        value: 'username'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Name',
        value: 'u_name'
      },
      {
        text: 'Phone',
        value: 'phone'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'right'
      }
    ],
    users: [],
    search: '',
    user_id: '',
    confirm: false,
    loading_dialog: false,
    btnloading: false,
    usernameDel: '',
    UName: ''
  }),
  head () {
    return { title: 'Users' }
  },
  mounted () {
    this.getallusers()
  },
  methods: {
    async getallusers () {
      await this.$axios.$post('/users').then((res) => {
        this.users = res.users
      })
    },
    async activate (id) {
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$put(`/users/activate/${id}`)
        .then((res) => {
          this.btnloading = true
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Activate User success')
            } else {
              this.$store.commit('SET_ERROR', 'erorr Activate')
            }
            this.getallusers()
            this.btnloading = false
            this.$store.commit('LOADIND_DIALOG', false)
          }, 3000)
        })
    },
    Add () {
      this.$refs.UserForm.open('add')
    },
    async submitAdd (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$post('/users/create', data)
        .then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Add User success')
            } else if (res.erorr_user) {
              this.$store.commit('SET_ERROR', 'erorr_user')
              this.$refs.UserForm.usernamefocus()
            } else if (res.erorr_email) {
              this.$store.commit('SET_ERROR', 'erorr_email')
              this.$refs.UserForm.emailfocus()
            } else {
              this.$store.commit('SET_ERROR', 'ERROR')
            }
            this.getallusers()
            this.$refs.UserForm.close()
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
    },

    editItem (item) {
      this.$refs.UserForm.open('edit', item)
    },
    async submitEdit (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$put(`/users/update/${data.u_id}`, data)
        .then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Update User success')
            } else {
              this.$store.commit('SET_ERROR', 'Error Update')
            }
            this.getallusers()
            this.$refs.UserForm.close()
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
    },

    deleteItem (item) {
      this.user_id = item.u_id
      this.confirm = true
      this.UName = item.username
    },
    async submitDelete () {
      if (this.$refs.form_del.validate()) {
        this.confirm = false
        await this.$axios.$delete(`/users/delete/${this.user_id}/${this.usernameDel}`)
          .then((res) => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Delete User success')
            } else if (res.error_user) {
              this.$store.commit('SET_ERROR', 'Error Username')
            } else {
              this.$store.commit('SET_ERROR', 'Error Delete')
            }
            this.user_id = ''
            this.usernameDel = ''
            this.getallusers()
          })
      }
    }
  }
}
</script>
