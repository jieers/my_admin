import Mock from 'mockjs'

//图标数据
let List = []
export default {
    getStatisticalData:() => {
        //Mock.Random.float产生随机数，在100-8000 保留小数 最小为0 最大为0
        //图标数据
        for(let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100,8000, 0, 0),
                    vivo: Mock.Random.float(100,8000, 0, 0),
                    oppo: Mock.Random.float(100,8000, 0, 0),
                    魅族: Mock.Random.float(100,8000, 0, 0),
                    三星: Mock.Random.float(100,8000, 0, 0),
                    小米: Mock.Random.float(100,8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                //饼图
                videoData: [
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '苹果',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1500
                    },
                    {
                        name: 'oppo',
                        value: 1999
                    },
                    {
                        name: '魅族',
                        value: 2200
                    },
                    {
                        name: '三星',
                        value: 4500
                    },
                ],
                //柱状图
                userData: [
                    {
                        data: '周一',
                        new: 10,
                        active: 500
                    },
                    {
                        data: '周二',
                        new: 12,
                        active: 550
                    },
                    {
                        data: '周三',
                        new: 60,
                        active: 800
                    },
                    {
                        data: '周四',
                        new: 65,
                        active: 550
                    },
                    {
                        data: '周五',
                        new: 53,
                        active: 770
                    },
                    {
                        data: '周六',
                        new: 33,
                        active: 180
                    },
                    {
                        data: '周日',
                        new: 5,
                        active: 200
                    },
                ],
                //折线图
                orderData: {
                    date: ['1111111', '2222222', '3333333', '4444444', '5555555', '6666666', '7777777'],
                    data: List
                },
                tableData: [
                    {
                        name: 'oppo',
                        todayBuy: 100,
                        monthBuy: 200,
                        totalBuy: 300
                    },
                    {
                        name: 'oppo2',
                        todayBuy: 100,
                        monthBuy: 200,
                        totalBuy: 300
                    },
                    {
                        name: 'oppo3',
                        todayBuy: 100,
                        monthBuy: 200,
                        totalBuy: 300
                    },
                    {
                        name: 'vive',
                        todayBuy: 100,
                        monthBuy: 200,
                        totalBuy: 300
                    },
                ],
            }
        }
    }
}
