
const baseUrl= "http://120.26.62.101:3002/"
const wsUrl= "http://120.26.62.101:3003/"
const request = (Option) =>{

	return new Promise((resolve,reject)=>{
		uni.request({
		    url: baseUrl+Option.url,
		    data:Option.data,
			method:Option.method||'post',
		    header: {
		      
		    },
		    success: (res) => {
		       resolve(res.data)
		    },
			fail:(error)=>{
				reject(error)
			}
		});  
	})
	
}
export default request

