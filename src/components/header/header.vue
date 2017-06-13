<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64" alt="" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="desciription">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<!--加v-if判断是因为app.vue中加载数据是一个异步过程，不加v-if时会报错的原因是data（）里面的数据一开始是空的，<v-header :seller="seller"></v-header>这部分也就没有数据，造成dom也为空-->
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%"/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			seller: { // 将seller对象传给组件
				type: Object // 这是vue的prop验证属性的写法
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		}
	};
</script>

<style lang="scss">
	@import "../../common/sass/index";
	.header {
		color: white;
		background: rgba(7,17,27,0.5);
		position: relative;
		.content-wrapper {
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0;
			.avatar {
				display: inline-block;
				vertical-align: top;
				img {
					border-radius: 2px;
				}
			}
			.content {
				display: inline-block;
				margin-left: 16px;
				.title {
					margin: 2px 0 8px 0;
					.brand {
						width: 30px;
						height: 18px;
						display: inline-block;
						@include bg-img('brand');
						background-size: 30px 18px;
						background-repeat: no-repeat;
						vertical-align: top;
					}
					.name {
						font-size: 16px;
						margin-left: 6px;
						line-height: 18px;
						font-weight: bold;
					}
				}
				.desciription {
					margin-bottom: 10px;
					height: 12px;
					font-size: 12px;
				}
				.support {
					.icon {
						vertical-align: top;
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						&.decrease {
							@include bg-img('decrease_1');
						}
						&.discount {
							@include bg-img('discount_1');
						}
						&.guarantee {
							@include bg-img('guarantee_1');
						}
						&.invoice {
							@include bg-img('invoice_1');
						}
						&.special {
							@include bg-img('special_1');
						}
					}
					.text {
						vertical-align: bottom;
						font-size: 10px;
					}
				}
			}
			.support-count {
				position: absolute;
				right: 12px;
				bottom: 14px;
				padding: 0 8px;
				height: 24px;
				line-height: 24px;
				border-radius: 14px;
				background: rgba(0, 0, 0, 0.2);
				text-align: center;
				.count {
					font-size: 10px;
					display: inline-block;
				}
				.icon-keyboard_arrow_right {
					margin-left: 2px;
					line-height: 24px;
					font-size: 10px;
					vertical-align: top;
				}
			}
		}
		.bulletin-wrapper {
			height: 28px;
			line-height: 28px;
			padding: 0 22px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
			background: rgba(7,17,27,0.2);
			/*font-size: 0;*/
			.bulletin-title {
				margin-top: 8px;
				display: inline-block;
				width: 22px;
				height: 12px;
				@include bg-img('bulletin');
				background-size: 22px 12px;
				background-repeat: no-repeat;
			}
			.bulletin-text {
				vertical-align: bottom;
				font-size: 10px;
				margin: 0 4px;
				line-height: 26px;
			}
			.icon-keyboard_arrow_right {
				position: absolute;
				font-size: 10px;
				right: 12px;
				top: 10px;
			}
		}
		.background{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			filter: blur(10px);
		}
	}
</style>
