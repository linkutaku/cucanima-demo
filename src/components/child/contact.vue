<template lang="html">
<el-form
  id="baseinfo"
  label-position="top">
  <el-form-item
    class="baseinput"
    :label="title">
    <el-input
      class="baseinput"
      :placeholder="placeholder"
      v-model="content"
      :maxlength="length"
      @blur="setcont">
    </el-input>
  </el-form-item>
</el-form>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      content: this.cont,
      info:{
        types: '',
        value: ''
      },
    }
  },
  props:[
    'cont',
    'theType',
    'placeholder',
    'length',
    'title',
  ],
  watch: {
    cont(val) {
      this.content = val
    },
  },
  methods: {
    setcont(){
      this.info.types = this.theType,
      this.info.value = this.content,
      this.$store.dispatch('getinfo',this.info)
      .then(()=>{
        this.$store.dispatch('updateinfo')
      })
    }
  },
  components:{
        Message,
  }
}
</script>

<style scoped lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

#baseinfo
  position: relative

.baseinput
  width: pxTorem(340)
  margin: auto

.tip
  width: pxTorem(48)
  text-align: left


</style>
