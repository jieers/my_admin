<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose"
           :collapse="isCollapse">
    <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
    <!--无子节点-->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChild" :index="item.path" :key="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <!--有子节点-->
    <el-submenu v-for="item in haveChild" :index="item.label" :key="item.name">
      <template slot="title">
        <i class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)"  :index="subItem.path">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "compAside",
  data() {
    return {
      //控制侧边栏折叠,已经写道到vuex里了
      // isCollapse: false,
      menu: [
        // {
        //   path: '/',
        //   name: 'home',
        //   label: '首页',
        //   icon: 's-home',
        //   url: 'Home/Home'
        // },
        // {
        //   path: '/mall',
        //   name: 'mall',
        //   label: '商品管理',
        //   icon: 'video-play',
        //   url: 'MallManage/MallManage'
        // },
        // {
        //   path: '/user',
        //   name: 'user',
        //   label: '用户管理',
        //   icon: 'user',
        //   url: 'UserManage/UserManage'
        // },
        // {
        //   label: '其他',
        //   icon: 'location',
        //   children: [
        //     {
        //       path: '/page1',
        //       name: 'page1',
        //       label: '页面1',
        //       icon: 'setting',
        //       url: 'Other/PageOne'
        //     },
        //     {
        //       path: '/page2',
        //       name: 'page2',
        //       label: '页面2',
        //       icon: 'setting',
        //       url: 'Other/PageTwo'
        //     }
        //   ]
        // },
      ]
    };
  },
  computed: {
    //无子节点
    noChild() {
      // return this.menu.filter(item => !item.children)
      return this.asyncMenu.filter(item => !item.children)
    },
    haveChild() {
      // return this.menu.filter(item => item.children)
      return this.asyncMenu.filter(item => item.children)

    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      // console.log(item)
      this.$router.push({
        name: item.name
      })
      //传入item，调用selectMenu方法
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style scoped lang="less">

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>