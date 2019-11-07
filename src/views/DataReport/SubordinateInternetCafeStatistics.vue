<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 下级网吧统计 </div>
    </br>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="筛选条件：">
          <el-input v-model="agencyName" auto-complete="off" placeholder="代理商名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="agencyPhone" auto-complete="off" placeholder="代理商手机号" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
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
      <el-table :data="GetSubordinateInternetList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="NetbarName" label="网吧名称" width="180"></el-table-column>
        <el-table-column property="Count" label="激活终端数"></el-table-column>
        <el-table-column property="AgencyName" label="下级代理商名称"></el-table-column>
        <el-table-column property="AgencyPhone" label="下级代理商手机号"></el-table-column>
        <el-table-column property="StateName" label="账号状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.State == '0' ? 'danger':scope.row.State == '1' ? 'success':'success'" close-transition>
              {{scope.row.State == "0" ? "离线":scope.row.State == "1" ? "在线":''}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="CurrentDate" label="最后在线时间"></el-table-column>
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
      agencyName: '',
      agencyPhone: '',
      NetbarAccountNumberState: '',
      GetSubordinateInternetList: [],
      statusList: [ { //设备状态
        id: '1',
        name: '在线'
      },{
        id: '0',
        name: '离线'
      }],
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
        agencyName: this.agencyName || null,
        agencyPhone: this.agencyPhone || null,
        state: this.NetbarAccountNumberState || 0,
        PageSize: this.pageSize,
        PageIndex: this.pageNo
      };
      this.axios.get("/api/TerminalStatistics/GetSubordinateInternetList", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.GetSubordinateInternetList = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
  }
}
</script>
