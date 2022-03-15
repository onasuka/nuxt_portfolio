<template>
  <v-container>
    <div>
      <div class="info_cat">
        <p class="genre">ジャンル</p>
        <p class="day">2021.01.07</p>
      </div>
      <div class="heading_box">
        <h2 class="heading">After a year of sporting success, 2021’s kanji character is ‘gold’</h2>
        <div class="btn">
          <v-btn-toggle v-model="text" tile color="red accent-3" group>
            <v-btn>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <picture>
        <img src="~/assets/img/hoge_02.jpg" alt="" />
      </picture>
      <p class="text">
        The kanji character for kin, which means “gold” or “money,” has been selected as the character that best summarizes the year, a Kyoto-based academic organization announced Dec. 13.<br>
        <br>
        The kanji points to the gold medals of the Tokyo 2020 Olympics and Paralympics, which proceeded this July after being postponed for a year and then held without spectators due to the COVID-19 pandemic.<br>
        <br>
        Japan’s athletes won a record number of gold medals — 27 in all — at the Games, smashing the country’s previous record of 16 set at the 1964 Tokyo Games and again in Athens in 2004.<br>
        <br>
        Los Angeles Angels two-way player Shohei Ohtani winning the 2021 American League MVP was another reason for the choice, said the Japan Kanji Aptitude Testing Foundation, which organizes the event. News about cash handouts in the headlines also helped push the kanji to the top of the list, the foundation said.<br>
        <br>
        Of the 223,773 votes cast by the public, kin received 10,422 votes, or 4.6% of the total. Wa, which means ring, was a close second, garnering 10,304 votes.<br>
        <br>
        In making the announcement at the 27th annual year-end event, chief Buddhist priest Seihan Mori of the Kiyomizu Temple in Kyoto drew the character on a large piece of paper with a giant calligraphy brush. (The Japan Times)
      </p>
    </div>
    <v-toolbar dense>
      <v-overflow-btn
        :items="dropdown_font"
        label="Select font"
        hide-details
        class="pa-0"
      ></v-overflow-btn>

      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-divider vertical></v-divider>

        <v-overflow-btn
          :items="dropdown_edit"
          editable
          label="Select size"
          hide-details
          class="pa-0"
          overflow
        ></v-overflow-btn>

        <v-divider vertical></v-divider>

        <v-spacer></v-spacer>

        <v-btn-toggle
          v-model="toggle_multiple"
          color="primary"
          dense
          group
          multiple
        >
          <v-btn :value="1" text>
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn :value="2" text>
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn :value="3" text>
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn :value="4" text>
            <v-icon>mdi-format-color-fill</v-icon>
          </v-btn>
        </v-btn-toggle>

        <div class="mx-4"></div>

        <v-btn-toggle v-model="toggle_exclusive" color="primary" dense group>
          <v-btn :value="1" text>
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>

          <v-btn :value="2" text>
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn :value="3" text>
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>

          <v-btn :value="4" text>
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-toolbar>
  </v-container>
</template>

<style lang="scss" scoped>
.info_cat {
  display: flex;
}

.genre {
  font-size: 1rem;
  margin-right: 2.4rem;
  padding-right: 2.4rem;
  border-right: solid 1px #b3b3b3;
}

.day {
  font-size: 1rem;
}

.heading {
  font-size: 2rem;
}

.heading_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.text {
  margin: 20px 0;
  font-size: 1.5rem;
  line-height: 1.75;
}
</style>