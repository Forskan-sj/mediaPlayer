<template>
  <transition name="fade">
    <div id="tips" class="tips">
      <div class="goback" @click="goback"/>
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
      this.$router.goBack()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tips{
  height: 1.5rem;
  .goback{
    position: absolute;
    z-index: 2;
    width: 0.5rem;
    height: 0.5rem;
    border-top: 1px solid black;
    border-left: 1px solid black;
  }
}

// .list::-webkit-scrollbar {
//   display: none;
// }
</style>
