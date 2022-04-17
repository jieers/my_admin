<template>
  <Header>
    <div class="l-container">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!--<h3 style="color: #fff">首页</h3>-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
        <!--<el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>
    <div class="r-container">
      <el-dropdown trigger="click" size="mini">
        <span>
          <button>下拉</button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <!--@click.native 组件添加点击事件，所以加native-->
          <el-dropdown-item @click.native="outBack">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </Header>

</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "compHeader",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  methods: {
    handleMenu() {
      //点击按钮就调用vuex中的这个方法
      this.$store.commit('collapseMenu')
    },
    outBack() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
Header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .l-container {
    display: flex;
    align-items: center;
    padding: 0 10px;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-container {

  }
}
</style>