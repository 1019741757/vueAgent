<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 网吧收益统计</div>
    <div class="title_pop">
      <span>&nbsp;&nbsp;总计： <a>{{GetNetbarEarningBill.SumEarning||0}}元</a> </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>580特权客户端(显示)：<a>{{GetNetbarEarningBill.OpenWindow||0}}元</a> </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>580特权客户端(不显示)：<a>{{GetNetbarEarningBill.NotOpenWindow||0}}元</a> </span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="网吧名称：">
          <el-input v-model="NetbarName" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="NetbarName" label="网吧名称" width="130"></el-table-column>
        <el-table-column property="OpenWindow" label="580特权客户端(显示)(元)" :render-header="renderHeader"></el-table-column>
        <el-table-column property="NotOpenWindow" label="580特权客户端(不显示)(元)" :render-header="renderHeader"></el-table-column>
        <el-table-column property="ActivitySub" label="活动收益(元)" :render-header="renderHeader"></el-table-column>
        <el-table-column property="SumEarning" label="合计"></el-table-column>
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
  name: 'PaymentRecord', //网费支付记录
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      NetbarName: '',
      state: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      GetNetbarEarningBill: {},
      tableData: [],
      renderHeaderList: {
        '1': '即为580网吧特权客户端程序在终端开机时自动显示页面并启动客户端程序',
        '2': '即为580网吧特权客户端程序在终端开机时不显示客户端程序页面，程序依然运行',
        '3': '即为网吧开通活动后台后，所产生的活动分成收益金额'
      },
    }
  },
  created() {
    this.getData();
    this.getDataMoney();
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
              messages: this.renderHeaderList[$index]
            }
          })
        ]
      );
    },
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
    //tabel数据获取
    getData: function() {
      let paramList = {
        NetbarName: this.NetbarName,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/Netbar/GetNetbarEarningBillList", paramList).then(res => {
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
        NetbarName: this.NetbarName
      };
      var _this = this;
      this.axios.get("/api/Netbar/GetNetbarEarningBill", paramList).then(res => {
        console.log(res);
        if (res.statusText == 'OK') {
          var data = res.data.Object;
          _this.GetNetbarEarningBill = data;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
  }
}
</script>
