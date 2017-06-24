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
</style>
