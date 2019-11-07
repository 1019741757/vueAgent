<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h4"> <i class="icon iconfont iconicon_dmail" style="font-size: 25px;vertical-align: sub;"></i> &nbsp; 信息中心 </div>
    </br>
    <el-card shadow="always">
      <!-- 表格 -->
      <el-tabs v-model="isRemove" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部消息" name="2">
          <el-table :data="GetMessageCenterList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
            <el-table-column property="SendDate" label="时间" width="180"></el-table-column>
            <el-table-column property="Title" label="标题">
              <template slot-scope="scope">
                <p class="MessageCenter_Title" @click.stop="detailsInformation(scope.$index, scope.row,0)">{{ scope.row.Title }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click.stop="detailsInformation(scope.$index, scope.row,0)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" style="padding:20px 0; ">
            <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :label="'未读信息 ('+UnreadCount+')'" name="0">
          <el-table :data="GetMessageCenterList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
            <el-table-column property="SendDate" label="时间" width="180"></el-table-column>
            <el-table-column property="Title" label="标题">
              <template slot-scope="scope">
                <p class="MessageCenter_Title" @click.stop="detailsInformation(scope.$index, scope.row,0)">{{ scope.row.Title }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click.stop="detailsInformation(scope.$index, scope.row,0)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" style="padding:20px 0; ">
            <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="已读消息" name="1">
          <el-table :data="GetMessageCenterList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}">
            <el-table-column property="SendDate" label="时间" width="180"></el-table-column>
            <el-table-column property="Title" label="标题">
              <template slot-scope="scope">
                <p class="MessageCenter_Title" @click.stop="detailsInformation(scope.$index, scope.row,0)">{{ scope.row.Title }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click.stop="detailsInformation(scope.$index, scope.row,0)">详情</el-button>
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
  <!-- 信息详情 -->
  <el-dialog title="消息详情" :visible.sync="centerDialogVisible" width="600px" class="CreateMessage">
    <h3 class="CreateMessage_title">{{CreateMessageList.Title}}</h3>
    <div class="CreateMessage_date">时间：{{CreateMessageList.SendDate}} </div>
    <div class="CreateMessage_body">
      {{CreateMessageList.Content}}
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false" size="small">关 闭</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
import {
  mapGetters
} from "vuex";
export default {
  name: 'MessageCenter',
  data: function() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      //条件筛选：
      isRemove: '0',
      GetMessageCenterList: [],
      centerDialogVisible: false, //信息详情
      CreateMessageList: {}, //信息详情
      rules: {
        Reason: [{
          required: true,
          message: '请输入离线原因',
          trigger: 'blur'
        }],
      }
    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying", "UnreadCount"])
  },
  created() {
    var isRemove = this.$route.query.isRemove || 0;
    this.isRemove = isRemove.toString();
    this.getData();
    // this.$store.dispatch('GetCount');
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
      var _this = this;
      var paramList = {
        type: this.isRemove,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      this.axios.get("/api/Message/GetMessageCenter", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.GetMessageCenterList = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    //信息统计
    // getGetMessageTypeCount: function() {
    //   var _this = this;
    //   var paramList = {};
    //   this.axios.get("/api/Message/GetMessageTypeCount", paramList).then(res => {
    //     if (res.statusText == 'OK') {
    //       _this.UnreadCount = JSON.stringify(res.data.UnreadCount) || 0;
    //     } else {
    //       _this.$message.error(res.data.Message);
    //     }
    //   });
    // },
    //信息详情
    detailsInformation: function(index, row) {
      var _this = this;
      this.CreateMessageList = row;
      this.centerDialogVisible = true;
      var _this = this;
      var paramList = {
        Id: row.Id
      };
      this.axios.post("/api/Message/CreateMessage", paramList).then(res => {
        if (res.statusText == 'OK') {
          _this.getData();
          this.$store.dispatch('GetCount');
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    }
  }
}
</script>
