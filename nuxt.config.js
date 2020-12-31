export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'NPOS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: {
    color: '#00cd81'
  },

  ssr: false,
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: '#121212'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vue-plugins.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
    // '~/modules/ngrok'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'TH',
        file: 'en.js'
      },
      {
        code: 'th',
        name: 'EN',
        file: 'th.js'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'language'
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://neeb-pos.herokuapp.com/server' : 'http://localhost:3000/server'
    // baseURL: 'https://243d4c11d6d9.ngrok.io',
    // baseURL: '~/server'
  },

  // Server Middleware
  serverMiddleware: [
    { path: '/server', handler: '~/server' }
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        /* dark: {
          primary: '#027BE3',
          accent: '#9C27B0',
          secondary: '#26A69A',
          info: '#31CCEC',
          warning: '#F2C037',
          error: '#C10015',
          success: '#21BA45'
        } */
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
