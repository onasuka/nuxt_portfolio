<template>
  <v-container>
    <v-card>
      <div class="pa-6 d-flex justify-space-between align-center">
        <p class="mb-0">{{ name }}</p>
        <v-btn color="info">プロフィール編集</v-btn>
      </div>
      <v-divider></v-divider>
      <v-card-text>
       <v-btn color="error">ログアウト</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
   return {
     name: '名前ダミー',
     password: '',
     showPassword: false
   }
  },
})
</script>