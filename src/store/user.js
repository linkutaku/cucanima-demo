import axios from 'axios'
export const LOGIN = 'login';
export const GETTOKEN = 'gettoken';
export const LOGOUT = 'logout';
export const SETPASS = 'setpass';
export const BASEINFO = 'baseinfo';
export const UPDATEINFO = 'updateinfo';
export const GETINFO = 'getinfo';

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
    works:[],
    schoolexperience: false,
    school_experience:[],
    getaward: false,
    award:[],
    workexperience: false,
    work_experience:[],
    info: {
      area: '',
      home: '',
      email: '',
      wechat: ''
    },
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

    BASEINFO(){
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
        state.works = res.data.works;
        state.school_experience = res.data.school_experience,
        state.award = res.data.award,
        state.work_experience = res.data.work_experience;
      })
      .catch(function (error) {
        if (TypeError) {
          console.log("服务器请求超时");
        }
      });
    },

    GETINFO(state,data){
      if (data.types === "area") {
        state.area = data.value
      }
      else if (data.types === "home") {
        state.home = data.value
      }
      else if (data.types === "mail") {
        state.mail = data.value
      }
      else if (data.types === "wechat") {
        state.wechat = data.value
      }
    },

    UPDATEINFO(){
      state.info.area = state.area,
      state.info.home = state.home,
      state.info.email = state.mail,
      state.info.wechat = state.wechat,
      axios({
          method: 'patch',
          url: '/user/'+ localStorage.uid,
          data: state.info,
          transformRequest: [function (data) {
            var ret = JSON.stringify(data);
            return ret
          }],
          headers:{"Content-Type": "application/json",
          token: localStorage.token,
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
      if (state.gander === 'male') {
        state.isMale = true
        return state.isMale
      }else {
        state.isMale = false
        return state.isMale
      }
    },
    isFemale: state =>{
      if (state.gander === 'female') {
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
      if (state.works[0] != undefined) {
        state.getworks = true
        return state.getworks
      }else {
        state.getworks = false
        return state.getworks
      }
    },
    works: state => {
      return state.works
    },
    schoolexperience: state => {
      if (state.school_experience[0] != undefined) {
        state.schoolexperience = true
        return state.schoolexperience
      }else {
        state.schoolexperience = false
        return state.schoolexperience
      }
    },
    school_experience: state => {
      return state.school_experience
    },
    workexperience: state => {
      if (state.work_experience[0] != undefined) {
        state.workexperience = true
        return state.workexperience
      }else {
        state.workexperience = false
        return state.workexperience
      }
    },
    work_experience: state => {
      return state.work_experience
    },
    getaward: state => {
      if (state.award[0] != undefined) {
        state.getaward = true
        return state.getaward
      }else {
        state.getaward = false
        return state.getaward
      }
    },
    award: state => {
      return state.award
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

  getinfo ({commit},info){
    commit('GETINFO',info)
  },

  updateinfo ({commit}){
    commit('UPDATEINFO')
  }
};

export default {
    state,
    actions,
    getters,
    mutations,
}
