<template>
  <div class="dashboard-container">
    <titleBar :tname="tabNames[tabIndex]"/>
    <div class="content">
      <mainPage v-if="tabIndex === 0"/>
      <studyPlan v-if="tabIndex === 1"/>
      <selfInfo v-if="tabIndex === 2"/>
    </div>
    <div class="footer">
      <div class="mainPage" @click="tabClick(0)">
        <div :class="{selMp: tabIndex === 0}" class="imgIcon mp"/>
        <div class="des">首页</div>
      </div>
      <div class="studyPlan" @click="tabClick(1)">
        <div :class="{selSp: tabIndex === 1}" class="imgIcon sp"/>
        <div class="des">{{ tabNames[1] }}</div>
      </div>
      <div class="selfInfo" @click="tabClick(2)">
        <div :class="{selSi: tabIndex === 2}" class="imgIcon si"/>
        <div class="des">{{ tabNames[2] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import titleBar from '@/components/titleBar'
import mainPage from '@/components/mainPage'
import selfInfo from '@/components/selfInfo'
import studyPlan from '@/components/studyPlan'
export default {
  name: 'Dashboard',
  components: {
    titleBar,
    mainPage,
    selfInfo,
    studyPlan
  },
  data() {
    return {
      tabNames: ['沐熙大学', '学习计划', '我的'],
      tabIndex: 0
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'name',
  //     'roles',
  //     'name2'
  //   ])
  // },
  mounted() {
    this.tabIndex = this.$store.getters.tabIndex
  },
  methods: {
    tabClick(index) {
      this.tabIndex = index
      this.$store.dispatch('ToggleTabIndex', index)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {

  &-container {
    // color: white;

    height: 100%;
    // margin: 30px;
    background: white;
    display: flex;
    flex-direction: column;
    .content{
      height: 100%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .footer{
      border-top: 1px solid #EBEBEB;
      height: 1.5rem;
      // display: flex;
      >div{
        float: left;
        width: 3.3rem;
        .imgIcon{
          width: 0.85rem;
          height: 0.85rem;
          margin: 0.1rem auto 0 auto;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .mp{
          background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/mainPageGray.png);
        }
        .sp{
          background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/studyPlanGray.png);
        }
        .si{
          background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/selfInfoGray.png);
        }
        .selMp{
          background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/mainPage.png);
        }
        .selSp{
          background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/studyPlan.png);
        }
        .selSi{
          background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/selfInfo.png);
        }
        .des{
          text-align: center;
          color: #CCCCCC;
          font-size: 0.35rem;
          // line-height: 0.5rem;
          padding:0.1rem 0;
        }
      }
    }
  }
}
.content::-webkit-scrollbar {
  display: none;
}
</style>
