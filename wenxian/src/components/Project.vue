<template>
  <div class="main-box">
    <!--      编辑项目信息的框框-->
    <el-dialog
      :title="this.edittitle"
      :visible.sync="editvisible"
      width="60%"
    >
    <span>

      <el-form  :model="projectinfo" ref="projectinfoRef" :rules="projectinfoRules" label-width="20%" style="text-align:left">
        <el-row>
              <el-col :span="14">
                <el-form-item label="添加作者信息">
                  <el-input
                    v-model="searchName"
                    placeholder="搜索用户添加到作者列表"
                    clearable
                    style="width: 50%"
                  />
                  <el-button
                    size="medium"
                    type="primary"
                    @click="searchAuthor()"
                  >搜索</el-button
                  >
                </el-form-item>

                <el-form-item label-width="0" v-show="showAuthorResearchResult">
                  <p>搜索结果</p>
                  <el-table
                    :data="authorSearchResult"
                    style="width: 90%;"
                    :show-header="false"
                    max-height="150"
                  >
                    <el-table-column prop="avt" label="1" width="50">
                      <template #default="scope">
                        <div style="display: flex; align-items: center">
                          <el-avatar size="small" :src="scope.row.avatorUrl" />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="uName"
                      label="2"
                      width="80"
                    ></el-table-column>
                    <el-table-column
                      prop="Institution"
                      label="3"
                      width="140"
                    ></el-table-column>
                    <el-table-column
                      prop="uEmail"
                      label="4"
                      width="120"
                    ></el-table-column>
                    <el-table-column fixed="right" label="5" width="50">
                      <template #default="scope">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="添加到本成果作者列表"
                          placement="bottom"
                        >
                          <el-button
                            type="primary"
                            icon="el-icon-plus"
                            circle
                            size="mini"
                            @click.prevent="addAuthor(scope.$index)"
                          />
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>

                <el-form-item label-width="0">
                  <p>已添加作者列表</p>
                  <el-table
                    :data="projectinfo.author"
                    style="width: 90%"
                    :show-header="false"
                    max-height="250"
                  >
                    <el-table-column
                      prop="uName"
                      label="1"
                      width="150"
                    ></el-table-column>
                    <el-table-column
                      prop="name"
                      label="2"
                      width="150"
                    ></el-table-column>
                    <el-table-column fixed="right" label="5" width="50">
                      <template #default="scope">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="删除该作者"
                          placement="bottom"
                        >
                          <el-button
                            type="primary"
                            icon="el-icon-minus"
                            circle
                            size="mini"
                            @click.prevent="deleteAuthor(scope.$index)"
                          />
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="项目名称">
                  <el-input v-model="projectinfo.name" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="所属学科">
                  <el-select v-model="projectinfo.subjects" multiple placeholder="请选择研究所属学科">
                    <el-option
                      v-for="item in subjects"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目描述">
                  <el-input type="textarea" v-model="projectinfo.description"></el-input>
                </el-form-item>
                <el-form-item label="所需条件">
                  <el-input type="textarea" v-model="projectinfo.requirement"></el-input>
                </el-form-item>
              </el-col>
        </el-row>
      </el-form>
    </span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editvisible=false">取 消</el-button>
      <el-button  @click="submit_edit()" >确 定</el-button>
    </span>
    </el-dialog>
    <!--      查看项目信息的框框-->
    <el-dialog
      title="查看项目信息"
      :visible.sync="infovisible"
      width="50%"
      class="description_row"
    >

    <span>
      <el-descriptions column="1">
        <el-descriptions-item label="项目名称： ">{{projectinfo.name}}</el-descriptions-item>
        <el-descriptions-item label="项目描述： ">{{projectinfo.description}}</el-descriptions-item>
        <el-descriptions-item label="加入条件： ">{{projectinfo.requirement}}</el-descriptions-item>
        <el-descriptions-item label="目前成员： ">
          <nobr v-for="(a,index3) in projectinfo.author" :key="index3">
            {{a}}.
          </nobr>
        </el-descriptions-item>
      </el-descriptions>
    </span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="infovisible=false">关闭</el-button>
    </span>
    </el-dialog>
    <!--新增项目按钮-->
    <el-row :gutter="20" v-if="uID===realuID">
      <el-button type="primary" class="new_btn" @click="newpro()" icon="el-icon-circle-plus">  新建您的个人项目</el-button>
    </el-row>
    <!--      项目列表主体-->
    <el-row :gutter="20">
      <div v-for="(p,index) in plist" :key="index">
        <el-card>
          <el-row class="info_row" >
            <b @click=info(p)>{{p.name}}</b>
          </el-row>
          <el-row class="info_row0" type="flex" >
            <div v-for="(s,index2) in p.subjects" :key="index2">
              <el-tag  size="medium" type="warning" style="margin: 0 3px">{{s}}</el-tag>
            </div>
          </el-row>
          <el-row type="flex" style="text-align:left;">
            <el-col :span="20">
              <i class="el-icon-user-solid"></i>
              <span v-for="(a,index3) in p.author" :key="index3" style="margin: 0 0px">
                    {{a.name}}.
                  </span>
            </el-col>
            <el-col :span="4" >
              <el-button type="primary" icon="el-icon-edit" @click=edit(p) v-if="uID===realuID&&p.ifin===true" style="float:right; margin:10px" circle plain></el-button>
              <el-button type="danger" icon="el-icon-delete" @click=dele(p) v-if="uID===realuID&&p.ifin===true" style="float:right; margin:10px"  circle plain></el-button>
              <el-button type="success" plain v-if="uID===realuID&&p.ifin===false" @click=joinproject(p)>同意加入</el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Project",
  data(){
    return{
      uID:"2",
      realuID:"1",
      edittitle:"编辑项目信息",
      editvisible:false,
      infovisible:false,
      searchName:"",
      plist:[
        {pID:'107',name:"Electroencephalogram-Based Preference Prediction Using Deep Transfer Learning",
          subjects:["SE","CS"],author:[{name:"zcx",uID:"2"},{name:"ljw",uID:"4"}],requirement:"需要一些美女",description:"这是一个zcx用来测试的项目",ifin:true},
        {pID:'107',name:"Electroencephalogram-Based Preference Prediction Using Deep Transfer Learning",
          subjects:["SE","CS"],author:[{name:"zcx",uID:"2"},{name:"ljw",uID:"4"}],requirement:"需要一些美女",description:"这是一个zcx用来测试的项目",ifin:true}
      ],
      projectinfo:{
        pID:"",
        name:"",
        subjects:[],
        author:[],
        description:"",
        requirement:"",
        email:""
      },
      messageFormRules: {

      },
      newproject:{
        pID:"",
        name:"",
        subjects:[],
        author:[],
        description:"",
        requirement:"",
        email:""
      },
      subjects:["CS","SE","BUAA","TYZ"],
      authorSearchResult: [
        /*{
          uID: "5",
          avatorUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //用户头像
          uName: "zhizhi5", // 用户名称
          Institution: "beihang University", // 用户所属机构
          uEmail: "11221@qq.com", // 用户邮箱
        },*/
      ],
      showAuthorResearchResult:"false",
    }
  },
  methods:{
    searchAuthor() {
      //console.log("搜索作者名：" + this.searchName);
      // 检查搜索关键词是否为空
      if (this.searchName === "") {
        this.$message({
          message: "请输入要搜索的用户名",
          type: "warning",
        });
        return;
      }
      this.$http
        .post(
          "/research/searchAuthor",
          JSON.stringify({ searchName: this.searchName })
        )
        .then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: "查询成功",
              type: "success",
            });
            this.authorSearchResult = res.data.searchResult;
            this.showAuthorResearchResult = true;
          } else {
            this.$message({
              message: "查询失败",
              type: "error",
            });
          }
        });
    },
    // 添加作者
    addAuthor(author) {
      for (var uid in this.projectinfo.author) {
        //console.log(uid);
        if (
          this.projectinfo.author[uid].uID ==
          this.authorSearchResult[author].uID
        ) {
          this.$message({
            message: "请勿重复添加该用户",
            type: "warning",
          });
          return;
        }
      }
      this.projectinfo.author.push(this.authorSearchResult[author]);
      //console.log(this.newresearch.authors);
      //console.log(this.authorsInfo);
      this.$message({
        message: "成功添加作者",
        type: "success",
      });
    },
    deleteAuthor(author) {
      //console.log(this.uID);
      //console.log(this.newresearch.authors[author]);
      if (this.uID == this.projectinfo.author[author].uID) {
        this.$message({
          message: "当前用户需在作者列表中",
          type: "warning",
        });
        return;
      }
      // 删除作者列表里的成员
      this.projectinfo.author.splice(author, 1);
      // console.log(this.newresearch.authors)
      this.$message({
        message: "成功删除该作者",
        type: "success",
      });
    },
    info(p){
      var CodedsID = p.pID;
      this.codeUrl='/pDetail/'+CodedsID;
      this.$router.push({
        path:this.codeUrl
      })
    },
    edit(p){
      this.projectinfo=p;
      this.edittitle="编辑项目信息";
      this.editvisible=true;
    },
    getplist(){
      new Promise((resolve) => {
        this.$http
          .post("/project/list", JSON.stringify({uID:this.uID}))
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              this.$message.error("获取项目列表失败");
              return console.log(res.data.message);
            }
            this.plist=res.data.pList;
          });
        resolve();
      });
    },
    submit_edit() {
      //this.$message.success(this.projectinfo.pID);
      for (var uid in this.projectinfo.author){
        this.projectinfo.author[uid].name=this.projectinfo.author[uid].uName;
      }
      if(this.edittitle==="编辑项目信息"){
        this.$message.success("hhhh");
        new Promise((resolve) => {
          this.$http
            .post("/project/edit", JSON.stringify({uID:this.uID,projectinfo:this.projectinfo}))
            .then((res) => {
              console.log(res);
              if (res.data.success === false) {
                this.$message.error("编辑项目信息失败");
                return console.log(res.data.message);
              }
              this.$message({
                message: "编辑项目信息成功",
                showClose: true,
                type: "success",
              });
            });
          resolve();
        });
      }else{
        new Promise((resolve) => {
          this.$http
            .post("/project/new", JSON.stringify({uID:this.uID,projectinfo:this.projectinfo}))
            .then((res) => {
              console.log(res);
              if (res.data.success === false) {
                this.$message.error("新建项目失败");
                return console.log(res.data.message);
              }
              this.$message({
                message: "新建项目成功",
                showClose: true,
                type: "success",
              });
              this.projectinfo=this.newproject;
            });
          this.getplist();
          resolve();
        });
      }
      this.editvisible=false;
      this.projectinfo=this.newproject;
      location.reload();
    },
    getsubjectlist(){
      new Promise((resolve) => {
        this.$http
          .post("/getsubject/", JSON.stringify({}))
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              this.$message.error(res.data.message);
              return;
            }else{
              this.subjects=res.data.data.subjects;
            }
          });
        resolve();
      });
    },
    dele(p){
      new Promise((resolve) => {
        this.$http
          .post("project/delete", JSON.stringify({uID:this.uID,pID:p.pID}))
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              this.$message.error(res.data.message);
              return;
            }else{
              this.$message.success("删除成功");
              location.reload();
            }
          });
        resolve();
      });
    },
    // apply(p){
    //   this.$message.success("申请成功")
    // },
    newpro(){
      this.edittitle="新建项目";
      this.projectinfo.name="";
      this.projectinfo.subjects=[];
      this.projectinfo.author=[{name:"本用户",uID:this.realuID}];
      this.projectinfo.description="";
      this.projectinfo.requirement="";
      this.projectinfo.email="";
      this.editvisible=true;
    },
    joinproject(p){
      new Promise((resolve) => {
        this.$http
          .post("project/accept", JSON.stringify({uID:this.uID,pID:p.pID}))
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              this.$message.error(res.data.message);
              return;
            }else{
              this.$message.success("加入成功");
              location.reload();
            }
          });
        resolve();
      });
    }
  },
  mounted() {
     this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
     this.realuID = JSON.parse(window.sessionStorage.getItem("realuID"));
    // if (location.href.indexOf("#reloaded")<=0) {
    //   location.href = location.href + "#reloaded"+"#reloaded";
    //   location.reload();
    // }
    //获取所有学科subjects
    this.getsubjectlist();
    this.getplist();
  }
}
</script>

<style Lang="less" scoped>
.main-box{
  margin:0 auto;
  width:70%;
}
.info_row{
  margin-bottom: 10px;
  flex-wrap: wrap;
  font-size: 20px;
  text-align: left;
}
.info_row:hover{
  text-decoration:underline;
  cursor:pointer;
}
.info_row0{
  margin-bottom:10px;
  gutter:10;
  padding: 3px 0;
}
.info_row1{
  margin-bottom:5px;
  font-size:17px;
}
.edit_row{
}
.description_row{
  text-align: left !important;
  font-size: large;
  margin-bottom: 3px;
  line-height: 2em;
}
.new_project{
  margin-top: 20px;
  margin-left: 10px;
  float: right;
}
.new_btn{
  width: 95%;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  height: 60px;
}
</style>
