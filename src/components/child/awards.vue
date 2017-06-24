<template lang="html">
<div id="the-view">
  <el-form
    id="theForm"
    ref="form"
    label-position="top"
    :model="form">
    <el-form-item
      label="获奖时间">
      <el-date-picker
        type="month"
        format="yyyy.MM"
        placeholder="时间"
        v-model="form.time"
        style="width: 100%;">
      </el-date-picker>
    </el-form-item>
    <el-form-item
      label="具体奖项">
      <el-input
        :maxlength="20"
        v-model="form.content">
      </el-input>
    </el-form-item>
  </el-form>
  <i
    @click="delaward"
    class="el-icon-circle-cross">
  </i>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: this.id,
        time: this.time,
        content:this.content,
      }
    }
  },
  props:[
    'id',
    'time',
    'content'
  ],
  methods: {
    delaward(){
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
  }
}
</script>

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
</style>
