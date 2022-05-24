<template>
  <v-container>
    <p class="questions__ttl">単語テスト</p>
    <h3 class="title">問題1</h3>
    <template v-if="clear === false">
      <h2 v-show="badanswer">不正解！</h2>
      <p class="mt-5">「さる」の綴りは？</p>
      <v-textarea v-model="answer" auto-grow class="pa-0" rows="2"></v-textarea>
      <v-btn @click="check(answer)" block> 回答する </v-btn>
    </template>
    <template v-else>
      <h2 class="correct-answer">正解！</h2>
    </template>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data() {
    return {
      keywords:["monkey"],
      clear: false,
      badanswer: false,
      answer: "",
    };
  },
  methods: {
    check(answer) {
      let isCorrect = false;
      for (const keyword of this.keywords) {
        if (keyword === answer.toLowerCase()) {
          isCorrect = true;
          this.clear = true;
          break;
        }
      }
      if (isCorrect === false) {
        this.badanswer = true;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.questions__ttl {
  font-size: 1.5em;
  margin: 10px 0 0;
  padding: 0 0 5px;
  font-weight: bold;
  color: #1c63bf;
}

.correct-answer {
  color: #d50000;
  font-weight: bold;
}
</style>
