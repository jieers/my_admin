<template>
  <el-container style="height: 100%;">
      <!--侧边栏-->
      <el-aside width="auto">
        <compAside></compAside>
      </el-aside>
    <!--主体-->
    <el-container>
      <!--主体头部-->
      <el-header>
        <compHeader></compHeader>
      </el-header>
      <!--动态标签-->
      <comp-tag></comp-tag>
      <!--主体内容-->
      <el-main>
        <!--路由占位符，跳转路由，只有这个里面的内容才会发生改变-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import compAside from "@/components/compAside";
import compHeader from "@/components/compHeader";
import compTag from "@/components/compTag";
export default {
  name: "Main",
  components: {
    compAside,
    compHeader,
    compTag
  }
}
</script>

<style scoped lang="less">
 .el-header {
   background-color: #333;
 }
 .el-main {
   padding-top: 0;
 }
</style>