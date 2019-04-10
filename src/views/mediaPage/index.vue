<template>
  <transition name="fade">
    <div id="courseList" class="courseList">
      <div id="tips" class="tips">
        <div class="returnback" @click="goback">
          <div class="goback"/>
        </div>
        <div class="titleName" v-text="courseName"/>
        <div :class="{cuLiked: pageData.is_like}" class="cuLike" @click="cuLike"/>
      </div>
      <div :class="{'cd-rotate': bplaying}" class="cd-wrapper">
        <div class="cd-mask"/>
        <img :src="courseInfo.poster" class="cd-img">
      </div>
      <div class="pro-wrap">
        <slider v-model="prCurrentTime" class="song-slider" @change="changeTime"/>
      </div>
      <div class="time">
        <div id="cur">{{ currentTime | time }}</div>
        <div id="total">{{ durationTime | time }}</div>
      </div>
      <div class="optionBtns">
        <div :class="{cuLiked: pageData.is_like}" class="cuLike" @click="cuLike"/>
        <div class="mini-btn player-list" @click="playPrev"/>
        <div :class="{pause: bplaying}" class="mini-btn player" @click="toggleStatus"/>
        <div class="mini-btn next" @click="playNext"/>
        <div :class="{cuLiked: pageData.is_like}" class="cuLike" @click="cuLike"/>
      </div>
      <div class="forpos"/>
      <div class="title">
        <div :class="{selCTitle: !tabIndex}" class="couseKind" @click="tabCkIndex(0)">课程章节({{ currentIndex }}/{{ pageData.chapter.length }})</div>
        <div :class="{selCTitle: tabIndex}" class="couseKind" @click="tabCkIndex(1)">课程精华</div>
      </div>
      <div :style="ulStyle" class="underLine"/>
      <div v-if="!tabIndex" :style="contentHeight" class="chapterList">
        <div v-for="(it, index) in pageData.chapter" :key="it.id" class="chapterItem" @click="tabChapter(index, 1)">
          <div v-if="currentIndex - 1 !== index" class="ctIndex">{{ index + 1 }}</div>
          <div v-if="currentIndex - 1 === index" :class="{'line-late': bplaying}" class="imgIcon">
            <div class="line1"/>
            <div class="line2"/>
            <div class="line3"/>
            <div class="line4"/>
          </div>
          <div class="ctInfo">
            <div :class="{seTitle: currentIndex - 1 === index}" class="ctTitle">{{ it.title }}</div>
            <div class="detailInfo">
              <div class="pIcon"/>
              <span>{{ it.click }}</span>
              <div class="aIcon"/>
              <span>{{ it.time }}</span>
            </div>
          </div>
          <div class="rIcon"/>
        </div>
      </div>
      <div v-if="tabIndex" :style="contentHeight" class="chapterE">
        <div id="pptContentDIVdiv" class="pptContentDIVdiv">
          <div :class="{deAni: !deAni}" class="pptContentDIV bd">
            <div v-for="(con,index) in pageData.chapter[currentIndex - 1].imgs" :key="index" :style="pptSEStyle" class="box">
              <div class="pptContent pptSpecial" >
                <img :src="con" @click="preView(pageData.chapter[currentIndex - 1].imgs, index)">
              </div>
            </div>
          </div>
          <div class="hd">
            <ul :style="icStyle">
              <li v-for="(li, index) in pageData.chapter[currentIndex - 1].imgs.length" :key="index" :class="{onShow:index==listIndex}"/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import titleBar from '@/components/titleBar'
