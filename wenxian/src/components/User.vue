<template>
  <div>
    <div class="head-box">
      <div class="selfInform-box">
        <el-row :gutter="20">
          <el-col :span="3">
            <div v-if="realuID!==uID" class="avatar"  @click="ifSendVisible=true">
              <el-avatar  :size="100" style="margin:5px;" :src="this.userInform.avatarUrl"></el-avatar>
            </div>
            <div v-else class="avatar" @click="avatarVisible=true">
              <el-avatar  :size="100" style="margin:5px;" :src="this.userInform.avatarUrl"></el-avatar>
            </div>
          </el-col>
          <el-col :span="15" >
            <div v-if="realuID===uID" style="font-size: 22px;font-weight: bold;text-align:left;margin:10px;">{{this.userInform.uName}}</div>
            <div v-else style="font-size: 22px;font-weight: bold;text-align:left;margin:10px;">欢迎来到{{this.userInform.uName}}的个人主页！</div>
            <div style="font-size: 14px;color:darkgray;text-align:left; margin-top:5px;margin-left:8px;">用户信箱ID:{{this.userInform.uID}}</div>
            <div style="margin:0;padding:5px;text-align: left;">
          <span style="font-size: 14px;color:darkgray;" v-for="(item,index) in userInform.uDegree" v-if="index<3" >
            {{item.uDegreeName}}.&nbsp&nbsp
          </span>
              <span style="font-size: 14px;color:darkgray;">等共{{this.userInform.lenDegree}}项学位</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div v-if="realuID===uID" style="margin:20px;float:left;">
              <!--          <el-button type="primary" class="front_btn">添加新研究 + </el-button>-->
            </div>
            <div v-else>
              <el-button v-if="this.haveFollowed===false" type="primary" class="front_btn" @click="followRecommand(uID)">一键关注</el-button>
              <el-button v-else type="primary" class="front_btn" @click="unfollowRecommand(uID)">取消关注</el-button>
            </div>
          </el-col>

        </el-row>
      </div>
      <div style="margin:0 auto; width:58%;">
        <el-menu background-color="white"
                 mode="horizontal"  active-text-color="#1E9992 !important"
                 router :default-active="this.$route.path"
        >
          <el-menu-item  id="Introduce" index="Introduce">概述</el-menu-item>
          <el-menu-item id="ResearchList" index="ResearchList">研究</el-menu-item>
          <el-menu-item  id="Project" index="Project">项目</el-menu-item>
          <el-menu-item id="QuestionList" index="QuestionList">提问</el-menu-item>
          <el-menu-item id="Collect" v-if="realuID===uID" index="Collect">收藏</el-menu-item>
          <div id="Collect" v-else  style="width:0;"></div>

          <el-menu-item id="Follow" v-if="realuID===uID" index="Follow">关注</el-menu-item>

          <el-menu-item  id="Statistics" index="Statistics">数据统计</el-menu-item>

          <!--          <div id="Follow" v-else  style="width:0;"></div>-->
        </el-menu>

      </div>
      <!--头像编辑对话框-->

      <!--头像编辑对话框-->
      <el-dialog title="请更新您的头像" :visible.sync="avatarVisible" width="30%">
        <el-form ref="userInformRef" :model="editAvatarForm"  enctype="multipart/form-data" label-width="80px" style="margin-top:20px;margin-bottom:20px;;padding-left:20px">
          <div style="font-size: 14px;font-weight: bold;margin-bottom: 20px;">请点击下面原有头像图片以上传新的头像:</div>
          <el-form-item label="" class="avatar_box">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="upload_por"
              :show-file-list="false" >
              <img v-if="editAvatarForm.avatarUrl" :src="editAvatarForm.avatarUrl" class="avatar_form">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--          <el-button @click="avatarVisible = false">取 消</el-button>-->
          <el-button type="primary" @click="avatarVisible = false">确 定</el-button>
        </div>


      </el-dialog>

      <!--发信对话框-->
      <el-dialog title="请编辑您要发送给该用户的消息" :visible.sync="ifSendVisible" width="35%">
        <el-form style="text-align: left;" ref="messageFormRef" :model="messageForm" :rules="messageFormRules" label-width="80px" label-position="top">
          <!--      <el-form-item label="收信用户信箱ID" prop="receiveUID">-->
          <!--        <el-input v-model="messageForm.receiveUID"></el-input>-->
          <!--      </el-form-item>-->
          <!--          <el-form-item label="收信用户名" prop="receiveUID">-->
          <!--            <el-input v-model="messageForm.receiveUName"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="信息标题" prop="mTitle">
            <el-input v-model="messageForm.mTitle"></el-input>
          </el-form-item>
          <el-form-item label="信息内容" prop="mText">
            <el-input type="textarea" v-model="messageForm.mText"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ifSendVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendMessageForm()">发送</el-button>
        </div>
      </el-dialog>
    </div>


    <div class="main-box">
      <!--  个人概述-->
      <router-view ></router-view>



    </div>

  </div>
