webpackJsonp([12],{"2lyG":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Dd8w"),i=a.n(n),r=a("NYxO"),s=(a("mw3O"),{name:"TerminalStatistics",data:function(){return{pageSize:10,pageNo:1,total:0,number:"",startTime:"",endTime:"",Datevalue:{},GetAgencyRechargeSum:{},tableData:[],contentText:""}},computed:i()({},Object(r.b)(["Id","AgencyName","AgencyBalance","EarningOfPaying"])),created:function(){var e=new Date((new Date).setDate((new Date).getDate())),t=new Date((new Date).setDate(e.getDate()-7));this.Datevalue=[t,e],this.endTime=this.$moment(e).format("YYYY-MM-DD"),this.startTime=this.$moment(t).format("YYYY-MM-DD"),this.getData()},mounted:function(){},methods:{handleCurrentChange:function(e){this.pageNo=e,this.getData()},sizeCurrentChange:function(e){this.pageSize=e,this.getData()},onSubmit:function(){this.pageNo=1,this.getData()},DateChange:function(){if(this.Datevalue){var e=this.Datevalue[0],t=this.Datevalue[1];this.startTime=this.$moment(e).format("YYYY-MM-DD"),this.endTime=this.$moment(t).format("YYYY-MM-DD"),this.getData()}else this.startTime="",this.endTime="",this.getData()},getData:function(){var e={startTime:this.startTime+"T00:00:00",endTime:this.endTime+"T00:00:00",number:this.number,pageSize:this.pageSize,pageIndex:this.pageNo},t=this;this.axios.get("/api/Recharge/GetAgencyRechargeList",e).then(function(e){if("OK"==e.statusText){var a=e.data.Items;t.tableData=a,t.total=e.data.Total}else t.$message.error(e.data.Message)});var a={startTime:this.startTime+"T00:00:00",endTime:this.endTime+"T00:00:00",number:this.number};this.axios.get("/api/Recharge/GetAgencyRechargeSum",a).then(function(e){var a=e.data.Object;t.GetAgencyRechargeSum=a})}}}),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ActivityStatistics"},[a("div",{staticClass:"ActivityStatistics_body animated fadeInDown"},[a("div",{staticClass:"title_h3"},[e._v(" 充值记录查询 ")]),e._v(" "),a("div",{staticClass:"title_pop"},[a("span",[e._v("历史充值总额："),a("a",[e._v(e._s(e.GetAgencyRechargeSum)+"元")])])]),e._v(" "),a("el-card",{attrs:{shadow:"always"}},[a("el-form",{staticClass:"demo-form-inline",staticStyle:{padding:"0 5px"},attrs:{inline:!0}},[a("el-form-item",{staticStyle:{"margin-bottom":"5px"},attrs:{label:"条件筛选："}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",clearable:""},on:{change:e.DateChange},model:{value:e.Datevalue,callback:function(t){e.Datevalue=t},expression:"Datevalue"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入充值编号",clearable:""},on:{clear:e.onSubmit},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}})],1),e._v(" "),a("el-form-item",{staticClass:"pull-right"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),e._v(" "),a("el-table",{ref:"dtuVoTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:"","header-cell-style":{background:"rgb(220, 223, 230)",color:"#333"}}},[a("el-table-column",{attrs:{property:"RechargeNo",label:"充值编号"}}),e._v(" "),a("el-table-column",{attrs:{property:"RechargeBalance",label:"充值金额(元)"}}),e._v(" "),a("el-table-column",{attrs:{property:"RechargeMode",label:"支付类型"}}),e._v(" "),a("el-table-column",{attrs:{property:"Count",label:"充值时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-time",staticStyle:{color:"#89bf04"}}),e._v(" "),a("span",{staticStyle:{"margin-left":"10px",color:"#89bf04"}},[e._v(e._s(t.row.CreateTimer))])]}}])}),e._v(" "),a("el-table-column",{attrs:{property:"RegisterDate",label:"成功时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-time",staticStyle:{color:"#f6ae3f"}}),e._v(" "),a("span",{staticStyle:{"margin-left":"10px",color:"#f6ae3f"}},[e._v(e._s(t.row.RechargeDate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"State",label:"充值状态",align:"center",width:"80","filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"1"==t.row.RechargeStatus?"success":"danger","close-transition":""}},[e._v("\r\n              "+e._s("1"==t.row.RechargeStatus?"成功":"失败")+"\r\n            ")])]}}])})],1),e._v(" "),a("el-row",{staticStyle:{padding:"20px 0"},attrs:{type:"flex",justify:"end"}},[a("el-pagination",{attrs:{"page-sizes":[10,15,20],"page-size":10,"current-page":e.pageNo,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.sizeCurrentChange}})],1)],1)],1)])},staticRenderFns:[]},o=a("VU/8")(s,l,!1,null,null,null);t.default=o.exports}});
//# sourceMappingURL=12.92005cef29ae56f81896.js.map