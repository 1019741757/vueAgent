webpackJsonp([23],{tDJg:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("NYxO");var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ActivityStatistics"},[a("div",{staticClass:"ActivityStatistics_body animated fadeInDown"},[a("div",{staticClass:"title_h3"},[t._v("单桌标结算终端月账单\r\n      "),a("el-tooltip",{attrs:{effect:"dark",placement:"right-start"}},[a("div",{attrs:{slot:"content"},slot:"content"},[t._v(" 该账单每月10日左右线下结算，如对结算状态有疑问，请联系客户经理；并且按结算终端的0.3元/月/台结算")]),t._v(" "),a("i",{staticClass:"el-icon-question",staticStyle:{"font-size":"16px"}})])],1),t._v(" "),a("div",{staticClass:"title_pop"},[a("span",[t._v("  结算总金额："),a("a",[t._v(t._s(t.MonthlySettlementBillsSum.Money||0)+" （元）    ")])]),t._v(" "),a("span",[t._v("  累计结算终端："),a("a",[t._v(t._s(t.MonthlySettlementBillsSum.ClientCount||0)+" （台）    ")])]),t._v(" "),a("span",[t._v("  已结算终端数："),a("a",[t._v(t._s(t.MonthlySettlementBillsSum.Settled||0)+" （台）    ")])]),t._v(" "),a("span",[t._v("  未结算终端数："),a("a",[t._v(t._s(t.MonthlySettlementBillsSum.Unsettled||0)+" （台）    ")])])]),t._v(" "),a("el-card",{attrs:{shadow:"always"}},[a("el-form",{staticClass:"demo-form-inline",staticStyle:{padding:"0 5px"},attrs:{inline:!0}},[a("el-form-item",{staticStyle:{"margin-bottom":"5px"},attrs:{label:"请选择账单月份："}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",clearable:""},on:{change:t.DateChange},model:{value:t.Datevalue,callback:function(e){t.Datevalue=e},expression:"Datevalue"}})],1),t._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择结算状态",clearable:""},on:{change:t.onSubmit},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},t._l(t.StatusList,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),a("el-form-item",{staticClass:"pull-right"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onSubmit}},[t._v("查询")])],1)],1),t._v(" "),a("el-table",{ref:"dtuVoTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark",border:"","header-cell-style":{background:"rgb(220, 223, 230)",color:"#333"}}},[a("el-table-column",{attrs:{property:"CreateDateStr",label:"月份"}}),t._v(" "),a("el-table-column",{attrs:{property:"ClientCount",label:"结算终端（台）"}}),t._v(" "),a("el-table-column",{attrs:{property:"Money",label:"结算金额（元）"}}),t._v(" "),a("el-table-column",{attrs:{prop:"State",label:"结算状态",align:"center","filter-placement":"bottom-end"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"1"==e.row.State?"danger":"2"==e.row.State?"success":"","close-transition":""}},[t._v("\r\n              "+t._s("1"==e.row.State?"未结算":"2"==e.row.State?"已结算":"")+"\r\n            ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{property:"UpdateTime",label:"结算时间"}}),t._v(" "),a("el-table-column",{attrs:{property:"Remarks",label:"结算备注",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.Remarks?a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[t._v(t._s(e.row.Remarks))]),t._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[t._v("备注")])],1)]):t._e()]}}])})],1),t._v(" "),a("el-row",{staticStyle:{padding:"20px 0"},attrs:{type:"flex",justify:"end"}},[a("el-pagination",{attrs:{"page-sizes":[10,15,20],"page-size":10,"current-page":t.pageNo,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.sizeCurrentChange}})],1)],1)],1)])},staticRenderFns:[]},l=a("VU/8")({name:"TableLabelStatistics",data:function(){return{pageSize:10,pageNo:1,total:0,state:"",startTime:"",endTime:"",Datevalue:{},MonthlySettlementBillsSum:"",tableData:[],StatusList:[{id:"1",name:"未结算"},{id:"2",name:"已结算"}]}},created:function(){this.getData(),this.getDataMoney()},mounted:function(){},methods:{handleCurrentChange:function(t){this.pageNo=t,this.getData(),this.getDataMoney()},sizeCurrentChange:function(t){this.pageSize=t,this.getData(),this.getDataMoney()},onSubmit:function(){this.pageNo=1,this.getData(),this.getDataMoney()},DateChange:function(){if(this.Datevalue){var t=this.Datevalue[0],e=this.Datevalue[1];this.startTime=this.$moment(t).format("YYYY-MM-DD")+"T00:00:00",this.endTime=this.$moment(e).format("YYYY-MM-DD")+"T00:00:00",this.getData(),this.getDataMoney()}else this.startTime="",this.endTime="",this.getData()},getData:function(){var t={state:this.state||null,startTime:this.startTime||null,endTime:this.endTime||null,pageSize:this.pageSize,pageIndex:this.pageNo},e=this;this.axios.get("/api/TerminalStatistics/MonthlySettlementBills",t).then(function(t){if("OK"==t.statusText){var a=t.data.Items;e.tableData=a,e.total=t.data.Total}else e.$message.error(t.data.Message)})},getDataMoney:function(){var t={startTime:this.startTime||null,endTime:this.endTime||null,pageSize:this.pageSize,pageIndex:this.pageNo},e=this;this.axios.get("/api/TerminalStatistics/MonthlySettlementBillsSum",t).then(function(t){if("OK"==t.statusText){var a=t.data.Object;e.MonthlySettlementBillsSum=a}else e.$message.error(t.data.Message)})}}},s,!1,null,null,null);e.default=l.exports}});
//# sourceMappingURL=23.40f8b494e11b5a003e56.js.map