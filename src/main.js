// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import http from "./utils/http";
import store from "./store/store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
// Vue.prototype.$post = post;
// Vue.prototype.$fetch = fetch;
// Vue.prototype.$patch = patch;
// Vue.prototype.$put = put;
Vue.prototype.$http = http;

/* eslint-disable no-new */
Vue.use(Element, { size: "small" });
new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: { App }
});