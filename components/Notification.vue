<template>
  <v-badge
    class="mr-5"
    :color="notification > 0 ? 'error' : ''"
    :content="notification > 0 ? notification : ''"
    overlap
  >
    <v-menu
      v-model="menu"
      bottom
      left
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-bell
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list v-if="notificationItem.length>0">
          <div v-for="(item, index) in notificationItem" :key="index">
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="/vuetify-logo.svg"
                  alt="John"
                >
              </v-list-item-avatar>
              <v-list-item-title v-text="item.p_name" />
              <v-list-item-icon>
                <v-avatar
                  color="error"
                  size="20"
                  class="pa-3"
                >
                  <span class="white--text text-caption">
                    {{ item.stock }}
                  </span>
                </v-avatar>
              </v-list-item-icon>
            </v-list-item>

            <v-divider />
          </div>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                NO DATA
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-badge>
</template>

<script>
export default {
  data: () => ({
    notification: '',
    notificationItem: [],
    menu: false
  }),
  mounted () {
    this.shownotification()
  },
  methods: {
    async shownotification () {
      await this.$axios.$post('/stores/notification')
        .then((res) => {
          this.notification = res.data.stock
        })
      await this.$axios.$post('/stores/notificationItem')
        .then((res) => {
          this.notificationItem = res.data
        })
    }
  }
}
</script>

<style>

</style>
