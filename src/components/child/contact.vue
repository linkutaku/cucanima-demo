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
import axios from 'axios'

export default {
  data() {
    return {
      content: this.cont,
      info:{
        area: this.varea,
        home: this.vhome,
        email: this.vmail,
        wechat: this.vwechat,
      },
    }
  },
  props:[
    'cont',
    'theType',
    'placeholder',
    'length',
    'title',
    'varea',
    'vhome',
    'vmail',
    'vwechat',
  ],
  watch: {
    cont(val) {
      this.content = val
    },
    varea(val){
      this.info.area = val
    },
    vhome(val){
      this.info.home = val
    },
    vmail(val){
      this.info.email = val
    },
    vwechat(val){
      this.info.wechat = val
    },
  },
  methods: {
    setcont(){
      const the = this;
      if (this.theType === "mail") {
        this.info.email = this.content;
        axios({
            method: 'patch',
            url: '/user/'+ localStorage.uid,
            data: this.info,
            transformRequest: [function (data) {
              var ret = JSON.stringify(data);
              return ret
            }],
            headers:{"Content-Type": "application/json",
            token: the.$store.state.user.token,
          },
        })
        .then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        });
      }else if (this.theType === "wechat") {
        this.info.wechat = this.content;
        axios({
            method: 'patch',
            url: '/user/'+ localStorage.uid,
            data: this.info,
            transformRequest: [function (data) {
              var ret = JSON.stringify(data);
              return ret
            }],
            headers:{"Content-Type": "application/json",
            token: the.$store.state.user.token,
          },
        })
        .then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        });
      }
    }
  },
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
