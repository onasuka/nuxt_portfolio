<template>
  <v-container>
     <v-row wrap justify="center" align="center">
       <v-col :sm="12" :md="8">
        <!-- <div
          class="profile_img">
          <img src="~/assets/img/hoge.jpg" >
        </div> -->
        <v-form 
          class="py-2" 
          v-if="editProfile" 
          @submit.prevent="saveProfile(profile)">
          <div>
            <small>アカウント名</small>
             <v-text-field
              class="mt-0 pt-0"
              v-model="profile.name"></v-text-field>
            <small>Email</small>
             <v-text-field
              class="mt-0 pt-0"
              :rules="emailRules"
              validate-on-blur
              v-model="profile.email"></v-text-field>
          </div>
          
          <div
            class="text-right">
            <v-btn
              color="primary"
              type="submit"
            >
              保存
            </v-btn>
            <v-btn
              class="white--text"
              color="red"
              @click="editCancel"
            >
              キャンセル
            </v-btn>
          </div>
        </v-form >
        <div
          v-else
          class="pa-6 text-center">
          <small>アカウント名</small>
          <p class="mb-0 mb-3">{{ profile.name }}</p>
          <small>Email</small>
          <p class="mb-0">{{ profile.email }}</p>
        </div>
        <v-divider></v-divider>
        <v-card-text>
          <v-btn
            block
            class="mb-2"
            color="info"
            @click="edit"
            >プロフィールを編集</v-btn>
          <v-btn
            block
            class="mb-2"
            color="info">新しいパスワードに変更する</v-btn>
          <v-btn
            block
            class="mb-2"
            color="error"
            @click="signOut">ログアウト</v-btn>
        </v-card-text>
        <v-form 
          class="py-2" 
          @submit.prevent="editTask(index, wordData)">
          <div>
            <small>新しいパスワード</small>
             <v-text-field
              class="mt-0 pt-0"></v-text-field>
            <small>今のパスワード</small>
             <v-text-field
              class="mt-0 pt-0"></v-text-field>
          </div>
          
          <div
            class="text-right">
            <v-btn
              color="primary"
            >
              保存
            </v-btn>
            <v-btn
              class="white--text"
              color="red"
              @click="edit"
            >
              キャンセル
            </v-btn>
          </div>
        </v-form >
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
   return {
     password: '',
     showPassword: false,
     editProfile: false,
     profile: {
       name: this.$store.state.profile.name,
       email: this.$store.state.profile.email,
     },
    emailRules: [
      (v) => {
        if (v) {
            return (
                /.+@.+\..+/.test(v) ||
                '有効なメールアドレスを入力してください'
            )
        }else{
            return true
        }
      }
    ],
   }
  },

  methods: {
     edit(){
      this.editProfile == true ? (this.editProfile = false) : (this.editProfile = true);
    },
    editCancel() {
      this.profile.name = this.$store.state.profile.name
      this.profile.email =  this.$store.state.profile.email,
      this.editProfile == true ? (this.editProfile = false) : (this.editProfile = true);
    },
    signOut: function(err) {
      this.$store
      .dispatch('signOut')
      .then(() => {
        this.$router.push({
          name: 'login'
        })
        this.$store.commit('logout')
      })
      .catch((err) => {
        alert(err.message)
      })
    },
    saveProfile() {
      let userEmail = this.$store.state.profile.email
      if( this.profile.email !== userEmail) {
        this.$store.dispatch('saveProfile',{name: this.profile.name, email: this.profile.email})
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.profile_img {
  width: 25%;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>