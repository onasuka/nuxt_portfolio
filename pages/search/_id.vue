<template>
  <v-container>
    <homeSearch />
    <homeMenu />
    <div
      class="article__list"
      v-for="(article, index) in viewLists"
      :key="index"
      :id="index"
    >
      <nuxt-link :to="`headlines/${article.slug}`">
        <div @click.prevent="submitHeadline(article)" class="article__item">
          <div v-if="article.urlToImage !== null">
            <span
              class="article__img"
              :style="{ backgroundImage: 'url(' + article.urlToImage + ')' }"
            ></span>
          </div>
          <div v-else>
            <img class="article__img" src="~/assets/img/hoge.jpg" />
          </div>
          <div class="article__item-txt">
            <p>{{ article.title }}</p>
            {{ article.slug }}
            <ul class="article__item-info">
              <li>{{ article.source.name }}</li>
              <li>{{ article.publishedAt }}</li>
            </ul>
          </div>
        </div>
      </nuxt-link>
      <div v-show="loggedIn" class="btn">
        <v-btn
          v-if="bookMarkDecision[index]"
          icon
          class="red--text text--accent-3"
          @click.prevent="favoriteDelete(article, index)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          @click.prevent="favorite(article, index)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </div>
    </div>
    <v-pagination
      v-model="page"
      :length="length"
      @input="pageChange"
    ></v-pagination>
  </v-container>
</template>

<script>
import Vue from 'vue'
import homeMenu from "~/components/home/homeMenu.vue";
import homeSearch from "~/components/home/homeSearch.vue";

export default Vue.extend({
  components: {
    homeMenu,
    homeSearch,
  },
  data() {
    return {
      page: 1,
      length: 0,
      lists: [],
      viewLists: [],
      pageSize: 10,
      bookMarkTitle: [],
      bookMarkDecision: [],
    };
  },

  async asyncData({ store , route }) {
   const apiUrl = "/api/&q="
   const parameter = route.params.id
    let items = await store.dispatch("headlines/loadHeadlines", apiUrl + parameter);
    let bookMark = await store.dispatch("bookMarks");
    return {
      lists: store.state.headlines.headlines,
    };
  },
  computed: {
    filterPages() {
      return this.$store.getters["headlines/headlines"];
    },
    loggedIn() {
      return this.$store.state.loggedIn
    },
  },
  methods: {
    submitHeadline(headline) {
      this.$store.dispatch("headlines/submitHeadline", headline).then(() => {
        this.$router.push("/headlines/" + headline.slug);
      });
    },
    pageChange(pageNumber) {
      this.viewLists = this.lists.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
      // ページ番号2が押された場合　this.lists.slice(10,20) 10から20までを表示
      //最初のページ(1)の場合 this.lists.slice(0,10) 0から10までを表示
    },
    favorite(headline, id) {
      this.$set(this.bookMarkDecision, id, true);
      this.$store.dispatch("bookMark", headline);
    },
    favoriteDelete(headline, id) {
      this.$set(this.bookMarkDecision, id, false);
      this.$store.dispatch("bookMarkDelete", headline);
    },
  },
  mounted() {
    this.length = Math.ceil(this.lists.length / this.pageSize);
    // listsの個数(30)/1ページで見れる数(10) ページ数を決める
    this.viewLists = this.lists.slice(0, this.pageSize);
    //受け取ったすべてのデータが格納されているlistsから、0からthis.pageSize(10)までをthis.viewListsに格納する どこからどこまでを表示するか決める
    
    let bookMarksTitle = this.$store.getters.setTitle;
    let headlines = this.viewLists;
    // ブックマークされているか否かの判定
    for (let i = 0; i < headlines.length; i++) {
      let headlineTitle = headlines[i].title;
      let bookMarkDecision = this.bookMarkDecision;
      bookMarksTitle.filter(function (value) {
        if (value === headlineTitle) {
          bookMarkDecision[i] = true;
        }
      });
    }
  },
  watch: {
    filterPages() {
      this.lists = this.$store.state.headlines.headlines;
      this.length = Math.ceil(this.lists.length / this.pageSize);
      this.viewLists = this.lists.slice(0, this.pageSize);
      this.page = 1;
    },
  },
});
</script>

<style lang="scss" scoped>
.article {
  &__list {
    display: flex;
    justify-content: space-between;
    &:not(:last-of-type) {
      margin-bottom: 30px;
    }

    a {
      transition: all 1s ease;
      text-decoration: none;

      &:hover {
        opacity: .7;
        text-decoration:underline;
      }
    }
  }
  &__img {
      display: block;
      width: 200px;
      height: 150px;
      background-position: center;
      background-size: cover;
  }
  &__item {
    display: flex;

    &-txt {
      width: 80%;
      margin-left: 3.5%;
      color: #333;
      p {
        margin-bottom: 5px;
      }
    }
    &-info {
      padding: 0;
      li {
        margin-bottom: 0;
        font-size: 14px;
      }
    }
  }
}

.info_cat .genre {
  font-size: 1rem;
  margin-right: 1rem;
  padding-right: 1rem;
  border-right: solid 1px #b3b3b3;
}

.info_cat .day {
  font-size: 1rem;
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
