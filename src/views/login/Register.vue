<template>
<div class="login-box">
  <div class="login-content">
    <div class="login_admin">
      <div class="login-content-form login-container animated fadeInRight" style="top: 12%;">
        <el-form class="login-form" autoComplete="on" :model="RegisterInformationList" :rules="loginRules" ref="RegisterInformationList" label-position="left" label-width="120px">
          <div class="login-content-title">
            <!-- <i class="el-icon-back" @click="ForgetPassword(0)"></i> -->
            推荐注册
          </div>
          <el-form-item label="手机号码：" prop="Phone">
            <el-input v-model="RegisterInformationList.Phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <div class="input-box-input">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="图形验证码：" prop="ImgCode">
                  <el-input name="ImgCode" type="text" @keyup.enter.native="handleLogin" v-model="RegisterInformationList.ImgCode" autoComplete="off" placeholder="请输入图形验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <img :src="ImgCode" alt="" class="ImgCode" @click="GetVerifyCode()">
              </el-col>
            </el-row>
          </div>
          <div style="position: relative;">
            <el-form-item label="验证码：" prop="PhoneCode">
              <el-input v-model="RegisterInformationList.PhoneCode" auto-complete="off" style="width:50%" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-mobile-phone" v-show="Registershow" @click="RegisterGetPhoneCode()" style="position: absolute;top: 0;right: 0px;">获取验证码</el-button>
            <el-button type="primary" icon="el-icon-mobile-phone" v-show="!Registershow" style="position: absolute;top: 0;right: 0px;">倒计时{{Registercount}}s</el-button>
          </div>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="RegisterInformationList.name" auto-complete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="设置密码：" prop="Password">
            <el-input type="password" v-model="RegisterInformationList.Password" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="Register_confirm">
            <el-input type="password" v-model="RegisterInformationList.Register_confirm" auto-complete="off" placeholder="请确认新密码"></el-input>
          </el-form-item>
          <el-form-item label="所属地区：" prop="handleChange">
            <el-cascader size="large" :options="provinceAndCityData" v-model="selectedOptions" @change="handleChange"></el-cascader>
          </el-form-item>
          <div class="Register_checkboc" style="text-align: center;">
            <el-checkbox v-model="RegisterInformationList.checked">我已经阅读并同意《580网吧特权用户协议》</el-checkbox>
          </div>
          <el-button type="primary" style="width:100%;height: 40px;font-size: 16px;" :loading="loading" @click.native.prevent="RegisterSubmit('RegisterInformationList')"> 注 册 </el-button>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapActions,
  mapState,
  mapGetters
} from 'vuex'
import {
  getCookies,
  setCookies,
} from '@/utils/auth'
import CryptoJS from 'crypto-js'
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'

export default {
  name: 'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.BodifyInformationList.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var RegisterPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.RegisterInformationList.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var handleChangePass = (rule, value, callback) => {
      if (!this.RegisterInformationList.Area) {
        callback(new Error('请选择所属地区'));
      } else {
        callback();
      }
    };
    return {
      ImgCode: '',
      ValidateKey: '',
      checked: true,
      loading: false,
      //注册
      CodeToText,
      TextToCode,
      provinceAndCityData,
      selectedOptions: [],
      Registershow: true,
      Registercount: '',
      Registertimer: '',
      RegisterInformationList: {
        checked: false,
        ParentId: '',
      },
      loginRules: {
        name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }
        ],
        AccountNumber: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur'
          }
        ],
        ImgCode: [{
            required: true,
            message: '请输入图形验证码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        accountNumber: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
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
        Password: [{
            required: true,
            message: '请输入登录密码',
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
        Register_confirm: [{
          required: true,
          validator: RegisterPass,
          trigger: 'blur'
        }],
        handleChange: [{
          type: 'date',
          required: true,
          validator: handleChangePass,
          trigger: 'change'
        }],
      },
    }
  },
  created() {
    this.GetVerifyCode();
    this.RegisterInformationList.ParentId = this.$route.query.ParentId;
  },
  methods: {
    //省市区选择
    handleChange(arr) {
      this.RegisterInformationList.Area = this.CodeToText[arr[0]] + this.CodeToText[arr[1]];
    },
    //切换页面
    ForgetPassword: function(a) {
      this.$router.push({
        path: '/login'
      })
    },
    //获取图形验证码
    GetVerifyCode: function() {
      var _this = this;
      var paramList = {};
      this.axios.get("/api/Account/GetVerifyCode", paramList).then(res => {
        if (res.statusText == 'OK') {
          _this.ImgCode = 'data:image/png;base64,' + res.data.Object.Base64Img;
          _this.ValidateKey = res.data.Object.ValidateKey;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    //注册获取手机验证码
    RegisterGetPhoneCode: function() {
      if (!this.RegisterInformationList.Phone) {
        this.$message.error('请先输入手机号码');
      } else if (!this.RegisterInformationList.ImgCode) {
        this.$message.error('请先输入图形验证码');
      } else {
        let paramList = {
          phone: this.RegisterInformationList.Phone,
          imgCode: this.RegisterInformationList.ImgCode,
          validateKey: this.ValidateKey
        };
        var _this = this;
        this.axios.get("/api/Account/GetPhoneCode", paramList).then(res => {
          if (res.statusText == 'OK') {
            _this.RegistergetCode();
          } else {
            _this.GetVerifyCode();
            _this.RegisterInformationList.ImgCode = '';
            _this.$message.error(res.data.Message);
          }
        });
      }
    },
    //注册倒计时
    RegistergetCode: function() {
      const TIME_COUNT = 60;
      if (!this.Registertimer) {
        this.Registercount = TIME_COUNT;
        this.Registershow = false;
        this.Registertimer = setInterval(() => {
          if (this.Registercount > 0 && this.Registercount <= TIME_COUNT) {
            this.Registercount--;
          } else {
            this.Registershow = true;
            clearInterval(this.Registertimer);
            this.Registertimer = null;
          }
        }, 1000)
      }
    },
    //注册submit
    RegisterSubmit: function(RegisterInformationList) {
      if (!this.RegisterInformationList.checked) {
        this.$message.error('请先同意用户协议');
      } else {
        this.$refs[RegisterInformationList].validate((valid) => {
          if (valid) {
            let paramList = {
              Phone: this.RegisterInformationList.Phone,
              Name: this.RegisterInformationList.name,
              LoginPwd: this.RegisterInformationList.Register_confirm,
              Area: this.RegisterInformationList.Area,
              ValidateKey: this.ValidateKey,
              ImgCode: this.RegisterInformationList.ImgCode,
              PhoneCode: this.RegisterInformationList.PhoneCode,
              ParentId: this.RegisterInformationList.ParentId,
            };
            var SeverUrl = "/api/Account/Register";
            var _this = this;
            this.axios.post(SeverUrl, paramList).then(res => {
              if (res.statusText == 'OK') {
                _this.$message({
                  message: '注册成功,请登录！',
                  type: 'success'
                });
                _this.$router.push({
                  path: '/login'
                })
                // clearInterval(_this.Registertimer);
                // _this.$refs[RegisterInformationList].resetFields();
              } else {
                _this.$message.error(res.data.Message);
              }
            });
          } else {
            return false;
          }
        });
      }
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.input-box-input .el-input__prefix {
    font-size: 22px;
}
.el-input--prefix .el-input__inner {
    padding-left: 34px;
}
.ForgetPassword {
    margin: 0;
    line-height: 35px;
    font-size: 14px;
    color: #424565;
    text-align: left;
    cursor: pointer;
}
</style>
