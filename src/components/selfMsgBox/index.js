import msgbox from './msgbox'

const test = {
  install: function(Vue) {
    Vue.component('test', msgbox)
    Vue.prototype.alertTest = (src) => {
      alert(src)
    }
    Object.defineProperty(Vue.prototype, '$selfMsgBox', {
      get() {
        const div = document.createElement('div')
        document.body.appendChild(div)
        return (message, confirmSure) => {
          const Constructor = Vue.extend(msgbox)
          new Constructor({
            data() {
              return {
                message: message,
                show: true,
                anim: {
                  enter: true,
                  leave: false
                }
              }
            },
            methods: {
              conf: confirmSure
            }
          }).$mount(div)
        }
      }
    })
  }
}

export default test
