import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";
import NotFound from "@/components/NotFound";
import register from "@/components/register";
import home from "@/components/index";
import vuex from "vuex"
Vue.use(Router);

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

    }
});
export default router;