<template>
  <div>
    <div class="head-box">
      <div class="selfInform-box">
        <el-row class="zcx_row" :gutter="20">
          <el-col :span="4">
            <div  style="float:left;">
              <el-avatar :size="80" style="margin:2px;" :src="this.userInform.avatorUrl"></el-avatar>
            </div>
          </el-col>
          <el-col :span="13" >
            <div style="font-size: 22px;font-weight: bold;text-align:left;margin:10px;">{{this.userInform.uName}}</div>
            <div style="margin:0;padding:5px;text-align: left;">
          <span style="font-size: 14px;color:darkgray;text-align:left; margin:5px;" v-for="item in userInform.uDegree" :key="item.uDegreeID">
            {{item.uDegreeName}}
          </span>
            </div>
          </el-col>
          <el-col :span="5">
            <div style="margin:20px;float:left;">
              <el-button type="primary" @click=addresearch(); style="border-radius: 0px; font-size:18px; box-shadow:0px 3px 10px rgba(0,0,0,0.3)">添加新研究 + </el-button>
            </div>
          </el-col>

        </el-row>
      </div>
      <div style="margin:0 auto; width:80%;">
        <el-tabs v-model="tabName" @tab-click="tabclick">
          <el-tab-pane label="概述" name="1" ></el-tab-pane>
          <el-tab-pane label="研究" name="2" ></el-tab-pane>
          <el-tab-pane label="数据统计" name="3"></el-tab-pane>
          <el-tab-pane label="收藏" name="4"></el-tab-pane>
          <el-tab-pane label="关注" name="5"></el-tab-pane>
        </el-tabs>
      </div>

    </div>
    <div class="main-box">
      <!-- 新增研究的框框-->
      <el-dialog
        title="新增研究"
        :visible.sync="newresearchvisible"
        width="50%"
      >
    <span>
      <el-form  :model="newresearch" label-width="20%" style="text-align:left">
        <el-form-item label="研究名称">
          <el-input v-model="newresearch.title" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="研究领域">
          <el-select v-model="newresearch.field" placeholder="请选择研究领域" style="width:80%;">
            <el-option label="科学" value="science"></el-option>
            <el-option label="人文" value="social"></el-option>
            <el-option label="第三个领域" value="third"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文献类型">
          <el-select v-model="newresearch.type" placeholder="请选择文献类型" style="width:80%;">
            <el-option label="文章" value="article"></el-option>
            <el-option label="期刊" value="periodical"></el-option>
            <el-option label="第三个类型" value="third"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择发表时间">
          <el-date-picker
            v-model="newresearch.time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上传研究文件">
          <el-upload
            class="upload-demo"
            ref="uploadfile"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false">
            <!--action需要改成上传地址-->
            <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传封面图片">
          <el-upload
            class="upload-demo"
            ref="uploadpic"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false">
            <!--action需要改成上传地址-->
            <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
      </el-form>
    </span>
        <span slot="footer" class="dialog-footer">
      <el-button @click="newresearchvisible=false">取 消</el-button>
      <el-button  @click="uploadandadd" >确 定</el-button>
    </span>
      </el-dialog>
      <!--研究页面主要内容-->
      <el-row :gutter="20">
        <!--左侧导航栏-->
        <el-col :span="8" class="zcx_col">
          <el-menu
            :default-active="this.$route.path"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>研究</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(item, i) in navList"
                  :key="i"
                  :index="item.name"
                >{{ item.navItem }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <!--右侧研究列表-->
        <el-col :span="16">
          <div v-for="(r,index) in researchlist" :key="index">
            <el-card class="zcx_card">
              <el-col :span="20">
                <el-row class="info_row">
                  <b @click=info(r)>{{r.title}}</b>
                </el-row>
                <el-row class="info_row0">
                  <el-col>
                    <el-tag type="success" size="medium">{{r.type}}</el-tag>
                    <el-tag size="medium">{{r.source}}</el-tag>
                    <el-tag type="warning" size="medium">{{r.field}}</el-tag>
                  </el-col>
                </el-row>
                <el-row class="info_row0" style="color:#696969">
                  <i class="el-icon-date"></i>
                  {{r.time}}
                </el-row>
                <el-row class="info_row1" style="color:#696969">
                  <i class="el-icon-user-solid"></i>
                  {{r.author}}
                </el-row>
                <el-row class="info_row2">
                  <el-button type="primary" size="mini" plain @click="download(r)">下载文件</el-button>
                </el-row>
              </el-col>
              <el-col :span="4">
                <div style="margin:0 auto 0 auto;width:100px;height:100px" class="zcx_pic"><img :src=r.pic alt="" @click=info(r)></div>
              </el-col>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      uID:"",
      researchlist:[
        {title:"Electroencephalogram-Based Preference Prediction Using Deep Transfer Learning",author:"zcx",source:"知网",time:"2021-10-25",type:"Article",pic: require("../assets/CSS/defaultpage.png"),field:"CS"},
        {title:"Product Recommendation in Case-based Reasoning",author:"ljw",source:"万方",time:"2021-10-24test",type:"Conference Paper",pic: require("../assets/CSS/defaultpage.png"),field:"SE"},
      ],
      newresearchvisible:false,
      tabName:"2",
      newresearch:{
        field:"",
        title:"",
        author:this.uID,
        rSource:"upload",//固定
        rTime:""
      },
      navList: [
        { name: "/fromweb", navItem: "来源于网络的文章" },
        { name: "/myupload", navItem: "我上传的研究" },
      ],
      descriptVisible:false,
      subjectVisible:false,
      skillVisible:false,
      instiVisible:false,
      userInform:{
        uID:"",
        uName:"李静雯",
        uDescription:"",
        uDegree:[
          {uDegreeID:"1",uDegreeName:"bachelor of technology"},
          {uDegreeID:"2",uDegreeName:"bachelor of science"}
        ],
        uInstitution:"",
        uDepartment:"SoftWare College",
        uCharacter:"董事长",
        uSubject:[
          {uSubjectID:"1",uSubjectName:"SoftWare"},
          {uSubjectID:"2",uSubjectName:"Computer Science"}
        ],
        uSkill:[
          {uSkillID:"1",uSkillName:"C language"},
          {uSkillID:"2",uSkillName:"Java"},
          {uSkillID:"3",uSkillName:"Vue"}
        ],
        uRecommand:[
          {
            uID:"1",uName:"AAA",
            uNumFollow:12,
            avatorUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
            ]
          },
          {
            uID:"2",uName:"CHJK",
            uNumFollow:90,
            avatorUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
            ]
          },
          {
            uID:"3",uName:"PLP",
            uNumFollow:1700,
            avatorUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
            ]},
        ],

        avatorUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    };
  },
  methods:{
    addresearch(){
      this.newresearchvisible=true;
    },
    async addnewresearch() {
      await new Promise((resolve) => {
        this.$http
          .post("/", JSON.stringify(this.newresearch))
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              this.$message.error("新增研究失败");
              return console.log(res.data.message);
            }
            this.$message({
              message: "新增研究成功",
              showClose: true,
              type: "success",
            });
          });
        resolve();
      });
    },
    uploadandadd(){
      this.addnewresearch();
      this.$refs.uploadfile.submit();
      this.$refs.uploadpic.submit();
    },
    tabclick(tab,event){
      if(tab.name==="1"){
        this.$router.push({path:"/3"})
      }
    },
    info(r){
      this.$message({
        message:"跳转到"+r.title+"的详情页面",
        type: 'success'
      })
    },
    download(r) {
      this.$http.post("", r.rID, {
        responseType: "blob",
      }).then((res) => {
        if (res.data.success === false) {
          this.$message.error("出现错误");
          return;
        }
        console.log(res, '看一下res是啥');
        const data = res.data;
        const url = window.URL.createObjectURL(
          new Blob([data], {
            type: "application/octet-stream",
          })
        );
        console.log(url, '看一下url是啥')
        console.log("**********");
        console.log(res.headers['content-disposition']);
        let fileName = 'test.pdf'
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        a.href = url;
        let filename = fileName;
        a.download = filename;
        console.log(filename)
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
    },
    created() {
      this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
      fetch(uID);
    },
    async fetch(uID) {
      await new Promise((resolve) => {
        this.$http
          .post("/", JSON.stringify({uID}))
          .then((res) => {
            console.log(res);
            if (res.data.success !== true) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            }
            console.log(res.data);
            this.researchlist = res.data.researchlist;
            console.log(this.researchlist);
            this.$message({
              message: "个人文献列表获取成功",
              showClose: true,
              type: "success",
            });
          });
        resolve();
      });
    },
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
  //background-color: #1E9992;
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
.zcx_col{
  padding-top:20px;
  padding-left:20px;
  width:25%;
}
.zcx_row{
  width:80%;
  gutter:20;
}
.info_row{
  margin-bottom: 10px;
  //display: flex;
  flex-wrap: wrap;
  font-size: 20px;
}
.info_row:hover{
  text-decoration:underline;
  cursor:pointer;
}

.info_row0{
  margin-bottom:10px;
  gutter:0;
}
.info_row1{
  margin-bottom:40px;
  font-size:17px;

}
.info_row2{
  margin-bottom:5px;
  font-size:8px;
}
.zcx_card{
  //width:80%;
  text-align: left;
  margin:10px;
  padding:0px;
}
.zcx_card:hover{
  background-color: rgb(247,247,247);
  border: 1px solid #dadada;
  border-radius: 5px;
}
.zcx_table{
  text-align: center;
}
.time_col{
  margin-bottom: 0;
  font-size: 15px;
  align:middle;
  type:"flex";
}
.zcx_pic:hover{
  cursor:pointer;
}
</style>
