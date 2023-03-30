<template>
  <div style="width:80%;margin:0 auto;">

    <!--    卡片视图区-->
    <el-card class="box-card">
      <div style="height:20px;margin-bottom: 30px">
        <span class="iconfont_bing"></span>
        <span style="font-size:16px; margin-top:8px;display: inline-block;float:left;font-weight:bold">用户信箱</span>
      </div>
<!--      <el-divider></el-divider>-->
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="收件箱" name="message_receive">
          <!--      引入栅格系统，方便布局-->
          <el-row :gutter="20">
            <!--      搜索框区域，span代表占几个格子，gutter控制间隙-->
            <el-col :span="16">

              <el-input placeholder="请输入信息标题/发信用户名" v-model="receiveInfo.query" @click="getReceiveList" clearable>
                <el-select v-model="receiveInfo.qparam" slot="prepend" placeholder="请选择">
                  <el-option label="信息标题" value="1"></el-option>
                  <el-option label="用户名" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="getReceiveList"></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="sendMessage" style="border-radius: 2px;float:right"><i class="el-icon-message"></i>&nbsp发送信息</el-button>
            </el-col>
          </el-row>
          <!--      信箱列表-->
          <el-table :data="receiveList"  @sort-change="onRSortChange"  stripe ><!--最后一个属性为表格隔行变色-->
            <!--        index指定此列为索引列-->
            <el-table-column label="#" type="index" > </el-table-column>
            <el-table-column label="信息ID" prop="mID" v-if="false">
              <template  slot-scope="scope">{{scope.row.mID}}</template>
            </el-table-column>
            <el-table-column label="发信用户" prop="sendUName" width="200">
              <template  slot-scope="scope">
                <el-button class="claim_btn" type="text" @click="jumpUser(scope.row.sendUID)">{{scope.row.sendUName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="信息标题"  prop="mTitle" width="200" >
              <template  slot-scope="scope">
                <el-button class="claim_btn" type="text" @click="jumpMessage(scope.row.mID)">{{scope.row.mTitle}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="发信者信箱ID" prop="sendUID" width="150">
              <template  slot-scope="scope">{{scope.row.sendUID}}</template>
            </el-table-column>
            <el-table-column label="发信/收信日期" prop="mDate" sortable="custom" :sort-orders="['ascending', 'descending']" width="200"> </el-table-column>

            <el-table-column label="已读/未读" prop="mCondition" width="150">
              <template slot-scope="scope">
                <el-tag  type="info" v-if="scope.row.mCondition === true">已读</el-tag>
                <el-tag type="warning" v-else>未读</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="回复/删除" class="orderRow" width="180">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" plain circle size="mini" @click="replyMessage(scope.row.sendUID,scope.row.sendUName)"></el-button>
                <el-button type="danger" icon="el-icon-delete" plain circle size="mini" @click="delReceive(scope.row.mID)"></el-button>

              </template>
            </el-table-column>

          </el-table>
          <!--      分页区-->
          <el-pagination
            @size-change="handleRSizeChange"
            @current-change="handleRCurrentChange"
            :current-page="receiveInfo.pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="receiveInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="receiveTotal"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="发件箱" name="message_send">
          <!--      引入栅格系统，方便布局-->
          <el-row :gutter="20">
            <!--      搜索框区域，span代表占几个格子，gutter控制间隙-->
            <el-col :span="16">

              <el-input placeholder="请输入信息标题/收信用户名" v-model="sendInfo.query" @click="getSendList" clearable>
                <el-select v-model="sendInfo.qparam" slot="prepend" placeholder="请选择">
                  <el-option label="信息标题" value="1" ></el-option>
                  <el-option label="用户名" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="getSendList"></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="sendMessage" style="border-radius: 2px; float:right"><i class="el-icon-message"></i>&nbsp发送信息</el-button>
            </el-col>
          </el-row>
          <!--      信箱列表-->
          <el-table :data="sendList"  @sort-change="onSSortChange"  stripe ><!--最后一个属性为表格隔行变色-->
            <!--        index指定此列为索引列-->
            <el-table-column label="#" type="index" > </el-table-column>
            <el-table-column label="信息ID" prop="mID" v-if="false">
              <template  slot-scope="scope">{{scope.row.mID}}</template>
            </el-table-column>
            <el-table-column label="收信用户" prop="receiveUName" width="200">
              <template  slot-scope="scope">
                <el-button class="claim_btn" type="text" @click="jumpUser(scope.row.receiveUID)">{{scope.row.receiveUName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="信息标题"  prop="mTitle" width="200">
              <template  slot-scope="scope">
                <el-button class="claim_btn" type="text" @click="jumpMessage(scope.row.mID)">{{scope.row.mTitle}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="收信者信箱ID" prop="receiveUName" width="150" >
              <template  slot-scope="scope">{{scope.row.receiveUID}}</template>
            </el-table-column>

            <el-table-column label="发信/收信日期" prop="mDate" sortable="custom" :sort-orders="['ascending', 'descending']" width="200"> </el-table-column>

            <el-table-column label="再发送/删除" class="orderRow" width="250">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" plain circle size="mini" @click="replyMessage(scope.row.receiveUID,scope.row.receiveUName)"></el-button>
                <el-button type="danger" icon="el-icon-delete" plain circle size="mini" @click="delSend(scope.row.mID)"></el-button>

              </template>
            </el-table-column>

          </el-table>
          <!--      分页区-->
          <el-pagination
            @size-change="handleSSizeChange"
            @current-change="handleSCurrentChange"
            :current-page="sendInfo.pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="sendInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="sendTotal"
          >
          </el-pagination>
        </el-tab-pane>

      </el-tabs>

      <!--发信对话框-->
      <el-dialog title="请编辑您要发送的消息" :visible.sync="ifSendVisible" width="35%">
        <el-form style="text-align: left;" ref="messageFormRef" :model="messageForm" :rules="messageFormRules" label-width="80px" label-position="top">
          <el-form-item label="收信用户信箱ID" prop="receiveUID">
            <el-input v-model="messageForm.receiveUID"></el-input>
          </el-form-item>
<!--          <el-form-item label="收信用户名" prop="receiveUID">-->
<!--            <el-input v-model="messageForm.receiveUName"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="信息标题" prop="mTitle">
            <el-input v-model="messageForm.mTitle"></el-input>
          </el-form-item>
          <el-form-item label="信息内容" prop="mText">
            <el-input type="textarea" v-model="messageForm.mText"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ifSendVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendMessageForm()">发送</el-button>
        </div>
      </el-dialog>

      <!--查看信息对话框-->
      <el-dialog title="查看您收到/发送的" :visible.sync="ifCheckVisible" width="35%">
        <div style="text-align: left;">
          <div style=" font-size: 20px;font-weight: bolder;margin-bottom: 15px">信息标题：{{checkForm.mTile}}</div>
          <div style="font-size: 14px; margin-bottom: 10px">收信人：{{checkForm.receiveUName}}&nbsp-&nbsp收信人信箱ID：{{checkForm.receiveUID}}</div>
          <div style="font-size: 14px;margin-bottom: 10px" >发信人：{{checkForm.sendUName}}&nbsp-&nbsp发信人信箱ID：{{checkForm.sendUID}}</div>
          <div style="font-size: 14px;margin-bottom: 15px" >发信/收信日期：{{checkForm.mDate}}</div>
          <div style="font-size: 14px; line-height: 5px">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model=checkForm.mText disabled>
            </el-input>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click=messageChecked(checkForm.mID)>关闭</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>

</template>

<script>
export default {
  name: "Message",
//页面测试数据
  data() {
    return {
      realuID:"1",
      activeName: 'message_receive',
      receiveInfo: {
        query: "", //搜索关键字，query为空给全部
        qsort: 11, //记录排序参数，10 11 mDate升、降序,默认日起将需
        qparam: 1, //搜索认领记录选项参数 1按信息标题 2用户名，默认1
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
        realuID:"",
      },
      sendInfo: {
        query: "", //搜索关键字，query为空给全部
        qsort: 11, //记录排序参数，10 11 mDate升、降序,默认日期降序
        qparam: 1, //搜索认领记录选项参数 1按信息标题 2收信用户，默认1
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
        realuID:"",
      },
      messageFormRules: {
        receiveUID: [
          { required: true, message: "请输入收信用户ID", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur"},
        ],
        mTitle: [
          { required: true, message: "请输入信息标题", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur"},
        ],
        mText: [
          { required: true, message: "请输入信息内容", trigger: "blur" },
          { min: 1, max: 500, message: "长度在 1 到 500 个字符", trigger: "blur"},
        ],
      },
      messageForm:{
        // sendUID:"",
        // receiveUID:"1",
        // mTitle:"我是肥肥李",
        // mText:"我是肥肥李,我真的好想睡觉",

      },
      checkForm:{
        mID:"1",
        sendUID:"",
        sendUName:"fatfatlee",
        receiveUID:"1",
        receiveUName:"lululu",
        mTitle:"我是肥肥李,balalblbblbblblblb",
        mText:"我是肥肥李,这是我写个给lululu的信，我真的好想睡觉",
        mDate:"2022/09/04"

      },
      ifSendVisible:false,
      ifCheckVisible:false,
      receiveList: [
          {
            mID:"1",
            sendUID:"2",
            sendUName:"fatfatlee",
            receiveUID:"1",
            receiveUName:"lululu",
            mTitle:"我是肥肥李,lblbbbjbllalakjadkljs",
            mText:"我是肥肥李,这是我写个给lululu的信，我真的好想睡觉",
            mDate:"2022/08/26",
            mCondition:false
          },
          {
            mID:"2",
            sendUID:"2",
            sendUName:"fatfatlee",
            receiveUID:"1",
            receiveUName:"lululu",
            mTitle:"我是肥肥李",
            mText:"我是肥肥李,这是我写个给lululu的信，我真的好想睡觉",
            mDate:"2022/08/26",
            mCondition:false
          },
          {
            mID:"3",
            sendUID:"2",
            sendUName:"fatfatlee",
            receiveUID:"1",
            receiveUName:"lululu",
            mTitle:"我是肥肥李",
            mText:"我是肥肥李,这是我写个给lululu的信，我真的好想睡觉",
            mDate:"2022/08/26",
            mCondition:true
          },
      ],
      sendList: [
        {
          mID:"1",
          sendUID:"",
          sendUName:"fatfatlee",
          receiveUID:"1",
          receiveUName:"lululu",
          mTitle:"我是肥肥李",
          mText:"我是肥肥李,这是我写个给lululu的信，我真的好想睡觉",
          mDate:"2022/08/26",
          mCondition:false
        },
        {
          mID:"2",
          sendUID:"",
          sendUName:"fatfatlee",
          receiveUID:"1",
          receiveUName:"lululu",
          mTitle:"我是肥肥李",
          mText:"我是肥肥李,这是我写个给lululu的信，我真的好想睡觉",
          mDate:"2022/08/26",
          mCondition:false
        },
        {
          mID:"3",
          sendUID:"",
          sendUName:"fatfatlee",
          receiveUID:"1",
          receiveUName:"lululu",
          mTitle:"我是肥肥李",
          mText:"我是肥肥李,这是我写个给lululu的信，我真的好想睡觉",
          mDate:"2022/08/26",
          mCondition:true
        },

      ],

      receiveTotal: 3, //此为一共几条记录,现在定义死了，以后会随着API获取更改
      sendTotal: 3, //此为一共几条记录,现在定义死了，以后会随着API获取更改


    };
  },
  mounted()
  {
    //顶子刷新依然金色
    if(this.$route.path==="/Message")
    {
      const tmpA=document.getElementById('Passage');
      const tmpB=document.getElementById('Welcome');
      const tmpC=document.getElementById('User');
      const tmpD=document.getElementById('Super');
      const tmpE=document.getElementById('Message');
      tmpA.style.color="white"
      tmpB.style.color="white"
      tmpC.style.color="white"
      tmpD.style.color="white"
      tmpE.style.color="gold"
    }
  },
  created() {
    this.realuID=window.sessionStorage.getItem("realuID");
    this.getReceiveList();
    this.getSendList();
  }, //生命周期函数，再次发起获取数据请求*/
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //发送信息by ljw 20220902
    async sendMessageForm() {
      this.messageForm.sendUID=this.realuID
      this.messageForm.mType="0"
      await new Promise((resolve) => {
        this.$http
          .post("message/send", JSON.stringify(this.messageForm))
          .then((res) => {
            console.log(this.messageForm);
            if (res.data.success === false)
              this.$message.error("信息发送失败，请检查收信用户ID是否存在");
            else {
              this.$message.success("信息发送成功！");
              this.messageForm ={};
              this.getSendList()

            }

          });
        resolve();
      });
      this.ifSendVisible = false
      this.messageForm={}//清空
    },



    //获取收信箱列表
    async getReceiveList() {
      this.receiveInfo.realuID=this.realuID
      await new Promise((resolve) => {
        this.$http
          .post("message/list/receive", JSON.stringify(this.receiveInfo))
          .then((res) => {
            console.log(this.receiveInfo);
            // if (res.data.success === false)
            //   this.$message.error("获取收信箱失败");
            // else {
            //   this.$message.success("获取收信箱成功！");
              this.receiveList = res.data.receiveList
              this.receiveTotal = res.data.receiveTotal;
            // }
          });
        resolve();
      });
    },
    //获取信息列表函数
    handleRSizeChange(newSize) {
      this.receiveInfo.pagesize = newSize;
      this.getReceiveList();
    }, //函数用来监听pagesize的改变情况
    handleRCurrentChange(newPage) {
      this.receiveInfo.pagenum = newPage;
      this.getReceiveList();
    }, //函数用来监听页码值改变的事件
    onRSortChange({ prop, order }) {
      if (prop === "mDate" && order === "ascending")
        this.receiveInfo.qsort = 10;
      else if (prop === "mDate" && order === "descending")
        this.receiveInfo.qsort = 11;
      else
        this.receiveInfo.qsort = 11;//默认日期降序
      this.getReceiveList();
    },



    //获取发信箱列表
    async getSendList() {
      this.sendInfo.realuID=this.realuID
      await new Promise((resolve) => {
        this.$http
          .post("message/list/send", JSON.stringify(this.sendInfo))
          .then((res) => {
            console.log(this.sendInfo);
            // if (res.data.success === false)
            //   this.$message.error("获取发信箱失败");
            // else {
            //   this.$message.success("获取发信箱成功！");
              this.sendList = res.data.sendList
              this.sendTotal = res.data.sendTotal;
            // }
          });
        resolve();
      });
    },
    //获取信息列表函数
    handleSSizeChange(newSize) {
      this.sendInfo.pagesize = newSize;
      this.getSendList();
    }, //函数用来监听pagesize的改变情况
    handleSCurrentChange(newPage) {
      this.sendInfo.pagenum = newPage;
      this.getSendList();
    }, //函数用来监听页码值改变的事件
    onSSortChange({ prop, order }) {
      if (prop === "mDate" && order === "ascending")
        this.sendInfo.qsort = 10;
      else if (prop === "mDate" && order === "descending")
        this.sendInfo.qsort = 11;
      else
        this.sendInfo.qsort = 11;//默认日期降序
      this.getSendList();
    },




    //回复
    replyMessage(uID,uName) {
      this.messageForm.senduID=this.realuID
      this.messageForm.receiveUID=uID
      this.messageForm.receiveUName=uName
      this.messageForm.mType="0"
      this.ifSendVisible=true

    },
    //写信
    sendMessage() {
      this.messageForm.senduID=this.realuID
      this.messageForm.mType="0"
      this.ifSendVisible=true
    },
    //删除收到信息
    async delReceive(mID) {
      await new Promise((resolve) => {
        this.$http
          .post("message/delete", JSON.stringify({ mID:mID,status:"1" }))
          .then((res) => {
            if (res.data.success === false)
              this.$message.error("信息删除失败");
            else
            {
              this.$message.success("信息删除成功！");
              this.getReceiveList();
            }
          });
      });
    },
    //删除发送信息
    async delSend(mID) {
      await new Promise((resolve) => {
        this.$http
          .post("message/delete", JSON.stringify({ mID:mID,status:"0" }))
          .then((res) => {
            if (res.data.success === false)
              this.$message.error("信息删除失败");
            else
            {
              this.$message.success("信息删除成功！");
              this.getSendList();
            }
          });
      });
    },

    //查看信息内容
    async jumpMessage(mID){
      await new Promise((resolve) => {
        this.$http
          .post("message/get/singleMessage", JSON.stringify({mID}))
          .then((res) => {
            // if (res.data.success === false)
            //   this.$message.error("读取信息内容失败");
            // else {
            //   this.$message.success("读取信息内容成功！");
              this.checkForm = res.data.checkForm;
              this.getSendList();
            // }
          });
        resolve();
      });
      this.ifCheckVisible=true
    },
    //查看信息已读
    async messageChecked(mID){
      await new Promise((resolve) => {
        this.$http
          .post("message/checked", JSON.stringify({mID}))
          .then((res) => {
            if (res.data.success === false)
              this.$message.error("读取信息内容失败");
            else {
              this.$message.success("读取信息内容成功！");
              this.checkForm = res.data.checkForm;
            }
          });
        resolve();
        this.getReceiveList()
      });
      this.ifCheckVisible=false


    },

    //跳转到其他作者门户
    jumpUser(uID){
      if(uID!=="10000"&&uID!==10000)
      {
        window.sessionStorage.setItem("uID",uID);
        this.$router.push({path:"/Introduce"})
      }

    }

  },
}

</script>

<style Lang="less" scoped>
.iconfont_bing{
  height:25px;
  width:25px;
  border-radius: 10px;
  background-image:url(../assets/CSS/judge.png);
  background-size: 100% 100%;
  margin:5px;
  display: inline-block;
  float:left;
}
.claim_btn{
  color:dimgrey !important;
  font-size: 16px;
  font-weight: bold;
}
.claim_btn:hover{
  color:lightseagreen !important;
  text-decoration-line: underline;
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
>>>.el-textarea.is-disabled .el-textarea__inner{
  color:black !important;
}
</style>
