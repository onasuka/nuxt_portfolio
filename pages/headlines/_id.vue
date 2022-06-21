<template>
  <div class="article">
    <div class="article_box">
      <div class="info_cat">
        <p class="genre">ジャンル：{{ article.source.name }}</p>
        <p class="day">{{ article.publishedAt }}</p>
      </div>
      <div>
        <div>
          <div class="heading_box">
            <h2 class="heading">{{ article.title }}</h2>
            <div class="btn" v-if="loggedIn">
              <v-btn-toggle tile color="red accent-3" group>
                <v-btn>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <img :src="article.urlToImage" />
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
            {{ article.description }}
            <br>
            <a :href="article.url" target="_blank">
              Complete Article
            </a>
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
        <a href="https://translate.weblio.jp/" target="_blank">
          <v-btn fab dark small color="green">
            <span>翻<br />訳</span>
          </v-btn>
        </a>
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
    <!-- <div class="iframe__box" v-show="iframeShow">
      <iframe width="100%" height="100%" src="https://translate.weblio.jp/"></iframe>
       <v-btn 
        @click="iframeBtn"
        color="accent"
        icon
        class="iframe__btn">
          <v-icon> mdi-close </v-icon>
      </v-btn>
    </div> -->

  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data() {
    return {
      direction: "top",
      fab: false,
      fontSetting: false,
      iframeShow: false,
      WordsShow: false,
      fling: false,
      hover: false,
      transition: "slide-y-reverse-transition",
      sizeType: "",
      alignType: "",
      isItalicToggle: false,
      isBoldToggle: false,
      isUnderLineToggle: false,
      loggedIn: this.$store.state.loggedIn,
    }
  },

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
    // iframeBtn() {
    //   this.iframeShow == true ? (this.iframeShow = false) : (this.iframeShow = true);
    // },

  },
  computed: {
    article():any {
      return this.$store.getters["headlines/headline"];
    },
  },
});
</script>

<style lang="scss" scoped>
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

#create {
  .v-speed-dial {
    position: absolute;
  }
  .v-btn--floating {
    position: relative;
  }
}

.iframe {
  &__box {
    position: fixed;
    top: 10%;
    right: 2.5%;
    width: 90%;
    height: 50vh;
    z-index: 9999;
  }

  &__btn {
    position: absolute;
    top: 0;
    right: 2%;
    background: #fff;
  }
}

.word {
  &__box {
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

  &__ttl {
    font-size: 1.5em;
    padding-bottom: 5px;
    margin-bottom: 0;
    color: #1c63bf;
    border-bottom: solid 1px #cbcbcb;
  }
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

.fontSetting {
  &__box {
    position: fixed;
    bottom: 10%;
    right: 10%;
    z-index: 9999;
  }

  &__txt {
    line-height: 1;
    margin-bottom: 0;
  }

  &__btn {
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

  &_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
}

</style>
