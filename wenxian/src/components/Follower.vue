<template>
  <div>

    <div class="main-box">
      <!--  个人概述-->
      <div>
        <el-row :gutter="10">
          <el-col :span="6" class="nav_col">
            <el-menu
              :default-active="this.$route.path"
              router
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>关注人</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(item, i) in navList"
                    :key="i"
                    :index="item.name"
                  >
                    <div>
                      {{ item.navItem }}
                    </div>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="18">
            <!--          我关注的人卡片-->
            <el-card class="self-card">
<!--              <el-input  placeholder="请按照用户名检索" v-model="queryInfo.query" clearable>-->
<!--                <el-button slot="append" icon="el-icon-search"  @click="getFollowList" class="a"></el-button>-->
<!--              </el-input>-->
              <div>
                <div style="margin:20px 0px;text-align: left;">
                  <div v-for="(item,index) in uFollowing"  :key="item.uID">
                    <div class="clearfix" style="margin-bottom:20px;">
                      <div style="float:left;margin-right: 10px;">
                        <el-avatar :size="40" :src="item.avatarUrl"></el-avatar>
                      </div>
                      <div style="float:left;">
                        <el-tooltip placement="top-start">
                          <div slot="content"  class="clearfix" style="width:400px;padding:20px;margin-top:20px;text-align: left;">
                            <div style="width:70%;float:left;">
                              <!--          用户名+学位-->
                              <div style="margin-bottom: 10px">
                                <div style="font-size: 18px;font-weight: bold;">{{item.uName}}</div>
                                <div v-if="item.lenDegree!==0" style="margin:0;">
                            <span style="font-size: 14px;color:darkgray;" v-for="item_ in userInform.uDegree" :key="item_.uDegreeID">
                            {{item_.uDegreeName}}
                            </span>
                                </div>
                              </div>
                              <!--                  邮箱-->
                              <div  style="margin-bottom: 10px;font-size: 14px;color:lightgrey;">
                                <div style="font-weight: bold;color:white;">邮箱</div>
                                <div>
                                  {{item.uEmail}}
                                </div>

                              </div>
                              <!--                个人介绍-->
                              <div v-if="item.uDescription!==''" style="margin-bottom: 10px">
                                <div style="font-size: 16px;color:lightgrey;font-style: italic;">{{item.uDescription}}</div>
                              </div>
                              <!--          机构和部门-->
                              <div v-if="item.uInstitution!==''" style="margin-bottom: 10px;font-size: 14px;color:lightgrey">
                                <div style="font-weight: bold;color:white">机构和部门</div>
                                <div>
                                  {{item.uInstitution}}-
                                  {{item.uDepartment}}
                                </div>

                              </div>
                              <!--          技能-->
                              <div v-if="item.lenSkill!==0" style="margin-bottom: 10px;font-size: 14px;color:lightgray;">
                                <div style="font-weight: bold;color:white">技能</div>
                                <div>
                            <span v-for="(item_,index) in userInform.uSkill" v-if="index<3" :key="item_.uSkillID">
                             {{item_.uSkillName}}.
                            </span>等
                                </div>

                              </div>
                            </div>
                            <div style="float:right;">
                              <el-avatar :size="60" style="margin:5px;" :src="item.avatarUrl"></el-avatar>
                            </div>

                          </div>
                          <div style="font-size: 16px;font-weight: bold;">
                            <el-button class="claim_btn" type="text" @click="jumpUser(item.uID)">{{item.uName}}</el-button>
                          </div>
                        </el-tooltip>
                        <div style="font-size: 14px;font-style: italic">有{{item.uNumFollow}}位用户关注了他</div>
                      </div>
