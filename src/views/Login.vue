<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="blue" dark flat>
              <v-toolbar-title>登录学霸词典</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="用户名"
                  v-model="user.username"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="密码"
                  name="password"
                  v-model="user.password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" @click="login">登录</v-btn>
              <v-btn color="error" @click="register">注册</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar">{{text}}</v-snackbar>
  </v-content>
</template>

<script>
import path from "path";
import { remote } from "electron";

// let db = new Datastore({
//   autoload: true,
//   filename: __static + "/users.db"
// });
import Datastore from "nedb";
var db = new Datastore({
  filename: path.join(remote.app.getPath("userData"), "/data.db"),
  autoload: true
});

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      text: "",
      snackbar: false
    };
  },
  methods: {
    login() {
      db.findOne({ username: this.user.username }, (err, doc) => {
        if (doc != null) {
          if (this.user.password == doc.password) {
            console.info("登录成功！");

            this.$router.push({ path: "/home" });
          } else {
            console.info("用户名或密码错误！");
            this.text = "用户名或密码错误！";
            this.snackbar = true;
          }
        } else {
          console.info("用户名或密码错误！");
          this.text = "用户名或密码错误！";
          this.snackbar = true;
        }
      });
    },
    register() {
      db.insert(this.user, (err, newDoc) => {
        this.text = "注册成功！";
        this.snackbar = true;
        console.info("注册成功！");
      });
    }
  }
};
</script>