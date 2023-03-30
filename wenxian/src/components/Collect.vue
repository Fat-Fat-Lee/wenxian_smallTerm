<template>
  <div>
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
          <el-input v-model="newresearch.name" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="研究领域">
          <el-select v-model="newresearch.tag" placeholder="请选择研究标签" style="width:80%;">
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
            v-model="newresearch.public_time"
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
                <span>收藏</span>
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
<!--          <div style="margin:10px">-->
<!--            <el-input  placeholder="请按照文献名检索" v-model="queryInfo.query" clearable style="width:90%" @click="freshList"></el-input>-->
<!--            <el-button slot="append" icon="el-icon-search" @click="freshList"></el-button>-->
<!--            <el-radio-group style="margin:8px;padding:5px" v-model="queryInfo.qsort" @change="freshList">-->
<!--              <el-radio :label="10">文献发表时间降序</el-radio>-->
<!--              <el-radio :label="11">文献发表时间升序</el-radio>-->
<!--            </el-radio-group>-->
<!--          </div>-->
          <div v-for="(r,index) in researchlist" :key="index">
            <el-card class="zcx_card">
              <el-col :span="20">
                <el-row class="info_row">
                  <b @click=info(r)>{{r.name}}</b>
                </el-row>
                <el-row class="info_row0" type="flex" >
                  <!--                    <el-tag type="success" size="medium" style="margin: 0 3px">{{r.type}}</el-tag>-->
<!--                  <el-tag type="success" size="medium" style="margin: 0 3px">{{r.tag}}</el-tag>-->
                  <div v-for="(s,index2) in r.subjects" :key="index2">
                    <el-tag  size="medium" type="warning" style="margin: 0 3px">{{s}}</el-tag>
                  </div>
                </el-row>
                <el-row class="info_row0" style="color:#696969">
                  <i class="el-icon-date"></i>
                  {{r.public_time}}
                </el-row>
                <el-row class="info_row1" style="color:#696969" type="flex">
                  <i class="el-icon-user-solid"></i>
                  <div v-for="(a,index3) in r.author_name" :key="index3" style="margin: 0 3px">
                    {{a}}
                  </div>
                </el-row>
                <el-row class="info_row2">
