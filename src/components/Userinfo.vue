<template lang="html">
  <div id="userinfo">
    <header>
      <router-link id="edit" to="/Infoedit"></router-link>
      <div id="avatar">
        <img src="../assets/userinfo/testavatar.png" alt="">
      </div>
      <div id="userbase">
        <div class="username">
          {{username}}
        </div>
        <div
          class="gender"
          v-bind:class="{'male':isMale, 'demale':isFemale}">
        </div>
      </div>
      <div id="userads">
        <div class="area">
          <img src="../assets/userinfo/area.png">
          <div v-if="area!=null">
            <span>{{area}}</span>
          </div>
          <div v-else>
            <span>所在地</span>
          </div>
        </div>
        <div class="home">
          <img src="../assets/userinfo/home.png">
          <div v-if="home!=null">
            <span>{{home}}</span>
          </div>
          <div v-else>
            <span>家乡</span>
          </div>
        </div>
      </div>
      <div id="usersch">
        <span class="grade">
          {{grade}}级
        </span>|
        <span class="collegemajor">
          {{major}}
        </span>|
        <span class="level">
          {{level}}
        </span>
      </div>
    </header>
    <main>
      <div id="contact">
        <p>联系方式</p>
        <div class="details">
          <div class="item">
            <span>邮箱</span>
            <div v-if="mail!=null">
              {{mail}}
            </div>
            <div v-else>
              未填写
            </div>
          </div>
          <div class="item">
            <span>微信</span>
            <div v-if="wechat!=null">
              {{wechat}}
            </div>
            <div v-else>
              未填写
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="getworks"
        id="works">
        <p>个人作品</p>
        <div class="details">
          <div
          v-for="work in works"
          class="item">
            <span>
              {{work.link}}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="schoolexperience"
        id="school_experience">
        <p>在校经历</p>
        <div class="details">
          <div
            v-for="schex in schexs"
            :key="schex.id"
            class="item">
            <span>
              {{schex.startime}}-{{schex.endtime}}
            </span>
            <div>
              {{schex.content}}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="getaward"
        id="award">
        <p>获奖经历</p>
        <div class="details">
          <div
            v-for="award in awards"
            :key="award.id"
            class="item">
            <span>
              {{award.time}}
            </span>
            <div>
              {{award.content}}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="workexperience"
        id="work_experience">
        <p>工作经历</p>
        <div class="details">
          <div
            v-for="wkex in wkexs"
            :key="wkex.id"
            class="item">
            <span>
              {{wkex.startime}}-{{wkex.endtime}}
            </span>
            <div>
              {{wkex.content}}
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="tips">
      <p>右上角编辑完善个人信息</p>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      uid:'',
      schoolexperience: false,
      schexs:[
        {startime:'123',endtime:'4134',content:'12414124'},
        {startime:'123',endtime:'4134',content:'12414124'},
      ],
      getaward: false,
      awards:[
        {time:'',content:''},
      ],
      workexperience: false,
      wkexs:[
        {startime:'',endtime:'',content:''},
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
      'isMale',
      'isFemale',
      'getworks',
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
  },
  components:{
    Message
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
  height: pxTorem(240)
  background: no-repeat center/100% url('../assets/userinfo/Userbg.png')

#edit
  position: relative
  float: right
  margin-top: pxTorem(18)
  margin-right: pxTorem(11)
  width: pxTorem(20)
  height: pxTorem(18)
  background: no-repeat center/100% url('../assets/userinfo/edit.png')

#avatar
  position: relative
  left: 50%
  margin-top: pxTorem(38)
  margin-left: pxTorem(-47)
  width: pxTorem(94)
  height: pxTorem(94)
  border-radius: pxTorem(94)

#userbase
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  margin-top: pxTorem(11)
  margin-left: pxTorem(24)
  height: pxTorem(20)

.username
  line-height: pxTorem(20)
  font-size: pxTorem(20)

.gender
  width: pxTorem(18)
  height: pxTorem(18)
  margin-left: pxTorem(8)
  border-radius: 100%
  text-align: center

.male
  background: no-repeat center/100% url('../assets/userinfo/male.png')

.female
  background: no-repeat center/100% url('../assets/userinfo/female.png')

#userads
  position: relative
  display: flex
  flex-direction: row
  justify-content: space-around
  align-items: center
  left: 50%
  margin-left: pxTorem(-80)
  margin-top: pxTorem(16)
  height: pxTorem(16)
  width: pxTorem(160)
  div
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    img
      margin-right: pxTorem(8)
      width: pxTorem(14)
      height: pxTorem(14)
      text-overflow: ellipsis
    span
      height: pxTorem(16)
      font-size: pxTorem(14)
      line-height: pxTorem(16)
      white-space: nowrap

.home
  padding-left: pxTorem(14)

.tips
  position: relative
  overflow: hidden
  margin-top: pxTorem(20)
  margin-left: pxTorem(19)
  margin-right: pxTorem(19)
  padding-top: pxTorem(12)
  border-top: pxTorem(1) solid #ccc
  font-size: pxTorem(16)
  text-align: center
  color: #868686

#usersch
  margin-top: pxTorem(12)
  font-size: pxTorem(16)
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  span
    padding-left: pxTorem(10)
    padding-right: pxTorem(10)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.collegemajor
  padding-left: pxTorem(5) !important
  padding-right: pxTorem(5) !important
  width: pxTorem(242)
  text-align: center

main
  position: relative
  display: block
  p
    font-size: pxTorem(18)
    line-height: pxTorem(18)
    margin-top: pxTorem(20)
    margin-left: pxTorem(19)
    padding-top: pxTorem(10)

#contact p
  padding-top: pxTorem(0)

.details
  position: relative
  overflow: hidden
  margin-top: pxTorem(12)
  margin-left: pxTorem(19)
  margin-right: pxTorem(19)
  padding-top: pxTorem(12)
  border-top: pxTorem(1) solid #ccc
  font-size: pxTorem(16)
  line-height: pxTorem(16)
  .item
    height: pxTorem(18)
    clear: both
    margin-top: pxTorem(12)
    color: #868686
    span
      float: left
    div
      float: right
      text-align: right
      width: pxTorem(208)
</style>
