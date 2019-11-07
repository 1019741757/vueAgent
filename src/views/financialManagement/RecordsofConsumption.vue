<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 消费记录查询 </div>
    <br>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="orderid" auto-complete="off" placeholder="请输入订单编号" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="netbarNeme" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div class="" v-for="item in props.row.ConsumeLogItems">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="特权名称：">
                      <span class="font_color">{{ item.ProductName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="购买月数：">
                      <span class="font_color">{{ item.Units }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="消费金额：">
                      <span class="font_color">{{ item.Units*item.UnitPrice}} 元 </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column property="NetbarName" label="网吧名称"></el-table-column>
        <el-table-column property="OrderDate" label="购买时间"></el-table-column>
        <el-table-column property="OrderID" label="订单编号"></el-table-column>
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
      orderid: '',
      netbarNeme: '',
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
        orderid: this.orderid,
        netbarNeme: this.netbarNeme,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/Consume/GetConsumeLog", paramList).then(res => {
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
