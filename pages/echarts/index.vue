<template>
	<view class="canvasView">
		  <mpvue-echarts ref="barChart" :echarts="echarts" @onInit="initBarChart" class="charts1-box" canvasId="barChart"/>		
	     <mpvue-echarts ref="klineChart" :echarts="echarts" @onInit="initKlineChart" class="charts-box" canvasId="klineChart"/>			
	</view>
  
</template>

<script>
	const upColor = "#ec0000";
	const downColor = "#00da3c";
	import * as echarts from '@/components/echarts/echarts.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import {getKline} from '../api/common.js'
    export default {
        data() {
            return {
                echarts,
				shareCode:'',
				 klineChart: null,
				 barChart:null,
				  shareList: [],
				  computeIndex: 0,
				  echart2: null,
				  playing: true,
				  time: null,
				  showModal: false,
				  timeLength: 15,
				  klineType: "kline",
				  klineTypeList: [
					{ label: "日线图", value: "kline" },
					{ label: "30分钟", value: "kline_30m" },
					{ label: "60分钟", value: "kline_60m" },
					{ label: "周线图", value: "kline_week" }
				  ],
				  currentType:'kline',
				  buttonLoading:false,
				  currentShare:{}
            }
        },
        components: {
            mpvueEcharts
        },
		onLoad(option){
	
			this.shareCode=option.code
			
		},
        methods: {
		initBarChart(e) {
		    let {
		        canvas,
		        width,
		        height
		    } = e;
		    width = width - 20
			 echarts.setCanvasCreator(() => canvas);
		    const barChart = echarts.init(canvas, null, {
		        width: width,
		        height: height
		    })
		    canvas.setChart(barChart)
			this.barChart = barChart
		   
		},
            initKlineChart(e) {
                let {
                    canvas,
                    width,
                    height
                } = e;
                width = width - 20
				 echarts.setCanvasCreator(() => canvas);
                const klineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })

                canvas.setChart(klineChart)
				this.klineChart = klineChart
			
				this.changeKline()
               
            },
			  changeKline(type='kline') {
			      this.currentType = type
			      this.buttonLoading = true
			      const shareCode = this.shareCode;
			      getKline({ type,shareCode }).then(res => {
			        if (res.data) {
			          this.currentShare = res.data
			          this.computedEchart(res.data);
			        } else {
			          this.$message.error("暂无");
			        }
			      });
			
			    },
				  computedEchart(item) {
				      if (!item) return;
				      // it.money,it.turnover,it.risePrecent
				      let data = item.kline.map(it => {
				        const info = [
				          it.time,
				          it.open - 0,
				          it.close - 0,
				          it.low - 0,
				          it.high - 0,
				          it.volumes - 0,
				          it.money - 0,
				          it.turnover - 0,
				          it.risePrecent - 0
				        ];
				        return info;
				      });
				      this.getData(data, item.name, item);
				    },
				   splitData(rawData) {
					  var categoryData = [];
					  var values = [];
					  var volumes = [];
					  const turnOver = [];
					  for (var i = 0; i < rawData.length; i++) {
						categoryData.push(rawData[i].splice(0, 1)[0]);
						values.push(rawData[i]);
						volumes.push([
						  i,
						  rawData[i][4],
						  rawData[i][0] > rawData[i][1] ? 1 : -1
						]);
						turnOver.push([
						  i,
						  rawData[i][6],
						  rawData[i][0] > rawData[i][1] ? 1 : -1
						]);
					  }
					  return {
						categoryData: categoryData,
						values: values,
						volumes: volumes,
						turnOver
					  };
					},
				   getData(rawData, name, macd) {
					  const data = this.splitData(rawData);
				
					   this.klineChart.setOption(
						{
						  animation: false,
						  title: {
							text: name + macd.code
						  },
						  legend: {
							bottom: 10,
							left: "center",
							data: ["当日信息", "5均线", "10均线", "20均线", "30均线"]
						  },
						  tooltip: {
							trigger: "axis",
							axisPointer: {
							  type: "cross"
							},
							formatter: params => {
							  let dom = ``;
							  dom += `<div>日期:${params[0].axisValue}</div>`;
							  params.forEach((item, index) => {
								if (item.componentSubType == "candlestick") {
								  dom += `<div style="text-align: left">开盘:${item.data[1]} </div>`;
								  dom += `<div  style="text-align: left">收盘:${item.data[2]} </div>`;
								  dom += `<div  style="text-align: left">最低:${item.data[3]} </div>`;
								  dom += `<div  style="text-align: left">最高:${item.data[4]} </div>`;
								  dom += `<div style="text-align: left; ${
									item.data[8] > 0 ? "color:red" : "color:green"
								  }">成交量:${item.data[5]} </div>`;
								  dom += `<div  style="text-align: left">成交额:${item.data[6]} </div>`;
								  dom += `<div style="text-align: left; ${
									item.data[8] > 0 ? "color:red" : "color:green"
								  }">换手率:${item.data[7]} %</div>`;
								  dom += `<div style=" text-align: left;${
									item.data[8] > 0 ? "color:red" : "color:green"
								  }">涨幅:${item.data[8]}% </div>`;
								}
							  });
							  return dom;
							},
							borderWidth: 1,
							borderColor: "#ccc",
							padding: 10,
							textStyle: {
							  color: "#000"
							},
							position: function(pos, params, el, elRect, size) {
							  var obj = { top: 10 };
							  obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
							  return obj;
							}
							// extraCssText: 'width: 170px'
						  },
						  axisPointer: {
							link: { xAxisIndex: "all" },
							label: {
							  backgroundColor: "#777"
							}
						  },
						  toolbox: {
							feature: {
							  dataZoom: {
								yAxisIndex: false
							  },
							  brush: {
								type: ["lineX", "clear"]
							  }
							}
						  },
						  brush: {
							xAxisIndex: "all",
							brushLink: "all",
							outOfBrush: {
							  colorAlpha: 0.1
							}
						  },
						  visualMap: {
							show: false,
							seriesIndex: 5,
							dimension: 2,
							pieces: [
							  {
								value: 1,
								color: downColor
							  },
							  {
								value: -1,
								color: upColor
							  }
							]
						  },
						  grid: [
							{
							  left: "10%",
							  right: "8%",
							  height: "50%"
							},
							{
							  left: "10%",
							  right: "8%",
							  top: "63%",
							  height: "16%"
							}
						  ],
						  xAxis: [
							{
							  type: "category",
							  data: data.categoryData,
							  scale: true,
							  boundaryGap: false,
							  axisLine: { onZero: false },
							  splitLine: { show: false },
							  splitNumber: 20,
							  min: "dataMin",
							  max: "dataMax",
							  axisPointer: {
								z: 100
							  }
							},
							{
							  type: "category",
							  gridIndex: 1,
							  data: data.categoryData,
							  scale: true,
							  boundaryGap: false,
							  axisLine: { onZero: false },
							  axisTick: { show: false },
							  splitLine: { show: false },
							  axisLabel: { show: false },
							  splitNumber: 20,
							  min: "dataMin",
							  max: "dataMax"
							}
						  ],
						  yAxis: [
							{
							  scale: true,
							  splitArea: {
								show: true
							  }
							},
							{
							  scale: true,
							  gridIndex: 1,
							  splitNumber: 2,
							  axisLabel: { show: false },
							  axisLine: { show: false },
							  axisTick: { show: false },
							  splitLine: { show: false }
							},
							{
							  type: "value",
							  name: "换手率",
							  scale: true,
							  interval: 5,
							  axisLabel: {
								formatter: "{value} °%"
							  }
							}
						  ],
						  dataZoom: [
							{
							  type: "inside",
							  xAxisIndex: [0, 1],
							  start: 0,
							  end: 100
							},
							{
							  show: true,
							  xAxisIndex: [0, 1],
							  type: "slider",
							  top: "85%",
							  start: 0,
							  end: 100
							}
						  ],
						  series: [
							{
							  name: "当日信息",
							  type: "candlestick",
							  data: data.values,
							  itemStyle: {
								color: upColor,
								color0: downColor,
								borderColor: null,
								borderColor0: null
							  },
							  tooltip: {
								formatter: params => {
								  console.log(params);
								  return "sss";
								}
							  }
							},
							{
							  name: "5均线",
							  type: "line",
							  data: this.calculateMA(5, data),
							  smooth: true,
							  symbolSize: 0, //拐点大小
							  lineStyle: {
								opacity: 0.5
							  }
							},
							{
							  name: "10均线",
							  type: "line",
							  data: this.calculateMA(10, data),
							  smooth: true,
							  symbolSize: 0, //拐点大小
							  lineStyle: {
								opacity: 0.5
							  }
							},
							{
							  name: "20均线",
							  type: "line",
							  data: this.calculateMA(20, data),
							  smooth: true,
							  symbolSize: 0, //拐点大小
							  lineStyle: {
								opacity: 0.5
							  }
							},
							{
							  name: "30均线",
							  type: "line",
							  data: this.calculateMA(30, data),
							  smooth: true,
							  symbolSize: 0, //拐点大小
							  lineStyle: {
								opacity: 0.5
							  }
							},
							{
							  name: "成交量",
							  type: "bar",
							  xAxisIndex: 1,
							  yAxisIndex: 1,
							  data: data.volumes
							},
							{
							  name: "换手率",
							  type: "line",
							  lineStyle: {
								color: "#fff",
								width: 1,
								type: "solid"
							  },
							  smooth: false,
							  symbolSize: 5, //拐点大小
							  yAxisIndex: 2,
							  data: data.turnOver
							}
						  ]
						},
						true
					  );
		
					  this.$refs.klineChart.setChart(this.klineChart);
					
					  this.barChart.setOption(
						{
						  xAxis: {
							type: "category",
							data: data.categoryData
						  },
				
						  yAxis: [
							{
							  type: "value"
							}
						  ],
						  series: [
							{
							  name: "MACD",
							  type: "bar",
							  itemStyle: {
								normal: {
								  //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
								  color: function(params) {
									return params.value > 0 ? "#C1232B" : "#20c107";
								  },
								  //以下为是否显示，显示位置和显示格式的设置了
								  label: {
									show: false,
									position: "top",
									//                             formatter: '{c}'
									formatter: "{b}\n{c}"
								  }
								}
							  },
							  data: macd.macd
							},
							{
							  name: "DIF",
							  type: "line",
							  symbolSize: 1, //拐点圆的大小
							  color: ["rgba(255,242,104,0.56)"], //折线条的颜色
							  smooth: true, //关键点，为true是不支持虚线的，实线就用true
				
							  data: macd.dif
							},
							{
							  name: "DEA",
							  type: "line",
							  symbolSize: 1, //拐点圆的大小
							  color: ["#aaaaaa"], //折线条的颜色
							  smooth: true, //关键点，为true是不支持虚线的，实线就用true
							  data: macd.dea
							}
						  ]
						},
						true
					  );
						this.$refs.barChart.setChart(this.barChart);
				//       this.echart.on("brushEnd", params => {
				//         console.log(params, "brushEnd"); // 用某种方式输出统计值。
				
				//         if (
				//           !params.areas[0].coordRange ||
				//           !params.areas[0].coordRange[0] ||
				//           !params.areas[0].coordRange[1]
				//         )
				//           return;
				//         const start = Math.max(params.areas[0].coordRange[0], 0);
				//         const end = Math.min(
				//           params.areas[0].coordRange[1],
				//           this.currentShare.kline.length - 1
				//         );
				
				//         this.openAddRealTimePush(start, end);
				 
				//       });
					  this.buttonLoading = false
					},
						calculateMA(dayCount, data) {
						      var result = [];
						      for (var i = 0, len = data.values.length; i < len; i++) {
						        if (i < dayCount) {
						          result.push("-");
						          continue;
						        }
						        var sum = 0;
						        for (var j = 0; j < dayCount; j++) {
						          sum += data.values[i - j][1];
						        }
						        result.push(+(sum / dayCount).toFixed(3));
						      }
						      return result;
						    },
        }
    }
</script>

<style lang="less" scoped>
	.canvasView{
		width: 100vw;
		height: 100vh;
		display: flex;f
		flex-direction: row;
		.charts1-box{
			height: 100%;
			width: calc(100% - 300px);
		
		}
		.charts-box{
			height: 100%;
			width: 300px;
		
	
		}
	}	
</style>
