<template>
  <transition name="fade">
    <div id="searchPage" class="searchPage">
      <titleBar :tname="'搜索课程'"/>
      <div class="search">
        <div class="searchIcon" @click="getCourseList"/>
        <input v-model="key" :placeholder="plachoder" :autofocus="atfs" type="text">
        <div class="searchBtn" @click="getCourseList">搜索</div>
      </div>
      <div class="coursesList">
        <div v-for="(it, idx) in pageData" :key="idx" class="itCourse">
          <div class="pic" @click="goMediaPage(it.id)">
            <img :src="it.pic + '?x-oss-process=image/resize,l_300'" alt="">
            <div class="imgIcon"/>
          </div>
          <div class="des">
            <div class="ctitle">{{ it.title }}</div>
            <div class="tcInfo">讲师：{{ it.teacher }}</div>
            <div class="desInfo">{{ it.click }}人学习 | {{ it.likes }}人喜欢</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import titleBar from '@/components/titleBar'
import { search } from '@/api/mainPage'
export default {
  name: 'Search',
  components: {
    titleBar
  },
  data() {
    return {
      plachoder: '请输入关键字，找你想要的课程',
      key: '',
      atfs: false,
      pageData: []
    }
  },
  created() {
    var _self = this
    setTimeout(() => {
      _self.atfs = true
    }, 800)
  },
  beforeMount: function() {},
  mounted: function() {

  },
  updated: function() {

  },
  methods: {
    getCourseList() {
      this.listLoading = true
      search(this.key).then(response => {
        this.listLoading = false
        if (!response.datas.length) {
          showMsg('未搜索到相关课程', null)
          return
        }
        this.pageData = response.datas
      })
    },
    goMediaPage(id) {
      this.$store.dispatch('SetCID', id)
      this.$router.push('mediaPage')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.searchPage{
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .search{
    margin:0.3rem 0.5rem;
    background: #F8F8F8;
    height: 0.8rem;
    border-radius: 0.4rem;
    display: flex;
    > * {
      align-self: center;
    }
    .searchIcon{
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/search.png) no-repeat;
      background-size: 100% 100%;
    }
    input{
      line-height: 0.8rem;
      height: 0.8rem;
      width: 6rem;
      border-style: none;
      border: 0;
      outline: none;
      background: transparent;
      font-size: 0.35rem;
      margin-left: 0.3rem;
      color: black;
      text-align: left;
    }
    .searchBtn{
      font-size: 0.35rem;
      color: #2F2F2F;
      margin-left: 0.2rem;
      height: 0.6rem;
      line-height: 0.7rem;
      // padding: 0 0.1rem;
      width: 1.3rem;
      text-align: center;
      background: #FFCE17;
      border-radius: 0.1rem;
    }
  }
  .coursesList{
    // height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .itCourse{
      height: 3rem;
      margin: 0.5rem;
      display: flex;
      .pic{
        position: relative;
        width: 4rem;
        height: 100%;
        img{
          width: 4rem;
          height: 100%;
          border-radius: 0.1rem;
          object-fit: cover;
        }
        .imgIcon{
          position: absolute;
          height: 0.5rem;
          width: 1.135rem;
          right: 0;
          bottom: 0;
          background: url(https://cdncollege.quansuwangluo.com/mx_college_th/studyIcon.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .des{
        margin-left: 0.3rem;
        display: flex;
        flex-direction: column;
        .ctitle{
          color: #2F2F2F;
          text-align: justify;
          font-size: 0.4rem;
          padding: 0.2rem 0;
          // line-height: 1rem;
          font-weight: 600;
        }
        .tcInfo{
          height: 100%;
          color: #ADADAB;
          font-size: 0.38rem;
        }
        .desInfo{
          font-size: 0.35rem;
          line-height: 1rem;
          color: #8A8A8A;
        }
      }
    }
  }
}
.coursesList::-webkit-scrollbar {
  display: none;
}
</style>
