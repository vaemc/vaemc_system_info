<template>
  <div>
    <v-app-bar app clipped-left color="light-blue" dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>学霸词典</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>

      <v-btn to="/home" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-card max-width="600" class="mx-auto">
     
        </v-card>
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(result,index) in documents" :key="result._id">
            <v-expansion-panel-header>{{result.name}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item>
                <v-list-item-content>
                  
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
                <v-btn text color="deep-purple accent-4"  @click="remove(index,result._id)">删除</v-btn>
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar">{{snackbarText}}</v-snackbar>
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

export default {
  data() {
    return {
      documents: [],
      snackbarText: "",
      snackbar: false
    };
  },
  mounted() {
    db.find({}, (err, docs) => {
      this.documents = docs;
      console.info(docs);
    });
   
  },
  methods: {
    remove(index, id) {
      db.remove({ _id: id }, (err, docs) => {
        this.snackbarText = "删除成功！";
        this.snackbar = true;
        this.documents.splice(index, 1);
      });
    }
  }
};
</script>