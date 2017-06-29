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
        :editable='false'
        format="yyyy.MM"
        placeholder="开始"
        v-model="form.starttime"
        style="width: 100%;"
        @change="ruleDate">
      </el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-date-picker
        type="month"
        :editable='false'
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
      v-model="form.content"
      @blur="setExp">
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
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      form: {
        id: this.id,
        starttime: this.starttime,
        endtime: this.endtime,
        content:this.content,
      },
      d: {
        starttime: '',
        endtime: '',
        content: ''
      },
      i: {
        id: ''
      },
    }
  },
  watch: {
    id(val) {
      this.form.id = val
    },
    starttime(val) {
      this.form.starttime = val
    },
    endtime(val) {
      this.form.endtime = val
    },
    content(val) {
      this.form.content = val
    },

  },
  props:[
    'theLabel',
    'theType',
    'id',
    'starttime',
    'endtime',
    'content'
  ],
  methods: {
    ruleDate(){
      var st = Number(this.fixDate(this.form.starttime));
      var et = Number(this.fixDate(this.form.endtime));
      if (st >= et && this.form.endtime != '') {
        Message.warning("请选择正确时间范围"),
        this.form.starttime = this.form.endtime = ''
        this.d.starttime = this.d.endtime = ''
      }
      if (st < et && this.form.endtime != '' && this.form.starttime != '') {
        this.d.starttime = this.fixDate(this.form.starttime),
        this.d.endtime = this.fixDate(this.form.endtime),
        this.setExp();
      }
    },
    setExp(){
      if (this.form.content != '' && (this.form.starttime === '' || this.form.endtime === '')) {
        Message.info("请选择时间范围")
      }
      else if (this.form.id === '' && this.form.content != '') {
        this.d.content = this.form.content,
        this.thePost(this.theType);
      }
      else if (this.form.id != '' && this.form.content != '') {
        this.thePatch(this.theType);
      }
    },

    del(){
      if (this.form.content!='') {
        this.$confirm('是否删除内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Message.success("删除成功!");
          this.$emit('remove')
          this.theDel(this.theType)
        }).catch(() => {
        });
      }
      else if (this.form.id != '' && this.form.content === '') {
        this.$emit('remove')
        this.theDel(this.theType)
      }else {
        this.$emit('remove')
      }
    },

    thePost(type){
      const the = this.$store
      axios({
          method: 'post',
          url: '/user/' + localStorage.uid + '/' + type,
          data: this.d,
          transformRequest: [function (data) {
            var ret = JSON.stringify(data);
            return ret
          }],
          headers:{"Content-Type": "application/json",
          token: this.$store.state.user.token,
        },
      })
      .then(function(res){
        the.dispatch('baseinfo'),
        console.log(res);
      })
      .catch(function(err){
        Message.error("数据上传失败，请重试"),
        console.log(err);
      });
    },

    thePatch(type){
      this.form.starttime = this.fixDate(this.form.starttime),
      this.form.endtime = this.fixDate(this.form.endtime),
      axios({
          method: 'patch',
          url: '/user/' + localStorage.uid + '/' + type,
          data: this.form,
          transformRequest: [function (data) {
            var ret = JSON.stringify(data);
            return ret
          }],
          headers:{"Content-Type": "application/json",
          token: this.$store.state.user.token,
        },
      })
      .then(function(res){
        console.log(res);
      })
      .catch(function(err){
        Message.error("数据上传失败，请重试"),
        console.log(err);
      });
    },

    theDel(type){
      this.i.id = this.form.id;
      axios({
          method: 'delete',
          url: '/user/' + localStorage.uid + '/' + type,
          data: this.i,
          transformRequest: [function (data) {
            var ret = JSON.stringify(data);
            return ret
          }],
          headers:{"Content-Type": "application/json",
          token: this.$store.state.user.token,
        },
      })
      .then(function(res){
        console.log(res);
      })
      .catch(function(err){
        Message.error("数据上传失败，请重试"),
        console.log(err);
      });
    },

    fixDate(date){
      if (typeof(date) != 'string' && date != undefined) {
        date.setDate(date.getDate()+1);
        date = date.toJSON().slice(0, 7).split( "-" ).join( "." );
        return date
      }else {
        return date
      }
    },
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
