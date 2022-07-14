// 统一管理我们的开啊发  接口 api;
import axios from "axios";
let instance=axios.create({
    baseURL:"/api",     //基准地址
    timeout:5000
})
// 请求响应拦截
instance.interceptors.request.use((config)=>{
    console.log(config);
    return config
})
instance.interceptors.response.use(response=>{
    return response
})

export default instance