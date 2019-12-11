<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>系统信息查看工具</v-toolbar-title>
     
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>1700130248 彭福国 Linux作业</v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>