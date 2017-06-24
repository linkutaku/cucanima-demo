<template lang="html">
<div id="the-view">
  <el-input
    class="work-input"
    type="text"
    :maxlength="100"
    placeholder="请输入作品链接"
    v-model="form.link">
  </el-input>
  <i
    @click="delwork"
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
        link: this.link,
      },
    }
  },
  props:[
    'id',
    'link',
    'del'
  ],
  methods: {
    delwork(){
      if (this.form.link!='') {
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

<style lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

.el-input__inner
  border-radius: pxTorem(2)
  height: pxTorem(42)
  padding: pxTorem(3) pxTorem(10)
</style>

<style scoped lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

#the-view
  width: 100%
  text-align: center
  display: flex
  justify-content: center
  align-items: center
  margin-bottom: pxTorem(20)

.work-input
  margin-right: pxTorem(17)
  width: pxTorem(298)

.el-icon-circle-cross
  font-size: pxTorem(22)
  color: rgb(190, 157, 151)

.el-icon-circle-cross:active
  content: ""
  background-color: hsla(190,80%,80%,0.5)
</style>
