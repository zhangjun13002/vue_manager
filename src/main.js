// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
Vue.config.productionTip = false

import App from './App'
import router from './router/index'
import store from './stores/index'

import cookies from './util/cookies.js'
Vue.prototype.$cookies = cookies

import moment from 'moment'
Vue.prototype.$moment = moment;

import Pathreg from 'path-to-regexp'
Vue.prototype.$Pathreg = Pathreg;


import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
Vue.http.options.credentials = true;    //跨域资源共享CORS;  服务端设置response.setHeader("Access-Control-Allow-Origin":true, "Access-Control-Allow-Origin":"http://www.domain.com");


// http请求拦截器，当cookie过期后跳转到登录页面
Vue.http.interceptors.push((request, next) => {
    let token = Vue.prototype.$cookies.get('manager');

    if (token) {
        request.headers.set('X-CSRF-TOKEN', 'TOKEN');
        //request.headers.set('Authorization', 'Bearer TOKEN');
        next();
    } else {
        next(function() {
            router.replace({path: '/login'});
        })
    }
});


/**
 * 判断路由在菜单列表中是否存在
 * @param value store中路由信息
 * @param to 当前去向路由
 */
function isExists(value, to) {
    let flag = false;
    flag = value.some( value => {
        if ( value.children ) {
            return isExists(value.children, to)
        } else {
            let reg = Pathreg(value.path);
            if ( reg.exec(to.path) !== null ) {    //  Pathreg.compile(to.path)
                return true;
            } else {
                return false;
            }
        }
    })

    return flag;
}


router.beforeEach((to, from, next) => {
    // 刷新页面时，防止store数据丢失
    var cookie = Vue.prototype.$cookies.get('manager');
    store.state.token = cookie;

    if (store.getters.token) {
        if (to.path === '/login') {
            next({path: '/'});
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(
                    response => {
                        let roles = store.getters.roles;
                        store.dispatch('GenRouters', roles).then( () => {
                            router.addRoutes(store.getters.addRouters);        //  将过滤后的路由信息添加到路由表中
                            next({ ...to });
                        });
                    },
                    response => {
                        Vue.prototype.$cookies.del('manager');     // 当获取用户信息出错时，删除cookie并跳到login页面
                        next({path: '/login'});
                    }
                ).catch( error => {
                    Vue.prototype.$cookies.del('manager');
                    next({path: '/login'});
                });
            } else {
                store.dispatch('ChangeSideRouters');
                if (isExists(store.getters.routers, to)) {
                    next();
                    let expire = 20 * 60;
                    Vue.prototype.$cookies.set('manager', store.getters.token, expire);  // 当在页面中跳转时(有操作动作时)，延长cookie时间
                } else {
                    next({path: '/error'});
                }
            }
        }
    } else {
        if ( to.path === '/login') {
            next();
        } else {
            next({path:'/login'});
        }
    }
});


new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})
