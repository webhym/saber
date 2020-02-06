//导包
import Vue from 'vue'
import App from './App.vue'

//导入 路由
// import router from './router/index.js'
import router from '@/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入axios


//使用饿了么UI
Vue.use(ElementUI)

//配置Vue框架的日志级别 productionTip
//false不是生产环境级别日志，开发环境日志，日志详细
//true生产环境级别日志，上线之后部署服务器之后，日志简单
Vue.config.productionTip = false

//根实例
//使用App.vue组件渲染到 #app容器中
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
//main.js的职责
//1.依赖项目需要的资源(公共功能模块，需要导入main.js)
//2.创建一个Vue根实例