</template>

<script>
export default {
  name: "User",




  data(){
    return{
      ifSendVisible:false,
      tabName:"1",
      avatarVisible:false,
      nameCardVisible:false,
      subjectCardVisible:false,
      skillCardVisible:false,
      haveFollowed:true,
      realuID:"",
      uID:"",
      uploadAvatar:{},
      //基本表
      uDegreeForm:[
        // {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        // {uDegreeID:"2",uDegreeName:"bachelor of science"},
      ],
      uInstitutionForm:[
        // {uInstitutionID:"1",uInstitutionName:"SoftWare"},
        // {uInstitutionID:"2",uInstitutionName:"Computer Science"},
        // {uInstitutionID:"3",uInstitutionName:"movie"}
      ],
      uSubjectForm:[
        // {uSubjectID:"1",uSubjectName:"SoftWare"},
        // {uSubjectID:"2",uSubjectName:"Computer Science"},
        // {uSubjectID:"3",uSubjectName:"movie"}
      ],
      uSkillForm:[
        // {uSkillID:"1",uSkillName:"C language"},
        // {uSkillID:"2",uSkillName:"Java"},
        // {uSkillID:"3",uSkillName:"Vue"}
      ],


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
      userInform:{

      },
      editAvatarForm:{avatarUrl:""},
      avatar_form:{file:"",uID:""},
      editNameCardForm:{
        // uID:"",
        // uName:"李静雯",
        // uDescription:"",
        // uDegree:[
        //   {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //   {uDegreeID:"2",uDegreeName:"bachelor of science"}
        // ],
        // uInstitution:"",
        // uDepartment:"SoftWare College",
      },
      uDegreeSelected:[],
      uSubjectSelected:[],
      uSkillSelected:[],


      subjectCardForm:{
        // uID:"",
        // uName:"李静雯",
        // uSubject:[
        //   {uSubjectID:"1",uSubjectName:"SoftWare"},
        //   {uSubjectID:"2",uSubjectName:"Computer Science"}
        // ],
      },
      skillCardForm:{
        // uID:"",
        // uName:"李静雯",
        // uSkill:[
        //   {uSkillID:"1",uSkillName:"C language"},
        //   {uSkillID:"2",uSkillName:"Java"},
        // ],
      },
      messageForm:{
        // sendUID:"",
        // receiveUID:"1",
        // mTitle:"我是肥肥李",
        // mText:"我是肥肥李,我真的好想睡觉",

      },
    };
  },

  created() {
    // 静态测试使用，后面删去;在这里调试是否是本用户访问门户
    // window.sessionStorage.setItem("realuID","2");
    // window.sessionStorage.setItem("uID","1");/**/

    this.realuID=window.sessionStorage.getItem("realuID");
    this.uID=window.sessionStorage.getItem("uID");

    /**/


    this.getuserInform();
    if(this.realuID!==this.uID)
    {
      this.ifHaveFollowed();

    }

    console.log(this.userInform);
    console.log("获取用户信息成功");
  },
  destroyed() {
    let uID_=window.sessionStorage.getItem("realuID");
    window.sessionStorage.setItem("uID",uID_);
  },
  methods:{

    //获取用户基本信息
    async getuserInform() {
      const uID=window.sessionStorage.getItem("uID");
      console.log("going!")
      console.log("uID")
      await new Promise((resolve) => {
        this.$http
          .post("/user/get/userInfo", JSON.stringify({uID: uID }))
          .then((res) => {
            if (res.data.success === false) {
              // this.$message.error("用户基本信息获取失败");
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "用户基本信息获取成功",
              //   showClose: true,
              //   type: "success",
              // });
              console.log("第二弹！！！")
              console.log(res.data)
              this.userInform=res.data.userInform;
              this.editNameCardForm=res.data.userInform;
              this.subjectCardForm=res.data.userInform;
              this.editAvatarForm.avatarUrl=res.data.userInform.avatarUrl;
              this.skillCardForm=res.data.userInform;
            }
          });
        resolve();
      });

      for(var i=0;i<this.editNameCardForm.uDegree.length;i++)
        this.uDegreeSelected[i]=this.editNameCardForm.uDegree[i].uDegreeID;
      for( i=0;i<this.subjectCardForm.uSubject.length;i++)
        this.uSubjectSelected[i]=this.subjectCardForm.uSubject[i].uSubjectID;
      for( i=0;i<this.skillCardForm.uSkill.length;i++)
        this.uSkillSelected[i]=this.skillCardForm.uSkill[i].uSkillID;

    },


    //关注函数
    async followRecommand(uID){
      const realuID=window.sessionStorage.getItem("realuID");
      console.log("我关注了！！！")
      console.log({uID:realuID,followsID:uID});
      await new Promise((resolve) => {
        this.$http
          .post("/user/follow", JSON.stringify({uID:realuID,followsID:uID}))
          .then((res) => {
            console.log("what is wrong")
            console.log(res.data);
            if (res.data.success === false) {
              this.$message.error("关注失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "关注成功",
                showClose: true,
                type: "success",
              });
            }
          });
        resolve();
      });
      this.ifHaveFollowed();
      window.location.reload();

    },
    //取消关注函数
    async unfollowRecommand(uID){
      const realuID=window.sessionStorage.getItem("realuID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/delete/follow", JSON.stringify({uID:realuID,followsID:uID}))
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
            }
          });
        resolve();
      });
      this.ifHaveFollowed();
      window.location.reload();
    },
    //是否已经关注该用户
    async ifHaveFollowed(){
      const realuID=window.sessionStorage.getItem("realuID");
      const uID=window.sessionStorage.getItem("uID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/haveFollowedUser", JSON.stringify({uID:realuID,followsID:uID}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "获取是否已关注信息成功",
              //   showClose: true,
              //   type: "success",
              // });
              console.log("我总有一天会被气死的")
              console.log(res.data);
              this.haveFollowed=res.data.haveFollowed;
            }
          });
        resolve();
      });


    },/**/
