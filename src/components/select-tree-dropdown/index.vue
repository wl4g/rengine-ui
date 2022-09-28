<template>
  <div class="select-tree-dropdown"   v-clickoutside="handleClose">
    <el-input @click.native.stop="toggleMenu" ref="reference" :disabled="disabled" :readonly="readonly"  :placeholder="placeholder" v-model="selectedLabel"></el-input>

    <div class="select-tree-dropdown-wrap"  :style="{minWidth: minWidth, top: inputHeight}"   v-show="visible">
      <div class="search-inp" v-if="filterable">
        <el-input
          class="tree-search-inp"
          size="small"
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          @input="runFilter"
          suffix-icon="el-icon-search">
        </el-input>
      </div>


      <el-tree
        class="select-tree-dropdown-tree"
        ref="tree"
        :data="treeData"
        :filter-node-method="filterNode"
        show-checkbox
        :expand-on-click-node="expandOnClickNode"
        :check-strictly="checkStrictly"
        :check-on-click-node="checkOnClickNode"
        :default-expand-all="defaultExpandAll"
        @check-change="handleCheckChange"
        @node-click="handleNodeClick"
        :node-key="nodeKey"
        :props="treeProps">
      </el-tree>
    </div>

  </div>
</template>

<script>
  import ResizeObserver from 'resize-observer-polyfill';
  import Clickoutside from './clickoutside';

  const resizeHandler = function(entries) {
    for (let entry of entries) {
      const listeners = entry.target.__resizeListeners__ || [];
      if (listeners.length) {
        listeners.forEach(fn => {
          fn();
        });
      }
    }
  };

  const addResizeListener = function(element, fn) {
    if (!element.__resizeListeners__) {
      element.__resizeListeners__ = [];
      element.__ro__ = new ResizeObserver(resizeHandler);
      element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
  };

  const removeResizeListener = function(element, fn) {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.__ro__.disconnect();
    }
  };

export default {
  name: 'selectTreeDropdown',
  directives: { Clickoutside },
  props: {
    readonly: Boolean,
    disabled: Boolean,
    filterable: Boolean,
    placeholder: {
      type: String,
      default() {
        return '请选择';
      }
    },
    value: {
      required: true
    },
    multiple: {
      type: Boolean,
      default() {
        return false;
      }
    },
    checkOnClickNode: {
      type: Boolean,
      default: true
    },
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: true
    },
    nodeKey: {
      type: String,
      default() {
        return 'id';
      }
    },
    defaultExpandAll: Boolean,        //如果需要设置默认值，defaultExpandAll必须为true
    checkedKeys: {
      type: Array,
      default() {
        return  [];
      }
    },
    treeData: Array,
    treeProps: {
      type: Object,
      default: {
        children: 'childNode',
        label: 'networkName'
      }
    }
  },
  data () {
    return {
      visible: false,
      inputHeight: '',
      minWidth: '',
      selectedId: '',
      filterText: '',
    }
  },
  watch:{
    visible(newValue,value){
      if(!newValue){
        if(this.$parent && this.$parent.$options.componentName === 'ElFormItem'){
          this.$parent.validate('change');
        }
      }
    },
    checkedKeys(newValue, oldValue){
      this.selectedId = '';
      this.$refs.tree.setCheckedKeys(newValue)
    },
  },
  computed: {
    selectedLabel(){
      return this.value;
    }
  },
  mounted() {
    addResizeListener(this.$el, this.handleResize);

    if(this.checkedKeys.length){
      this.$refs.tree.setCheckedKeys(this.checkedKeys)
    }
  },
  beforeDestroy(){
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
  },
  methods: {
    toggleMenu() {
      if(this.disabled){
        return
      }
      this.visible = !this.visible;
    },
    handleClose() {
      this.visible = false;
    },

    handleResize(){
      this.inputHeight = this.$refs.reference.$el.getBoundingClientRect().height + 'px'
      this.minWidth = this.$refs.reference.$el.getBoundingClientRect().width + 'px';
    },

    runFilter(val){
      this.$refs.tree.filter(val);
    },

    filterNode(value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    },

    handleCheckChange(data, checked, indeterminate) {
      let checkedKeys = this.$refs.tree.getCheckedKeys() || [];

      //多选
      if (this.multiple) {
        this.$emit('check-change', this.$refs.tree.getCheckedNodes())
      } else {
        if (checkedKeys.length > 1 && this.selectedId) {
          this.selectedId = data[this.nodeKey];
          this.$emit('check-change', data);
          this.$refs.tree.setCheckedKeys([data[this.nodeKey]]);
        } else if (!!checked) {
          if (!this.selectedId) {
            this.selectedId = data[this.nodeKey];
            this.$emit('check-change', data)
          }
        } else {
          if (data[this.nodeKey] === this.selectedId) {
            this.selectedId = '';
            this.$emit('check-change', {})
          }
        }
      }
    },
    handleNodeClick(data){
      this.$emit('node-click', data)
    },
    reset() {
      this.selectedId = '';
      this.$refs.tree.setCheckedKeys([]);
    },
  }
}
</script>

<style scoped lang='less'>
  .select-tree-dropdown {
    position: relative;
  }
  .select-tree-dropdown-wrap {
    position: absolute;
    left: 0;
    z-index: 5000;
    background: #fff;
    border: 1px solid #d1dbe5;
  }
  .select-tree-dropdown-tree {
    min-height: 120px;
    max-height: 300px;
    overflow: auto;
    cursor: default;
  }
  .search-inp {
    padding: 8px;
    box-sizing: border-box;
  }



</style>

<style>
  .el-form-item.is-error .tree-search-inp .el-input__inner{
    border-color: #DCDFE6;
  }
  .el-form-item.is-error .tree-search-inp .el-input__inner:focus {
    border-color: #409EFF;
  }
</style>
