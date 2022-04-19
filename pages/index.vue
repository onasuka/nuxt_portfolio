<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="検索" type="text" v-model="search_keyword">
          <template v-slot:append>
            <v-btn class="btn btn-info" color="primary" @click="searchKeyword()"
              >検索</v-btn
            >
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="menu-list">
      <v-col md="2" class="menu-item">
        <a @click="newsCategory('')">すべて</a>
      </v-col>
      <v-col md="2" class="menu-item">
        <a @click="newsCategory('business')">ビジネス</a>
      </v-col>
      <v-col md="2" class="menu-item">
        <a @click="newsCategory('entertainment')">エンタメ</a>
      </v-col>
      <v-col md="2" class="menu-item">
        <a @click="newsCategory('health')">健康</a>
      </v-col>
      <v-col md="2" class="menu-item">
        <a @click="newsCategory('science')">サイエンス</a>
      </v-col>
      <v-col md="2" class="menu-item">
        <a @click="newsCategory('sports')">スポーツ </a>
      </v-col>
      <v-col md="2" class="menu-item">
        <a @click="newsCategory('technology')">テクノロジー </a>
      </v-col>
    </v-row>
    <div>
      <div
        class="headlines__list"
        v-for="headline in viewLists"
        :key="headline.id"
      >
        <nuxt-link :to="`headlines/${headline.slug}`">
          <div
            @click.prevent="submitHeadline(headline)"
            class="headlines__item"
          >
            <div v-if="headline.urlToImage !== null">
              <span
                :style="{ backgroundImage: 'url(' + headline.urlToImage + ')' }"
              ></span>
            </div>
            <div v-else>
              <img class="headlines__img" src="~/assets/img/hoge.jpg" >
            </div>
            <div class="headlines__item-txt">
              <p>{{ headline.title }}</p>
              <ul class="headlines__item-info">
                <li>{{ headline.source.name }}</li>
                <li>{{ headline.publishedAt }}</li>
              </ul>
            </div>
          </div>
        </nuxt-link>
        <div class="btn">
          <v-btn-toggle tile color="red accent-3" group>
            <v-btn
            @click.prevent="favorite(post)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </div>
    <v-pagination
      v-model="page"
      :length="length"
      @input="pageChange"
    ></v-pagination>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search_keyword: "",
      page: 1,
      length: 0,
      lists: [],
      viewLists: [],
      pageSize: 10,
    };
  },
  async asyncData({ store }) {
    const apiUrl = "/api/";
    let items = await store.dispatch("headlines/loadHeadlines", apiUrl);
    // console.log(store.state.headlines.headlines)
    return{
      lists : store.state.headlines.headlines
    }
  },
  computed: {
    filterPages() {
      return this.$store.getters["headlines/headlines"];
    },
  },
  methods: {
    submitHeadline(headline: any) {
        this.$store.dispatch("headlines/submitHeadline", headline).then(() => {
        this.$router.push("/headlines/" + headline.slug);
      });
    },
    newsCategory(parameter: object) {
      const apiUrl = "/api/&category=";
      console.log(apiUrl  + parameter);
      this.$store.dispatch("headlines/loadHeadlines", apiUrl + parameter);
      // return this.lists = this.$store.state.headlines.headlines
    },
    searchKeyword() {
      if (this.search_keyword !== "") {
        const apiUrl = "/api/&q=";
        console.log(apiUrl + this.search_keyword);
        this.$store.dispatch("headlines/loadHeadlines",apiUrl + this.search_keyword);
      }
    },
    pageChange( pageNumber:any ){
      this.viewLists = this.lists.slice(this.pageSize * (pageNumber - 1),this.pageSize * (pageNumber))
      // ページ番号2が押された場合　this.lists.slice(10,20) 10から20までを表示
      //最初のページ(1)の場合 this.lists.slice(0,10) 0から10までを表示
    },
  },
  mounted: function(){
    this.length = Math.ceil(this.lists.length/this.pageSize);
    // listsの個数(30)/1ページで見れる数(10) ページ数を決める

    this.viewLists = this.lists.slice(0,this.pageSize);
    //受け取ったすべてのデータが格納されているlistsから、0からthis.pageSize(10)までをthis.viewListsに格納する どこからどこまでを表示するか決める
  },
  watch: {
    filterPages(){
      this.lists = this.$store.state.headlines.headlines
      this.length = Math.ceil(this.lists.length/this.pageSize);
      this.viewLists = this.lists.slice(0,this.pageSize);
      this.page = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 1185px;
  }
}

.headlines__list {
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }

  a {
    text-decoration: none;
  }
}
.headlines__item {
  display: flex;

  .headlines__img {
    display: block;
    width: 200px;
    height: 150px;
  }
  
  span {
    display: block;
    width: 200px;
    height: 150px;
    background-position: center;
    background-size: cover;
  }

  .headlines__item-txt {
    width: 80%;
    margin-left: 3.5%;
    color: #333;
    p {
      margin-bottom: 5px;
    }
  }

  .headlines__item-info {
    padding: 0;
    li {
      margin-bottom: 0;
      font-size: 14px;
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
  padding: 0;
  text-align: center;
  border-right: solid 1px #333;
  a {
    font-size: 13px;
    color: #333;
  }
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
