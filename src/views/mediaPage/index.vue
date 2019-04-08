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
      <!-- <div id="turnAround" :style="turnAroundStyle" class="turnAround" style="display:none" @click="turnAround" /> -->
      <div id="videoPlayDIV" :style="videoPlayerStyle" class="videoPlayer">
        <video :poster="pageData.poster" webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow">
          <source :src="mediaSource" type="video/mp4">
        </video>
      </div>
      <!-- <div :style="fullScr" class="fullScreen" @click="fuScr"/> -->
      <div class="forpos"/>
      <div class="title">
        <div :class="{selCTitle: !tabIndex}" class="couseKind" @click="tabCkIndex(0)">课程章节({{ chapterIndex }}/{{ pageData.chapter.length }})</div>
        <div :class="{selCTitle: tabIndex}" class="couseKind" @click="tabCkIndex(1)">课程精华</div>
      </div>
      <div :style="ulStyle" class="underLine"/>
      <div v-if="!tabIndex" :style="contentHeight" class="chapterList">
        <div v-for="(it, index) in pageData.chapter" :key="it.id" class="chapterItem" @click="tabChapter(index, 1)">
          <div v-if="chapterIndex - 1 !== index" class="ctIndex">{{ index + 1 }}</div>
          <div v-if="chapterIndex - 1 === index" class="imgIcon">
            <div class="line1"/>
            <div class="line2"/>
            <div class="line3"/>
            <div class="line4"/>
          </div>
          <div class="ctInfo">
            <div :class="{seTitle: chapterIndex - 1 === index}" class="ctTitle">{{ it.title }}</div>
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
            <div v-for="(con,index) in pageData.chapter[chapterIndex - 1].imgs" :key="index" :style="pptSEStyle" class="box">
              <div class="pptContent pptSpecial" >
                <img :src="con" @click="preView(pageData.chapter[chapterIndex - 1].imgs, index)">
              </div>
            </div>
          </div>
          <div class="hd">
            <ul :style="icStyle">
              <li v-for="(li, index) in pageData.chapter[chapterIndex - 1].imgs.length" :key="index" :class="{onShow:index==listIndex}"/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import titleBar from '@/components/titleBar'
