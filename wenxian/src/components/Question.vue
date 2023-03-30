<template>
  <div>
    <el-row type="flex" justify="center" style="margin-bottom: 15px">
      <el-col :span="14">
        <el-card style="text-align: left;">
          <el-row class="questionTitle">{{ question.title }}</el-row>


          <el-row type="flex" align="middle" class="askerInfo" style="height:60px;"
                  @click.native="jumpUser(question.asker.uid)">
            <el-col :span="1">
              <el-avatar shape="circle" :size="25" fit="fill" :src="question.asker.avatar"/>
            </el-col>
            <el-col style="color:gray;margin-left: 7px;font-size: 90%">
              {{
                question.asker.name
                + "  " +
                question.time
              }}
            </el-col>

          </el-row>

          <el-row class="questionDetail">{{ question.detail }}</el-row>


          <el-row type="flex" justify="end">

            <el-col :span="4">
              <el-button type="primary" icon="el-icon-edit" plain @click="answerDialogVisible = true;">我来回答
              </el-button>
            </el-col>

            <el-col :span="4">
              <el-button type="primary"  plain @click="changeFollow">
                <i class="el-icon-star-off" v-if="!isFollow"></i>
                <i class="el-icon-star-on" v-if="isFollow"></i>
                {{ isFollow ? "取消关注" : "关注" }}
              </el-button>
            </el-col>


          </el-row>

          <el-dialog
            title="我的回答："
            :visible.sync="answerDialogVisible"
            width="50%"
          >
            <el-input
              type="textarea"

              :autosize="{ minRows: 2, maxRows: 20}"
              placeholder="请输入回答"
              maxlength="500"
              :show-word-limit="true"
              v-model="myAnswer">
            </el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="answerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="answerDialogVisible = false; newAnswer();">发 布</el-button>
  </span>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>


    <el-row type="flex" justify="center">
      <el-col :span=14>
        <el-card>
          <el-row style="text-align: left; font-size: 22px;">
            评论 / 回复
          </el-row>
          <el-row v-for="(answer, index) in answers">
            <el-divider/>
            <el-row style="text-align: left;">

              <el-row type="flex" align="middle" class="askerInfo" @click.native="jumpUser(answer.responder.uid)"
                      style="margin-bottom: 20px">
                <el-col :span="1">
                  <el-avatar shape="circle" :size="30" fit="fill" :src="answer.responder.avatar"/>
                </el-col>
                <el-col style="font-weight: bold;margin-left: 9px;">
                  {{ answer.responder.name + "  " }}
                  <span
                    style="font-weight: lighter;font-size: 90%;color: #8c939d;margin-left: 9px;">{{
                      answer.time
                    }}</span>

                </el-col>

                <el-col :span="4" style="margin-left: 10px" v-if="realuID === answer.responder.uid">
                  <el-popover
                    placement="top"
                    width="160"
                    trigger="hover"
                    :v-model="answer.deleteVisible">
                    <p>确定要删除回答吗？</p>
                    <div style="text-align: right; margin: 0">
                      <!--                      <el-button size="mini" type="text" @click="answer.deleteVisible = false;">取消</el-button>-->
                      <el-button type="primary" size="mini" @click="deleteAnswer(answer)">确定
                      </el-button>
                    </div>

                    <!--              realuID-->
                    <el-button type="danger" icon="el-icon-delete" slot="reference"
                               circle
                               plain/>

                  </el-popover>
                </el-col>


              </el-row>

              <el-row>{{ answer.content }}</el-row>

            </el-row>


          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "Question",
  data() {
    return {
      answerDialogVisible: false,
      myAnswer: "",
      qid: "",
      realuID: "",
      uID: "",
      deleteVisible: false,
      isFollow: false,
      question: null,
      answers: []
    };
  },
  methods: {
    jumpUser(uID) {
      console.log(uID)
      window.sessionStorage.setItem("uID", uID);
      this.$router.push({path: "/Introduce"})
    },
    async loadQuestion() {
      let res = await this.$http.post("/question/get/detail/", JSON.stringify({qID: this.qid}));
      if (res.data.success) {
        this.question = res.data.question;
        this.answers = res.data.answers;
      }
    },
    async newAnswer() {
      let res = await this.$http.post("/question/answer/new/", JSON.stringify({
        qID: this.qid,
        uID: this.realuID,
        content: this.myAnswer
      }));
      if (res.data.success) {
        this.$message.success("回复成功");
        await this.loadQuestion();
        this.myAnswer = ""
      } else {
        this.$message.error("回复失败");
      }
    },
    async deleteAnswer(answer) {
      let res = await this.$http.post("/question/answer/delete/", JSON.stringify({aid: answer.aid}));
      if (res.data.success) {
        this.$message.success("删除成功");
        await this.loadQuestion();
        this.myAnswer = ""
      } else {
        this.$message.error("删除失败");
      }
    },
    async changeFollow() {
      let res = await this.$http.post("/question/follow/change/", JSON.stringify({
        qid: this.question.qid,
        uid: this.realuID
      }));
      if (res.data.success) {
        this.isFollow = res.data.follow;
        this.$message.success(this.isFollow ? "关注成功" : "取消关注成功");
      } else {
        this.$message.error("关注/取消关注失败");
      }
    },
    async init() {
      await this.loadQuestion();
      let res = await this.$http.post("/question/follow/query/", JSON.stringify({
        qid: this.qid,
        uid: this.realuID
      }));
      console.log("follow")
      console.log(res)
      if (res.data.success) {
        this.isFollow = res.data.follow;
      }
    }
  },

  mounted() {
    console.log("111")
    this.realuID = JSON.parse(window.sessionStorage.getItem("realuID"));
    this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
    //获取所有学科subjects
    this.qid = this.$route.query.qid;
    this.init()
  },

}
</script>

<style scoped>
.questionTitle {
  font-size: 36px;
  /*font-size: xx-large;*/
  font-weight: bold;
}

.askerInfo:hover {
  cursor: pointer;
}

.questionDetail {
  font-size: 20px;
  /*font-size: large;*/
}
</style>
