<template>
  <v-btn
    depressed
    block 
    color="error"
    @click="signOut">
     ログアウト
    </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    signOut(err:string) {
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
  },
});
</script>
