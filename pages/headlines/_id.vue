<template>
  <div class="article">
    <div class="article_box">
      <div class="info_cat">
        <p class="genre">ジャンル：{{ headline.category[0] }}</p>
        <p class="day">{{ headline.pubDate }}</p>
      </div>
      <div>
        <div>
          <div class="heading_box">
            <h2 class="heading">{{ headline.title }}</h2>
            <div class="btn">
              <v-btn-toggle tile color="red accent-3" group>
                <v-btn>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <img :src="headline.image_url" />
          <p
            class="text"
            v-bind:class="[
              fontSize(),
              alignment(),
              {
                fontItalic: isItalicToggle,
                fontUnderLine: isUnderLineToggle,
                fontBold: isBoldToggle,
              },
            ]"
          >
            <span v-if="headline.full_description">
              {{ headline.full_description }}
            </span>
            <span v-else>
              {{ headline.description }}
              <a :href="headline.link">
                Complete Article
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="dial">
      <v-speed-dial
        v-model="fab"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn color="blue darken-2" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-dots-horizontal </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="cyan" @click="iframeBtn">
          <v-icon>mdi-comment-text-outline</v-icon>
        </v-btn>
        <v-btn fab dark small color="green" @click="iframeBtn">
          <span>翻<br />訳</span>
        </v-btn>
        <v-btn fab dark small color="indigo" @click="fontSettingBtn">
          <v-icon>mdi-format-font</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>

    <v-card v-show="fontSetting" max-width="400" class="pa-4 fontSetting__box">
      <div class="d-flex justify-space-between align-center">
        <p class="fontSetting__txt">文字サイズ</p>
        <v-radio-group v-model="sizeType" row class="fontSize__type">
          <v-radio label="小" value="small"></v-radio>

          <v-radio label="中" value="middle"></v-radio>

          <v-radio label="大" value="big"></v-radio>
        </v-radio-group>
      </div>
      <v-row class="pb-2 ma-0" justify="space-between">
        <v-btn-toggle class="mr-5" multiple>
          <v-btn v-on:click="isItalic">
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn v-on:click="isBold">
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn v-on:click="isUnderLine">
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle v-model="alignType">
          <v-btn value="alignCenter">
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn value="alignLeft">
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>

          <v-btn value="alignRight">
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-btn 
        @click="fontSettingBtn"
        color="accent"
        icon
        class="fontSetting__btn-close">
          <v-icon> mdi-close </v-icon>
      </v-btn>
    </v-card>
    <div class="iframe__box"  v-show="iframeShow">
      <iframe src="https://translate.weblio.jp/"></iframe>
       <v-btn 
        @click="iframeBtn"
        color="accent"
        icon
        class="iframe__btn">
          <v-icon> mdi-close </v-icon>
      </v-btn>
    </div>

    <v-card class="pa-md-4">
      <div class="mb-5">
        <p class="word__ttl">英単語一覧</p>
        <v-text-field label="保存したい英単語" v-model="newWord"></v-text-field>
        <v-text-field label="意味・メモ帳" v-model="newMeaning" class="pa-0"></v-text-field>
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="add()"
          >
            保存
          </v-btn>
        </v-card-actions>
      </div>
      <div 
        v-for="(wordData, index) in wordsData"
        v-bind:key="index"
        class="word__box">
        <div class="pt-2 d-flex justify-space-between align-end" v-if="!wordData.isEditing">
          <div>
            <small>英単語</small>
            <p class="mb-0">{{ wordData.word }}</p>
            <small>意味・メモ帳</small>
            <p class="mt-0">{{ wordData.meaning }}</p>
          </div>
          <v-card-actions>
            <v-btn icon @click="edit(index)">
              <v-icon>mdi-border-color</v-icon>
            </v-btn>

            <v-btn icon @click="remove(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
        <v-form 
          class="py-2 d-flex justify-space-between align-end" 
          v-if="wordData.isEditing" 
          @submit.prevent="editTask(index, wordData)">
          <div>
            <small>英単語</small>
            <input class="d-block" type="text" v-model="wordData.word" :ref="wordData.id">
            <small>意味・メモ帳</small>
            <input class="d-block" type="text" v-model="wordData.meaning" :ref="wordData.id">
          </div>
          
          <div>
            <v-btn
              color="primary"
              @click="change(index)"
            >
              保存
            </v-btn>
            <v-btn
              class="white--text"
              color="red"
              @click="edit(index)"
            >
              キャンセル
            </v-btn>
          </div>
        </v-form >
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data: () => ({
    direction: "top",
    fab: false,
    fontSetting: false,
    iframeShow: false,
    fling: false,
    hover: false,
    tabs: null,
    transition: "slide-y-reverse-transition",
    sizeType: "",
    alignType: "",
    isItalicToggle: false,
    isBoldToggle: false,
    isUnderLineToggle: false,
    newWord: "",
    newMeaning: "",
    wordsData: [
      {
        word: "deleate",
        meaning: "削除",
        isEditing: false
      },
      {
        word: "significance",
        meaning: "意義",
        isEditing: false
      },
    ]
  }),
  methods: {
    //文字サイズ設定
    fontSize() {
      if (this.sizeType === "big") {
        return "font-size-large";
      } else if (this.sizeType === "small") {
        return "font-size-small";
      } else {
        return "font-size-normal";
      }
    },
    //テキスト揃え設定
    alignment() {
      if (this.alignType === "alignCenter") {
        return "font-center";
      } else if (this.alignType === "alignLeft") {
        return "font-left";
      } else if (this.alignType === "alignRight") {
        return "font-right";
      }
    },
    isItalic() {
      this.isItalicToggle == true ? (this.isItalicToggle = false) : (this.isItalicToggle = true);
    },
    isBold() {
      this.isBoldToggle == true ? (this.isBoldToggle = false) : (this.isBoldToggle = true);
    },
    isUnderLine() {
      this.isUnderLineToggle == true ? (this.isUnderLineToggle = false) : (this.isUnderLineToggle = true);
    },
    fontSettingBtn() {
      this.fontSetting == true ? (this.fontSetting = false) : (this.fontSetting = true);
    },
    iframeBtn() {
      this.iframeShow == true ? (this.iframeShow = false) : (this.iframeShow = true);
    },
    // 英単語削除
    remove(index) {
      this.wordsData.splice(index, 1);
    },
    add() {
      if (!this.newWord.value || !this.newMeaning.value) {
        return
      }
      this.wordsData.push({
        word: this.newWord,
        meaning: this.newMeaning
      })
      this.newWord = ""
      this.newMeaning = ""
    },
    change(index) {

      // this.wordsData.splice(index, 1, {
      //   word: changeWord,
      //   meaning: this.wordData.meaning,
      //   isEditing: false
      // })
        console.log(this.wordsData[index])
    },
    edit(index){
      this.wordsData[index].isEditing == true ? (this.wordsData[index].isEditing = false) : (this.wordsData[index].isEditing = true);
    },
    editTask(key, wordData) {
      wordData.word = this.$refs[wordData.id][0].value
      wordData.meaning = this.$refs[wordData.id][1].value
      this.$set(this.isEditing, key, false)
    },
  },
  computed: {
    headline() {
      return this.$store.getters["headlines/headline"];
    },
  },
});
</script>

