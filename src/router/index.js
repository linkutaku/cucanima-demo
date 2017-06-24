import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/user'
import Hello from '@/components/Hello'
import setPass from '@/components/setPass'
import Userinfo from '@/components/Userinfo'
import Infoedit from '@/components/Infoedit'

Vue.use(Router)

// export default new Router({
//   history: true,
//   routes: [
//   ]
// })

const routes = [
    {
        path: '/',
        name: 'Hello',
        component: Hello
    },
    {
        path:'/setPass',
        name: 'setPass',
        component: setPass
    },
    {
        path:'/Infoedit',
        name: 'Infoedit',
        component: Infoedit
    },
    {
        path: '/Userinfo',
        name: 'Userinfo',
        meta: {
            requireAuth: true,
        },
        component: Userinfo
    },
];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.state.token = window.localStorage.getItem('token');
}

const router = new Router({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;
