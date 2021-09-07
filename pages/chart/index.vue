<template>
	<view class="content">
	<qiun-data-charts  type="column" :chartData="chartData2" class="chart-line" canvasId="dasddasdsaadsadsdssa"/>
			<qiun-data-charts      type="candle" :chartData="chartData" canvasId="dasddasdsaadsadsd" class="chart-kline"/>
		
		
		
	</view>
</template>

<script>
	// import qiunDataCharts from'../../components/qiun-data-charts/qiun-data-charts.vue'
	export default {
		data() {
			return {
				shareInfo:{},
				chartData: {
					categories: [],
					series: [{
						name: '',
						type:'candle',
						data:[]
					},
				
					]
				},
				
					 
				chartData2: {
					xAxis: {
							disabled:true,
							disableGrid:false,
							type:'grid',
							gridColor:'#CCCCCC',
							gridType:'dash',
							dashLength:8
						},
					"categories": [
						
					],
					"series": [
						{
							"name": "目标值",
							dataLabel:false,
							"data": [
								35,
								36,
								31,
								33,
								13,
								34
							]
						},
						
					]
				},
			}
		},
		onLoad(option) {
			console.log(option); //打
			this.shareInfo = uni.getStorageSync('shareMap')[option.code]
			this.computeKline()

		},
		methods: {
			computeKline(){
				const categories = []
				const data = []
		
				this.shareInfo.kline.forEach(item=>{
					categories.push(item.time)
					data.push([item.open,item.close,item.low,item.high])
				})
				this.chartData.categories = categories
			
				this.chartData2.categories = categories
				
				this.chartData.series= [{
						name: this.shareInfo.name,
						type:'candle',
						data,
					},				
				]
				this.chartData2.series= [{
						"name": "Macd",
						dataLabel:false,
						"data":this.shareInfo.macd.map(item=>{
							if(item>0){
								return {
									value:item,
									color:'red'
								}
							}else{
								return {
									value:item,
									color:'green'
								}
							}
						})
					},				
				]
			
				
			},
	
	
		 }
	}
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.chart-kline{
			width: 70vw;
			height: 100vh;
			transform: rotate(90deg);
		}
		.chart-line{
			width: 30vw;
			height: 100vh;
			transform: rotate(90deg);
		}
	}
	
</style>
