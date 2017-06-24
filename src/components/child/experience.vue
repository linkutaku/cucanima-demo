<template lang="html">
<div id="the-view">
<el-form
  id="theForm"
  ref="form"
  label-position="top"
  :model="form">
  <el-form-item
    label="时间范围">
    <el-col :span="11">
      <el-date-picker
        type="month"
        format="yyyy.MM"
        placeholder="开始"
        v-model="form.startime"
        style="width: 100%;"
        @change="ruleDate">
      </el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-date-picker
        type="month"
        format="yyyy.MM"
        placeholder="结束"
        v-model="form.endtime"
        style="width: 100%;"
        @change="ruleDate">
      </el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item
    :label="theLabel">
    <el-input
      :maxlength="14"
      v-model="form.content">
    </el-input>
  </el-form-item>
</el-form>
<i
  @click="del"
  class="el-icon-circle-cross">
</i>
</div>
</template>

<script>
import { Message } from 'element-ui';

export default {
  data() {
    return {
      form: {
        id: this.id,
        startime: this.startime,
        endtime: this.endtime,
        content:this.content,
      }
    }
  },
  watch: {
  },
  props:[
    'theLabel',
    'id',
    'startime',
    'endtime',
    'content'
  ],
  methods: {
    ruleDate(){
      if (this.form.startime>=this.form.endtime&&this.form.endtime!='') {
        Message.info("请选择正确时间范围",0);
        this.form.startime = this.form.endtime = ''
      }
    },
    del(){
      if (this.form.content!='') {
        this.$confirm('是否删除内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$emit('remove')
        }).catch(() => {
        });
      }else {
        this.$emit('remove')
      }
    }
  },
  computed:{
  },
  components:{
        Message,
  }
}
</script>

<style lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

.el-form-item__label
  width: 100%
  font-size: pxTorem(16)
  padding-bottom: 0 !important

.el-form-item__content
  line-height: pxTorem(42)
  font-size: pxTorem(16)
  div
    margin-bottom: 0
  .el-input__inner
    border-radius: pxTorem(2)
    height: pxTorem(42)
    padding: pxTorem(3) pxTorem(10)

.el-input__inner
  border-radius: pxTorem(2)
  height: pxTorem(42)
  padding: pxTorem(3) pxTorem(10)

.el-input
  font-size: pxTorem(16)

.el-input__icon
  width: pxTorem(35)

.el-message-box
  width: pxTorem(250)

.el-message-box__title
  float: left

.el-message-box__close
  float: right

.el-message-box__content
  margin-top: pxTorem(20)

.el-message
  min-width: pxTorem(300)
  top: pxTorem(20)
</style>

<style scoped lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

#the-view
  width: 100%
  text-align: center
  display: flex
  justify-content: center
  align-items: flex-start
  margin-bottom: pxTorem(20)

#theForm
  width: pxTorem(298)
  margin-right: pxTorem(17)
  div
    margin-bottom: 0

.el-icon-circle-cross
  margin-top: pxTorem(24)
  font-size: pxTorem(22)
  color: rgb(190, 157, 151)

.el-icon-circle-cross:active
  content: ""
  background-color: hsla(190,80%,80%,0.5)

.line
  line-height: pxTorem(42)
</style>
