<template></template>
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
    return {};
  }
};
</script>