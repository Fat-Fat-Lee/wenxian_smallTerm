<template>
  <div>
    <div v-if="showPage">
      <div class="head-box">
        <div class="selfInform-box">
          <div style="width:70%">
            <div style="width:100%; height:40px">
              <el-tag type="success" style="margin-right: 20px">{{type}}</el-tag>
              <el-tag type="warning" v-for="item in tag" style="margin-right: 10px">
                {{item}}
              </el-tag>
              <el-tag v-for="item in subjects" style="margin-left:10px">
                {{item}}
              </el-tag>
            </div>
            <div class="title">{{title}}</div>
            <div class="message"><span v-for="item in tag">{{item}}&nbsp;&nbsp;</span>&nbsp;&nbsp;{{public_time}}</div>
            <div class="message1">
              <span v-for="(item, i) in authors" class="author" @click="goToAuthor(i)">{{item.name}}</span>
            </div>
          </div>
          <div style="width:30%; text-align:right; padding-right:5%">
            <p class="message">
              <svg class="icon_ali" aria-hidden="true">
                <use xlink:href="#icon-yulan"></use>
              </svg>
              浏览量：{{browses}}
            </p>
            <p class="message">
              <svg class="icon_ali" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
              </svg>
              下载量：{{downloads}}
            </p>

            <p class="message">
              <svg t="1662359918243" class="icon_ali" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2687" width="200" height="200"><path d="M102.4 880.64c-57.344 0-102.4-45.056-102.4-102.4V409.6c0-57.344 45.056-102.4 102.4-102.4s102.4 45.056 102.4 102.4v368.64c0 57.344-45.056 102.4-102.4 102.4z m0-491.52c-10.24 0-20.48 10.24-20.48 20.48v368.64c0 10.24 10.24 20.48 20.48 20.48s20.48-10.24 20.48-20.48V409.6c0-10.24-10.24-20.48-20.48-20.48z" fill="#E5BD41" p-id="2688"></path><path d="M829.44 921.6H450.56c-90.112 0-163.84-73.728-163.84-163.84V512c0-90.112 73.728-163.84 163.84-163.84h30.72c22.528 0 40.96 18.432 40.96 40.96s-18.432 40.96-40.96 40.96H450.56c-45.056 0-81.92 36.864-81.92 81.92v245.76c0 45.056 36.864 81.92 81.92 81.92h378.88c45.056 0 81.92-36.864 81.92-81.92v-4.096L942.08 468.992c0-18.432-4.096-38.912-81.92-38.912h-153.6c-22.528 0-40.96-18.432-40.96-40.96s18.432-40.96 40.96-40.96H860.16c108.544 0 163.84 40.96 163.84 122.88v4.096l-30.72 284.672c-2.048 90.112-73.728 161.792-163.84 161.792z" fill="#333333" p-id="2689"></path><path d="M696.32 430.08c-18.432 0-34.816-12.288-38.912-30.72l-34.816-143.36v-2.048c-8.192-40.96-40.96-69.632-81.92-69.632-6.144 0-10.24 2.048-12.288 6.144-2.048 2.048-4.096 6.144-6.144 8.192l10.24 188.416c2.048 22.528-16.384 40.96-38.912 43.008-22.528 2.048-40.96-16.384-43.008-38.912l-12.288-202.752c0-10.24 2.048-20.48 10.24-28.672 4.096-6.144 10.24-18.432 20.48-28.672 20.48-18.432 45.056-28.672 71.68-28.672 79.872 0 147.456 57.344 161.792 135.168l34.816 141.312c6.144 22.528-8.192 45.056-30.72 49.152-4.096 2.048-6.144 2.048-10.24 2.048zM479.232 145.408h8.192-10.24 2.048z" fill="#333333" p-id="2690"></path></svg>
              点赞量：{{thumbs}}
            </p>
            <p class="message">
              <svg class="icon_ali" aria-hidden="true">
                <use xlink:href="#icon-shoucang"></use>
              </svg>
              推荐量：{{recommends}}
            </p>
          </div>
        </div>
        <el-row style="margin:20px auto; width:70%" :gutter="20">
          <el-col :span="12">
            <el-tabs v-model="tabName" @tab-click="tabClick">
              <el-tab-pane label="概述" name="1" ></el-tab-pane>
