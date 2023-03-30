<template>
  <div class="login_container">
<!--    <div><el-button class="home_button" @click="return_home">返回首页</el-button></div>-->
<!--    <div><el-button class="home_button" @click="return_home">返回首页</el-button></div>-->
    <div class="iconfont"></div>
    <div class="login_box fade-in">

      <!-- 表单区域 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" label-width="80px" class="login_form">
        <div class="tracking-in-expand Login">用户注册</div>
        <el-form-item label="用户名" for="username" prop="username">
          <el-input v-model="registerForm.username" id="uID" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" for="email" prop="email">
          <el-input v-model="registerForm.email"  prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" for="pwd" prop="pwd">
          <el-input v-model="registerForm.pwd" id="uPWD" prefix-icon="el-icon-lock" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" for="confirmpwd" prop="confirmpwd">
          <el-input v-model="registerForm.confirmpwd" id="confirmuPWD" prefix-icon="el-icon-lock" type="password" clearable></el-input>
        </el-form-item>
<!--        <el-form-item label="绑定手机" for="telNum" prop="telNum">-->
<!--          <el-input v-model="registerForm.telNum" id="telNum" prefix-icon="el-icon-phone" clearable></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="" class="btns">
          <el-button type="success" @click="register">确定注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
          <el-button type="warning" @click="returnLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      // 验证手机号的规则
      var checkemail = (rule, value, cb) => {
        // const regNumber = /^([0|86|17951])?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        // if (regNumber.test(value)) {
        //   return cb();
        // }
        // cb(new Error('请输入合法的手机号'))
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(myreg.test(value))
        {
          return cb();
        }
        cb(new Error('请输入合法的邮箱'))
      }
      // 验证确认密码的规则
      var checkConfirmpwd = (rule, value, cb) => {
        if (value === this.registerForm.pwd) {
          return cb();
        }
        cb(new Error('两次密码需要一致'))
      }
      return {
        registerForm: {
          username: '',
          pwd: '',
          email:'',
        },
        registerRules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在2~15范围内', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在6~15范围内', trigger: 'blur' }
          ],
          confirmpwd: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: checkConfirmpwd, trigger: 'blur'}
          ],
          email: [
            { required: true, message: '绑定邮箱不能为空', trigger: 'blur' },
            { validator: checkemail, trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      resetRegisterForm () {
        this.$refs.registerFormRef.resetFields()
      },
      register () {
        console.log(this.registerForm)
        this.$refs.registerFormRef.validate(async (valid) => {
         if (valid) {
          console.log("???")
          await new Promise((resolve) => {
            console.log("进来")
            this.$http.post('/user/register', JSON.stringify(this.registerForm)).then((res) => {
              if (res.data.success === false) {
                this.$message.error(res.data.message)
                return
              }
              console.log("成功啦！")
              this.$message.success("注册成功")
            });
            resolve();
          }).then((data) => {
            this.$router.push('/login')
          })
        }
         else{return}})
      },
      returnLogin () {
        this.$refs.registerFormRef.resetFields()
        this.$router.push('/login')
      },
      return_home() {
        //this.$refs.loginFormRef.resetFields();
        this.$router.push("/Passage");
      },
      // return_home() {
      //   this.$refs.registerFormRef.resetFields()
      //   this.$router.push("/home");
      // },
    }
  }
</script>

<style Lang="less" scoped>
.Login {
  -webkit-background-clip: text;
  color:grey;
  font-size: 30px;
  margin:0 auto;
  font-weight: 600;
  margin-bottom: 30px;
}
.login_container {
  background-image:url(../assets/homeBg.png);
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
  height: 520px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 30%;
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
  position:relative;
  margin:0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  padding-bottom: 20px;
  top:60px;
  font-size:18px;
}
.btns{
  position:relative;
  right:30px;
  top:30px;
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
  background-color: #FFF !important;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
}
.el-form-item{
  margin-bottom:20px;
  font-size:25px;
}
.el-button{
  color: seagreen;
  background: white;
  border-color: lightseagreen;
  font-size:18px;
}
.el-button:hover{
  color: white;
  background: lightseagreen;
  border-color: lightseagreen;
}
.home_button{
  float:right;
  margin-top:15px;
  margin-right:15px;
  font-size:20px;
  background: transparent;
  color: white;
  // font-weight: bold;
  border:1px  solid white;
}
.home:hover{
  border:1px  solid white;
}
.iconfont{
  height:100px;
  width:100px;
  border-radius: 25px;
  background-size: 100% 100%;
  margin:0 auto;
  margin-top:100px;
}

</style>