//跳转到其他作者门户
    jumpUser(uID){
      window.sessionStorage.setItem("uID",uID);
      window.location.reload();
      //this.$router.push({path:"/Introduce"})
    },
    //发送信息by ljw 20220902
    async sendMessageForm() {
      this.messageForm.sendUID=this.realuID
      this.messageForm.receiveUID=this.uID
      this.messageForm.mType="0"
      await new Promise((resolve) => {
        this.$http
          .post("message/send", JSON.stringify(this.messageForm))
          .then((res) => {
            console.log(this.messageForm);
            if (res.data.success === false)
              this.$message.error("信息发送失败，请检查收信用户ID是否存在");
            else {
              this.$message.success("信息发送成功！");
              this.messageForm ={};
             // this.getSendList()

            }

          });
        resolve();
      });
      this.ifSendVisible = false
      this.messageForm={}//清空
    },


    // 上传图片
    upload_por(f){
      const isJPG = f.file.type === 'image/jpeg';
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式');
        return;
      }
      let form = new FormData();
      form.append('file', f.file);
      form.append('uID', this.uID);
      this.$message.success(form.uID);
      new Promise((resolve) => {
        this.$http
          .post("/user/update/avatar",form)
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("提交失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "上传成功",
                showClose: true,
                type: "success",
              });
              this.avatarVisible=false;
              location.reload();
              console.log(res.data);
            }
          });
        resolve();
      });
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
.el-menu-item:hover{
  color:lightseagreen !important;
}
.el-menu-item{
  background-color: white !important;
}
.el-menu-item:focus{
  color:lightseagreen !important;
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
>>>.el-menu-item{
  font-size:16px !important;
}
.front_btn{
  border-radius: 0px !important;
  font-size:18px !important;
  box-shadow:0px 3px 10px rgba(0,0,0,0.3) !important;
}
.avatar-uploader .el-upload {
  float:right;
  border: 1px dashed #008B8B !important;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #008B8B;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;

}
.avatar_form{
  width: 100px;
  height: 100px;
  display: block;


}
.avatar_box{
  //float:left;
}
>>>.el-form-item__content{
  margin-left:0px !important;
}

</style>
