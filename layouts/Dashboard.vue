<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-app-bar-nav-icon @click.stop="mini = !mini">
        <v-icon v-if="mini">
          mdi-format-indent-increase
        </v-icon>
        <v-icon v-else>
          mdi-format-indent-decrease
        </v-icon>
      </v-app-bar-nav-icon>
      <v-divider class="mx-3" inset vertical />
      <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer />

      <notification />

      <v-divider class="mx-2" inset vertical />

      <v-btn icon @click="setting_Drawer=true">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      permanent
      :mini-variant="mini"
      class="grey"
      :class="$vuetify.theme.dark?'darken-4':'lighten-4'"
      app
    >
      <v-list-item :class="mini ? 'px-2' : ''">
        <v-list-item-avatar>
          <v-img src="/vuetify-logo.svg" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            username
          </v-list-item-title>
          <v-list-item-subtitle>
            email
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />

      <menu-drawer :mini="mini" />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="setting_Drawer"
      app
      temporary
      right
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <strong>Setting </strong>
          </v-list-item-title>
        </v-list-item-content>
        <v-spacer />
        <v-btn icon @click="setting_Drawer=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Dark Mode
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              :label="$vuetify.theme.dark?'ON':'OFF'"
              class="ma-0 pa-0"
              hide-details
            />
          </v-list-item-icon>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Language
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <!-- <language /> -->
            <v-btn-toggle
              tile
            >
              <v-btn small :to="switchLocalePath('en')">
                EN
              </v-btn>
              <v-btn small :to="switchLocalePath('th')">
                TH
              </v-btn>
            </v-btn-toggle>
          </v-list-item-icon>
        </v-list-item>
        <v-divider />
        <v-divider />
        <v-list-group>
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>
                Backup
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-divider />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Database
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn
                :loading="backuploading"
                color="primary"
                @click="backup"
              >
                Start
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-divider />
      </v-list>

      <template #append>
        <v-dialog
          v-model="dialog_logout"
          width="400"
        >
          <template #activator="{ on, attrs }">
            <div class="pa-2">
              <v-btn
                block
                dark
                color="red"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-logout-variant</v-icon>
                <span class="ml-2">LOGOUT</span>
              </v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title class="headline">
              Logout
            </v-card-title>
            <v-divider />
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur.
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                @click="dialog_logout = false"
              >
                yes
              </v-btn>
              <v-btn
                color="success"
                @click="dialog_logout = false"
              >
                no
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-navigation-drawer>

    <v-main :class="$vuetify.theme.dark ? '' : 'grey lighten-2'">
      <nuxt />
    </v-main>
    <loading-dialog />
    <snackbar />
  </v-app>
</template>

<script>
import store from 'store'
export default {
  data: () => ({
    setting_Drawer: false,
    mini: true,
    dialog_logout: false,
    backuploading: false
  }),
  watch: {
    '$vuetify.theme.dark' (val) {
      store.set('Dark', val)
    }
  },
  beforeCreate () {
    this.$vuetify.theme.dark = Boolean(store.get('Dark'))
  },
  methods: {
    async backup () {
      this.backuploading = true
      await this.$axios.$post('/home/backupDB/').then((res) => {
        setTimeout(() => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Backup success')
          } else {
            this.$store.commit('SET_ERROR', 'erorr Backup')
          }
          this.backuploading = false
        }, 2000)
      })
    }
  }
}
</script>

<style>
html {
  overflow-y: auto
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
