<template>
  <div class="totalBox">
    <transition :name="transitionName">
      <keep-alive include="Test2">
        <router-view class="child-view"/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'MainPage',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('object')
    const isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    next()
  },
  mounted() {
  },
  updated(argument) {
  },
  methods: {
  }
}
</script>
<style scoped>
.totalBox{
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.child-view {
  position: absolute;
  width:100%;
  transition: transform .5s cubic-bezier(0.5,0,.1,1), opacity .5s cubic-bezier(0.5,0,.1,1);;
  overflow: hidden;
}
.child-view::-webkit-scrollbar {
  display: none;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-50px, 0);
}
</style>
