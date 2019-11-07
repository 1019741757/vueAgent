<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 网吧离线状态管理
      <el-tooltip effect="dark" placement="right-start">
        <div slot="content"> 当网吧48小时内无任何收益数据时，相应网吧会被系统自动判定为离线状态，如系统重新接收到相应网吧的任何一条收益数据时，该网吧会自动转变为在线状态  </div>
        <i class="el-icon-question" style="margin-left:-15px;font-size:16px;"></i>
      </el-tooltip>
    </div>
    <div class="title_pop">
      <span>当前离线网吧总数：<a>{{GetEarning.OffLineCount||0}}</a> 家</span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="选择离线时间：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item style="width:10%">
          <el-input v-model="netbarName" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item style="width:10%">
          <el-input v-model="netbarId" auto-complete="off" placeholder="请输入网吧ID" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="isVerify" placeholder="请选择是否查证" clearable @change="onSubmit">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-tabs v-model="isRemove" type="card" @tab-click="handleClick">
        <el-tab-pane label="未移除列表" name="0">
          <el-table :data="GetNetbarStateCensusList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
            <el-table-column property="NetbarName" label="网吧名称" width="180"></el-table-column>
            <el-table-column property="NetbarId" label="网吧ID"></el-table-column>
            <el-table-column property="AgencyName" label="所属代理商"></el-table-column>
            <el-table-column property="AgencyId" label="代理商ID"></el-table-column>
            <el-table-column prop="State" label="网吧状态" align='center' width='120' filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.State == '0' ? 'danger':scope.row.State == '1' ? 'success':''" close-transition>
                  {{scope.row.State == "0" ? "离线":scope.row.State == "1" ? "在线":''}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column property="CurrentDate" label="最后在线时间" width="180"></el-table-column>
            <el-table-column property="Operator" label="操作人"></el-table-column>
            <el-table-column property="OperatorTime" label="操作时间" width="180"></el-table-column>
            <el-table-column property="Reason" label="原因"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <el-button type="success" size="small" @click.stop="Verifyformation(scope.$index, scope.row)" v-if="scope.row.IsVerify == 0">标记查证</el-button>
                <el-button size="small" disabled v-else>　已查证</el-button>
                <el-button type="danger" size="small" @click.stop="deletInformation(scope.$index, scope.row,1)" v-if="scope.row.IsVerify != 0">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" style="padding:20px 0; ">
            <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="已移除列表" name="1">
          <el-table :data="GetNetbarStateCensusList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
            <el-table-column property="NetbarName" label="网吧名称" width="180"></el-table-column>
            <el-table-column property="NetbarId" label="网吧ID"></el-table-column>
            <el-table-column property="AgencyName" label="所属代理商"></el-table-column>
            <el-table-column property="AgencyId" label="代理商ID"></el-table-column>
            <el-table-column prop="State" label="网吧状态" align='center' width='120' filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.State == '0' ? 'danger':scope.row.State == '1' ? 'success':''" close-transition>
                  {{scope.row.State == "0" ? "离线":scope.row.State == "1" ? "在线":''}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column property="CurrentDate" label="最后在线时间" width="180"></el-table-column>
            <el-table-column property="Operator" label="操作人" width="180"></el-table-column>
            <el-table-column property="OperatorTime" label="操作时间"></el-table-column>
            <el-table-column property="Reason" label="原因"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <!-- <el-button type="success" size="small" @click.stop="Verifyformation(scope.$index, scope.row)" v-if="scope.row.IsVerify == 0">标记查证</el-button>
                    <el-button size="small" disabled v-else>已查证</el-button> -->
                <el-button type="warning" size="small" @click.stop="deletInformation(scope.$index, scope.row,0)">移回</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" style="padding:20px 0; ">
            <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
  <!--设备编码更换-->
  <el-dialog title="请输入离线原因" :visible.sync="VerifyformationCodeName" width="500px">
    <el-form :model="VerifyformationList" :rules="rules" ref="VerifyformationList" label-width="100px" class="demo-ruleForm">
      <el-form-item label="离线原因：" prop="Reason">
        <el-input type="textarea" v-model="VerifyformationList.Reason" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="VerifyformationCodeName = false">取 消</el-button>
      <el-button type="primary" size="small" @click.native="VerifyInformationSubmit('VerifyformationList')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
import Qs from 'qs'
export default {
  name: 'StateStatistics',
  data: function() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      //条件筛选：
      startTime: null,
      endTime: null,
      netbarName: null,
      netbarId: null,
      isVerify: null,
      isRemove: '0',
      GetEarning: {},
      Datevalue: {},
      //修改网吧信息
      VerifyformationCodeName: false,
      VerifyformationList: {
        Reason: null,
        NetbarId: null
      },
      GetNetbarStateCensusList: [],
      netbarList: [{ //设备状态
        id: '0',
        name: '离线'
      }, {
        id: '1',
        name: '在线'
      }],
      statusList: [{ //设备状态
        id: '0',
        name: '未查证'
      }, {
        id: '1',
        name: '已经查证'
      }],
      rules: {
        Reason: [{
          required: true,
          message: '请输入离线原因',
          trigger: 'blur'
        }],
      }
    }
  },
  created() {
    this.getData();
  },
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
    handleClick(tab, event) {
      // console.log(tab, event);
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
      let _this = this;
      let paramList = {
        startTime: this.startTime||null,
        endTime: this.endTime||null,
        netbarName: this.netbarName||null,
        netbarId: this.netbarId||null,
        isVerify: this.isVerify||null,
        isRemove: this.isRemove||null,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      this.axios.get("/api/Netbar/GetNetbarStateCensusList", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.GetNetbarStateCensusList = data;
          _this.total = res.data.Total;
        }
      });
      this.axios.get("/api/AgencyEarning/GetEarning", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Object;
          _this.GetEarning = data;
        }
      });
    },
    //移除。。移入。。
    deletInformation: function(index, row, type) {
      var NetbarId = row.NetbarId;
      var text = null;
      if (type == 1) {
        text = '移除'
      } else {
        text = '移入'
      }
      this.$confirm('确定' + text + '网吧吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        var _this = this;
        let paramList = {
          NetbarId: row.NetbarId,
          IsRemove: type
        };
        this.axios.post("/api/Netbar/RemoveNetbar", paramList).then(res => {
          if (res.statusText == 'OK') {
            _this.getData();
            _this.$message({
              message: text + '成功',
              type: 'success'
            });
          } else {
            _this.$message.error(res.data.Message);
          }
        });
      }).catch(() => {});
    },
    Verifyformation: function(index, row) {
      this.VerifyformationCodeName = true;
      this.VerifyformationList.NetbarId = row.NetbarId;
    },
    VerifyInformationSubmit: function(VerifyformationList) {
      this.$refs[VerifyformationList].validate((valid) => {
        if (valid) {
          var _this = this;
          let paramList = {
            NetbarId: this.VerifyformationList.NetbarId,
            Reason: this.VerifyformationList.Reason,
          };
          this.axios.post("/api/Netbar/Verify", paramList).then(res => {
            if (res.statusText == 'OK') {
              _this.getData();
              _this.VerifyformationCodeName = false;
              _this.$message({
                message: '标记成功',
                type: 'success'
              });
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
  }
}
</script>
