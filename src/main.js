// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl';// 加载公共样式

// import router from './router'
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

const routes = [// 定义路由
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller },
  { path: '*', redirect: '/goods' }// 配置根路由
];
let router = new VueRouter({// 实例化路由
  routes,
  linkActiveClass: 'active'// 设置当前选中项的样式类名
});

// router.map({// 配置路由,vue2.0没有map了
//   '/goods': {
//     component: goods
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
