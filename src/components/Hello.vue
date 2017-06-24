<template lang="html">
  <div id="login">
    <img class="logo" src="../assets/login/loginlogo.png">
    <el-input
      autofocus
      id="id-input"
      v-model.lazy="input.userid"
      :maxlength="12"
      placeholder="请输入学号">
    </el-input>
    <el-input
      id="password-input"
      type="password"
      v-model.lazy="input.pass"
      :maxlength="18"
      placeholder="请输入密码"
      auto-complete="off">
    </el-input>
    <el-button
      @click="login"
      class="button"
      type="primary">
      登录
    </el-button>
    <!-- <div class="findpassword">
      <router-link class="findtype" to="">
        找回密码
      </router-link>
    </div> -->
  </div>
</template>

<script>
import { Message } from 'element-ui';
import axios from 'axios'

export default {
  data() {
    return {
      input: {
        userid: '',
        pass: ''
      },
    }
  },

  methods: {
    login(){
      const the = this;
        this.$store.dispatch('login',this.input)
        if (this.input.userid == '') {
          Message.info('请输入学号');
        }
        else if (this.input.pass == '') {
          Message.info('请输入密码');
        }
        else {
          axios({
            method: 'post',
            url: '/login',
            data: the.$store.state.user.user,
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              var ret = JSON.stringify(data);
              return ret
            }],
            headers: {"Content-Type": "application/json"},
          })
          .then(function (response) {
            if (response.data.error === undefined) {
              the.$store.dispatch("gettoken",response.data.token),
              localStorage.uid = response.data.uid;
              if (response.data.isfirst) {
                Message.info('请重置密码'),
                the.$router.push('/setpass');
              }
              else {
                Message.success('登陆成功'),
                the.$router.push('/Userinfo');
              };
            }
            else if (response.data.error.code === "password_wrong"){
              Message.error('密码错误');
            }
            else if(response.data.error.code === "number_wrong"){
              Message.error('学号错误');
            }
          })
          .catch(function (error) {
          console.log(error);
          })
        }
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

#login
  position: absolute
  background: center url('../assets/login/loginbg.png')
  height: 100%
  width: 100%
  overflow: hidden
  background-size: cover

.logo
  position: relative
  left: 50%
  margin-top: pxTorem(81)
  margin-left: pxTorem(-93.5)
  height: pxTorem(114)
  width: pxTorem(187)

.title
  text-align: center

#id-input
  display: block
  width: pxTorem(314)
  margin-top: pxTorem(48)
  margin-left: pxTorem(-157)
  left: 50%

#password-input
  display: block
  width: pxTorem(314)
  margin-left: pxTorem(-157)
  margin-top: pxTorem(10)
  left: 50%

.button
  display: block
  position: relative
  width: pxTorem(314)
  margin-top: pxTorem(46)
  margin-left: pxTorem(-157)
  left: 50%
  font-size: pxTorem(16)

.findpassword
  position: relative
  margin-top: pxTorem(5)
  width: 100%
  text-align: center
  font-size: pxTorem(12)

.findtype
  text-decoration: none

</style>
