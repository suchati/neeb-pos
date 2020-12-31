<template>
  <v-list
    :dense="mini"
    nav
  >
    <v-list-item :to="localePath('/dashboard/dashboard')" link>
      <v-list-item-icon :class="mini ? '' : 'pl-2'">
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t('Dashboard')" />
      </v-list-item-content>
    </v-list-item>

    <v-divider :class="mini ? 'mb-1' : 'mb-2'" />

    <v-list-item :to="localePath('/dashboard/users')" link>
      <v-list-item-icon :class="mini ? '' : 'pl-2'">
        <v-icon>mdi-account-tie</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t('Users')" />
      </v-list-item-content>
    </v-list-item>

    <v-divider :class="mini ? 'mb-1' : 'mb-2'" />

    <v-list-item :to="localePath('/dashboard/stores')" link>
      <v-list-item-icon :class="mini ? '' : 'pl-2'">
        <v-icon>mdi-store</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t('Stores')" />
      </v-list-item-content>
    </v-list-item>

    <v-divider :class="mini ? 'mb-1' : 'mb-2'" />

    <v-list-item :to="localePath('/dashboard/categorys')" link>
      <v-list-item-icon :class="mini ? '' : 'pl-2'">
        <v-icon>mdi-tag-multiple-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text=" $t('Categorys')" />
      </v-list-item-content>
    </v-list-item>

    <v-divider :class="mini ? 'mb-1' : 'mb-2'" />

    <v-list-item :to="localePath('/dashboard/customers')" link>
      <v-list-item-icon :class="mini ? '' : 'pl-2'">
        <v-icon>mdi-account-group</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t('Customers')" />
      </v-list-item-content>
    </v-list-item>

    <v-divider :class="mini ? 'mb-1' : 'mb-2'" />

    <v-list-item :to="localePath('/dashboard/listsales')" link>
      <v-list-item-icon :class="mini ? '' : 'pl-2'">
        <v-icon>mdi-clipboard-text-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t('Listsale')" />
      </v-list-item-content>
    </v-list-item>

    <v-divider :class="mini ? 'mb-1' : 'mb-2'" />

    <v-list-item :to="localePath('/sales')" link>
      <v-list-item-icon :class="mini ? '' : 'pl-2'">
        <v-icon>mdi-cash-register</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t('Sales')" />
      </v-list-item-content>
    </v-list-item>

    <v-divider :class="mini ? 'mb-1' : 'mb-2'" />
  </v-list>
</template>

<script>
export default {
  props: {
    mini: {
      type: Boolean,
      default: null
    }
  }
}
</script>
