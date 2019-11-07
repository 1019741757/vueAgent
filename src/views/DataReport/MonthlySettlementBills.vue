<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3">单桌标结算终端月账单
      <el-tooltip effect="dark" placement="right-start">
        <div slot="content"> 该账单每月10日左右线下结算，如对结算状态有疑问，请联系客户经理；并且按结算终端的0.3元/月/台结算</div>
        <i class="el-icon-question" style="font-size:16px;"></i>
      </el-tooltip>
    </div>
    <div class="title_pop">
      <span>&nbsp;&nbsp;结算总金额：<a>{{MonthlySettlementBillsSum.Money||0}} （元）&nbsp;&nbsp;&nbsp;&nbsp;</a></span>
      <span>&nbsp;&nbsp;累计结算终端：<a>{{MonthlySettlementBillsSum.ClientCount||0}} （台）&nbsp;&nbsp;&nbsp;&nbsp;</a></span>
      <span>&nbsp;&nbsp;已结算终端数：<a>{{MonthlySettlementBillsSum.Settled ||0}} （台）&nbsp;&nbsp;&nbsp;&nbsp;</a></span>
      <span>&nbsp;&nbsp;未结算终端数：<a>{{MonthlySettlementBillsSum.Unsettled ||0}} （台）&nbsp;&nbsp;&nbsp;&nbsp;</a></span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="请选择账单月份：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="state" placeholder="请选择结算状态" clearable @change="onSubmit">
            <el-option v-for="item in StatusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="CreateDateStr" label="月份"></el-table-column>
        <el-table-column property="ClientCount" label="结算终端（台）"></el-table-column>
        <el-table-column property="Money" label="结算金额（元）"></el-table-column>
        <el-table-column prop="State" label="结算状态" align='center' filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.State == '1' ? 'danger':scope.row.State == '2' ? 'success':''" close-transition>
              {{scope.row.State == "1" ? "未结算":scope.row.State == "2" ? "已结算":''}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="UpdateTime" label="结算时间"></el-table-column>
        <el-table-column property="Remarks" label="结算备注" width="100">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top"  v-if="scope.row.Remarks">
              <p>{{ scope.row.Remarks }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">备注</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
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
      state: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      MonthlySettlementBillsSum: '',
      tableData: [],
      StatusList: [{ //结算状态
        id: '1',
        name: '未结算'
      }, {
        id: '2',
        name: '已结算'
      }],
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
        state: this.state || null,
        startTime: this.startTime || null,
        endTime: this.endTime || null,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/TerminalStatistics/MonthlySettlementBills", paramList).then(res => {
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
        startTime: this.startTime || null,
        endTime: this.endTime || null,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/TerminalStatistics/MonthlySettlementBillsSum", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Object;
          _this.MonthlySettlementBillsSum = data;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
  }
}
</script>
