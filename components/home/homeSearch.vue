<template>
  <v-row>
    <v-col>
      <v-text-field label="検索" type="text" v-model="search_keyword">
        <template v-slot:append>
          <v-btn class="btn btn-info mb-2" color="primary" @click="searchKeyword()"
            >検索</v-btn
          >
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
        const apiUrl = "/api/&q=";
        console.log(apiUrl + this.search_keyword);
        this.$store.dispatch(
          "headlines/loadHeadlines",
          apiUrl + this.search_keyword
        );
      }
    },
  },
});
</script>
