<template>
  <v-row class="menu-list">
    <v-col class="menu-item">
      <a @click="selectCategory('')">すべて</a>
    </v-col>
    <v-col class="menu-item">
      <a @click="selectCategory('business')">ビジネス</a>
    </v-col>
    <v-col class="menu-item">
      <a @click="selectCategory('entertainment')">エンタメ</a>
    </v-col>
    <v-col class="menu-item">
      <a @click="selectCategory('health')">健康</a>
    </v-col>
    <v-col class="menu-item">
      <a @click="selectCategory('science')">サイエンス</a>
    </v-col>
    <v-col class="menu-item">
      <a @click="selectCategory('sports')">スポーツ </a>
    </v-col>
    <v-col class="menu-item">
      <a @click="selectCategory('technology')">テクノロジー </a>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    selectCategory(parameter: object) {
      const apiUrl = "/api/&category=";
      console.log(apiUrl + parameter);
      this.$store.dispatch("headlines/loadHeadlines", apiUrl + parameter);
    },
  },
});
</script>

<style lang="scss" scoped>
.menu-list {
  margin: 0 auto 15px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE, Edge 対応 */
  scrollbar-width: none;
}
.menu-list::-webkit-scrollbar {
  /* Chrome, Safari 対応 */
  display: none;
}

.menu-item {
  position: relative;
  padding: 0;
  text-align: center;
  border-right: solid 1px #333;
  
  &:hover {
    a {
      color: #6aaaff;
    }
  }
  a {
    font-size: 13px;
    color: #333;
    transition: all 1s ease;
  }
}
</style>
