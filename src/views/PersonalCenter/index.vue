<template>
<div class="ModifyInformation">
  <div class="ModifyInformation_body animated fadeInDown">
    <div class="title_h4"> <i class="icon iconfont iconicon_principal"></i> 个人中心 </div>
    </br>
    <el-tabs v-model="boxIndex" type="border-card">
      <el-tab-pane name="0">
        <span slot="label"><i class="el-icon-date"></i> 编辑资料</span>
        <div class="grid-content bg-purple" :style="{minHeight:fullHeight}">
          <el-form :model="ModifyInformationList" :rules="rules" ref="ModifyInformationList" label-width="150px" class="demo-ruleForm">
            <br>
            <br>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="姓名：" prop="NetbarName">
                  <el-input v-model="ModifyInformationList.AgencyName" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="手机号码：" prop="NetbarId">
                  <el-input v-model="ModifyInformationList.AgencyPhone" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="公司名称：" prop="AgencyName">
                  <el-input v-model="ModifyInformationList.CompanyName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="QQ：" prop="QQ">
                  <el-input v-model="ModifyInformationList.QQ" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="20" :xl="16" class="td1">
                <el-form-item label="所属地区：" prop="Tel">
                  <span>{{ModifyInformationList.AgencyArea}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="20" :xl="16" class="td1">
                <el-form-item label="修改所属地区：" prop="Tel">
                  <el-cascader size="large" :options="provinceAndCityData" v-model="selectedOptions" @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer" style="    padding-left: 149px;">
            <!-- <el-button size="small" @click="addSysOwnerName = false">取 消</el-button> -->
            <el-button type="primary" size="small" @click.native="EditSubmit('ModifyInformationList')">确定修改</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label"><i class="el-icon-edit-outline"></i> 修改密码 </span>
        <div class="grid-content bg-purple" :style="{minHeight:fullHeight}">
          <el-form :model="BodifyInformationList" :rules="rules" ref="BodifyInformationList" label-width="150px" class="demo-ruleForm">
            <br>
            <br>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="td1">
                <el-form-item label="旧密码：" prop="oldPass">
                  <el-input type="password" v-model="BodifyInformationList.oldPass" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="td1">
                <el-form-item label="新密码：" prop="Password">
                  <el-input type="password" v-model="BodifyInformationList.Password" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="td1">
                <el-form-item label="确认新密码：" prop="password_confirm">
                  <el-input type="password" v-model="BodifyInformationList.password_confirm" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer" style="padding-left: 149px;">
            <el-button type="primary" size="small" @click.native="PasswordSubmit('BodifyInformationList')">确定修改</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label"><i class="el-icon-info"></i> 实名认证/提现 </span>
        <div class="grid-content bg-purple" :style="{minHeight:fullHeight}">
          <el-form :model="ChangeContactsList" :rules="rules" ref="ChangeContactsList" label-width="150px" class="demo-ruleForm">
            <br />
            <br />
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="18" :lg="14" :xl="6" class="td1">
                <el-form-item label="真实姓名：" prop="TrueName">
                  <el-input v-model="ChangeContactsList.TrueName" auto-complete="off" :disabled="ContactsShow" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="18" :lg="14" :xl="6" class="td1">
                <el-form-item label="身份证号码：" prop="CardNum">
                  <el-input v-model="ChangeContactsList.CardNum" auto-complete="off" :disabled="ContactsShow" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="personinfo_nn">
              <img src="http://a.580tequan.com/img/erweima.jpg" />
              <p style="line-height: 30px;padding-left:25px;color: #010101;">收益提现请微信扫码关注。</p>
              <p style="line-height: 50px;">*身份实名认证必须与微信实名一致，否则无法提现成功，请认真填写，一旦提交不可再修改。</p>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer" style="padding-left: 149px;" v-if="!ContactsShow">
            <el-button type="primary" size="small" @click.native="ChangeContactsSubmit('ChangeContactsList')">确定认证</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import CryptoJS from 'crypto-js'
export default {
  name: 'ModifyInformation', //修改信息
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.BodifyInformationList.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      fullHeight: document.documentElement.clientHeight * 0.5 + 'px',
      CodeToText,
      TextToCode,
      provinceAndCityData,
      selectedOptions: [],
      ModifyInformationList: {},
      //实名认证
      ContactsShow: true,
      WeChat: '',
      ChangeContactsList: {
        TrueName: '',
        CardNum: '',
        name: null
      },
      //修改密码
      Modifyshow: true,
      Modifycount: '',
      BodifyInformationList: {},
      //表单验证
      rules: {
        Contacts: [{
            required: true,
            message: '请输入网吧联系人',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        name: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        QQ: [{
            required: false,
            message: '请输入QQ号码',
            trigger: 'blur'
          },
          {
            pattern: /^[1-9][0-9]\d{4,20}$/,
            message: '请输入正确的QQ号码'
          }
        ],
        Phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            pattern: /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        PhoneCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }
        ],
        oldPass: [{
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        Password: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password_confirm: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        TrueName: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        CardNum: [{
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur'
          }
        ],
      },
    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
  },
  created() {
    var isRemove = this.$route.query.isRemove || 0;
    this.boxIndex = isRemove.toString();
    this.getUser();
    this.getIamges();
  },
  methods: {
    ...mapMutations(['SET_ACCOUNT']),
    //省市区选择
    handleChange(arr) {
      this.ModifyInformationList.AgencyArea = this.CodeToText[arr[0]] + this.CodeToText[arr[1]];
    },
    //tabel数据获取
    getUser: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("/api/Agency/GetAgencyInfo", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Object;
          _this.ModifyInformationList = data;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    //编辑资料数据提交
    EditSubmit: function(ModifyInformationList) {
      this.$refs[ModifyInformationList].validate((valid) => {
        if (valid) {
          let paramList = {
            Id: this.Id,
            CompanyName: this.ModifyInformationList.CompanyName,
            QQ: this.ModifyInformationList.QQ,
            AgencyArea: this.ModifyInformationList.AgencyArea,
          };
          var _this = this;
          this.axios.post("/api/Agency/UpdateAgencyInfo", paramList).then(res => {
            if (res.statusText == 'OK') {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.getUser();
              _this.selectedOptions = [];
              _this.$refs[ModifyInformationList].resetFields();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改密码数据提交
    PasswordSubmit: function(BodifyInformationList) {
      this.$refs[BodifyInformationList].validate((valid) => {
        if (valid) {
          let paramList = {
            oldPass: CryptoJS.MD5(this.BodifyInformationList.oldPass).toString(),
            newPass: this.BodifyInformationList.password_confirm,
          };
          var _this = this;
          this.axios.get("/api/Agency/ModefyPass", paramList).then(res => {
            if (res.statusText == 'OK') {
              _this.$message({
                message: '设置成功',
                type: 'success'
              });
              _this.$refs[BodifyInformationList].resetFields();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 实名认证   资料数据
    getIamges: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("/api/Agency/GetAuthentication", paramList).then(res => {
        if (res.data.Object) {
          console.log(res.data.Object);
          _this.ChangeContactsList.TrueName = res.data.Object.TrueName;
          _this.ChangeContactsList.CardNum = res.data.Object.CardNum;
          _this.ChangeContactsList.MobilePhone = res.data.Object.MobilePhone;
          _this.ContactsShow = true;
        } else {
          _this.ContactsShow = false;
          this.$refs.ChangeContactsList.resetFields();
        }
      });
    },
    // 实名认证提交
    ChangeContactsSubmit: function(ChangeContactsList) {
      this.$refs[ChangeContactsList].validate((valid) => {
        if (valid) {
          let paramList = {
            trueName: this.ChangeContactsList.TrueName,
            cardNum: this.ChangeContactsList.CardNum
          };
          var _this = this;
          this.axios.get("/api/Agency/Authentication", paramList).then(res => {
            if (res.statusText == 'OK') {
              _this.$message({
                message: '认证成功',
                type: 'success'
              });
              _this.getIamges();
              _this.$refs[ChangeContactsList].resetFields();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
  }
}
</script>
