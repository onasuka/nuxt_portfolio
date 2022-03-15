<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h4 class="text-center">設定</h4>
      </v-card-title>
        <nuxt-link to="/signup">アカウント設定</nuxt-link>
      <v-divider></v-divider>
        <nuxt-link to="/signup">通知</nuxt-link>
      <v-divider></v-divider>
        <nuxt-link to="/signup">使い方</nuxt-link>
      <v-divider></v-divider>
        <nuxt-link to="/signup">よくあるご質問</nuxt-link>
      <v-divider></v-divider>
      <v-card-text>
      
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style lang="scss" scoped>
h4 {
  font-size: 2rem;
}
 a {
   padding-left: 16px;
   font-size: 1.5rem;
   text-decoration: underline;
 }
 hr {
      margin: 10px 0;
 }
</style>