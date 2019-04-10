<template>
  <transition name="fade">
    <div id="courseList" class="courseList">
      <titleBar :tname="'课程列表'"/>
      <div class="title">
        <div v-for="(item, index) in pageData" :key="index" :class="{selCTitle: ckIndex === index}" class="couseKind" @click="tabCkIndex(index)">{{ item.name }}</div>
      </div>
      <div :style="ulStyle" class="underLine"/>
      <div :style="clistStyle" class="coursesList">
        <div :style="lcStyle" class="listcontens">
          <div v-for="(item, index) in pageData" :key="index" class="itContents">
            <div v-for="(it, idx) in item.course" :key="idx" class="itCourse" @click="goMediaPage(it.id)">
              <div class="pic">
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
      </div>
    </div>
  </transition>
</template>
<script>
import titleBar from '@/components/titleBar'
import { getCourse } from '@/api/mainPage'
export default {
  name: 'Course',
  components: {
    titleBar
  },
  data() {
    return {
      ckIndex: 0,
      pageData: [],
      ulStyle: { transform: 'translateX(1.15rem)' },
      lcStyle: {},
      clistStyle: {}
    }
  },
  created() {
    this.getCourseList()
    this.ckIndex = this.$store.getters.ckIndex
    this.ulStyle = {
      transform: 'translateX(' + ((this.ckIndex + 1) * 3.3 - 2.15) + 'rem)'
    }
    this.lcStyle = { marginLeft: -100 * this.ckIndex + '%' }
  },
  beforeMount: function() {},
  mounted: function() {
  },
  updated: function() {

  },
  methods: {
    getListStyle() {
      const scale = window.innerHeight / window.innerWidth
      const bl = (scale * 10 - 2.5) / 4 > this.pageData[this.ckIndex].course.length
      if (bl) {
        this.clistStyle = { overflowY: 'hidden' }
      } else {
        this.clistStyle = { overflowY: 'scroll' }
      }
    },
    tabCkIndex(index) {
      this.ckIndex = index
      this.ulStyle = {
        transform: 'translateX(' + ((index + 1) * 3.3 - 2.15) + 'rem)'
      }
      this.lcStyle = { marginLeft: -100 * this.ckIndex + '%' }
      const domScroll = document.getElementsByClassName('coursesList')[0]
      domScroll.scrollTop = domScroll.scrollHeight
      domScroll.scrollTop = 0
      this.$store.dispatch('ToggleCkIndex', index)
      this.getListStyle()
    },
    getCourseList() {
      this.listLoading = true
      getCourse().then(response => {
        this.listLoading = false
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
.courseList{
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // transition: all .5s cubic-bezier(0.5,0,.1,1), opacity .5s cubic-bezier(0.5,0,.1,1);
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
    .plachoder{
      font-size: 0.35rem;
      margin-left: 0.3rem;
      color: #ADADAB;
      text-align: left;
    }
  }
  .title{
    display: flex;

    > * {
      width: 3.3rem;
      font-size: 0.4rem;
      color: #8A8A8A;
      text-align: center;
      line-height: 0.8rem;
    }
    .selCTitle{
      color: #353535;
      // line-height: 1rem;
      font-size: 0.45rem;
      font-weight: 1000;
    }
    .couseKind{

    }
  }
  .underLine{
    width: 1rem;
    height: 4px;
    border-radius: 2px;
    background: #FDD156;
    transition: all .3s cubic-bezier(0.5,0,.1,1);
  }
  .coursesList{
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .listcontens{
      width: 300%;
      transition: all .3s cubic-bezier(0.5,0,.1,1);
      border-top: 1px solid #E4E4E4;
      .itContents{
        float: left;
        width: 33.333%;
        margin: 0.2rem 0;
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
              line-height: 0.5rem;
              font-weight: 600;
            }
            .tcInfo{
              height: 100%;
              color: #ADADAB;
              line-height: 0.5rem;
              font-size: 0.38rem;
            }
            .desInfo{
              font-size: 0.30rem;
              line-height: 0.5rem;
              color: #8A8A8A;
            }
          }
        }
      }
    }
  }
}
.coursesList::-webkit-scrollbar {
  display: none;
}
</style>
