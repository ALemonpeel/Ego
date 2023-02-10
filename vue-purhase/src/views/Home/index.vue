<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        {{ $t('home.totalmoney') }}
        <div class='num'>{{ list.payTotal | num }}</div>
        <div class="bottom">今日{{ listTitle[0]}}:{{ list.pay | num }}</div>
      </div>
      <div class="item">
        {{ $t('home.totalviews') }}
        <div class='num'>{{ list.saleTotal | num }}</div>
        <div class="bottom">今日{{ listTitle[1]}}：{{ list.sale | num }}</div>
      </div>
      <div class="item">{{ listTitle[2]}}
        <div class='num'>{{ list.viewsTotal | num }}</div>
        <div class="bottom">今日{{ listTitle[2]}}：{{ list.views | num }}</div>
      </div>
      <div class="item">{{ listTitle[3]}}
        <div class='num'>{{ list.collectTotal | num }}</div>
        <div class="bottom">今日{{ listTitle[3]}}：{{ list.collect | num }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id='box13'>
        <div class="title">月销售额</div>
        <div id="main" style="width: 100%; height: 300px">
        </div>
      </div>
      <div class="area" id="box1">
        销售比例
        <div id="main2" style="width: 100%; height: 300px"></div>
      </div>
    </div>


    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ infoData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{
                infoData.curCollect
              }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{
                infoData.curMoney
              }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ infoData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{
                infoData.orderCount
              }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{
                infoData.money
              }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      //储存信息
      list: {},
      listTitle: ['销售额', '访问量', '收藏量', '支付量'],
      //销售额信息
      infoData: {}
    }

  },
  filters: {
    num(val) {
      if (!val) return '';
      return val.toLocaleString();
    }
  },
  mounted() {
    //获取顶部统计信息
    this.getHomeCount();
    //获取折线图数据
    this.getHomeFormat();
    // //绘制折线图方法
    // this.line();
    // //绘制饼图
    // this.pie();
    //获取订单数据
    this.getHomeOrder()
  },
  methods: {
    //获取顶部信息
    async getHomeCount() {
      let res = await this.$api.getHomeCount().then(res => {
        this.list = res.data.data.list;
      })
    },
    //绘制折线图数据
    async getHomeFormat() {
      let res = await this.$api.getHomeFormat().then(res => {
        let arr = res.data.result.data.sale_money
        // console.log(res.data.result.data.sale_money);
        //声明变量获取x轴Y轴的数据
        let xData = [], yData = [], yBearData = []
        //获取对象结构的存储数组
        let pieData = []
        arr.forEach(ele => {
          xData.push(ele.name)
          yData.push(ele.total_amount)
          yBearData.push(ele.num)
          let obj = {}
          obj.name = ele.name;
          obj.value = ele.num;
          pieData.push(obj)
        });
        //绘制折线图--动态数据
        this.line(xData, yData, yBearData)
        //绘制饼图  --动态数据  ---[{name:'',value:''},{},{}]
        this.pie(pieData)
      })
    },
    //订单数据
    async getHomeOrder() {
      let res = await this.$api.getHomeOrder().then(res => {
        console.log(res.data);
        this.infoData = res.data.list
        console.log(this.info);
      })
    },
    //绘制折线图
    line(xData, yData, yBearData) {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          data: ['销售额', '销售量']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销售额',
            data: yData,
            type: 'line',
            smooth: true
          },
          {
            name: '销售量',
            data: yBearData,
            type: 'bar',
            smooth: true
          }
        ]
      };

      option && myChart.setOption(option);
    },
    //绘制饼图
    pie(pieData) {
      var chartDom = document.getElementById('main2');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '销售额',
            type: 'pie',
            radius: [50, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: pieData,
          }
        ]
      };

      option && myChart.setOption(option);

    }

  }
}
</script>

<style lang="less" scoped>
.home {
  margin: 10px;
}

.header {
  display: flex;
  padding-right: 30px;

  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;

    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }

    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }

  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }

  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }

  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }

  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }

  .item {
    text-align: center;
    font-size: 14px;

    .title {
      margin-bottom: 10px;
    }
  }
}
</style>