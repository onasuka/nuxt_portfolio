<template>
  <v-row class="menu-list">
    <v-col class="menu-item">
      <a href="/">すべて</a>
    </v-col>
    <v-col class="menu-item">
      <a href="/category/business">ビジネス</a>
    </v-col>
    <v-col class="menu-item">
      <a href="/category/entertainment">エンタメ</a>
    </v-col>
    <v-col class="menu-item">
      <a href="/category/health">健康</a>
    </v-col>
    <v-col class="menu-item">
      <a href="/category/science">サイエンス</a>
    </v-col>
    <v-col class="menu-item">
      <a href="/category/sports">スポーツ </a>
    </v-col>
    <v-col class="menu-item">
      <a href="/category/technology">テクノロジー </a>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.menu-list {
  margin: 0 auto 25px;
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
  font-weight: bold;
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
    text-decoration: none;
    transition: all 0.5s ease;
  }
}
</style>
