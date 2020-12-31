<template>
  <v-overlay :value="$store.state.loading_circular">
    <v-progress-circular
      indeterminate
      size="70"
      width="7"
    />
  </v-overlay>
</template>
