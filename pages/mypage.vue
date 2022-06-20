<template>
  <v-container>
    <v-row wrap justify="center" align="center">
      <v-col :sm="12" :md="8">
        <div class="password" v-show="isVisible">
          <v-card class="password__box">
            <v-form class="pa-5" @submit.prevent="saveEmail(password)">
              <div>
                <v-text-field
                  class="mt-0 pt-0"
                  validate-on-blur
                  v-model="password"
                  label="現在のパスワードを入力してください。"
                ></v-text-field>
              </div>
              <div class="text-right">
                <v-btn
                  color="primary"
                  type="submit"
                  @click="saveEmail(password)"
                >
                  更新
                </v-btn>
                <v-btn class="white--text" color="red" @click="editCancel">
                  キャンセル
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
        <v-form
          class="py-2"
          ref="changeProfile_form"
          v-if="editProfile"
          v-model="changeProfile_valid"
          lazy-validation
          @submit.prevent="saveProfile"
        >
          <div>
            <v-text-field
              class="mt-0 pt-0"
              v-model="profile.name"
              label="アカウント名"
            ></v-text-field>
            <v-text-field
              v-if="profile.email"
              class="mt-0 pt-0"
              :rules="emailRules"
              required
              validate-on-blur
              v-model="profile.email"
              label="Email"
            ></v-text-field>
          </div>

          <div class="text-right">
            <v-btn
              :disabled="!changeProfile_valid"
              color="primary"
              type="submit"
              @click="saveProfile"
            >
              保存
            </v-btn>
            <v-btn class="white--text" color="red" @click="editCancel">
              キャンセル
            </v-btn>
          </div>
        </v-form>
        <div v-else class="pa-6 text-center">
          <small>アカウント名</small>
          <p class="mb-0 mb-3">{{ profile.name }}</p>
          <div v-if="profile.email">
            <small>Email</small>
            <p class="mb-0">{{ profile.email }}</p>
          </div>
        </div>
        <v-divider></v-divider>
        <v-card-text>
          <v-btn block class="mb-2" color="info" @click="edit"
            >プロフィールを編集</v-btn
          >
          <v-btn 
           block
           v-if="profile.email"
           class="mb-2"
           color="info"
          @click="isPassword"
          >新しいパスワードに変更する</v-btn
          >
          <v-btn block class="mb-2" color="error" @click="signOut"
            >ログアウト</v-btn>
        </v-card-text>
        <div 
          class="password"
          v-show="isPasswordBox">
          <v-card class="password__box">
            <v-form
              class="py-8 px-5"
              v-model="changeValid"
              @submit.prevent="savePassword()"
            >
              <div>
                <v-text-field
                  class="mt-0 pt-0"
                  label="現在のパスワード"
                  required
                  v-model="nowPassword"
                  :append-icon="show_Password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_Password ? 'text' : 'password'"
                  validate-on-blur
                  :rules="nowPasswordRules"
                  @click:append="show_Password = !show_Password"
                ></v-text-field>
                <v-text-field
                  class="pt-0"
                  ref="changePassword"
                  v-model="changePassword"
                  label="新しいパスワード"
                  required
                  :append-icon="show_Password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_Password ? 'text' : 'password'"
                  :rules="changePasswordAgainRules"
                  validate-on-blur
                  @click:append="show_Password = !show_Password"
                ></v-text-field>
                <v-text-field
                  class="pt-0"
                  v-model="changePassword_again"
                  label="新しいパスワード（確認）"
                  required
                  :append-icon="show_Password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_Password ? 'text' : 'password'"
                  validate-on-blur
                  :rules="changePasswordAgainRules"
                  @click:append="show_Password = !show_Password"
                ></v-text-field>
              </div>

              <div class="text-right">
                <v-btn 
                 color="primary"
                 :disabled="!changeValid"
                 type="submit"
                 > 保存 </v-btn>
                <v-btn
                 class="white--text"
                 color="red"
                 @click="isPassword">
                  キャンセル
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      password: "",
      nowPassword:"",
      changePassword:"",
      changePassword_again:"",
      showPassword: false,
      editProfile: false,
      changeValid: true,
      isPasswordBox: false,
      profile: {
        name: this.$store.state.profile.name,
        email: this.$store.state.profile.email,
      },
      isVisible: false,
      changeProfile_valid: true,
      show_Password: false,
      emailRules: [
        (v) => {
          if (v) {
            return (
              /.+@.+\..+/.test(v) || "有効なメールアドレスを入力してください"
            );
          } else {
            return true;
          }
        },
      ],
      changePasswordAgainRules: [
        (v) => {
          if (v) {
            return (
              this.$refs.changePassword.value === v ||
              "確認用と一致しません"
            );
          } else {
            return true;
          }
        },
      ],
      nowPasswordRules: [
         (v:any) => !!v || 'パスワードを入力してください',
      ]
    };
  },
  methods: {
    edit() {
      this.editProfile == true
        ? (this.editProfile = false)
        : (this.editProfile = true);
    },
    editCancel() {
      this.profile.name = this.$store.state.profile.name;
      (this.profile.email = this.$store.state.profile.email),
        this.editProfile == true
          ? (this.editProfile = false)
          : (this.editProfile = true);
      this.isVisible = false;
    },
    signOut: function (err) {
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.push({
            name: "login",
          });
          this.$store.commit("logout");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    saveProfile() {
      let newEmail = this.profile.email;
      let userEmail = this.$store.state.profile.email;
      if (this.$refs.changeProfile_form) {
        if (newEmail !== userEmail) {
          console.log("現在：" + newEmail);
          console.log("過去：" + userEmail);
          console.log("変わったよ");
          this.isVisible = true;
        }
        this.$store.dispatch('saveProfile',{name: this.profile.name})
      }
    },
    saveEmail(password) {
      let newEmail = this.profile.email;
      console.log(newEmail);
      this.$store.dispatch("saveEmail", { newEmail, password });
    },
    savePassword() {
      let password = this.nowPassword
      let newPassword = this.changePassword
      this.$store.dispatch("savePassword", { password, newPassword });
    },
    isPassword() {
       this.isPasswordBox == true ? this.isPasswordBox = false : this.isPasswordBox = true
    }
  },
});
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

.password {
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(33, 33, 33);
    opacity: 0.46;
    z-index: 999;
  }
}
.password__box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  border-top: solid 5px #6aaaff;
  z-index: 9999;
}
</style>
