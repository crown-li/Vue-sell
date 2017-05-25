// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import App from './App';
import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';
import Index from 'common/sass/index.scss';

Vue.use(VueRouter);
// Vue.use(Axios);
// Vue.prototype.$ajax = Axios;

Vue.config.productionTip = false;

// const Goods = {template: '<div>goods</div>'};
// const Ratings = {template: '<div>ratings</div>'};
// const Seller = {template: '<div>seller</div>'};

const routes = [
	{
		path: '/goods',
		component: Goods
	},
	{
		path: '/ratings',
		component: Ratings
	},
	{
		path: '/seller',
		component: Seller
	}
];

const router = new VueRouter({
	routes, // （缩写）相当于 routes: routes
	linkActiveClass: 'active' // 这是链接激活时的class
});

// eslint-disable-line no-unused-vars是跳过no-unused-vars的检查
const app = new Vue({// eslint-disable-line no-unused-vars
	router,
	render: h => h(App)
}).$mount('#app');
