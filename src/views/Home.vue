// https://github.com/balena-io-modules/drivelist
// https://github.com/jduncanator/node-diskusage
//https://github.com/SunilWang/node-os-utils#readme
//https://github.com/jub3i/node-cpu-stat
//https://github.com/sebhildebrandt/systeminformation
<template>
  <div>
    <v-expansion-panels :multiple="true">
      <v-expansion-panel>
        <v-expansion-panel-header>电脑信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h2>电脑品牌：{{systemData.manufacturer}}</h2>
          <h2>电脑型号：{{systemData.version}}</h2>
          <h2>uuid：{{systemData.uuid}}</h2>
          <h2>主板品牌：{{baseboardData.manufacturer}}</h2>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>操作系统信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h2>操作系统：{{type=="Windows_NT"?"Windows":type}}</h2>
          <h2>操作系统主机名：{{hostname}}</h2>
          <h2>操作系统标识：{{platform}}</h2>
          <h2>操作系统架构：{{arch}}</h2>
          <h2>用户主目录路径：{{homedir}}</h2>
          <h2>操作系统临时目录：{{tmpdir}}</h2>
          <h2>平均负载：{{loadavg}}</h2>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>CPU信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h2>CPU字节序：{{endianness}}</h2>
          <h2>操作系统发行版本：{{release}}</h2>
          <h2>CPU核心数：{{cpus.length/2}}/CPU线程数：{{cpus.length}}</h2>
          <v-list two-line subheader>
            <v-list-item v-for="(item,index) in cpus" :key="index" @click>
              <v-list-item-content>
                <v-list-item-title>{{item.model}}</v-list-item-title>
                <v-list-item-subtitle>{{item.speed}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <h2>
      内存总量：总量{{(totalmem/1024/1024/1024).toFixed(2)}}G/空闲{{(freemem/1024/1024/1024).toFixed(2)}}G/已使用{{((totalmem-freemem)/1024/1024/1024).toFixed(2)}}G
      <span></span>
    </h2>

    <v-progress-linear
      :value="(totalmem-freemem)/totalmem*(100/100)*100"
      height="25"
      striped
      color="deep-orange"
    >
      <template v-slot="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>

    <h2>系统已运行时间：{{Math.round(uptime/60)}}分钟</h2>
  </div>
</template>

<script>
const os = require("os");
import si from "systeminformation";
// const hostname = os.hostname();
// const homedir = os.homedir();
// const loadavg=os.loadavg();
const loadavg = os.loadavg();
const cpus = os.cpus();

import {
  hostname,
  homedir,
  arch,
  platform,
  tmpdir,
  totalmem,
  type,
  uptime,
  endianness,
  freemem,
  release
} from "os";
import { async } from "q";
export default {
  data() {
    return {
      hostname,
      homedir,
      loadavg,
      arch,
      cpus,
      platform,
      tmpdir,
      totalmem,
      type,
      uptime,
      endianness,
      release,
      freemem,
      systemData: {},
      baseboardData: {},
      cpuData: {}
    };
  },
  methods: {},
  async mounted() {
    this.systemData = await si.system();
    this.baseboardData = await si.baseboard();
    this.cpuData = await si.cpu();
    console.log(this.cpuData);
  }
};

async function systemData() {
  try {
    const data = await si.system();
    console.log(data);
  } catch (e) {}
}

// async function cpuData() {
//   try {
//     const data = await si.cpu();
//     console.log("CPU Information:");
//     console.log("- manufucturer: " + data.manufacturer);
//     console.log("- brand: " + data.brand);
//     console.log("- speed: " + data.speed);
//     console.log("- cores: " + data.cores);
//     console.log("- physical cores: " + data.physicalCores);
//     console.log("...");
//   } catch (e) {
//     console.log(e);
//   }
// }
</script>

<style>
</style>