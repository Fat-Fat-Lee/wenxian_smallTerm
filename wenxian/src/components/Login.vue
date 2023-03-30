<template>
  <div class="login_container fade-in">
<!--    <div>-->
<!--      <el-button class="home_button" @click="return_home">返回首页</el-button>-->
<!--    </div>-->
    <div>
<!--      <el-button class="home_button" @click="return_home">返回首页</el-button>-->
    </div>
    <div class="iconfont"></div>
    <div class="login_box">
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login_form"
        autocomplete="off"
      >
        <div class="tracking-in-expand Login">AASP</div>
        <el-form-item label="邮箱" for="email" prop="email">
          <el-input
            v-model="loginForm.email"
            id="username"
            prefix-icon="el-icon-user"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" for="pwd" prop="pwd">
          <el-input
            v-model="loginForm.pwd"
            id="uPWD"
            prefix-icon="el-icon-lock"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="btns">
          <el-button @click="login">登录</el-button>
          <el-button @click="register_in">注册</el-button>
        </el-form-item>
        <!--        <el-form-item label="" class="btns">-->
        <!--          <el-button round type="info" @click="resetLoginForm">重置</el-button>-->
        <!--          <el-button round type="warning" @click="return_home"-->
        <!--            >返回首页</el-button-->
        <!--          >-->
        <!--        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        pwd: "",
      },
      loginRules: {
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { min: 6, max: 50, message: "长度在6~50范围内", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 25, message: "长度在6~25范围内", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.$message({ message: "请先登录~~~~", type: "success" });
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
     // //-----by ljw 20220901测试用后面删除
     //  this.$router.push("/Message");
     //  //------------------------------
      console.log(this.loginForm);
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        await new Promise((resolve) => {
          this.$http
            .post("/user/login", JSON.stringify(this.loginForm))
            .then((res) => {
              console.log(res);
              if (res.data.message === "用户不存在") {
                this.$message.error("用户不存在");
                return;
              }
              if (res.data.message === "密码错误") {
                this.$message.error("密码错误");
                return;
              }
              // this.$store.commit("login");
              this.$message.success("登录成功");
              // window.sessionStorage.setItem("token", res.data.token);
              window.sessionStorage.setItem(
                "uID",
                JSON.stringify(res.data.uID)
              );
              window.sessionStorage.setItem(
                "realuID",
                JSON.stringify(res.data.uID)
              );
              window.sessionStorage.setItem(
                "ifSuper",
                JSON.stringify(res.data.ifSuper)
              );
              window.sessionStorage.setItem(
                "ifLogin",
                "1"
              );
              this.$router.push("/user");
            });
          resolve();
        }).then((data) => {});
      });
    },
    register_in() {
      this.$router.push("/register");
    },
    return_home() {
      //this.$refs.loginFormRef.resetFields();
      this.$router.push("/Passage");
    },
  },
};
</script>

<style Lang="less" scoped>
.Login {
  -webkit-background-clip: text;
  color: grey;
  font-size: 30px;
  margin: 0 auto;
  font-weight: 600;
  margin-bottom: 30px;
}
.login_container {
  background-image: url(../assets/homeBg.png);
  background-size: 100% 100%;
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  background-position: center; /* 背景图随屏幕尺寸变化 背景图两边隐藏 图片不压缩 */
  background-repeat: no-repeat;
  overflow: hidden;
}
.login_box {
  width: 500px;
  height: 400px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  position: relative;
  box-shadow: 0 0 10px #ddd;
  border-radius: 5px;
  //background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}

.login_box .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  padding-bottom: 20px;
  top: 60px;
  font-size: 18px;
}
.btns {
  position: relative;
  right: 30px;
  top: 30px;
}
.login_form .btns {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
}

element.style {
}
.el-input--prefix .el-input__inner {
  padding-left: 30px;
}
.el-input--suffix .el-input__inner {
  padding-right: 30px;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff !important;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.el-form-item {
  margin-bottom: 20px;
  font-size: 25px;
}
.el-button {
  color: seagreen;
  background: white;
  border-color: lightseagreen;
  font-size: 18px;
}
.el-button:hover {
  color: white;
  background: lightseagreen;
  border-color: lightseagreen;
}
.home_button {
  float: right;
  margin-top: 15px;
  margin-right: 15px;
  font-size: 20px;
  background: transparent;
  color: white;
  // font-weight: bold;
  border: 1px solid white;
}
.home:hover {
  border: 1px solid white;
}
.iconfont {
  height: 100px;
  width: 100px;
  border-radius: 25px;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
