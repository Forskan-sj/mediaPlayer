<template>
  <transition name="fade">
    <div v-if="show" class="msgbox">
      <div :class="{anima:anim.enter,leave:anim.leave}" class="modal fade dialog-modal" role="dialog" data-backdrop="false" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header row">
              <div class="modal-title col-md-4">提示</div>
              <div class="close" aria-label="Close" @click="close">
                <span aria-hidden="true">×</span>
              </div>
            </div>
            <div class="modal-body">
              <div class="col-xs-offset-1">{{ message }}</div>
            </div>
            <div class="modal-footer">
              <div class="btn btn-primary" @click="close">确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
export default {
  name: 'MsgBox',
  data() {
    return {
      message: 'sserwe',
      show: false,
      anim: {
        enter: true,
        leave: false
      }
    }
  },
  methods: {
    close: function() {
      var _self = this
      this.conf('back info')
      this.anim.enter = false
      this.anim.leave = true
      setTimeout(() => {
        _self.show = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.msgbox{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // background: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  .modal{
    align-self: center;
    position: relative;
    width: 6rem;
    top: 0rem;
    margin: 2rem;
    z-index: 200;
    background: #234262;
    overflow: hidden;
    color: white;
    text-align: center;
    border-radius: 0.2rem;
    &-title{
      font-weight: 600;
      font-size: 0.5rem;
      line-height: 1.2rem;
    }
    .close{
      position: absolute;
      right: 0.3rem;
      top: 0;
      width: 0.6rem;
      height: 0.6rem;
    }
    &-body{
      font-size: 0.4rem;
    }
    &-footer{
      width: 30%;
      margin: 0.3rem auto;
      font-size: 0.35rem;
      background: white;
      color: black;
      line-height: 0.6rem;
      border-radius: 0.2rem;
    }
  }
}

</style>
