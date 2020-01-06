<template>
  <div class='home'>
    <a-card
      class="home-card"
      title="商品总量"
      style="width: 250px"
    >
      <a-statistic
        value={1128163}
        suffix="个"
        style="fontWeight: 'bolder'"
      />
      <a-statistic
        value={15}
        Style="fontSize: 15"
        prefix='周同比'
    />
    <a-statistic
      value={10}
      Style="fontSize: 15"
      prefix='日同比'
      />
    </a-card>
    <Line/>
  <!--  <a-card class="home-content">
      <a-card
        class="home-table-left"
      >
&lt;!&ndash;        <Bar/>&ndash;&gt;
      </a-card>
      <a-card title='任务'  class="home-table-right">
       <a-timeline>
      <a-timeline-item color="green">新版本迭代会</a-timeline-item>
      <a-timeline-item color="green">完成网站设计初版</a-timeline-item>
      <a-timeline-item color="red">
        <p>联调接口</p>
        <p>功能验收</p>
      </a-timeline-item>
      <a-timeline-item>
        <p>登录功能设计</p>
        <p>权限验证</p>
        <p>页面排版</p>
      </a-timeline-item>
    </a-timeline>
      </a-card>
    </a-card>-->
  </div>
</template>

<script>
import { Card, Statistic } from 'ant-design-vue'
export default {
  components: {
    // AIcon: Icon,
    ACard: Card,
    AStatistic: Statistic
    // ADatePicker: DatePicker,
    // ATimeline: Timeline,
    // ATimelineItem: Timeline.Item
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .home {
    margin: 20px;
    padding: 24px;
    background: #fff;
    min-height: 100%;
    .home-card {
      float: left;
    }
    .home-content {
      position: absolute;
      top: 420px;
      width: 76%;
      border: 1px solid #e8e8e8;
      .home-menu {
        font-size: 20px;
        span {
          cursor: pointer;
        }
        .home-menu-active {
          border-bottom: 2px solid #1DA57A;
          color: #1DA57A;
          padding: 0 0 16px 0;
        }
        .home-menu-visited {
          margin-right: 40px;
        }
      }
      .home-table-left {
        float: left;
        width: 60%;
      }
      .home-table-right {
        float: right;
        width: 330px;
      }
    }
  }

</style>
