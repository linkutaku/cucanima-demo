<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

*
  margin: 0
  padding: 0
  box-sizing: border-box

body
  position: absolute
  height: 100%
  width: 100%

.el-input
  font-size: pxTorem(16)

.el-input__inner
  border-radius: pxTorem(2)
  padding: pxTorem(3) pxTorem(10)
  height: pxTorem(50)

.el-message
  min-width: pxTorem(300)
  top: pxTorem(20)
</style>
