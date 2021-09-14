<template>
	<view class="content">
    <!-- <button  open-type="getUserInfo" @getUserInfo="getUserInfo"> 获取头像昵称 </button> -->
		<view class="text-area" >
			    <image class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover" ></image>
				<text v-if="userInfo.nickName">{{userInfo.nickName}}</text>
				<text v-if="userInfo.phoneNum">{{userInfo.phoneNum}}</text>
		</view>
		
		 <button type="primary" @click="getUserInfo()" size="mini">获取信息</button>
	      <button type="primary" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" size="mini">点击绑定</button>
	</view>
</template>

<script>
	// import qiunDataCharts from'../../components/qiun-data-charts/qiun-data-charts.vue'
	export default {
		data() {
			return {
				chartData: {
					categories: ['2019/5/5', '2019/5/6', '2019/5/6', '2019/5/8', '2019/5/9', '2019/5/10'],
					series: [{
						name: '上证指数',
						data: [
							[2320.26, 2302.6, 2287.3, 2362.94],
							[2300, 2291.3, 2288.26, 2308.38],
							[2295.35, 2346.5, 2295.35, 2346.92],
							[2347.22, 2358.98, 2337.35, 2363.8],
							[2360.75, 2382.48, 2347.89, 2383.76],
							[2383.43, 2385.42, 2371.23, 2391.82],
							[2377.41, 2419.02, 2369.57, 2421.15]
						]
					}]
				},
				title: 'Hello',
				appid:  'wxafa6eb0a8e87dde3',
				secret: '648045a740a4537fa9145e5ef63401e3',
				userInfo:{
					openId:'',
					sessionKey:'',
					encryptedData:'',
					iv:'',
					phoneNum:'',
					nickName:'',
					avatarUrl:''
				}
			}
		},
		onLoad() {
			// this.getUserInfo()
		},
		methods: {
			getUserInfo(){
				if(uni.getUserProfile) {
						uni.getUserProfile({
						desc: '微信页面展示',
						success:  infoRes=> {
							console.log(infoRes.userInfo)
							this.userInfo.nickName = infoRes.userInfo.nickName
							this.userInfo.avatarUrl = infoRes.userInfo.avatarUrl
						},
						fail:error=>{
							console.log(error)
						}
					})
				}
			},
			getPassword(){
				const WXBizDataCrypt = require('../common/WXBizDataCrypt.js')
				let pc = new WXBizDataCrypt(this.appid, this.userInfo.sessionKey)
						console.log('解密后 data: ',this.userInfo,pc)
				let data = pc.decryptData(this.userInfo.encryptedData , this.userInfo.iv)
				
				console.log('解密后 data: ', data,this.userInfo)
			},
			login(){
				uni.login({
				  provider: 'weixin',
				  success:  res=> {
					  
					
					let appid = this.appid
					let secret = this.secret
					let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
								res.code + '&grant_type=authorization_code';
					uni.request({
						url: url, // 请求路径
						success: result => {				
							this.userInfo.openId = result.data.openid
							this.userInfo.sessionKey = result.data.session_key
							console.info(result.data.openid,'openid');
							this.getPassword()
							},
						});
					} 
				});
			},
			decryptPhoneNumber(e){
				  if(e.detail.errMsg == "getPhoneNumber:ok"){
				        console.log("用户点击了接受")
				        console.log(e.detail);
				    this.userInfo.encryptedData = e.detail.encryptedData
				    this.userInfo.iv = e.detail.iv
				    this.login()       
				    }else{
				        console.log("用户点击了拒绝")
				    }   
				
			}
		 }
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.userinfo-avatar {
	  overflow: hidden;
	  width: 128rpx;
	  height: 128rpx;
	  margin: 20rpx;
	  border-radius: 50%;
	}
</style>
