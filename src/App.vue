<template>
  <div class="box">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
    	<div class="tab-item">
    		<router-link to='/goods'>商品</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to='/ratings'>评价</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to='/seller'>商家</router-link>
    	</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
	import header from './components/header/header.vue';
	import Axios from 'axios';
	const ERR_OK = 0;
	
	export default{
		data() {
			return {
				seller: {}
			};
		},
		created() {
			Axios.get('/api/seller')
			.then((response) => {
				// console.log(response);
				// response = response.body; // 用于vue-resource
				// console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        response = response.data; // axios的数据都在data里面这一点和vue-resource不同
        // console.log(response.data);
				if (response.errno === ERR_OK) {
					this.seller = response.data;
					// console.log(this.seller);
				};
			})
			.catch((error) => {
				console.log(error);
			});
		},
		components: {
			'v-header': header // ES6语法 不写后面的header也可以
		}
	};
</script>

<style lang="scss">
	@import "common/sass/index.scss";
	
	.tab{
		display:flex;
		height: 40px;
		line-height: 40px;
		width: 100%;
		@include border-1px(rgba(7,17,27,0.1));
		.tab-item{
			flex: 1;
			text-align: center;
			& > a{
				display: block;
				font-size: 14px;
				color: rgb(77,85,93);
				&.active{
					color: rgb(240,20,20);
				}
			}
		}
	}
</style>
