<template>
  <div class="dashboard-container">
    <titleBar :tname="'好友邀请'"/>
    <div class="content">
      <div class="inviteImagebk">
        <img :src="pageData" alt="">
      </div>
      <div class="footer" @click="forShare()">
        <div class="btn">邀请</div>
      </div>
    </div>

  </div>
</template>

<script>
import titleBar from '@/components/titleBar'
import { getPoster } from '@/api/mainPage'
export default {
  name: 'Invite',
  components: {
    titleBar
  },
  data() {
    return {
      pageData: ''
    }
  },
  created() {
    this.listLoading = true
    getPoster().then(response => {
      this.listLoading = false
      this.pageData = response.datas
    })
  },
  mounted() {

  },
  methods: {
    forShare() {
      var optionDS = 'https://college.quansuwangluo.com/m/'
      window.location.href = optionDS + 'pic/share.html?isShowN=0&url=' + this.pageData
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    color: white;
    height: 100%;

    // margin: 30px;
    background: #F7F7F7;
    display: flex;
    flex-direction: column;
    .content{
      height: 100%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .inviteImagebk{
        background: #FDD156;
        margin:0.5rem 0.8rem;
        border-radius: 0.3rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        img{
          margin: 0.5rem 0.8rem;
          width: 6.8rem;
        }
      }
    }
    .footer{
      height: 1.8rem;
      .btn{
        height: 1.2rem;
        text-align: center;
        width: 8.4rem;
        margin: 0 auto;
        line-height: 1.2rem;
        font-size: 0.45rem;
        color: #2F2F2F;
        background: #FFCE17;
        border-radius: 0.6rem;
      }
    }
  }
}

.content::-webkit-scrollbar {
  display: none;
}
</style>
