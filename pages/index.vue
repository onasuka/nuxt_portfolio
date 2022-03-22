<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="検索" type="text">
          <template v-slot:append>
            <v-btn class="btn btn-info" color="primary">検索</v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" class="menu-list">
      <v-col md="2" class="menu-item">
        <div>ニュース</div>
      </v-col>
      <v-col md="2" class="menu-item">
        <div>ビジネス</div>
      </v-col>
      <v-col md="2" class="menu-item">
        <div>アニメ</div>
      </v-col>
      <v-col md="2" class="menu-item">
        <div>映画</div>
      </v-col>
    </v-row>
    <div>
      <div 
        class="headlines__list"
        v-for="headline in headlines" 
        :key="headline.id">
        <nuxt-link :to="`headlines/${headline.slug}`">
          <div 
            @click.prevent="submitHeadline(headline)"
            class="headlines__item"
          >
            <span :style="{backgroundImage: 'url(' + headline.urlToImage + ')'}"></span>
            <div
              class="headlines__item-txt">
              <p> {{ headline.title }} </p>
              <ul
                class="headlines__item-info">
                <li>{{ headline.source.name }}</li>
                <li>{{ headline.publishedAt }}</li>
              </ul>
            </div>
          </div>
        </nuxt-link>
        <div class="btn">
          <v-btn-toggle tile color="red accent-3" group>
            <v-btn>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </div>
  </v-container>
</template>

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
  justify-content: center;
}
.menu-item {
  padding: 0;
  font-size: 1.5rem;
  text-align: center;
  border-right: solid 1px #333;
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


<script lang='ts'>
export default {
  // async asyncData ({ $axios }) {
  //   try {
  //     const topHeadlines = await $axios.$get('/api/top-headlines?country=jp')
  //     console.log('headline', topHeadlines.articles)
  //     return {
  //       headlines: topHeadlines.articles
  //     }
  //   } catch (e) {
  //     console.log(e.message)
  //   }
  // }
   async fetch ({ store }) {
    const apiUrl = '/api/top-headlines?country=jp'
    await store.dispatch('headlines/loadHeadlines', apiUrl)
  },
  computed: {
    headlines () {
      return this.$store.getters['headlines/headlines']
    }
  },
  methods: {
    submitHeadline (headline) {
    // console.log(headline)
    this.$store.dispatch('headlines/submitHeadline', headline)
      .then(() => {
        this.$router.push('/headlines/' + headline.slug)
      })
    }
  }
}
</script>