<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 网吧列表</div>
    <!-- <prompt-message></prompt-message> -->
    </br>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：">
          <el-input v-model="NetbarName" auto-complete="off" placeholder="请输入网吧名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item style="width:10%">
          <el-input v-model="NetbarId" auto-complete="off" placeholder="请输入网吧ID" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-select v-model="NetbarAccountNumberState" placeholder="请选择网吧状态" clearable @change="onSubmit">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="pull-right">
          <el-button type="primary" @click="onSubmit" size="medium">查询</el-button>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="success" @click="addCreateNetbar" size="medium" icon="el-icon-plus">添加网吧</el-button>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" @click="DownloadClient" size="medium" icon="el-icon-download">下载客户端</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="GetNetbarList" tooltip-effect="dark" border style="width: 100%" :header-cell-style="{background:'rgb(220, 223, 230)',color:'#333'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="45">
        </el-table-column>
        <el-table-column property="NetbarName" label="网吧名称" width="190">
          <template slot-scope="scope">
            <span>{{ scope.row.NetbarName }}</span>
            <el-tooltip content="编辑网吧名称" placement="bottom" effect="light">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="EditCreateNetbar(scope.$index, scope.row)" style="float: right;" alt="修改"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="ProName" label="地址" width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.ProName"> <i class="el-icon-location"></i> {{ scope.row.ProName }}{{ scope.row.CityName }}</span>
          </template>
        </el-table-column>
        <el-table-column property="CreateTime" label="网吧创建时间" width="160"></el-table-column>
        <el-table-column property="NetbarNumber" label="网吧key" width="180" :render-header="renderHeader">
          <template slot-scope="scope">
            <span>{{ scope.row.NetbarNumber.substring(0,15)+'...'}}</span>
            <el-tooltip content="复制网吧Key" placement="bottom" effect="light">
              <el-button type="primary" size="mini" icon="el-icon-document" circle style="float: right;" :data-clipboard-text="scope.row.NetbarNumber" @click="copy" id="copy_text"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="NetbarID" label="网吧ID" width="80" :render-header="renderHeader"></el-table-column>
        <!-- <el-table-column property="NetbarPhone" label="网吧IP" width="100">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <div v-if="scope.row.IPs">
                    <p v-for="items in getarr(scope.row.IPs)">{{items}}</p>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <el-button type="primary" size="mini" icon="el-icon-setting" @click="SetIPsDelete(scope.$index, scope.row)">IP设置</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column> -->
        <el-table-column property="NetbarBusiness" label="业务状态" :render-header="renderHeader">
          <template slot-scope="scope">
            <div class="NetbarBusiness_b">
              <p v-if="scope.row.NetbarBusiness.IsNotOpenWindow">580客户端显示</p>
              <p v-else style="color:#F56C6C">580客户端不显示</p>
              <p v-if="scope.row.NetbarBusiness.IsNotSetAppTableIcon">桌标业务开启</p>
              <p v-if="scope.row.NetbarBusiness.IsNotSetHomePage">主页开启</p>
            </div>
            <el-tooltip content="业务设置" placement="bottom" effect="light">
              <el-button type="success" size="mini" icon="el-icon-setting" @click="BusinessSettings(scope.$index, scope.row)" style="float: right;"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="ProductPowerInfos" label="特权状态" :render-header="renderHeader">
          <template slot-scope="scope">
            <div class="NetbarBusiness_b" v-html="getBarVip(scope.row.ProductPowerInfos)"></div>
            <el-tooltip content="特权设置" placement="bottom" effect="light">
              <el-button type="danger" size="mini" icon="el-icon-setting" @click="PrivilegeSettings(scope.$index, scope.row)" style="float: right;"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column label="增值业务" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-setting" @click="IncrementSwitch(scope.$index, scope.row)" style="float: right;"></el-button> -->
            <!-- <el-switch v-model="scope.row.NetbarBusiness.IsNotSetHomePage" active-color="#00A854" :active-value="true" inactive-color="#cccccc" :inactive-value="false" @change="changeSwitch(scope.$index, scope.row)"></el-switch> -->
          <!-- </template>
        </el-table-column> -->
        <el-table-column property="StateName" label="操作(激活状态/删除)" width="150" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="ResetInformation(scope.$index, scope.row)" v-if="scope.row.MachineCode != ''&& scope.row.MachineCode != null">重置</el-button>
            <el-button type="info" size="mini" disabled v-else>重置</el-button>
            <el-button type="danger" size="mini" @click.stop="deletInformation(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </el-row>
    </el-card>
  </div>
  <!--添加网吧-->
  <el-dialog title="添加网吧" :visible.sync="addCreateNetbarCodeName" width="500px" @close='addcloseDialog'>
    <el-form :model="addCreateNetbarList" :rules="rules" ref="addCreateNetbarList" label-width="100px" class="demo-ruleForm">
      <el-form-item label="网吧名称：" prop="Name">
        <el-input type="text" v-model="addCreateNetbarList.Name" auto-complete="off" placeholder="请输入网吧名称"></el-input>
      </el-form-item>
      <el-form-item label="所属地区：" prop="addselectedOptions">
        <el-cascader size="large" :options="provinceAndCityData" v-model="addselectedOptions" @change="handleChange" style="width:100%"></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="addCreateNetbarCodeName = false">取 消</el-button>
      <el-button type="primary" size="small" @click.native="addCreateNetbarSubmit('addCreateNetbarList')">确 定</el-button>
    </div>
  </el-dialog>
  <!--修改网吧-->
  <el-dialog title="修改网吧信息" :visible.sync="EditCreateNetbarCodeName" width="500px" @close='EditcloseDialog'>
    <el-form :model="EditCreateNetbarList" :rules="rules" ref="EditCreateNetbarList" label-width="100px" class="demo-ruleForm">
      <el-form-item label="网吧名称：" prop="Name">
        <el-input type="text" v-model="EditCreateNetbarList.Name" auto-complete="off" placeholder="请输入网吧名称"></el-input>
      </el-form-item>
      <el-form-item label="所属地区：" prop="EditselectedOptions">
        <el-cascader size="large" :options="provinceAndCityData" v-model="EditselectedOptions" @change="EdithandleChange" style="width:100%"></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="EditCreateNetbarCodeName = false">取 消</el-button>
      <el-button type="primary" size="small" @click.native="EditCreateNetbarSubmit('EditCreateNetbarList')">确 定</el-button>
    </div>
  </el-dialog>
  <!--业务设置-->
  <el-dialog title="业务设置" :visible.sync="BusinessSettingsCodeName" width="900px">
    <div class="NetbarBusiness">
      <div class="NetbarBusiness_titel">
        <span>580网吧特权客户端</span>
      </div>
      <div class="NetbarBusiness_content clearfix">
        <div class="NetbarBusiness_img">
          <img src="../../assets/images/hai.jpg">
        </div>
        <div class="NetbarBusiness_smiu">
          <div class="smiu_a">580网吧特权客户端是一款集网吧活动、网吧福利、网吧营销于一身的平台性软件，开启和关闭弹窗都有收益，助您盈利百万。</div>
          <div class="smiu_b">
            <p>客户端显示：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{BoxOpen}}元/千台有效终端/月 <i class="el-icon-star-on" v-if="IsNotOpenWindow"></i></p>
            <p>客户端不显示：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{NotOpen}}元/千台有效终端/月 <i class="el-icon-star-on" v-if="!IsNotOpenWindow"></i> </p>
          </div>
          <div class="NetbarBusiness_butr">
            <p>是否开启客户端：&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <el-radio-group v-model="IsNotOpenWindow" size="small" fill="#ec5e26">
              <el-radio-button :label=true size="small">开机显示</el-radio-button>
              <el-radio-button :label=false size="small">开机不显示</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="BusinessSettingsCodeName = false">取 消</el-button>
      <el-button type="primary" size="small" @click.native="BusinessSettingsSubmit()">确 定</el-button>
    </div>
  </el-dialog>
  <!--增值业务-->
  <el-dialog title="增值业务设置" :visible.sync="IncrementCodeName" width="500px">
    <div class="NetbarBusiness">
      <div class="NetbarBusiness_titel">
        <span>580网吧特权客户端</span>
      </div>
      <div class="NetbarBusiness_content clearfix">
        <div class="NetbarBusiness_smiu">
          <div class="smiu_b">
            <p>客户端显示：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{BoxOpen}}元/千台有效终端/月 <i class="el-icon-star-on" v-if="IsNotOpenWindow"></i></p>
            <p>客户端不显示：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{NotOpen}}元/千台有效终端/月 <i class="el-icon-star-on" v-if="!IsNotOpenWindow"></i> </p>
          </div>
          <div class="NetbarBusiness_butr">
            <p>是否开启客户端：&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <el-radio-group v-model="IsNotOpenWindow" size="small" fill="#ec5e26">
              <el-radio-button :label=true size="small">开机显示</el-radio-button>
              <el-radio-button :label=false size="small">开机不显示</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="IncrementCodeName = false">取 消</el-button>
      <el-button type="primary" size="small" @click.native="IncrementSubmit()">确 定</el-button>
    </div>
  </el-dialog>
  <!--特权设置-->
  <el-dialog title="特权设置" :visible.sync="PrivilegeSettingsCodeName" width="900px" @close='PrivilegecloseDialog'>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane :key="item.Id.toString()" v-for="(item, index) in PrivilegeSettingslist" :label="item.Name.toString()" :name="index.toString()">
        <div class="NetbarBusiness">
          <div class="NetbarBusiness_titel">
            <span>{{item.Name}}</span>
          </div>
          <div class="NetbarBusiness_content clearfix">
            <div class="NetbarBusiness_img">
              <img :src="item.IconUrl">
            </div>
            <div class="NetbarBusiness_smiu">
              <div class="smiu_a" style="color:rgb(245, 108, 108);margin-bottom:0">{{item.Remark}}</div>
              <div class="" v-if="item.Price!=0">
                <div class="NetbarBusiness_daoqi clearfix">
                  <p class="fl" style="padding-left: 0;">到期时间：&nbsp;&nbsp;<span style="color: rgb(245, 108, 108)">{{item.DueTime}}</span></p>
                  <p class="fr" style="font-size: 14px;color: #606266;">单价：&nbsp;&nbsp;<span style="color: rgb(245, 108, 108)">{{item.Price}}</span>元/月</p>
                </div>
                <div class="NetbarBusiness_daoqi"></div>
                <div class="NetbarBusiness_daoqi clearfix">
                  <p class="lf">
                    购买月数：<el-input-number v-model="item.PrivilegeCount" controls-position="right" :min="1" :max="1000" placeholder="1"></el-input-number>
                  </p>
                  <p class="lr" style="position: relative;top: 18px;padding: 0;">总价：&nbsp;&nbsp;<span style="color: rgb(245, 108, 108);font-size: 30px;">{{item.PrivilegeCount*item.Price}}</span> 元</p>
                </div>
                <div class="NetbarBusiness_paramy">
                  <el-button type="success" size="small" @click.native="PrivilegeSettingsSubmit(item)">确 定 购 买</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <!--添加网吧-->
  <el-dialog title="申请网吧后台登陆账号" :visible.sync="CreateNetbarUserCodeName" width="500px" @close='CreateNetbarUsercloseDialog'>
    <el-form :model="CreateNetbarUserList" :rules="rules" ref="CreateNetbarUserList" label-width="120px" class="demo-ruleForm">
      <el-form-item label="网吧联系人：" prop="Contacts">
        <el-input type="text" v-model="CreateNetbarUserList.Contacts" auto-complete="off" placeholder="请输入网吧联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号：" prop="BindingPhone">
        <el-input type="text" v-model="CreateNetbarUserList.BindingPhone" auto-complete="off" placeholder="请输入联系人手机号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="CreateNetbarUserCodeName = false">取 消</el-button>
      <el-button type="primary" size="small" @click.native="CreateNetbarUserSubmit('CreateNetbarUserList')">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>
