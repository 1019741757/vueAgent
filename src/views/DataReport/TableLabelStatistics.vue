<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3">网吧单桌标终端数统计
      <el-tooltip effect="dark" placement="right-start">
        <div slot="content"> 该页面只统计通过单桌标模式激活的网吧终端数统计 </div>
        <i class="el-icon-question" style="font-size:16px;"></i>
      </el-tooltip>
    </div>
    <div class="title_pop">
      <span>&nbsp;&nbsp;单桌标终端总数
        <el-tooltip effect="dark" placement="right-start">
          <div slot="content"> 该字段用于统计通过单桌标模式启动的终端总数，每台电脑只统计一次 </div>
          <i class="el-icon-question" style="font-size:16px;"></i>
        </el-tooltip>
        ：<a>{{GetManuaStartTerminalSumValue||0}} （台）</a>
      </span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="终端激活时间：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="NetbarName" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="netbarId" auto-complete="off" placeholder="请输入网吧ID" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="NetbarName" label="网吧名称"></el-table-column>
        <el-table-column property="NetbarId" label="网吧ID"></el-table-column>
        <el-table-column property="Count" label="网吧终端数（台）"></el-table-column>
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
  mapGetters,
} from 'vuex'
export default {
  name: 'TableLabelStatistics', //网吧单桌标终端数统计
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      NetbarName: '',
      netbarId: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      GetManuaStartTerminalSumValue: '',
      tableData: [],
    }
  },
  created() {
    this.getData();
    this.getDataMoney();
  },
  mounted() {},
  methods: {
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.getData();
      this.getDataMoney();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.getData();
      this.getDataMoney();
    },
    onSubmit: function() {
      this.pageNo = 1;
      this.getData();
      this.getDataMoney();
    },
    //活动时间
    DateChange: function() {
      if (this.Datevalue) {
        var date1 = this.Datevalue[0];
        var date2 = this.Datevalue[1];
        this.startTime = this.$moment(date1).format("YYYY-MM-DD") + 'T00:00:00';
        this.endTime = this.$moment(date2).format("YYYY-MM-DD") + 'T00:00:00';
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
        NetbarName: this.NetbarName || null,
        netbarId: this.netbarId || null,
        startTime: this.startTime || null,
        endTime: this.endTime || null,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/TerminalStatistics/GetManuaStartTerminal", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.tableData = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    getDataMoney: function() {
      let paramList = {
        NetbarName: this.NetbarName || null,
        netbarId: this.netbarId || null,
        startTime: this.startTime || null,
        endTime: this.endTime || null,
      };
      var _this = this;
      this.axios.get("/api/TerminalStatistics/GetManuaStartTerminalSum", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Object;
          _this.GetManuaStartTerminalSumValue = data;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
  }
}
</script>
