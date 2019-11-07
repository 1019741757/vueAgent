<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 网吧后台管理</div>
    </br>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="请选择申请时间：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item style="width:10%">
          <el-input v-model="NetbarName" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item style="width:10%">
          <el-input v-model="NetbarId" auto-complete="off" placeholder="请输入网吧ID" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item style="width:10%">
          <el-input v-model="AccountNumber" auto-complete="off" placeholder="请输入网吧后台账号" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="State" placeholder="请选择网吧状态" clearable @change="onSubmit">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" @click="onSubmit" size="medium">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="" style="margin-bottom:18px;">
        <el-button type="primary" @click="openUrl('/IncomeStatement')">查看每日活动收益详情 </el-button>
        <el-button type="primary" @click="openUrl('/RevenueStatistics')"> 查看网吧活动收益详情 </el-button>
      </div>
      <el-table :data="GetNetbarUserList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="CreateTime" label="申请日期" width="180"></el-table-column>
        <el-table-column property="AccountNumber" label="网吧账号" :render-header="renderHeader"></el-table-column>
        <el-table-column property="NetbarName" label="网吧名称"></el-table-column>
        <el-table-column property="NetbarId" label="网吧ID"></el-table-column>
        <el-table-column property="NetbarContacts" label="网吧联系人"></el-table-column>
        <el-table-column property="NetbarPhone" label="网吧联系方式"></el-table-column>
        <el-table-column property="StateName" label="状态" :render-header="renderHeader"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click.stop="UpdateNetbarContactsmation(scope.$index, scope.row)" v-if="scope.row.NetbarContacts">编辑网吧信息</el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </el-row>
    </el-card>
  </div>
  <!--编辑网吧后台登陆账号-->
  <el-dialog title="编辑网吧后台登陆账号" :visible.sync="VerifyformationCodeName" width="500px">
    <el-form :model="VerifyformationList" :rules="rules" ref="VerifyformationList" label-width="140px" class="demo-ruleForm">
      <el-form-item label="网吧联系人：" prop="NetbarContacts">
        <el-input type="text" v-model="VerifyformationList.NetbarContacts" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号：" prop="NetbarPhone">
        <el-input type="text" v-model="VerifyformationList.NetbarPhone" auto-complete="off"></el-input>
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
import axios from "axios"
import {
  mapGetters
} from "vuex";
export default {
  name: 'wblist',
  data: function() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      NetbarId: '',
      NetbarName: '',
      AccountNumber: '',
      State: '',
      startTime: '',
      endTime: '',
      Contacts: '',
      Datevalue: {},
      GetNetbarUserList: [],
      statusList: [{ //设备状态
        id: '0',
        name: '申请中'
      }, {
        id: '1',
        name: '已开启'
      }, {
        id: '2',
        name: '已关闭'
      }],
      VerifyformationCodeName: false,
      VerifyformationList: {
        NetbarID: '',
        NetbarPhone: '',
        NetbarContacts: ''
      },
      renderHeaderList: {
        '1': '平台生成的网吧对应的唯一网吧活动后台登录账号',
        '6': '对应网吧580客户端是否开启活动入口的状态显示，如需开启或关闭，请联系客户经理'
      },
      rules: {
        NetbarContacts: [{
            required: true,
            message: '请输入网吧联系人',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        NetbarPhone: [{
            required: true,
            message: '请输入联系人手机号码',
            trigger: 'blur'
          },
          {
            pattern: /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
      }
    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
  },
  mounted: function() {
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
    openUrl: function(url) {
      this.$router.push({
        path: url
      })
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
      let _this = this;
      let paramList = {
        AgencyId: this.Id,
        AccountNumber: this.AccountNumber,
        NetbarId: this.NetbarId,
        NetbarName: this.NetbarName,
        BeginTime: this.startTime,
        EndTime: this.endTime,
        State: this.State || '-1',
        PageSize: this.pageSize,
        PageIndex: this.pageNo
      };
      this.axios.post("/api/Netbar/GetNetbarUserList", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.GetNetbarUserList = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    UpdateNetbarContactsmation: function(index, row) {
      this.VerifyformationCodeName = true;
      this.VerifyformationList.NetbarID = row.NetbarId;
      this.VerifyformationList.NetbarPhone = row.NetbarPhone;
      this.VerifyformationList.NetbarContacts = row.NetbarContacts;
    },
    VerifyInformationSubmit: function(VerifyformationList) {
      this.$refs[VerifyformationList].validate((valid) => {
        if (valid) {
          var _this = this;
          this.axios.post("/api/Netbar/UpdateNetbarContacts", this.VerifyformationList).then(res => {
            if (res.statusText == 'OK') {
              _this.getData();
              _this.VerifyformationCodeName = false;
              _this.$message({
                message: '编辑成功',
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
<style>
.background .padding-t20 {
  padding-top: 8px;
}

.wwwring {
  display: inline-block;
  color: red;
  margin-left: 114px;
}
</style>
