webpackJsonp([21],{smee:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("NYxO");var n={name:"PaymentRecord",data:function(){return{pageSize:10,pageNo:1,total:0,NetbarName:"",state:"",startTime:"",endTime:"",Datevalue:{},GetNetbarEarningBill:{},tableData:[],renderHeaderList:{1:"即为580网吧特权客户端程序在终端开机时自动显示页面并启动客户端程序",2:"即为580网吧特权客户端程序在终端开机时不显示客户端程序页面，程序依然运行",3:"即为网吧开通活动后台后，所产生的活动分成收益金额"}}},created:function(){this.getData(),this.getDataMoney()},mounted:function(){},methods:{renderHeader:function(e,t){var a=t.column,n=t.$index;return e("div",{style:"display:flex;margin:auto;line-height: 26px;padding: 0;"},[e("span",a.label),e("prompt-message",{props:{messages:this.renderHeaderList[n]}})])},handleCurrentChange:function(e){this.pageNo=e,this.getData(),this.getDataMoney()},sizeCurrentChange:function(e){this.pageSize=e,this.getData(),this.getDataMoney()},onSubmit:function(){this.pageNo=1,this.getData(),this.getDataMoney()},getData:function(){var e={NetbarName:this.NetbarName,pageSize:this.pageSize,pageIndex:this.pageNo},t=this;this.axios.get("/api/Netbar/GetNetbarEarningBillList",e).then(function(e){if("OK"==e.statusText){var a=e.data.Items;t.tableData=a,t.total=e.data.Total}else t.$message.error(e.data.Message)})},getDataMoney:function(){var e={NetbarName:this.NetbarName},t=this;this.axios.get("/api/Netbar/GetNetbarEarningBill",e).then(function(e){if(console.log(e),"OK"==e.statusText){var a=e.data.Object;t.GetNetbarEarningBill=a}else t.$message.error(e.data.Message)})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ActivityStatistics"},[a("div",{staticClass:"ActivityStatistics_body animated fadeInDown"},[a("div",{staticClass:"title_h3"},[e._v(" 网吧收益统计")]),e._v(" "),a("div",{staticClass:"title_pop"},[a("span",[e._v("  总计： "),a("a",[e._v(e._s(e.GetNetbarEarningBill.SumEarning||0)+"元")])]),e._v("\r\n              \r\n      "),a("span",[e._v("580特权客户端(显示)："),a("a",[e._v(e._s(e.GetNetbarEarningBill.OpenWindow||0)+"元")])]),e._v("\r\n              \r\n      "),a("span",[e._v("580特权客户端(不显示)："),a("a",[e._v(e._s(e.GetNetbarEarningBill.NotOpenWindow||0)+"元")])])]),e._v(" "),a("el-card",{attrs:{shadow:"always"}},[a("el-form",{staticClass:"demo-form-inline",staticStyle:{padding:"0 5px"},attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"网吧名称："}},[a("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入网吧名称",clearable:""},on:{clear:e.onSubmit},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.NetbarName,callback:function(t){e.NetbarName=t},expression:"NetbarName"}})],1),e._v(" "),a("el-form-item",{staticClass:"pull-right"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),e._v(" "),a("el-table",{ref:"dtuVoTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:"","header-cell-style":{background:"rgb(220, 223, 230)",color:"#333"}}},[a("el-table-column",{attrs:{property:"NetbarName",label:"网吧名称",width:"130"}}),e._v(" "),a("el-table-column",{attrs:{property:"OpenWindow",label:"580特权客户端(显示)(元)","render-header":e.renderHeader}}),e._v(" "),a("el-table-column",{attrs:{property:"NotOpenWindow",label:"580特权客户端(不显示)(元)","render-header":e.renderHeader}}),e._v(" "),a("el-table-column",{attrs:{property:"ActivitySub",label:"活动收益(元)","render-header":e.renderHeader}}),e._v(" "),a("el-table-column",{attrs:{property:"SumEarning",label:"合计"}})],1),e._v(" "),a("el-row",{staticStyle:{padding:"20px 0"},attrs:{type:"flex",justify:"end"}},[a("el-pagination",{attrs:{"page-sizes":[10,15,20],"page-size":10,"current-page":e.pageNo,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.sizeCurrentChange}})],1)],1)],1)])},staticRenderFns:[]},i=a("VU/8")(n,r,!1,null,null,null);t.default=i.exports}});
//# sourceMappingURL=21.04725bbc739b4275b5e7.js.map