<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <div class="img"></div>
          <div class="userInfo">
            <p class="name">jieers</p>
            <p class="age">18</p>
            <p class="sex">man</p>
          </div>
        </div>
        <div class="msg">
          上次登陆时间：123
        </div>
      </el-card>
      <el-card
          shadow="hover"
          style="margin-top: 20px; height: 260px">
        <el-table :data="tableData">
          <el-table-column
              v-for="(val,key) in tableList"
              :key="key"
              :prop="key"
              :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: '0px' }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">符号{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 260px">
        <div style="height: 260px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div style="height: 240px" ref="echarts1"></div>
        </el-card>
        <el-card style="height: 260px">
          <div style="height: 240px" ref="echarts2"></div>

        </el-card>
      </div>
    </el-col>
  </el-row>


</template>

<script>
import {getData} from '../../api/data'
import * as echarts from 'echarts';
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableList: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总额'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 1111,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 'success',
          color: '#5ab1ef'
        },
        {
          name: '今日支付订单2',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日支付订单3',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日支付订单4',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
      ],
    }
  },
  mounted() {
    getData().then( res => {
      console.log(res)
      //解构赋值res.data中的数据
      const { code, data } = res.data
      if(code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        //通过Object.key获取order.data[0]key   ["苹果", "vivo", "oppo", "魅族", "三星", "小米"]
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        //折线图配置
        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }
        //echarts挂载到DOM
        const E = echarts.init(this.$refs.echarts)
        //配置echarts
        E.setOption(option)

        //柱状图配置
        const userOption = {
          legend: {
            textStyle: {
              color: "#333"
            }
          },
          grid: {
            left: "20%"
          },
          //提示框
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category', //类目轴
            data: data.userData.map(item => item.data),
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            },
            axisLabel: {
              interval: 0,
              color: "#333"
            }
          },
          yAxis: [
            {
              type: "value",
                  axisLine: {
                lineStyle: {
                  color: "#17b3a3"
                }
            }
            }
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: '新增用户',
              data: data.userData.map(item => item.new),
              type: 'bar' //柱状图
            },
            {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar' //柱状图
            },
          ]
        }
        //echarts挂载到DOM
        const U = echarts.init(this.$refs.echarts1)
        //配置echarts
        U.setOption(userOption)

        //饼状图配置
        const videoOption = {

            tooltip: {
              trigger: "item"
            },
            color: [
              "#0f78f4",
              "#dd536b",
              "#9462e5",
              "#a6a6a6",
              "#e1bb22",
              "#39c362",
              "#3ed1cf",
            ],
            series: [
              {
                data: data.videoData,
                type: 'pie'
              }
            ],
        }
        const V = echarts.init(this.$refs.echarts2)
        V.setOption(videoOption)


      }
    })
  }
}

</script>

<style scoped lang="less">
.home {
  .user {
    display: flex;

    .img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #4cb9fc;

      margin: 0 20px;
    }

  }

  .msg {
    height: 200px;
  }

  .num {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .el-card {
      width: 300px;
      margin: 10px;
    }
  }

  .graph {
    display: flex;
    justify-content: space-between;
    .el-card {
      margin-top: 30px;
      width: 540px;


    }
  }
}

</style>