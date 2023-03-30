<template>
  <div>

    <div class="main-box">

      <div style="margin-top: 20px ;height:20%">
        <div style="display:inline-block;width: 12%">
          <el-select v-model="value_" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="display:inline-block;width: 55%;">
          <el-input
            prefix-icon="iconfont el-icon-search"
            placeholder="在此处搜索你要查找的科研人员"
            v-model="queryInfo.query"
            clearable>
          </el-input>
        </div>
        <div style="display:inline-block">
          <el-button size="medium" type="primary" @click="search()">搜索</el-button>
        </div>
      </div>
      <!--  个人概述-->
      <div>
        <el-row :gutter="20">
          <el-col :span="16">
            <!--          名片卡-->
            <el-card class="self-card">
              <!--        个人名片介绍框-->
              <h2 style="font-weight: normal;">{{this.userInform.uName}},you are hiring scientists and researches?</h2>
              <h4 style="font-weight: normal;margin-top: 13px">ResearchGate can help you hire you next team member</h4>
              <el-button style="margin-top: 20px" type="primary" @click="JumpUser">Find out more</el-button>
            </el-card>

            <!--            推荐科研人员-->
            <el-card class="self-card2" v-for="(k,i) in this.userList">
              <!--        个人名片功能介绍框-->

              <!--        名片预览框-->
              <div class="clearfix" style="padding:20px; border: 1px solid lightgray;text-align: left;border-radius: 5px;">
                <div style="width:70%;float:left;">
                  <!--          用户名+学位-->
                  <div style="margin-bottom: 10px">
                    <div style="font-size: 18px;font-weight: bold;" @click="jumpUser(k.uID)">{{k.uName}}</div>
                    <div v-if="k.lenDegree>=1" style="margin:5px;">
                    <span style="font-size: 14px;color:darkgray;" v-for="(item,index) in k.uDegree" v-if="index<3" >
                      {{item.uDegreeName}}.&nbsp&nbsp
                    </span>
                      <span style="font-size: 14px;color:darkgray;">等共{{k.lenDegree}}项学位</span>
                    </div>
                  </div>
                  <!--                  邮箱-->
                  <div  style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">邮箱</div>
                    <div>
                      {{k.uEmail}}
                    </div>

                  </div>
                  <!--                个人介绍-->
                  <div v-if="k.uDescription!==''" style="margin-bottom: 10px">
                    <div style="font-size: 16px;color:grey;font-style: italic;">{{k.uDescription}}</div>
                  </div>
                  <!--          机构和部门-->
                  <div v-if="k.uInstitution!==''" style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">机构和部门</div>
                    <div>
                      {{k.uInstitution}}-
                      {{k.uDepartment}}
                    </div>

                  </div>
                  <!--          技能-->
                  <div v-if="k.lenSkill>=1" style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">技能</div>
                    <div>
                      <span v-for="(item,index) in k.uSkill" v-if="index<3" >{{item.uSkillName}}.&nbsp&nbsp</span>
                      <span style="font-size: 14px;color:darkgray;">等共{{k.lenSkill}}项技能</span>
                    </div>

                  </div>
                  <!--                  成果-->
                  <div  style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">成果</div>
                    <div v-if="k.article.length>0">
                      <div v-for="(item,index) in k.article" @click="JumpArticle(item.aid)">
                        《{{item.title}}》
                      </div>
                    </div>
                    <div v-else>暂无</div>

                  </div>
                  <!--                  提问-->
                  <div  style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">热门提问</div>
                    <div v-if="k.question.length>0">
                      <div v-for="(item,index) in k.question" @click="jumpQuestion(item.qid)">
                        {{item.title}}
                      </div>
                    </div>
                    <div v-else>暂无</div>
                  </div>
                </div>
                <div style="float:right;">
                  <el-avatar :size="60" style="margin:5px;" :src="k.avatarUrl"></el-avatar>
                </div>

              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <!--          推荐您关注的问题-->
            <el-card style="text-align: left;color:dimgray">
              <div slot="header" style="text-align:left; padding-bottom: 10px;">
                <div style="float:left;font-size:16px;">推荐您关注的问题</div>
              </div>

              <div v-for="(q,index) in questionList" style="margin-bottom: 10px;padding: 5px;border: 1px solid #F7F7F7;border-radius: 5px;">
                <div style="font-weight: bold;margin-bottom: 5px" @click="jumpQuestion(q.qid)">{{q.title}}</div>
                <div>
                  <span style="color: #8c939d;font-size: 14px">时间:{{q.time}}</span>
                  <span style="float: right ;color: #8c939d;font-size: 14px" @click="jumpUser(q.asker.id)">提问人:{{q.asker.name}}</span>
                </div>
              </div>


            </el-card>
            <!--            推荐成果-->
            <el-card style="text-align: left;color:dimgray">
              <div slot="header" style="text-align:left; padding-bottom: 10px;">
                <div style="float:left;font-size:16px;">推荐您关注的成果</div>
              </div>
              <div v-for="(q,index) in articleList" style="margin-bottom: 10px;padding: 5px;border: 1px solid #F7F7F7;border-radius: 5px;box-shadow:0px 0px 5px 5px #F7F7F7">
                <div style="font-weight: bold;margin-bottom: 5px" @click="JumpArticle(q.aID)">{{q.title}}</div>
                <div>
                  <span style="color: #8c939d;font-size: 14px">类型:{{q.type}}</span>
                </div>
              </div>

            </el-card>
            <!--          推荐关注卡-->
            <!--            <el-card  style="text-align: left">-->
            <!--              <div slot="header" style="text-align:left; padding-bottom: 10px;">-->
            <!--                <div style="float:left;font-size:16px;">推荐您关注的人</div>-->
            <!--              </div>-->
            <!--              <div v-if="userInform.lenSkill!==0" style="font-size: 14px;font-style: italic;margin-bottom:20px;">他们和您的技能重叠度很高，可以考虑关注交流一下哦。</div>-->
            <!--              <div v-else style="font-size: 14px;font-style: italic;margin-bottom:20px;">他们在本网站很受关注，您可以了解一下哦。您添加了技能后我们会为您推荐技能相同的研究人员。会更适合您。</div>-->
            <!--              <div v-for="(item,index) in userInform.uRecommand"  :key="item.uID">-->
            <!--                <div class="clearfix" style="margin-bottom:20px;">-->
            <!--                  <div style="float:left;margin-right: 10px;">-->
            <!--                    <el-avatar :size="40" :src="item.avatarUrl"></el-avatar>-->
            <!--                  </div>-->
            <!--                  <div style="float:left;">-->
            <!--                    <el-tooltip placement="top-start">-->
            <!--                      <div slot="content"  class="clearfix" style="width:400px;padding:20px;margin-top:20px;text-align: left;">-->
            <!--                        <div style="width:70%;float:left;">-->
            <!--                          &lt;!&ndash;          用户名+学位&ndash;&gt;-->
            <!--                          <div style="margin-bottom: 10px">-->
            <!--                            <div style="font-size: 18px;font-weight: bold;">{{item.uName}}</div>-->
            <!--                            <div v-if="item.lenDegree!==0" style="margin:0;">-->
            <!--                            <span style="font-size: 14px;color:darkgray;" v-for="item_ in userInform.uDegree" :key="item_.uDegreeID">-->
            <!--                            {{item_.uDegreeName}}-->
            <!--                            </span>-->
            <!--                            </div>-->
            <!--                          </div>-->
            <!--                          &lt;!&ndash;                  邮箱&ndash;&gt;-->
            <!--                          <div  style="margin-bottom: 10px;font-size: 14px;color:lightgrey;">-->
            <!--                            <div style="font-weight: bold;color:white;">邮箱</div>-->
            <!--                            <div>-->
            <!--                              {{item.uEmail}}-->
            <!--                            </div>-->

            <!--                          </div>-->
            <!--                          &lt;!&ndash;                个人介绍&ndash;&gt;-->
            <!--                          <div v-if="item.uDescription!==''" style="margin-bottom: 10px">-->
            <!--                            <div style="font-size: 16px;color:lightgrey;font-style: italic;">{{item.uDescription}}</div>-->
            <!--                          </div>-->
            <!--                          &lt;!&ndash;          机构和部门&ndash;&gt;-->
            <!--                          <div v-if="item.uInstitution!==''" style="margin-bottom: 10px;font-size: 14px;color:lightgrey">-->
            <!--                            <div style="font-weight: bold;color:white">机构和部门</div>-->
            <!--                            <div>-->
            <!--                              {{item.uInstitution}}- -->
            <!--                              {{item.uDepartment}}-->
            <!--                            </div>-->

            <!--                          </div>-->
            <!--                          &lt;!&ndash;          技能&ndash;&gt;-->
            <!--                          <div v-if="item.lenSkill!==0" style="margin-bottom: 10px;font-size: 14px;color:lightgray;">-->
            <!--                            <div style="font-weight: bold;color:white">技能</div>-->
            <!--                            <div>-->
            <!--                            <span v-for="(item_,index) in userInform.uSkill" v-if="index<3" :key="item_.uSkillID">-->
            <!--                             {{item_.uSkillName}}.-->
            <!--                            </span>等-->
            <!--                            </div>-->

            <!--                          </div>-->
            <!--                        </div>-->
            <!--                        <div style="float:right;">-->
            <!--                          <el-avatar :size="60" style="margin:5px;" :src="item.avatarUrl"></el-avatar>-->
            <!--                        </div>-->

            <!--                      </div>-->
            <!--                      <div style="font-size: 16px;font-weight: bold;">-->
            <!--                        <el-button class="claim_btn" type="text" @click="jumpUser(item.uID)">{{item.uName}}</el-button>-->
            <!--                      </div>-->
            <!--                    </el-tooltip>-->

            <!--                    <div style="font-size: 14px;font-style: italic">有{{item.uNumFollow}}位用户关注了他</div>-->
            <!--                  </div>-->
            <!--                  <el-button style="float:right; margin-top:15px;" type="primary" plain size="mini" @click="followRecommand(item.uID)">关注</el-button>-->

            <!--                </div>-->

            <!--              </div>-->
            <!--            </el-card>-->

          </el-col>
        </el-row>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "Welcome",
  data(){
    return{
      articleList:[

      ],
      questionList:[

      ],
      options: [{
        value: 0,
        label: '成果标题'
      }, {
        value: 1,
        label: '作者姓名'
      }, {
        value: 2,
        label: '机构'
      }, {
        value: 3,
        label: '研究领域'
      }],
      value_:0,
      queryInfo: {
        query: '', //搜索关键字
        qway:0,//检索方式0:成果标题 1:作者姓名 2:机构 3:研究领域
      },
      search_input:'',
      realuID:"",
      uID:"",
      havaFollowed:true,
      userList:[
        // {
        //   uID:"2",uName:"CHJK",uEmail:"18222333734@163.com",
        //   uNumFollow:90,
        //   avatarUrl:"https://himg.bdimg.com/sys/portrait/item/public.1.dc6ae00d.ubgN4svQhGe9gL3Ltweyeg.jpg",
        //   uDescription:"",
        //   uDegree:[
        //     {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //     {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //   ],
        //   uInstitution:"", uDepartment:"SoftWare College",
        //   uSkill:[
        //     {uSkillID:"1",uSkillName:"C language"},
        //     {uSkillID:"2",uSkillName:"Java"},
        //     {uSkillID:"3",uSkillName:"Vue"}
        //   ],
        //   lenDegree:2,
        //   lenSkill:3,
        //   article:[
        //     {aid:1,title:"文章1"},
        //     {aid:2,title:"文章2"},
        //   ],
        //   question:["fhkjhx,fnkdjfskfkjd","askhrsk反馈说句话看见","skhfks富士康家还是课件还是课件"]
        // },
        // {
        //   uID:"3",uName:"lpl",uEmail:"18222333734@163.com",
        //   uNumFollow:1700,
        //   avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //   uDescription:"",
        //   uDegree:[
        //     {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //     {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //   ],
        //   uInstitution:"", uDepartment:"SoftWare College",
        //   uSkill:[
        //     {uSkillID:"1",uSkillName:"C language"},
        //     {uSkillID:"2",uSkillName:"Java"},
        //     {uSkillID:"3",uSkillName:"Vue"}
        //   ],
        //   lenDegree:2,
        //   lenSkill:3,
        //   article:[
        //     {aid:1,title:"文章1"},
        //     {aid:2,title:"文章2"},
        //   ],
        //   question:["fhkjhx,fnkdjfskfkjd","askhrsk反馈说句话看见","skhfks富士康家还是课件还是课件"]
        // },
        // {
        //   uID:"2",uName:"CHJK",uEmail:"18222333734@163.com",
        //   uNumFollow:90,
        //   avatarUrl:"https://himg.bdimg.com/sys/portrait/item/public.1.dc6ae00d.ubgN4svQhGe9gL3Ltweyeg.jpg",
        //   uDescription:"",
        //   uDegree:[
        //     {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //     {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //   ],
        //   uInstitution:"", uDepartment:"SoftWare College",
        //   uSkill:[
        //     {uSkillID:"1",uSkillName:"C language"},
        //     {uSkillID:"2",uSkillName:"Java"},
        //     {uSkillID:"3",uSkillName:"Vue"}
        //   ],
        //   lenDegree:2,
        //   lenSkill:3,
        //   article:[
        //     {aid:1,title:"文章1"},
        //     {aid:2,title:"文章2"},
        //   ],
        //   question:["fhkjhx,fnkdjfskfkjd","askhrsk反馈说句话看见","skhfks富士康家还是课件还是课件"]
        // },
        // {
        //   uID:"3",uName:"PLP",uEmail:"18222333734@163.com",
        //   uNumFollow:1700,
        //   avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //   uDescription:"",
        //   uDegree:[
        //     {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //     {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //   ],
        //   uInstitution:"", uDepartment:"SoftWare College",
        //   uSkill:[
        //     {uSkillID:"1",uSkillName:"C language"},
        //     {uSkillID:"2",uSkillName:"Java"},
        //     {uSkillID:"3",uSkillName:"Vue"}
        //   ],
        //   lenDegree:2,
        //   lenSkill:3,
        //   article:[
        //     {aid:1,title:"文章1"},
        //     {aid:2,title:"文章2"},
        //   ],
        //   question:["fhkjhx,fnkdjfskfkjd","askhrsk反馈说句话看见","skhfks富士康家还是课件还是课件"]
        // }
      ],
      userInform:{
        // uID:"",
        // uName:"李静雯",
        // uInstitutionID:"",
        // uInstitutionName:"",
        // uDepartment:"SoftWare College",
        // uCharacter:"董事长",
        // avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        // lenSkill:3,
        // uRecommand:[
        //   {
        //     uID:"1",uName:"AAA",uEmail:"18222333734@163.com",
        //     uNumFollow:12,
        //     avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //     uDescription:"",
        //     uDegree:[
        //       {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //       {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //     ],
        //     uInstitution:"", uDepartment:"SoftWare College",
        //     uSkill:[
        //       {uSkillID:"1",uSkillName:"C language"},
        //       {uSkillID:"2",uSkillName:"Java"},
        //       {uSkillID:"3",uSkillName:"Vue"}
        //     ],
        //     lenDegree:2,
        //     lenSkill:3,
        //   },
        //   {
        //     uID:"2",uName:"CHJK",uEmail:"18222333734@163.com",
        //     uNumFollow:90,
        //     avatarUrl:"https://himg.bdimg.com/sys/portrait/item/public.1.dc6ae00d.ubgN4svQhGe9gL3Ltweyeg.jpg",
        //     uDescription:"",
        //     uDegree:[
        //       {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //       {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //     ],
        //     uInstitution:"", uDepartment:"SoftWare College",
        //     uSkill:[
        //       {uSkillID:"1",uSkillName:"C language"},
        //       {uSkillID:"2",uSkillName:"Java"},
        //       {uSkillID:"3",uSkillName:"Vue"}
        //     ],
        //     lenDegree:2,
        //     lenSkill:3,
        //   },
        //   {
        //     uID:"3",uName:"PLP",uEmail:"18222333734@163.com",
        //     uNumFollow:1700,
        //     avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //     uDescription:"",
        //     uDegree:[
        //       {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //       {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //     ],
        //     uInstitution:"", uDepartment:"SoftWare College",
        //     uSkill:[
        //       {uSkillID:"1",uSkillName:"C language"},
        //       {uSkillID:"2",uSkillName:"Java"},
        //       {uSkillID:"3",uSkillName:"Vue"}
        //     ],
        //     lenDegree:2,
        //     lenSkill:3,
        //   },
        //
        // ],
      },

      uJumpFollowing:[
        // {
        //   uID:"1",uName:"我的天",uEmail:"18222333734@163.com",
        //   haveFollowed:true,
        //   uNumFollow:12,
        //   avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //   uDescription:"",
        //   uDegree:[
        //     {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //     {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //   ],
        //   uInstitution:"", uDepartment:"SoftWare College",
        //   uSkill:[
        //     {uSkillID:"1",uSkillName:"C language"},
        //     {uSkillID:"2",uSkillName:"Java"},
        //     {uSkillID:"3",uSkillName:"Vue"}
        //   ],
        //   lenDegree:2,
        //   lenSkill:3,
        // },
        // {
        //   uID:"2",uName:"CHJK",uEmail:"18222333734@163.com",
        //   haveFollowed:false,
        //   uNumFollow:90,
        //   avatarUrl:"https://himg.bdimg.com/sys/portrait/item/public.1.dc6ae00d.ubgN4svQhGe9gL3Ltweyeg.jpg",
        //   uDescription:"",
        //   uDegree:[
        //     {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //     {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //   ],
        //   uInstitution:"", uDepartment:"SoftWare College",
        //   uSkill:[
        //     {uSkillID:"1",uSkillName:"C language"},
        //     {uSkillID:"2",uSkillName:"Java"},
        //     {uSkillID:"3",uSkillName:"Vue"}
        //   ],
        //   lenDegree:2,
        //   lenSkill:3,
        // },
        // {
        //   uID:"3",uName:"PLP",uEmail:"18222333734@163.com",
        //   haveFollowed:true,
        //   uNumFollow:1700,
        //   avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //   uDescription:"",
        //   uDegree:[
        //     {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        //     {uDegreeID:"2",uDegreeName:"bachelor of science"}
        //   ],
        //   uInstitution:"", uDepartment:"SoftWare College",
        //   uSkill:[
        //     {uSkillID:"1",uSkillName:"C language"},
        //     {uSkillID:"2",uSkillName:"Java"},
        //     {uSkillID:"3",uSkillName:"Vue"}
        //   ],
        //   lenDegree:2,
        //   lenSkill:3,
        // },

      ],
      researchlist:[
        // {
        //   aID:"1",
        //   name:"Electroencephalogram-Based",
        //   author:["zcx","ljw"],
        //   public_time:"2021-10-25",
        //   pic: require("../assets/CSS/defaultpage.png"),tag:"CS",
        //   subjects:["s1","s2"]
        // },
        // {
        //   aID:"2",
        //   name:"Product",
        //   author:["ljw","zcx"],
        //   public_time:"2021-10-24test",
        //   pic: require("../assets/CSS/defaultpage.png"),tag:"SE",
        //   subjects:["s3","s4"]},
      ],
    };
  },
  mounted()
  {
    //顶子刷新依然金色
    if(this.$route.path==="/Welcome")
    {
      const tmpA=document.getElementById('Passage');
      const tmpB=document.getElementById('Welcome');
      const tmpC=document.getElementById('User');
      const tmpD=document.getElementById('Super');
      const tmpE=document.getElementById('Message');
      tmpA.style.color="white"
      tmpB.style.color="gold"
      tmpC.style.color="white"
      tmpD.style.color="white"
      tmpE.style.color="white"
    }
    this.$forceUpdate();
    this.articleRecommand();
  },
  info(r){
    let CodedsID=r.rID
    this.codeUrl='/'+CodedsID;
    console.log(r.rID);
    this.$router.push({
      path:this.codeUrl
    })
  },

  created() {
    this.realuID=window.sessionStorage.getItem("realuID");
    this.uID=window.sessionStorage.getItem("uID");
    // const tmp=document.getElementById('User');
    // if(this.$route.path==="/Follow"||this.$route.path==="/User"||this.$route.path==="/Introduce")
    //   tmp.style.color="gold";
    this.getuserInform();
    this.articleRecommand();
    this.getJumpFollowList();
    console.log(this.userInform);
    console.log("获取用户信息成功");
    this.$forceUpdate();
    this.getuserList();
    this.getArticle();
    this.getQuestion();
  },

  methods:{
    jumpUser(uID){
      window.sessionStorage.setItem("uID",uID);
      this.$router.push({path:"/Introduce"})
    },
    jumpQuestion(qid){
      this.$router.push({path: '/question', query: {qid: qid}});
    },
    async search() {
      if (this.queryInfo.query.length !== 0) {
        await new Promise((resolve) => {
          this.queryInfo.qway = this.value_
          this.$http
            .post("/userlist/get/search/", JSON.stringify({query:this.queryInfo.query,qway:this.queryInfo.qway}))
            .then((res) => {
              if (res.data.success === false) {
                this.$message.error("搜索失败");
                return console.log(res.data.message);
              } else {
                this.userList = res.data.userList;
              }
            });
          resolve();
        });
      } else {
        alert("检索内容不能为空！");
      }

    },

    //获取推荐人员
    async getuserList(){
      let u = this.realuID;
      await new Promise((resolve) => {
        this.$http
          .post("/userlist/get/recommend/", JSON.stringify({ realuID:u}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("用户推荐信息获取失败");
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "用户基本信息获取成功成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.userList=res.data.userList;
            }
          });
        resolve();
      });
    },
    //获取推荐成果
    async getArticle(){
      let u = this.realuID;
      await new Promise((resolve) => {
        this.$http
          .post("/articlelist/get/recommend/", JSON.stringify({ realuID:u}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("用户推荐信息获取失败");
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "用户基本信息获取成功成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.articleList=res.data.articleList;
              let i;
              for(i=0;i<this.articleList.length;i++){
                if(this.articleList[i].type===1){
                  this.articleList[i].type='会议'
                }
                else if(this.articleList[i].type===2){
                  this.articleList[i].type='期刊'
                }
                else if(this.articleList[i].type===3){
                  this.articleList[i].type='技术报告'
                }
                else if(this.articleList[i].type===4){
                  this.articleList[i].type='书'
                }
                else if(this.articleList[i].type===5){
                  this.articleList[i].type='专利'
                }
              }
            }
          });
        resolve();
      });
    },
    //获取推荐问题
    async getQuestion(){
      let u = this.realuID;
      await new Promise((resolve) => {
        this.$http
          .post("/question/get/recommend/", JSON.stringify({ realuID:u}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("用户推荐信息获取失败");
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "用户基本信息获取成功成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.questionList=res.data.questionList;
            }
          });
        resolve();
      });
    },
    //获取用户基本信息
    async getuserInform() {
      let u = this.realuID;
      await new Promise((resolve) => {
        this.$http
          .post("/user/get/userInfo", JSON.stringify({ uID:u}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("用户基本信息获取失败");
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "用户基本信息获取成功成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.userInform=res.data.userInform;
            }
          });
        resolve();
      });

    },
    //获取其他用户跳转的已关注列表
    async getJumpFollowList() {
      let r =this.realuID;
      let uID=window.sessionStorage.getItem("uID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/jump", JSON.stringify({uID:r,followsID:uID}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("该用户关注人信息获取失败");
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "该用户关注人信息获取成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.uJumpFollowing=res.data.uJumpFollowing;
            }
          });
        resolve();
      });


    },
    //关注函数
    async followRecommand(item){
      let r=this.realuID
      await new Promise((resolve) => {
        this.$http
          .post("user/follow", JSON.stringify({uID:r,followsID:item}))
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
              this.getuserInform();

            }
          });
        resolve();
      });

    },
    //取消关注函数
    async unfollowRecommand(uID){
      const realuID=this.realuID
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
      this.getFollowList();//已经关注了这个人，就刷新推荐新的关注人
    },
    //是否已经关注该用户
    async ifHaveFollowed(){
      const realuID=this.realuID
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
              this.havaFollowed=res.data.haveFollowed;
            }
          });
        resolve();
      });
      await this.getFollowList();//已经关注了这个人，就刷新推荐新的关注人
    },
    //跳转到其他作者门户
    //获取推荐文献
    async articleRecommand(){
      const realuID=window.sessionStorage.getItem("realuID");
      await new Promise((resolve) => {
        this.$http
          .post("/getSuggestedArticle/", JSON.stringify({ realuID:realuID }))
          .then((res) => {
            if (res.data.success === false) {
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "推荐文献获取成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.researchlist=res.data.researchlist;
            }
          });
        resolve();
      });

    },
    JumpArticle(r) {
      let codeUrl = '/' + r;
      this.$router.push({
        path: codeUrl
      })
    },
    JumpUser(){
      window.sessionStorage.setItem("uID",this.realuID);
      this.$router.push({
        path:'/Myupload'
      })
    }
  }
}
</script>

