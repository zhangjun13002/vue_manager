import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { defaultRouter, appendRouter } from '@/router'

import CryptoJS from 'crypto-js'

/**
 * 通过meta.roles判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0);
    } else {
        return true;
    }
}

/**
 * 递归过滤附加路由表，返回符合用户角色权限的路由表
 * @param appendRouter
 * @param roles
 */
function filterRouter(routers, roles) {
    const accessedRouters = routers.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterRouter(route.children, roles);
            }
            return true;
        }
        return false;
    })
    return accessedRouters;
}

const state = {
    token: '',
    user: '',
    roles: [],
    vcode: '',
    imgurl: '',
    routers: defaultRouter,
    addRouters: [],
    sideRouters: [],
    /* start: 顶部主导航相关  */
    navname: '',
    /* end: 顶部主导航相关  */

    roleslist: [],
}

const getters = {
    token: state => state.token,
    user: state => state.user,
    roles: state => state.roles,
    vcode: state => state.vcode,
    imgurl: state => state.imgurl,

    routers:  state => state.routers,
    addRouters: state => state.addRouters,
    sideRouters: state => state.sideRouters,

    /* start: 顶部主导航相关  */
    navname: state => state.navname,
    /* end: 顶部主导航相关  */
    roleslist: state => state.roleslist,
}

const mutations = {
    set_token: (state, token) => {
        state.token = token;
    },
    set_user: (state, user) => {
        state.user = user;
    },
    set_roles: (state, roles) => {
        state.roles = roles;
    },
    set_vcode: (state, vcode) => {
        state.vcode = vcode;
    },
    set_imgurl: (state, imgurl) => {
        state.imgurl = imgurl;
    },
    set_routers: (state, routers) => {
        state.addRouters = routers;
        state.routers = defaultRouter.concat(routers);
    },
    set_siderouters: (state, routers) => {
        state.sideRouters = routers;
    },
    /* start: 顶部主导航相关  */
    set_navname: (state, data) => {
        state.navname = data;
    },
    /* end: 顶部主导航相关  */

    set_roleslist: (state, data) => {
        state.roleslist = data;
    }
}

const actions = {
    Login({ commit }, value) {
        return new Promise((resolve, reject) => {
            /*
            let params = new Object();
            params['username'] = value.username.trim();
            params['password'] = CryptoJS.MD5(value.password.trim()).toString();
            Vue.http.post('/user/login', params).then(
                response => {
                    const data = response.body;
                    Vue.prototype.$cookies.set(Vue.prototype.tokenname,
                                               data.token + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(params['username'])),
                                               Vue.prototype.expire);
                    commit('set_token', data.token);
                    commit('set_user', data.username);
                    commit('set_navname', "default");
                    resolve();
                }
            ).catch ( error => {
                reject(error.statusText);
            });
            */

            /****   调试数据    */
            let params = new Object();
            params['username'] = value.username.trim();
            params['password'] = value.password.trim();
            Vue.http.get('/static/data.json').then(
                response => {
                    const data = response.body;
                    data.forEach( value => {
                        if ( value.username === params['username'] && value.password == params['password']) {
                            Vue.prototype.$cookies.set(Vue.prototype.tokenname, value.token + value.username, Vue.prototype.expire);
                            commit('set_token', value.token);
                            commit('set_user', value.username);
                            commit('set_navname', "default");
                            resolve();
                        }
                    })
                }
            )
            /****/
        })
    },
    GetInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            /*
            let params = new Object();
            let token = Vue.prototype.$cookies.get(Vue.prototype.tokenname);
            params['username'] = CryptoJS.enc.Base64.parse(token.slice(32, token.length)).toString(CryptoJS.enc.Utf8);

            Vue.http.post('/user/info', params).then(
                response => {
                    const data = response.body;
                    commit('set_user', data.username);
                    commit('set_roles', data.roles);
                    resolve();
                },
                response => {
                    reject(response);
                }
            ).catch( error => {
                reject(error.statusText);
            })
            */
            /****   调试数据   ***/
            let params = new Object();
            let token = Vue.prototype.$cookies.get(Vue.prototype.tokenname);
            params['username'] = token.slice(32, token.length);
            Vue.http.get('/static/data.json').then(
                response => {
                    const data = response.body;
                    data.forEach( value => {
                        if ( value.username === params['username']) {
                            commit('set_user', value.username);
                            commit('set_roles', value.roles);
                            resolve();
                        }
                    })
                },
                response => {
                    reject(response);
                }
            )
            /***/
        })
    },
    UpdateVcode( { commit } ) {
        return new Promise((resolve, reject) => {
            Vue.http.get('/user/vcode').then(
            response => {
                let data = JSON.parse(window.atob(response.body));
                commit('set_vcode', data['code']);
                commit('set_imgurl', data['imgurl']);
                resolve();
            }).catch( error => {
                reject(error.statusText);
            })
        })
    },
    Logout({ commit }) {
        return new Promise((resolve) => {
            commit('set_token', '');
            commit('set_roles', []);
            Vue.prototype.$cookies.del(Vue.prototype.tokenname);
            resolve();
        })
    },

    GenRouters( { commit }, data) {    // 依据权限生成路由列表信息(store)，实际路由表未变(router还是defaultRouter)
        return new Promise(resolve => {
            const roles = data;

            let accessRouters;
            if (roles.indexOf('admin') >= 0) {
                accessRouters = appendRouter;
            } else {
                accessRouters = filterRouter(appendRouter, roles);
            }
            commit('set_routers', accessRouters);
            resolve();
        })
    },
    /*  start： 顶部导航   */
    SetNavname ( {commit}, data ) {          // 设置当前顶部导航的导航名，由此改变侧栏菜单
        return new Promise(resolve => {
            commit('set_navname', data);
            window.sessionStorage.setItem('navname', data);     // 解决刷新后侧栏菜单回到“默认导航”
            resolve();
        })
    },
    /*  end: 顶部导航    */
    ChangeSideRouters ( { commit }) {         // 生成侧栏菜单
        return new Promise(resolve => {
            /*  start： 顶部导航   */
            let navname = '';
            if (state.navname === '') {
                if (window.sessionStorage.getItem('navname')) {
                    navname = window.sessionStorage.getItem('navname');
                } else {
                    navname = 'default';
                }
            } else {
                navname = state.navname;
            }

            let childRouters = [];
            state.addRouters.forEach( value => {
                if ( value.name == navname) {          // 根据顶部导航过滤侧栏菜单
                    childRouters.push(...value.children);
                }
            });
            commit('set_siderouters', childRouters);
            /* end: 顶部导航    */

            // 无 顶部导航
            //commit('set_siderouters', state.addRouters);

            resolve();
        })
    },

    SetRoleslist ({commit}) {
        return new Promise(resolve => {
            Vue.http.get('/user/roles').then(
                response => {
                    var value = response.body;
                    commit('set_roleslist', value.data);
                    resolve();
                }
            );
        })
    }
};

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
})
