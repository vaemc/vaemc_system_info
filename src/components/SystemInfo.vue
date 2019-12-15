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
          <h2>用户名：{{usersData[0].user}}</h2>
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
          <h2>发行版：{{osInfoData.distro}}</h2>
          <h2>操作系统架构：{{arch}}</h2>
          <h2>用户主目录路径：{{homedir}}</h2>
          <h2>操作系统临时目录：{{tmpdir}}</h2>
          <h2>平均负载：{{loadavg}}</h2>
          <h2>操作系统发行版本：{{release}}</h2>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>磁盘信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h2>磁盘大小：{{diskLayoutData[0].size/1024/1024/1024}}G</h2>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>进程信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h2>进程总数：{{processesData.all}}</h2>
          <h2>正在运行的进程数：{{processesData.running}}</h2>
          <h2>睡眠中的进程数：{{processesData.sleeping}}</h2>
          <v-data-table :headers="processesHeaders" :items="processesData.list" :items-per-page="5"></v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>CPU信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h2>CPU字节序：{{endianness}}</h2>

          <h2>CPU核心数：{{cpus.length/2}}/CPU线程数：{{cpus.length}}</h2>
          <v-list two-line subheader>
            <v-list-item v-for="(item,index) in cpus" :key="index" @click>
              <v-list-item-content>
                <v-list-item-title>{{item.model}}</v-list-item-title>
                <v-list-item-subtitle>{{item.speed}}MHz</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>电池信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h2>当前电量：{{batteryData.percent}}%</h2>
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
    <h2>CPU总使用率：{{Math.round(currentLoadData.currentload)}}%</h2>

    <div v-for="(item,index) in currentLoadData.cpus" :key="index" style="margin-bottom:1px;">
      <v-progress-linear :value="item.load" height="25" striped color="light-blue">
        <template v-slot="{ value }">
          <strong>CPU#{{index}}---{{ Math.round(value) }}%</strong>
        </template>
      </v-progress-linear>
    </div>

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

import { async } from "q";
import {
  hostname,
  homedir,
  arch,
  platform,
  tmpdir,
  type,
  uptime,
  endianness,
  freemem,
  release
} from "os";

export default {
  data() {
    return {
      processesHeaders: [
        {
          text: "pid",
          align: "left",
          sortable: false,
          value: "pid"
        },

        { text: "parentPid", value: "parentPid" },
        { text: "名称", value: "name" },
        { text: "路径", value: "path" },
        { text: "CPU使用率", value: "pcpu" }
      ],

      hostname,
      homedir,
      loadavg,
      arch,
      cpus,
      platform,
      tmpdir,
      totalmem: 0,
      type,
      uptime,
      endianness,
      release,
      freemem,
      systemData: {},
      baseboardData: {},
      cpuData: {},
      cpuCurrentspeedData: {},
      batteryData: {},
      usersData: [{ user: "" }],
      processesData: { list: [] },
      osInfoData: {},
      diskLayoutData: [{ size: 0 }],
      currentLoadData: { cpus: [] }
    };
  },
  methods: {
    async Refresh() {
      this.totalmem = os.totalmem();
      this.currentLoadData = await si.currentLoad();
    }
  },
  async mounted() {
    this.systemData = await si.system();
    this.baseboardData = await si.baseboard();
    this.cpuData = await si.cpu();
    this.cpuCurrentspeedData = await si.cpuCurrentspeed();
    this.batteryData = await si.battery();

    this.usersData = await si.users();
    this.currentLoadData = await si.currentLoad();
    this.totalmem = os.totalmem();
    this.processesData = await si.processes();
    this.osInfoData = await si.osInfo();
    this.diskLayoutData = await si.diskLayout();
    this.timer = setInterval(this.Refresh, 1000);
    console.info(this.currentLoadData);
  }
};
</script>


