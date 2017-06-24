<template lang="html">
  <div id="setpass">
    <p class="tips">
      请输入6-18位密码
    </p>
    <el-input
      autofocus
      id="set-pass"
      type="password"
      v-model.lazy="pass.set"
      :minlength="6"
      :maxlength="18"
      placeholder="请输入新密码"
      auto-complete="off">
    </el-input>
    <el-input
      id="confirm-pass"
      type="password"
      v-model.lazy="pass.conf"
      :minlength="6"
      :maxlength="18"
      placeholder="请重新输入密码"
      @blur="check"
      auto-complete="off">
    </el-input>
    <el-button
      @click="setnewpass"
      class="button"
      type="primary">
      确认
    </el-button>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import axios from 'axios'

export default {
  data() {
    return {
      pass: {
        set: '',
        conf: ''
      },
    }
  },
  methods: {
    check(){
      if (0 < this.pass.set.length && this.pass.set.length < 6) {
        Message.error("请输入6位或6位以上的密码")
      }
      else if (this.pass.set !== this.pass.conf) {
        Message.error("两次输入密码不相同")
      }
    },
    setnewpass(){
      const the = this;
      if (this.pass.set === this.pass.conf && this.pass.conf.length >= 6) {
        this.$store.dispatch('setpass',this.pass.conf)
        axios({
            method: 'post',
            url: '/setpass',
            data: the.$store.state.user.user,
            transformRequest: [function (data) {
              var ret = JSON.stringify(data);
              return ret
            }],
            headers:{"Content-Type": "application/json",
            token: the.$store.state.user.token,
          },
            timeout: 5000,
        })
        .then(function(response){
          if (response.data.setpassword === "success") {
            Message.success('修改成功'),
            the.$router.push('/');
          }
          else if (response.data.error.code === "password_had_been_reset") {
            Message.error('账户密码已重置过'),
            the.$router.push('/');
          }else{
            Message.error('重置密码失败，请重试');
          }
        })
        .catch(function (error) {
          Message.error('服务器出错，请稍后重试');
          console.log(error);
        })
      }
      else if (0 < this.pass.set.length && this.pass.set.length < 6) {
        Message.error("请输入6位或6位以上的密码")
      }
      else if (this.pass.set !== this.pass.conf) {
        Message.error("两次输入密码不相同")
      }else {
        Message.info('请设置新密码')
      }
    },
  },
  components:{
        Message
  }
}
</script>

<style lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

.el-input
  font-size: pxTorem(16)

.el-input__inner
  border-radius: pxTorem(2)
  padding: pxTorem(3) pxTorem(10)
  height: pxTorem(50)

.el-message
  min-width: pxTorem(300)
  top: pxTorem(20)
</style>

<style scoped lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

#setpass
  position: absolute
  background-color: #F0F0F0
  height: 100%
  width: 100%
  overflow: hidden
  background-size: cover

.tips
  position: relative
  margin-top: pxTorem(50)
  margin-left: pxTorem(32)
  font-size: pxTorem(14)
  color: #868686

#set-pass
  display: block
  width: pxTorem(314)
  margin-top: pxTorem(5)
  margin-left: pxTorem(-157)
  left: 50%

#confirm-pass
  display: block
  width: pxTorem(314)
  margin-top: pxTorem(10)
  margin-left: pxTorem(-157)
  left: 50%

.button
  display: block
  position: relative
  height: pxTorem(38)
  width: pxTorem(314)
  margin-top: pxTorem(46)
  margin-left: pxTorem(-157)
  left: 50%
  font-size: pxTorem(16)

</style>
