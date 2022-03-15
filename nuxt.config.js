export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '20220302_app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/firebase',
  ],
   /*
  ** Firebase Configuration
  */
  firebase: {
      config: {
        apiKey: 'AIzaSyCCrjodp3GuXJoNSjst5ukSTNcPY0w7R-Y',
        authDomain: 'english-article-adee4.firebaseapp.com',
        projectId: 'english-article-adee4',
        storageBucket: 'english-article-adee4.appspot.com',
        messagingSenderId: '280426861108',
        appId: '1:280426861108:web:2b18a0b0507cda9385f061',
        measurementId: 'G-T6W7BBLDL1'
      },
      services: {
        auth: true,
        firestore: true,
        storage: true,
        realtimeDb: true,
      },
    },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
