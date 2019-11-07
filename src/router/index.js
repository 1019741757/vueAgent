import Vue from 'vue'
import Router from 'vue-router'
import PublicHead from '@/components/PublicHead/index'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/Register',
      component: () => import('@/views/login/Register'),
      hidden: true
    },
    {
      path: '/',
      component: PublicHead,
      redirect: '/homepage',
      name: '系统首页公共组件',
      children: [{
        path: 'homepage',
        name: '系统首页',
        component: () => import('@/views/homepage/index'),
        meta: {
          title: '系统首页',
          icon: 'table'
        }
      }, {
        path: 'Recharge',
        name: '充值',
        component: () => import('@/views/PersonalCenter/Recharge'),
        meta: {
          title: '充值',
          icon: 'table'
        }
      }, {
        path: 'PersonalCenter',
        name: '个人信息',
        component: () => import('@/views/PersonalCenter/index'),
        meta: {
          title: '个人信息',
          icon: 'table'
        }
      }, {
        path: 'MessageCenter',
        name: '信息中心',
        component: () => import('@/views/PersonalCenter/MessageCenter'),
        meta: {
          title: '信息中心',
          icon: 'table'
        }
      }, {
        path: 'Internetbarlist',
        name: '网吧列表',
        component: () => import('@/views/InternetbarManagement/Internetbarlist'),
        meta: {
          title: '网吧列表',
          icon: 'table'
        }
      }, {
        path: 'netbarbackground',
        name: '网吧活动后台管理',
        component: () => import('@/views/InternetbarManagement/netbarbackground'),
        meta: {
          title: '网吧活动后台管理',
          icon: 'table'
        }
      }, {
        path: 'StateManagement',
        name: '网吧离线状态管理',
        component: () => import('@/views/InternetbarManagement/StateManagement'),
        meta: {
          title: '网吧离线状态管理',
          icon: 'table'
        }
      }, {
        path: 'FunctionIntroduction',
        name: '网吧活动功能介绍',
        component: () => import('@/views/InternetbarManagement/FunctionIntroduction'),
        meta: {
          title: '网吧活动功能介绍',
          icon: 'table'
        }
      }, {
        path: 'FunctionalApplication',
        name: '网吧活动功能申请',
        component: () => import('@/views/InternetbarManagement/FunctionalApplication'),
        meta: {
          title: '网吧活动功能申请',
          icon: 'table'
        }
      }, {
        path: 'IncomeStatement',
        name: '收益账单',
        component: () => import('@/views/DataReport/IncomeStatement'),
        meta: {
          title: '收益账单',
          icon: 'table'
        }
      }, {
        path: 'RevenueStatistics',
        name: '网吧收益统计',
        component: () => import('@/views/DataReport/RevenueStatistics'),
        meta: {
          title: '网吧收益统计',
          icon: 'table'
        }
      }, {
        path: 'SubordinateManagement',
        name: '下级管理',
        component: () => import('@/views/DataReport/SubordinateManagement'),
        meta: {
          title: '下级管理',
          icon: 'table'
        }
      },{
        path: 'SubordinateInternetCafeStatistics',
        name: '下级网吧统计',
        component: () => import('@/views/DataReport/SubordinateInternetCafeStatistics'),
        meta: {
          title: '下级网吧统计',
          icon: 'table'
        }
      }, {
        path: 'TerminalStatistics',
        name: '终端统计',
        component: () => import('@/views/DataReport/TerminalStatistics'),
        meta: {
          title: '终端统计',
          icon: 'table'
        }
      }, {
        path: 'NetbarActivationTerminal',
        name: '网吧激活终端统计',
        component: () => import('@/views/DataReport/NetbarActivationTerminal'),
        meta: {
          title: '网吧激活终端统计',
          icon: 'table'
        }
      }, {
        path: 'TableLabelStatistics',
        name: '网吧单桌标终端数统计',
        component: () => import('@/views/DataReport/TableLabelStatistics'),
        meta: {
          title: '网吧单桌标终端数统计',
          icon: 'table'
        }
      },  {
        path: 'MonthlySettlementBills',
        name: '单桌标结算终端月账单',
        component: () => import('@/views/DataReport/MonthlySettlementBills'),
        meta: {
          title: '单桌标结算终端月账单',
          icon: 'table'
        }
      },  {
        path: 'SettlementTerminalStatistics',
        name: '单桌标结算终端网吧统计',
        component: () => import('@/views/DataReport/SettlementTerminalStatistics'),
        meta: {
          title: '单桌标结算终端网吧统计',
          icon: 'table'
        }
      }, {
        path: 'RechargeRecord',
        name: '充值记录查询',
        component: () => import('@/views/financialManagement/RechargeRecord'),
        meta: {
          title: '充值记录查询',
          icon: 'table'
        }
      }, {
        path: 'RecordsofConsumption',
        name: '消费记录查询',
        component: () => import('@/views/financialManagement/RecordsofConsumption'),
        meta: {
          title: '消费记录查询',
          icon: 'table'
        }
      }, {
        path: 'WithdrawalsRecord',
        name: '提现记录查询',
        component: () => import('@/views/financialManagement/WithdrawalsRecord'),
        meta: {
          title: '提现记录查询',
          icon: 'table'
        }
      }]
    }
  ]
})
