<template>
  <transition name="fade">
    <div id="MyInfo" class="MyInfo">
      <div class="selfInfo">
        <img :src="infos.avatar" alt="">
        <div class="infos">
          <div class="myName" v-text="infos.nickname"/>
          <div class="sId" v-text="'学号：'+infos.student_id"/>
        </div>
      </div>
      <div class="forPos"/>
      <div class="invite">
        <div class="Item" @click="invite">
          <div class="lIcon"/>
          <div class="des">邀请好友</div>
          <div class="rIcon"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'TitleBar',
  // props: {
  //   tname: {
  //     type: String,
  //     default() {
  //       return []
  //     }
  //   }
  // },
  data() {
    return {
      infos: {
      }
    }
  },
  beforeMount: function() {},
  mounted: function() {
    this.infos = this.$store.state.user.selfinfo
  },
  updated: function() {

  },
  methods: {
    invite() {
      this.$router.push('invite')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.MyInfo{
  .selfInfo{
    height: 2.5rem;
    margin: 1rem 0.74rem 0 0.74rem;
    img{
      width: 1.6rem;
      height: 1.6rem;
      object-fit: cover;
      border-radius: 50%;
      // border: 1px solid red;
      float: left;
    }
    .infos{
      margin-left: 2.1rem;
      .myName{
        color: #252525;
        line-height: 1rem;
        font-size: 0.45rem;
        font-weight: 600;
      }
      .sId{
        color: #8A8A8A;
        font-size: 0.35rem;
      }
    }
  }
  .forPos{
    height: 0.5rem;
    background: #F7F7F7;
  }
  .invite{
    margin-left: 0.74rem;
    display: flex;
    flex-direction: column;
    .Item{
      border-bottom: 1px solid #E4E4E4;
      height: 1.3rem;
      display: flex;
      >*{
        align-self: center;
      }
      .lIcon{
        width: 0.7rem;
        height: 0.5rem;
        background: url(https://cdncollege.quansuwangluo.com/mx_college_th/invite.png) no-repeat;
        background-size: 100% 100%;
      }
      .des{
        width: 100%;
        color: #353535;
        font-size: 0.4rem;
        text-align: left;
        margin-left: 0.5rem;
      }
      .rIcon{
        margin-right: 0.4rem;
        width: 0.25rem;
        height: 0.4rem;
        background: url(https://cdncollege.quansuwangluo.com/mx_college_th/rIcon.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

// .list::-webkit-scrollbar {
//   display: none;
// }
</style>
