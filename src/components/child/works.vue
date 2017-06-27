<template lang="html">
<div id="the-view">
  <el-input
    class="work-input"
    type="text"
    :maxlength="100"
    placeholder="请输入作品链接"
    v-model="form.link"
    @blur="setWorks">
  </el-input>
  <i
    @click="delwork"
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
        link: this.link,
      },
      w: {
        link: '',
      },
      d: {
        id: '',
      }
    }
  },
  props:[
    'id',
    'link',
    'del'
  ],
  watch: {
    id(val) {
      this.form.id = val
    },
    link(val) {
      this.form.link = val
    }
  },
  methods: {
    setWorks(){
      const the = this.$store
      if (this.form.id === '' && this.form.link != '') {
        this.w.link = this.form.link;
        axios({
            method: 'post',
            url: '/user/' + localStorage.uid + '/works',
            data: this.w,
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
      else if (this.form.id != '' && this.form.link != '') {
        axios({
            method: 'patch',
            url: '/user/' + localStorage.uid + '/works',
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
    },

    delwork(){
      if (this.form.link != '') {
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
      else if (this.form.id != '' && this.form.link === '') {
        this.theDel()
        this.$emit('remove')
      }else{
        this.$emit('remove')
      }
    },

    theDel(){
      this.d.id = this.form.id;
      axios({
          method: 'delete',
          url: '/user/' + localStorage.uid + '/works',
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
        console.log(res);
      })
      .catch(function(err){
        Message.error("数据上传失败，请重试"),
        console.log(err);
      });
    }
  },
  components:{
        Message,
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
