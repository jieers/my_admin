<template>
  <div class="tabs">
    <!--单纯对拿到的List进行循环-->
    <el-tag
        size="small"
        v-for="(item, index) in tags"
        :key="item.name"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="closeMenu(item, index)"
    >
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: "compTag",
  data() {
    return {}

  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  methods: {
    ...mapMutations({
      //起个别名
      close: 'closeTag'
    }),
    changeMenu(item) {
      //点击tag，选择不同的标签路由
      this.$router.push({name: item.name})
    },
    closeMenu(item, index) {
      const L =  this.tags.length - 1
      //删掉点击的标签,这行代码与上面那行不能互换，否则L就少了1，则报错
      this.close(item) //执行这行代码，tabList数组长度-1
      //如果点击删除的路由不是当前路由，直接return
      if(item.name !== this.$route.name) {
        return
      }
      //设置点击×后路由往哪跳转
      //若点击删除的路由是当前路由,向左跳转
      if(index === L) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
        //向右跳转
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .tabs {
    padding: 20px;
      .el-tag {
        margin-right: 15px;
        cursor: pointer;
      }
  }

</style>