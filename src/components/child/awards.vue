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
        :editable='false'
        format="yyyy.MM"
        placeholder="时间"
        v-model="form.time"
        style="width: 100%;"
        @change="setAward">
      </el-date-picker>
    </el-form-item>
    <el-form-item
      label="具体奖项">
      <el-input
        :maxlength="20"
        v-model="form.content"
        @blur="setAward">
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
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      form: {
        id: this.id,
        time: this.time,
        content:this.content,
      },
      aw: {
        time: '',
        content: ''
      },
      i:{
        id: ''
      }
    }
  },
  props:[
    'id',
    'time',
    'content'
  ],
  watch: {
    id(val) {
      this.form.id = val
    },
    time(val) {
      this.form.time = val
    },
    content(val) {
      this.form.content = val
    },
  },
  methods: {
    setAward(){
      const the = this.$store
      if (this.form.content != '' && this.form.time === '') {
        Message.info("请选择时间")
      }
      else if (this.form.content != '' && this.form.time != '') {
        if (this.form.id === '') {
          this.aw.time = this.fixDate(this.form.time);
          this.aw.content = this.form.content;
          axios({
              method: 'post',
              url: '/user/' + localStorage.uid + '/award',
              data: this.aw,
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
        }
        else if (this.form.id != '')
        {
          this.form.time = this.fixDate(this.form.time);
          axios({
              method: 'patch',
              url: '/user/' + localStorage.uid + '/award',
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
        }
      }
    },

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
          this.theDel()
        }).catch(() => {
        });
      }
      else if (this.form.id != '' && this.form.content=== '') {
        this.theDel()
        this.$emit('remove')
      }else{
        this.$emit('remove')
      }
    },

    theDel(){
      this.i.id = this.form.id;
      axios({
          method: 'delete',
          url: '/user/' + localStorage.uid + '/award',
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
  components:{
        Message,
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
