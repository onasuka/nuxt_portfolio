<template>
  <v-app>
    <v-navigation-drawer
      color=" lighten-1"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      class="pa-3"
      fixed
      app
    >
    <p class="user_name">
     {{ userName }}
    </p>
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
      <signUpBtn />
      <logintBtn />
      <logoutBtn />
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        @click="$router.push('/')"
        style="cursor:pointer"
        v-text="title" />
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
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Pooforio</strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>

<script>
import logoutBtn from "~/components/commonParts/logoutBtn.vue";
import logintBtn from "~/components/commonParts/loginBtn.vue";
import signUpBtn from "~/components/commonParts/signUpBtn.vue";
export default {
  components: {
    logoutBtn,
    logintBtn,
    signUpBtn
  },
  data () {
    return {
      userName: this.$store.state.profile.name,
      loggedIn: this.$store.state.loggedIn,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
         {
          icon: 'mdi-home',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-account-circle',
          title: 'ユーザー情報',
          to: '/mypage'
        },
        {
          icon: 'mdi-bookmark',
          title: 'ブックマーク一覧',
          to: '/articles'
        },
        {
          icon: 'mdi-view-list',
          title: '単語一覧',
          to: '/wordList'
        },
        {
          icon: 'mdi-lead-pencil',
          title: '理解度テスト',
          to: '/question'
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
  font-size: 1.2rem;
}
.user_name {
  margin-bottom: 0;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}
</style>