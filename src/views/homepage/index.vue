<template>
<div class="homepage">
  <div class="homepage_body animated fadeInDown">
    <el-card shadow="always">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="10">
          <div class="homepage_copyUrl">
            <span> <i class="el-icon-share"></i> 推荐注册</span>
            <span class="color-g">{{'http://b.580tequan.com/#/Register?ParentId=' + Id}}</span>
            &nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="mini" icon="el-icon-star-off" :data-clipboard-text="'http://b.580tequan.com/#/Register?ParentId='+Id" @click="getcopy" id="copy_text">复制</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="14">
          <div class="homepage_copyUrl">
            <span><i class="el-icon-circle-check-outline"></i>推荐好友注册成功，被推荐人获得奖励的同时您也可以获得丰厚的奖励。</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:25px;">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="5">
          <div class="homepage_li homepage_li_a" @click="goUrl('/StateManagement')">
            <div class="homepage_rouew">
              <i class="iconfont iconlixianpijisuan"></i>
              <div class="homepage_rouew">
                <div class="o_p">
                  {{GetEarningList.OffLineCount | numFilter}}
                </div>
                <div class="o_b">当前离线网吧总数</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="5">
          <div class="homepage_li homepage_li_d" @click="goUrl('/IncomeStatement')">
            <i class="iconfont icontixian"></i>
            <div class="homepage_rouew">
              <div class="o_p">
                {{GetEarningList.UnsettledEarnings | numFilter}}
              </div>
              <div class="o_b">未结算收益（元）</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="5">
          <div class="homepage_li homepage_li_b" @click="goUrl('/IncomeStatement')">
            <i class="iconfont iconjinrifufeirenshu"></i>
            <div class="homepage_rouew">
              <div class="o_p">
                {{GetEarningList.AMonthEarning | numFilter}}
              </div>
              <div class="o_b">最近30天收入（元）</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="5">
          <div class="homepage_li homepage_li_c" @click="goUrl('/IncomeStatement')">
            <i class="iconfont iconicon-test"></i>
            <div class="homepage_rouew">
              <div class="o_p">
                {{GetEarningList.AllEarning | numFilter}}
              </div>
              <div class="o_b">累计收入（元）</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="4">
          <div class="homepage_li homepage_li_d" @click="goUrl('/WithdrawalsRecord')">
            <i class="iconfont icontixian"></i>
            <div class="homepage_rouew">
              <div class="o_p">
                {{GetEarningList.EarningOfPayed | numFilter}}
                <!-- <count-to :startVal="0" :endVal="GetEarningList.EarningOfPayed" :duration="2600" class="card-panel-num" /> -->
              </div>
              <div class="o_b">累计提现（元）</div>
            </div>
          </div>
        </el-col>

      </el-row>
    </el-card>
    </br>
    <el-card shadow="always">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="homepage_Etimages">
            <a target="_blank" href="http://www.580tequan.com/Course.html">
              <img src="../../assets/images/t1.jpg" alt="网吧特权安装说明">
              <p>网吧特权安装说明</p>
            </a>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="homepage_Etimages">
            <a target="_blank" href="http://b.580tequan.com/teacher1.html">
              <img src="../../assets/images/t2.jpg" alt="网吧特权微信提现说明">
              <p>网吧特权微信提现说明</p>
            </a>
          </div>
        </el-col>
      </el-row>
    </el-card>
    </br>
    <el-card shadow="always">
      <div id="myChart" :style="{width: '100%', height: '320px'}"></div>
    </el-card>
  </div>

  <el-dialog title="公告" :visible.sync="GetTop1MsgShow" width="600px" class="CreateMessage" @close='closegonggao' :close-on-click-modal="false">
    <h3 class="CreateMessage_title">{{GetTop1MsgList.Title}}</h3>
    <div class="CreateMessage_date">时间：{{GetTop1MsgList.SendDate}} </div>
    <div class="CreateMessage_body">
      {{GetTop1MsgList.Content}}
    </div>
    <br />
  </el-dialog>
</div>
</template>

