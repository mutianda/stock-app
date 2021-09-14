<template>
	<view class="content">
		<view class="control-bar">
			<button type="warn"  @click="getAllKLine('all')"
			 :disabled="beReady && currentType == 'all'" size='mini' class="bar-btn">
			 所有</button>
			<button type="warn"  @click="getAllKLine('dbl')"
			 :disabled="beReady && currentType == 'dbl'" size='mini' class="bar-btn">
			 底背离</button>
			<button type="warn"  @click="getAllKLine('chudbl')"
			:disabled="beReady && currentType == 'chudbl'"  size='mini' class="bar-btn">
			初底背离</button>
			<button type="warn" size='mini'    @click="getAllKLine('dbllianban-' + lianbanLength)"
			 :disabled="beReady && currentType.indexOf('dbllianban-') > -1"  class="bar-btn">
			 底连扳</button>
			<button type="warn" size='mini'    @click="getAllKLine('alllianban-' + lianbanLength)"
			 :disabled="beReady && currentType.indexOf('alllianban-') > -1" class="bar-btn">
			 所有连扳</button>
			<button type="warn"      @click="getAllKLine('chaodbl')"
			 :disabled="beReady && currentType == 'chaodbl'"  size='mini' class="bar-btn">
			 超背离</button>
		<!-- 	<input type="number" v-model="lianbanLength" placeholder="请输入内容" :min="1"
			 :max="10" /> -->
		</view>
		<view class="list-box">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="list-scoll" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll" >
					<view  class="scroll-view-item" v-for="(item , index ) in shareList" :key="index" 
					:class="item.last.risePrecent>0?'red-card':'green-card'"
					 @click="lookDetail(item)"
					>
						<view class="share-info">
						<view class="item-header">
							{{ item.name }} {{ item.last.risePrecent}}%
						</view>
						<view class="item-body">
							  <view class="item-text">开盘:{{ item.last.open }}</view>
							   <view class="item-text">收盘:{{ item.last.close }}</view>
							   <view class="item-text">最低:{{ item.last.low }}</view>
							   <view class="item-text">最高:{{ item.last.high }}</view>
							   <view class="item-text">量能:{{ item.last.volumes }}</view>
							   <view class="item-text">换手率:{{ item.last.turnover }}%</view>
							   <view class="item-text">成交额:{{ item.last.moneyString }}</view>
						</view>
						</view>
					
					
					</view>	
						
						<!-- <web-view :webview-styles="webviewStyles" :src="'https://onlinestock.cn/html?code='+item.code"></web-view> -->
			  </scroll-view>
		</view>
		
	</view>
</template>

<script>
	import {getAllKlineApi} from '../api/common.js'
	export default {
		data() {
			return {
			 macd: "",
			 webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
		      lineList: [],
		      macdList: [],
		      dblList: [ ],
		      beReady: false,
		      searchForm: {
		        pageSize: 100,
		        pageNum: 1,
		        total: 0
		      },
		      currentType: "",
		      lianbanLength: 3,
			  scrollTop: 0,
			  old: {
				  scrollTop: 0
			  }
			}
		},
		onLoad() {
			// this.getUserInfo()
		},
		computed:{
		  shareList() {
			  const arr = this.dblList
				.sort((a, b) => b.last.risePrecent - a.last.risePrecent)
				.map(item => {
				  item.last.moneyString =
					item.last.money / 100000000 > 1
					  ? Math.floor(item.last.money / 100000000, 2) + "亿"
					  : Math.floor(item.last.money / 10000, 2) + "万";
		
				  return item;
				});
		
			  return arr;
			}
		},
		methods: {
			 upper: function(e) {
			            console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			changeSize(size) {
		      this.getAllKLine(this.currentType);
		    },
		    changeNum(Num) {
		      this.getAllKLine(this.currentType);
		    },
		
		    lookDetail(item) {
				
				uni.navigateTo({
						url: '/pages/echarts/index?code='+item.code,
					  });

		    },
		    getAllKLine(type) {
			
		      if (this.beReady) return;
		      this.currentType = type;
		      this.beReady = true;
		      // this.beReady= false
			  console.log(getAllKlineApi)
		      getAllKlineApi({
		          type,
		          pageSize: this.searchForm.pageSize,
		          pageNum: this.searchForm.pageNum
		        })
		        .then(res => {
				
		          if (res.data) {
					  const obj = {}
		            this.dblList = res.data.list.map(item => {
		              item.qs = true;
		              item.dbqd = false;
		              item.tpzs = false;
		              item.jiasu = false;
		              item.kaishi = false;
					  obj[item.code] = item
		              return item;
		            });
					uni.setStorageSync('shareMap',obj)
		            console.log("计算完成");
		          }
		          this.searchForm.pageNum = res.data.pageNum;
		          this.searchForm.pageSize = res.data.pageSize;
		          this.searchForm.total = res.data.total;
				  this.goTop()
		        })
		        .finally(() => {
		          this.beReady = false;
		        });
		    },
		 }
	}
</script>

<style scoped lang="less">
	.content {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		// opacity: .3;
		justify-content: center;
		.control-bar{
			display: flex;
			flex-wrap: wrap;
			.bar-btn{
					width: 30%;
					margin: 5px 5px;
				}
			}
		.list-box{
			width: 100%;
			margin: 5px 10px;
			height: calc(100% - 150px);
			background-color: #007AFF;
			.list-scoll{
				height: 100%;
				background-color: #efefef;
				.scroll-view-item{
					line-height: 20px;
					background-color: #fff;
					border-radius: 0px 5px 5px; 
					box-shadow: 2px 2px 2px #ddd;
					margin-bottom: 5px;
					&.red-card{
						color: #DD524D;
					}
					&.green-card{
						color: #4CD964;
					}
					.share-info{
						width: 100%;
						display: flex;
						align-items: center;
						justify-items: center;
						.item-header{
							width: 80px;
							height: 100%;
							text-align: center;
							
						}
						.item-body{
							flex: 1;
							display: flex;
							flex-wrap: wrap;
							
							.item-text{
								width: 50%;
								line-height: 30px;
								text-align: left;
								
							}
						}
					}
					
					.web-view{
						height: 300px;
						transform: rotate(90deg);
					}
					
				}
			}
		}
	}
	
	
	
	
	
	
</style>
