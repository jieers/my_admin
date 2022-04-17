import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'


import router from "@/router";
import store from "./store"
import http from "axios";

import '../api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.prototype.$http = http

router.beforeEach((to, form, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login') {
    next({name: 'login'})
  } else if(token && to.name === 'login') {
    next({name: 'home'})
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
//render函数是vue通过js渲染dom结构的函数createElement，约定可以简写为h
// 官方文档中是这样的，createElement 是 Vue.js 里面的 函数，
// 这个函数的作用就是生成一个 VNode节点，
// render 函数得到这个 VNode 节点之后，
// 返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。
// render: function (createElement) {
//   return createElement(App);
// }
//缩写即上面这个

// 这里创建的vue实例没有el属性，而是在实例后面添加了一个$mount(’#app’)方法。
//
// $mount(’#app’) ：手动挂载到id为app的dom中的意思
//
// 当Vue实例没有el属性时，则该实例尚没有挂载到某个dom中；
// 假如需要延迟挂载，可以在之后手动调用vm.$mount()方法来挂载
//
// 需要注意的是：该方法是直接挂载到入口文件index.html 的 id=app 的dom 元素上的
