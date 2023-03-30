<template>
  <div>

    <div class="main-box">
      <!--  个人概述-->
      <div>
        <el-row :gutter="20">
          <el-col :span="14">
            <!--          名片卡-->
            <el-card class="self-card">
              <!--        头部编辑框-->
              <div v-if="realuID===uID" slot="header" style="text-align:left; padding-bottom: 10px;">
                <el-button class="edit-button" @click="nameCardVisible=true">编辑 &nbsp<i class="el-icon-edit"></i></el-button>
              </div>
              <!--        个人名片功能介绍框-->
              <div style="text-align:left;">
                <span style="font-size: 16px;font-weight: bold;">个人名片</span>
                <div v-if="realuID===uID" style="font-size:12px;color:gray;font-style:italic;margin-top:20px;">
                  您的名片是您个人资料的简短摘要，可以向整个平台的其他人显示。确保它是最新的，以便其他人在发现您的卡片时可以轻松了解您。
                </div>
              </div>
              <!--        名片预览框-->
              <div class="clearfix" style="padding:20px;margin-top:20px; border: 1px solid lightgray;text-align: left;border-radius: 5px;">
                <div style="width:70%;float:left;">
                  <!--          用户名+学位-->
                  <div style="margin-bottom: 10px">
                    <div style="font-size: 18px;font-weight: bold;">{{this.userInform.uName}}</div>
                    <div v-if="userInform.lenDegree>=1" style="margin:5px;">
                    <span style="font-size: 14px;color:darkgray;" v-for="(item,index) in userInform.uDegree" v-if="index<3" >
                      {{item.uDegreeName}}.&nbsp&nbsp
                    </span>
                    <span style="font-size: 14px;color:darkgray;">等共{{this.userInform.lenDegree}}项学位</span>
                    </div>
                  </div>
                  <!--                  邮箱-->
                  <div  style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">邮箱</div>
                    <div>
                      {{this.userInform.uEmail}}
                    </div>

                  </div>
                  <!--                个人介绍-->
                  <div v-if="userInform.uDescription!==''" style="margin-bottom: 10px">
                    <div style="font-size: 16px;color:grey;font-style: italic;">{{this.userInform.uDescription}}</div>
                  </div>
                  <!--          机构和部门-->
                  <div v-if="userInform.uInstitution!==''" style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">机构和部门</div>
                    <div>
                      {{this.userInform.uInstitution}}-
                      {{this.userInform.uDepartment}}
                    </div>

                  </div>
                  <!--          技能-->
                  <div v-if="userInform.lenSkill>=1" style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:dimgray">技能</div>
                    <div>
                       <span v-for="(item,index) in userInform.uSkill" v-if="index<3" >{{item.uSkillName}}.&nbsp&nbsp</span>
                        <span style="font-size: 14px;color:darkgray;">等共{{this.userInform.lenSkill}}项技能</span>
                    </div>

                  </div>

                </div>
                <div style="float:right;">
                  <el-avatar :size="60" style="margin:5px;" :src="this.userInform.avatarUrl"></el-avatar>
                </div>

              </div>
            </el-card>
            <!--          学科技能卡-->
            <el-card class="self-card">
              <!--        头部编辑框-->
              <div slot="header" style="text-align:left; padding-bottom: 10px;">
                <div v-if="realuID===uID" style="float:left;font-size:16px;">介绍您的学科技能</div>
                <div v-else style="float:left;font-size:16px;">该作者的学科技能介绍</div>
                <el-button v-if="realuID===uID" class="edit-button" @click="ifEditSkill()">技能</el-button>
                <el-button v-if="realuID===uID" class="edit-button" @click="subjectCardVisible=true">学科</el-button>
              </div>
              <!--        关于我具体介绍框-->
              <div style="text-align: left">
                <!--              学科-->
                <div v-if="realuID===uID">
                  <div v-if="userInform.lenSubject>=1" style="margin-bottom: 20px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:black; font-size:16px;margin-bottom: 5px;">学科</div>
                    <div>
                      <span v-for="(item,index) in userInform.uSubject" v-if="index<5" :key="item.uDegreeID">{{item.uSubjectName}}.&nbsp&nbsp</span>
                      <span style="font-size: 14px;color:darkgray;">等共{{this.userInform.lenSubject}}项学科</span>

                    </div>

                  </div>
                  <div v-else style="border:1px dashed #1da099;margin-bottom: 10px;padding:10px">
                    <div style="font-size: 16px;font-weight:bold;">你目前专攻哪些学科？</div>
                    <div style="font-size: 14px;font-style: italic;">
                      可以在这里添加您现在正在集中研究或最为擅长的学科领域。
                      <el-button circle size="small" type="primary" plain icon="el-icon-plus" @click="subjectCardVisible=true"></el-button>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="userInform.lenSubject>=1" style="margin-bottom: 20px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:black; font-size:16px;margin-bottom: 5px;">学科</div>
                    <div>
                      <span v-for="(item,index) in userInform.uSubject" v-if="index<5" :key="item.uDegreeID">{{item.uSubjectName}}.&nbsp&nbsp</span>
                      <span style="font-size: 14px;color:darkgray;">等共{{this.userInform.lenSubject}}项学科</span>

                    </div>

                  </div>
                  <div v-else style="border:1px dashed #1da099;margin-bottom: 10px;padding:10px">
                    <div style="font-size: 16px;font-weight:bold;">该作者目前专攻哪些学科？</div>
                    <div style="font-size: 14px;font-style: italic;">
                      该作者尚未添加自己专攻的学科。
                    </div>
                  </div>
                </div>

                <!--              技能-->
                <div v-if="realuID===uID">
                  <div v-if="userInform.lenSkill>=1" style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:black; font-size:16px;margin-bottom: 5px;">技能</div>
                    <div>
                      <span v-for="(item,index) in userInform.uSkill" v-if="index<9" :key="item.uDegreeID">{{item.uSkillName}}.&nbsp&nbsp</span>
                      <span style="font-size: 14px;color:darkgray;">等共{{this.userInform.lenSkill}}项技能</span>
                    </div>

                  </div>
                  <div v-else style="border:1px dashed #1da099;margin-bottom: 20px;padding:10px">
                    <div style="font-size: 16px;font-weight:bold;">你目前掌握哪些专业技能？</div>
                    <div style="font-size: 14px;font-style: italic;">
                      可以在这里添加您掌握的专业技能，以计算机学科为例，可以添加C语言技能。
                      <el-button circle size="small" type="primary" plain icon="el-icon-plus" @click="ifEditSkill()"></el-button>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="userInform.lenSkill>=1" style="margin-bottom: 10px;font-size: 14px;color:gray;">
                    <div style="font-weight: bold;color:black; font-size:16px;margin-bottom: 5px;">技能</div>
                    <div>
                      <span v-for="(item,index) in userInform.uSkill" v-if="index<9" :key="item.uDegreeID">{{item.uSkillName}}.&nbsp&nbsp</span>
                      <span style="font-size: 14px;color:darkgray;">等共{{this.userInform.lenSkill}}项技能</span>
                    </div>

                  </div>
                  <div v-else style="border:1px dashed #1da099;margin-bottom: 20px;padding:10px">
                    <div style="font-size: 16px;font-weight:bold;">该作者目前掌握哪些专业技能？</div>
                    <div style="font-size: 14px;font-style: italic;">
                      该作者目前还没有添加自己掌握的专业技能。
                    </div>
                  </div>
                </div>

              </div>

            </el-card>
          </el-col>
          <el-col :span="10">
            <!--          隶属关系卡-->
            <el-card style="text-align: left;color:dimgray">
              <div slot="header" style="text-align:left; padding-bottom: 10px;">
                <div style="float:left;font-size:16px;">现隶属关系</div>
                <el-button v-if="realuID===uID" class="edit-button" @click="belongCardVisible = true">编辑 &nbsp<i class="el-icon-edit"></i></el-button>
              </div>

              <div v-if="userInform.uInstitution!==''">
                <div style="margin-bottom: 10px;">
                  <div style="font-weight: bold;font-size:14px;">机构</div>
                  <div style="font-size:14px;">{{this.userInform.uInstitution}}</div>
                </div>
                <div style="margin-bottom: 10px;">
                  <div style="font-weight: bold;font-size:14px;">部门</div>
                  <div style="font-size:14px;">{{this.userInform.uDepartment}}</div>
                </div>
                <div style="margin-bottom: 10px;">
                  <div style="font-weight: bold;font-size:14px;">角色</div>
                  <div style="font-size:14px;">{{this.userInform.uCharacter}}</div>
                </div>
              </div>
              <div v-else style="padding:15px;border:1px dashed #1da099;" @click="instiVisible=true">
                <div style="margin:0 auto 15px auto;width:40%;"><img src="../assets/CSS/Insti.png" alt=""></div>
                <div v-if="realuID===uID" style="font-size: 16px;font-weight:bold;text-align: center;">你目前在哪里工作？</div>
                <div v-else style="font-size: 16px;font-weight:bold;text-align: center;">该作者目前在哪里工作？</div>
                <div v-if="realuID===uID"  style="font-size: 14px;font-style: italic;margin-top:10px">可以在这里添加您目前所在的机构和部门。</div>
                <div v-else  style="font-size: 14px;font-style: italic;margin-top:10px">该作者还没添加目前所在的机构和部门。</div>

              </div>



            </el-card>
            <!--          推荐关注卡-->
            <el-card v-if="realuID===uID" style="text-align: left">
              <div slot="header" style="text-align:left; padding-bottom: 10px;">
                <div style="float:left;font-size:16px;">推荐您关注的人</div>
              </div>
              <div v-if="userInform.lenSkill!==0" style="font-size: 14px;font-style: italic;margin-bottom:20px;">他们和您的技能重叠度很高，可以考虑关注交流一下哦。</div>
              <div v-else style="font-size: 14px;font-style: italic;margin-bottom:20px;">他们在本网站很受关注，您可以了解一下哦。您添加了技能后我们会为您推荐技能相同的研究人员。会更适合您。</div>
              <div v-for="(item,index) in userInform.uRecommand"  :key="item.uID">
                <div class="clearfix" style="margin-bottom:20px;">
                  <div style="float:left;margin-right: 10px;">
                    <el-avatar :size="40" :src="item.avatarUrl"></el-avatar>
                  </div>
                  <div style="float:left;">
                    <el-tooltip placement="top-start">
                      <div slot="content"  class="clearfix" style="width:400px;padding:20px;margin-top:20px;text-align: left;">
                        <div style="width:70%;float:left;">
                          <!--          用户名+学位-->
                          <div style="margin-bottom: 10px">
                            <div style="font-size: 18px;font-weight: bold;">{{item.uName}}</div>
                            <div v-if="item.lenDegree>=1" style="margin:0;">
                            <span style="font-size: 14px;color:darkgray;" v-for="item_ in userInform.uDegree" v-if="index<3"  :key="item_.uDegreeID">
                            {{item_.uDegreeName}}
                            </span>
                            </div>
                          </div>
                          <!--                  邮箱-->
                          <div  style="margin-bottom: 10px;font-size: 14px;color:lightgrey;">
                            <div style="font-weight: bold;color:white;">邮箱</div>
                            <div>
                              {{item.uEmail}}
                            </div>

                          </div>
                          <!--                个人介绍-->
                          <div v-if="item.uDescription!==''" style="margin-bottom: 10px">
                            <div style="font-size: 16px;color:lightgrey;font-style: italic;">{{item.uDescription}}</div>
                          </div>
                          <!--          机构和部门-->
                          <div v-if="item.uInstitution!==''" style="margin-bottom: 10px;font-size: 14px;color:lightgrey">
                            <div style="font-weight: bold;color:white">机构和部门</div>
                            <div>
                              {{item.uInstitution}}-
                              {{item.uDepartment}}
                            </div>

                          </div>
                          <!--          技能-->
                          <div v-if="item.lenSkill>=1" style="margin-bottom: 10px;font-size: 14px;color:lightgray;">
                            <div style="font-weight: bold;color:white">技能</div>
                            <div>
                            <span v-for="(item_,index) in userInform.uSkill" v-if="index<3" :key="item_.uSkillID">
                             {{item_.uSkillName}}.
                            </span>等
                            </div>

                          </div>
                        </div>
                        <div style="float:right;">
                          <el-avatar :size="60" style="margin:5px;" :src="item.avatarUrl"></el-avatar>
                        </div>

                      </div>
                      <div style="font-size: 16px;font-weight: bold;">
                        <el-button class="claim_btn" type="text" @click="jumpUser(item.uID)">{{item.uName}}</el-button>
                      </div>
                    </el-tooltip>

                    <div style="font-size: 14px;font-style: italic">有{{item.uNumFollow}}位用户关注了他</div>
                  </div>
                  <el-button style="float:right; margin-top:15px;" type="primary" plain size="mini" @click="followRecommand(item.uID)">关注</el-button>

                </div>

              </div>
            </el-card>
            <!--          已关注卡-->
            <el-card v-else style="text-align: left">
              <div slot="header" style="text-align:left; padding-bottom: 10px;">
                <div style="float:left;font-size:16px;">他已经关注的人</div>
              </div>
              <div v-for="(item,index) in uJumpFollowing"  :key="item.uID">
                <div class="clearfix" style="margin-bottom:20px;">
                  <div style="float:left;margin-right: 10px;">
                    <el-avatar :size="40" :src="item.avatarUrl"></el-avatar>
                  </div>
                  <div style="float:left;">
                    <el-tooltip placement="top-end">
                      <div slot="content"  class="clearfix" style="width:400px;padding:20px;margin-top:20px;text-align: left;">
                        <div style="width:70%;float:left;">
                          <!--          用户名+学位-->
                          <div style="margin-bottom: 10px">
                            <div style="font-size: 18px;font-weight: bold;">
                             {{item.uName}}
                            </div>
                            <div v-if="item.lenDegree>=1" style="margin:0;">
                            <span style="font-size: 14px;color:darkgray;" v-for="item_ in userInform.uDegree" v-if="index<3" :key="item_.uDegreeID">
                            {{item_.uDegreeName}}
                            </span>
                            </div>
                          </div>
                          <!--                  邮箱-->
                          <div  style="margin-bottom: 10px;font-size: 14px;color:lightgrey;">
                            <div style="font-weight: bold;color:white;">邮箱</div>
                            <div>
                              {{item.uEmail}}
                            </div>

                          </div>
                          <!--                个人介绍-->
                          <div v-if="item.uDescription!==''" style="margin-bottom: 10px">
                            <div style="font-size: 16px;color:lightgrey;font-style: italic;">{{item.uDescription}}</div>
                          </div>
                          <!--          机构和部门-->
                          <div v-if="item.uInstitution!==''" style="margin-bottom: 10px;font-size: 14px;color:lightgrey">
                            <div style="font-weight: bold;color:white">机构和部门</div>
                            <div>
                              {{item.uInstitution}}-
                              {{item.uDepartment}}
                            </div>

                          </div>
                          <!--          技能-->
                          <div v-if="item.lenSkill>=1" style="margin-bottom: 10px;font-size: 14px;color:lightgray;">
                            <div style="font-weight: bold;color:white">技能</div>
                            <div>
                            <span v-for="(item_,index) in userInform.uSkill" v-if="index<3" :key="item_.uSkillID">
                             {{item_.uSkillName}}.
                            </span>等
                            </div>

                          </div>
                        </div>
                        <div style="float:right;">
                          <el-avatar :size="60" style="margin:5px;" :src="item.avatarUrl"></el-avatar>
                        </div>

                      </div>
                      <div style="font-size: 16px;font-weight: bold;">
                        <el-button class="claim_btn" type="text" @click="jumpUser(item.uID)">{{item.uName}}</el-button>
                      </div>
                    </el-tooltip>

                    <div style="font-size: 14px;font-style: italic">有{{item.uNumFollow}}位用户关注了他</div>
                  </div>
                  <el-button v-if="item.haveFollowed===false" style="float:right;margin-top:15px;" type="primary" plain size="mini" @click="followRecommand(item.uID)">一键关注</el-button>
                  <el-button v-else style="float:right;margin-top:15px;" type="primary" plain size="mini" @click="unfollowRecommand(item.uID)">取消关注</el-button>
                </div>

              </div>
            </el-card>
          </el-col>
        </el-row>

      </div>



      <!--个人名片编辑对话框-->
      <el-dialog title="请更新您的个人名片" :visible.sync="nameCardVisible" width="35%">
        <el-form style="text-align: left;" ref="userInformRef" :model="editNameCardForm" :rules="userInformRules" label-width="80px" label-position="top">
          <el-form-item label="用户名" prop="uName">
            <el-input v-model="editNameCardForm.uName"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="uEmail">
            <el-input v-model="editNameCardForm.uEmail"></el-input>
          </el-form-item>
          <el-form-item label="学位" prop="uDegree">
            <el-select v-model="uDegreeSelected" multiple placeholder="请选择">
              <el-option v-for="item in uDegreeForm" :key="item.uDegreeID" :label="item.uDegreeName" :value="item.uDegreeID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构" prop="uInstitution" required>
            <el-select v-model="editNameCardForm.uInstitution" filterable placeholder="请选择">
              <el-option v-for="item in uInstitutionForm" :key="item.uInstitutionID" :label="item.uInstitutionName" :value="item.uInstitutionName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="uDepartment">
            <el-input v-model="editNameCardForm.uDepartment"></el-input>
          </el-form-item>
          <el-form-item label="个人介绍" prop="uDescription">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                      maxlength="200" show-word-limit v-model="editNameCardForm.uDescription">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="nameCardVisible = false">取 消</el-button>
          <el-button type="primary" @click="editNameCardInfo()">确 定</el-button>
        </div>
      </el-dialog>
      <!--学科编辑对话框  -->
      <el-dialog title="请选择您擅长或专攻的学科" :visible.sync="subjectCardVisible" width="30%">
        <el-form style="text-align: left;" ref="userInformRef" :model="subjectCardForm" :rules="userInformRules" label-width="80px" label-position="top">
          <el-form-item required label="学科" prop="uSubject">
            <el-select v-model="uSubjectSelected" multiple filterable  placeholder="请选择">
              <el-option v-for="item in uSubjectForm" :key="item.uSubjectID" :label="item.uSubjectName" :value="item.uSubjectID"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="subjectCardVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubjectCardInfo()">确 定</el-button>
        </div>
      </el-dialog>
      <!--技能编辑对话框  -->
      <el-dialog title="请选择您擅长的学科相关技能" :visible.sync="skillCardVisible" width="30%">
        <el-form style="text-align: left;" ref="userInformRef" :model="skillCardForm" :rules="userInformRules" label-width="80px" label-position="top">
          <el-form-item required label="技能" prop="uSkill">
            <el-select v-model="uSkillSelected" multiple filterable placeholder="请选择">
              <el-option v-for="item in uSkillForm" :key="item.uSkillID" :label="item.uSkillName" :value="item.uSkillID"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="skillCardVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSkillCardInfo()">确 定</el-button>
        </div>
      </el-dialog>
      <!--隶属关系编辑对话框-->
      <el-dialog title="请更新您的个人名片" :visible.sync="belongCardVisible" width="35%">
        <el-form style="text-align: left;" ref="userInformRef" :model="editBelongCardForm" :rules="userInformRules" label-width="80px" label-position="top">
          <el-form-item label="机构" prop="uInstitution" required>
            <el-select v-model="editBelongCardForm.uInstitution" filterable placeholder="请选择">
              <el-option v-for="item in uInstitutionForm" :key="item.uInstitutionID" :label="item.uInstitutionName" :value="item.uInstitutionName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="uDepartment">
            <el-input v-model="editBelongCardForm.uDepartment"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="uCharacter">
            <el-input v-model="editBelongCardForm.uCharacter"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="belongCardVisible = false">取 消</el-button>
          <el-button type="primary" @click="editBelongCardInfo()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Introduce",
  data(){
    var checkuEmail = (rule, value, callback) => {
      const regEmail = /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/;
      if (regEmail.test(value)) return callback();
      else callback(new Error("请输入合法的邮箱"));
    };
    return{
      tabName:"1",
      avatarVisible:false,
      nameCardVisible:false,
      belongCardVisible:false,
      subjectCardVisible:false,
      skillCardVisible:false,

      realuID:"1",
      uID:"2",

      havaFollowed:true,
      //基本表
      uDegreeForm:[
        // {uDegreeID:"1",uDegreeName:"bachelor of technology"},
        // {uDegreeID:"2",uDegreeName:"bachelor of science"},
      ],
      uInstitutionForm:[
        // {uInstitutionID:"1",uInstitutionName:"SoftWare"},
        // {uInstitutionID:"2",uInstitutionName:"Computer Science"},
        // {uInstitutionID:"3",uInstitutionName:"movie"}
      ],
      uSubjectForm:[
        // {uSubjectID:"1",uSubjectName:"SoftWare"},
        // {uSubjectID:"2",uSubjectName:"Computer Science"},
        // {uSubjectID:"3",uSubjectName:"movie"}
      ],
      uSkillForm:[
        // {uSkillID:"1",uSkillName:"C language"},
        // {uSkillID:"2",uSkillName:"Java"},
        // {uSkillID:"3",uSkillName:"Vue"}
      ],

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

      userInformRules: {
        uName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"},
        ],
        uEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkuEmail, trigger: "blur" },
        ],
        uDescription: [
          { required: false, message: "请输入您的个人介绍", trigger: "blur" },
          { min: 1, max: 200, message: "长度在 1 到 200 个字符", trigger: "blur"},
        ],
        uDepartment: [
          { required: false, message: "请输入您所在的部门", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"},
        ],
        uCharacter: [
          { required: false, message: "请输入您在部门担任的角色", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"},
        ],
        avatarUrl: [{ required: true, message: "请填写您的头像链接", trigger: "blur" },]
      },
      userInform:{

      },
      editAvatarForm:{avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",},
      editNameCardForm:{

      },
      editBelongCardForm:{

      },
      uDegreeSelected:[],
      uSubjectSelected:[],
      uSkillSelected:[],


      subjectCardForm:{

      },
      skillCardForm:{

      },
    };
  },
  mounted(){
    //顶子刷新依然金色
    if(this.$route.path==="/Introduce")
    {
      const tmpA=document.getElementById('Passage');
      const tmpB=document.getElementById('Welcome');
      const tmpC=document.getElementById('User');
      const tmpD=document.getElementById('Message');
      tmpA.style.color="white"
      tmpB.style.color="white"
      tmpC.style.color="gold"
      tmpD.style.color="white"
    }
    if(this.$route.path==="/Introduce")
    {
      const tmp0=document.getElementById('Introduce');
      const tmp1=document.getElementById('ResearchList');
      const tmp2=document.getElementById('Statistics');
      const tmp3=document.getElementById('Collect');
      const tmp4=document.getElementById('Follow');
      const tmp5=document.getElementById('QuestionList');
      tmp0.style.color="#1E9992"
      tmp1.style.color="grey"
      tmp2.style.color="grey"
      tmp3.style.color="grey"
      tmp4.style.color="grey"
      tmp5.style.color="grey"
    }

      if (location.href.indexOf("#reloaded")<=0) {
        alert("aaa")
        location.href = location.href + "#reloaded"+"#reloaded";
        location.reload();
      }


  },
  created() {

    // window.sessionStorage.setItem("realuID","1");
    // window.sessionStorage.setItem("uID","1");
    this.realuID=window.sessionStorage.getItem("realuID");
    this.uID=window.sessionStorage.getItem("uID");
    this.getBasicList();
    this.getuserInform();
    this.getJumpFollowList();
    this.$forceUpdate();
    if (location.href.indexOf("#reloaded") == -1) {

      location.href = location.href + "#reloaded";
      location.reload();
    }


  },

  methods:{
    fresh(){
    if(location.href.indexOf("?reload=true")<0){
      location.href+="?reload=true";
    }
  },


    //获取学位，机构，学科基本表--ok
    async getBasicList() {
      const uID=window.sessionStorage.getItem("uID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/get/dis", JSON.stringify({uID:uID}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error(res.data.message);
              return;
            } else {
              // this.$message({
              //   message: "基本表信息信息获取成功",
              //   showClose: true,
              //   type: "success",
              // });


              this.uDegreeForm=res.data.uDegree;
              this.uInstitutionForm=res.data.uInstitution;
              this.uSubjectForm=res.data.uSubject;
            }
          });
        resolve();
      });

    },
    //获取技能基本表---ok
    async getSkillList() {
      const uSubject=this.userInform.uSubject;
      console.log("技能表参数");
      console.log(uSubject);
      await new Promise((resolve) => {
        this.$http
          .post("/user/get/skill", JSON.stringify({uSubject:uSubject}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "基本技能表信息获取成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.uSkillForm=res.data.uSkill;
              console.log("技能表来了！");
              console.log(res.data.uSkill);
            }
          });
        resolve();
      });

    },
    //获取用户基本信息--ok
    async getuserInform() {
      const uID=window.sessionStorage.getItem("uID");
      await new Promise((resolve) => {
        this.$http
          .post("/user/get/userInfo", JSON.stringify({uID: uID }))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error("用户基本信息获取失败");
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "用户基本信息获取成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.userInform=res.data.userInform;
              this.editAvatarForm=res.data.userInform;
              this.editNameCardForm=res.data.userInform;
              this.editBelongCardForm=res.data.userInform;
              this.subjectCardForm=res.data.userInform;
              this.skillCardForm=res.data.userInform;
              console.log(res.data);
              // if(res.data.userInform.lenSkill!==1)
              //   alert(res.data.userInform.lenSkill);
              this.uDegreeSelected=[];
              this.uSubjectSelected=[];
              this.uSkillSelected=[];
              for(var i=0;i<this.userInform.lenDegree;i++)
                this.uDegreeSelected.push(parseInt(this.userInform.uDegree[i].uDegreeID));
              for( i=0;i<this.userInform.lenSubject;i++)
                this.uSubjectSelected.push(parseInt(this.userInform.uSubject[i].uSubjectID));
              for( i=0;i<this.userInform.lenSkill;i++)
                this.uSkillSelected.push(parseInt(this.userInform.uSkill[i].uSkillID));

            }
          });
        resolve();
      });


    },
    //获取其他用户跳转的已关注列表---未定
    async getJumpFollowList() {
      const ID=this.uID
      const realuID=this.realuID
      console.log("所跳转门户关注信息~");
      console.log({uID:realuID,followsID:ID});
      await new Promise((resolve) => {
        this.$http
          .post("/user/jump", JSON.stringify({uID:realuID,followsID:ID}))
          .then((res) => {
            if (res.data.success === false) {
              this.$message.error(res.data.message);
              return console.log(res.data.message);
            } else {
              // this.$message({
              //   message: "该用户关注人信息获取成功",
              //   showClose: true,
              //   type: "success",
              // });
              this.uJumpFollowing=res.data.uJumpFollowing;
              console.log("结果！！");
              console.log(res.data);
            }
          });
        resolve();
      });

    },

    //修改用户基本信息---ok
    async editNameCardInfo() {
      var i;
      this.editNameCardForm.uDegree=[];
      for(i=0;i<this.uDegreeSelected.length;i++)
        this.editNameCardForm.uDegree.push(this.uDegreeForm[this.uDegreeSelected[i]]);
      console.log("wtf???")
      console.log(this.editNameCardForm);
      this.$refs.userInformRef.validate(
        async (valid) => {
          if (!valid) return;
          else {
            await new Promise((resolve) => {
              this.$http.post("/user/change/info", JSON.stringify(this.editNameCardForm)).then((res) => {
                if (res.data.success === false) this.$message.error(res.data.message);
                else
                {
                  this.$message.success("修改成功！");
                window.location.reload();
               }
              });
              resolve();
            });
            this.nameCardVisible = false;
          }
        }
      )

    },
    //修改用户隶属基本信息---ok
    async editBelongCardInfo() {
      var i;
      this.editBelongCardForm.uSubject=[];
      this.editBelongCardForm.uDegree=[];
      for(i=0;i<this.uDegreeSelected.length;i++)
        this.editBelongCardForm.uDegree.push(this.uDegreeForm[this.uDegreeSelected[i]]);

      console.log("隶属关系修改啦！！！！");
      console.log(this.editBelongCardForm);
      this.$refs.userInformRef.validate(
        async (valid) => {
          if (!valid) return;
          else {
            await new Promise((resolve) => {
              this.$http.post("/user/change/belongInfo", JSON.stringify(this.editBelongCardForm)).then((res) => {
                if (res.data.success === false) this.$message.error(res.data.message);
                else
                {
                  this.getuserInform();
                  this.$message.success("隶属关系修改成功！");
                  window.location.reload();
                }
              });
              resolve();
            });
            this.belongCardVisible = false;
          }
        }
      )

    },
    //修改用户学科信息----ok
    async editSubjectCardInfo() {
      var i;
      this.subjectCardForm.uSubject=[];
      for(i=0;i<this.uSubjectSelected.length;i++)
        this.subjectCardForm.uSubject.push(this.uSubjectForm[this.uSubjectSelected[i]]);

      this.$refs.userInformRef.validate(
        async (valid) => {
          if (!valid) return;
          else {
            await new Promise((resolve) => {
              this.$http.post("/user/change/subject", JSON.stringify(this.subjectCardForm)).then((res) => {
                if (res.data.success === false) this.$message.error(res.data.message);
                else
                {
                  this.$message.success("学科信息修改成功！");
                  console.log("修改学科啦")
                  console.log(res.data)
                  this.getuserInform();
                }
              });
              resolve();
            });
            this.subjectCardVisible = false;
          }
        }
      )

    },
    //修改用户技能信息---ok
    async editSkillCardInfo() {
      console.log("weishenme!!!!")
      console.log(this.uSkillForm);
      console.log(this.uSkillSelected);
      var i;
      this.skillCardForm.uSkill=[];
      for(i=0;i<this.uSkillSelected.length;i++)
      {
        for(var j=0;j<this.uSkillForm.length;j++)
        {
          if (this.uSkillSelected[i]===parseInt(this.uSkillForm[j].uSkillID))
            this.skillCardForm.uSkill.push(this.uSkillForm[j]);
        }
      }

      console.log("BBBBBB");
      console.log(this.skillCardForm);
      this.$refs.userInformRef.validate(
        async (valid) => {
          if (!valid) return;
          else {
            await new Promise((resolve) => {
              this.$http.post("/user/change/skill", JSON.stringify(this.skillCardForm)).then((res) => {
                if (res.data.success === false) this.$message.error(res.data.message);
                else
                {
                  this.$message.success("修改成功！");
                  this.getuserInform();
                }

              });
              resolve();
            });
            this.skillCardVisible = false;
          }
        }
      )

    },
    //控制是否显示技能对话框---ok
    ifEditSkill(){
      if(this.userInform.uSubject.length===0)
        this.$message({
          message: "请先编辑学科信息",
          showClose: true,
          type: "info",
        });
      else{
        this.getSkillList();
        this.skillCardVisible=true;
      }
    },

    //关注函数----ok
    async followRecommand(uID){
      const realuID=this.realuID
      await new Promise((resolve) => {
        this.$http
          .post("/user/follow", JSON.stringify({uID:realuID,followsID:uID}))
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
              if(uID===realuID)
                this.getuserInform();//已经关注了这个人，就刷新推荐新的关注人
              else
                this.getJumpFollowList();


            }
          });
        resolve();
      });

      window.location.reload();
    },
    //取消关注函数----ok
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
            if(uID===realuID)
              this.getuserInform();//已经关注了这个人，就刷新推荐新的关注人
            else
              this.getJumpFollowList();

          });
        resolve();
      });
      window.location.reload();
    },

    //跳转到其他作者门户
    jumpUser(uID){
      window.sessionStorage.setItem("uID",uID);
      window.location.reload();
    }


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
  background-color: #1E9992;
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
>>>.el-form--label-top .el-form-item__label{padding:0px !important;}
.claim_btn{
  font-weight: bold;
  color:dimgrey !important;
  padding:0px;
}
.claim_btn:hover{
  font-weight: bold;
  color:lightseagreen !important;
  text-decoration-line: underline;
  background-color: transparent !important;
}
</style>
