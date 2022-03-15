<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 text-center>
        <h2>ブックマーク一覧</h2>
      </v-flex>
      <ul>
        <li>
          <div>
            <picture>
              <img src="~/assets/img/hoge.jpg" alt="" />
            </picture>
          </div>
          <div class="box">
            <p>タイトル</p>
            <p>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </div>
          <div class="btn">
            <v-btn-toggle v-model="text" mandatory tile color="red accent-3" group>
              <v-btn>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </li>
         <li>
          <div>
            <picture>
              <img src="~/assets/img/hoge.jpg" alt="" />
            </picture>
          </div>
          <div class="box">
            <p>タイトル</p>
            <p>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </div>
          <div class="btn">
            <v-btn-toggle v-model="text" mandatory tile color="red accent-3" group>
              <v-btn>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </li>
         <li>
          <div>
            <picture>
              <img src="~/assets/img/hoge.jpg" alt="" />
            </picture>
          </div>
          <div class="box">
            <p>タイトル</p>
            <p>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </div>
          <div class="btn">
            <v-btn-toggle v-model="text" tile mandatory color="red accent-3" group>
              <v-btn>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </li>
         <li>
          <div>
            <picture>
              <img src="~/assets/img/hoge.jpg" alt="" />
            </picture>
          </div>
          <div class="box">
            <p>タイトル</p>
            <p>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </div>
          <div class="btn">
            <v-btn-toggle v-model="text" tile mandatory color="red accent-3" group>
              <v-btn>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </li>
      </ul>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      headers: [
        { text: "タイトル", value: "title" },
        { text: "内容", value: "contents" },
        { text: "ステータス", value: "selectItem" },
        { text: "操作", value: "actions", sortable: false },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
h2 {
  font-size: 2rem;
}
li {
  display: flex;
  margin-bottom: 15px;
  div {
    &:first-of-type {
      width: 10%;
    }
    img {
      width: 100%;
    }
  }
}
.box {
  width: 80%;
  margin-left: 20px;
  p {
    font-size: 1.5rem;
    &:first-of-type {
      font-size: 2rem;
    }
  }
}
.btn {
  margin-top: auto;
}
</style>