import { mapGetters, mapMutations } from 'vuex'
import slider from '@/components/slider'
import { getCourseShow, courseLike, pushTime } from '@/api/mainPage'
export default {
  name: 'CourseList',
  components: {
    titleBar,
    slider
  },
  filters: {
    // 时间字符格式化
    time(value) {
      var length = Math.floor(parseInt(value))
      var minute = Math.floor(value / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      var second = length % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
  },
  data() {
    return {
      deAni: false,
      listIndex: 0, // ppt当前位置索引
      courseName: '', // pageTitle
      tabIndex: false, // tab切换
      pageData: {
        chapter: []
      },
      slideMark: false,
      pptSEStyle: {},
      ulStyle: { transform: 'translateX(2.5rem)' },
      contentHeight: {},
      icStyle: {},
      // 视频相关参数
      turnAroundStyle: '',
      bTurnAround: false,
      fullScr: '',
      furCount: 0, // 全屏次数计数
      exploreOut: -1, // 是否监听浏览器历史状态
      mediaObj: {}, // 媒体播放对象
      mediaSource: '', // 媒体资源
      mediaTabMark: false, // 媒体切换标志
      loadBottomMark: false, // 首次触发标志，用于设置滑动条位置
      specialMark: false,
      audioItem: 0,
      scrollObj: '' // 设置滑动位置的主对象
    }
  },
  computed: {
    ...mapGetters([
      'currentTime',
      'bufferedTime',
      'durationTime',
      'media',
      'bplaying',
      'courseInfo'
    ]),
    currentIndex: {
      get: function() {
        return this.$store.getters.currentIndex
      },
      set: function(newVal) {
      }
    },
    prCurrentTime: {
      get: function() {
        return this.$store.getters.prCurrentTime
      },
      set: function(newVal) {
      }
    }
  },
  created() {
    this.getCourseList()
  },
  beforeMount: function() {},
  mounted: function() {
    this.contentHeight = {
      height: window.innerHeight / window.innerWidth * 10 - 8.9 + 'rem'
    }
  },
  updated: function() {
    if (this.slideMark) {
      var _self = this
      TouchSlide({ slideCell: '#pptContentDIVdiv', startFun: function(a, b) {
        _self.listIndex = a
        if (!_self.deAni) {
          setTimeout(() => {
            _self.deAni = true
          }, 200)
        }
        if (b > 5 && a >= 2 && a <= b - 3) {
          _self.icStyle = {
            transform: 'translateX(-' + 10.5 * (a - 2) + 'px)'
          }
        }
      } })
      this.slideMark = false
    }
  },
  methods: {
    changeTime(val) {
      this.prCurrentTime = val
      var myaudio = document.getElementById('audioPlay')
      myaudio.currentTime = (val * this.durationTime) / 100
    },
    toggleStatus() {
      var audioDom = document.getElementById('audioPlay')
      if (this.bplaying) {
        audioDom.pause()
        this.$store.commit('pause')
      } else {
        audioDom.play()
        this.$store.commit('play')
      }
    },
    cuLike() {
      courseLike(this.pageData.id, !this.pageData.is_like).then(response => {
        this.pageData.is_like = !this.pageData.is_like
      })
    },
    goback() {
      this.$router.goBack()
      this.$store.commit('toggleDetail', false)
    },
    tabChapter(index, mark) {
      this.toggleStatus()
      this.$store.commit('setAudioIndex', index)
    },
    tabCkIndex(index) {
      this.deAni = false
      this.tabIndex = index
      this.ulStyle = this.tabIndex ? { transform: 'translateX(6.5rem)' } : { transform: 'translateX(2.5rem)' }
      if (this.tabIndex) this.slideMark = true
    },
    preView(img_url, index) {
      preImgView(img_url, index)
    },
    getCourseList() {
      this.listLoading = true
      getCourseShow(this.$store.getters.courseId).then(response => {
        this.listLoading = false
        this.pageData = response.datas
        this.courseName = this.pageData.title
        if (!this.pageData.chapter.length) {
          this.$selfMsgBox('暂无课程！', (res) => {
            this.$router.goBack()
          })
          return
        }
        //  add to global list
        const tempInfo = {
          id: this.pageData.id,
          poster: this.pageData.poster
        }

        if (this.$store.getters.courseId !== this.$store.getters.courseInfo.id || this.$store.getters.courseId === 0) {
          document.getElementById('audioPlay').pause()
          this.$store.commit('pause')
          if (this.$store.getters.courseInfo.id !== 0) {
            pushTime(this.$store.getters.courseInfo.id, this.$store.getters.mediaList[this.currentIndex - 1].id, this.currentTime).then(response => {
            })
          }
          this.$store.commit('setCurrentIndex', 0)
          this.$store.commit('setMediaList', this.pageData.chapter)
          this.$store.commit('setMedia')
        }
        this.$store.commit('toggleDetail', true)
        // this.$store.commit('play')
        this.$store.commit('setCourseInfo', tempInfo)
      })
    },
    fuScr() {
    },
    turnAround() {
    },
    pushHistory() {

    },
    ...mapMutations([
      'playNext',
      'playPrev'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.courseList{
  * {
    background-size: 100% 100%;
  }
  height: 100%;
  overflow: hidden;
  // display: flex;
  flex-direction: column;
  .tips{
    height: 1.2rem;
    background: white;
    .returnback{
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
    }
    .goback{
      position: absolute;
      z-index: 2;
      top: 0.4rem;
      left: 0.5rem;
      width: 0.35rem;
      height: 0.35rem;
      border-top: 2px solid black;
      border-left: 2px solid black;
      transform: rotateZ(-45deg)
    }
    .titleName{
      line-height: 1.2rem;
      text-align: center;
      letter-spacing: 0.05rem;
      font-size: 0.5rem;
      color: #252525;
      font-weight: 600;
    }

  }
  .cd-wrapper {
    position: relative;
    margin: 0.5rem auto;
    width: 4rem;
    height: 4rem;
    img {
      width: 100%;
      height: 100%;
      // min-height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .cd-rotate {
    animation: rotating 10s linear .3s infinite;
  }
  .pro-wrap{
    position: relative;
    z-index: 3;
    width: 8.6rem;
    margin: 0 auto;
  }
  .time {
    color: #8A8A8A;
    width: 8.6rem;
    margin: 0 auto;
    font-size: 0.35rem;
    #cur {
      float: left;
    }
    #total {
      float: right;
    }
  }
  .optionBtns{
    clear: both;
    display: flex;
    margin: 0 0.7rem;
    height: 2rem;
    > div {
      align-self: center;
    }
    .cuLike{
      width: 0.67rem;
      height: 0.616rem;
      // margin-left: 0.5rem;
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/like.png) no-repeat;
      background-size: 100% 100%;
      ~ div{
        margin-left: 1rem;
      }
    }
    .cuLiked{
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/likeed.png) no-repeat;
      background-size: 100% 100%;
    }
    .mini-btn{
      width: 1rem;
      height: 1rem;
      background-size: 100% 100% !important;
    }
    .player-list{
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/prev.png) no-repeat;
    }
    .pause{
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/play.png) no-repeat !important;
      background-size: 100% 100% !important;
    }
    .player{
      width: 2rem;
      height: 2rem;
      margin-left: 0.5rem !important;
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/pause.png) no-repeat;
      +div{
        margin-left: 0.5rem !important;
      }
    }
    .next{
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/next.png) no-repeat;
    }
  }
  .forpos{
    clear: both;
    height: 0.3rem;
    background: #F7F7F7;
  }
  .title{
    display: flex;
    width: 8rem;
    margin: 0 auto;
    > * {
      width: 4rem;
      font-size: 0.4rem;
      color: #8A8A8A;
      text-align: center;
      line-height: 1.2rem;
    }
    .selCTitle{
      color: #353535;
      // line-height: 1rem;
      font-size: 0.45rem;
      font-weight: 600;

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
  .chapterList{
    border-top: 1px solid #E4E4E4;
    overflow-x: hidden;
    overflow-y: scroll;
    .chapterItem{
      display: flex;
      height: 2rem;
      border-bottom: 1px solid #E4E4E4;
      > div{
        align-self: center;
      }
      .ctIndex{
        margin-left: 0.5rem;
        color: #E2E2E2;
        font-size: 0.45rem;
        width: 0.5rem;
      }
      .imgIcon{
        margin-left: 0.5rem;
        height: 0.5rem;
        width: 22px;
        text-align:center;
        >div{
          float: left;
          margin-left: 2px;
          border-radius: 1.5px;
          width:3px;
          height:100%;
          background:#FF7400;

        }
        .line2{
          animation-delay:-0.9s;
        }
        .line3{
          animation-delay:-0.5s;
        }
        .line4{
          animation-delay:-0.7s;
        }
      }
      .line-late{
        >div{
          animation: strechdelay 1s infinite ease-in-out ;
        }
      }
      .ctInfo{
        margin-left: 0.3rem;
        width: 8rem;
        .ctTitle{
          color: #353535;
          font-size: 0.43rem;
          line-height: 0.8rem;
        }
        .seTitle{
          color: #FF7400;
        }
        .detailInfo{
          color: #8A8A8A;
          font-size: 0.35rem;
          display: flex;
          >div{
            width: 0.5rem;
            height: 0.5rem;
            align-self: center;
          }
          >span{
            padding-left: 0.3rem;
            line-height: 0.5rem;
          }
          .pIcon{
            background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/pIcon.png);
          }
          .aIcon{
            width: 0.5rem;
            height: 0.34rem;
            margin-left: 0.5rem;
            background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/audioIcon.png);
          }
        }
      }
      .rIcon{
        width: 0.2rem;
        height: 0.4rem;
        background-image: url(https://cdncollege.quansuwangluo.com/mx_college_th/rIcon.png);
      }
    }
  }
  .chapterE{
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    #pptContentDIVdiv{
      border-top: 1px solid #E4E4E4;
      margin: 0 auto;
      overflow: hidden;
      color: #0E85A8;
      .pptContentDIV{
        width: 100%;
        height: 100%;
        margin: 0.2rem 0 !important;
        display: flex;
        .pptSpecial{
          background-image:none !important;
          position: relative;
          width: 80%;
          margin:0.5rem 10% 0 10%;
        }
        .pptContent{
          img{
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
            // border: 1px solid black;
            object-fit:cover;
          }
        }
      }
      .deAni{
        transition: none !important;
        transition-duration: 0 !important;
      }
      .hd{
        position: relative;
        top: -0.6rem;
        z-index: 100;
        margin: -1rem auto;
        width: 57.5px;
        overflow: hidden;
        ul{
          padding: 0;
          width: 3000px;
          transition: all .3s cubic-bezier(0.5,0,.1,1);
        }
        li{
          display: inline-block;
          margin: 0 2.5px;
          width: 5px;
          height: 5px;
          border-radius: 0.2rem;
          background-color: #D8D8D8;
        }
        .onShow{
          background-color: #FFCE17 !important;
        }
      }
    }
  }
}
.coursesList::-webkit-scrollbar, .chapterList::-webkit-scrollbar, .chapterE::-webkit-scrollbar {
  display: none;
}
@keyframes rotating {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
@keyframes strechdelay{
  0%,40%,100%{
    transform-origin: bottom;
    transform:scaleY(.4);
  }
  20%, 60%{
    transform:scaleY(1);
  }
}
</style>
<style type="text/css">
  button img{
    width: 21px;
    height: 21px;
  }
  .plyr{
    position: static !important;

  }
  .plyr__play-large{
    width: 54px;
    height: 54px;
  }
  .plyr__play-large img{
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -8px;
    margin-top: 3px;
  }
  .plyr__play-large{
    background: transparent !important;
  }
  .plyr__controls{
    padding: 0 !important;
    transform: translateZ(2px);
  }
  video{
    /*height: 100% !important;*/
  }
  .videoPlayer{
    display: flex;
    background-color: black;
  }
  .videoPlayer > div{
    align-self: center;
  }
  button[data-plyr='mute'], button[data-plyr='fullscreen'], div[data-title='点击全屏']{
    display: none !important;
  }
  .plyr__progress, .plyr__time{
    margin-top: 11px;
  }
</style>