<script>
import axios from "axios"
import Clipboard from 'clipboard';
import {
  mapGetters
} from "vuex";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import PromptMessage from '@/components/PromptMessage/index.vue'
export default {
  name: 'wblist',
  data: function() {
    var validatePass = (rule, value, callback) => {
      if (this.addCreateNetbarList.ProName === '') {
        callback(new Error('请选择所属地区'));
      } else {
        callback();
      }
    };
    var EdivalidatePass = (rule, value, callback) => {
      if (this.EditCreateNetbarList.ProName === '') {
        callback(new Error('请选择所属地区'));
      } else {
        callback();
      }
    };
    return {
      AgencyID: '',
      pageSize: 10,
      pageNo: 1,
      total: 0,
      NetbarId: '',
      NetbarName: '',
      NetbarAccountNumberState: '',
      GetNetbarList: [],
      getNetbarUserList: {},
      statusList: [{ //设备状态
        id: '1',
        name: '未申请'
      }, {
        id: '2',
        name: '申请中'
      }, {
        id: '3',
        name: '已申请'
      }],
      //添加网吧
      addCreateNetbarCodeName: false,
      addCreateNetbarList: {
        AgencyID: '',
        Name: '',
        ProName: '',
        CityName: ''
      },
      CodeToText,
      TextToCode,
      provinceAndCityData,
      addselectedOptions: [],
      //修改网吧
      EditCreateNetbarCodeName: false,
      EditCreateNetbarList: {
        AgencyID: '',
        Name: '',
        ProName: '',
        CityName: ''
      },
      EditselectedOptions: [],
      //业务设置
      BusinessSettingsCodeName: false,
      BusinessNetbarID: '',
      IsNotOpenWindow: '',
      NotOpen: '',
      BoxOpen: '',
      //增值业务
      IncrementCodeName: false,
      // BusinessNetbarID: '',
      // IsNotOpenWindow: '',
      // NotOpen: '',
      // BoxOpen: '',
      //特权设置
      PrivilegeSettingslist: [],
      ProductPowerInfosList: [],
      PrivilegeSettingsCodeName: false,
      PrivilegeNetbarID: '',
      PrivilegeCount: 1,
      activeName: '0',
      //添加网吧后台账号
      CreateNetbarUserCodeName: false,
      CreateNetbarUserList: {
        Contacts: '',
        BindingPhone: ''
      },
      CreateNetbarUserNetbarID: '',
      //下载客户端
      multipleSelectionList: [],
      renderHeaderList: {
        '4': '平台生成的网吧唯一标识码，使用通用安装包安装时需复制网吧Key至安装文件内相应文件夹',
        '5': '平台生成的网吧对应的唯一编号，便于查询和统计',
        '6': '代理商的主要业务收益内容，目前主要业务有580网吧特权客户端，可在该栏点击图标对业务进行设置',
        '7': '平台的主要特权产品内容，目前主要特权产品有580网吧特权-黄金版（免费）和580网吧特权-钻石版（收费），代理商可在该栏点击图标，对相应网吧的特权进行购买或续费',
        '8': '该列未激活的网吧重置按钮置灰，操作前请详细阅读弹窗提示！'
      },
      rules: {
        Name: [{
            required: true,
            message: '请输入网吧名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
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
        BindingPhone: [{
            required: true,
            message: '请输入联系人手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        addselectedOptions: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        EditselectedOptions: [{
          required: true,
          validator: EdivalidatePass,
          trigger: 'blur'
        }],
      }
    }
  },
  components: {
    PromptMessage
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
  },
  mounted: function() {
    this.getData();
    this.PrivilegeSettingsGetProducts(); //特权设置列表
  },
  methods: {
    renderHeader(h, {
      column,
      $index
    }) {
      return h(
        'div', {
          style: 'display:flex;margin:auto;line-height: 26px;padding: 0;'
        },
        [
          h('span', column.label),
          h('prompt-message', {
            props: {
              messages: this.renderHeaderList[$index]
            }
          })
        ]
      );
    },
    handleSelectionChange(val) {
      this.multipleSelectionList = val;
    },
    handleChange(arr) {
      this.addCreateNetbarList.ProName = this.CodeToText[arr[0]];
      this.addCreateNetbarList.CityName = this.CodeToText[arr[1]];
    },
    EdithandleChange(arr) {
      this.EditCreateNetbarList.ProName = this.CodeToText[arr[0]];
      this.EditCreateNetbarList.CityName = this.CodeToText[arr[1]];
    },
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.getData();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.getData();
    },
    onSubmit: function() {
      this.pageNo = 1;
      this.getData();
    },
    getData: function() {
      var _this = this;
      var paramList = {
        StartTime: "",
        EndTime: "",
        AgencyPhone: "",
        AgencyName: "",
        NetbarAccountNumberState: this.NetbarAccountNumberState,
        Type: 0,
        NetbarName: this.NetbarName,
        NetbarId: this.NetbarId,
        PageSize: this.pageSize,
        PageIndex: this.pageNo
      };
      this.axios.post("/api/Netbar/GetNetbarList", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.GetNetbarList = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    //添加网吧
    addCreateNetbar: function() {
      this.addCreateNetbarCodeName = true;
      this.addCreateNetbarList.AgencyID = this.Id
    },
    addcloseDialog: function() {
      this.addselectedOptions = [];
      this.addCreateNetbarList.Name = '';
      this.addCreateNetbarList.ProName = '';
      this.addCreateNetbarList.CityName = '';
      this.$refs.addCreateNetbarList.resetFields();
    },
    //添加网吧 onSubmit
    addCreateNetbarSubmit: function(addCreateNetbarList) {
      var _this = this;
      this.$refs[addCreateNetbarList].validate((valid) => {
        if (valid) {
          this.axios.post("/api/Netbar/CreateNetbar", this.addCreateNetbarList).then(res => {
            if (res.statusText == 'OK') {
              _this.getData();
              _this.addCreateNetbarCodeName = false;
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改网吧信息
    EditCreateNetbar: function(index, row) {
      this.EditCreateNetbarCodeName = true;
      this.EditCreateNetbarList.NetbarID = row.NetbarID;
      this.EditCreateNetbarList.Name = row.NetbarName;
      var ProName = this.TextToCode[row.ProName].code || null;
      var CityName = this.TextToCode[row.ProName][row.CityName].code || null;
      this.EditselectedOptions = [ProName, CityName];
      this.EditCreateNetbarList.ProName = row.ProName;
      this.EditCreateNetbarList.CityName = row.CityName;
    },
    EditcloseDialog: function() {
      this.EditselectedOptions = [];
      this.EditCreateNetbarList.Name = '';
      this.EditCreateNetbarList.ProName = '';
      this.EditCreateNetbarList.CityName = '';
      this.$refs.EditCreateNetbarList.resetFields();
    },
    //修改网吧信息 onSubmit
    EditCreateNetbarSubmit: function(EditCreateNetbarList) {
      var _this = this;
      this.$refs[EditCreateNetbarList].validate((valid) => {
        if (valid) {
          this.axios.post("/api/Netbar/UpdateNetbar", this.EditCreateNetbarList).then(res => {
            if (res.statusText == 'OK') {
              _this.getData();
              _this.EditCreateNetbarCodeName = false;
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //业务设置
    BusinessSettings: function(index, row) {
      this.BusinessSettingsCodeName = true;
      this.BusinessNetbarID = row.NetbarID;
      var IsNotShowAccelerator = row.NetbarBusiness.IsNotShowAccelerator;
      this.IsNotOpenWindow = row.NetbarBusiness.IsNotOpenWindow;
      var _this = this;
      if (IsNotShowAccelerator) {
        this.axios.get("/api/Configure/GetNotOpenWindowCostPara", {}).then(res => {
          _this.NotOpen = res.data.Object;
        });
        this.axios.get("/api/Configure/GetOpenWindowCostPara", {}).then(res => {
          _this.BoxOpen = res.data.Object;
        });
      } else {
        this.axios.get("/api/Configure/GetNotOpenWindowNotShowShortcutCostPara", {}).then(res => {
          _this.NotOpen = res.data.Object;
        });
        this.axios.get("/api/Configure/GetOpenWindowNotShowShortcutCostPara", {}).then(res => {
          _this.BoxOpen = res.data.Object;
        });
      }
    },
    BusinessSettingsSubmit: function() {
      var _this = this;
      var paramList = {
        NetbarID: this.BusinessNetbarID,
        IsNotOpen: this.IsNotOpenWindow ? 1 : 0,
        BusinessType: 1
      };
      this.axios.post("/api/Netbar/SetBusiness", paramList).then(res => {
        if (res.statusText == 'OK') {
          _this.getData();
          _this.BusinessSettingsCodeName = false;
          _this.$message({
            message: '设置成功',
            type: 'success'
          });
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    //特权设置
    PrivilegeSettingsGetProducts: function() {
      var _this = this;
      var paramList = {};
      this.axios.get("/api/Product/GetProducts", paramList).then(res => {
        var PrivilegeSettingslist = res.data.Object
        for (var i = 0; i < PrivilegeSettingslist.length; i++) {
          PrivilegeSettingslist[i].PrivilegeCount = 1;
        }
        _this.PrivilegeSettingslist = PrivilegeSettingslist;
      });
    },
    DueTimePrivilegeSettingsGetProducts: function() {
      var PrivilegeSettingslist = this.PrivilegeSettingslist;
      for (var i = 0; i < PrivilegeSettingslist.length; i++) {
        PrivilegeSettingslist[i].PrivilegeCount = 1;
        PrivilegeSettingslist[i].DueTime = this.PrivilegeSettingsTime(PrivilegeSettingslist[i].Name);
        console.log(PrivilegeSettingslist[i].DueTime);
      }
      this.PrivilegeSettingslist = PrivilegeSettingslist;
    },
    PrivilegeSettings: function(index, row) {
      this.PrivilegeSettingsCodeName = true;
      this.PrivilegeNetbarID = row.NetbarID;
      this.ProductPowerInfosList = row.ProductPowerInfos;
      this.DueTimePrivilegeSettingsGetProducts();
    },
    PrivilegeSettingsTime: function(name) {
      var _arr = "未开通";
      if (this.ProductPowerInfosList.length <= 0 || !this.ProductPowerInfosList) {
        _arr = "未开通"
      } else {
        for (var i = 0; i < this.ProductPowerInfosList.length; i++) {
          if (this.ProductPowerInfosList[i].Name === name) {
            if (this.ProductPowerInfosList[i].IsExpire == "未到期") {
              _arr = this.ProductPowerInfosList[i].ExpireDateTime.split(" ")[0];
            } else {
              _arr = "已过期"
            }
          }

        }
      }
      return _arr;
    },
    PrivilegeSettingsSubmit: function(item) {
      var _this = this;
      var paramList = {
        NetbarID: this.PrivilegeNetbarID,
        ProductInfoDto: [{
          ProductID: item.Id,
          Count: item.PrivilegeCount
        }]
      };
      this.axios.post("/api/Netbar/OpenPrivileges", paramList).then(res => {
        if (res.statusText == 'OK') {
          _this.getData1();
          _this.PrivilegecloseDialog();
          _this.$store.dispatch('GetInfo').then(() => {}).catch(() => {});
          _this.$message({
            message: '购买成功',
            type: 'success'
          });

        } else {
          _this.$message.error(res.data.Message);
          _this.PrivilegecloseDialog();
        }
      });
    },
    getData1: function() {
      var _this = this;
      var paramList = {
        StartTime: "",
        EndTime: "",
        AgencyPhone: "",
        AgencyName: "",
        NetbarAccountNumberState: this.NetbarAccountNumberState,
        Type: 0,
        NetbarName: this.NetbarName,
        NetbarId: this.NetbarId,
        PageSize: this.pageSize,
        PageIndex: this.pageNo
      };
      this.axios.post("/api/Netbar/GetNetbarList", paramList).then(res => {
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.GetNetbarList = data;
          _this.total = res.data.Total;
          for (var i = 0; i < data.length; i++) {
            if (data[i].NetbarID == _this.PrivilegeNetbarID) {
              _this.ProductPowerInfosList = data[i].ProductPowerInfos;
            }
          }
          _this.DueTimePrivilegeSettingsGetProducts();
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    PrivilegecloseDialog: function() {
      for (var i = 0; i < this.PrivilegeSettingslist.length; i++) {
        this.PrivilegeSettingslist[i].PrivilegeCount = 1;
      }
    },
    //添加网吧后台账号
    ImmediateApplication: function(index, row) {
      if (!row.MachineCode) {
        this.$message({
          message: '网吧未激活',
          type: 'error'
        });
      } else {
        this.CreateNetbarUserNetbarID = row.NetbarID;
        this.CreateNetbarUserCodeName = true;
      }
    },
    CreateNetbarUsercloseDialog: function() {
      this.$refs.CreateNetbarUserList.resetFields();
    },
    CreateNetbarUserSubmit: function(CreateNetbarUserList) {
      var _this = this;
      var paramList = {
        NetbarID: this.CreateNetbarUserNetbarID,
        BindingPhone: this.CreateNetbarUserList.BindingPhone,
        Contacts: this.CreateNetbarUserList.Contacts
      };
      this.$refs[CreateNetbarUserList].validate((valid) => {
        if (valid) {
          this.axios.post("/api/Netbar/CreateNetbarUser", paramList).then(res => {
            if (res.statusText == 'OK') {
              _this.getData();
              _this.CreateNetbarUserCodeName = false;
              _this.$refs[CreateNetbarUserList].resetFields();
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              _this.$message.error(res.data.Message);
              _this.PrivilegecloseDialog();
            }
          });
        } else {
          return false;
        }
      });
    },
    //下载客户端
    DownloadClient: function() {
      var multipleSelectionIDList = [];
      var multipleSelectionList = this.multipleSelectionList;
      for (var i = 0; i < multipleSelectionList.length; i++) {
        var NetbarID = multipleSelectionList[i].NetbarID;
        multipleSelectionIDList.push(NetbarID);
      }
      console.log(multipleSelectionIDList);
      if (multipleSelectionList.length == 0) {
        this.$message({
          message: '请选择1~5个需要安装的网吧',
          type: 'error'
        });
      } else {
        if (multipleSelectionList.length > 5) {
          this.$message({
            message: '请选择小于五家网吧',
            type: 'error'
          });
        } else {
          var _this = this;
          var paramList = {
            "ids": multipleSelectionIDList
          };
          const loading = this.$loading({
            lock: true,
            text: '正在打包，请稍等.....',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.axios.post("/api/DownloadClient/DownloadClient", paramList).then(res => {
            if (res.statusText == 'OK') {
              var downurl = res.data.Object + "?time=" + Math.random();
              window.location.href = downurl;
              loading.close();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        }
      }
    },
    //复制key
    copy: function() {
      var _this = this;
      var clipboard = new Clipboard('#copy_text');
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        Message({
          message: '该浏览器不支持自动复制',
          type: 'warning'
        });
        // 释放内存
        clipboard.destroy()
      })
    },
    //IP设置
    getarr: function(str) {
      if (str) {
        return str.split(",");
      } else {
        return [];
      }
    },
    //业务设置
    SetIPsDelete: function(index, row) {
      this.VerifyformationCodeName = true;
      this.VerifyformationList.NetbarID = row.NetbarId;
      this.VerifyformationList.NetbarPhone = row.NetbarPhone;
      this.VerifyformationList.NetbarContacts = row.NetbarContacts;
    },
    //特权设置
    getBarVip: function(item) {
      var str = "";
      var str_h = false;
      if (item.length == 0) {
        str = "steam特权黄金版";
      } else {
        for (var i = 0; i < item.length; i++) {
          if (item[i].Name == "包月加速器" && item[i].IsExpire == "未到期") {
            str += "<span>包月加速器，</span>"
          }
          if (item[i].Name == "steam特权钻石版" && item[i].IsExpire == "未到期") {
            str += "<span>steam特权钻石版</span>　"
          }
          if (item[i].IsExpire == "未到期") {
            str_h = true;
          }
        }
      }
      if (str_h) {
        return str;
      } else {
        return "steam特权黄金版"
      }
    },
    //删除
    deletInformation: function(index, row) {
      console.log(row);
      var NetbarId = row.NetbarID;
      var NetbarName = row.NetbarName;
      this.$confirm('确定删除该网吧（' + NetbarName + '）吗？删除后不可还原，请谨慎操作', '温馨提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定删除',
        type: 'warning'
      }).then(() => {
        var _this = this;
        let paramList = {
          netbarId: NetbarId,
          netbarIsNotHide: 1
        };
        var url = "/api/Netbar/SetNetbarIsNotHide?netbarId=" + NetbarId + "&netbarIsNotHide=1";
        this.axios.post(url, paramList).then(res => {
          if (res.statusText == 'OK') {
            _this.getData();
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
          } else {
            _this.$message.error(res.data.Message);
          }
        });
      }).catch(() => {});
    },
    //重置
    ResetInformation: function(index, row) {
      var NetbarId = row.NetbarID;
      this.$confirm('是否需要重新激活该网吧，重新激活后， 该网吧已安装的系统将会停止运行；如需重新激活并安装网吧，不可下载其他网吧安装包至重新激活的网吧进行安装， 否则会导致安装失败或 网吧数据错误。 ', '温馨提示 ', {
        cancelButtonText: '取消',
        confirmButtonText: '确定重置',
        type: 'warning'
      }).then(() => {
        var _this = this;
        let paramList = {
          netbarId: NetbarId,
        };
        var url = "/api/Netbar/ResetNetbar?netbarId=" + NetbarId;
        this.axios.post(url, paramList).then(res => {
          if (res.statusText == 'OK') {
            _this.getData();
            _this.$message({
              message: '重置成功',
              type: 'success'
            });
          } else {
            _this.$message.error(index, row);
          }
        });
      }).catch(() => {});
    },
    //业务设置
    IncrementSwitch: function(index, row) {
      this.IncrementCodeName = true;
    },
    IncrementSubmit: function() {
      console.log(row.NetbarBusiness.IsNotSetHomePage);
      console.log(row.NetbarID);
      var _this = this;
      var paramList = {
        NetbarIds: [row.NetbarID],
        IsOpen: row.NetbarBusiness.IsNotSetHomePage
      };
      this.axios.post("/api/Netbar/SetLowerHair", paramList).then(res => {
        if (res.statusText == 'OK') {
          _this.getData();
          _this.$message({
            message: '操作成功',
            type: 'success'
          });

        } else {
          _this.$message.error(res.data.Message);
          _this.PrivilegecloseDialog();
        }
      });
    }
  }
}
</script>
<style media="screen">
span {
  padding: 0;
}

.NetbarBusiness_b {
  float: left;
}

.NetbarBusiness_b p {
  padding: 0;
}

/* .wnlis p {
  padding: 0
} */
</style>
