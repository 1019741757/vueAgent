<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 收益账单</div>
    <div class="title_pop">
      <span><a> &nbsp; 注：收益结算后，15个工作日计入可提现收益内，只有计入可提现收益内的余额，才可提现</a></span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="请选择申请时间：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" :clearable="false"></el-date-picker>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" @click="onSubmit" size="medium">查询</el-button>
        </el-form-item>
      </el-form>
      <div id="Echarts_IncomeStatement" :style="{width: '100%', height: '320px'}"></div>
      <el-table :data="GetAgencyEarningByPageList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="CreateTime" label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.DateOfEarningStr }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column property="OpenWindowClientEarning" label="580特权客户端(显示)(元)" :render-header="renderHeader"></el-table-column>
        <el-table-column property="NotOpenWindowClientEarning" label="580特权客户端(不显示)(元)" :render-header="renderHeader"></el-table-column> -->
        <el-table-column prop="State" label="580业务收益" align='center' width='180' filter-placement="bottom-end">
          <template slot-scope="scope">{{scope.row.OpenWindowClientEarning+scope.row.NotOpenWindowClientEarning}}</template>
        </el-table-column>
        <el-table-column property="EarningFromSubordinate" label="推荐奖励收益" :render-header="renderHeader"></el-table-column>
        <el-table-column property="ActivitySub" label="活动收益" :render-header="renderHeader"></el-table-column>
        <el-table-column property="HomePage" label="增值业务"></el-table-column>
        <el-table-column property="SumEarning" label="当日总计(元)"></el-table-column>
        <el-table-column prop="State" label="收益状态" align='center' width='120' filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.State == '0' ? 'danger':scope.row.State == '1' ? 'success':''" close-transition>
              {{scope.row.State == "0" ? "未结算":scope.row.State == "1" ? "已结算":''}}
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
import axios from "axios"
import echarts from "echarts"
export default {
  name: 'getbill',
  data: function() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      startTime: '',
      endTime: '',
      Datevalue: {},
      GetAgencyEarningByPageList: [],
      myChart: {},
      renderHeaderList: {
        '1': '即为580网吧特权客户端程序在终端开机时自动显示页面并启动客户端程序',
        '2': '即为580网吧特权客户端程序在终端开机时不显示客户端程序页面，程序依然运行',
        '3': '即为您所推荐的下级所产生的收益数据的推荐奖励分成金额',
        '4': '即为网吧开通活动后台后，所产生的活动分成收益金额'
      },
    }
  },
  mounted: function() {
    var date1 = new Date(new Date().setDate(new Date().getDate()));
    var date2 = new Date(new Date().setDate(date1.getDate() - 6));
    this.Datevalue = [date2, date1];
    this.endTime = this.$moment(date1).format("YYYY-MM-DD");
    this.startTime = this.$moment(date2).format("YYYY-MM-DD");
    this.getData();
  },
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
    handleClick(tab, event) {
      // console.log(tab, event);
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
    getData: function() {
      var _this = this;
      var paramList = {
        startTime: this.startTime + 'T00:00:00',
        endTime: this.endTime + 'T00:00:00',
        PageSize: this.pageSize,
        PageIndex: this.pageNo
      };
      this.axios.get('/api/AgencyEarning/GetAgencyEarningByPage', paramList).then(res => {
        if (res.statusText == 'OK') {
          console.log(res);
          _this.Echartspasotr();
          var data = res.data.Items;
          _this.GetAgencyEarningByPageList = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    Echartspasotr: function(data) {
      var paramList1 = {
        startTime: this.startTime + 'T00:00:00',
        endTime: this.endTime + 'T00:00:00',
        PageSize: 100000,
        PageIndex: 1
      };
      this.axios.get('/api/AgencyEarning/GetAgencyEarningByPage', paramList1).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          var OpenWindowClientEarningList = [];
          var NotOpenWindowClientEarningList = [];
          var EarningFromSubordinateList = [];
          var BusinessIncomeList=[];
          var tiemList = [];
          for (var i = 0; i < data.length; i++) {
            tiemList.push(data[i].DateOfEarningStr);
            OpenWindowClientEarningList.push(data[i].OpenWindowClientEarning);
            NotOpenWindowClientEarningList.push(data[i].EarningFromSubordinate);
            EarningFromSubordinateList.push(data[i].EarningFromSubordinate);
            BusinessIncomeList.push(data[i].OpenWindowClientEarning+data[i].EarningFromSubordinate);
          }
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('Echarts_IncomeStatement'))
          // 绘制图表
          myChart.setOption({
            title: {
              text: '近期收益曲线图：',
              x: 'left',
              textStyle: {
                color: '#606266',
                fontSize: 14,
                fontWeight: 'bold'
              },
            },
            color: ['#ff6d60', '#69cdc5'],
            tooltip: {
              trigger: 'axis'
            },
            // legend: {
            //   data: ['580特权客户端（显示）', '580特权客户端（不显示）', "推荐奖励收益"]
            // },
            legend: {
              data: ['580业务收益', "推荐奖励收益"]
            },
            xAxis: {
              name: '日期（年/月/日）',
              type: 'category',
              boundaryGap: false,
              data: tiemList
            },
            yAxis: {
              name: '收益(元)',
              type: 'value'
            },
            series: [
              {
                name: '580业务收益',
                type: 'line',
                stack: '总量',
                data: BusinessIncomeList
              },
              {
                name: '推荐奖励收益',
                type: 'line',
                stack: '总量',
                data: EarningFromSubordinateList
              },
            ]
          });
        } else {
          _this.$message.error(res.data.Message);
        }
      });

    },
  }
}
</script>
<style>
.data-choose-top {
  padding-bottom: 25px;

}

.echart-content {
  width: 100%;
  height: 200px;
}
</style>
