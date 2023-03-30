<template>
  <div>
    <div>
      <!-- <el-dialog title="分享链接" :visible.sync="dialogVisible">
          <h3>http://124.71.149.102/#/{{aID}}</h3>
      </el-dialog> -->

      <div class="head-box">
        <div class="selfInform-box">


          <el-row type="flex" style="width:100%">
            <el-col :span ="13">
              <div style="width:100%">

                <!--  TITLE -->
                <div class="title">{{name}}</div>

                <div class="autherBox">
                  <span v-for="item in author" class="author" @click="jumpUser(item.uID)">{{item.uName}}</span>
                </div>

                <div style="width:100%; ">
                  <el-tag v-for="item in subjects" style="margin-right:10px;font-size:18px;">{{item}}</el-tag>
                </div>
              </div>
            </el-col>
            <el-col :span ="1"  >
              <el-button type="primary" class="join"  @click="join">
                申请加入该项目
              </el-button>
            </el-col>
          </el-row>
        </div>




        <el-tabs v-model="tabName" @tab-click="tabClick" style="font-size:21px;margin:20px auto; width:70%">
          <el-tab-pane label="项目简介" name="1" ></el-tab-pane>
          <el-tab-pane label="项目成员" name="2" ></el-tab-pane>
        </el-tabs>


      </div>


      <div class="main-box">
        <div v-if="tabName==='1'" style="display:flex">
          <el-container>
            <el-aside width = "70%">
              <el-card style="min-height:250px; width:95%; margin-top:0px;" >
                <div slot="header" style="font-size:21px;font-weight:bold;">项目描述：</div>
                <div class="description" style="padding-left:20px; padding-right:0px;font-size:18px;line-height:2;">{{description}}</div>
              </el-card>
              <el-card style="min-height:250px; width:95%; margin-top:10px;">
                <div slot="header" style="font-size:21px;font-weight:bold;">所需条件：</div>
                <div class="description" style="padding-left:20px; padding-right:0px;font-size:18px;line-height:2;">{{requirement}}</div>
              </el-card>
            </el-aside>
            <el-main width = "40%">
              <el-card style="width:95%; margin-top:0px; margin-left:0px;height: 100%;">
                <div slot="header" style="font-size:17px;font-weight:bold;" >
                  <svg class="icon_ali" aria-hidden="true">
                    <use xlink:href="#icon-xiangguanwenzhang"></use>
                  </svg>
                  相关的研究</div>
                <!-- <span style="font-size:17px">相关的研究</span> -->
                <div v-for="(item,index) in researchList" class="relatedResearchs" @click="goToResearch(index)">
                  <p style="font-weight:bold; font-size:14px">{{item.name}}</p>
                  <!-- <p class="message">{{item.public_time}}</p> -->
                  <div style="margin-top:10px; line-height:1.5">
                    <div style="margin-left:15px;font-size:14px;color:grey;font-style:italic"> {{item.description}}</div>
                    <!-- <el-tag type="warning" size="small">{{item.tag}}</el-tag> -->
                    <el-tag  v-for="(item_,index) in item.subjects" v-if="index <= 3" style="margin-right:10px;margin-top:10px;" size="small">{{item.subjects[index]}}</el-tag>
                  </div>
                </div>
                <div v-if="researchList.length === 0"> 您很独特，暂时没有相关项目...</div>
              </el-card>
            </el-main>
          </el-container>
        </div>

        <div v-if="tabName==='2'" style="display:flex">
          <el-container>
            <el-aside width = "70%">
              <el-card style="min-height:550px; width:95%; margin-top:0px;">
                <div slot="header" style="font-size:21px;font-weight:bold;">项目成员：</div>
                <div class="description" style="padding-left:20px; padding-right:30px">

                  <div v-for="(item,index) in author" :key="item.uID">
                    <div class="clearfix" style="margin-bottom:15px;margin-top:15px;">
                      <el-divider v-if="index >0"></el-divider>
                      <div style="float:left;margin-right: 10px;cursor: pointer;">
                        <el-avatar :size="70" :src="item.avatarUrl" @click.native="jumpUser(item.uID)"></el-avatar>
                      </div>
                      <div style="width:70%;float:left;">
                        <div style="margin-bottom: 10px">
                          <div style="font-size: 18px;font-weight: bold;">{{item.uName}}</div>
                          <!-- <div v-if="item.lenDegree!==0" style="margin:0;">
                              <span style="font-size: 14px;color:darkgray;" v-for="item_ in item.uDegree" :key="item_.uDegreeID">
                                  {{item_.uDegreeName}}
                              </span>
                          </div> -->
                          <!-- uInstitution & uDepartment -->
                          <div v-if="item.uInstitution!==''" style="margin-bottom: 10px;font-size: 14px;color:grey">
                            <!-- <div style="font-weight: bold;color:black">机构和部门</div> -->
                            <div>{{item.uInstitution}}-{{item.uDepartment}}</div>
                          </div>
                          <div style="margin-bottom: 10px;font-size: 14px;color:grey;">
                            <div style="font-weight: bold;color:grey;">{{item.uEmail}}</div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </el-card>

            </el-aside>
            <el-main width = "40%">
              <el-card style="width:95%; margin-top:0px; margin-left:0px;height: 100%;">
                <div slot="header" style="font-size:17px;font-weight:bold;" >
                  <svg class="icon_ali" aria-hidden="true">
                    <use xlink:href="#icon-xiangguanwenzhang"></use>
                  </svg>
                  相关的项目</div>
                <!-- <span style="font-size:17px">相关的研究</span> -->
                <div v-for="(item,index) in researchList" class="relatedResearchs" @click="goToResearch(index)">
                  <p style="font-weight:bold; font-size:14px">{{item.name}}</p>
                  <!-- <p class="message">{{item.public_time}}</p> -->
                  <div style="margin-top:10px; line-height:1.5">
                    <div style="margin-left:15px;font-size:14px;color:grey;font-style:italic"> {{item.description}}</div>
                    <!-- <el-tag type="warning" size="small">{{item.tag}}</el-tag> -->
                    <el-tag  v-for="(item_,index) in item.subjects" v-if="index <= 3" style="margin-right:10px;margin-top:10px;" size="small">{{item.subjects[index]}}</el-tag>
                  </div>
                </div>
                <div v-if="researchList.length === 0"> 您很独特，暂时没有相关项目...</div>
              </el-card>
            </el-main>
          </el-container>
        </div>
      </div>




    </div>
  </div>


