<template>
  <v-container>
    <p class="word__ttl">英単語一覧</p>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <div class="text-right">
          <v-btn color="blue" dark v-bind="attrs" v-on="on"> 単語登録 </v-btn>
        </div>
      </template>
      <v-card class="pa-5">
        <p class="word__ttl">単語登録</p>
        <v-text-field label="保存したい英単語" v-model="newWord"></v-text-field>
        <v-textarea
          label="意味・メモ帳"
          v-model="newMeaning"
          auto-grow
          class="pa-0"
          rows="2"
        ></v-textarea>
        <v-btn color="primary" class="my-5" @click="addWord()" block> 保存 </v-btn>
        <v-btn color="error" @click="cancelWord" block> キャンセル </v-btn>
      </v-card>
    </v-dialog>
    <div v-for="(wordItem, index) in wordList" :key="index" class="word__box">
      <div
        class="pt-2 d-flex justify-space-between align-end"
        v-if="!wordItem.isEditing"
      >
        <div>
          <small>英単語</small>
          <p class="mb-0 word__text">{{ wordItem.word }}</p>
          <small>意味</small>
          <p class="mt-0">{{ wordItem.meaning }}</p>
        </div>
        <div>
          <v-btn
            color="blue"
            dark
              @click="questionAdd(wordItem)"
          >
            問題追加
          </v-btn>
          <v-card-actions>
            <v-btn icon @click="edit(index)">
              <v-icon>mdi-border-color</v-icon>
            </v-btn>

            <v-btn icon @click="removeWord(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
      <v-form
        class="py-2 d-flex justify-space-between align-end"
        v-if="wordItem.isEditing"
        @submit.prevent="editTask(index, wordItem)"
      >
        <div class="edit__box">
          <small>英単語</small>
          <v-text-field
            type="text"
            v-model="wordItem.word"
            class="pa-0 ma-0"
          ></v-text-field>
          <small>意味</small>
          <v-textarea
            type="text"
            v-model="wordItem.meaning"
            rows="1"
            auto-grow
            class="pa-0 ma-0"
          ></v-textarea>
        </div>

        <div class="mb-5">
          <v-btn color="primary" @click="saveWord(index)"> 保存 </v-btn>
          <v-btn class="white--text" color="red" @click="edit(index)">
            キャンセル
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data: () => ({
    newWord: "",
    newMeaning: "",
    dialog: false,
    wordList: [],
    wordQuestion: "",
    meaningQuestion: "",
    questionBox: false,
    testQuestion: [],
  }),
  async asyncData({ store }: any) {
    let items = await store.dispatch("wordList");
    let questionItem = await store.dispatch("questionList");
    return {
      wordList: store.state.wordList,
    };
  },
  methods: {
    // 英単語削除
    remove(index: any) {
      this.wordList.splice(index, 1);
    },
    edit(index: any) {
      this.wordList[index].isEditing == true
        ? (this.wordList[index].isEditing = false)
        : (this.wordList[index].isEditing = true);
    },
    editTask(key: any, wordData: any) {
      wordData.word = this.wordData.id[0].value;
      wordData.meaning = this.wordData.id[1].value;
      this.$set(this.isEditing, key, false);
    },
    addWord() {
      if(this.newWord == "" || this.newMeaning == "" ) return;
      this.$store.dispatch("addWord", {
        word: this.newWord,
        meaning: this.newMeaning,
      });
      this.newWord = "";
      this.newMeaning = "";
      this.dialog = false;
    },
    cancelWord() {
      this.dialog = false;
    },
    saveWord(index: number) {
      this.$store.dispatch("saveWord", this.wordList[index]);
      this.edit(index);
    },
    removeWord(index: number) {
      this.$store.dispatch("removeWord", this.wordList[index]);
    },
    questionAdd(wordItem) {
      const result = window.confirm("テスト問題に追加しますか？")
      if(result) {
        this.$store.dispatch("questionAdd", {
          word: wordItem.word,
          meaning: wordItem.meaning,
        });
      }
    },
    removeQuestion(index: number) {
      this.$store.dispatch("removeQuestion", this.wordList[index]);
    },
  },
  mounted() {
    let questionWords = this.$store.getters.questionWord;
    let headlines = this.wordList;
    for (let i = 0; i < headlines.length; i++) {
      let headlineTitle = headlines[i].word;
      let act = this.testQuestion;
      questionWords.filter(function (value: string) {
        if (value === headlineTitle) {
          act[i] = true;
        }
      });
    }
  },
  watch: {
    watchWord() {
      this.wordList = this.$store.state.wordList;
    },
  },
});
</script>

<style lang="scss" scoped>
.word__box {
  border-bottom: 1px solid #1c63bf;
  &:first-of-type {
    border-top: none;
  }
  small {
    font-size: 0.65em;
    color: #868686;
  }
  input {
    width: 100%;
    border: solid 1px #b1b1b1;
    border-radius: 5px;
  }
}

.word__ttl {
  font-size: 2rem;
  margin: 10px 0 0;
  padding: 0 0 5px;
  font-weight: bold;
  text-align: center;
  color: #1c63bf;
}

.edit__box {
  width: 70%;
}

.word__text {
  white-space: pre-wrap;
}
</style>
