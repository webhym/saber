<template>
  <!-- <div class="container">Login</div> -->
  <!-- 全屏容器 -->
  <div class="container-login">
    <!-- 卡片 -->
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" status-icon>
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
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
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
        mobile: "",
        code: ""
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