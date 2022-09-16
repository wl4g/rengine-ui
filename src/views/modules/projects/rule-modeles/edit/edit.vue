<template>
  <div class="body">
    <MyEditor class="MyEditor" :language="'javascript'" :showTheme="true" :codes="sqlCodes" @onMounted="sqlOnMounted" @onCodeChange="sqlOnCodeChange" />
  </div>
</template>

<script>
import ruletemplatesEdit from "./edit.js"
export default ruletemplatesEdit
</script>

<style scpoed>
.body {
  width: 100%;
  height: 89vh;
}
.body .MyEditor {
  width: 100%;
  height: 85vh;
}
</style>