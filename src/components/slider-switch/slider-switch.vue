<template>
  <div>
    <div class="slider-switch" v-if="!sliderDisable" @click="changeType">
      <label class="slider-switch-label">
        <span
          class="slider-switch-inner"
          :style="{ marginLeft: styleClass ? '0' : '-100%' }"
          data-on="ON"
          data-off="OFF"
        ></span>
        <span class="slider-switch-switch" :style="{ right: styleClass ? '0' : '30px' }"></span>
      </label>
    </div>
    <div class="slider-switch" v-else>
      <label class="slider-switch-label">
        <span
          class="slider-switch-inner"
          :style="{
            marginLeft: styleClass ? '0' : '-100%',
            cursor: 'not-allowed',
          }"
          data-on="ON"
          data-off="OFF"
        ></span>
        <span
          class="slider-switch-switch"
          :style="{ right: styleClass ? '0' : '30px', cursor: 'not-allowed' }"
        ></span>
      </label>
    </div>
  </div>
</template>
<script>
import SliderSwitch from './slider-switch.js'
export default SliderSwitch
</script>
<style scoped>
.slider-switch {
  position: relative;
  float: left;
  width: 50px;
  height: 23px;
  margin: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.slider-switch-checkbox {
  display: none;
}

.slider-switch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #999999;
  border-radius: 2px;
  height: 23px;
}

.slider-switch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}

.slider-switch-inner::before,
.slider-switch-inner::after {
  display: block;
  float: right;
  width: 50%;
  height: 23px;
  padding: 0;
  line-height: 23px;
  font-size: 12px;
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  /* -webkit-transform: scale(0.85); */
}

.slider-switch-inner::after {
  content: attr(data-on);
  padding-left: 6px;
  background-color: #00c1de;
  color: #ffffff;
  -webkit-transform: scale(0.85);
  margin-top: -3px;
  padding-top: 3px;
  margin-left: -9px;
  padding-left: 9px;
  width: 53px;
  height: 28px;
}

.slider-switch-inner::before {
  content: attr(data-off);
  padding-right: 2px;
  background: -webkit-linear-gradient(#ffffff, #ededed);
  color: #393744;
  text-align: right;
  -webkit-transform: scale(0.85);
  margin-top: -3px;
  padding-top: 3px;
  margin-right: -4px;
  padding-right: 4px;
  width: 51px;
  height: 28px;
}

.slider-switch-switch {
  position: absolute;
  display: block;
  width: 20px;
  height: 23px;
  background: -webkit-linear-gradient(#ffffff, #ededed);
  top: 0;
  bottom: 0;
  right: 30px;
  border: 1px solid #999999;
  border-radius: 2px;
  transition: all 0.3s ease-in 0s;
}

/* .slider-switch-checkbox:checked + .slider-switch-label .slider-switch-inner {
    margin-left: 0;
}
 
.slider-switch-checkbox:checked + .slider-switch-label .slider-switch-switch {
    right: 0px; 
} */
</style>
