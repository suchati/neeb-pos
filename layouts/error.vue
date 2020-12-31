<template>
  <v-layout
    align-center
    justify-center
    fill-height
  >
    <v-container>
      <v-col
        lg="4"
        md="5"
        sm="6"
        cols="12"
        class="mx-auto text-center"
      >
        <h1 v-if="error.statusCode === 404" class="text-h3">
          {{ pageNotFound }}
        </h1>
        <h1 v-else class="text-h3">
          {{ otherError }}
        </h1>
        <br>
        <v-btn color="primary" to="/">
          Home page
        </v-btn>
      </v-col>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
