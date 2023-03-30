<template>
  <div class="main-box">
    <!--      编辑项目信息的框框-->
    <el-dialog
      :title="edittitle"
      :visible.sync="editvisible"
      width="50%"
    >
    <span>
      <el-form :model="questionInfo" label-width="20%" style="text-align:left">
        <el-form-item label="问题标题">
          <el-input v-model="questionInfo.title" maxlength="30"
                    :show-word-limit="true" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="所属学科">
          <el-select v-model="questionInfo.subjects" multiple placeholder="请选择研究所属学科">
            <el-option
              v-for="item in subjects"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input maxlength="500"
                    :show-word-limit="true" type="textarea" v-model="questionInfo.detail"></el-input>
        </el-form-item>
      </el-form>
    </span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editvisible=false">取 消</el-button>
      <el-button @click="isEdit? saveEdit() : newQuestion(); editvisible=false;">确 定</el-button>
    </span>
    </el-dialog>

    <el-row :gutter="20">
      <!--左侧导航栏-->
      <el-col :span="8" class="zcx_col" style="padding-top: 20px">
        <el-row type="flex" justify="center">
          <el-button type="primary"  style=" width: 100%;margin-top: 10px;margin-bottom:20px;font-size: large"
                     @click="isEdit=false; editvisible=true;cleanQuestionInfo();listMode=1;"
                     icon="el-icon-circle-plus"> 新建提问
          </el-button>
        </el-row>
        <el-menu default-active="1">
          <!--新增项目按钮-->

<!--          <el-row type="flex" justify="center">-->
<!--            <el-col :span="20">-->
<!--              <el-divider/>-->
<!--            </el-col>-->
<!--          </el-row>-->
          <el-menu-item index="1" @click="listMode = 1; loadList()">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">提问列表</span>
          </el-menu-item>
          <el-menu-item index="2" @click="listMode = 2; loadList()">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">回答列表</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!--右侧研究列表-->
      <el-col :span="16">
        <!--      项目列表主体-->
        <el-row :gutter="20">
          <div v-for="(p,index) in plist" :key="index">
            <el-card>

              <!--          TODO: click and route-->
              <el-row class="info_row">
                <b @click="jumpToQuestion(p)">{{ p.title }}</b>
              </el-row>
              <el-row class="info_row0" type="flex">
                <div v-for="(s,index2) in p.subjects" :key="index2">
                  <el-tag size="medium" type="warning" style="margin-left:3px">{{ s }}</el-tag>
                </div>
              </el-row>
              <el-row type="flex">
                <el-col :span="6" :offset="18">
                  <el-button type="primary" icon="el-icon-edit" @click=edit(p) v-if="listMode === 1" circle
                             plain></el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="deleteQuestion(p)" v-if="listMode === 1" circle
                             plain></el-button>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-row>

      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "QuestionList",
  data() {
    return {
      uID: "1",
      realuID: "1",
      isEdit: false, // or is creating new
      editvisible: false,
      listMode: 1,
      plist: [],
      questionInfo: {
        qid: "",
        title: "",
        subjects: [],
        detail: ""
      },
      subjects: [],
    }
  },
  methods: {
    edit(p) {
      this.isEdit = true;
      this.questionInfo = p;
      this.editvisible = true;
    },
    async getAllSubject() {
      let res = await this.$http.post("/getsubject/", JSON.stringify({}));
      if (res.data.success) {
        this.subjects = res.data.data.subjects;
      }
    },
    async loadList() {
      let addr = this.listMode === 1 ? "/question/get/list/" : "/question/get/answeredlist/"
      let res = await this.$http.post(addr, JSON.stringify({
        uid: this.uID
      }));
      console.log("loadList: ")
      console.log(res)
      if (res.data.success) {
        this.plist = res.data.questionList;
      }
    },
    async saveEdit() {
      let res = await this.$http.post("/question/edit/", JSON.stringify(this.questionInfo));
      if (res.data.success) {
        this.$message.success("问题修改成功")
        await this.loadList();
        this.cleanQuestionInfo();
      } else {
        this.$message.error("编辑问题信息失败");
      }
    },
    async deleteQuestion(p) {
      let res = await this.$http.post("question/delete/", JSON.stringify({qid: p.qid}));
      if (res.data.success) {
        this.$message.success("问题删除成功")
        await this.loadList();
      } else {
        this.$message.error("删除问题失败");
      }
    },
    jumpToQuestion(question){
      this.$router.push({path: '/question', query: {qid: question.qid}});
    },
    cleanQuestionInfo() {
      this.questionInfo = {
        qid: "",
        title: "",
        subjects: [],
        detail: ""
      }
    },
    async newQuestion() {
      let res = await this.$http.post("/question/new/", JSON.stringify({...this.questionInfo, uID: this.realuID}));
      if (res.data.success) {
        this.$message.success("问题发布成功")
        await this.loadList();
        this.cleanQuestionInfo();

      }
    },
  },

  computed: {
    edittitle() {
      return this.isEdit ? "编辑问题信息" : "新建问题";
    }
  },
  mounted() {
    this.realuID = JSON.parse(window.sessionStorage.getItem("realuID"));
    this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
    // if (location.href.indexOf("#reloaded")<=0) {
    //   location.href = location.href + "#reloaded"+"#reloaded";
    //   location.reload();
    // }

    this.getAllSubject();
    this.loadList();

  },
}
</script>

<style Lang="less" scoped>
.zcx_col {
  padding-top: 20px;
  padding-left: 20px;
  width: 25%;
}
.main-box {
  margin: 0 auto;
  width: 80%;
}

.info_row {
  margin-bottom: 10px;
  flex-wrap: wrap;
  font-size: 20px;
  text-align: left;
}

.info_row:hover {
  text-decoration: underline;
  cursor: pointer;
}

.info_row0 {
  gutter: 10;
  padding: 3px 0;
}

.info_row1 {
  margin-bottom: 5px;
  font-size: 17px;
}

.edit_row {
}

.description_row {
  text-align: left !important;
  font-size: large;
  margin-bottom: 3px;
  line-height: 2em;
}

.new_project {
  margin-top: 20px;
  margin-left: 10px;
  float: right;
}

</style>
