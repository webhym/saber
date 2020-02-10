//导出一个配置好的axios提供给main使用
import axios from 'axios'
import auth from '@/utils/auth'
import router from '@/router'

//对axios进行配置
//基准地址配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
//请求头token配置
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
//请求拦截器
axios.interceptors.request.use(config => {
    // 获取本地的token，如果有token咱们就追加即可
    const user = auth.getUser()
    if (user.token) config.headers.Authorization = `Bearer ${user.token}`
    return config
}, error => {
    return Promise.reject(error)
})
//响应拦截器
axios.interceptors.response.use(res => {
    return res
}, err => {
    //token失效 后台会报错
    // err.response 响应报文
    // err.pesponse.status 状态码
    if (err.response && err.response.status === 401) {
        //拦截到登录页面
        //只有vue实例才可以调用 $router或者$route
        //$router 使用路由实例，，我们在router/index.js初始过路由实例
        //$router === router/index.js
        router.push('/login')
    }
    return Promise.reject(err)
})

//导出axios
export default axios