import { getCourseShow, pushTime, courseLike } from '@/api/mainPage'
export default {
  name: 'CourseList',
  components: {
    titleBar
  },
  data() {
    return {
      deAni: false,
      listIndex: 0, // ppt当前位置索引
      courseName: '', // pageTitle
      chapterIndex: 1, // 章节序号
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
      fullScreenMark: false,
      fullScr: '',
      videoPlayerStyle: '',
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
  created() {
    this.getCourseList()
    this.ckIndex = this.$store.getters.ckIndex
  },
  beforeMount: function() {},
  mounted: function() {
    this.contentHeight = {
      height: window.innerHeight / window.innerWidth * 10 - 8.9 + 'rem'
    }
    var _self = this
    if (this.exploreOut === -1) {
      window.addEventListener('popstate', function(e) {
        if (_self.exploreOut === -1) {
          const time = _self.specialMark ? saveingTime.toString() : _self.mediaObj[0].getCurrentTime()
          _self.pageData.chapter[_self.chapterIndex - 1].rtime = time
          pushTime(_self.pageData.id, _self.pageData.chapter[_self.chapterIndex - 1].id, time).then(response => {

          })
        }
        _self.exploreOut = 0
        window.removeEventListener('popstate', null, false)
      }, false)
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
    cuLike() {
      courseLike(this.pageData.id, !this.pageData.is_like).then(response => {
        this.pageData.is_like = !this.pageData.is_like
      })
    },
    goback() {
      // const time = this.specialMark ? saveingTime.toString() : this.mediaObj[0].getCurrentTime()
      // pushTime(this.pageData.id, this.pageData.chapter[this.chapterIndex - 1].id, time).then(response => {
      // })
      this.$router.goBack()
    },
    tabChapter(index, mark) {
      if (mark) {
        const time = this.specialMark ? saveingTime.toString() : this.mediaObj[0].getCurrentTime()
        this.pageData.chapter[this.chapterIndex - 1].rtime = time
        pushTime(this.pageData.id, this.pageData.chapter[this.chapterIndex - 1].id, time).then(response => {
        })
      }
      var url = this.pageData.chapter[this.chapterIndex - 1].media
      var itemName = url.substring(url.length - 3, url.length)
      this.audioItem = itemName === 'mp3' ? 1 : 0
      this.specialMark = false
      this.chapterIndex = index + 1
      if (navigator.userAgent.indexOf('HONORBND') !== -1 && !this.audioItem) {
        videoPlayer('#videoPlayDIV', this.pageData.chapter[index], null, this.audioItem)
        this.specialMark = true
      } else {
        this.formatMediaObj(this.pageData.chapter[index])
        this.formatMediaObj(this.pageData.chapter[index])
      }
      this.mediaWndHeight = document.getElementById('videoPlayDIV').clientHeight
      this.fullScr = { top: this.mediaWndHeight / window.innerWidth * 10 + 0.5 + 'rem' }
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
        this.tabChapter(0, 0)
      })
    },
    fuScr() {
      if (!this.audioItem) {
        if (!this.fullScreenMark) {
          this.videoTitleStyle = {
            top: '0'
          }
          this.mediaWndHeight = document.getElementById('videoPlayDIV').clientHeight
          if (this.bTurnAround) {
            this.turnAround()
          }
          this.fullScr = { top: window.innerHeight - 37.5 + 'px' }

          this.turnAroundStyle = { display: 'block !important' }
          this.videoPlayerStyle = {
            height: window.innerHeight + 'px !important',
            width: '100% !important',
            transform: 'rotateZ(0deg) translateY(0px)',
            zIndex: '20'
          }
          document.getElementsByTagName('video')[0].style.height = '100%'
          this.furCount++
          this.pushHistory(1)
        } else {
          this.fullScr = { top: this.mediaWndHeight / window.innerWidth * 10 + 0.5 + 'rem' }
          this.rebackStyle = {
            display: 'block'
          }
          this.turnAroundStyle = { display: 'none !important' }
          this.videoPlayerStyle = {
            height: this.mediaWndHeight + 'px !important',
            width: '100% !important',
            transform: 'rotateZ(0deg) translateY(0px)',
            zIndex: '20'
          }
          document.getElementsByTagName('video')[0].style.height = '5.625rem'
          this.videoTitleStyle = {
            top: '0',
            width: window.innerWidth + 'px',
            transform: 'rotate(0) translate(0)'
          }
          if (this.gobackMark !== 0) {
            this.fullScreenMark = true
          }
          this.gobackMark = 0
          // window.history.go(-1);
        }
        this.fullScreenMark = !this.fullScreenMark
      }
    },
    turnAround() {
      var screenHeight = window.innerHeight
      var screenWidth = window.innerWidth
      // console.log(screenHeight +"ssdss"+screenWidth);
      if (this.bTurnAround) { // 旋转 → 正常
        this.videoPlayerStyle = {
          height: screenHeight + 'px !important',
          width: screenWidth + 'px !important',
          transform: 'rotateZ(0deg) translateY(0px)',
          zIndex: '20'
        }
        document.getElementsByTagName('video')[0].style.height = '100%'
        this.rebackStyle = {
          display: 'block'
        }
        this.turnAroundStyle = {
          display: 'block !important',
          top: '20px',
          right: '20px',
          transform: 'rotateZ(0deg)'
        }
        this.videoTitleStyle = {
          top: '0',
          width: window.innerWidth + 'px',
          transform: 'rotate(0) translate(0)'
        }
        var strVideoTitle = this.aorvIndex + 1 + '.' + this.mediaDtl.directory[this.aorvIndex].res_name
        this.videoTitle = strVideoTitle.length > 12 ? strVideoTitle.substring(0, 12) + '...' : strVideoTitle
        this.fullScr = {
          top: window.innerHeight - 37.5 + 'px',
          right: 0
        }
        this.bTurnAround = false
      } else { // 正常 → 旋转
        this.rebackStyle = {
          display: 'none'
        }
        document.getElementsByTagName('video')[0].style.height = screenWidth + 'px'
        this.videoPlayerStyle = {
          height: screenWidth + 'px !important',
          width: screenHeight + 'px !important',
          transform: 'rotateZ(90deg) translateY(-' + screenWidth + 'px)',
          zIndex: '20'
        }
        this.bTurnAround = true
        this.turnAroundStyle = {
          display: 'block !important',
          transform: 'rotateZ(90deg)',
          top: screenHeight - 52 + 'px',
          bottom: 0,
          right: '20px'
        }
        this.fullScr = {
          top: window.innerHeight - 37.5 + 'px',
          right: screenWidth - 37.5 + 'px'
        }
        this.videoTitleStyle = {
          width: window.innerHeight + 'px',
          transform: 'rotate(90deg) translateY(-' + window.innerWidth + 'px)'
        }
        strVideoTitle = this.aorvIndex + 1 + '.' + this.mediaDtl.directory[this.aorvIndex].res_name
        this.videoTitle = strVideoTitle
      }
    },
    formatMediaObj(url) {
      var _self = this
      // console.log('object')
      if (!this.mediaObj.length) {
        document.getElementsByTagName('source')[0].type = 'video/mp4'
        if (_self.audioItem) {
          document.getElementsByTagName('source')[0].type = 'audio/mp3'
          document.getElementsByTagName('video')[0].poster = _self.pageData.poster
          // document.getElementsByTagName('video')[0].src = url;
        }
        this.mediaObj = plyr.setup()
      } else {
        this.mediaObj[0].destroy()
        document.getElementsByTagName('video')[0].style.height = '5.625rem'
        // document.getElementsByTagName('source')[0].src = url.res_url;
        document.getElementsByTagName('source')[0].type = 'video/mp4'
        document.getElementsByTagName('video')[0].src = url.media
        if (_self.audioItem) {
          document.getElementsByTagName('source')[0].type = 'audio/mp3'
          document.getElementsByTagName('video')[0].poster = _self.pageData.poster
          // document.getElementsByTagName('video')[0].poster = 'https://cdncollege.quansuwangluo.com/image/video/audioPoster1.jpg'
        }
        this.mediaObj = plyr.setup()
        this.mediaObj[0].on('loadeddata', function() {
          _self.mediaObj[0].play()
          if (url.rtime !== '') {
            _self.mediaObj[0].seek(parseInt(url.rtime))
          }
        })
      }
    },
    pushHistory() {

    }
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
    .cuLike{
      position: absolute;
      z-index: 2;
      top: 0.3rem;
      right: 0.3rem;
      width: 0.67rem;
      height: 0.616rem;
      // margin-left: 0.5rem;
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/like.png) no-repeat;
      background-size: 100% 100%;
    }
    .cuLiked{
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/likeed.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .turnAround{
    position: absolute;
    /*background-color: red;*/
    height: 1rem;
    width: 1rem;
    background-image: url(https://cdnneed.quansuwangluo.com/college/h5_static/image/classslices/around.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: 8px;
    right: 8px;
    z-index: 2000;
  }
  .videoPlayer{
    position: relative;
    height: 5.625rem !important;
    min-height: 10%;
    /*max-height: 30%;*/
    width: 100%;
    z-index: 2;
    transform-origin: 0 0;
    overflow: hidden;
  }
  #videoTitle{
    display: none;
    position: absolute;
    z-index: 80;
    color: white;
    text-align: center;
    width: 100%;
    height: 2em;
    line-height: 2em;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    transform-origin: left top;
  }
  .fullScreen{
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 23%;
    right: 0;
    z-index: 100;
    background-color: blue;
    // opacity: 0;
  }
  .forpos{
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
          animation: strechdelay 1s infinite ease-in-out ;
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
