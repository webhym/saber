<template>
  <!-- <div class="container">Login</div> -->
  <!-- 全屏容器 -->
  <div class="container-login">
    <!-- 卡片 -->
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login()" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  name: "app-login",
  data() {
    //自定义手机号校验
    const checkMobile = (rule, value, callback) => {
      //进行校验(1开头，第二位3-9数字，其余剩下的9位数字)
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error("手机号输入错误,请重新输入"));
      } else {
        callback();
      }
    };
    return {
      //表单对应的数据对象
      loginForm: {
        mobile: "18626262626",
        code: "246810"
      },
      //表单对应校验规则
      loginRules: {
        //required:是否必选,
        // massage:错误提示,
        // trigger:触发校验时机
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkMobile,
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            //len 输入内容必须是6位 min max 指定字符串的范围
            len: 6,
            message: "验证码6个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      //对整体表单进行校验
      this.$refs.loginForm.validate(async valid => {
        //valid 值为 true 校验成功
        if (valid) {
          //TODO 进行登录
          // this.$http
          //   .post(
          //     "http://ttapi.research.itcast.cn/mp/v1_0/authorizations",
          //     this.loginForm
          //   )
          //   .then(res => {
          //响应报文对象(响应状态行，响应头，响应主体 res.data)
          // res.data = {message:'',data:'用户信息'}对比
          //本地存储用户信息，使用auth.js模块中的setUser函数
          //     auth.setUser(res.data.data); //这才是用户信息{token,id,name,photo}
          //     this.$router.push("/");
          //   })
          //   .catch(() => {
          //     this.$message.Error("手机号或验证码错误");
          //   });
          try {
            // 理想情况
            //1.发送请求获取数据
            const res = await this.$http.post("authorizations", this.loginForm);
            //2.本地存储用户信息
            auth.setUser(res.data.data);
            //3.跳转到首页
            this.$router.push("/");
          } catch (e) {
            //异常情况
            //1.错误提示即可
            this.$message.Error("手机号或验证码错误");
          }
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
.container-login {
  width: 100%;
  height: 100%;
  //设置我的容器绝对定位，依赖窗口高度和宽度
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/login_bg.jpg) no-repeat;
  //让北京图等比例缩放 铺满容器
  background-size: cover;
  .my-card {
    width: 400px;
    height: 350px;
    transform: translate(-50%, -60%);
    position: absolute;
    left: 50%;
    top: 50%;
    img {
      width: 200px;
      display: block;
      margin: 0 auto 25px;
    }
  }
}
</style>