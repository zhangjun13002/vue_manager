import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from '@/App.vue'
import Index from '@/components/layout/Index'
import Login from '@/components/pages/login'
import Error404 from '@/components/pages/error404'

const Main = () => import('@/components/pages/main')
const Page1 = () => import('@/components/pages/page1')
const Page2 = () => import('@/components/pages/page2')
const Page3 = () => import('@/components/pages/page3')
const Page4 = () => import('@/components/pages/page4')
const Page5 = () => import('@/components/pages/page5')

const Manage1 = () => import('@/components/pages/manage1')
const Manage2 = () => import('@/components/pages/manage2')

const Roles = () => import('@/components/admin/roles')
const User = () => import('@/components/admin/user')

export const defaultRouter = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        hidden: true,
    },
    {
        path: '/',
        name: 'index',
        component: Index,
        redirect: 'index',
        hidden: true,
        children: [
            {
                path: '/index',
                name: 'Main',
                title: '首页',
                component: Main,
            }
        ]
    },
    {
        path: '/error',
        name: 'error',
        component: Error404,
        hidden: true,
    }
];

/*  start: 顶部导航   */
export const appendRouter = [
    {
        path: '/default',
        redirect: '/page1',
        name: 'default',
        title: '默认导航',
        icon: "stats-bars",
        component: App,
        hidden: false,
        children: [
            {
                path: '/menu1',
                name: 'menu1',
                title: '菜单1',
                component: Index,
                hidden: false,
                icon: "ios-paper",
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        title: '子菜单1',
                        component: Page1,
                        hidden: false,
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        title: '子菜单2',
                        component: Page2,
                        hidden: false,
                    }
                ]
            },
            {
                path: '/menu2',
                name: 'menu2',
                title: '菜单2',
                component: Index,
                hidden: false,
                icon: "stats-bars",
                children: [
                    {
                        path: '/page3',
                        name: 'page3',
                        title: '子菜单3',
                        component: Page3,
                        hidden: false,
                    },
                    {
                        path: '/page4',
                        name: 'page4',
                        title: '子菜单4',
                        component: Page4,
                        hidden: false,
                    }
                ]
            },
            {
                path: '/menu3',
                name: 'menu3',
                title: '动态路由',
                component: Index,
                hidden: false,
                icon: "stats-bars",
                children: [
                    {
                        path: '/page/:cate/:id',
                        name: 'page5',
                        title: '子菜单5',
                        component: Page5,
                        hidden: false,
                    }
                ]
            },
        ]
    },
    {
        path: '/navmenu1',
        redirect: '/manage1',
        name: 'navmenu1',
        title: '普通管理',
        icon: "stats-bars",
        component: App,
        meta: { roles: ['manager', 'admin'] },
        hidden: false,
        children: [
            {
                path: '/manage',
                name: 'manage',
                title: '操作管理',
                component: Index,
                hidden: false,
                icon: "wrench",
                children: [
                    {
                        path: '/manage1',
                        name: 'manage1',
                        title: '添加操作',
                        component: Manage1,
                        hidden: false,
                    },
                    {
                        path: '/manage2',
                        name: 'manage2',
                        title: '删除操作',
                        component: Manage2,
                        hidden: false,
                        meta: { roles: ['admin'] }
                    }
                ]
            }
        ]
    },
    {
        path: '/system',
        redirect: '/user',
        name: 'system',
        title: '超级管理',
        icon: "ios-people",
        component: App,
        meta: { roles: ['admin'] },
        hidden: false,
        children: [
            {
                path: '/admin',
                name: 'admin',
                title: '系统管理',
                component: Index,
                hidden: false,
                icon: "settings",
                children: [
                    {
                        path: '/roles',
                        name: 'roles',
                        title: '角色管理',
                        component: Roles,
                        hidden: false,
                    },
                    {
                        path: '/user',
                        name: 'user',
                        title: '用户管理',
                        component: User,
                        hidden: false,
                    }
                ]
            }
        ]
    }
];
/*  end: 顶部导航   */

export default new VueRouter({
    routes: defaultRouter,
});


/*  start:无 顶部导航
export const appendRouter = [
    {
        path: '/menu1',
        name: 'menu1',
        title: '菜单1',
        component: Index,
        hidden: false,
        icon: "ios-paper",
        children: [
            {
                path: '/page1',
                name: 'page1',
                title: '子菜单1',
                component: Page1,
                hidden: false,
            },
            {
                path: '/page2',
                name: 'page2',
                title: '子菜单2',
                component: Page2,
                hidden: false,
            }
        ]
    },
    {
        path: '/menu2',
        name: 'menu2',
        title: '菜单2',
        component: Index,
        hidden: false,
        icon: "stats-bars",
        children: [
            {
                path: '/page3',
                name: 'page3',
                title: '子菜单3',
                component: Page3,
                hidden: false,
            },
            {
                path: '/page4',
                name: 'page4',
                title: '子菜单4',
                component: Page4,
                hidden: false,
            }
        ]
    },
    {
        path: '/menu3',
        name: 'menu3',
        title: '动态路由',
        component: Index,
        hidden: false,
        icon: "stats-bars",
        children: [
            {
                path: '/page/:cate/:id',
                name: 'page5',
                title: '子菜单5',
                component: Page5,
                hidden: false,
            }
        ]
    },

    {
        path: '/manage',
        name: 'manage',
        title: '操作管理',
        component: Index,
        meta: { roles: ['manager', 'admin'] },
        hidden: false,
        icon: "wrench",
        children: [
            {
                path: '/manage1',
                name: 'manage1',
                title: '添加操作',
                component: Manage1,
                hidden: false,
            },
            {
                path: '/manage2',
                name: 'manage2',
                title: '删除操作',
                component: Manage2,
                hidden: false,
                meta: { roles: ['admin'] }
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        title: '系统管理',
        component: Index,
        meta: { roles: ['admin'] },
        hidden: false,
        icon: "settings",
        children: [
            {
                path: '/roles',
                name: 'roles',
                title: '角色管理',
                component: Roles,
                hidden: false,
            },
            {
                path: '/user',
                name: 'user',
                title: '用户管理',
                component: User,
                hidden: false,
            }
        ]
    }
];
*  end: 无 顶部导航   */