<!--                  <el-button type="primary" size="mini" plain @click="download_(r)">下载文件</el-button>-->
                  <el-button type="danger" size="mini" plain @click="dele(r)">取消收藏</el-button>
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
  data(){
    return{
      uID:"",
      codeUrl:"",
      queryInfo: {
        query: "", //搜索关键字
        qsort: 10, //记录排序参数，默认按上传时间降序,11是上传时间升序
      },
      searchInfo:{
        aID:"",
        uID:"",
      },
      researchlist:[
        // {aID:"1",name:"Electroencephalogram-Based Preference Prediction Using Deep Transfer Learning",author:["zcx","ljw"],public_time:"2021-10-25",pic: require("../assets/CSS/defaultpage.png"),tag:"CS",subjects:["s1","s2"]},
        // {aID:"2",name:"Product Recommendation in Case-based Reasoning",author:["ljw","zcx"],public_time:"2021-10-24test",pic: require("../assets/CSS/defaultpage.png"),tag:"SE",subjects:["s3","s4"]},
      ],
      newresearchvisible:false,
      tabName:"4",
      newresearch:{
        tag:"",
        name:"",
        type:"",
        author:this.uID,
        public_time:""
      },
      navList: [
        { name: "/Collect", navItem: "我的收藏" },
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
  mounted() {
    //顶子刷新依然金色
    if(this.$route.path==="/Collect")
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
    if(this.$route.path==="/Collect")
    {
      const tmp0=document.getElementById('Introduce');
      const tmp1=document.getElementById('Myupload');
      const tmp2=document.getElementById('Statistics');
      const tmp3=document.getElementById('Collect');
      const tmp4=document.getElementById('Follow');
      tmp0.style.color="grey"
      tmp1.style.color="grey"
      tmp2.style.color="grey"
      tmp3.style.color="#1E9992"
      tmp4.style.color="grey"
    }
  },
  methods:{
    async dele(r) {
      this.searchInfo.aID=r.aID;
      this.searchInfo.uID=this.uID;
      let s=this.searchInfo;
      console.log("************************")
      console.log(this.searchInfo);
      await new Promise((resolve) => {
        this.$http
          .post("/recommend/article/", JSON.stringify( s))
          .then((res) => {
            console.log(res);
            if (res.data.success !== true) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            }
            console.log(res.data);
            this.fetch(this.uID);
            console.log(this.researchlist);
            this.$message({
              message: "已取消收藏",
              showClose: true,
              type: "success",
            });
            window.location.reload();
          });
        resolve();
      });
    },
    addresearch(){
      this.newresearchvisible=true;
    },
    uploadandadd(){
      this.addnewresearch();
      this.$refs.uploadfile.submit();
      this.$refs.uploadpic.submit();
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
    tabclick(tab,event){
      if(tab.name==="1"){
        this.$router.push({path:"/3"})
      }
      if(tab.name==="2"){
        this.$router.push({path:"/Myupload"})
      }
    },
    info(r){
      this.jumpPassage(r.aID);
    },
    jumpPassage(rID){
      //this.codeUrl='/Passage'+'?rID='+rID
      this.codeUrl='/'+rID;
      this.$router.push({path:this.codeUrl})
    },
    dataURLtoBlob(dataurl) {
      var bstr = atob(dataurl)
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: "application/octet-stream" });
    },
    download_(r){
      this.download(r);
      this.add(r);
    },
    download(r){
      let searchInfo = {};
      searchInfo.aID = r.aID;
      searchInfo.download_url = r.download_url;
      this.$http.post("/articleDownload/", JSON.stringify({searchInfo})).then(res => {
        if(res.data.success === false){
          this.$message.error("下载失败");
          return;
        }
        const data = res.data.data;

        const fileName = r.name + ".pdf";
        const url = window.URL.createObjectURL(
          this.dataURLtoBlob(data)
        );

        console.log(url)
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = url;
        document.body.appendChild(elink);
        elink.click();
        window.URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
        this.$message({
          message: "导出成功！",
          type: "success"
        })
        // this.downloads++; 当前页面下载量的更新
      })
    },
    add(r){
      new Promise((resolve) => {
        this.$http
          .post("/add/statistic/number", JSON.stringify({aID:r.aID,action:1}))
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              return console.log(res.data.message);
            }
            this.$message({
              message: "下载次数增加！",
              type: "success"
            })
          });
        resolve();
      });
    },
    avatarclick(){
      //修改用户头像
      this.$message({
        message: '可以开始修改头像',
        type: 'success'
      });
    },
    async freshList() {
      let uID;
      uID=this.uID;
      let value;
      value=3;
      let queryInfo;
      queryInfo=this.queryInfo;
      await new Promise((resolve) => {
        this.$http
          .post("/queryMyLiterature/", JSON.stringify({ queryInfo,uID,value}))
          .then((res) => {
            console.log(res);
            if (res.data.success !== true) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            }
            console.log(res.data);
            this.researchlist = res.data.data.myLiterature;
            console.log(this.researchlist);
            this.$message({
              message: "查询成功~",
              showClose: true,
              type: "success",
            });

          });
        resolve();
      });
    },
    async fetch(uID) {
      await new Promise((resolve) => {
        this.$http
          .post("/getCollectList/", JSON.stringify({uID}))
          .then((res) => {
            console.log(res);
            if (res.data.success !== true) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            }
            console.log("_______________________________")
            console.log(res.data);
            this.researchlist = res.data.researchlist;
            console.log(this.researchlist);
            this.$message({
              message: "个人收藏列表获取成功",
              showClose: true,
              type: "success",
            });
          });
        resolve();
      });
    },
  },
  created(){
    console.log("我的收藏")
    this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
    this.realuID = JSON.parse(window.sessionStorage.getItem("realuID"));
    this.freshList();
  },
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
  margin-bottom:5px;
  gutter:10;
  padding: 3px 0;
}
.info_row1{
  margin-bottom:35px;
  font-size:17px;

}
.info_row2{
  margin-bottom:13px;
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
.zcx_avatar:hover{
  cursor:pointer;
}
</style>


