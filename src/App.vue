<template>
  <v-app>
    <v-app-bar absolute class="titlebar" dense color="blue" dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>系统信息查看工具</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="-webkit-app-region: no-drag;" @click="minimize" icon>
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>

      <v-btn style="-webkit-app-region: no-drag;" @click="maximize" icon>
        <v-icon>mdi-window-maximize</v-icon>
      </v-btn>

      <v-btn style="-webkit-app-region: no-drag;" @click="quit" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container style="padding-top:60px" fluid>
        <!-- <router-view /> -->
        <SystemInfo/>
      </v-container>
    </v-content>
    <v-footer app>Linux作业</v-footer>
  </v-app>
</template>
<script>
import { remote } from "electron";
import SystemInfo from "@/components/SystemInfo.vue";
export default {
  components:{
SystemInfo
  },
  methods: {
    minimize() {
      remote.BrowserWindow.getFocusedWindow().minimize();
    },
    maximize() {
      var win = remote.BrowserWindow.getFocusedWindow();
      win.setFullScreen(!win.isFullScreen());
    },
    quit() {
      remote.BrowserWindow.getFocusedWindow().close();
    }
  }
};
</script>
<style scoped>
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
