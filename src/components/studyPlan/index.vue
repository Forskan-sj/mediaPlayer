<template>
  <transition name="fade">
    <div id="courseList" class="courseList">
      <div class="studying">正在学习</div>
      <div class="coursesList">
        <div class="listcontens">
          <div v-for="(it, idx) in pageData.now" :key="idx" class="itCourse" @click="goMediaPage(it.id)">
            <div class="pic">
              <img :src="it.pic" alt="">
              <div class="imgIcon"/>
            </div>
            <div class="des">
              <div class="ctitle">{{ it.title }}</div>
              <div class="tcInfo">
                <img src="https://cdncollege.quansuwangluo.com/mx_college_th/audioIcon.png" alt=""> 已听：{{ it.wc }}%
              </div>
              <div class="desInfo" @click.stop>讲师：{{ it.teacher }}
                <img src="https://cdncollege.quansuwangluo.com/mx_college_th/delIcon.png" alt="" @click="delStudyCourse(it.id, 0, idx)">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="studying">历史学习</div>
      <div class="coursesList">
        <div class="listcontens">
          <div v-for="(it, idx) in pageData.history" :key="idx" class="itCourse" @click="goMediaPage(it.id)">
            <div class="pic">
              <img :src="it.pic" alt="">
              <div class="imgIcon"/>
            </div>
            <div class="des">
              <div class="ctitle">{{ it.title }}</div>
              <div class="tcInfo">
                <img src="https://cdncollege.quansuwangluo.com/mx_college_th/audioIcon.png" alt=""> 已听：{{ it.wc }}%
              </div>
              <div class="desInfo" @click.stop>讲师：{{ it.teacher }}
                <img src="https://cdncollege.quansuwangluo.com/mx_college_th/delIcon.png" alt="" @click="delStudyCourse(it.id, 1, idx)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { getPlan, delCourse } from '@/api/mainPage'
export default {
  name: 'CourseList',
  data() {
    return {
      ckIndex: 0,
      pageData: {}
    }
  },
  created() {
    this.getCourseList()
  },
  beforeMount: function() {},
  mounted: function() {
  },
  updated: function() {

  },
  methods: {
    getCourseList() {
      this.listLoading = true
      getPlan().then(response => {
        this.listLoading = false
        this.pageData = response.datas
      })
    },
    delStudyCourse(id, mark, idx) {
      this.listLoading = true
      delCourse(id).then(response => {
        this.listLoading = false
        mark ? this.pageData.history.splice(idx, 1) : this.pageData.now.splice(idx, 1)
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
  // height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .studying{
    margin: 0.5rem 0.5rem 0 0.5rem;
    font-size: 0.5rem;
    font-weight: 600;
    color: #353535;
    text-align: left;
  }
  .coursesList{
    // height: 100%;
    overflow-x: hidden;

    .listcontens{
      width: 300%;
      transition: all .3s cubic-bezier(0.5,0,.1,1);
      // border-top: 1px solid #E4E4E4;

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
        width: 4.5rem;
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
          color: #8A8A8A;
          font-size: 0.35rem;
          img{
            width: 0.4rem;
          }
        }
        .desInfo{
          font-size: 0.35rem;
          line-height: 1rem;
          color: #ADADAB;
          img{
            float: right;
            width: 0.4rem;
            margin-top: 0.3rem;
          }
        }
      }
    }

    }
  }
}
.courseList::-webkit-scrollbar {
  display: none;
}
</style>
