<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 text-center>
        <h1>単語一覧</h1>
      </v-flex>
      <v-flex xs12 text-right mt-5>
        <v-btn to="/todos/create" color="info">単語一覧</v-btn>
      </v-flex>
      <v-flex xs12 mt-3 justify-center>
        <v-data-table :headers="headers" :items="todos">
          <template v-slot:item.actions="{ item }">
            <v-btn :to="`/todos/${item.id}`">
              <v-icon small class="mr-2"> mdi-pencil </v-icon>
            </v-btn>
            <v-btn>
              <v-icon small @click="deleteConfirm(item.id)">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      headers: [
        { text: "単語", value: "title" },
        { text: "意味", value: "contents" },
        { text: "操作", value: "actions", sortable: false },
      ],
    }
  },
});
</script>