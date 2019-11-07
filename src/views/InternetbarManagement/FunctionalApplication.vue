<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 网吧活动功能申请  <a style="float:right;color: #f08e83;padding: 0 19px;" @click="FunctiongetUrl">网吧活动功能介绍<i class="el-icon-arrow-right"></i></a> </div>
    </br>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="筛选条件：">
          <el-input v-model="NetbarName" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="NetbarId" auto-complete="off" placeholder="请输入网吧ID" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input v-model="AccountNumber" auto-complete="off" placeholder="请输入网吧后台账号" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-select v-model="NetbarAccountNumberState" placeholder="请选择网吧状态" clearable @change="onSubmit">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" @click="onSubmit" size="medium">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="GetNetbarList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="NetbarName" label="网吧名称" width="180"></el-table-column>
        <el-table-column property="NetbarID" label="网吧ID"></el-table-column>
        <el-table-column property="StateName" label="账号状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.NetbarAccountNumberState == '0' ? 'danger':scope.row.NetbarAccountNumberState == '1' ? 'primary':scope.row.NetbarAccountNumberState == '2' ? 'success':'success'" close-transition>
              {{scope.row.NetbarAccountNumberState == "0" ? "未申请":scope.row.NetbarAccountNumberState == "1" ? "申请中":scope.row.NetbarAccountNumberState == "2" ? "已申请":''}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="NetbarContacts" label="网吧联系人"></el-table-column>
        <el-table-column property="NetbarPhone" label="网吧联系方式"></el-table-column>
        <el-table-column label="网吧活动功能申请" width="300">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click.stop="ImmediateApplication(scope.$index, scope.row)" v-if="scope.row.NetbarAccountNumberState == 0"> 立即申请 </el-button>
            <el-button type="primary" size="small" icon="el-icon-success" v-else-if="scope.row.NetbarAccountNumberState == 1">申请中</el-button>
            <el-button type="info" size="small" icon="el-icon-success" v-else>已申请</el-button>
            <el-button type="success" size="small" icon="el-icon-edit"  @click.stop="UpdateNetbarContactsmation(scope.$index, scope.row)" v-if="scope.row.NetbarContacts">编辑网吧信息</el-button>
            <el-button type="info" size="small" icon="el-icon-success" v-else>编辑网吧信息</el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </el-row>
    </el-card>
  </div>
  <!--添加网吧后台账号-->
  <el-dialog title="提交网吧信息" :visible.sync="CreateNetbarUserCodeName" width="500px" @close='CreateNetbarUsercloseDialog'>
    <el-form :model="CreateNetbarUserList" :rules="rules" ref="CreateNetbarUserList" label-width="120px" class="demo-ruleForm">
      <el-form-item label="网吧联系人：" prop="Contacts">
        <el-input type="text" v-model="CreateNetbarUserList.Contacts" auto-complete="off" placeholder="请输入网吧联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号：" prop="BindingPhone">
        <el-input type="text" v-model="CreateNetbarUserList.BindingPhone" auto-complete="off" placeholder="请输入联系人手机号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="CreateNetbarUserCodeName = false">取 消</el-button>
      <el-button type="primary" size="small" @click.native="CreateNetbarUserSubmit('CreateNetbarUserList')">确 定</el-button>
    </div>
  </el-dialog>
  <!--编辑网吧后台登陆账号-->
  <el-dialog title="重新提交网吧信息" :visible.sync="VerifyformationCodeName" width="500px">
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
  name: 'FunctionalApplication',
  data: function() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      NetbarId: '',
      NetbarName: '',
      AccountNumber: '',
      NetbarAccountNumberState: '',
      startTime: '',
      endTime: '',
      Contacts: '',
      Datevalue: {},
      GetNetbarList: [],
      statusList: [{ //设备状态
        id: '1',
        name: '未申请'
      }, {
        id: '2',
        name: '申请中'
      }, {
        id: '3',
        name: '已申请'
      }],
      VerifyformationCodeName: false,
      VerifyformationList: {
        NetbarID: '',
        NetbarPhone: '',
        NetbarContacts: ''
      },
      //添加网吧后台账号
      CreateNetbarUserCodeName: false,
      CreateNetbarUserList: {
        Contacts: '',
        BindingPhone: ''
      },
      CreateNetbarUserNetbarID: '',
      rules: {
        Contacts: [{
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
        BindingPhone: [{
            required: true,
            message: '请输入联系人手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
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
    //网吧活动功能介绍
    FunctiongetUrl: function() {
      this.$router.push('/FunctionIntroduction');
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
    getData: function() {
      let _this = this;
      var paramList = {
        StartTime: "",
        EndTime: "",
        AgencyPhone: "",
        AgencyName: "",
        NetbarAccountNumberState: this.NetbarAccountNumberState,
        Type: 0,
        NetbarName: this.NetbarName,
        NetbarId: this.NetbarId,
        PageSize: this.pageSize,
        PageIndex: this.pageNo
      };
      this.axios.post("/api/Netbar/GetNetbarList", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.GetNetbarList = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    UpdateNetbarContactsmation: function(index, row) {
      this.VerifyformationCodeName = true;
      this.VerifyformationList.NetbarID = row.NetbarID;
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
    //添加网吧后台账号
    ImmediateApplication: function(index, row) {
      if (!row.MachineCode) {
        this.$message({
          message: '该网吧未激活，请将产品安装至网吧后再申请网吧活动后台！',
          type: 'error'
        });
      } else {
        this.CreateNetbarUserNetbarID = row.NetbarID;
        this.CreateNetbarUserCodeName = true;
      }
    },
    CreateNetbarUsercloseDialog: function() {
      this.$refs.CreateNetbarUserList.resetFields();
    },
    CreateNetbarUserSubmit: function(CreateNetbarUserList) {
      var _this = this;
      var paramList = {
        NetbarID: this.CreateNetbarUserNetbarID,
        BindingPhone: this.CreateNetbarUserList.BindingPhone,
        Contacts: this.CreateNetbarUserList.Contacts
      };
      this.$refs[CreateNetbarUserList].validate((valid) => {
        if (valid) {
          this.axios.post("/api/Netbar/CreateNetbarUser", paramList).then(res => {
            if (res.statusText == 'OK') {
              _this.getData();
              _this.CreateNetbarUserCodeName = false;
              _this.$refs[CreateNetbarUserList].resetFields();
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              _this.$message.error(res.data.Message);
              _this.PrivilegecloseDialog();
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
