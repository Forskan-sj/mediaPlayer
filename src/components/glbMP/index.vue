<template>
  <transition name="fade">
    <div class="player-mini" @click="showDetail">
      <div class="mini-content">
        <audio id="audioPlay" :src="media.media" @timeupdate="updateTime" @canplay="canPlayMedia" @error="loadError" @ended="next"/>
        <div class="info">
          <img :class="{playAni: bplaying}" :src="courseInfo.poster + '?x-oss-process=image/resize,l_100'" alt="">
          <div class="name xmpname">{{ media.title }}</div>
        </div>
        <div class="control" @click.stop>
          <div class="mini-btn player-list" @click="playPrev"/>
          <div :class="{pause: bplaying}" class="mini-btn player" @click="toggleStatus"/>
          <div class="mini-btn next" @click="next"/>
        </div>
        <div class="pro">
          <div :style="{ 'transform': 'translateX(' + prBufferedTime + '%)' }" class="pro-load proload"/>
          <div :style="{ 'transform': 'translateX(' + prCurrentTime + '%)' }" class="pro-play proplay"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Mini',
  data() {
    return {
      loadedTime: 0,
      playerTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'media',
      'courseInfo',
      'bplaying',
      'bloading',
      'currentTime',
      'prBufferedTime',
      'tempCurrentTime',
      'prCurrentTime'
    ])
  },
  beforeMount: function() {},
  mounted: function() {

  },
  updated: function() {

  },
  methods: {
    showDetail() {
      this.$router.push('mediaPage')
      // this.$store.commit('toggleDetail')
    },
    showList() {

    },
    updateTime() {
      var vm = this
      var myaudio = document.getElementById('audioPlay')
      var time = parseInt(myaudio.currentTime)
      myaudio.onsuspend = () => {
        var timeRange = myaudio.buffered
        if (timeRange.length > 0 && myaudio.duration > 0) {
          vm.$store.commit('updateBufferedTime', parseInt(myaudio.buffered.end(0)))
        }
      }
      myaudio.onloadedmetadata = () => {
        myaudio.currentTime = this.$store.getters.media.rtime
        this.$store.commit('play')
        myaudio.play()
      }
      // myaudio.onended = () => {
      //   this.$store.commit('playNext')
      // }
      vm.$store.commit('updateDurationTime', parseInt(myaudio.duration))
      vm.$store.commit('updateCurrentTime', time)
    },
    canPlayMedia() {
      // var myaudio = document.getElementById('audioPlay')
      this.$store.commit('closeLoading')
      // this.$store.commit('play')
      // myaudio.play()
    },
    loadError() {
      if (document.getElementById('audioPlay').currentSrc) {
        this.loading = false
        this.$store.commit('closeLoading')
      } else {
        console.log('first loading error !')
      }
    },
    ...mapMutations([
      'play',
      'pause',
      'playNext',
      'playPrev'
    ]),
    next() {
      this.toggleStatus()
      this.$store.commit('playNext')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.player-mini {
  width: 100%;
  height: 1.5rem;
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  background-color: rgba(255,255,255,.9);
  color: #333333;
  .mini-content{
    .info{
      overflow: hidden;
      position: relative;
      width: 6rem;
      float: left;
      padding-top: 0.2rem;
      padding-left: .1rem;
      .playAni{
        // transition: all 3s inherit;
        animation: playAni 8s infinite linear;
      }
      img{
        width: 1rem;
        height: 1rem;
        object-fit: cover;
        border-radius: 50%;
        float: left;
      }
      .name{
        padding-left: 0.2rem;
        font-size: .35rem;
        line-height: 1rem;
        overflow: hidden;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: black;
      }
    }
    .control{
      // clear: both;
      float: right;
      width: 4rem;
      height: 1.5rem;
      display: flex;
      >*{
        align-self: center;
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
        background: url(https://cdncollege.quansuwangluo.com/mx_college_th/pause.png) no-repeat;
      }
      .next{
        background: url(https://cdncollege.quansuwangluo.com/mx_college_th/next.png) no-repeat;
      }
    }
    .pro {
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: rgba(255,255,255,.5);
      .pro-load, .pro-play {
        width: 100%;
        height: 1px;
        position: absolute;
        left: -100%;
      }
      .pro-load {
        background-color: rgba(220, 217, 217, 0.4);
      }
      .pro-play {
        background-color: red;
      }
    }
  }
}
@keyframes playAni{
  0%{
    transform: rotateZ(0deg);
  }
  100%{
    transform: rotateZ(360deg);
  }
}
</style>
