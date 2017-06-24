<template lang="html">
  <div id="eidt">
    <header>
      <div id="avatar">
        <img src="../assets/userinfo/avatar.png" alt="">
      </div>
      <div class="userbase">
        <div class="name-gender">
          <div class="username">
            {{username}}
          </div>
          <div class="gender">
            <div v-if="gender=='female'">♂</div>
            <div v-else-if="gender=='male'">♀</div>
            <div v-else></div>
          </div>
        </div>
        <div id="usersch">
          <span class="grade">
            {{grade}}级
          </span>|
          <span class="level">
            {{level}}
          </span>
        </div>
        <div class="major">
          {{major}}
        </div>
      </div>
    </header>
  <div class="connecter">
      <hometown
        theType="area"
        :value="area"
        :vhome="home"
        :varea="area"
        :vmail="mail"
        :vwechat="wechat"
        placeholder="选择当前地址"
        label="所在地">
      </hometown>
      <hometown
        theType="home"
        :value="home"
        :vhome="home"
        :varea="area"
        :vmail="mail"
        :vwechat="wechat"
        placeholder="选择家乡"
        label="家乡">
      </hometown>
      </contact>
      <contact
        theType="mail"
        :cont="mail"
        :vhome="home"
        :varea="area"
        :vmail="mail"
        :vwechat="wechat"
        placeholder="请输入您的常用邮箱"
        title="邮箱"
        :length="32">
      </contact>
      <contact
        theType="wechat"
        :cont="wechat"
        :vhome="home"
        :varea="area"
        :vmail="mail"
        :vwechat="wechat"
        placeholder="请输入您的微信号"
        title="微信"
        :length="32">
      </contact>
    </div>
    <div class="line"></div>
    <main>
      <div id="contact">
        <p>个人作品</p>
        <div class="addcontact">
          <ul>
            <li
              is="works"
              class="view"
              v-for="(work,index) in works"
              v-on:remove="works.splice(index, 1)"
              :id="work.id"
              :link="work.link">
            </li>
          </ul>
        </div>
        <div class="addtext">
          <div class="textbox">
            <span>添加新的作品链接</span>
          </div>
          <i
            @click="addwork"
            class="el-icon-circle-cross">
          </i>
        </div>
      </div>
      <div class="line"></div>
      <div id="contact">
        <p class="sp">在校经历</p>
        <div class="a1ddcontact">
          <ul>
            <li
              is="exp"
              theLabel="经历描述"
              v-for="(schexp, index) in school_experience"
              v-on:remove="school_experience.splice(index, 1)"
              :id="schexp.id"
              :startime="schexp.startime"
              :endtime="schexp.endtime"
              :content="schexp.content">
            </li>
          </ul>
        </div>
        <div class="addtext">
          <div class="textbox">
            <span>添加新的在校经历</span>
          </div>
          <i
            @click="addschexp"
            class="el-icon-circle-cross">
          </i>
        </div>
      </div>
      <div class="line"></div>
      <div id="contact">
        <p class="sp">获奖经历</p>
        <div class="addcontact">
          <ul>
            <li
              is="awards"
              v-for="(awd, index) in award"
              v-on:remove="award.splice(index, 1)"
              :id="awd.id"
              :time="awd.time"
              :content="awd.content">
            </li>
          </ul>
        </div>
        <div class="addtext">
          <div class="textbox">
            <span>添加新的获奖经历</span>
          </div>
          <i
            @click="addaward"
            class="el-icon-circle-cross">
          </i>
        </div>
      </div>
      <div class="line"></div>
      <div id="contact">
        <p class="sp">工作经历</p>
        <div class="addcontact">
          <ul>
            <li
              is="exp"
              theLabel="公司及岗位"
              v-for="(workexp, index) in work_experience"
              v-on:remove="work_experience.splice(index, 1)"
              :id="workexp.id"
              :startime="workexp.startime"
              :endtime="workexp.endtime"
              :content="workexp.content">
            </li>
          </ul>
        </div>
        <div class="addtext">
          <div class="textbox">
            <span>添加新的工作经历</span>
          </div>
          <i
            @click="addworkexp"
            class="el-icon-circle-cross">
          </i>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import contact from '@/components/child/contact'
