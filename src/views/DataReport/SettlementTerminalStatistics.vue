<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3">单桌标结算终端网吧统计</div>
    <br/>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="统计时间：" style="margin-bottom: 5px">
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
        <el-table-column property="CreateDate" label="日期"></el-table-column>
        <el-table-column property="InternetBarName" label="网吧名称"></el-table-column>
        <el-table-column property="NetbarId" label="网吧ID"></el-table-column>
        <el-table-column property="ClientCount" label="有效终端（台）"></el-table-column>
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
  },
  mounted() {},
  methods: {
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
        this.startTime = this.$moment(date1).format("YYYY-MM-DD") + 'T00:00:00';
        this.endTime = this.$moment(date2).format("YYYY-MM-DD") + 'T00:00:00';
        this.getData();
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
      this.axios.get("/api/TerminalStatistics/SettlementTerminalStatistics", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.tableData = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
  }
}
</script>
