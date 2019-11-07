<template>
<div class="ModifyInformation">
  <div class="ModifyInformation_body animated fadeInDown">
    <div class="title_h4"><i class="icon iconfont iconchongzhi1"></i>&nbsp;充值可消费余额 </div>
    </br>
    <el-card shadow="always">
      <div class="grid-content bg-purple" :style="{minHeight:fullHeight}">
        <el-form :model="ModifyInformationList" :rules="rules" ref="ModifyInformationList" label-width="250px" class="demo-ruleForm">
          <br>
          <br>
          <el-row :gutter="10" style="width: 100%;">
            <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="td1">
              <el-form-item label="充值金额：" prop="NetbarName">
                <el-radio-group v-model="ModifyInformationList.money" size="medium" class="el_radio_web">
                  <el-radio label="500" border>500元</el-radio>
                  <el-radio label="1000" border size="medium">1000元</el-radio>
                  <el-radio label="2000" border size="medium">2000元</el-radio>
                  <el-radio label="3000" border size="medium">3000元</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="10" style="width: 100%;">
            <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="10" class="td1">
              <el-form-item label="自定义金额：" prop="NetbarId">
                <el-input v-model="ModifyInformationList.money" auto-complete="off" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="10" style="width: 100%;">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="td1">
              <el-form-item label="支付方式：" prop="AgencyName" size="medium" fill="#fff">
                <el-radio-group v-model="ModifyInformationList.PaymentMethod" class="el_radio_web">
                  <el-radio label="1" border size="medium"> 微信支付</el-radio>
                  <el-radio label="2" border size="medium"> 支付宝支付</el-radio>
                  <el-radio label="3" border size="medium">可提现收益充值(剩余{{EarningOfPaying}}元)</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <p style="padding-left: 250px;font-size: 16px;color: #ff6d60;">*注：可消费余额用于平台产品消费，不可提现</p>
          <br>
          <el-row :gutter="10" style="width: 100%;" v-if="ModifyInformationList.PaymentMethod == 3">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="10" class="td1">
              <el-form-item label="输入您的密码确认身份：" prop="password">
                <el-input v-model="ModifyInformationList.password" auto-complete="off" type="password" size="medium"></el-input>
              </el-form-item>
              <p style="padding-left: 250px;font-size: 16px;color: #ff6d60;margin-top: 28px;">收益提现充值进消费余额后，该所充值余额只可用于消费。</p>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding-left: 250px;">
          <el-button type="success" size="medium" @click.native="EditSubmit('ModifyInformationList')"> <i class="icon iconfont iconchongzhi" style="font-size: 20px;vertical-align: middle;"></i> 立即支付</el-button>
        </div>
      </div>
    </el-card>
  </div>

  <!--微信支付  -->
  <el-dialog title="微信二维码" :visible.sync="WXRechargeCodeName" center width="500px" @close='closeDialog'>
    <div class="Recharge_wx">
      <p>打开手机微信，扫一扫下方二维码，即可完成支付</p>
      <i class="icon iconfont iconicon_wechat" style="color:#84dc43"></i>
      <div class="erweima" refs="qrcode" id='qrcode'></div>
    </div>
    <div slot="footer" class="dialog-footer"></div>
  </el-dialog>
  <!--支付宝支付  -->
  <el-dialog title="支付宝二维码" :visible.sync="ZFBRechargeCodeName" center width="500px" @close='ZFBcloseDialog'>
    <div class="Recharge_wx">
      <p>打开支付宝微信，扫一扫下方二维码，即可完成支付</p>
      <i class="icon iconfont iconicon_alipay_line" style="color:rgb(0, 160, 233)"></i>
      <div class="erweima" refs="ZFBqrcode" id='ZFBqrcode'></div>
    </div>
    <div slot="footer" class="dialog-footer"></div>
  </el-dialog>
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
import QRCode from 'qrcodejs2'
export default {
  name: 'Recharge', //充值
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
      ModifyInformationList: {
        money: '500',
        PaymentMethod: '1'
      },
      WXRechargeCodeName: false,
      ZFBRechargeCodeName: false,
      timeCounter: 0,
      OrderNosetTime: null,
      AlipayOrderNosetTime: null,
      //表单验证
      rules: {
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
        password: [{
            required: true,
            message: '请输入密码',
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
    // var boxIndex = this.$route.query.boxIndex || 0;
    // this.boxIndex = boxIndex.toString();
    // this.getUser();
    // this.getIamges();
  },
  methods: {
    ...mapMutations(['SET_ACCOUNT']),
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
      if (this.ModifyInformationList.PaymentMethod == 1) {
        let paramList = {
          money: this.ModifyInformationList.money
        };
        var _this = this;
        this.axios.post("/api/Recharge/Recharge?money=" + this.ModifyInformationList.money, paramList).then(res => {
          if (res.statusText == 'OK') {
            _this.WXRechargeCodeName = true;
            var ImgUrl = res.data.Object.Url;
            _this.OrderNosetTimeout(res.data.Object.OrderNo)
            _this.$nextTick(function() {
              document.getElementById("qrcode").innerHTML = "";
              let qrcode = new QRCode('qrcode', {
                width: 200,
                height: 200,
                text: ImgUrl, // 二维码地址
                colorDark: "#000",
                colorLight: "#fff",
              });
            })

          } else {
            _this.$message.error(res.data.Message);
          }
        });
      }
      if (this.ModifyInformationList.PaymentMethod == 2) {
        let paramList = {
          money: this.ModifyInformationList.money
        };
        var _this = this;
        this.axios.post("/api/Recharge/AlipayRecharge?money=" + this.ModifyInformationList.money, paramList).then(res => {
          if (res.statusText == 'OK') {
            _this.ZFBRechargeCodeName = true;
            var ImgUrl = res.data.Object.Url;
            _this.AlipayRechargeLoopQuery(res.data.Object.OrderNo)
            _this.$nextTick(function() {
              document.getElementById("ZFBqrcode").innerHTML = "";
              let qrcode = new QRCode('ZFBqrcode', {
                width: 200,
                height: 200,
                text: ImgUrl, // 二维码地址
                colorDark: "#000",
                colorLight: "#fff",
              });
            })

          } else {
            _this.$message.error(res.data.Message);
          }
        });
      }
      if (this.ModifyInformationList.PaymentMethod == 3) {
        this.$refs[ModifyInformationList].validate((valid) => {
          if (valid) {
            var passwordValue = CryptoJS.MD5(this.ModifyInformationList.password).toString()
            let paramList = {
              password: passwordValue,
              money: this.ModifyInformationList.money
            };
            var _this = this;
            this.axios.post("/api/Agency/EarningsToRecharge?password=" + passwordValue + "&money=" + this.ModifyInformationList.money, paramList).then(res => {
              if (res.statusText == 'OK') {
                _this.$store.dispatch('GetInfo').then(() => {}).catch(() => {})
                _this.$message({
                  message: '充值成功',
                  type: 'success'
                });
              } else {
                _this.$message.error(res.data.Message);
              }
            });
            this.$refs[ModifyInformationList].resetFields();
          } else {
            return false;
          }
        });
      }
    },
    OrderNosetTimeout: function(OrderNo) {
      var _this = this;
      this.timeCounter++;
      if (this.timeCounter <= 40) {
        this.OrderNosetTime = window.setTimeout(function() {
          _this.axios.post("/api/Recharge/RechargeLoopQuery?rechargeNo=" + OrderNo, {}).then(res => {
            // console.log(res);
            if (res.data.Object) {
              _this.$store.dispatch('GetInfo').then(() => {}).catch(() => {});
              _this.WXRechargeCodeName = false;
              _this.timeCounter = 0;
              window.clearTimeout(this.OrderNosetTime);
              _this.$message({
                message: '充值成功',
                type: 'success'
              });
            } else {
              _this.OrderNosetTimeout(OrderNo);
            }
          });
        }, 2000);
      } else {
        _this.timeCounter = 0;
        _this.WXRechargeCodeName = false;
        window.clearTimeout(this.OrderNosetTime);
        _this.$message({
          message: '支付超时，请重新支付...',
          type: 'error'
        });
      }
    },
    AlipayRechargeLoopQuery: function(OrderNo) {
      var _this = this;
      this.timeCounter++;
      if (this.timeCounter <= 40) {
        this.AlipayOrderNosetTime = window.setTimeout(function() {
          _this.axios.post("/api/Recharge/AlipayRechargeLoopQuery?rechargeNo=" + OrderNo, {}).then(res => {
            // console.log(res);
            if (res.data.Object) {
              _this.$store.dispatch('GetInfo').then(() => {}).catch(() => {});
              _this.ZFBRechargeCodeName = false;
              _this.timeCounter = 0;
              window.clearTimeout(this.AlipayOrderNosetTime);
              _this.$message({
                message: '充值成功',
                type: 'success'
              });
            } else {
              _this.AlipayRechargeLoopQuery(OrderNo);
            }
          });
        }, 2000);
      } else {
        _this.timeCounter = 0;
        _this.ZFBRechargeCodeName = false;
        window.clearTimeout(this.AlipayOrderNosetTime);
        _this.$message({
          message: '支付超时，请重新支付...',
          type: 'error'
        });
      }
    },
    closeDialog: function() {
      this.timeCounter = 0;
      window.clearTimeout(this.OrderNosetTime);
    },
    ZFBcloseDialog: function() {
      this.timeCounter = 0;
      window.clearTimeout(this.AlipayOrderNosetTime);
    },
  }
}
</script>
