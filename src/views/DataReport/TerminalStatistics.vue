<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 终端统计 </div>
    <div class="title_pop">
      <span>激活终端总数
        <el-tooltip effect="dark" placement="right-start">
          <div slot="content"> 即为终端开机并启动580程序的总电脑数，每台电脑终端只统计一次  </div>
          <i class="el-icon-question" style="font-size:16px;"></i>
        </el-tooltip>
        ：<a>{{GetTerminalStatistics.count}}台</a></span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="netbarName" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="netbarId" auto-complete="off" placeholder="请输入网吧Id" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="RegisterDate" label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.Date }}</span>
          </template>
        </el-table-column>
        <el-table-column property="Count" label="有效日活终端（台）" :render-header="renderHeader"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </el-row>
    </el-card>
  </div>
</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Qs from 'qs'
export default {
  name: 'TerminalStatistics', //终端统计
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      netbarName: '',
      netbarId: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      GetTerminalStatistics:{},
      tableData: [],
      contentText: ''
    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
  },
  created() {
    var date1 = new Date(new Date().setDate(new Date().getDate() - 1));
    var date2 = new Date(new Date().setDate(date1.getDate() - 7));
    this.Datevalue = [date2, date1];
    this.endTime = this.$moment(date1).format("YYYY-MM-DD");
    this.startTime = this.$moment(date2).format("YYYY-MM-DD");
    this.getData();
  },
  mounted() {},
  methods: {
    renderHeader(h, {
      column,
      $index
    }) {
      return h(
        'div', {
          style: 'display:flex;margin:auto;line-height: 26px;padding: 0;'
        },
        [
          h('span', column.label),
          h('prompt-message', {
            props: {
              messages: '即为终端开机并启动580程序后并且无异常退出的电脑终端数，每日每台电脑终端统计一次'
            }
          })
        ]
      );
    },
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.getData();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.getData();
    },
    onSubmit: function() {
      this.pageNo = 1;
      this.getData();
    },
    //活动时间
    DateChange: function() {
      if (this.Datevalue) {
        var date1 = this.Datevalue[0];
        var date2 = this.Datevalue[1];
        this.startTime = this.$moment(date1).format("YYYY-MM-DD");
        this.endTime = this.$moment(date2).format("YYYY-MM-DD");
        this.getData();
        this.getDataMoney();
      } else {
        this.startTime = '';
        this.endTime = '';
        this.getData();
      }
    },
    //tabel数据获取
    getData: function() {
      let paramList = {
        netbarName: this.netbarName||null,
        netbarId: this.netbarId||null,
        startTime: this.startTime + 'T00:00:00',
        endTime: this.endTime + 'T00:00:00',
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/TerminalStatistics/GetTerminalStatisticsList",paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.tableData = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
      this.axios.get("/api/TerminalStatistics/GetTerminalStatistics",paramList).then(res => {
        var data = res.data.Object;
        _this.GetTerminalStatistics=data;
      });
    },

  }
}
</script>
