//进行路由饿初始化,和配置
//导入
import VueRouter from 'vue-router'
//注册
import Vue from 'vue'
Vue.use(VueRouter)
//初始化
const router = new VueRouter({
    routes: []
})
//导出
export default router