<template>
  <v-container>
    <h2 class="mb-8 pb-5">ブックマーク一覧</h2>
    <div
      class="headlines__list"
      v-for="(headline, index) in marklists"
      :key="index"
    >
      <nuxt-link :to="`headlines/${headline.slug}`">
        <div @click.prevent="submitHeadline(headline)" class="headlines__item">
          <div v-if="headline.urlToImage !== null">
            <span
              :style="{ backgroundImage: 'url(' + headline.urlToImage + ')' }"
            ></span>
          </div>
          <div v-else>
            <img class="headlines__img" src="~/assets/img/hoge.jpg" />
          </div>
          <div class="headlines__item-txt">
            <p>{{ headline.title }}</p>
            <ul class="headlines__item-info">
              <li>{{ headline.publishedAt }}</li>
            </ul>
          </div>
        </div>
      </nuxt-link>
      <div class="btn">
        <v-btn
          v-if="act[index]"
          icon
          :value="headline.slug"
          @click.prevent="favorite(headline, index)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          :value="headline.slug"
          class="red--text text--accent-3"
          @click.prevent="favoriteDelete(headline, index)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      marklists: [],
      act: [],
    };
  },
  async asyncData({ store }: any) {
    let items = await store.dispatch("bookMarks");
    return {
      marklists: store.state.marklists,
    };
  },
  methods: {
    favorite(headline: any, id: any) {
      this.$set(this.act, id, false);
      this.$store.dispatch("bookMark", headline);
    },
    favoriteDelete(headline: any, id: any) {
      this.$set(this.act, id, true);
      this.$store.dispatch("bookMarkDelete", headline);
    },
  },
});
</script>

<style lang="scss" scoped>
.buttoncolor {
  background-color: green !important;
}
h2 {
  font-size: 2rem;
  margin: 15px 0;
  text-align: center;
  border-bottom: solid 1px #b1b1b1;
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

.headlines__list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
  &:not(:last-of-type) {
    margin-bottom: 30px;
    border-bottom: solid 1px #b1b1b1;
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
</style>
