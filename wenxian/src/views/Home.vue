<template>
  <el-container>
    <el-header>
      <el-menu background-color="rgb(0,131,143)"
               text-color="#fff"  mode="horizontal"  active-text-color="gold"
               router :default-active="this.$route.path"
               >
        <div style="margin-top:6px ;float:left;width:80px;height:50px;">
          <img style="width: 100%;height:100%;" src="../assets/CSS/rsGarden.png" alt="">
        </div>
<!--        <div style="margin-top:6px ;float:left;width:250px;height:50px;">-->
<!--          <img style="width:150%;height:130%;" src="../assets/CSS/nletter.png" alt="">-->
<!--        </div>-->
        <div style="float:left;height:50px;margin-right:20px;">
          <div style="font-size:30px;font-family: STKaiti;color:white;margin-top:12px;">RS-GARDEN</div>
        </div>

<!--        <div style="font-size: 20px;">-->
<!--          学术花园-->
<!--&lt;!&ndash;          <img style="width: 100%;height:200%;" src="../assets/CSS/newLetter.png" alt="">&ndash;&gt;-->
<!--        </div>-->
        <el-menu-item id="Passage" index="Passage" v-if="false">检索主页</el-menu-item>

        <el-menu-item id="Welcome" v-if="ifLogin==='1'" index="Welcome">交流社区</el-menu-item>
        <div id="Welcome" v-else  style="width:0;"></div>

        <el-menu-item id="User" index="User" @click="userStore" v-if="ifLogin==='1'" >个人中心</el-menu-item>

        <el-menu-item id="Message" index="Message" @click="userStore_Message" v-if="ifLogin==='1'" >用户信箱</el-menu-item>


        <el-menu-item id="Super" v-if="this.ifSuper==='1'" index="Super">管理审核</el-menu-item>
        <div id="Super" v-else  style="width:0;"></div>

        <el-button class="log-box" v-if="ifLogin!=='1'" @click="toLogin">登录</el-button>
<!--        <el-button class="log-box" v-else>退出</el-button>-->
      </el-menu>
    </el-header>
    <el-main><router-view></router-view></el-main>
  </el-container>
</template>

<script>


export default {
  name: 'Home',
  created() {
   // alert(this.$route.path);
    //window.sessionStorage.setItem("isSuper","1");

    //this.realuID=window.sessionStorage.getItem("isSuper");
    this.ifSuper=window.sessionStorage.getItem("ifSuper");
    this.ifLogin=window.sessionStorage.getItem("ifLogin");
  },
  data(){
    return{
      ifLogin:"",
      ifSuper:"",
    };
  },
  methods:{
    userStore()
    {
      const tmp=window.sessionStorage.getItem("realuID");
       window.sessionStorage.setItem("uID",tmp);
       window.location.reload();
      this.$router.push("/Introduce");
    },
    userStore_Message()
    {
      // const tmp=window.sessionStorage.getItem("realuID");
      // window.sessionStorage.setItem("uID",tmp);
      // window.location.reload();
      this.$router.push("/Message");
    },
    toLogin()
    {
      this.$router.push("/Login");
    },
    // fsl()
    // {
    //   const tmp=window.sessionStorage.getItem("realuID");
    //   window.sessionStorage.setItem("uID",tmp);
    //   this.$router.push("/Introduce");
    // },
  }

}
</script >
<style Lang="less" scoped>
.el-main{
  background-color: #f0f0f0;
  margin:0;
  padding:0;
}
.el-header{
  margin:0;
  padding:0;
}
.el-menu{
  padding:0px 8px;

}
.el-menu-item{
  font-size:16px;
  font-family: SimSun-ExtB;
}
.el-menu-item:hover{
  background-color: #1E9992!important;
}
.el-menu-item:focus{
  border-bottom: 2px solid #ffd04b !important;
  color: #ffd04b !important;
}

.log-box{
  color: white;
  background: transparent;
  border-color: white;
  font-size: 16px;
  float: right;
  margin-top:10px;
}

</style>
