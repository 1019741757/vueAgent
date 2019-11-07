<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 网吧活动功能介绍 </div>
    </br>
    <el-card shadow="always">
      <div class="FunctionIntroduction_h5"> 580网吧活动 &nbsp;&nbsp;&nbsp; 助力网吧营收 </div>
      <div class="FunctionIntroduction_h8"> 凡网吧用户在580网吧特权客户端获得的网费或奖励全部由580平台买单 </div>
      <div class="FunctionIntroduction_img">
        <img src="../../assets/images/Technologicalprocess.jpg" alt="580网吧活动">
      </div>
      <div class="FunctionIntroduction_tabel">
        <div class="FunctionIntroduction_dl">
          01、易操作，网吧一经开通，无需过多操作，永久使用。
          <a href="http://www.580tequan.com/NetfeeConversion.html" target="_blank">查看网吧操作说明</a>
        </div>
        <div class="FunctionIntroduction_dl">
          02、零投入，无需成本投入，所有奖励或网费由580平台买单。
        </div>
        <div class="FunctionIntroduction_dl">
          03、无门槛，任何用户，皆可参与平台提供的活动。
        </div>
        <div class="FunctionIntroduction_dl">
          04、活动多，不管是体验特权游戏还是其他活动，皆可满足不同用户的需求。<a href="http://b.580tequan.com/file/%E7%BD%91%E5%90%A7%E6%B4%BB%E5%8A%A8%E7%AE%80%E4%BB%8B.docx" target="_blank">查看当前进行的活动</a>
        </div>
        <div class="FunctionIntroduction_dl">
          05、增营收，用户在网吧参与活动获得兑换码，只能在当前网吧兑换。
        </div>
      </div>
      <div class="FunctionIntroduction_button">
        <span @click="FunctiongetUrl"> <i class="el-icon-back"></i> &nbsp; 返 回 </span>
      </div>
    </el-card>
  </div>
</div>
</template>
<script>
import axios from "axios"
import {
  mapGetters
} from "vuex";
export default {
  name: 'FunctionIntroduction',
  data: function() {
    return {

    }
  },
  computed: {
    ...mapGetters(["Id", "AgencyName", "AgencyBalance", "EarningOfPaying"])
  },
  mounted: function() {

  },
  methods: {
    //立 即 申 请
    FunctiongetUrl: function() {
      this.$router.push('/FunctionalApplication');
    },
  }
}
</script>
<style>
.background .padding-t20 {
  padding-top: 8px;
}

.wwwring {
  display: inline-block;
  color: red;
  margin-left: 114px;
}
</style>
