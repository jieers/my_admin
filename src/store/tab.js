import Cookie from "js-cookie";
import router from "@/router";
export default {
  state: {
    isCollapse: false,
    tabList: [
      //初始数据
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    //用于判断是否添加路由标签
    currentMenu: null,
    menu: []
  },
  mutations: {
    //菜单的折叠与展开
    //这里用vuex是因为折叠按钮在另外一个组件上，这里用vuex进行组件通信
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    //标签 在compAside调用
    selectMenu(state, val) {
      //当传入的数据不为home
      if(val.name !== 'home') {
        state.currentMenu = val
        //判断当前菜单与传入的菜单数据是否相同，若是相等，则代表存在，则不往数组里面添加菜单
        const res = state.tabList.findIndex(item => item.name === val.name)
        // -1 则不存在，往数组里面添加菜单
        if(res === -1) {
          state.tabList.push(val)
        } else {
          //重置当前选中标识
          state.currentMenu = null
        }
      }
    },
    //关闭tag删除数据源
    closeTag(state, val) {
      const res = state.tabList.findIndex(item => item.name === val.name) //返回符合条件的索引值
      state.tabList.splice(res, 1)
    },
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    //路由的动态添加
    addMenu(state, router) {
      if(!Cookie.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArr = []
      menu.forEach(item => {
        if(item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArr.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArr.push(item)
        }
      })
      // 路由的动态添加
      menuArr.forEach(item => {
        router.addRoute('Main', item)
      })
    }
  }
}