<!--                      <el-button class="followButton" type="primary" plain size="small" @click="unfollowRecommand(item.uID)">取消关注</el-button>-->
                    </div>
                  </div>

                </div>

              </div>
            </el-card>

          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Follower",
  data(){
    return{
      realuID:"",
      uID:"",
      navList: [
        { name: "/Follow", navItem: "我关注的用户" },
        { name: "/Follower", navItem: "关注我的用户" },
      ],
      avatarVisible:false,
      queryInfo: {
        uID:"",
        query: "", //搜索关键字
        qsort: 10, //记录排序参数，默认按关注度降序

      },
      //uFollowing: [],
      uFollowing:[
        {
          uID:"1",uName:"AAA",uEmail:"18222333734@163.com",
          uNumFollow:12,
          avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          uDescription:"",
          uDegree:[
            {uDegreeID:"1",uDegreeName:"bachelor of technology"},
            {uDegreeID:"2",uDegreeName:"bachelor of science"}
          ],
          uInstitution:"", uDepartment:"SoftWare College",
          uSkill:[
            {uSkillID:"1",uSkillName:"C language"},
            {uSkillID:"2",uSkillName:"Java"},
            {uSkillID:"3",uSkillName:"Vue"}
          ],
          lenDegree:2,
          lenSkill:3,
        },
        {
          uID:"2",uName:"CHJK",uEmail:"18222333734@163.com",

          uNumFollow:90,
          avatarUrl:"https://himg.bdimg.com/sys/portrait/item/public.1.dc6ae00d.ubgN4svQhGe9gL3Ltweyeg.jpg",
          uDescription:"",
          uDegree:[
            {uDegreeID:"1",uDegreeName:"bachelor of technology"},
            {uDegreeID:"2",uDegreeName:"bachelor of science"}
          ],
          uInstitution:"", uDepartment:"SoftWare College",
          uSkill:[
            {uSkillID:"1",uSkillName:"C language"},
            {uSkillID:"2",uSkillName:"Java"},
            {uSkillID:"3",uSkillName:"Vue"}
          ],
          lenDegree:2,
          lenSkill:3,
        },
        {
          uID:"3",uName:"PLP",uEmail:"18222333734@163.com",

          uNumFollow:1700,
          avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          uDescription:"",
          uDegree:[
            {uDegreeID:"1",uDegreeName:"bachelor of technology"},
            {uDegreeID:"2",uDegreeName:"bachelor of science"}
          ],
          uInstitution:"", uDepartment:"SoftWare College",
          uSkill:[
            {uSkillID:"1",uSkillName:"C language"},
            {uSkillID:"2",uSkillName:"Java"},
            {uSkillID:"3",uSkillName:"Vue"}
          ],
          lenDegree:2,
          lenSkill:3,
        },

      ],

      //userInformRules: {},
      userInformRules: {
        uName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"},
        ],
        uDescription: [
          { required: false, message: "请输入您的个人介绍", trigger: "blur" },
          { min: 1, max: 200, message: "长度在 1 到 200 个字符", trigger: "blur"},
        ],
        uDepartment: [
          { required: false, message: "请输入您所在的部门", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"},
        ],
        uCharacter: [
          { required: false, message: "请输入您在部门担任的角色", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"},
        ],
        avatarUrl: [{ required: true, message: "请填写您的头像链接", trigger: "blur" },]
      },

      //userInform: {},
      userInform:{
        uID:"",
        uName:"李静雯",
        uEmail:"18222333734@163.com",
        uDescription:"",
        uDegree:[
          {uDegreeID:"1",uDegreeName:"bachelor of technology"},
          {uDegreeID:"2",uDegreeName:"bachelor of science"}
        ],
        uInstitutionID:"",
        uInstitutionName:"",
        uDepartment:"SoftWare College",
        uCharacter:"董事长",
        uSubject:[
          {uSubjectID:"1",uSubjectName:"SoftWare"},
          {uSubjectID:"2",uSubjectName:"Computer Science"}
        ],
        uSkill:[
          {uSkillID:"1",uSkillName:"C language"},
          {uSkillID:"2",uSkillName:"Java"},
        ],
        lenDegree:2,
        lenSubject:2,
        lenSkill:3,
        uRecommand:[
          {
            uID:"1",uName:"AAA",uEmail:"18222333734@163.com",
            uNumFollow:12,
            avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            uDescription:"",
            uDegree:[
              {uDegreeID:"1",uDegreeName:"bachelor of technology"},
              {uDegreeID:"2",uDegreeName:"bachelor of science"}
            ],
            uInstitution:"", uDepartment:"SoftWare College",
            uSkill:[
              {uSkillID:"1",uSkillName:"C language"},
              {uSkillID:"2",uSkillName:"Java"},
              {uSkillID:"3",uSkillName:"Vue"}
            ],
            lenDegree:2,
            lenSkill:3,
          },
          {
            uID:"2",uName:"CHJK",uEmail:"18222333734@163.com",
            uNumFollow:90,
            avatarUrl:"https://himg.bdimg.com/sys/portrait/item/public.1.dc6ae00d.ubgN4svQhGe9gL3Ltweyeg.jpg",
            uDescription:"",
            uDegree:[
              {uDegreeID:"1",uDegreeName:"bachelor of technology"},
              {uDegreeID:"2",uDegreeName:"bachelor of science"}
            ],
            uInstitution:"", uDepartment:"SoftWare College",
            uSkill:[
              {uSkillID:"1",uSkillName:"C language"},
              {uSkillID:"2",uSkillName:"Java"},
              {uSkillID:"3",uSkillName:"Vue"}
            ],
            lenDegree:2,
            lenSkill:3,
          },
          {
            uID:"3",uName:"PLP",uEmail:"18222333734@163.com",
            uNumFollow:1700,
            avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            uDescription:"",
            uDegree:[
              {uDegreeID:"1",uDegreeName:"bachelor of technology"},
              {uDegreeID:"2",uDegreeName:"bachelor of science"}
            ],
            uInstitution:"", uDepartment:"SoftWare College",
            uSkill:[
              {uSkillID:"1",uSkillName:"C language"},
              {uSkillID:"2",uSkillName:"Java"},
              {uSkillID:"3",uSkillName:"Vue"}
            ],
            lenDegree:2,
            lenSkill:3,
          },

        ],

        avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
      editAvatarForm:{/*avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",*/},

    };
  },
  mounted()
  {
    //顶子刷新依然金色
    if(this.$route.path==="/Follow")
    {
      const tmpA=document.getElementById('Passage');
      const tmpB=document.getElementById('Welcome');
      const tmpC=document.getElementById('User');
      const tmpD=document.getElementById('Super');
      tmpA.style.color="white"
      tmpB.style.color="white"
      tmpC.style.color="gold"
      tmpD.style.color="white"
    }
    if(this.$route.path==="/Follow")
    {
      const tmp0=document.getElementById('Introduce');
      const tmp1=document.getElementById('Myupload');
      const tmp2=document.getElementById('Statistics');
      const tmp3=document.getElementById('Collect');
      const tmp4=document.getElementById('Follow');
      tmp0.style.color="grey"
      tmp1.style.color="grey"
      tmp2.style.color="grey"
      tmp3.style.color="grey"
      tmp4.style.color="#1E9992"
    }
  },
  created() {
    // window.sessionStorage.setItem("realuID","1");
    // window.sessionStorage.setItem("uID","1");
    this.realuID=window.sessionStorage.getItem("realuID");
    this.uID=window.sessionStorage.getItem("uID");

    this.getuserInform();
    this.getFollowList();
    console.log(this.userInform);
    console.log("获取用户信息成功");
    console.log(this.uFollowing)
  },
  methods:{
    //获取已关注列表
    async getFollowList() {
      this.queryInfo.uID=window.sessionStorage.getItem("realuID");
      await new Promise((resolve) => {
        this.$http
          .post("user/get/followed", JSON.stringify(this.queryInfo))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("用户关注人信息获取失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "用户关注人信息获取成功",
                showClose: true,
                type: "success",
              });
              this.uFollowing=res.data.uFollowing;
            }
          });
        resolve();
      });


    },
    //获取用户基本信息
    async getuserInform() {
      console.log(this.editNameCardForm);
      const uID=window.sessionStorage.getItem("realuID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/get/userInfo", JSON.stringify({uID: uID }))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("用户基本信息获取失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "用户基本信息获取成功成功",
                showClose: true,
                type: "success",
              });
              this.userInform=res.data.userInform;
              this.editAvatarForm=res.data.userInform;
            }
          });
        resolve();
      });

    },


    //关注函数
    async followRecommand(uID){
      const meUID=window.sessionStorage.getItem("realuID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/follow", JSON.stringify({uID:meUID,followsID:uID}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("关注失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "关注成功",
                showClose: true,
                type: "success",
              });
              //this.getFollowList();//已经关注了这个人，就刷新推荐新的关注人

            }
          });
        resolve();
        window.location.reload();
      });

    },
    //取消关注函数
    async unfollowRecommand(uID){
      const meUID=window.sessionStorage.getItem("realuID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/delete/follow", JSON.stringify({uID:meUID,followsID:uID}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("取消关注失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "取消关注成功",
                showClose: true,
                type: "success",
              });
              // this.getFollowList();//已经关注了这个人，就刷新推荐新的关注人
            }
          });
        resolve();
        window.location.reload();
      });

    },
    //跳转到其他作者门户
    jumpUser(uID){
      window.sessionStorage.setItem("uID",uID);
      this.$router.push({path:"/Introduce"})
    }

  }
}
</script>

