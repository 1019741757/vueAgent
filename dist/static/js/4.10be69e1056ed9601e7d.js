webpackJsonp([4],{"+lg7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),r=(a("mtWM"),a("TQvf")),o=a.n(r),n=a("NYxO"),l=a("Wxq9"),c={name:"wblist",data:function(){var e=this;return{AgencyID:"",pageSize:10,pageNo:1,total:0,NetbarId:"",NetbarName:"",NetbarAccountNumberState:"",GetNetbarList:[],getNetbarUserList:{},statusList:[{id:"1",name:"未申请"},{id:"2",name:"申请中"},{id:"3",name:"已申请"}],addCreateNetbarCodeName:!1,addCreateNetbarList:{AgencyID:"",Name:"",ProName:"",CityName:""},CodeToText:l.CodeToText,TextToCode:l.TextToCode,provinceAndCityData:l.provinceAndCityData,addselectedOptions:[],EditCreateNetbarCodeName:!1,EditCreateNetbarList:{AgencyID:"",Name:"",ProName:"",CityName:""},EditselectedOptions:[],BusinessSettingsCodeName:!1,BusinessNetbarID:"",IsNotOpenWindow:"",NotOpen:"",BoxOpen:"",PrivilegeSettingslist:[],ProductPowerInfosList:[],PrivilegeSettingsCodeName:!1,PrivilegeNetbarID:"",PrivilegeCount:1,activeName:"0",CreateNetbarUserCodeName:!1,CreateNetbarUserList:{Contacts:"",BindingPhone:""},CreateNetbarUserNetbarID:"",multipleSelectionList:[],renderHeaderList:{4:"平台生成的网吧唯一标识码，使用通用安装包安装时需复制网吧Key至安装文件内相应文件夹",5:"平台生成的网吧对应的唯一编号，便于查询和统计",6:"代理商的主要业务收益内容，目前主要业务有580网吧特权客户端，可在该栏点击图标对业务进行设置",7:"平台的主要特权产品内容，目前主要特权产品有580网吧特权-黄金版（免费）和580网吧特权-钻石版（收费），代理商可在该栏点击图标，对相应网吧的特权进行购买或续费",8:"该列未激活的网吧重置按钮置灰，操作前请详细阅读弹窗提示！"},rules:{Name:[{required:!0,message:"请输入网吧名称",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],Contacts:[{required:!0,message:"请输入网吧联系人",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],BindingPhone:[{required:!0,message:"请输入联系人手机号",trigger:"blur"},{pattern:/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码"}],addselectedOptions:[{required:!0,validator:function(t,a,s){""===e.addCreateNetbarList.ProName?s(new Error("请选择所属地区")):s()},trigger:"blur"}],EditselectedOptions:[{required:!0,validator:function(t,a,s){""===e.EditCreateNetbarList.ProName?s(new Error("请选择所属地区")):s()},trigger:"blur"}]}}},components:{PromptMessage:a("zwGp").a},computed:i()({},Object(n.b)(["Id","AgencyName","AgencyBalance","EarningOfPaying"])),mounted:function(){this.getData(),this.PrivilegeSettingsGetProducts()},methods:{renderHeader:function(e,t){var a=t.column,s=t.$index;return e("div",{style:"display:flex;margin:auto;line-height: 26px;padding: 0;"},[e("span",a.label),e("prompt-message",{props:{messages:this.renderHeaderList[s]}})])},handleSelectionChange:function(e){this.multipleSelectionList=e},handleChange:function(e){this.addCreateNetbarList.ProName=this.CodeToText[e[0]],this.addCreateNetbarList.CityName=this.CodeToText[e[1]]},EdithandleChange:function(e){this.EditCreateNetbarList.ProName=this.CodeToText[e[0]],this.EditCreateNetbarList.CityName=this.CodeToText[e[1]]},handleCurrentChange:function(e){this.pageNo=e,this.getData()},sizeCurrentChange:function(e){this.pageSize=e,this.getData()},onSubmit:function(){this.pageNo=1,this.getData()},getData:function(){var e=this,t={StartTime:"",EndTime:"",AgencyPhone:"",AgencyName:"",NetbarAccountNumberState:this.NetbarAccountNumberState,Type:0,NetbarName:this.NetbarName,NetbarId:this.NetbarId,PageSize:this.pageSize,PageIndex:this.pageNo};this.axios.post("/api/Netbar/GetNetbarList",t).then(function(t){if("OK"==t.statusText){var a=t.data.Items;e.GetNetbarList=a,e.total=t.data.Total}else e.$message.error(t.data.Message)})},addCreateNetbar:function(){this.addCreateNetbarCodeName=!0,this.addCreateNetbarList.AgencyID=this.Id},addcloseDialog:function(){this.addselectedOptions=[],this.addCreateNetbarList.Name="",this.addCreateNetbarList.ProName="",this.addCreateNetbarList.CityName="",this.$refs.addCreateNetbarList.resetFields()},addCreateNetbarSubmit:function(e){var t=this,a=this;this.$refs[e].validate(function(e){if(!e)return!1;t.axios.post("/api/Netbar/CreateNetbar",t.addCreateNetbarList).then(function(e){"OK"==e.statusText?(a.getData(),a.addCreateNetbarCodeName=!1,a.$message({message:"添加成功",type:"success"})):a.$message.error(e.data.Message)})})},EditCreateNetbar:function(e,t){this.EditCreateNetbarCodeName=!0,this.EditCreateNetbarList.NetbarID=t.NetbarID,this.EditCreateNetbarList.Name=t.NetbarName;var a=this.TextToCode[t.ProName].code||null,s=this.TextToCode[t.ProName][t.CityName].code||null;this.EditselectedOptions=[a,s],this.EditCreateNetbarList.ProName=t.ProName,this.EditCreateNetbarList.CityName=t.CityName},EditcloseDialog:function(){this.EditselectedOptions=[],this.EditCreateNetbarList.Name="",this.EditCreateNetbarList.ProName="",this.EditCreateNetbarList.CityName="",this.$refs.EditCreateNetbarList.resetFields()},EditCreateNetbarSubmit:function(e){var t=this,a=this;this.$refs[e].validate(function(e){if(!e)return!1;t.axios.post("/api/Netbar/UpdateNetbar",t.EditCreateNetbarList).then(function(e){"OK"==e.statusText?(a.getData(),a.EditCreateNetbarCodeName=!1,a.$message({message:"修改成功",type:"success"})):a.$message.error(e.data.Message)})})},BusinessSettings:function(e,t){this.BusinessSettingsCodeName=!0,this.BusinessNetbarID=t.NetbarID;var a=t.NetbarBusiness.IsNotShowAccelerator;this.IsNotOpenWindow=t.NetbarBusiness.IsNotOpenWindow;var s=this;a?(this.axios.get("/api/Configure/GetNotOpenWindowCostPara",{}).then(function(e){s.NotOpen=e.data.Object}),this.axios.get("/api/Configure/GetOpenWindowCostPara",{}).then(function(e){s.BoxOpen=e.data.Object})):(this.axios.get("/api/Configure/GetNotOpenWindowNotShowShortcutCostPara",{}).then(function(e){s.NotOpen=e.data.Object}),this.axios.get("/api/Configure/GetOpenWindowNotShowShortcutCostPara",{}).then(function(e){s.BoxOpen=e.data.Object}))},BusinessSettingsSubmit:function(){var e=this,t={NetbarID:this.BusinessNetbarID,IsNotOpen:this.IsNotOpenWindow?1:0,BusinessType:1};this.axios.post("/api/Netbar/SetBusiness",t).then(function(t){"OK"==t.statusText?(e.getData(),e.BusinessSettingsCodeName=!1,e.$message({message:"设置成功",type:"success"})):e.$message.error(t.data.Message)})},PrivilegeSettingsGetProducts:function(){var e=this;this.axios.get("/api/Product/GetProducts",{}).then(function(t){for(var a=t.data.Object,s=0;s<a.length;s++)a[s].PrivilegeCount=1;e.PrivilegeSettingslist=a})},DueTimePrivilegeSettingsGetProducts:function(){for(var e=this.PrivilegeSettingslist,t=0;t<e.length;t++)e[t].PrivilegeCount=1,e[t].DueTime=this.PrivilegeSettingsTime(e[t].Name),console.log(e[t].DueTime);this.PrivilegeSettingslist=e},PrivilegeSettings:function(e,t){this.PrivilegeSettingsCodeName=!0,this.PrivilegeNetbarID=t.NetbarID,this.ProductPowerInfosList=t.ProductPowerInfos,this.DueTimePrivilegeSettingsGetProducts()},PrivilegeSettingsTime:function(e){var t="未开通";if(this.ProductPowerInfosList.length<=0||!this.ProductPowerInfosList)t="未开通";else for(var a=0;a<this.ProductPowerInfosList.length;a++)this.ProductPowerInfosList[a].Name===e&&(t="未到期"==this.ProductPowerInfosList[a].IsExpire?this.ProductPowerInfosList[a].ExpireDateTime.split(" ")[0]:"已过期");return t},PrivilegeSettingsSubmit:function(e){var t=this,a={NetbarID:this.PrivilegeNetbarID,ProductInfoDto:[{ProductID:e.Id,Count:e.PrivilegeCount}]};this.axios.post("/api/Netbar/OpenPrivileges",a).then(function(e){"OK"==e.statusText?(t.getData1(),t.PrivilegecloseDialog(),t.$store.dispatch("GetInfo").then(function(){}).catch(function(){}),t.$message({message:"购买成功",type:"success"})):(t.$message.error(e.data.Message),t.PrivilegecloseDialog())})},getData1:function(){var e=this,t={StartTime:"",EndTime:"",AgencyPhone:"",AgencyName:"",NetbarAccountNumberState:this.NetbarAccountNumberState,Type:0,NetbarName:this.NetbarName,NetbarId:this.NetbarId,PageSize:this.pageSize,PageIndex:this.pageNo};this.axios.post("/api/Netbar/GetNetbarList",t).then(function(t){if("OK"==t.statusText){var a=t.data.Items;e.GetNetbarList=a,e.total=t.data.Total;for(var s=0;s<a.length;s++)a[s].NetbarID==e.PrivilegeNetbarID&&(e.ProductPowerInfosList=a[s].ProductPowerInfos);e.DueTimePrivilegeSettingsGetProducts()}else e.$message.error(t.data.Message)})},PrivilegecloseDialog:function(){for(var e=0;e<this.PrivilegeSettingslist.length;e++)this.PrivilegeSettingslist[e].PrivilegeCount=1},ImmediateApplication:function(e,t){t.MachineCode?(this.CreateNetbarUserNetbarID=t.NetbarID,this.CreateNetbarUserCodeName=!0):this.$message({message:"网吧未激活",type:"error"})},CreateNetbarUsercloseDialog:function(){this.$refs.CreateNetbarUserList.resetFields()},CreateNetbarUserSubmit:function(e){var t=this,a=this,s={NetbarID:this.CreateNetbarUserNetbarID,BindingPhone:this.CreateNetbarUserList.BindingPhone,Contacts:this.CreateNetbarUserList.Contacts};this.$refs[e].validate(function(i){if(!i)return!1;t.axios.post("/api/Netbar/CreateNetbarUser",s).then(function(t){"OK"==t.statusText?(a.getData(),a.CreateNetbarUserCodeName=!1,a.$refs[e].resetFields(),a.$message({message:"添加成功",type:"success"})):(a.$message.error(t.data.Message),a.PrivilegecloseDialog())})})},DownloadClient:function(){for(var e=[],t=this.multipleSelectionList,a=0;a<t.length;a++){var s=t[a].NetbarID;e.push(s)}if(console.log(e),0==t.length)this.$message({message:"请选择1~5个需要安装的网吧",type:"error"});else if(t.length>5)this.$message({message:"请选择小于五家网吧",type:"error"});else{var i=this,r={ids:e},o=this.$loading({lock:!0,text:"正在打包，请稍等.....",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.axios.post("/api/DownloadClient/DownloadClient",r).then(function(e){if("OK"==e.statusText){var t=e.data.Object+"?time="+Math.random();window.location.href=t,o.close()}else i.$message.error(e.data.Message)})}},copy:function(){var e=this,t=new o.a("#copy_text");t.on("success",function(a){e.$message({message:"复制成功",type:"success"}),t.destroy()}),t.on("error",function(e){Message({message:"该浏览器不支持自动复制",type:"warning"}),t.destroy()})},getarr:function(e){return e?e.split(","):[]},SetIPsDelete:function(e,t){this.VerifyformationCodeName=!0,this.VerifyformationList.NetbarID=t.NetbarId,this.VerifyformationList.NetbarPhone=t.NetbarPhone,this.VerifyformationList.NetbarContacts=t.NetbarContacts},getBarVip:function(e){var t="",a=!1;if(0==e.length)t="steam特权黄金版";else for(var s=0;s<e.length;s++)"包月加速器"==e[s].Name&&"未到期"==e[s].IsExpire&&(t+="<span>包月加速器，</span>"),"steam特权钻石版"==e[s].Name&&"未到期"==e[s].IsExpire&&(t+="<span>steam特权钻石版</span>　"),"未到期"==e[s].IsExpire&&(a=!0);return a?t:"steam特权黄金版"},deletInformation:function(e,t){var a=this;console.log(t);var s=t.NetbarID,i=t.NetbarName;this.$confirm("确定删除该网吧（"+i+"）吗？删除后不可还原，请谨慎操作","温馨提示",{cancelButtonText:"取消",confirmButtonText:"确定删除",type:"warning"}).then(function(){var e=a,t={netbarId:s,netbarIsNotHide:1},i="/api/Netbar/SetNetbarIsNotHide?netbarId="+s+"&netbarIsNotHide=1";a.axios.post(i,t).then(function(t){"OK"==t.statusText?(e.getData(),e.$message({message:"删除成功",type:"success"})):e.$message.error(t.data.Message)})}).catch(function(){})},ResetInformation:function(e,t){var a=this,s=t.NetbarID;this.$confirm("是否需要重新激活该网吧，重新激活后， 该网吧已安装的系统将会停止运行；如需重新激活并安装网吧，不可下载其他网吧安装包至重新激活的网吧进行安装， 否则会导致安装失败或 网吧数据错误。 ","温馨提示 ",{cancelButtonText:"取消",confirmButtonText:"确定重置",type:"warning"}).then(function(){var i=a,r={netbarId:s},o="/api/Netbar/ResetNetbar?netbarId="+s;a.axios.post(o,r).then(function(a){"OK"==a.statusText?(i.getData(),i.$message({message:"重置成功",type:"success"})):i.$message.error(e,t)})}).catch(function(){})},changeSwitch:function(e,t){console.log(t.NetbarBusiness.IsNotSetHomePage),console.log(t.NetbarID);var a=this,s={NetbarIds:[t.NetbarID],IsOpen:t.NetbarBusiness.IsNotSetHomePage};this.axios.post("/api/Netbar/SetLowerHair",s).then(function(e){"OK"==e.statusText?(a.getData(),a.$message({message:"操作成功",type:"success"})):(a.$message.error(e.data.Message),a.PrivilegecloseDialog())})}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"ActivityStatistics"},[s("div",{staticClass:"ActivityStatistics_body animated fadeInDown"},[s("div",{staticClass:"title_h3"},[e._v(" 网吧列表")]),e._v(" "),s("br"),e._v(" "),s("el-card",{attrs:{shadow:"always"}},[s("el-form",{staticClass:"demo-form-inline",staticStyle:{padding:"0 5px"},attrs:{inline:!0}},[s("el-form-item",{attrs:{label:"条件筛选："}},[s("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入网吧名称",clearable:""},on:{clear:e.onSubmit},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.NetbarName,callback:function(t){e.NetbarName=t},expression:"NetbarName"}})],1),e._v(" "),s("el-form-item",{staticStyle:{width:"10%"}},[s("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入网吧ID",clearable:""},on:{clear:e.onSubmit},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.NetbarId,callback:function(t){e.NetbarId=t},expression:"NetbarId"}})],1),e._v(" "),s("el-form-item",{staticClass:"pull-right"},[s("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.onSubmit}},[e._v("查询")])],1),e._v(" "),s("el-form-item",{staticClass:"pull-right"},[s("el-button",{attrs:{type:"success",size:"medium",icon:"el-icon-plus"},on:{click:e.addCreateNetbar}},[e._v("添加网吧")])],1),e._v(" "),s("el-form-item",{staticClass:"pull-right"},[s("el-button",{attrs:{type:"primary",size:"medium",icon:"el-icon-download"},on:{click:e.DownloadClient}},[e._v("下载客户端")])],1)],1),e._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.GetNetbarList,"tooltip-effect":"dark",border:"","header-cell-style":{background:"rgb(220, 223, 230)",color:"#333"}},on:{"selection-change":e.handleSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"45"}}),e._v(" "),s("el-table-column",{attrs:{property:"NetbarName",label:"网吧名称",width:"190"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(t.row.NetbarName))]),e._v(" "),s("el-tooltip",{attrs:{content:"编辑网吧名称",placement:"bottom",effect:"light"}},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",size:"mini",icon:"el-icon-edit",circle:"",alt:"修改"},on:{click:function(a){e.EditCreateNetbar(t.$index,t.row)}}})],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{property:"ProName",label:"地址",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.ProName?s("span",[s("i",{staticClass:"el-icon-location"}),e._v(" "+e._s(t.row.ProName)+e._s(t.row.CityName))]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{property:"CreateTime",label:"网吧创建时间",width:"160"}}),e._v(" "),s("el-table-column",{attrs:{property:"NetbarNumber",label:"网吧key",width:"180","render-header":e.renderHeader},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(t.row.NetbarNumber.substring(0,15)+"..."))]),e._v(" "),s("el-tooltip",{attrs:{content:"复制网吧Key",placement:"bottom",effect:"light"}},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",size:"mini",icon:"el-icon-document",circle:"","data-clipboard-text":t.row.NetbarNumber,id:"copy_text"},on:{click:e.copy}})],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{property:"NetbarID",label:"网吧ID",width:"80","render-header":e.renderHeader}}),e._v(" "),s("el-table-column",{attrs:{property:"NetbarBusiness",label:"业务状态","render-header":e.renderHeader},scopedSlots:e._u([{key:"default",fn:function(t){return[s("div",{staticClass:"NetbarBusiness_b"},[t.row.NetbarBusiness.IsNotOpenWindow?s("p",[e._v("580客户端显示")]):s("p",{staticStyle:{color:"#F56C6C"}},[e._v("580客户端不显示")]),e._v(" "),t.row.NetbarBusiness.IsNotSetAppTableIcon?s("p",[e._v("桌标业务开启")]):e._e(),e._v(" "),t.row.NetbarBusiness.IsNotSetHomePage?s("p",[e._v("主页开启")]):e._e()]),e._v(" "),s("el-tooltip",{attrs:{content:"业务设置",placement:"bottom",effect:"light"}},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini",icon:"el-icon-setting"},on:{click:function(a){e.BusinessSettings(t.$index,t.row)}}})],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{property:"ProductPowerInfos",label:"特权状态","render-header":e.renderHeader},scopedSlots:e._u([{key:"default",fn:function(t){return[s("div",{staticClass:"NetbarBusiness_b",domProps:{innerHTML:e._s(e.getBarVip(t.row.ProductPowerInfos))}}),e._v(" "),s("el-tooltip",{attrs:{content:"特权设置",placement:"bottom",effect:"light"}},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"danger",size:"mini",icon:"el-icon-setting"},on:{click:function(a){e.PrivilegeSettings(t.$index,t.row)}}})],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"增值业务(开启/关闭)",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-switch",{attrs:{"active-color":"#00A854","active-value":!0,"inactive-color":"#cccccc","inactive-value":!1},on:{change:function(a){e.changeSwitch(t.$index,t.row)}},model:{value:t.row.NetbarBusiness.IsNotSetHomePage,callback:function(a){e.$set(t.row.NetbarBusiness,"IsNotSetHomePage",a)},expression:"scope.row.NetbarBusiness.IsNotSetHomePage"}})]}}])}),e._v(" "),s("el-table-column",{attrs:{property:"StateName",label:"操作(激活状态/删除)",width:"150","render-header":e.renderHeader},scopedSlots:e._u([{key:"default",fn:function(t){return[""!=t.row.MachineCode&&null!=t.row.MachineCode?s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){a.stopPropagation(),e.ResetInformation(t.$index,t.row)}}},[e._v("重置")]):s("el-button",{attrs:{type:"info",size:"mini",disabled:""}},[e._v("重置")]),e._v(" "),s("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){a.stopPropagation(),e.deletInformation(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),s("el-row",{staticStyle:{padding:"20px 0"},attrs:{type:"flex",justify:"end"}},[s("el-pagination",{attrs:{"page-sizes":[10,15,20],"page-size":10,"current-page":e.pageNo,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.sizeCurrentChange}})],1)],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"添加网吧",visible:e.addCreateNetbarCodeName,width:"500px"},on:{"update:visible":function(t){e.addCreateNetbarCodeName=t},close:e.addcloseDialog}},[s("el-form",{ref:"addCreateNetbarList",staticClass:"demo-ruleForm",attrs:{model:e.addCreateNetbarList,rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"网吧名称：",prop:"Name"}},[s("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"请输入网吧名称"},model:{value:e.addCreateNetbarList.Name,callback:function(t){e.$set(e.addCreateNetbarList,"Name",t)},expression:"addCreateNetbarList.Name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"所属地区：",prop:"addselectedOptions"}},[s("el-cascader",{staticStyle:{width:"100%"},attrs:{size:"large",options:e.provinceAndCityData},on:{change:e.handleChange},model:{value:e.addselectedOptions,callback:function(t){e.addselectedOptions=t},expression:"addselectedOptions"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(t){e.addCreateNetbarCodeName=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){e.addCreateNetbarSubmit("addCreateNetbarList")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"修改网吧信息",visible:e.EditCreateNetbarCodeName,width:"500px"},on:{"update:visible":function(t){e.EditCreateNetbarCodeName=t},close:e.EditcloseDialog}},[s("el-form",{ref:"EditCreateNetbarList",staticClass:"demo-ruleForm",attrs:{model:e.EditCreateNetbarList,rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"网吧名称：",prop:"Name"}},[s("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"请输入网吧名称"},model:{value:e.EditCreateNetbarList.Name,callback:function(t){e.$set(e.EditCreateNetbarList,"Name",t)},expression:"EditCreateNetbarList.Name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"所属地区：",prop:"EditselectedOptions"}},[s("el-cascader",{staticStyle:{width:"100%"},attrs:{size:"large",options:e.provinceAndCityData},on:{change:e.EdithandleChange},model:{value:e.EditselectedOptions,callback:function(t){e.EditselectedOptions=t},expression:"EditselectedOptions"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(t){e.EditCreateNetbarCodeName=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){e.EditCreateNetbarSubmit("EditCreateNetbarList")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"业务设置",visible:e.BusinessSettingsCodeName,width:"900px"},on:{"update:visible":function(t){e.BusinessSettingsCodeName=t}}},[s("div",{staticClass:"NetbarBusiness"},[s("div",{staticClass:"NetbarBusiness_titel"},[s("span",[e._v("580网吧特权客户端")])]),e._v(" "),s("div",{staticClass:"NetbarBusiness_content clearfix"},[s("div",{staticClass:"NetbarBusiness_img"},[s("img",{attrs:{src:a("VTam")}})]),e._v(" "),s("div",{staticClass:"NetbarBusiness_smiu"},[s("div",{staticClass:"smiu_a"},[e._v("580网吧特权客户端是一款集网吧活动、网吧福利、网吧营销于一身的平台性软件，开启和关闭弹窗都有收益，助您盈利百万。")]),e._v(" "),s("div",{staticClass:"smiu_b"},[s("p",[e._v("客户端显示：            "+e._s(e.BoxOpen)+"元/千台有效终端/月 "),e.IsNotOpenWindow?s("i",{staticClass:"el-icon-star-on"}):e._e()]),e._v(" "),s("p",[e._v("客户端不显示：        "+e._s(e.NotOpen)+"元/千台有效终端/月 "),e.IsNotOpenWindow?e._e():s("i",{staticClass:"el-icon-star-on"})])]),e._v(" "),s("div",{staticClass:"NetbarBusiness_butr"},[s("p",[e._v("是否开启客户端：    ")]),e._v(" "),s("el-radio-group",{attrs:{size:"small",fill:"#ec5e26"},model:{value:e.IsNotOpenWindow,callback:function(t){e.IsNotOpenWindow=t},expression:"IsNotOpenWindow"}},[s("el-radio-button",{attrs:{label:!0,size:"small"}},[e._v("开机显示")]),e._v(" "),s("el-radio-button",{attrs:{label:!1,size:"small"}},[e._v("开机不显示")])],1)],1)])])]),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(t){e.BusinessSettingsCodeName=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){e.BusinessSettingsSubmit()}}},[e._v("确 定")])],1)]),e._v(" "),s("el-dialog",{attrs:{title:"特权设置",visible:e.PrivilegeSettingsCodeName,width:"900px"},on:{"update:visible":function(t){e.PrivilegeSettingsCodeName=t},close:e.PrivilegecloseDialog}},[s("el-tabs",{attrs:{type:"border-card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.PrivilegeSettingslist,function(t,a){return s("el-tab-pane",{key:t.Id.toString(),attrs:{label:t.Name.toString(),name:a.toString()}},[s("div",{staticClass:"NetbarBusiness"},[s("div",{staticClass:"NetbarBusiness_titel"},[s("span",[e._v(e._s(t.Name))])]),e._v(" "),s("div",{staticClass:"NetbarBusiness_content clearfix"},[s("div",{staticClass:"NetbarBusiness_img"},[s("img",{attrs:{src:t.IconUrl}})]),e._v(" "),s("div",{staticClass:"NetbarBusiness_smiu"},[s("div",{staticClass:"smiu_a",staticStyle:{color:"rgb(245, 108, 108)","margin-bottom":"0"}},[e._v(e._s(t.Remark))]),e._v(" "),0!=t.Price?s("div",{},[s("div",{staticClass:"NetbarBusiness_daoqi clearfix"},[s("p",{staticClass:"fl",staticStyle:{"padding-left":"0"}},[e._v("到期时间：  "),s("span",{staticStyle:{color:"rgb(245, 108, 108)"}},[e._v(e._s(t.DueTime))])]),e._v(" "),s("p",{staticClass:"fr",staticStyle:{"font-size":"14px",color:"#606266"}},[e._v("单价：  "),s("span",{staticStyle:{color:"rgb(245, 108, 108)"}},[e._v(e._s(t.Price))]),e._v("元/月")])]),e._v(" "),s("div",{staticClass:"NetbarBusiness_daoqi"}),e._v(" "),s("div",{staticClass:"NetbarBusiness_daoqi clearfix"},[s("p",{staticClass:"lf"},[e._v("\n                    购买月数："),s("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3,placeholder:"1"},model:{value:t.PrivilegeCount,callback:function(a){e.$set(t,"PrivilegeCount",a)},expression:"item.PrivilegeCount"}})],1),e._v(" "),s("p",{staticClass:"lr",staticStyle:{position:"relative",top:"18px",padding:"0"}},[e._v("总价：  "),s("span",{staticStyle:{color:"rgb(245, 108, 108)","font-size":"30px"}},[e._v(e._s(t.PrivilegeCount*t.Price))]),e._v(" 元")])]),e._v(" "),s("div",{staticClass:"NetbarBusiness_paramy"},[s("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){e.PrivilegeSettingsSubmit(t)}}},[e._v("确 定 购 买")])],1)]):e._e()])])])])}))],1),e._v(" "),s("el-dialog",{attrs:{title:"申请网吧后台登陆账号",visible:e.CreateNetbarUserCodeName,width:"500px"},on:{"update:visible":function(t){e.CreateNetbarUserCodeName=t},close:e.CreateNetbarUsercloseDialog}},[s("el-form",{ref:"CreateNetbarUserList",staticClass:"demo-ruleForm",attrs:{model:e.CreateNetbarUserList,rules:e.rules,"label-width":"120px"}},[s("el-form-item",{attrs:{label:"网吧联系人：",prop:"Contacts"}},[s("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"请输入网吧联系人"},model:{value:e.CreateNetbarUserList.Contacts,callback:function(t){e.$set(e.CreateNetbarUserList,"Contacts",t)},expression:"CreateNetbarUserList.Contacts"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"联系人手机号：",prop:"BindingPhone"}},[s("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"请输入联系人手机号"},model:{value:e.CreateNetbarUserList.BindingPhone,callback:function(t){e.$set(e.CreateNetbarUserList,"BindingPhone",t)},expression:"CreateNetbarUserList.BindingPhone"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(t){e.CreateNetbarUserCodeName=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){e.CreateNetbarUserSubmit("CreateNetbarUserList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(c,d,!1,function(e){a("ruzX")},null,null);t.default=u.exports},VTam:function(e,t,a){e.exports=a.p+"static/img/hai.5b8ba57.jpg"},ruzX:function(e,t){}});
//# sourceMappingURL=4.10be69e1056ed9601e7d.js.map