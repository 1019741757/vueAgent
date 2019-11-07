import {
  setToken,
  getToken,
  getCookies,
  setCookies,
  removeCookies
} from '@/utils/auth'
import axios from "@/utils/request.js"

const user = {
  state: {
    token: getToken(),
    Id: getCookies('Id'),
    AgencyName: getCookies('AgencyName'),
    AgencyBalance: getCookies('AgencyBalance'),
    EarningOfPaying: getCookies('EarningOfPaying'),
    Special: getCookies('Special'),
    UnreadCount: 0,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, Id) => {
      state.Id = Id
    },
    SET_AGENCYNAME: (state, AgencyName) => {
      state.AgencyName = AgencyName
    },
    SET_AGENCYBALANCE: (state, AgencyBalance) => {
      state.AgencyBalance = AgencyBalance
    },
    SET_EARNINGOFPAYING: (state, EarningOfPaying) => {
      state.EarningOfPaying = EarningOfPaying
    },
    SET_SPECIAL: (state, Special) => {
      state.Special = Special
    },
    SET_UNREADCOUNT: (state, UnreadCount) => {
      state.UnreadCount = UnreadCount
    },
  },

  actions: {
    // 登录
    Login({
      commit
    }, AccessToken) {
      return new Promise((resolve, reject) => {
        setToken(AccessToken)
        commit('SET_TOKEN', AccessToken)
        resolve()
      })
    },
    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        let paramList = {};
        axios.get("/api/Agency/GetAgencyInfo", paramList).then(res => {
          console.log(res.data.Object);
          if (res.statusText == 'OK') {
            commit('SET_ID', res.data.Object.Id);
            commit('SET_AGENCYNAME', res.data.Object.AgencyName);
            commit('SET_AGENCYBALANCE', res.data.Object.AgencyBalance);
            commit('SET_EARNINGOFPAYING', res.data.Object.EarningOfPaying);
            commit('SET_SPECIAL', res.data.Object.Special);
            setCookies("Id", res.data.Object.Id);
            setCookies("AgencyName", res.data.Object.AgencyName);
            setCookies("AgencyBalance", res.data.Object.AgencyBalance);
            setCookies("EarningOfPaying", res.data.Object.EarningOfPaying);
            setCookies("Special", res.data.Object.Special); //用户是否有查看下级网吧统计的权限
          } else {}
          resolve()
        });
      })
    },
    // 获取未读信息
    GetCount({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        let paramList = {};
        axios.get("/api/Message/GetMessageTypeCount", paramList).then(res => {
          if (res.statusText == 'OK') {
            var UnreadCount = JSON.stringify(res.data.UnreadCount) || 0;
            commit('SET_UNREADCOUNT', UnreadCount);
          }
          resolve()
        });
      })
    },
  }
}

export default user
