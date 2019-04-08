<template>
  <transition name="fade">
    <div id="mainPage" class="mainPage">
      <slider class="song-slider" @change="changeTime" v-model="prCurrentTime"/>
      <div class="search" @click="search">
        <div class="searchIcon"/>
        <div class="plachoder" v-text="plachoder"/>
      </div>
      <div class="swiper">
        <div id="pptContentDIVdiv" class="pptContentDIVdiv">
          <div :class="{deAni: !deAni}" class="pptContentDIV bd">
            <div v-for="(con,index) in pageData.ads" :key="index" class="box">
              <div class="pptContent pptSpecial" >
                <img :src="con" @click="preView(pageData.ads, index)">
              </div>
            </div>
          </div>
          <div class="hd">
            <ul :style="icStyle">
              <li v-for="(li, index) in pageData.ads.length" :key="index" :class="{onShow:index==listIndex}"/>
            </ul>
          </div>
        </div>
      </div>
      <div class="mpcontent">
        <div v-for="(it, idx) in pageData.cate" :key="idx" class="courseKind" @click="goCourseList(idx)">
          <div class="ckTitle">{{ it.name }}</div>
          <img :src="it.pic">
          <div class="des">
            <div class="rpIcon"/>
            <div class="courseNum" v-text="'共'+it.num+'课'"/>
            <div class="likeNum" v-text="it.likes+ '人喜欢 | ' + it.click + '人学习'"/>
            <div class="sdsdfw" style="clear:both"/>
          </div>
        </div>
        <div id="quesNext"/>
        <div id="quesPrev"/>
      </div>
    </div>
  </transition>
</template>
<script>
import { getCate, getURLParams } from '@/api/mainPage'
import slider from '@/components/slider'
export default {
  name: 'MainPage',
  // props: {
  //   tname: {
  //     type: String,
  //     default() {
  //       return []
  //     }
  //   }
  // },
  components: {
    slider
  },
  data() {
    return {
      plachoder: '请输入关键字，找你想要的课程',
      pageData: {
        ads: [],
        cate: []
      },
      deAni: false,
      icStyle: {},
      slideMark: false,
      intNum: -1,
      listIndex: 0,
      prCurrentTime: 30
    }
  },
  created() {
    const par = parseInt(getURLParams().uid)
    if (!par) {
      this.$selfMsgBox('用户参数丢失', (res) => {
      })
    } else {
      this.getData(par)
    }
  },
  beforeMount: function() {},
  mounted: function() {

  },

  updated: function() {
    if (this.slideMark) {
      var _self = this
      TouchSlide({ prvBtn: '#quesPrev', nextBtn: '#quesNext', slideCell: '#pptContentDIVdiv', startFun: function(a, b) {
        _self.listIndex = a
        // console.log(a)
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
      this.intNum = setInterval(() => {
        if (!document.getElementById('quesPrev') || !document.getElementById('quesNext')) {
          clearInterval(this.intNum)
          return
        }
        if (_self.listIndex >= _self.pageData.ads.length - 1) {
          for (let i = 0; i < _self.pageData.ads.length; i++) {
            document.getElementById('quesPrev').click()
          }
          return
        }
        document.getElementById('quesNext').click()
      }, parseInt(_self.pageData.dtime) * 1000)
      // document.getElementById('quesNext').click()
    }
  },
  methods: {
    changeTime(value) {
      console.log(value)
    },
    preView(img_url, index) {
      preImgView(img_url, index)
    },
    getData(id) {
      this.listLoading = true
      if (!this.$store.getters.token) {
        this.$store.dispatch('Login', id).then((res) => {
          this.listLoading = false
          this.getCourseList()
        })
      } else {
        this.getCourseList()
      }
    },
    getCourseList() {
      this.listLoading = true
      getCate().then(response => {
        this.listLoading = false
        this.pageData = response.datas
        this.slideMark = true
      })
    },
    search() {
      this.$router.push('search')
    },
    goCourseList(index) {
      this.$store.dispatch('ToggleCkIndex', index)
      this.$router.push('course')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mainPage{
  // height: 100%;
  margin:0.3rem 0.5rem;
  .search{
    background: #F8F8F8;
    height: 0.8rem;
    border-radius: 0.4rem;
    display: flex;
    > * {
      align-self: center;
    }
    .searchIcon{
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      background: url(https://cdncollege.quansuwangluo.com/mx_college_th/search.png) no-repeat;
      background-size: 100% 100%;
    }
    .plachoder{
      font-size: 0.35rem;
      margin-left: 0.3rem;
      // line-height: 0.8rem;
      color: #ADADAB;
      text-align: left;
    }
  }
  .swiper{
    width: 100%;
    height: 5rem;
    #pptContentDIVdiv{
      position: relative;
      // border-top: 1px solid #E4E4E4;
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
          width: 100%;

          // margin:1rem 10% 0 10%;
        }
        .pptContent{
          img{
            width: 100%;
            height: 100%;
            border-radius: 0.1rem;
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
        position: absolute;
        right: 0.2rem;
        bottom: 0.5rem;
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
          width: 10px;
          height: 10px;
          border-radius: 0.2rem;
          background-color: #D8D8D8;
        }
        .onShow{
          background-color: #FFCE17 !important;
        }
      }
    }
  }
  .mpcontent{
    .courseKind{
      .ckTitle{
        color: #353535;
        font-size: 0.43rem;
        font-weight: 600;
        text-align: left;
        margin: 0.5rem auto;
      }
      >img{
        width: 9rem;
        border-radius: 0.1rem;
      }
      .des{
        margin: -0.1rem 0.05rem;
        height: 1rem;
        border-bottom: 0.001rem solid #E4E4E4;
        font-size: 0.33rem;
        color: #8A8A8A;
        line-height: 1rem;
        // display: flex;
        // > * {
        //   align-self: center;
        // }
        .rpIcon{
          float: left;
          margin-top: 0.25rem;
          width: 0.39rem;
          height: 0.42rem;
          background: url(https://cdncollege.quansuwangluo.com/mx_college_th/courseIcon3.png) no-repeat;
          background-size: 100% 100%;
        }
        .courseNum{
          float: left;
          margin-left: 0.1rem;
          // width: 8rem;
        }
        .likeNum{
          float: right;
        }
      }
    }
  }
  .hd{
    // height: 3rem;
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

</style>