</template>


<script>
export default {
  name: 'ProjectDetail',
  data(){
    return{
      pID:'107',
      name:"测试项目名1：这是一个用于测试的项目",
      subjects:["软件工程","智能开发系统"],
      author:[
        {
          uName:"张老师",uID:"2",uEmail:"18222333734@163.com",
          uInstitution:"BUAA", uDepartment:"SoftWare College",
          avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        },
        {
          uName:"李同志",uID:"3",uEmail:"Lyeeeeee@buaa.edu.cn",
          uInstitution:"", uDepartment:"SoftWare College",
          avatarUrl:"https://himg.bdimg.com/sys/portrait/item/public.1.dc6ae00d.ubgN4svQhGe9gL3Ltweyeg.jpg"
        }],
      requirement:"这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求这是一些需求",
      description:"这是一个项目",

      uID:"1",
      ifLogin:"",

      dialogVisible:false,
      tabName:"1",
      researchList:[{
        pID:"1",name:"这是一个示例研究推荐的name",subjects:["软件工程","软件工程","软件工程","软件工程","软件工程","软件工程","智能开发系统"],
        requirement:"Lorem ipsum从西元15世纪开始就被广泛地使用在西方的印刷、设计领域中，在电脑排版盛行之后，这段被传统印刷产业使用几百年的无意义文字又再度流行。由于这段文字以“Lorem ipsum”起头，并且常被用于标题的测试中，所以一般称为Lorem ipsum，简称为Lipsum。",
        description:"这是一个项目Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
        {
          pID:"2",name:"这是一个示例研究推荐的name2",subjects:["软件工程2","智能开发系统2"],
          requirement:"这是一些需求Lorem ipsum从西元15世纪开始就被广泛地使用在西方的印刷、设计领域中，在电脑排版盛行之后，这段被传统印刷产业使用几百年的无意义文字又再度流行。由于这段文字以“Lorem ipsum”起头，并且常被用于标题的测试中，所以一般称为Lorem ipsum，简称为Lipsum。",
          description:"这是一个项目Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ]

    }
  },
  mounted(){
    //顶子刷新依然金色
    if(this.$route.path==="/projectDetail/:pID")
    {
      const tmpA=document.getElementById('Passage');
      const tmpB=document.getElementById('Welcome');
      const tmpC=document.getElementById('User');
      const tmpD=document.getElementById('Super');
      tmpA.style.color="gold"
      tmpB.style.color="white"
      tmpC.style.color="white"
      tmpD.style.color="white"
    }
    this.pID = this.$route.params.pID;
    this.uID = window.sessionStorage.getItem("uID");
    this.realuID = window.sessionStorage.getItem("realuID");
    this.ifLogin = window.sessionStorage.getItem("ifLogin");
    this.initData();
  },
  methods:{
    async initData(){
      let minfo = {};
      minfo.pID = this.pID;
      await this.$http.post("/project/detail", minfo).then(res => {
        if (res.data.success !== true) {
          this.$message.error(res.data.message);
          return console.log(res.data.message);
        }
        console.log(res.data.projectInfo);
        // console.log(res.data.data);
        let data = res.data.projectInfo;

        this.name = data.name;
        this.subjects = data.subjects;
        this.author = data.author;
        this.requirement = data.requirement
        this.description = data.description
      })
      let searchInfo = {};
      searchInfo.pID = this.pID;
      await this.$http.post("/getRelatedProject", searchInfo).then(res => {
        if(res.data.success != true){
          this.$message.error(res.data.message);
          return console.log(res.data.message);
        }
        console.log("------------")
        console.log(res.data)
        console.log("返回相关项目：");
        console.log(res.data.researchList)
        console.log("------------")
        this.researchList = res.data.researchList;  // 直接返回相关文献信息列表
      })
    },
    async join(){ //发送申请
      if (this.ifLogin !== "1") { // 未登录不执行后面的函数
        this.$message.error("该功能需要登录后方可执行");
        // setTimeout(() => this.$router.push({path:"/Login"}), 500)
      }
      let joininfo = {
        "pID":this.pID,
        "uID":this.uID,
      };
      // joininfo.pID = this.pID;
      // joininfo.uID = this.realuID;

      await this.$http.post("/project/join", JSON.stringify(joininfo)).then(res => {
        if(res.data.success != true){
          this.$message.error(res.data.message);
          return console.log(res.data.message);
        }
        else {
          this.$message.success("发送参加消息成功");
        }
        console.log("发送参加消息成功！");
      })

      // for(var index = 0 ; index <this.author.length; index ++){
      //     let Message = {};
      //     Message.sendUID = this.realuID;
      //     Message.receiveUID = this.author[index].uID
      //     Message.mTitle = this.author[index].uName + "用户，有人申请加入您的项目."
      //     Message.mText = this.author[index].uName + "用户，有人申请加入您的"+ this.name + "项目，您可以去自己的项目页面手动添加这位用户哦。"
      //     Message.mType = 1
      //     await this.sendMessage(Message)
      // }
    },
    // async sendMessage (Message) {
    //     await this.$http.post("/message/send", JSON.stringify({Message})).then(res => {
    //         if(res.data.success != true){
    //             this.$message.error(res.data.message);
    //             return console.log(res.data.message);
    //         }
    //         console.log("发送消息成功" + this.Message);
    //     })
    // },
    tabClick(tab){
      this.tabName = tab.name;
    },
    jumpUser(uID){
      window.sessionStorage.setItem("uID",uID);
      this.$router.push({path:"/Introduce"})
    },
    goToResearch(index){
      var pID = this.researchList[index].pID;
      this.info(pID);
    },
    info(pID){  // 跳转至其他文献页面
      var CodedsID = pID;
      this.codeUrl = '/pDetail/' + CodedsID;
      console.log(pID);
      this.$router.push({
        path:this.codeUrl
      })
    },

  },
  filters:{
    ellipsis(value){
      if(!value){
        return "";
      }
      if(value.length > 100){
        return value.slice(0, 300) + "...";
      }
      return value;
    }
  },
  watch:{
    $route(){
      this.$router.go(0)
    }
  }
}

</script>


<style scoped>
/* .row-con {
  display: flex;
  flex-flow: row wrap;
  min-width: 1000px;
}
.row-con .myCard {
  height: 100%;
  width: 90%;
}  */
/* .mctn{
  display: flex;
  flex-flow: row wrap;
}
.mctn .myCard {
  height: 100%;
  width: 90%;
}  */
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-main::-webkit-scrollbar {
  display: none;
}
.head-box{
  width:100%;
  padding:15px 15px 0px 15px;
  background-color: white;
}
.selfInform-box{
  margin:0 auto;
  width:68%;
  text-align:left;
  padding:15px 15px 0px 15px;
  display:flex;
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
  width:70%;
  margin:auto;
  text-align:left;
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
.el-card{
  margin: 0px 0px 0px 0px;
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
.title{
  font-size:32px;
  font-weight:bold;
}
.message{
  margin-top:10px;
  font-size:14px;
  color:gray;
}
.autherBox{
  margin-top:15px;
  margin-bottom:15px;
  font-size:18px;
  line-height:2;
}
.link{
  font-size:17px;
  margin-bottom:10px;
  font-family:'Times New Roman';
  word-break:break-all
}
.collect:hover{
  color:white;
  background-color: #E6A23C;
}
.join:hover{
  color:white;
  /* background-color: #67C23A; */
}
.join {
  bottom: 0px;
  padding-right:16px;
  padding-left:16px;
  font-size:21px;
  font-weight:bold;
  width: 200px;
  height: 60px;
  margin-top:80px;
}

.el-dropdown-link {
  cursor:pointer;
}
.el-dropdown-link:hover{
  color:lightseagreen;
}
.related_research {
  margin:0 auto;
  width:80%;
  cursor:pointer;
}
.related_research:hover {
  color:rgb(0, 131, 143);
}
.description {
  text-align:justify;
  font-family:'Times New Roman';
  line-height:1.5;
  text-indent:2em;
}
.relatedResearchs {
  margin-bottom:20px;
  cursor:pointer;
}
.relatedResearchs:hover {
  color:rgb(0, 131, 143);
}
.author{
  margin-right:10px;
  cursor:pointer;
}
.author:hover{
  color:lightseagreen;
  text-decoration: underline;
}
</style>
