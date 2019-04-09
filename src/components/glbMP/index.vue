<template>
  <transition name="fade">
    <div class="player-mini">
      <div class="mini-content">
        <audio :src="audio.url" @timeupdate="updateTime" @canplay="canPlayMedia" @error="loadError" @ended="next" id="audioPlay"/>
        <div class="info">
          <div class="name xmpname">{{audio.name}}</div>
        </div>
        <div class="pro">
          <div class="pro-load proload" :style="{'transform': 'tranlateX(' + prBufferedTime + '%'}"/>
          <div class="pro-play proplay" :style="{'transform': 'tranlateX(' + prCurrentTime + '%'}"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'TitleBar',
  props: {
    tname: {
      type: String,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loadedTime: 0,
      playerTime: 0
    }
  },
  beforeMount: function() {},
  mounted: function() {

  },
  updated: function() {

  },
  methods: {
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
      vm.$store.commit('updateDurationTime', parseInt(myaudio.duration))
      // if (this.)
    },
    canPlayMedia(){
      this.$store.commit('closeLoading')
      this.$store.commit('play')
      document.getElementById('audioPlay').play()
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
      'playNext'
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
    },
    computed: {
      ...mapGetters([
        'audio',
        'bplaying',
        'bloading',
        'currentTime',
        'prBufferedTime',
        'tempCurrentTime',
        'prCurrentTime'
      ])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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

// .list::-webkit-scrollbar {
//   display: none;
// }
</style>
