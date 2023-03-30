<!-- 获取个人科研成果列表页面 -->
<template>
  <div class="main-box">
    <!--      编辑成果信息的框框-->
    <el-dialog
      :title="edittitle"
      :visible.sync="editvisible"
      width="70%"
      top="50px"
    >
      <div style="height: 450px; overflow: auto">
        <span>
          <el-form
            :model="newresearch"
            label-width="20%"
            style="text-align: left"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="添加作者信息">
                  <el-input
                    v-model="searchName"
                    placeholder="搜索用户添加到作者列表"
                    clearable
                    style="width: 65%"
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
                    style="width: 90%"
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
                    :data="newresearch.authors"
                    style="width: 90%"
                    :show-header="false"
                    max-height="250"
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
                <el-form-item label="上传研究文件">
                  <el-upload
                    class="upload-demo"
                    action="string"
                    :file-list="researchList"
                    :on-change="beforeUpload"
                    :auto-upload="false"
                    :on-remove="remove"
                  >
                    <!--action需要改成上传地址-->
                    <div v-if="changeIfo">
                      <el-button slot="trigger" size="medium" type="primary"
                      >上传新的文件</el-button
                      >
                    </div>
                    <div v-else>
                      <el-button slot="trigger" size="medium" type="primary"
                      >选取文件</el-button
                      >
                    </div>
                    <div slot="tip" class="el-upload__tip">
                      只能上传一个文件
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item label-width="0" v-if="changeIfo">
                  <el-button
                    size="medium"
                    type="primary"
                    @click="deleteAllUploadFile()"
                  >清除已上传文件</el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="研究成果名称">
                  <el-input
                    v-model="newresearch.name"
                    style="width: 80%"
                  ></el-input>
                </el-form-item>
                <el-form-item label="研究成果领域">
                  <el-select
                    v-model="newresearch.tag"
                    placeholder="请选择研究成果对应领域"
                    multiple
                    style="width: 80%"
                  >
                    <el-option label="农业科学" value="农业科学"></el-option>
                    <el-option label="植物学" value="植物学"></el-option>
                    <el-option label="动物学" value="动物学"></el-option>
                    <el-option
                      label="生态与环境科学"
                      value="生态与环境科学"
                    ></el-option>
                    <el-option label="地球科学" value="地球科学"></el-option>
                    <el-option label="临床医学" value="临床医学"></el-option>
                    <el-option label="生物科学" value="生物科学"></el-option>
                    <el-option
                      label="化学与材料科学"
                      value="化学与材料科学"
                    ></el-option>
                    <el-option label="物理学" value="物理学"></el-option>
                    <el-option
                      label="天文学与天体物理学"
                      value="天文学与天体物理学"
                    ></el-option>
                    <el-option label="数学" value="数学"></el-option>
                    <el-option label="信息科学" value="信息科学"></el-option>
                    <el-option label="经济学" value="经济学"></el-option>
                    <el-option label="心理学" value="心理学"></el-option>
                    <el-option
                      label="其他社会科学"
                      value="其他社会科学"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="研究成果类型">
                  <el-select
                    v-model="newresearchType"
                    placeholder="请选择研究成果类型"
                    style="width: 80%"
                  >
                    <el-option label="会议论文" value="会议论文"></el-option>
                    <el-option label="期刊论文" value="期刊论文"></el-option>
                    <el-option label="技术报告" value="技术报告"></el-option>
                    <el-option label="书" value="书"></el-option>
                    <el-option label="专利" value="专利"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="研究成果标签">
                  <div style="width: 80%">
                    <el-tag
                      :key="tag"
                      v-for="tag in newresearch.researchTags"
                      closable
                      :disable-transitions="false"
                      @close="handleRemoveTags(tag)"
                      style="margin-right: 5px"
                    >
                      {{ tag }}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="TaginputVisible"
                      v-model="TaginputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                      style="width: 25%"
                    >
                    </el-input>
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInputTag"
                    >+ 添加新标签</el-button
                    >
                  </div>
                </el-form-item>
                <el-form-item label="研究成果摘要">
                  <el-input
                    v-model="newresearch.abstract"
                    :autosize="{ minRows: 4, maxRows: 7 }"
                    type="textarea"
                    placeholder="输入研究成果摘要"
                    style="width: 80%"
                  />
                </el-form-item>
                <el-form-item
                  label="期刊信息"
                  v-model="newresearch.type"
                  v-if="newresearchType === '期刊论文'"
                >
                  <el-input
                    v-model="newresearch.piriodicalName"
                    placeholder="期刊名称"
                    style="width: 80%; margin-bottom: 5px"
                  ></el-input>
                  <el-input-number
                    v-model="newresearch.piriodicalPeriod"
                    placeholder="期数"
                    style="width: 20%"
                    :controls="false"
                    :min="1"
                  ></el-input-number>
                  <el-input-number
                    v-model="newresearch.piriodicalVolume"
                    placeholder="卷数"
                    style="width: 20%"
                    :controls="false"
                    :min="1"
                  ></el-input-number>
                  <el-input
                    v-model="newresearch.piriodicalPages"
                    placeholder="所在页数"
                    style="width: 30%"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="会议信息"
                  v-model="newresearch.type"
                  v-if="newresearchType === '会议论文'"
                >
                  <el-input
                    v-model="newresearch.conferenceName"
                    placeholder="会议名称"
                    style="width: 80%; margin-bottom: 5px"
                  ></el-input>
                  <el-date-picker
                    v-model="newresearch.conferenceTime"
                    type="date"
                    placeholder="会议时间"
                    style="width: 80%"
                  />
                </el-form-item>
                <el-form-item label="选择发表时间">
                  <el-date-picker
                    v-model="newresearch.public_time"
                    type="date"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editvisible = false">取 消</el-button>
        <el-button @click="uploadandadd">确 定</el-button>
      </span>
    </el-dialog>
    <el-row :gutter="20">
      <!--左侧导航栏-->
      <el-col :span="8" class="zcx_col">
        <!--新增项目按钮-->
        <el-row :gutter="20" v-if="uID === realuID">
          <el-button
            style=" width: 93%;margin-top: 10px;margin-bottom:20px;font-size: large"
            type="primary"
            class="new_btn"
            @click="createUpload()"
            icon="el-icon-circle-plus"
            size="medium"
          >
            上传科研成果</el-button
          >
        </el-row>
        <el-menu
          :default-active="this.$route.path"
          router
          v-if="uID === realuID"
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
              >
                <div>
                  {{ item.navItem }}
                </div>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-menu
          :default-active="this.$route.path"
          router
          v-if="uID !== realuID"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>研究</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item, i) in navList2"
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
      <!--右侧研究列表-->

      <el-col :span="16">

        <!--      项目列表主体-->
        <el-row :gutter="20">
          <div v-for="(research, index) in AllresearchList" :key="index">
            <el-card>
              <el-row class="info_row">
                <b @click="info(research)">{{ research.name }}</b>
              </el-row>
              <el-row class="info_row0" type="flex" style="align-items: center">
                <p style="font-size: 13px">类型&nbsp;</p>
                <el-tag size="medium" type="success" style="margin: 0 3px">{{
                    showtype[research.type - 1]
                  }}</el-tag>
              </el-row>
              <el-row class="info_row0" type="flex" style="align-items: center">
                <p style="font-size: 13px">领域&nbsp;</p>
                <div v-for="(s, index2) in research.tag" :key="index2">
                  <el-tag size="medium" type="warning" style="margin: 0 3px">{{
                      s
                    }}</el-tag>
                </div>
              </el-row>
              <el-row type="flex" style="align-items: center">
                <i class="el-icon-user-solid"></i>
                <p
                  class="info_row"
                  v-for="(a, index3) in research.authors"
                  :key="index3"
                  style="margin: 0 8px; font-size: 15px"
                  @click="authorIfo(a.uID)"
                >
                  {{ a.uName }}.
                </p>
              </el-row>
              <el-row
                type="flex"
                style="align-items: center"
                v-show="uID === realuID && research.uploadUid === uID"
              >
                <el-col :span="6" :offset="19">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="edit(research)"
                    circle
                    plain
                    size="small"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    plain
                    @click="deleteResearch(research.aid)"
                    size="small"
                  ></el-button>
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
import { ref } from "vue";
export default {
  name: "Project",
  data() {
    return {
      navList: [
        // { name: "/Myupload", navItem: "我的研究" },
        // { name: "/Claim", navItem: "认领我的研究" },
        { name: "/ResearchList", navItem: "我的成果" },
      ],
      navList2: [
        // { name: "/Myupload", navItem: "TA的研究" },
        { name: "/ResearchList", navItem: "TA的成果" },
      ],
      showtype: ["会议论文", "期刊论文", "技术报告", "书", "专利"],
      editResearchId: "", // 编辑的科研成果的id
      newresearchType: "",
      researchList: [], // 当前科研成果的信息
      uploadFile: ref(),
      searchName: "", //搜索作者的关键词
      TaginputVisible: false,
      TaginputValue: "",
      researchTags: [], // 研究成果标签
      showAuthorResearchResult: false,
      haveFile: false,
      authorSearchResult: [
        {
          uID: "5",
          avatorUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //用户头像
          uName: "zhizhi5", // 用户名称
          Institution: "beihang University", // 用户所属机构
          uEmail: "11221@qq.com", // 用户邮箱
        },
      ], // 搜索作者结果

      changeIfo: false, // 是否是修改成果信息

      userInform: {
        // 当前用户个人信息
        uID: "",
        avatorUrl: "",
        uEmail: "",
        uName: "",
        Institution: "",
      },

      uID: "1",
      realuID: "1",
      edittitle: "编辑科研成果信息",
      editvisible: false,
      AllresearchList: [
        {
          aid: "1", // 研究成果id
          abstract: "", // 研究成果摘要
          piriodicalName: "", // 论文所属期刊名称
          piriodicalPeriod: ref(), // 论文所属期刊期数
          piriodicalVolume: ref(), // 论文所属期刊卷数
          piriodicalPages: "", // 期刊页数
          conferenceTime: "", // 会议时间
          conferenceName: "", // 会议名称
          tag: ["人文", "生命科学"],
          name: "nxusia jsaiodk xjaskhdu jdoaisdsm xaskdau",
          type: "期刊论文",
          researchTags: [], // 研究成果标签
          uploadUid: "1", // 上传作者的id
          // 作者列表
          authors: [
            {
              uID: "1",
              avatorUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //用户头像
              uName: "zhizhi1", // 用户名称
              Institution: "beihang University", // 用户所属机构
              uEmail: "11221@qq.com", // 用户邮箱
            },
            {
              uID: "2",
              avatorUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //用户头像
              uName: "zhizhi2", // 用户名称
              Institution: "beihang University", // 用户所属机构
              uEmail: "11221@qq.com", // 用户邮箱
            },
            {
              uID: "3",
              avatorUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //用户头像
              uName: "zhizhi3", // 用户名称
              Institution: "beihang University", // 用户所属机构
              uEmail: "11221@qq.com", // 用户邮箱
            },
          ],
          public_time: "2022-04-27",
        },
      ],
      newresearch: {
        abstract: "", // 研究成果摘要
        piriodicalName: "", // 论文所属期刊名称
        piriodicalPeriod: ref(), // 论文所属期刊期数
        piriodicalVolume: ref(), // 论文所属期刊卷数
        piriodicalPages: "", // 期刊页数
        conferenceTime: "", // 会议时间
        conferenceName: "", // 会议名称
        tag: [],
        name: "",
        type: "",
        researchTags: [], // 研究成果标签
        uploadUid: "", // 上传作者的id
        // 作者列表
        authors: [],
        public_time: "",
      },
      reserchinit: {
        abstract: "", // 研究成果摘要
        piriodicalName: "", // 论文所属期刊名称
        piriodicalPeriod: ref(), // 论文所属期刊期数
        piriodicalVolume: ref(), // 论文所属期刊卷数
        piriodicalPages: "", // 期刊页数
        conferenceTime: "", // 会议时间
        conferenceName: "", // 会议名称
        tag: [],
        name: "",
        type: "",
        researchTags: [], // 研究成果标签
        uploadUid: "", // 上传作者的id
        // 作者列表
        authors: [],
        public_time: "",
      },
    };
  },
  watch: {
    searchName: function (val) {
      this.showAuthorResearchResult = false;
    },
    newresearchType: function (val) {
      if (val === "会议论文") {
        this.newresearch.type = 1;
      } else if (val === "期刊论文") {
        this.newresearch.type = 2;
      } else if (val === "技术报告") {
        this.newresearch.type = 3;
      } else if (val === "书") {
        this.newresearch.type = 4;
      } else {
        this.newresearch.type = 5;
      }
    },
  },
  methods: {
    info(research) {
      //this.$message.success(p.name);
      //跳转到论文详情页面
      let codeUrl = "/" + research.aid;
      this.$router.push({
        path: codeUrl,
      });
    },
    authorIfo(visituID) {
      //跳转到用户页面
      window.sessionStorage.setItem("uID", visituID);
      this.$router.push({ path: "/Introduce" });
    },
    createUpload() {
      this.changeIfo = false;
      this.newresearch = JSON.parse(JSON.stringify(this.reserchinit));
      this.edittitle = "上传科研成果";
      this.newresearch.authors.push(this.userInform);
      //console.log(this.newresearch);
      this.haveFile = false;
      this.researchList = [];
      this.uploadFile = ref();
      this.editvisible = true;
      this.newresearchType = "";
      this.searchName = "";
    },
    edit(research) {
      this.changeIfo = true;
      // 更新dialog显示的信息
      //console.log(research);
      this.newresearch = JSON.parse(JSON.stringify(research));
      console.log(this.newresearch);
      this.haveFile = false;
      this.researchList = [];
      this.uploadFile = ref();
      this.editResearchId = research.aid;
      this.edittitle = "编辑科研成果信息";
      this.newresearchType = this.showtype[research.type - 1];
      this.searchName = "";
      this.editvisible = true;
    },
    // 上传、修改研究成果
    uploadandadd() {
      // 信息检查
      if (this.newresearch.name === "") {
        this.$message({
          message: "研究成果名称不能为空",
          type: "warning",
        });
        return;
      }
      if (this.newresearch.tag.length == 0) {
        this.$message({
          message: "请选择研究成果领域",
          type: "warning",
        });
        return;
      }
      if (this.newresearch.type === "") {
        this.$message({
          message: "请选择研究成果类型",
          type: "warning",
        });
        return;
      }
      if (this.newresearch.researchTags.length == 0) {
        this.$message({
          message: "请为该研究成果添加至少一个标签",
          type: "warning",
        });
        return;
      }
      if (this.newresearch.abstract === "") {
        this.$message({
          message: "请输入研究成果摘要",
          type: "warning",
        });
        return;
      }
      if (this.newresearch.type === "1") {
        if (this.newresearch.conferenceName === "") {
          this.$message({
            message: "请输入会议名称",
            type: "warning",
          });
          return;
        }
        if (this.newresearch.conferenceTime === "") {
          this.$message({
            message: "请选择会议时间",
            type: "warning",
          });
          return;
        }
      }
      if (this.newresearch.type === "2") {
        if (this.newresearch.piriodicalName === "") {
          this.$message({
            message: "请输入期刊名称",
            type: "warning",
          });
          return;
        }
        if (!this.newresearch.piriodicalPeriod) {
          this.$message({
            message: "请输入有效期数",
            type: "warning",
          });
          return;
        }
        if (!this.newresearch.piriodicalVolume) {
          this.$message({
            message: "请输入有效卷数",
            type: "warning",
          });
          return;
        }
        if (this.newresearch.piriodicalPages === "") {
          this.$message({
            message: "请输入所在页数",
            type: "warning",
          });
          return;
        }
      } else {
        this.newresearch.piriodicalPeriod = 0;
        this.newresearch.piriodicalVolume = 0;
      }
      if (!this.newresearch.public_time) {
        this.$message({
          message: "请输入研究成果发表时间",
          type: "warning",
        });
        return;
      }
      /*this.$message({
        message: "good",
        type: "success",
      });*/
      console.log("hahahah");
      console.log(this.newresearch);
      if (this.changeIfo) {
        this.editresearch();
      } else {
        this.addnewresearch();
      }
    },
    addnewresearch() {
      this.newresearch.uploadUid = this.uID;
      //console.log("havefile:" + this.haveFile);
      //console.log("newresearc:");
      //console.log(this.newresearch);
      //console.log("file:");
      //console.log(this.uploadFile);
      this.$http
        .post(
          "/research/upload/",
          JSON.stringify({
            newresearchIfo: this.newresearch,
          })
        )
        .then((res) => {
          //console.log(res);
          if (res.data.success === true) {
            // 传文件
            //console.log(res.data.aid);
            if (this.haveFile) {
              let formdata = new FormData();
              formdata.append("aid", res.data.aid);
              formdata.append("file", this.uploadFile);
              this.$http.post("/research/putfile/", formdata).then((back) => {
                if (back.data.success === true) {
                  this.$message({
                    message: "新增研究成果成功",
                    showClose: true,
                    type: "success",
                  });
                  this.editvisible = false;
                  setTimeout(() => {
                    this.getAllResearch();
                  }, 1000);
                } else {
                  this.$message({
                    message: back.data.message,
                    showClose: true,
                    type: "error",
                  });
                  /*setTimeout(() => {
                    this.deleteResearch(res.data.aid);
                  }, 500);*/
                }
              });
            } else {
              this.$message({
                message: "新增研究成果成功",
                showClose: true,
                type: "success",
              });
              this.editvisible = false;
              setTimeout(() => {
                this.getAllResearch();
              }, 1000);
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    editresearch() {
      this.newresearch.uploadUid = this.uID;
      //(this.newresearch);
      this.$http
        .post(
          "/research/changeIfo/",
          JSON.stringify({
            aid: this.editResearchId,
            researchIfo: this.newresearch,
          })
        )
        .then((res) => {
          //console.log(res);
          if (res.data.success === true) {
            if (this.haveFile) {
              let formdata = new FormData();
              formdata.append("aid", this.editResearchId);
              formdata.append("file", this.uploadFile);
              this.$http.post("/research/putfile/", formdata).then((back) => {
                if (back.data.success === true) {
                  this.$message({
                    message: "修改研究成果成功",
                    showClose: true,
                    type: "success",
                  });
                  this.editvisible = false;
                  setTimeout(() => {
                    this.getAllResearch();
                  }, 1000);
                } else {
                  this.$message({
                    message: back.data.message,
                    showClose: true,
                    type: "error",
                  });
                  /*setTimeout(() => {
                    this.deleteResearch(res.data.aid);
                  }, 500);*/
                }
              });
            } else {
              this.$message({
                message: "修改研究成果成功",
                showClose: true,
                type: "success",
              });
              this.editvisible = false;
              setTimeout(() => {
                this.getAllResearch();
              }, 1000);
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 搜索作者
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
      for (var uid in this.newresearch.authors) {
        //console.log(uid);
        if (
          this.newresearch.authors[uid].uID ==
          this.authorSearchResult[author].uID
        ) {
          this.$message({
            message: "请勿重复添加该用户",
            type: "warning",
          });
          return;
        }
      }
      this.newresearch.authors.push(this.authorSearchResult[author]);
      //console.log(this.newresearch.authors);
      //console.log(this.authorsInfo);
      this.$message({
        message: "成功添加作者",
        type: "success",
      });
    },
    // 添加标签相关函数
    showInputTag() {
      this.TaginputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.TaginputValue;
      if (inputValue) {
        this.newresearch.researchTags.push(inputValue);
      }
      this.TaginputVisible = false;
      this.TaginputValue = "";
    },
    handleRemoveTags(tag) {
      this.newresearch.researchTags.splice(
        this.newresearch.researchTags.indexOf(tag),
        1
      );
    },
    deleteAuthor(author) {
      //console.log(this.uID);
      //console.log(this.newresearch.authors[author]);
      if (this.uID == this.newresearch.authors[author].uID) {
        this.$message({
          message: "当前用户需在作者列表中",
          type: "warning",
        });
        return;
      }
      // 删除作者列表里的成员
      this.newresearch.authors.splice(author, 1);
      // console.log(this.newresearch.authors)
      this.$message({
        message: "成功删除该作者",
        type: "success",
      });
    },
    // 上传文件数量限制
    beforeUpload(rawFile, list) {
      //console.log(this.researchList);
      if (list.length > 1) {
        this.researchList = [];
        this.researchList.push(list[list.length - 1]);
      }
      this.uploadFile = rawFile.raw;
      this.haveFile = true;
      //console.log(this.uploadFile);
    },
    remove() {
      this.haveFile = false;
    },
    // 清除已上传文件
    deleteAllUploadFile() {
      this.$http
        .post(
          "/research/deletefile/",
          JSON.stringify({ uid: this.uID, aid: this.editResearchId })
        )
        .then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: "已清除所有上传文件",
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        });
    },
    // 删除科研成果
    deleteResearch(aid) {
      //console.log("要删除的aid：" + aid);
      this.$http
        .post(
          "/research/deleteResearch/",
          JSON.stringify({ uid: this.uID, aid: aid })
        )
        .then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: "成功删除该研究成果",
              type: "success",
            });
            setTimeout(() => {
              this.getAllResearch();
            }, 500);
            //this.getAllResearch();
            //location.reload();
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        });
    },
    // 获取所有的研究成果列表
    getAllResearch() {
      //console.log("get research" + this.uID);
      this.AllresearchList = [];
      this.$http
        .post("/research/getAllList/", JSON.stringify({ uId: this.uID }))
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            this.AllresearchList = res.data.AllresearchList;
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        });
    },
  },
  mounted() {
    //this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
    //this.realuID = JSON.parse(window.sessionStorage.getItem("realuID"));
    //获取所有学科subjects
    // if (location.href.indexOf("#reloaded")<=0) {
    //   location.href = location.href + "#reloaded"+"#reloaded";
    //   location.reload();
    // }
  },
  created() {
    this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
    this.realuID = JSON.parse(window.sessionStorage.getItem("realuID"));
    this.getAllResearch();
    this.$http
      .post("/user/get/userInfo", JSON.stringify({ uID: this.uID }))
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
          //this.userInform = res.data.userInform;
          this.userInform.avatorUrl = res.data.userInform.avatorUrl;
          this.userInform.uName = res.data.userInform.uName;
          this.userInform.uEmail = res.data.userInform.uEmail;
          this.userInform.Institution = res.data.userInform.uInstitution;
          this.userInform.uID = this.uID;
          //console.log(res.data);
        }
      });
  },
};
</script>

<style Lang="less" scoped>
.main-box {
  margin: 0 auto;
  width: 80%;
}

.zcx_col {
  padding-top: 20px;
  padding-left: 20px;
  width: 25%;
}

.info_row {
  margin-bottom: 10px;
  flex-wrap: wrap;
  font-size: 18px;
  text-align: left;
}
.info_row:hover {
  text-decoration: underline;
  cursor: pointer;
}
.info_row0 {
  margin-bottom: 10px;
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
.new_btn {
  width: 93%;
  margin-top: 20px;
  font-size: 15px;
  //height: 40px;
}
</style>
