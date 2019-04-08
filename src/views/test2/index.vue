<template>
  <div class="dashboard-container">
    <div class="goback" @click="goback">返回</div>
    <div class="dashboard-text">test2</div>
    <div class="test234">
      <Calendar
        :sunday-start="true"
        :mark-date="arr"
        @choseDay="clickDay"
        @changeMonth="changeDate"
        @isToday="clickToday"
      />
    </div>
    <!-- <video src="https://cdncollege.quansuwangluo.com/ghost_image/1546414901535.mp3" controls="controls">
    </video> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Calendar from 'vue-calendar-component'
export default {
  name: 'Test2',
  components: {
    Calendar
  },
  data() {
    return {
      arr: ['2019/04/01', '2019/3/13', '2019/3/1', '2019/3/11', '2019/3/12', '2019/3/23']
    }
  },
  beforeRouteEnter: (to, from, next) => {
    // 这里判断是否重复打开的同一个歌曲页面
    next(vm => {
      console.log(vm)
      if (parseInt(to.params.id) !== parseInt(vm.audio.id) || vm.lyric === '') {
        vm.loadLrc(vm.audio.id)
      }
    })
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'name2'
    ])
  },
  mounted() {

  },
  activated() {
    console.log(this.$store.state.app.device)
    if (this.$store.state.app.device) {
      console.log('this.$store.state.app.device')
      this.showTestDate()
    }
    this.$store.dispatch('ToggleDevice', 0)
  },
  methods: {
    showTestDate() {
      console.log(new Date())
    },
    goback() {
      this.$router.goBack()
    },
    clickDay(data) {
      console.log(data) // 选中某天
    },
    changeDate(data) {
      console.log(data) // 左右点击切换月份
    },
    clickToday(data) {
      console.log(data) // 跳到了本月
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
    height: 100%;
    background: gray;
    .test234{
      width: 6rem;
      margin: 0 auto;
      overflow: hidden;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
<style>
.wh_content_all{
  background: red !important;
}
.wh_content_item .wh_isToday{
  background: gray !important;
}
.wh_content_item>.wh_isMark{
  background: greenyellow !important;
}
.wh_content_item .wh_chose_day{
  background: transparent !important;
}
</style>
