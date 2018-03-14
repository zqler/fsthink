import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import login from "@/components/login";
import NotFound from "@/components/NotFound";
import register from "@/components/register";
import home from "@/components/index";
import List from "@/components/list";
import vuex from "vuex";
Vue.use(Router);
Vue.use(vuex);
const router = new Router({
    // 默认值: “/”，应用的基路径，一般就是项目的根目录，webpack中有配置好。
    linkActiveClass: "link-active",
    routes: [{
            path: "/login",
            name: "login",
            component: login,
            meta: {
                title: "登录"
            }
        },
        {
            path: "/register",
            name: "register",
            component: register,
            meta: {
                title: "注册"
            }
        },
        {
            path: "/",
            name: "home",
            component: home,
            meta: {
                title: "首页",
                requireAuth: true
            }
        },
        {
            path: "/list",
            name: "List",
            component: List,
            meta: {
                title: "视频列表页",
                requireAuth: true
            }
        },
        {
            path: "/404",
            name: "Error",
            component: NotFound,
            meta: {
                title: "错误"
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    document.title = to.meta.title;
    next();
    if (!to.matched.length) {
        next({
            name: "Error",
            params: {
                msg: "没有发现该页面，请检查你的网址是否正确"
            }
        });
    }
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (router.app.$store.state.isLogin) {
            next();
        } else {
            const token = sessionStorage.getItem("token");
            console.log(token);
            if (token) {
                // 通过vuex state获取当前的token是否存在
                next();
            } else {
                next({
                    path: "/login",
                    query: { redirect: encodeURIComponent(to.path) } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                });
            }
        }
    } else {
        next();
    }
});
export default router;