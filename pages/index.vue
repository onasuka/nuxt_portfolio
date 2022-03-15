<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="message" label="検索" type="text">
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
    <ul>
      <li>
        <div>
          <picture>
            <img src="~/assets/img/hoge.jpg" alt="" />
          </picture>
        </div>
        <div class="box">
          <p>After a year of sporting success, 2021’s kanji character is ‘gold’</p>
          <ul class="info_cat">
            <li class="genre">エンタメ</li>
            <li class="day">2021.01.07</li>
          </ul>
        </div>
        <div class="btn">
          <v-btn-toggle v-model="text" tile color="red accent-3" group>
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
          <p>In rare move, Japan to provide bulletproof vests, other defense supplies to Ukraine</p>
          <ul class="info_cat">
            <li class="genre">国際</li>
            <li class="day">2021.01.07</li>
          </ul>
        </div>
        <div class="btn">
          <v-btn-toggle v-model="text" tile color="red accent-3" group>
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
          <p>Family of Sri Lankan who died in detention files suit for ¥156M damages from Japan</p>
          <ul class="info_cat">
            <li class="genre">国際</li>
            <li class="day">2021.01.07</li>
          </ul>
        </div>
        <div class="btn">
          <v-btn-toggle v-model="text" tile color="red accent-3" group>
            <v-btn>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </li>
    </ul>
  </v-container>
</template>

<style lang="scss" scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 1185px;
  }
}
.info_cat {
  display: flex;
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

</script>