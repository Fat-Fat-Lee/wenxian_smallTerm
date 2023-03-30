<template>
  <div>
    <div class="main-box">
      <!-- 新增研究的框框-->
      <el-dialog
        title="新增科研成果"
        :visible.sync="newresearchvisible"
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
                  <el-form-item
                    label-width="0"
                    v-show="showAuthorResearchResult"
                  >
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
                            <el-avatar
                              size="small"
                              :src="scope.row.avatorUrl"
                            />
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
                      :data="authorsInfo"
                      style="width: 90%"
                      :show-header="false"
                      max-height="250"
                    >
                      <el-table-column prop="avt" label="1" width="50">
                        <template #default="scope">
                          <div style="display: flex; align-items: center">
                            <el-avatar
                              size="small"
                              :src="scope.row.avatorUrl"
                            />
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
                      <el-button slot="trigger" size="medium" type="primary"
                      >选取文件</el-button
                      >
                      <div slot="tip" class="el-upload__tip">
                        只能上传一个文件
                      </div>
                    </el-upload>
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
                      style="width: 80%"
                    >
                      <el-option label="科学" value="science"></el-option>
                      <el-option label="人文" value="social"></el-option>
                      <el-option label="第三个领域" value="third"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="研究成果类型">
                    <el-select
                      v-model="newresearch.type"
                      placeholder="请选择研究成果类型"
                      style="width: 80%"
                    >
                      <el-option
                        label="会议论文"
                        value="conference"
                      ></el-option>
                      <el-option
                        label="期刊论文"
                        value="periodical"
                      ></el-option>
                      <el-option label="技术报告" value="technical"></el-option>
                      <el-option label="书" value="book"></el-option>
                      <el-option label="专利" value="patent"></el-option>
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
                    v-if="newresearch.type === 'periodical'"
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
                    ></el-input-number>
                    <el-input-number
                      v-model="newresearch.piriodicalVolume"
                      placeholder="卷数"
                      style="width: 20%"
                      :controls="false"
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
                    v-if="newresearch.type === 'conference'"
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
          <el-button @click="newresearchvisible = false">取 消</el-button>
          <el-button @click="uploadandadd">确 定</el-button>
        </span>
      </el-dialog>
      <!--研究页面主要内容-->
      <el-row :gutter="20">
        <!--左侧导航栏-->
        <el-col :span="8" class="zcx_col">
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
          <div style="margin: 10px">
            <el-input
              placeholder="请按照文献名检索"
              v-model="queryInfo.query"
              clearable
              style="width: 90%"
              @click="freshList"
            ></el-input>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="freshList"
            ></el-button>
            <el-radio-group
              style="margin: 8px; padding: 5px"
              v-model="queryInfo.qsort"
              @change="freshList"
            >
              <el-radio :label="10">文献发表时间降序</el-radio>
              <el-radio :label="11">文献发表时间升序</el-radio>
            </el-radio-group>
          </div>
          <div v-for="(r, index) in researchlist" :key="index">
            <el-card class="zcx_card">
              <el-col>
                <el-row class="info_row">
                  <b @click="info(r)">{{ r.name }}</b>
                </el-row>
                <el-row class="info_row0" type="flex">
                  <!--                    <el-tag type="success" size="medium" style="margin: 0 3px">{{r.type}}</el-tag>-->
                  <el-tag type="success" size="medium" style="margin: 0 3px">{{
                      r.tag
                    }}</el-tag>
                  <div v-for="(s, index2) in r.subjects" :key="index2">
                    <el-tag
                      size="medium"
                      type="warning"
                      style="margin: 0 3px"
                    >{{ s }}</el-tag
                    >
                  </div>
                </el-row>
                <el-row class="info_row0" style="color: #696969">
                  <i class="el-icon-date"></i>
                  {{ r.public_time }}
                </el-row>
                <el-row class="info_row1" style="color: #696969" type="flex">
                  <i class="el-icon-user-solid"></i>
                  <div
                    v-for="(a, index3) in r.author"
                    :key="index3"
                    style="margin: 0 8px"
                  >
                    {{ a }}.
                  </div>
                </el-row>
                <el-row class="info_row2">
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click="download_(r)"
                    style="margin: 10px 0"
                  >下载文件
                  </el-button>
                </el-row>
              </el-col>
              <!--              <el-col :span="4">-->
              <!--                <div style="margin:0 auto 0 auto;width:100px;height:100px" class="zcx_pic"><img :src=r.pic alt="" @click=info(r)></div>-->
              <!--              </el-col>-->
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Myupload",
  data() {
    return {
      researchList: [],
      uploadFile: ref(),
      searchName: "", //搜索作者的关键词
      TaginputVisible: false,
      TaginputValue: "",
      researchTags: [], // 研究成果标签
      showAuthorResearchResult: false,
      haveFile: false,
      authorsInfo: [
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

      uID: "1",
      realuID: "1",
      codeUrl: "",
      queryInfo: {
        type: 0,
        query: "", //搜索关键字
        qsort: 10, //记录排序参数，默认按上传时间降序,11是上传时间升序
        value: 1,
      },
      researchlist: [
        // {aID:"1",name:"Electroencephalogram-Based Preference Prediction Using Deep Transfer Learning",author:["zcx","ljw"],public_time:"2021-10-25",pic: require("../assets/CSS/defaultpage.png"),tag:"CS",subjects:["s1","s2"],download_url:""},
        // {aID:"2",name:"Product Recommendation in Case-based Reasoning",author:["ljw","zcx"],public_time:"2021-10-24test",pic: require("../assets/CSS/defaultpage.png"),tag:"SE",subjects:["s3","s4"],download_url:""},
      ],
      newresearchvisible: false,
      tabName: "2",
      newresearch: {
        abstract: "", // 研究成果摘要
        piriodicalName: "", // 论文所属期刊名称
        piriodicalPeriod: ref(), // 论文所属期刊期数
        piriodicalVolume: ref(), // 论文所属期刊卷数
        piriodicalPages: "", // 期刊页数
        conferenceTime: "", // 会议时间
        conferenceName: "", // 会议名称
        tag: "",
        name: "",
        type: "",
        researchTags: [], // 研究成果标签
        // 作者列表
        authors: ["1", "2", "3"],
        public_time: "",
      },
      navList: [
        { name: "/Myupload", navItem: "我的研究" },
        { name: "/Claim", navItem: "认领我的研究" },
        { name: "/ResearchList", navItem: "我的成果" },
      ],
      navList2: [
        { name: "/Myupload", navItem: "TA的研究" },
        { name: "/ResearchList", navItem: "TA的成果" },
      ],
      descriptVisible: false,
      subjectVisible: false,
      skillVisible: false,
      instiVisible: false,
      userInform: {
        uID: "",
        uName: "李静雯",
        uDescription: "",
        uDegree: [
          { uDegreeID: "1", uDegreeName: "bachelor of technology" },
          { uDegreeID: "2", uDegreeName: "bachelor of science" },
        ],
        uInstitution: "",
        uDepartment: "SoftWare College",
        uCharacter: "董事长",
        uSubject: [
          { uSubjectID: "1", uSubjectName: "SoftWare" },
          { uSubjectID: "2", uSubjectName: "Computer Science" },
        ],
        uSkill: [
          { uSkillID: "1", uSkillName: "C language" },
          { uSkillID: "2", uSkillName: "Java" },
          { uSkillID: "3", uSkillName: "Vue" },
        ],
        uRecommand: [
          {
            uID: "1",
            uName: "AAA",
            uNumFollow: 12,
            avatorUrl:
              "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            uDescription: "",
            uDegree: [
              { uDegreeID: "1", uDegreeName: "bachelor of technology" },
              { uDegreeID: "2", uDegreeName: "bachelor of science" },
            ],
            uInstitution: "",
            uDepartment: "SoftWare College",
            uSkill: [
              { uSkillID: "1", uSkillName: "C language" },
              { uSkillID: "2", uSkillName: "Java" },
              { uSkillID: "3", uSkillName: "Vue" },
            ],
          },
          {
            uID: "2",
            uName: "CHJK",
            uNumFollow: 90,
            avatorUrl:
              "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            uDescription: "",
            uDegree: [
              { uDegreeID: "1", uDegreeName: "bachelor of technology" },
              { uDegreeID: "2", uDegreeName: "bachelor of science" },
            ],
            uInstitution: "",
            uDepartment: "SoftWare College",
            uSkill: [
              { uSkillID: "1", uSkillName: "C language" },
              { uSkillID: "2", uSkillName: "Java" },
              { uSkillID: "3", uSkillName: "Vue" },
            ],
          },
          {
            uID: "3",
            uName: "PLP",
            uNumFollow: 1700,
            avatorUrl:
              "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            uDescription: "",
            uDegree: [
              { uDegreeID: "1", uDegreeName: "bachelor of technology" },
              { uDegreeID: "2", uDegreeName: "bachelor of science" },
            ],
            uInstitution: "",
            uDepartment: "SoftWare College",
            uSkill: [
              { uSkillID: "1", uSkillName: "C language" },
              { uSkillID: "2", uSkillName: "Java" },
              { uSkillID: "3", uSkillName: "Vue" },
            ],
          },
        ],

        avatorUrl:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
    };
  },
  watch: {
    searchName: function (val) {
      this.showAuthorResearchResult = false;
    },
  },
  mounted() {
    //顶子刷新依然金色
    if (this.$route.path === "/Myupload") {
      const tmpA = document.getElementById("Passage");
      const tmpB = document.getElementById("Welcome");
      const tmpC = document.getElementById("User");
      const tmpD = document.getElementById("Super");
      tmpA.style.color = "white";
      tmpB.style.color = "white";
      tmpC.style.color = "gold";
      tmpD.style.color = "white";
    }
    if (this.$route.path === "/Myupload") {
      const tmp0 = document.getElementById("Introduce");
      const tmp1 = document.getElementById("Myupload");
      const tmp2 = document.getElementById("Statistics");
      const tmp3 = document.getElementById("Collect");
      const tmp4 = document.getElementById("Follow");
      tmp0.style.color = "grey";
      tmp1.style.color = "#1E9992";
      tmp2.style.color = "grey";
      tmp3.style.color = "grey";
      tmp4.style.color = "grey";
    }
  },
  methods: {
    addresearch() {
      this.newresearchvisible = true;
    },
    uploadandadd() {
      // 信息检查
      if (this.newresearch.name === "") {
        this.$message({
          message: "研究成果名称不能为空",
          type: "warning",
        });
        return;
      }
      if (this.newresearch.tag === "") {
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
      if (this.newresearch.type === "conference") {
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
      if (this.newresearch.type === "periodical") {
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
      }
      if (!this.newresearch.public_time) {
        this.$message({
          message: "请输入研究成果发表时间",
          type: "warning",
        });
        return;
      }
      if (!this.haveFile) {
        this.$message({
          message: "请上传研究成果文件",
          type: "warning",
        });
        return;
      }
      this.$message({
        message: "good",
        type: "success",
      });
      // this.addnewresearch();
    },
    async addnewresearch() {
      await new Promise((resolve) => {
        this.$http
          .post(
            "/research/upload",
            JSON.stringify({
              newresearchIfo: this.newresearch,
              newresearchContent: this.uploadFile,
            })
          )
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              this.$message.error("新增研究成果失败");
              return console.log(res.data.message);
            }
            this.$message({
              message: "新增研究成果成功",
              showClose: true,
              type: "success",
            });
          });
        resolve();
      });
    },
    tabclick(tab, event) {
      if (tab.name === "1") {
        this.$router.push({ path: "/3" });
      }
      if (tab.name === "4") {
        this.$router.push({ path: "/Collect" });
      }
    },
    info(r) {
      console.log("++++++++++++++++++++++++++");
      console.log(r.aID);
      this.jumpPassage(r.aID);
    },

    jumpPassage(rID) {
      //this.codeUrl='/Passage'+'?rID='+rID
      this.codeUrl = "/" + rID;
      this.$router.push({ path: this.codeUrl });
    },
    download_(r) {
      this.download(r);
      this.add(r);
    },

    add(r) {
      new Promise((resolve) => {
        this.$http
          .post(
            "/add/statistic/number",
            JSON.stringify({ aID: r.aID, action: 1 })
          )
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              return console.log(res.data.message);
            }
            this.$message({
              message: "下载次数增加！",
              type: "success",
            });
          });
        resolve();
      });
    },

    download(r) {
      let searchInfo = {};
      searchInfo.aID = r.aID;
      searchInfo.download_url = r.download_url;
      this.$http
        .post("/articleDownload/", JSON.stringify({ searchInfo }))
        .then((res) => {
          if (res.data.success === false) {
            this.$message.error("下载失败");
            return;
          }
          const data = res.data.data;

          const fileName = r.name + ".pdf";
          const url = window.URL.createObjectURL(this.dataURLtoBlob(data));

          console.log(url);
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
            type: "success",
          });
          // this.downloads++; 当前页面下载量的更新
        });
    },

    dataURLtoBlob(dataurl) {
      var bstr = atob(dataurl);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: "application/octet-stream" });
    },
    avatarclick() {
      //修改用户头像
      this.$message({
        message: "可以开始修改头像",
        type: "success",
      });
    },
    async freshList() {
      let uID;
      uID = this.uID;
      let value;
      value = 1;
      let queryInfo;
      queryInfo = this.queryInfo;
      await new Promise((resolve) => {
        this.$http
          .post(
            "/queryMyLiterature/",
            JSON.stringify({ queryInfo, uID, value })
          )
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
          .post("/getResearchList/", JSON.stringify({ uID }))
          .then((res) => {
            console.log(res);
            if (res.data.success !== true) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            }
            console.log(res.data);
            this.researchlist = res.data.data.researchlist;
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
    // 搜索作者
    searchAuthor() {
      console.log("搜索作者名：" + this.searchName);
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
        console.log(uid);
        if (
          this.newresearch.authors[uid] === this.authorSearchResult[author].uID
        ) {
          this.$message({
            message: "请勿重复添加该用户",
            type: "warning",
          });
          return;
        }
      }
      this.newresearch.authors.push(this.authorSearchResult[author].uID);
      this.authorsInfo.push(this.authorSearchResult[author]);
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
      console.log(this.uID);
      console.log(this.newresearch.authors[author]);
      if (this.uID === this.newresearch.authors[author]) {
        this.$message({
          message: "当前用户需在作者列表中",
          type: "warning",
        });
        return;
      }
      // 删除作者列表里的成员
      this.newresearch.authors.splice(author, 1);
      // console.log(this.newresearch.authors)
      this.authorsInfo.splice(author, 1);
      this.$message({
        message: "成功删除该作者",
        type: "success",
      });
    },
    // 上传文件数量限制
    beforeUpload(rawFile, list) {
      console.log(this.researchList);
      if (list.length > 1) {
        this.researchList = [];
        this.researchList.push(list[list.length - 1]);
      }
      this.uploadFile = rawFile.raw;
      this.haveFile = true;
      console.log(this.uploadFile);
    },
    remove() {
      this.haveFile = false;
    },
  },
  created() {
    this.uID = JSON.parse(window.sessionStorage.getItem("uID"));
    this.realuID = JSON.parse(window.sessionStorage.getItem("realuID"));
    //调试中
    this.freshList();
  },
};
</script>

<style Lang="less" scoped>
.head-box {
  width: 100%;
  padding: 15px 15px 0px 15px;
  background-color: white;
}

.selfInform-box {
  margin: 0 auto;
  width: 60%;
  padding: 15px 15px 0px 15px;
  //background-color: red;
}

.el-button:hover {
  //background-color: #1E9992;
}

> .el-tabs__header {
  margin: 10px 0px 0px 0px !important;
}

> .el-tabs__item {
  font-size: 18px;
}

.main-box {
  margin: 0 auto;
  width: 80%;
}

.self-card {
  float: left;
  width: 100%;
}

.edit-button {
  float: right;
  padding: 3px 0;
  border: 0px !important;
  border-radius: 0px !important;
  background-color: transparent !important;
  color: gray !important;
}

.edit-button:hover {
  text-decoration: underline;
  background-color: transparent !important;
  color: lightseagreen !important;
}

> .el-card__header {
  border-bottom: 1px solid lightgray !important;
}

.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.zcx_col {
  padding-top: 20px;
  padding-left: 20px;
  width: 25%;
}

.zcx_row {
  width: 80%;
  gutter: 20;
}

.info_row {
  margin-bottom: 10px;
  //display: flex;
  flex-wrap: wrap;
  font-size: 20px;
}

.info_row:hover {
  text-decoration: underline;
  cursor: pointer;
}

.info_row0 {
  margin-bottom: 5px;
  gutter: 10;
  padding: 3px 0;
}

.info_row1 {
  margin-bottom: 35px;
  font-size: 17px;
}

.info_row2 {
  margin-bottom: 13px;
  font-size: 8px;
}

.zcx_card {
  //width:80%;
  text-align: left;
  margin: 10px;
  padding: 0px;
}

.zcx_card:hover {
  background-color: rgb(247, 247, 247);
  border: 1px solid #dadada;
  border-radius: 5px;
}

.zcx_table {
  text-align: center;
}

.time_col {
  margin-bottom: 0;
  font-size: 15px;
  align: middle;
  type: "flex";
}

.zcx_pic:hover {
  cursor: pointer;
}

.zcx_avatar:hover {
  cursor: pointer;
}
</style>
