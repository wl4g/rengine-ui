<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsData" :key="item.name" :label="item.labelName" :name="item.name">
        <keep-alive>
          <component :is="currentTabComponent" :loginEventId="loginEventId" :content="content"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Authentcation from "./authentcation.js"

export default Authentcation
</script>