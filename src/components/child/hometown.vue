<template lang="html">
<el-form
  id="home-town"
  label-position="top"
  label-width="80px">
  <el-form-item
    class="home-select"
    :label="label">
    <el-select
      class="home-select"
      v-model="theValue"
      filterable
      :placeholder="placeholder"
      @visible-change="sethome">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
  </el-form-item>
</el-form>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
      return {
        options: [{
          value: '北京',
          label: '北京'
        }, {
          value: '上海',
          label: '上海'
        }, {
          value: '南京',
          label: '南京'
        }, {
          value: '成都',
          label: '成都'
        }, {
          value: '深圳',
          label: '深圳'
        }, {
          value: '广州',
          label: '广州'
        }],
        theValue: this.value,
        info: {
          types: '',
          value: ''
        },
      }
    },
  props:[
    'theType',
    'value',
    'placeholder',
    'label',
  ],

  watch: {
    value(val) {
      this.theValue = val
    },
  },
  methods: {
    sethome(){
      this.info.types = this.theType,
      this.info.value = this.theValue,
      this.$store.dispatch('getinfo',this.info)
      .then(()=>{
        this.$store.dispatch('updateinfo')
      })
    },
  },
  components:{
        Message,
  }
}
</script>

<style lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

.el-select-dropdown__item
  font-size: pxTorem(16)
  height: pxTorem(42)

.el-form-item
  margin-bottom: 0
</style>

<style scoped lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

#home-town
  display: inline-block
  width: pxTorem(164)
  position: relative

</style>
