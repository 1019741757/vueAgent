webpackJsonp([13],{XmUu:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Dd8w"),o=s.n(a),i=s("NYxO"),r=s("Wxq9"),n=s("Av7u"),l=s.n(n),d={name:"ModifyInformation",data:function(){var t=this;return{fullHeight:.5*document.documentElement.clientHeight+"px",CodeToText:r.CodeToText,TextToCode:r.TextToCode,provinceAndCityData:r.provinceAndCityData,selectedOptions:[],ModifyInformationList:{},ContactsShow:!0,WeChat:"",ChangeContactsList:{TrueName:"",CardNum:"",name:null},Modifyshow:!0,Modifycount:"",BodifyInformationList:{},rules:{Contacts:[{required:!0,message:"请输入网吧联系人",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],name:[{required:!0,message:"请输入真实姓名",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],QQ:[{required:!1,message:"请输入QQ号码",trigger:"blur"},{pattern:/^[1-9][0-9]\d{4,20}$/,message:"请输入正确的QQ号码"}],Phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{pattern:/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码"}],PhoneCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 10 个字符",trigger:"blur"}],oldPass:[{required:!0,message:"请输入旧密码",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],Password:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],password_confirm:[{required:!0,validator:function(e,s,a){console.log(s),""===s?a(new Error("请再次输入密码")):s!==t.BodifyInformationList.Password?a(new Error("两次输入密码不一致!")):a()},trigger:"blur"}],TrueName:[{required:!0,message:"请输入真实姓名",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],CardNum:[{required:!0,message:"请输入身份证号码",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 30 个字符",trigger:"blur"}]}}},computed:o()({},Object(i.b)(["Id","AgencyName","AgencyBalance","EarningOfPaying"])),created:function(){var t=this.$route.query.isRemove||0;this.boxIndex=t.toString(),this.getUser(),this.getIamges()},methods:o()({},Object(i.c)(["SET_ACCOUNT"]),{handleChange:function(t){this.ModifyInformationList.AgencyArea=this.CodeToText[t[0]]+this.CodeToText[t[1]]},getUser:function(){var t=this;this.axios.get("/api/Agency/GetAgencyInfo",{}).then(function(e){if("OK"==e.statusText){var s=e.data.Object;t.ModifyInformationList=s}else t.$message.error(e.data.Message)})},EditSubmit:function(t){var e=this;this.$refs[t].validate(function(s){if(!s)return!1;var a={Id:e.Id,CompanyName:e.ModifyInformationList.CompanyName,QQ:e.ModifyInformationList.QQ,AgencyArea:e.ModifyInformationList.AgencyArea},o=e;e.axios.post("/api/Agency/UpdateAgencyInfo",a).then(function(e){"OK"==e.statusText?(o.$message({message:"修改成功",type:"success"}),o.getUser(),o.selectedOptions=[],o.$refs[t].resetFields()):o.$message.error(e.data.Message)})})},PasswordSubmit:function(t){var e=this;this.$refs[t].validate(function(s){if(!s)return!1;var a={oldPass:l.a.MD5(e.BodifyInformationList.oldPass).toString(),newPass:e.BodifyInformationList.password_confirm},o=e;e.axios.get("/api/Agency/ModefyPass",a).then(function(e){"OK"==e.statusText?(o.$message({message:"设置成功",type:"success"}),o.$refs[t].resetFields()):o.$message.error(e.data.Message)})})},getIamges:function(){var t=this,e=this;this.axios.get("/api/Agency/GetAuthentication",{}).then(function(s){s.data.Object?(console.log(s.data.Object),e.ChangeContactsList.TrueName=s.data.Object.TrueName,e.ChangeContactsList.CardNum=s.data.Object.CardNum,e.ChangeContactsList.MobilePhone=s.data.Object.MobilePhone,e.ContactsShow=!0):(e.ContactsShow=!1,t.$refs.ChangeContactsList.resetFields())})},ChangeContactsSubmit:function(t){var e=this;this.$refs[t].validate(function(s){if(!s)return!1;var a={trueName:e.ChangeContactsList.TrueName,cardNum:e.ChangeContactsList.CardNum},o=e;e.axios.get("/api/Agency/Authentication",a).then(function(e){"OK"==e.statusText?(o.$message({message:"认证成功",type:"success"}),o.getIamges(),o.$refs[t].resetFields()):o.$message.error(e.data.Message)})})}})},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ModifyInformation"},[s("div",{staticClass:"ModifyInformation_body animated fadeInDown"},[t._m(0),t._v(" "),s("br"),t._v(" "),s("el-tabs",{attrs:{type:"border-card"},model:{value:t.boxIndex,callback:function(e){t.boxIndex=e},expression:"boxIndex"}},[s("el-tab-pane",{attrs:{name:"0"}},[s("span",{attrs:{slot:"label"},slot:"label"},[s("i",{staticClass:"el-icon-date"}),t._v(" 编辑资料")]),t._v(" "),s("div",{staticClass:"grid-content bg-purple",style:{minHeight:t.fullHeight}},[s("el-form",{ref:"ModifyInformationList",staticClass:"demo-ruleForm",attrs:{model:t.ModifyInformationList,rules:t.rules,"label-width":"150px"}},[s("br"),t._v(" "),s("br"),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:8,xl:6}},[s("el-form-item",{attrs:{label:"姓名：",prop:"NetbarName"}},[s("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:t.ModifyInformationList.AgencyName,callback:function(e){t.$set(t.ModifyInformationList,"AgencyName",e)},expression:"ModifyInformationList.AgencyName"}})],1)],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:8,xl:6}},[s("el-form-item",{attrs:{label:"手机号码：",prop:"NetbarId"}},[s("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:t.ModifyInformationList.AgencyPhone,callback:function(e){t.$set(t.ModifyInformationList,"AgencyPhone",e)},expression:"ModifyInformationList.AgencyPhone"}})],1)],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:8,xl:6}},[s("el-form-item",{attrs:{label:"公司名称：",prop:"AgencyName"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:t.ModifyInformationList.CompanyName,callback:function(e){t.$set(t.ModifyInformationList,"CompanyName",e)},expression:"ModifyInformationList.CompanyName"}})],1)],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:8,xl:6}},[s("el-form-item",{attrs:{label:"QQ：",prop:"QQ"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:t.ModifyInformationList.QQ,callback:function(e){t.$set(t.ModifyInformationList,"QQ",e)},expression:"ModifyInformationList.QQ"}})],1)],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:20,xl:16}},[s("el-form-item",{attrs:{label:"所属地区：",prop:"Tel"}},[s("span",[t._v(t._s(t.ModifyInformationList.AgencyArea))])])],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:20,xl:16}},[s("el-form-item",{attrs:{label:"修改所属地区：",prop:"Tel"}},[s("el-cascader",{attrs:{size:"large",options:t.provinceAndCityData},on:{change:t.handleChange},model:{value:t.selectedOptions,callback:function(e){t.selectedOptions=e},expression:"selectedOptions"}})],1)],1)],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",staticStyle:{"padding-left":"149px"},attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){t.EditSubmit("ModifyInformationList")}}},[t._v("确定修改")])],1)],1)]),t._v(" "),s("el-tab-pane",{attrs:{name:"2"}},[s("span",{attrs:{slot:"label"},slot:"label"},[s("i",{staticClass:"el-icon-edit-outline"}),t._v(" 修改密码 ")]),t._v(" "),s("div",{staticClass:"grid-content bg-purple",style:{minHeight:t.fullHeight}},[s("el-form",{ref:"BodifyInformationList",staticClass:"demo-ruleForm",attrs:{model:t.BodifyInformationList,rules:t.rules,"label-width":"150px"}},[s("br"),t._v(" "),s("br"),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:10,xl:8}},[s("el-form-item",{attrs:{label:"旧密码：",prop:"oldPass"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.BodifyInformationList.oldPass,callback:function(e){t.$set(t.BodifyInformationList,"oldPass",e)},expression:"BodifyInformationList.oldPass"}})],1)],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:10,xl:8}},[s("el-form-item",{attrs:{label:"新密码：",prop:"Password"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.BodifyInformationList.Password,callback:function(e){t.$set(t.BodifyInformationList,"Password",e)},expression:"BodifyInformationList.Password"}})],1)],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:10,xl:8}},[s("el-form-item",{attrs:{label:"确认新密码：",prop:"password_confirm"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.BodifyInformationList.password_confirm,callback:function(e){t.$set(t.BodifyInformationList,"password_confirm",e)},expression:"BodifyInformationList.password_confirm"}})],1)],1)],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",staticStyle:{"padding-left":"149px"},attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){t.PasswordSubmit("BodifyInformationList")}}},[t._v("确定修改")])],1)],1)]),t._v(" "),s("el-tab-pane",{attrs:{name:"1"}},[s("span",{attrs:{slot:"label"},slot:"label"},[s("i",{staticClass:"el-icon-info"}),t._v(" 实名认证/提现 ")]),t._v(" "),s("div",{staticClass:"grid-content bg-purple",style:{minHeight:t.fullHeight}},[s("el-form",{ref:"ChangeContactsList",staticClass:"demo-ruleForm",attrs:{model:t.ChangeContactsList,rules:t.rules,"label-width":"150px"}},[s("br"),t._v(" "),s("br"),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:18,lg:14,xl:6}},[s("el-form-item",{attrs:{label:"真实姓名：",prop:"TrueName"}},[s("el-input",{attrs:{"auto-complete":"off",disabled:t.ContactsShow,placeholder:"请输入真实姓名"},model:{value:t.ChangeContactsList.TrueName,callback:function(e){t.$set(t.ChangeContactsList,"TrueName",e)},expression:"ChangeContactsList.TrueName"}})],1)],1)],1),t._v(" "),s("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[s("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:18,lg:14,xl:6}},[s("el-form-item",{attrs:{label:"身份证号码：",prop:"CardNum"}},[s("el-input",{attrs:{"auto-complete":"off",disabled:t.ContactsShow,placeholder:"请输入身份证号码"},model:{value:t.ChangeContactsList.CardNum,callback:function(e){t.$set(t.ChangeContactsList,"CardNum",e)},expression:"ChangeContactsList.CardNum"}})],1)],1)],1),t._v(" "),s("div",{staticClass:"personinfo_nn"},[s("img",{attrs:{src:"http://a.580tequan.com/img/erweima.jpg"}}),t._v(" "),s("p",{staticStyle:{"line-height":"30px","padding-left":"25px",color:"#010101"}},[t._v("收益提现请微信扫码关注。")]),t._v(" "),s("p",{staticStyle:{"line-height":"50px"}},[t._v("*身份实名认证必须与微信实名一致，否则无法提现成功，请认真填写，一旦提交不可再修改。")])])],1),t._v(" "),t.ContactsShow?t._e():s("div",{staticClass:"dialog-footer",staticStyle:{"padding-left":"149px"},attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){t.ChangeContactsSubmit("ChangeContactsList")}}},[t._v("确定认证")])],1)],1)])],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title_h4"},[e("i",{staticClass:"icon iconfont iconicon_principal"}),this._v(" 个人中心 ")])}]},m=s("VU/8")(d,c,!1,null,null,null);e.default=m.exports}});
//# sourceMappingURL=13.a88002ba2372e09ac940.js.map