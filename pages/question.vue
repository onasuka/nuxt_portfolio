<template>
  <v-container>
    <div v-if="!questionList">
      <h3>単語一覧から問題を登録してください！</h3>
        <NuxtLink to="/wordList">
          <v-btn 
            block
            class="my-4">
            単語一覧へ
          </v-btn>
        </NuxtLink>
    </div>
    <div v-else>
      <p class="questions__ttl">単語テスト</p>
      <div v-if="status">
        <div>
          <p>第{{ number + 1 }}問</p>
          <h4>{{ currentQuestion.word }}の意味は？</h4>
          <v-textarea v-model="answer" auto-grow class="pa-0" rows="2"></v-textarea>
          <v-btn @click="selectAnswer(answer)" block> 回答する </v-btn>
        </div>
      </div>
      <div v-else class="end">
        終了です。<br />{{ questions.length }}問中{{ correctCount }}問正解です。
      </div>

    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data() {
    return {
      number: 0,
      status: true,
      correctCount: 0,
      questionList:[],
      answer: ""
    };
  },
  async asyncData({ store }: any) {
    let items = await store.dispatch("questionList");
    return {
      questionList: store.state.questionList,
    };
  },
  methods: {
    selectAnswer(answer:string) {
      let questionLength = this.questionList.length
      if(this.answer == "") return;
      if (this.answer == this.questionList[this.number].meaning) {
        this.correctCount++;
        alert("正解");
      }
      this.number++;
      console.log(this.number)
      questionLength--;
      if (this.questionLength == 0) {
        this.status = false;
      }
    },
  },
  computed: {
    currentQuestion() {
      return this.questionList[this.number];
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

a {
  text-decoration: none;
}
</style>