<script>
import CountTo from 'vue-count-to'
import Clipboard from 'clipboard'
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import {
  timeEncode
} from '@/utils/index'
import {
  getCookies,
  setCookies,
} from '@/utils/auth'

export default {
  name: 'homepage',
  data() {
    return {
      cdk: '',
      name: '',
      conten: '',
      centerDialogVisible: false,
      NetbarUserDtoList: {},
      //更换手机号
      modifyPlaceClassifyName: false,
      modifyPlaceClassifyList: {
        Phone: '',
        PhoneCode: '',
        Password: ''
      },
      show: true,
      count: '',
      timer: '',
      //判断用户是否实名认证
      RealnameAuthentication: true,
      //Echarts图表
      beginTime: new Date(new Date().setDate(new Date().getDate() - 7)),
      endTime: new Date(new Date().setDate(new Date().getDate() - 1)),
      EchartTypevalue: 0,
      NetbarId: null,
      //用户业务数据
      GetEarningList: {},
      //广告信息
      IFGetTop1MsgShow: getCookies('IFGetTop1MsgShow'),
      GetTop1MsgList: {},
      GetTop1MsgShow: false
    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
  },
  components: {
    CountTo
  },
  filters: {
    numFilter(x) {
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      return x == 0 ? '0' : s;
    }
  },
  created() {
    this.$store.dispatch('GetInfo').then(() => {
      this.getEcharts();
      this.GetEarning();
      this.GetTop1Msg();
    }).catch(() => {})
  },
  methods: {
    goUrl: function(url) {
      this.$router.push({
        path: url
      })
    },
    //获取曲线图
    getEcharts: function() {
      let paramList = {
        startTime: timeEncode(this.beginTime),
        endTime: timeEncode(this.endTime)
      };
      // let paramList = {
      //   startTime: '2018-04-13T00:00:00',
      //   endTime: '2019-04-13T00:00:00'
      // };
      var _this = this;
      this.axios.get("/api/AgencyEarning/GetAgencyEarningByPage", paramList).then(res => {
        // console.log(res.data);
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          var ExchangeDateList = [];
          var ExchangevalueList = [];
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              ExchangeDateList.push(data[i].DateOfEarningStr);
              ExchangevalueList.push(data[i].SumEarning);
            }
          } else {
            for (var i = 0; i < 8; i++) {
              var date1 = new Date(new Date().setDate(new Date().getDate() - i));
              var date = _this.$moment(date1).format("YYYY-MM-DD");
              ExchangeDateList.push(date);
              ExchangevalueList.push(0);
            }
            ExchangeDateList.reverse()
          }
          // 基于准备好的dom，初始化echarts实例
          let myChart = _this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            color: ['#ff6d60'],
            title: {
              text: '近七天收益曲线图',
              x: 'center',
              textStyle: {
                color: '#999'
              },
            },
            tooltip: {},
            xAxis: {
              name: '日期（年/月/日）',
              data: ExchangeDateList
            },
            yAxis: {
              name: '金额(元)',
            },
            series: [{
              type: 'bar',
              data: ExchangevalueList
            }]
          });

        } else {
          this.$message({
            showClose: true,
            message: res.data.Message,
            type: 'error'
          });
        }
      });
    },
    //获取用户当前数据
    GetEarning: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("/api/AgencyEarning/GetEarning", paramList).then(res => {
        if (res.statusText == 'OK') {
          _this.GetEarningList = res.data.Object;
        }
      });
    },
    //获取公告信息
    GetTop1Msg: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("/api/Message/GetTop1Msg", paramList).then(res => {
        if (res.statusText == 'OK') {
          console.log(res.data.Object);
          if (res.data.Object) {
            _this.GetTop1MsgList = res.data.Object;
            if (_this.IFGetTop1MsgShow == 'false') {
              _this.GetTop1MsgShow = false;
            } else {
              _this.GetTop1MsgShow = true;
            }
          } else {
            _this.GetTop1MsgShow = false;
          }
        }
      });
    },
    closegonggao: function() {
      setCookies("IFGetTop1MsgShow", 'false');
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
