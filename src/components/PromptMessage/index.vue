<template>
<div style="position: absolute;right: 0;top: -5px;">
  <el-tooltip effect="dark">
    <div slot="content">
      {{messages}}
    </div>
    <i class="el-icon-question" style="margin-left:5px;font-size:16px;"></i>
  </el-tooltip>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ['messages'],
  methods: {

  },
}
</script>
