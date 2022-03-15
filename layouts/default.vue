<template>
  <v-app>
    <v-navigation-drawer
      color=" lighten-1"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  <v-footer
      color="primary lighten-1"
      padless
    >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
     <!-- <v-bottom-navigation
    v-model="value"
    :background-color="color"
    dark
    shift
  >
    <v-btn>
      <span>Video</span>
      <v-icon>mdi-television-play</v-icon>
    </v-btn>

    <v-btn>
      <span>Music</span>
      <v-icon>mdi-music-note</v-icon>
    </v-btn>

    <v-btn>
      <span>Book</span>
      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn>
      <span>Image</span>
      <v-icon>mdi-image</v-icon>
    </v-btn>
  </v-bottom-navigation> -->
  </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
         {
          icon: 'mdi-chart-bubble',
          title: 'TOP',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ログイン画面',
          to: '/signin'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '新規登録',
          to: '/signup'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ユーザー',
          to: '/mypage'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ブックマーク一覧',
          to: '/articles'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '記事詳細ページ',
          to: '/articles/[id]'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '設定',
          to: '/settings'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '英語アプリ'
    }
  }
}
</script>
<style lang="scss" scoped>
.v-toolbar__title {
  font-size: 1.5rem;
}
.v-list-item__title {
  font-size: 1.5rem;
}
</style>