<template>
  <v-app dark>
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
  beforeCreate () {
    this.$vuetify.theme.dark = Boolean(store.get('Dark'))
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
