<template>
  <v-dialog
    v-model="$store.state.loading_dialog"
    hide-overlay
    persistent
    width="300"
  >
    <v-card
      color="primary"
      class="pa-2"
      dark
    >
      <v-card-text>
        {{ text }}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Please wait.....'
    }
  }
}
</script>
