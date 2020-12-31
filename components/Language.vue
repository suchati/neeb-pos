<template>
  <v-select
    v-model="language"
    :items="lang"
    height="20"
    style="max-width: 65px"
  >
    <template #item="{ item, attrs, on }">
      <v-list-item
        v-bind="attrs"
        link
        :to="switchLocalePath(item.src)"
        v-on="on"
      >
        <v-list-item-content v-text="item.text" />
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
export default {
  data () {
    return {
      language: {
        text: this.$i18n.locale === 'th' ? 'TH' : 'EN',
        src: this.$i18n.locale
      },
      lang: [
        { text: 'EN', src: 'en' },
        { text: 'TH', src: 'th' }
      ]
    }
  }
}
</script>