<style Lang="less" scoped>


.head-box{
  width:100%;
  padding:15px 15px 0px 15px;
  background-color: white;

}
.selfInform-box{
  margin:0 auto;
  width:60%;
  padding:15px 15px 0px 15px;
  //background-color: red;
}
.el-button:hover{
  background-color: #1E9992;
}
>>>.el-tabs__header{
  margin:10px 0px 0px 0px !important;
}
>>>.el-tabs__item{
  font-size:18px;
}
.main-box{
  margin:0 auto;
  width:80%;
}
.self-card{
  float:left;
  width:100%;
}
.edit-button{
  float: right;
  padding: 3px 0;
  border:0px !important;
  border-radius: 0px !important;
  background-color: transparent !important;
  color:gray !important;
  margin-left: 10px;
}
.edit-button:hover{
  text-decoration:underline;
  background-color: transparent !important;
  color:lightseagreen !important;
}
>>>.el-card__header {
  border-bottom: 1px solid lightgray!important;
}
.clearfix:after{
  content:"";
  display:block;
  height:0;
  clear:both;
  visibility:hidden;
}
.avatar{
  float:left;
}
>>>.el-avatar:hover{
  border:2px dashed lightseagreen !important;
}
.avatar:hover{
  border-radius: 50%;
  border:2px dashed lightseagreen;
}
>>>.el-dialog__header {
  background-color: lightseagreen;
  text-align: left;
  padding: 35px;
}
>>>.el-dialog__title {
  line-height: 24px;
  font-size: 20px;
  font-weight:bold;
  color: white;
}
>>>.el-dialog__headerbtn .el-dialog__close {
  color: white !important;
}
>>>.el-form-item{margin-bottom: 12px !important;}
>>>.el-form-item__label{line-height: 35px !important;font-weight: bold !important;}
>>>.el-form--label-top .el-form-item__label{padding:0px !important;}
.followButton{
  float:right;
  margin-top:20px;
  font-size: 14px;
}
.claim_btn{
  font-weight: bold;
  color:dimgrey !important;
  padding:0px;
}
.claim_btn:hover{
  color:lightseagreen !important;
  text-decoration-line: underline;
  background-color: transparent !important;
}
.a:hover{color: white !important;}

.nav_col{
  padding-top: 20px;
  width: 25%;
}
</style>
