//进行路由饿初始化,和配置
//导入
import VueRouter from 'vue-router'
//注册
import Vue from 'vue'
//工具
import auth from '@/utils/auth'
//导入组件
//完整路径 @/views/login/index.vue  index.vue是索引文件
//疑问：index.js index.vue index.json 优先级和我书写的顺序一样
import Login from '@/views/login'
import Home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Setting from '@/views/setting'

Vue.use(VueRouter)
//初始化
const router = new VueRouter({
    routes: [
        { path: '/login', component: Login },
        {
            path: '/', component: Home, children: [
                { path: '/', component: welcome },
                { path: '/article', component: Article },
                { path: '/image', component: Image },
                { path: '/publish', component: Publish },
                { path: '/Comment', component: Comment },
                { path: '/Fans', component: Fans },
                { path: '/Setting', component: Setting }
            ]
        },
        //通配规则(以上所有规则不符合的时候，走这个规则)
        { path: '*', component: NotFound }
    ]
})

//前置导航守卫
router.beforeEach((to, from, next) => {
    //如果你不是登录页面，而且没有token，拦截到登录页面
    if (to.path !== '/login' && !auth.getUser().token) return next('/login')
    next()
})
//导出
export default router