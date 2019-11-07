<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 充值记录查询 </div>
    <div class="title_pop">
      <span>历史充值总额：<a>{{GetAgencyRechargeSum}}元</a></span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="number" auto-complete="off" placeholder="请输入充值编号" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" border  style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="RechargeNo" label="充值编号"></el-table-column>
        <el-table-column property="RechargeBalance" label="充值金额(元)"></el-table-column>
        <el-table-column property="RechargeMode" label="支付类型"></el-table-column>
        <el-table-column property="Count" label="充值时间">
          <template slot-scope="scope">
            <i class="el-icon-time" style="color:#89bf04"></i>
            <span style="margin-left: 10px;color:#89bf04">{{ scope.row.CreateTimer }}</span>
          </template>
        </el-table-column>
        <el-table-column property="RegisterDate" label="成功时间">
          <template slot-scope="scope">
            <i class="el-icon-time" style="color:#f6ae3f"></i>
            <span style="margin-left: 10px;color:#f6ae3f">{{ scope.row.RechargeDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="State" label="充值状态" align='center' width='80' filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.RechargeStatus == '1' ? 'success':'danger'" close-transition>
              {{scope.row.RechargeStatus == "1" ? "成功":'失败'}}
            </el-tag>
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
      number: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      GetAgencyRechargeSum: {},
      tableData: [],
      contentText: ''
    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
  },
  created() {
    var date1 = new Date(new Date().setDate(new Date().getDate()));
    var date2 = new Date(new Date().setDate(date1.getDate() - 7));
    this.Datevalue = [date2, date1];
    this.endTime = this.$moment(date1).format("YYYY-MM-DD");
    this.startTime = this.$moment(date2).format("YYYY-MM-DD");
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
        this.startTime = this.$moment(date1).format("YYYY-MM-DD");
        this.endTime = this.$moment(date2).format("YYYY-MM-DD");
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
        startTime: this.startTime + 'T00:00:00',
        endTime: this.endTime + 'T00:00:00',
        number: this.number,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/Recharge/GetAgencyRechargeList",paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.tableData = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
      var paramList1 = {
        startTime: this.startTime + 'T00:00:00',
        endTime: this.endTime + 'T00:00:00',
        number: this.number
      };
      this.axios.get("/api/Recharge/GetAgencyRechargeSum", paramList1).then(res => {
        var data = res.data.Object;
        _this.GetAgencyRechargeSum = data;
      });
    },

  }
}
</script>
