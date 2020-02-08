<template>
  <el-container class="container-home">
    <el-aside class="my-saide" :width="isOpen?'200px':'64px'">
      <!-- logo区域 -->
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- 导航菜单 -->
      <!-- 布尔类型的值必须使用:否则值是字符串类型 -->
      <el-menu
        default-active="1"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right : none"
        :collapse="!isOpen"
        :collapse-transition="false"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span @click="toggleMenu" class="icon el-icon-s-fold"></span>
        <span class="text">hym狂的很嗷</span>
        <!-- 右边下拉菜单 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <!-- 用户头像 -->
            <img class="head" src="../../assets/avatar.jpg" alt />
            <!-- 用户名称 -->
            <strong class="name">梦仔嗷</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由显示的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "app-home",
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped lang='less'>
.container-home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .my-saide {
    background-color: #002233;
    .logo {
      width: 100%;
      height: 60px;
      // background: ... 背景图定位/背景图尺寸
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    //样式一定需要写在logo下方，加上这个累之后覆盖上面的样式
    .minLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown {
      float: right;
      .head {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        padding-left: 5px;
        vertical-align: middle;
      }
    }
  }
}
</style>