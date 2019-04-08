<template>
  <div class="dashboard-container">
    <div class="goback" @click="goback">返回</div>
    <div class="dashboard-text">test1</div>
    <div class="test" @click="showSelfMsgBox">测试自定义全局弹窗</div>
    <!-- <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    console.log('test1')
  },
  methods: {
    goback() {
      this.$router.goBack()
    },
    showSelfMsgBox() {
      this.$selfMsgBox('2134sadfad', (res) => {
        console.log('reback fun:' + res)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