<style lang="scss" scoped>
.iframe {
  &__box {
    position: fixed;
    top: 10%;
    right: 2.5%;
    width: 90%;
    height: 50vh;
    z-index: 9999;
    iframe {
      width: 100%;
      height: 100%;
    }
  }

  &__btn {
    position: absolute;
    top: 0;
    right: 2%;
    background: #fff;
  }
}

.word__box {
  border-top: solid 1px #cbcbcb;
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
  font-size: 1.5em;
  padding-bottom: 5px;
  margin-bottom: 0;
  color: #1c63bf;
  border-bottom: solid 1px #cbcbcb;
}

.text {
  margin: 20px 0;
  line-height: 1.75;
  text-align: left;
}
.fontUnderLine {
  text-decoration: underline;
}
.fontItalic {
  font-style: italic;
}
.fontBold {
  font-weight: bold;
}
.font-size-large {
  font-size: 18pt;
}
.font-size-normal {
  font-size: 14pt;
}
.font-size-small {
  font-size: 10pt;
}
.font-center {
  text-align: center;
}
.font-right {
  text-align: right;
}
.font-left {
  text-align: left;
}

img {
  width: 100%;
}

.dial {
  position: fixed;
  bottom: 10%;
  right: 2.5%;
  span {
    font-weight: bold;
    line-height: 1;
  }
}

#create {
  .v-speed-dial {
    position: absolute;
  }
  .v-btn--floating {
    position: relative;
  }
}

.fontSetting {
  &__box {
    position: fixed;
    bottom: 10%;
    right: 10%;
  }

  &__txt {
    line-height: 1;
    margin-bottom: 0;
  }

  &__btn{
    &-close {
      position: absolute;
      top: 0;
      right: 0;
      background: #fff;
    }
  }
}

.info_cat {
  display: flex;
  padding-top: 20px;
}

.genre {
  font-size: 1rem;
  margin-right: 2.4rem;
  padding-right: 2.4rem;
  border-right: solid 1px #b3b3b3;
}

.day {
  font-size: 1rem;
}

.heading {
  padding-right: 50px;
  font-size: 2rem;
  letter-spacing: -0.01em;
}

.heading_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
</style>
