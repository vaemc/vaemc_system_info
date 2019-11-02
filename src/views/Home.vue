<template>
  <div>
    
    <input v-model="text" type="text" />
    <button @click="query">测试</button>
    <h1>拼音：{{result.pinyin}}</h1>
    <div v-html="result.example"></div>
    <h3>英语：{{result.english}}</h3>
    <h2>近义词：{{result.jin}}</h2>
    <h2>反义词：{{result.fan}}</h2>
    <div v-html="result.content"></div>
  </div>
</template>
<script>
import jsonp from "jsonp";
export default {
  data() {
    return {
      text: "世界",
      result: ""
    };
  },
  mounted() {
    //this.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  },
  methods: {
    query() {
      // this.axios
      //   .post(
      //     "https://api.jisuapi.com/cidian/word?appkey=06e7c8fc2cc5972e&word=%E4%B8%96%E7%95%8C")
      //   .then(response => {
      //     console.info(response.data);
      //   });

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
    }
  }
};
</script>