import hometown from '@/components/child/hometown'
import exp from '@/components/child/experience'
import works from '@/components/child/works'
import awards from '@/components/child/awards'
import { Message } from 'element-ui';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      school_experience:[
        {id:'',startime:'',endtime:'',content:''},
      ],
      award:[
        {id:'',time:'',content:''},
      ],
      work_experience:[
        {id:'',startime:'',endtime:'',content:''},
      ],
    }
  },
  mounted() {
    this.baseinfo();
  },
  computed: {
    ...mapGetters([
      'username',
      'level',
      'grade',
      'major',
      'gender',
      'area',
      'home',
      'mail',
      'wechat',
      'works',
    ])
  },
  watch:{
  },
  methods: {
    baseinfo(){
      if (localStorage.uid == undefined) {
        Message.error('登录过期');
        this.$router.push('/');
      }
      else {
        this.$store.dispatch('baseinfo');
      }
    },
    addwork(){
      if (this.works.length <= 9) {
        this.works.push({
          id:'',
          link:'',
        })
      }
      else {
        Message.info("不能再添加");
      }
    },
    addschexp(){
      if (this.school_experience.length <= 9) {
        this.school_experience.push({
          id:'',
          startime:'',
          endtime:'',
          content:''
        })
      }
      else {
        Message.info("不能再添加");
      }
    },
    addworkexp(){
      if (this.work_experience.length <= 9) {
        this.work_experience.push({
          id:'',
          startime:'',
          endtime:'',
          content:''
        })
      }
      else {
        Message.info("不能再添加");
      }
    },
    addaward(){
      if (this.award.length <= 9) {
        this.award.push({
          id:'',
          time:'',
          content:''
        })
      }
      else {
        Message.info("不能再添加");
      }
    }
  },
  components:{
        Message,
        hometown,
        contact,
        exp,
        works,
        awards
  }
}
</script>

<style scoped lang="sass">
@function pxTorem($px)
  @return $px/37.5 * 1rem

header
  display: block
  position: relative
  overflow: hidden
  width: 100%
  height: pxTorem(138)
  background: no-repeat center/100% url('../assets/userinfo/Userbg.png')

#avatar
  position: relative
  overflow: hidden
  float: left
  margin-top: pxTorem(25)
  margin-left: pxTorem(32)
  width: pxTorem(77)
  height: pxTorem(77)
  border-radius: pxTorem(77)
  img
    width: 100%
    height: 100%

.userbase
  position: relative
  overflow: hidden
  display: inline-block
  margin-top: pxTorem(30)
  margin-left: pxTorem(22)
  .username
    font-size: pxTorem(24)
    overflow: hidden
    position: relative
    display: inline-block
  .gender
    overflow: hidden
    position: relative
    display: inline-block
    height: pxTorem(24)
    line-height: pxTorem(24)
    font-size: pxTorem(16)
  #usersch
    margin-top: pxTorem(14)
    line-height: pxTorem(16)
    font-size: pxTorem(16)
  .major
    max-width: pxTorem(230)
    margin-top: pxTorem(10)
    line-height: pxTorem(16)
    font-size: pxTorem(16)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.tip
  width: pxTorem(48)
  text-align: left

.name-gender
  height: pxTorem(24)
  line-height: pxTorem(24)

.connecter
  padding-top: pxTorem(2)
  padding-bottom: pxTorem(18)
  width: 100%
  text-align: center
  .baseinput
    position: relative
    width: pxTorem(340)
    margin: auto

.line
  width: 100%
  height: pxTorem(8)
  background-color: #F0F0F0

main p
  font-size: pxTorem(18)
  line-height: pxTorem(18)
  margin-top: pxTorem(20)
  margin-bottom: pxTorem(20)
  margin-left: pxTorem(19)

.sp
  margin-bottom: pxTorem(4)

.view
  margin-bottom: pxTorem(20)
  text-align: center
  display: flex
  justify-content: center
  align-items: center

.el-icon-circle-cross
  transform: rotate(45deg)
  font-size: pxTorem(22)
  color: rgb(190, 157, 151)

.el-icon-circle-cross:active
  content: ""
  border-radius: 100%
  background-color: hsla(200,100%,60%,0.8)

.item-button
  border-radius: 100%

.addtext
  margin-bottom: pxTorem(10)
  text-align: center
  display: flex
  justify-content: center
  align-items: center
  .textbox
    margin-right: pxTorem(17)
    width: pxTorem(298)
    height: pxTorem(42)
    text-align: left
    line-height: pxTorem(42)
    font-size: pxTorem(16)
    color: #868686

.schexp-input
  width: pxTorem(190)

.datapicker
  width: pxTorem(50)

</style>
