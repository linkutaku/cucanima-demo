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
import axios from 'axios'

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
        info:{
          area: this.varea,
          home: this.vhome,
          email: this.vmail,
          wechat: this.vwechat,
        },
      }
    },
  props:[
    'theType',
    'value',
    'placeholder',
    'label',
    'varea',
    'vhome',
    'vmail',
    'vwechat',
  ],

  watch: {
    value(val) {
      this.theValue = val
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
    sethome(){
      const the = this;
      if (this.theType === "area") {
        this.info.area = this.theValue;
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
      }else if (this.theType === "home") {
        this.info.home = this.theValue;
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
    },
  },
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