<!--              <el-tab-pane label="参考文献" name="2" ></el-tab-pane>-->
            </el-tabs>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" plain class="download" size="mini" @click="requestForMessage" style="padding-right:16px; padding-left:16px">
              认领成果
            </el-button>
            <el-button type="primary" plain class="download" size="mini" @click="requestForAll" style="padding-right:16px; padding-left:16px">
              请求全文
            </el-button>
            <el-button icon="el-icon-download" circle type="success" plain class="share" size="mini" @click="download" >

            </el-button>
            <el-button icon="el-icon-thumb" circle type="warning" plain class="collect" size="mini" @click="collectLiterature" >
            </el-button>
            <el-button icon="el-icon-star-off" circle type="warning" plain class="collect" size="mini" @click="recommendLiterature" >
          </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main-box">
        <div v-if="tabName==='1'" >
          <div style="display:flex">
            <el-card style="min-height:350px; width:65%; margin-top:0px;">
              <div slot="header" style="font-size:18px">摘要和数字</div>
              <div class="abstract" style="padding-left:20px; padding-right:20px">{{abstract}}</div>
            </el-card>
            <el-card style="width:35%; margin-top:0px">
              <svg class="icon_ali" aria-hidden="true">
                <use xlink:href="#icon-xiangguanwenzhang"></use>
              </svg>
              <span style="font-size:17px">相关的研究</span>
              <div v-for="(item,index) in researchList" class="relatedResearchs" @click="goToResearch(index)">
                <div>
                  <p style="font-weight:bold; font-size:14px">{{item.title}}</p>
                </div>
              </div>
            </el-card>
          </div>
          <div style="display:flex">
          <el-card style="min-height:350px; width:100%; margin-top:0px; line-height:1.5;">
            <el-row style="text-align: left; font-size: xx-large;">
            评论
          </el-row>
            <el-input
              style="margin-bottom: 10px;margin-top: 20px"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10}"
              placeholder="请输入评论"
              v-model="comment">
            </el-input>
            <div style="height: 40px" >
              <el-button  type="primary" style="float: right" @click="submitComment">评论</el-button>
            </div>
            <el-row type="flex" justify="center">
              <el-col :span=24>


                <el-row v-for="(answer, index) in commentList">
                  <el-divider />
                  <el-row style="text-align: left;">

                    <el-row  type="flex" align="middle" style="margin-bottom: 20px">
                      <el-col :span="1.5">
                        <el-avatar shape="circle" :size="30" fit="fill" :src="answer.avatar"/>
                      </el-col>
                      <el-col style="font-weight: bold;margin-left: 9px;">
                        {{ answer.name + "  " }}
                        <span
                          style="font-weight: lighter;font-size: 90%;color: #8c939d;margin-left: 9px;">{{
                            answer.time
                          }}</span>
                      </el-col>
                    </el-row>
                    <el-row>{{ answer.comment }}</el-row>
                  </el-row>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </div>
          </div>
        <div v-else-if="tabName==='2'" style="display:flex">
          <el-card style="min-height:350px; width:65%; margin-top:0px; line-height:1.5">
            <div slot="header" style="font-size:18px">文献来源</div>
            <p v-for="item in references">
              <el-link class="link" :underline="false" style="margin-bottom:20px" >• {{item}}</el-link>
            </p>
          </el-card>
          <el-card style="width:35%; margin-top:0px">
            <svg class="icon_ali" aria-hidden="true">
              <use xlink:href="#icon-xiangguanwenzhang"></use>
            </svg>
            <span style="font-size:17px">相关的研究</span>
            <div v-for="(item,index) in researchList" class="relatedResearchs" @click="goToResearch(index)">
              <div>
                <p style="font-weight:bold; font-size:14px">{{item.title}}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default{
  name:"literature",
  data(){
  	return{
      commentList:[
        // {
        //   avatar: "https://fakeimg.pl/300/",
        //   name: "回答人用户名",
        //   uID: '111', //评论者用户ID
        //   time: "2022-2-10", // 评论时间
        //   comment: "回答具体内容1"
        // },
        // {
        //
        //   avatar: "https://fakeimg.pl/300/",
        //   name: "回答人用户名",
        //   uID: '111', //评论者用户ID
        //   time: "2022-2-10", // 评论时间
        //   comment: "回答具体内容1"
        // },
        ],
      comment:'',
      recommend:'推荐',
      recommends:0,//推荐数
      showPage:true,
      dialogVisible:false,
      aID:"", // 60697
      ifLogin:"1",
      uID:"1",
      is_thumb:0,
      is_recommend:0,
      thumb:"点赞",
      tag:[],
      type:"",
      subjects:[],
      title:"",
      authors:[],
      authorsUID:[],
      public_time:"",
      abstract:" ",
      references:[
      ],
      research:"相关研究",
      browses:0,
      downloads:0,
      thumbs:0,
      tabName:"1",
      researchList:[{rId:0,title:"111111111111"},
        {rId:1,title:"22222222222222"},
      ],
      upID:0,
      mTitle:'请求全文通知',
      mText:'',
		}
  },
  mounted(){
    //顶子刷新依然金色
    if(this.$route.path==="/:aID")
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
    this.aID = this.$route.params.aID;
    this.uID = window.sessionStorage.getItem("uID");
    this.ifLogin=window.sessionStorage.getItem("ifLogin");
    this.initData();
    this.getComment()

  },
  methods: {
    requestForMessage(){
      return new Promise(res => {
        this.$http.post("/getArticleInfo/ask", JSON.stringify({aName:this.title,uID: this.uID,aID:this.aID,upID:this.upID})).then(res => {
          console.log(res.data);
          if(res.data.success==true){
            this.$message({
              message: '申请认领消息已发送',
              type: 'success'
            });
          }
        })
      })
    },
    requestForAll(){
      return new Promise(res => {
        this.$http.post("/getArticleInfo/askAll", JSON.stringify({aName:this.title,uID: this.uID,aID:this.aID,upID:this.upID})).then(res => {
          console.log(res.data);
          if(res.data.success==true){
            this.$message({
              message: '请求全文消息已发送',
              type: 'success'
            });
          }
        })
      })
    },
    getComment(){
      return new Promise(res => {
        this.$http.post("/get/comment/", JSON.stringify({aId: this.aID})).then(res => {
          console.log(res.data);
          this.commentList = res.data.commentList
        })
      })
    },
    submitComment(){
      return new Promise(res => {
          this.$http.post("/upload/comment/", JSON.stringify({aID: this.aID,uID:this.uID,comment:this.comment})).then(res => {
            console.log(res.data);
            if(res.data.success==true){
              this.$message({
                message: '评论成功',
                type: 'success'
              });
              this.getComment()
            }
          })
      })
    },
    async initData(){
      await this.$http.post("/getArticleInfo/", JSON.stringify({aid:this.aID,uid:this.uID})).then(res => {
        let data = res.data.articleInfo;
        this.title = data.title;
        this.public_time = data.public_time;
        this.upID = res.data.upID
        if(data.type==='1'){
          this.type='会议'
        }
        else if(data.type==='2'){
          this.type='期刊'
        }
        else if(data.type==='3'){
          this.type='技术报告'
        }
        else if(data.type==='4'){
          this.type='书'
        }
        else if(data.type==='5'){
          this.type='专利'
        }
        this.tag = data.tag;
        this.subjects = data.subjects;
        this.authors = data.authors;
        this.browses = data.browses;
        this.downloads = data.downloads;
        this.thumbs = data.thumbs;
        this.recommends = data.recommends;
        this.is_thumb = data.is_thumb;
        this.is_recommend = data.is_recommend;
        if(this.is_thumb===0){
          this.thumb = '点赞'
        }
        else {
          this.thumb = '取消点赞'
        }
        if(this.is_recommend===0){
          this.recommend = '推荐'
        }
        else {
          this.recommend = '取消推荐'
        }
        if(data.references[0] !== "chengguo"){
          this.references = data.references;
        }
        else this.references = []
        if(data.abstract != null){
          this.abstract = data.abstract;
        }
        this.researchList = data.researchList

        this.addNumberBrowse();//by ljw 20220908
      })


      if (this.ifLogin !== "1") { // 未登录不执行后面的函数
        this.showPage = true;
        return;
      }
      this.showPage = true;



    },
    //by ljw 20220908
    async addNumberBrowse()
    {
      let info = {}
      info.aID = parseInt(this.aID)
      info.action = 3
      console.log(info)
      await this.$http.post("/add/statistic/number",JSON.stringify(info)).then(async res => {
        if (res.data.success === false) {
          this.$message.error("添加浏览次数失败");
          return;
        }
        //alert("!!!")

      })
    },

    //by ljw 20220908
    async addNumberCollect()
    {
      let info = {}
      info.aID = parseInt(this.aID)
      info.action = 2
      console.log(info)
      await this.$http.post("/add/statistic/number",JSON.stringify(info)).then(async res => {
        if (res.data.success === false) {
          this.$message.error("添加推荐次数失败");
          return;
        }
      })

    },

    //by ljw 20220908
     async addNumberDownload()
    {
      let info = {}
      info.aID = parseInt(this.aID)
      info.action = 1
      console.log(info)
      await this.$http.post("/add/statistic/number",JSON.stringify(info)).then(async res => {
        if (res.data.success === false) {
          this.$message.error("添加下载次数失败");
          return;
        }

      })
    },

    tabClick(tab){
      this.tabName = tab.name;
    },
    async recommendLiterature(){
      let info = {}
      info.aID = parseInt(this.aID)
      info.uID　= this.uID
      console.log(info)
      await this.$http.post("/recommend/article/", JSON.stringify(info)).then(async res => {
        if (res.data.success === false) {
          this.$message.error(res.data.message);
          return;
        }
        this.is_recommend = res.data.is_recommend;
        if (this.is_recommend == 0) {
          this.recommend = "推荐";
          if(this.recommends>0){
            this.recommends--;
          }
        } else {
          this.recommend = "取消推荐";
          this.recommends++;
        }
        this.addNumberBrowse();//by ljw 20220908
      })

    },
    async collectLiterature(){
      await this.$http.post("/thumb/article/", JSON.stringify({aID:this.aID,uID:this.uID})).then(async res => {
        if (res.data.success === false) {
          this.$message.error(res.data.message);
          return;
        }
        this.is_thumb = res.data.is_thumb;
        if (this.is_thumb == 0) {
          this.thumb = "点赞";
          if(this.thumbs>0){
            this.thumbs--;
          }
        } else {
          this.thumb = "取消点赞";
          this.thumbs++;
        }
        this.addNumberCollect();
      })

    },
    async download(){
      let searchInfo = {};
      searchInfo.aID = this.aID;
      await this.$http.post("/articleDownload/",JSON.stringify({aid:this.aID,uid:this.uID})).then(async res => {

        if (res.data.success === false) {
          this.$message.error("该作者未上传成果全文，请向作者发送请求全文信息。");
          return;
        }
        let i;
        let url='';

        for(i=res.data.data.length-1;i>=0;i--){
          if(res.data.data[i]==='.'){
            url = url+res.data.data[i]
            break;
          }
            url = url+res.data.data[i]
        }
        let u = '';
        for(i=url.length-1;i>=0;i--){
          u = u+url[i]
        }
        console.log(u)
        let response = await fetch(res.data.data);
        let blob = await response.blob();
        let objectUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = objectUrl;
        a.download = this.title + u;
        a.click()
        this.addNumberDownload();
      })



    },
    goToResearch(index){
      var aID = this.researchList[index].rID;
      this.info(aID);
    },
    info(aID){  // 跳转至其他文献页面
      var CodedsID = aID;
      this.codeUrl = '/' + CodedsID;
      console.log(aID);
      this.$router.push({
        path:this.codeUrl
      })
    },
    goToAuthor(index){
      console.log(this.authorsUID);
      if(this.authorsUID[index] != -1){
        window.sessionStorage.setItem("uID", this.authorsUID[index]);
        this.$router.push({path:"/Introduce"})
      } else {
        this.$message.error("该作者还没认领该文章");
      }
    }
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
	font-size:23px;
	font-weight:bold;
}
.message{
	margin-top:10px;
	font-size:14px;
	color:gray;
}
.message1{
  margin-top:10px;
	font-size:14px;
}
.link{
  font-size:17px;
  margin-bottom:10px;
  font-family:'Times New Roman';
  word-break:break-all
}
.download{

}
.collect:hover{
  color:white;
  background-color: #E6A23C;
}
.share:hover{
  color:white;
  background-color: #67C23A;
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
.abstract {
  text-align:justify;
  font-family:'Times New Roman';
  line-height:1.5;
  text-indent:2em;
}
.relatedResearchs {
  margin-top:20px;
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
