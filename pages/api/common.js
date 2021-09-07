import request from "../config/request.js"
// export default {
//   getAllKLineApi(data) {
//     return request({
//       url: "getAllKline", // 假地址 自行替换
//       method: "post",
//       data
//     });
//   },
//   getKline(data) {
//     return request({
//       url: "getKline", // 假地址 自行替换
//       method: "post",
//       data
//     });
//   },
//   makeTxt(data) {
//     return request({
//       url: "makeTxt", // 假地址 自行替换
//       method: "post",
//       data
//     });
//   }
// };
export function   getAllKlineApi (data) {
    return request({
      url: "getAllKline", // 假地址 自行替换
      method: "post",
      data
    });
  }
  export function  getKline (data){
      return request({
        url: "getKline", // 假地址 自行替换
        method: "post",
        data
      });
    }
	export function   makeTxt  (data) {
	    return request({
	      url: "makeTxt", // 假地址 自行替换
	      method: "post",
	      data
	    });
	  }