<template>
	<div class="goods">
		<div class="menu-wrapper" ref= "menuWrapper">
			<ul>
				<li v-for="(item, $index) in goods" class="menu-item" :class="{'current':currentIndex === $index}" @click="selectMenu($index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref= "foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" alt="" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Axios from 'axios';
	import BScroll from 'better-scroll';
	const ERR_OK = 0;
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0
			};
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			Axios.get('/api/goods')
			.then((response) => {
				response = response.data;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		},
		methods: {
			selectMenu(index, event) {
				// 原生介js没有_constructed这个属性，所以当没有这个属性的时候就返回，只要是自定义事件才可以，防止执行两次
				if (!event._constructed) {
					return;
				}
				// console.log(index);
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					probeType: 3 // 设置属性为3，表示scroll在滚动时实时告诉我们位置
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y)); // 括号内部的Math是把小数四舍五入转换成整数，外部的Math是转换成绝对值（正值）
				});
			},
			_calculateHeight() {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}
		}
	};
	
</script>

<style lang="scss">
	@import "../../common/sass/index";
	.goods{
		display: flex;
		position: absolute;
		width: 100%;
		top: 174px;
		bottom: 46px;
		overflow: hidden;
		.menu-wrapper{
			flex: 0 0 80px; /*等分 内容不足时缩放情况 占位空间*/
			width: 80px;
			background: #f3f5f7;
			.menu-item{
				display: table;
				font-size: 12px;
				height: 54px;
				line-height: 14px;
				width: 56px;
				margin:0 auto;
				padding:0 12px;
				&.current{
					position: relative;
					margin-top: -1px;
					z-index: 10;
					background: #fff;
					font-weight: 700;
					.text{
						border:none;
					}
				}
				.icon {
					vertical-align: top;
					display: inline-block;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease {
						@include bg-img('decrease_3');
					}
					&.discount {
						@include bg-img('discount_3');
					}
					&.guarantee {
						@include bg-img('guarantee_3');
					}
					&.invoice {
						@include bg-img('invoice_3');
					}
					&.special {
						@include bg-img('special_3');
					}
				}
				.text{
					font-size: 12px;
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					@include border-1px(rgba(7,17,27,0.1));
				}
			}
		}
		.foods-wrapper{
			flex: 1;
			.title{
				padding-left:14px;
				height:26px;
				line-height:26px;
				border-left:2px solid #d9dde1;
				font-size:12px;
				color:rgb(147,153,159);
				background:#f3f5f7;
			}
			.food-item{
				display: flex;
				margin: 18px;
				@include border-1px(rgba(7,17,27,0.1));
				padding-bottom:18px;
				&:last-child{
					@include border-none;
					margin-bottom: 0;
				}
				.icon{
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content{
					flex: 1;
					.name{
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.desc,.extra{
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.desc{
						margin-bottom: 8px;
						line-height: 12px;
					}
					.extra{
						.count{
							margin-right: 12px;
						}	
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 18px;
							font-size: 14px;
							color: rgb(240,20,20);
						}
						.old{
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147,153,159);
						}
					}
				}
			}
		}
	}
</style>
