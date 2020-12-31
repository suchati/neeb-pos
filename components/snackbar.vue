<template>
  <v-snackbar
    v-model="$store.state.snackbar.show"
    :color="$store.state.snackbar.type"
    timeout="3000"
    top
  >
    {{ $store.state.snackbar.msg }}
    <template #action="{ attrs }">
      <v-icon
        v-bind="attrs"
        @click="$store.state.snackbar.show = false"
      >
        mdi-close
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  watch: {
    '$store.state.snackbar.show' (val) {
      if (val) {
        setTimeout(() => this.$store.commit('CLEAR_SNACKBAR'), 3000)
      }
    }
  }
}
</script>

<style>

</style>
