<template>
  <v-row>
    <v-col>
      <v-text-field label="検索" type="text" v-model="search_keyword">
        <template v-slot:append>
          <!-- <v-btn class="btn btn-info mb-2" color="primary" @click="searchKeyword()"
            >検索</v-btn
          > -->
          <a id="search_link" @click="searchKeyword()" >検索</a>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      search_keyword: "",
    }
  },
  methods: {
    searchKeyword() {
      if (this.search_keyword !== "") {
        let linkParameter:any = document.getElementById('search_link')
        linkParameter.setAttribute('href', `/search/${this.search_keyword}`);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
a {
  margin-bottom: 5px;
  padding: 10px;
  color: #fff !important;
  background: #1976d2;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    opacity: .8;
  }
}
</style>