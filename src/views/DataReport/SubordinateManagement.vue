<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 下级管理</div>
    <div class="title_pop">
      <div class="homepage_copyUrl">
        <span> <i class="el-icon-share"></i> 推荐注册</span>
        <span class="color-g">{{'http://b.580tequan.com/#/regist?agencyId=' + Id}}</span>
        &nbsp;&nbsp;&nbsp;
        <el-button type="primary" size="mini" icon="el-icon-star-off" :data-clipboard-text="'http://b.580tequan.com/#/Register?ParentId='+Id" @click="getcopy" id="copy_text">复制</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content">{{contentText}}</div>
          <el-button>为什么要邀请好友注册？</el-button>
        </el-tooltip>
      </div>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="phone" auto-complete="off" placeholder="代理商手机号" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="name" auto-complete="off" placeholder="代理商姓名" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
        <el-table-column property="RegisterDate" label="注册日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.RegisterDate }}</span>
          </template>
        </el-table-column>
        <el-table-column property="AgencyPhone" label="代理商手机号"></el-table-column>
        <el-table-column property="AgencyName" label="代理商名称"></el-table-column>
        <el-table-column property="TotalEarning" label="总推荐收益(元)"></el-table-column>
        <el-table-column property="ClientActiveCount" label="终端数(台)"></el-table-column>
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
import Clipboard from 'clipboard'
export default {
  name: 'PaymentRecord', //网费支付记录
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      name: '',
      phone: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      CensusMoneyList: {},
      tableData: [],
      contentText: ''
    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
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
        this.startTime = this.$moment(date1).format("YYYY-MM-DD");
        this.endTime = this.$moment(date2).format("YYYY-MM-DD");
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
        name: this.name,
        phone: this.phone,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/Agency/GetChildLevel1", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.tableData = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
      this.axios.get("/api/Configure/GetRewardRatio", paramList).then(res => {
        var data = res.data.Object;
        // _this.contentText = '本平台运用三级分销推荐奖励分成模式，你的直接下级（收益的'+data.RatioOfToGradeOne+'%）和间接下级（收益的'+data.RatioOfToGradeTwo+'%）皆可为你带来推荐奖励，复制邀请注册网址，分享好友，好友通过你的分享链接注册后，会直接成为你的下级。'
       _this.contentText = '本平台使用推荐奖励模式，你的下级可为你带来'+data.RatioOfToGradeOne+'%的推荐奖励收益，复制推荐注册链接，分享好友，好友通过你的分享链接注册后，会直接成为你的下级。'
      });
    },
    //复制
    getcopy: function() {
      var _this = this;
      var clipboard = new Clipboard('#copy_text');
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        Message({
          message: '该浏览器不支持自动复制',
          type: 'warning'
        });
        // 释放内存
        clipboard.destroy()
      })
    }
  }


}
</script>