<style Lang="less" scoped>


.head-box{
  width:100%;
  padding:15px 15px 0 15px;
  background-color: white;

}
.selfInform-box{
  margin:0 auto;
  width:60%;
  padding:15px 15px 0 15px;
  //background-color: red;
}
.el-button:hover{
  background-color: #1E9992;
}
>>>.el-tabs__header{
  margin:10px 0 0 0 !important;
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
  background-image: url(back.jpg);
  background-size: 100% 100%;
}
.self-card2{
  float:left;
  width:100%;
}
.edit-button{
  float: right;
  padding: 3px 0;
  border:0 !important;
  border-radius: 0 !important;
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
>>>.el-form--label-top .el-form-item__label{padding:0 !important;}
.claim_btn{
  font-weight: bold;
  color:dimgrey !important;
  padding:0;
}
.claim_btn:hover{
  font-weight: bold;
  color:lightseagreen !important;
  text-decoration-line: underline;
  background-color: transparent !important;
}
.zcx_card{
  float:left;
  width:100%;
  text-align: left;
}
.zcx_card:hover{
  background-color: rgb(247,247,247);
  border: 1px solid #dadada;
  border-radius: 5px;
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
  margin-bottom:20px;
  font-size:17px;

}
.info_row2{
  margin-bottom:13px;
  font-size:8px;
}
</style>
