<template>
  <transition name="fade">
    <div id="tips" class="tips">
      <div class="returnback" @click="goback">
        <div class="goback"/>
      </div>
      <div class="titleName" v-text="tname"/>
    </div>
  </transition>
</template>
<script>
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

    }
  },
  beforeMount: function() {},
  mounted: function() {

  },
  updated: function() {

  },
  methods: {
    goback() {
      if (this.$route.name === 'dashboard') {
        closeWin()
      }
      this.$router.goBack()
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
