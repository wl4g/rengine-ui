<template>
  <div>
    <el-popover transition="transition:all 0.25s ease-in-out 0s;" ref="centerSwitch" trigger="click" :visible-arrow="true" popper-class="organization-popover centerSwitch">
      <div style="width:1150px;height:580px;">
        <div class="title-center">
          <p>组织架构图 :</p>
          <p>
            <span style="font-size: 15px;color: green">* </span>
            <span>{{current}}</span>
          </p>
        </div>
        <div id="organization_container"></div>
        <div style="float:right;width:525px;height:400px;">
          <div class="card" style="height: calc(100% - 36px); overflow: auto;">
            <el-form style="height:100%" ref="fromData" label-position="left" label-width="auto" :model="formFields" class="orgForm">
              <el-form-item label="组织类型：" prop="switchingroomname">
                <el-select v-model="formFields.switchingroomname" collapse-tags placeholder="请选择">
                  <el-option label="组织" :value="0"></el-option>
                  <el-option label="公司" :value="1"></el-option>
                  <el-option label="部门" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="组织名称：" prop="sename">
                <select-tree-dropdown placeholder="单击展开组织树" readonly filterable default-expand-all v-model="formFields.sename" :treeData="selectGardenTreeData.list" :treeProps="selectGardenTreeData.defaultProps" :node-key="selectGardenTreeData.nodeKey" :checkedKeys="selectGardenTreeData.checkedKeys" @check-change="gardenCheckChange">
                </select-tree-dropdown>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-popover>

    <el-button v-popover:centerSwitch class="organization-popover-button" plain>
      <i v-if="currentOrganization.type==1" class="cs-i" style="background-color: red;">组织</i>
      <i v-if="currentOrganization.type==2" class="cs-i" style="background-color: blue;">公司</i>
      <i v-if="currentOrganization.type==3" class="cs-i" style="background-color: #4dff64;">部门</i>
      <!--<span >{{current}}</span>-->
      <span :title="current" class="text-shenglue" style="margin-left: 4px">{{subCurrent()}}</span>
      <i class="el-icon-caret-bottom"></i>
    </el-button>
  </div>
</template>

<script>
import OrganizationPanel from './OrganizationPanel.js'

export default OrganizationPanel
</script>

<style lang="less" scoped>
.cs-i {
  font-style: normal;
  color: white;
  float: left;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
}

.cs-area {
  padding-left: 6px;
  float: left;
  width: 100%;
  height: 110px;
  border: 0;
  margin-top: 10px;

  span {
    margin-right: 6px;
    float: left;
    line-height: 24px;
    width: 110px;
    text-align: left;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.centerSwitch {
  top: 42px !important;
}

.organization-popover .cs-area span:hover {
  color: #0b86f3;
}

.organization-popover .cs-area span {
  color: #f3f1ed;
}

.organization-popover-button {
  margin-top: 2px;
  border: 0;
  line-height: 32px;
}

.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #c71f1f;
}
</style>
