<template>
  <v-container>
    <p class="word__ttl">英単語一覧</p>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <div class="text-right">
          <v-btn color="blue" dark v-bind="attrs" v-on="on" class="mb-8"> 単語登録 </v-btn>
        </div>
      </template>
      <v-card class="pa-5">
        <p class="word__ttl">単語登録</p>
        <v-text-field label="保存したい英単語" v-model="newWord"></v-text-field>
        <v-textarea
          label="意味"
          v-model="newMeaning"
          auto-grow
          class="pa-0"
          rows="2"
        ></v-textarea>
        <v-btn color="primary" class="my-5" @click="addWord()" block> 保存 </v-btn>
        <v-btn color="error" @click="cancelWord" block> キャンセル </v-btn>
      </v-card>
    </v-dialog>
    <v-divider></v-divider>
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
            v-if="questionBoolen[index]"
            color="red"
            dark
              @click="questionDelete(wordItem,index)"
          >
            問題削除
          </v-btn>
          <v-btn
            v-else
            color="blue"
            dark
              @click="questionAdd(wordItem,index)"
          >
            問題追加
          </v-btn>
          <v-card-actions>
            <v-btn icon @click="edit(index)">
              <v-icon>mdi-border-color</v-icon>
            </v-btn>

            <v-btn icon @click="removeWord(index,wordItem)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
      <v-form
        class="py-2 d-flex justify-space-between align-end"
        v-if="wordItem.isEditing"
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
          <v-btn color="primary" @click="saveWord(wordItem,index)"> 保存 </v-btn>
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
  data() {
    return {
      newWord: "",
      newMeaning: "",
      dialog: false,
      wordList: [{
        isEditing:false
      }],
      wordQuestion: "",
      meaningQuestion: "",
      questionBox: false,
      testQuestion: [],
      questionBoolen:[]
    };
  },
  async asyncData({ store }) {
    let questionItem = await store.dispatch("questionList");
    let wordItem = await store.dispatch("wordList")
    return {
      wordList: store.state.wordList
    }
  },
  methods: {
    edit(index: number) {
      this.wordList[index].isEditing == true
        ? (this.wordList[index].isEditing = false)
        : (this.wordList[index].isEditing = true);
        
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
      return this.wordList = this.$store.state.wordList
    },
    cancelWord() {
      this.dialog = false;
      this.newWord = "";
      this.newMeaning = "";
    },
    saveWord(wordItem: { word:string, meaning: string, id:string},index: number) {
      this.$store.dispatch("saveWord", {
        wordInfo:this.wordList[index],
        wordNum: index,
        id: wordItem.id
      });
      this.edit(index);
    },
    removeWord(index: number,wordItem: { word:string, meaning: string, id:string}) {
      if(this.questionBoolen[index]) {
        const result = window.confirm("テスト問題も削除されますが問題ないでしょうか？")
        if(result) {
          this.$store.dispatch("questionDelete", wordItem);
          this.$store.dispatch("removeWord", {
           word: this.wordList[index],
           wordNumber: index
          })
          return this.questionBoolen.splice(index,1)
        }
      }
      this.$store.dispatch("removeWord", {
       word: this.wordList[index],
       wordNumber: index
      }).then(() => {
        this.questionBoolen.splice(index,1)
      });
    },
    questionAdd(wordItem: { word:string, meaning: string, id:string},index:number) {
      const result = window.confirm("テスト問題に追加しますか？")
      if(result) {
        this.$set(this.questionBoolen, index, true);
        this.$store.dispatch("questionAdd", {
          word: wordItem.word,
          meaning: wordItem.meaning,
          id:  wordItem.id,
        });
      }
    },
    questionDelete(wordItem: { word:string, meaning: string, id:string}, index: number) {
      this.$set(this.questionBoolen, index, false);
      this.$store.dispatch("questionDelete", wordItem);
    },
  },
  created() {
    let questionWordsId = this.$store.getters.questionWordId;
    let headlines:{id: string}[] = this.wordList;
    for (let i = 0; i < headlines.length; i++) {
      let headlineId = headlines[i].id;
      let questionBoolen:boolean[] = this.questionBoolen;
      questionWordsId.filter(function (value: string) {
        if (value === headlineId) {
          questionBoolen[i] = true;
        }
      });
    }
  },
  watch: {
    watchWord() {
      this.wordList = this.$store.state.wordList;
    },
    watchBolle() {
      this.questionBoolen
    }
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
