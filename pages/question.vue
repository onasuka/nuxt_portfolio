<template>
  <v-container>
    <div v-if="questionList == 0">
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
      <div v-if="status">
        <div>
          <p class="questions__ttl">単語テスト</p>
          <p class="mb-2">第{{ number + 1 }}問</p>
          <h4>{{ currentQuestion.word }}の意味は？</h4>
          <v-textarea v-model="answer" auto-grow class="pa-0" rows="1"></v-textarea>
          <v-btn @click="selectAnswer(answer)" block> 回答する </v-btn>

        </div>
      </div>
      <div v-else class="end">
        <p>
          終了です。<br /><span>{{ questionList.length }}</span>問中<span>{{ correctCount }}</span>問正解です。
        </p>
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
        console.log("正解！")
        alert("正解");
      } else {
         alert("不正解！答えは"+ `${this.questionList[this.number].meaning}`);
      }
      this.number++;
      questionLength--;
      console.log(questionLength)
      if (questionLength == 0) {
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
.end {
  font-size: 1rem;
  font-weight: bold;
  span {
    font-size: 1.7rem;
    padding: 0 5px;
  }
}
</style>
