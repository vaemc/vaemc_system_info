<template>
  <div>
    <v-app-bar app clipped-left color="amber">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>学霸词典</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="搜索"
        v-model="text"
        prepend-inner-icon="mdi-magnify"
        @keyup.enter.native="search"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-card class="mx-auto">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">{{text}}</v-list-item-title>
              <v-list-item-subtitle>拼音：{{result.pinyin}}</v-list-item-subtitle>
              <v-list-item-subtitle>英语：{{result.english}}</v-list-item-subtitle>
              <v-list-item-subtitle>近义词：{{result.jin==""?"无":result.jin}}</v-list-item-subtitle>
              <v-list-item-subtitle>反义词：{{result.fan==""?"无":result.fan}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">解释</v-list-item-title>
              <v-list-item-subtitle v-html="result.content"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">举例</v-list-item-title>
              <v-list-item-subtitle v-html="result.example"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn text color="deep-purple accent-4">收藏</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import path from "path";
import { remote } from "electron";
import Datastore from "nedb";
var db = new Datastore({
  filename: path.join(remote.app.getPath("userData"), "/bookmark.db"),
  autoload: true
});

import jsonp from "jsonp";
export default {
  data() {
    return {
      text: "前进",
      result: ""
    };
  },
  mounted() {
    //this.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  },
  methods: {
    search() {
      jsonp(
        "https://api.jisuapi.com/cidian/word?appkey=06e7c8fc2cc5972e&word=" +
          this.text,
        null,
        (err, data) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(data.result);
            this.result = data.result;
          }
        }
      );
    },
    query() {
      // this.axios
      //   .post(
      //     "https://api.jisuapi.com/cidian/word?appkey=06e7c8fc2cc5972e&word=%E4%B8%96%E7%95%8C")
      //   .then(response => {
      //     console.info(response.data);
      //   });
    }
  }
};
</script>
