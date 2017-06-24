import axios from 'axios'
export const LOGIN = 'login';
export const GETTOKEN = 'gettoken';
export const LOGOUT = 'logout';
export const SETPASS = 'setpass';
export const BASEINFO = 'baseinfo';


const state = {
    user:{
      usernumber: '',
      password: ''
    },
    uid: '',
    username: '',
    grade: '',
    gender: '',
    isMale: false,
    isFemale: false,
    major: '',
    level: '',
    area: '',
    home: '',
    mail: '',
    wechat: '',
    token: '',
    getworks: false,
    works:[
      {id:'',link:''},
    ],
    school_experience:[
      {id:'',startime:'',endtime:'',content:''},
    ],
    award:[
      {id:'',time:'',content:''},
    ],
    work_experience:[
      {id:'',startime:'',endtime:'',content:''},
    ],
};

const mutations = {
    LOGIN(state,input){
      state.user.usernumber = input.userid;
      state.user.password = input.pass
    },

    GETTOKEN(state,data){
      localStorage.token = data;
      state.token = data;
    },

    SETPASS(state,newpass){
      state.user.password = newpass;
    },

    BASEINFO(state){
      axios({
         method: 'get',
         url: '/user/'+ localStorage.uid,
         headers: {"Content-Type": "application/json",
          token: localStorage.token,
         },
       })
      .then(function (res) {
        console.log(res),
        state.username =  res.data.username,
        state.grade = res.data.grade,
        state.gender = res.data.gender,
        state.major = res.data.major,
        state.level = res.data.level,
        state.area = res.data.area,
        state.home = res.data.home,
        state.mail = res.data.email,
        state.wechat = res.data.wechat,
        state.works = res.data.works,
        state.school_experience = res.data.school_experience,
        state.award = res.data.work_experience;
      })
      .catch(function (error) {
        if (TypeError) {
          console.log("服务器请求超时");
        }
      });
    }
}

const getters = {
    username: state => {
      return state.username
    },
    grade: state => {
      return state.grade
    },
    gender: state => {
      return state.gender
    },
    isMale: state =>{
      if (state.gander=='male') {
        state.isMale = true
        return state.isMale
      }else {
        state.isMale = false
        return state.isMale
      }
    },
    isFemale: state =>{
      if (state.gander=='female') {
        state.isFemale = true
        return state.isFemale
      }else {
        state.isFemale = false
        return state.isFemale
      }
    },
    major: state => {
      return state.major
    },
    level: state => {
      return state.level
    },
    area: state => {
      return state.area
    },
    home: state => {
      return state.home
    },
    mail: state => {
      return state.mail
    },
    wechat: state => {
      return state.wechat
    },
    getworks: state => {
      if (state.works[0]!=undefined) {
        state.getworks = true
        return state.getworks
      }else {
        state.getworks = false
        return state.getworks
      }
    },
    works: state => {
      return state.works
    }

  }

const actions = {
  login ({commit},user) {
    commit('LOGIN', user)
  },

  gettoken  ({commit},token){
    commit('GETTOKEN',token)
  },

  setpass ({commit},newpss){
    commit('SETPASS',newpss)
  },

  baseinfo ({commit}){
    commit('BASEINFO')
  },
};

export default {
    state,
    actions,
    getters,
    mutations,
}
