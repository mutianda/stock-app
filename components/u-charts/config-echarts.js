/*
 * uCharts®
 * 高性能跨平台图表库，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）、Vue、Taro等支持canvas的框架平台
 * Copyright (c) 2021 QIUN®秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 复制使用请保留本段注释，感谢支持开源！
 * 
 * uCharts®官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */

// 通用配置项

// 主题颜色配置：如每个图表类型需要不同主题，请在对应图表类型上更改color属性
const color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];

module.exports = {
  //demotype为自定义图表类型
	"type": ["pie", "ring", "rose", "funnel", "line", "column", "area", "radar", "gauge","candle","demotype"],
  //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型例如最后的"demotype"
	"categories": ["line", "column", "area", "radar", "gauge", "candle","demotype"],
  //instance为实例变量承载属性，option为eopts承载属性，不要删除
	"instance": {},
	"option": {},
  //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
  "formatter":{
    "tooltipDemo1":function(res){
      let result = ''
      for (let i in res) {
      	if (i == 0) {
      		result += res[i].axisValueLabel + '年销售额'
      	}
      	let value = '--'
      	if (res[i].data !== null) {
      		value = res[i].data
      	}
      	// #ifdef H5
      	result += '\n' + res[i].seriesName + '：' + value + ' 万元'
      	// #endif
      	
      	// #ifdef APP-PLUS
      	result += '<br/>' + res[i].marker + res[i].seriesName + '：' + value + ' 万元'
      	// #endif
      }
      return result;
    },
    legendFormat:function(name){
      return "自定义图例+"+name;
    },
    yAxisFormatDemo:function (value, index) {
      return value + '元';
    },
    seriesFormatDemo:function(res){
      return res.name + '年' + res.value + '元';
    }
  },
  //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在eopts参数，会将demotype与eopts中option合并后渲染图表。
  "demotype":{
    "color": color,
    //在这里填写echarts的option即可
    
  },
  //下面是自定义配置，请添加项目所需的通用配置
	"column": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis'
		},
		"grid": {
			"top": 30,
			"bottom": 50,
			"right": 15,
			"left": 40
		},
		"legend": {
			"bottom": 'left',
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"seriesTemplate": {
			"name": '',
			"type": 'bar',
			"data": [],
			"barwidth": 20,
			"label": {
				"show": true,
        "color": "#666666",
				"position": 'top',
			},
		},
	},
	"line": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis'
		},
		"grid": {
			"top": 30,
			"bottom": 50,
			"right": 15,
			"left": 40
		},
		"legend": {
			"bottom": 'left',
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"seriesTemplate": {
			"name": '',
			"type": 'line',
			"data": [],
			"barwidth": 20,
			"label": {
				"show": true,
        "color": "#666666",
				"position": 'top',
			},
		},
	},
	"area": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis'
		},
		"grid": {
			"top": 30,
			"bottom": 50,
			"right": 15,
			"left": 40
		},
		"legend": {
			"bottom": 'left',
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"seriesTemplate": {
			"name": '',
			"type": 'line',
			"data": [],
			"areaStyle": {},
			"label": {
				"show": true,
        "color": "#666666",
				"position": 'top',
			},
		},
	},
	"pie": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"grid": {
			"top": 40,
			"bottom": 30,
			"right": 15,
			"left": 15
		},
		"legend": {
			"bottom": 'left',
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": '50%',
			"label": {
				"show": true,
        "color": "#666666",
				"position": 'top',
			},
		},
	},
	"ring": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"grid": {
			"top": 40,
			"bottom": 30,
			"right": 15,
			"left": 15
		},
		"legend": {
			"bottom": 'left',
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": ['40%', '70%'],
			"avoidLabelOverlap": false,
			"label": {
				"show": true,
        "color": "#666666",
				"position": 'top',
			},
			"labelLine": {
				"show": true
			},
		},
	},
	"rose": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"legend": {
			"top": 'bottom'
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": "55%",
			"center": ['50%', '50%'],
			"rosetype": 'area',
		},
	},
	"funnel": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item',
			"formatter": "{b} : {c}%"
		},
		"legend": {
			"top": 'bottom'
		},
		"seriesTemplate": {
			"name": '',
			"type": 'funnel',
			"left": '10%',
			"top": 60,
			"bottom": 60,
			"width": '80%',
			"min": 0,
			"max": 100,
			"minSize": '0%',
			"maxSize": '100%',
			"sort": 'descending',
			"gap": 2,
			"label": {
				"show": true,
				"position": 'inside'
			},
			"labelLine": {
				"length": 10,
				"lineStyle": {
					"width": 1,
					"type": 'solid'
				}
			},
			"itemStyle": {
				"bordercolor": '#fff',
				"borderwidth": 1
			},
			"emphasis": {
				"label": {
					"fontSize": 20
				}
			},
			"data": [],
		},
	},
	"gauge": {
		"color": color,
		"tooltip": {
        "formatter": '{a} <br/>{b} : {c}%'
    },
		"seriesTemplate": {
			"name": '业务指标',
      "type": 'gauge',
      "detail": {"formatter": '{value}%'},
      "data": [{"value": 50, "name": '完成率'}]
		},
	},
	"column":{
	    "type": "column",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#91CB74",
	        "#FAC858",
	        "#EE6666",
	        "#73C0DE",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        15,
	        0,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "xAxis": {
	        "disabled": false,
	      axisLine: {onZero: true},
	              splitLine: {show: false},
	              splitArea: {show: false}
	        "axisLineColor": "#CCCCCC",
	        "calibration": false,
	        "fontColor": "#666666",
	        "fontSize": 13,
	        "rotateLabel": false,
	        "itemCount": 5,
	        "boundaryGap": "center",
	        "disableGrid": true,
	        "gridColor": "#CCCCCC",
	        "gridType": "solid",
	        "dashLength": 4,
	        "gridEval": 1,
	        "scrollShow": false,
	        "scrollAlign": "left",
	        "scrollColor": "#A6A6A6",
	        "scrollBackgroundColor": "#EFEBEF",
	        "format": ""
	    },
	    "yAxis": {
	        "disabled": false,
	        "disableGrid": false,
	
	        "splitNumber": 5,
	        "gridType": "solid",
	        "dashLength": 8,
	        "gridColor": "#CCCCCC",
	        "padding": 10,
	        "showTitle": false,
	        "data": []
	    },
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "column": {
	            "type": "group",
	            "width": 30,
	            "seriesGap": 2,
	            "categoryGap": 3,
	            "barBorderCircle": false,
	            "linearType": "none",
	            "linearOpacity": 1,
	            "colorStop": 0,
	            "meterBorder": 1,
	            "meterFillColor": "#FFFFFF",
	            "activeBgColor": "#000000",
	            "activeBgOpacity": 0.08,
	            "meterBorde": 1
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        },
	        "markLine": {
	            "type": "solid",
	            "dashLength": 4,
	            "data": []
	        }
	    }
	},
	"mix":{
	    "type": "mix",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#91CB74",
	        "#FAC858",
	        "#EE6666",
	        "#73C0DE",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        15,
	        0,
	        15
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "xAxis": {
	        "disabled": false,
	        "axisLine": true,
	        "axisLineColor": "#CCCCCC",
	        "calibration": false,
	        "fontColor": "#666666",
	        "fontSize": 13,
	        "rotateLabel": false,
	        "itemCount": 5,
	        "boundaryGap": "center",
	        "disableGrid": true,
	        "gridColor": "#CCCCCC",
	        "gridType": "solid",
	        "dashLength": 4,
	        "gridEval": 1,
	        "scrollShow": false,
	        "scrollAlign": "left",
	        "scrollColor": "#A6A6A6",
	        "scrollBackgroundColor": "#EFEBEF",
	        "format": ""
	    },
	    "yAxis": {
	        "disabled": false,
	        "disableGrid": false,
	        "splitNumber": 5,
	        "gridType": "dash",
	        "dashLength": 4,
	        "gridColor": "#CCCCCC",
	        "padding": 10,
	        "showTitle": true,
	        "data": [
	            {
	                "position": "left",
	                "title": "折线"
	            },
	            {
	                "position": "right",
	                "min": 0,
	                "max": 200,
	                "title": "柱状图",
	                "textAlign": "left"
	            },
	            {
	                "position": "right",
	                "min": 0,
	                "max": 200,
	                "title": "点",
	                "textAlign": "left"
	            }
	        ]
	    },
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "mix": {
	            "column": {
	                "width": 20,
	                "seriesGap": 2,
	                "barBorderCircle": false,
	                "linearType": "none",
	                "linearOpacity": 1,
	                "colorStop": 0
	            }
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        },
	        "markLine": {
	            "type": "solid",
	            "dashLength": 4,
	            "data": []
	        }
	    }
	},
	"candle":{
		"type": "candle",
		"canvasId": "",
		"canvas2d": false,
		"background": "none",
		"animation": true,
		"timing": "easeOut",
		"duration": 1000,
		"color": [
			"#1890FF",
			"#91CB74",
			"#FAC858",
			"#EE6666",
			"#73C0DE",
			"#3CA272",
			"#FC8452",
			"#9A60B4",
			"#ea7ccc"
		],
		"padding": [
			15,
			15,
			0,
			15
		],
		"rotate": false,
		"errorReload": true,
		"fontSize": 13,
		"fontColor": "#666666",
		"enableScroll": true,
		"touchMoveLimit": 60,
		"enableMarkLine": true,
		"dataLabel": false,
		"dataPointShape": true,
		"dataPointShapeType": "solid",
		"tapLegend": true,
		"xAxis": {
			"disabled": false,
			"axisLine": true,
			"axisLineColor": "#CCCCCC",
			"calibration": false,
			"fontColor": "#666666",
			"fontSize": 13,
			"rotateLabel": false,
			"labelCount": 4,
			"itemCount": 40,
			"boundaryGap": "center",
			"disableGrid": true,
			"gridColor": "#CCCCCC",
			"gridType": "solid",
			"dashLength": 4,
			"gridEval": 1,
			"scrollShow": true,
			"scrollAlign": "left",
			"scrollColor": "#A6A6A6",
			"scrollBackgroundColor": "#EFEBEF",
			"format": ""
		},
		"yAxis": {
			"disabled": false,
			"disableGrid": false,
			"splitNumber": 5,
			"gridType": "solid",
			"dashLength": 8,
			"gridColor": "#CCCCCC",
			"padding": 10,
			"showTitle": false,
			"data": []
		},
		"legend": {
			"show": true,
			"position": "bottom",
			"float": "center",
			"padding": 5,
			"margin": 5,
			"backgroundColor": "rgba(0,0,0,0)",
			"borderColor": "rgba(0,0,0,0)",
			"borderWidth": 0,
			"fontSize": 13,
			"fontColor": "#666666",
			"lineHeight": 11,
			"hiddenColor": "#CECECE",
			"itemGap": 10
		},
		"extra": {
			"candle": {
				"color": {
					"upLine": "#f04864",
					"upFill": "#f04864",
					"downLine": "#2fc25b",
					"downFill": "#2fc25b"
				},
				"average": {
					"show": true,
					"name": [
						"MA5",
						"MA10",
						"MA30"
					],
					"day": [
						5,
						10,
						20
					],
					"color": [
						"#1890ff",
						"#2fc25b",
						"#facc14"
					]
				}
			},
			"tooltip": {
				"showBox": true,
				"showArrow": true,
				"showCategory": false,
				"borderWidth": 0,
				"borderRadius": 0,
				"borderColor": "#000000",
				"borderOpacity": 0.7,
				"bgColor": "#000000",
				"bgOpacity": 0.7,
				"gridType": "solid",
				"dashLength": 4,
				"gridColor": "#CCCCCC",
				"fontColor": "#FFFFFF",
				"splitLine": true,
				"horizentalLine": false,
				"xAxisLabel": false,
				"yAxisLabel": false,
				"labelBgColor": "#FFFFFF",
				"labelBgOpacity": 0.7,
				"labelFontColor": "#666666"
			},
			"markLine": {
				"type": "dash",
				"dashLength": 5,
				"data": [
					{
						"value": 2150,
						"lineColor": "#f04864",
						"showLabel": true
					},
					{
						"value": 2350,
						"lineColor": "#f04864",
						"showLabel": true
					}
				]
			}
		}
	},
		"xAxis": {
			"data": []
		},
		"yAxis": {},
		"color": color,
		"title": {
			"text": ''
		},
		"dataZoom": [{
				"type": 'inside',
				"xAxisIndex": [0, 1],
				"start": 10,
				"end": 100
			},
			{
				"show": true,
				"xAxisIndex": [0, 1],
				"type": 'slider',
				"bottom": 10,
				"start": 10,
				"end": 100
			}
		],
		"seriesTemplate": {
			"name": '',
			"type": 'k',
			"data": [],
		},
	}
}
