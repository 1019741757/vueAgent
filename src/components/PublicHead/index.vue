<template>
<div id="wrapper">
  <!-- //头部公告导航 -->
  <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">

      <a class="navbar-minimalize minimalize-styl-2" href="#">
        <img src="../../assets/images/logoin/logo.png" alt="">
      </a>
      <span class="navbar_pouts">580网吧特权代理商后台</span>
    </div>

    <div class="userinfo">
      <img src="../../assets/images/user.png" class='avatar' alt="">
      <div class='welcome'>
        <p class='name comename'>欢迎</p>
        <p class='name avatarname'>{{AgencyName}}</p>
      </div>
      <span class='username'>
        <el-dropdown trigger="click" @command='setDialogInfo'>
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right" style="color:#fff"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command='ModifyInformation'>修改信息</el-dropdown-item>
            <el-dropdown-item command='ModifyInformation'>修改密码</el-dropdown-item> -->
            <el-dropdown-item command='LogOut'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>

    </div>
    <div class="userinfo userinfo_UnreadCount">
      <el-badge :value="UnreadCount" class="item">
        <el-button class="share-button" icon="el-icon-message" type="primary" @click="MessageCenterget()"></el-button>
      </el-badge>
    </div>
    <div class="userinfo" @mouseenter="show=true" @mouseleave="show=false">
      <div class='welcome'>
        <p class='name avatarname user_nameout'> <i class="el-icon-service"></i> 联系客户经理</p>
      </div>
      <div class="user_faoiubody username">
        <el-collapse-transition>
          <div v-show="show">
            <a class="user_faoiubody_pone"> 17343637001 </a>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=3003084805&site=qq&menu=yes" target="_blank" class="user_faoiubody_box">客户经理A</a>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=3003001973&site=qq&menu=yes" target="_blank" class="user_faoiubody_box">客户经理B</a>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </nav>
  <!-- 主体导航内容 -->
  <div class="wrappbody clearfix" :style="{height:fullHeight}">
    <div class="wraueBox">
      <div id="GameComponents">
        <div class="navbar-default navbar-static-side" :style="{height:fullHeight}">
          <div class="GameComponents_wa">
            <el-tooltip class="item" effect="dark" content="该余额用于平台的产品消费支付，不可提现" placement="right">
              <el-button class="GameComponents_wa_buttom">可消费余额 <i class="el-icon-question"></i></el-button>
            </el-tooltip>
            <p class="mi">￥{{AgencyBalance}}</p>
            <!-- <p>可消费余额 <i class="el-icon-question"></i> </p> -->
            <div class="">
              <el-tooltip class="item" effect="dark" content="该收益可在微信公众号进行提现，也可收益充值为可消费余额购买平台产品,收益结算后，15个工作日计入可提现收益内，只有计入可提现收益内的余额，才可提现" placement="right">
                <el-button class="GameComponents_wa_buttom">可提现收益 <i class="el-icon-question"></i></el-button>
              </el-tooltip>
            </div>
            <p class="mi">￥{{EarningOfPaying}}</p>
            <el-button type="success" @click="Recharge" style="margin-top:15px;">充值</el-button>
            <el-button type="danger" @click="CashWithdrawal">提现</el-button>
          </div>
          <el-scrollbar :style="{height:overHeight}" class="el-scrollbar_web">
            <div class="navbar_over">
              <el-row class="tac">
                <el-col :span="24" style="text-align: left;">
                  <el-menu :default-active="$route.path" router unique-opened class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#424564" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="/homepage">
                      <i class="el-icon-menu"></i>
                      <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                      <template slot="title">
                        <i class="icon iconfont iconicon_group" style="font-size: 19px;padding-right: 8px;padding-left:2px;"></i>
                        <span>个人中心</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="/PersonalCenter">个人信息</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/MessageCenter">信息中心</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                      <template slot="title">
                        <i class="icon iconfont iconicon_certificate_fil" style="font-size: 19px;padding-right: 10px;"></i>
                        <span>网吧活动管理</span>
                      </template>
                      <!-- <el-menu-item-group>
                        <el-menu-item index="/FunctionIntroduction">网吧活动功能介绍 </el-menu-item>
                      </el-menu-item-group> -->
                      <el-menu-item-group>
                        <el-menu-item index="/FunctionalApplication">网吧活动功能申请 </el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/netbarbackground">网吧活动后台管理</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                      <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>网吧业务管理</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="/Internetbarlist">网吧列表</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/StateManagement">网吧离线状态管理 </el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                      <template slot="title">
                        <i class="el-icon-date"></i>
                        <span>数据报表</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="/IncomeStatement">收益账单</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/SubordinateManagement">下级管理</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group v-if="Special == 2">
                        <el-menu-item index="/SubordinateInternetCafeStatistics">下级网吧统计</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/TerminalStatistics">终端统计</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/RevenueStatistics">网吧收益统计</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/NetbarActivationTerminal">网吧激活终端统计</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/TableLabelStatistics">网吧单桌标终端数统计</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/MonthlySettlementBills">单桌标结算终端月账单</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/SettlementTerminalStatistics">单桌标结算终端网吧统计</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                      <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>财务管理</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="/RechargeRecord">充值记录查询</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/RecordsofConsumption">消费记录查询</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <el-menu-item index="/WithdrawalsRecord">提现记录查询</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                  </el-menu>
                </el-col>
              </el-row>
            </div>
          </el-scrollbar>

        </div>
        <v-tags></v-tags>
        <div id="page-wrapper" class="gray-bg dashbard-1">
          <div class="GameComponents_body">
            <div class="GameComponents_misu">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  getToken,
  setToken,
  removeToken,
  getCookies,
  setCookies,
  removeCookies
} from '@/utils/auth'
import {
  mapGetters
} from "vuex";
import vTags from '../Tags/index.vue'
export default {
  name: 'HelloWorld',
  data() {
    return {
      fullHeight: document.documentElement.clientHeight - 65 + 'px',
      overHeight: document.documentElement.clientHeight - 278 + 'px',
      ContactsName: '',
      show: false,
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vTags
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying", "UnreadCount", "Special"])
  },
  created() {
    this.$on('collapse', msg => {
      this.collapse = msg;
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    this.$on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    })
    this.$store.dispatch('GetCount');
  },
  methods: {
    //充值
    Recharge: function() {
      this.$router.push('/Recharge');
    },
    //提现
    CashWithdrawal: function() {
      this.$router.push({
        path: '/PersonalCenter',
        query: {
          'isRemove': '1'
        }
      })
    },
    //信息中心
    MessageCenterget: function() {
      this.$router.push({
        path: '/MessageCenter',
        query: {
          'isRemove': '0'
        }
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    LogOut() {
      removeToken();
      removeCookies('Id');
      removeCookies('AgencyName');
      removeCookies('AgencyBalance');
      removeCookies('EarningOfPaying');
      this.$router.push('/login');
    },
    showInfoList() {
      this.$router.push('/ModifyInformation');
    },
    setDialogInfo(cmditem) {
      switch (cmditem) {
        case 'ModifyInformation':
          this.showInfoList();
          break;
        case 'ModifyInformation':
          this.showInfoList();
          break;
        case 'LogOut':
          this.LogOut();
          break;
      }
    },
  }
}
</script>
<style media="screen">
.el-scrollbar_web .el-scrollbar__wrap {
  overflow-x: hidden;
}

.userinfo {
  line-height: 60px;
  text-align: right;
  float: right;
  margin-right: 3%;
}

.userinfo .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.userinfo .welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}

.userinfo .welcome .comename {
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  margin: 0;
}

.userinfo .welcome .avatarname {
  color: #f6ae3f;
  font-weight: bolder;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  margin: 0;
  cursor: pointer;
}
</style>
