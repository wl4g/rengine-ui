<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header_text">运行状态</span>
      </div>
      <div class="card_content">
        <el-card v-for="item in workingStatusList" :key="item.name" class="text item">
          <div>
            <div class="text_name">{{item.name}}：</div>
            <div class="text_num">{{item.num}}</div>
          </div>
        </el-card>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header_text">运行列表</span>
      </div>
      <div class="cardList_content">
        <el-card v-for="item in runningList" :key="item.name" :body-style="{ padding: '12px' }" class="cardList_card">
          <div class="cardList-body">
            <div class="cardList-body-left">
              <div class="">{{item.name}}：</div>
              <div class="cardList-body-left-bottom">
                <div>id：#{{item.num}}</div>
                <div>{{item.account}}</div>
              </div>
            </div>
            <div class="cardList-body-right">
              <div>{{item.type == 1? "运行中":"暂停"}}</div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>

</template>

<script>
import Home from "./home.js";
export default Home
</script>

<style scoped>
.text {
  width: 24%;
}
.text_name {
  font-size: 16px;
}
.text_num {
  width: 100%;
  text-align: center;
  font-size: 22px;
  line-height: 36px;
  height: 36px;
}

.header_text {
  font-size: 16px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 12px;
}
.card_content {
  display: flex;
  justify-content: space-around;
}
.cardList_card {
  margin-bottom: 12px;
}
.cardList-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cardList-body-left {
  display: flex;
  flex-direction: column;
}
.cardList-body-left-bottom {
  display: flex;
}
.cardList-body-left-bottom div {
  padding-left: 12px;
}
</style>