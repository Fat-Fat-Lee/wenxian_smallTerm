<template>
<div style="width:80%;margin:0 auto;">

  <!--    卡片视图区-->
  <el-card class="box-card">
    <div style="height:20px;">
      <span class="iconfont_bing"></span>
      <span style="font-size:16px; margin-top:8px;display: inline-block;float:left;font-weight:bold">认领审查</span>
    </div>
    <el-divider></el-divider>
    <!--      引入栅格系统，方便布局-->
    <el-row :gutter="20">
      <!--      搜索框区域，span代表占几个格子，gutter控制间隙-->
      <el-col :span="8">
        <!--      搜索框-->
        <el-input
          placeholder="请输入用户名/用户ID/文献名/文献ID"
          v-model="queryInfo.query"
          @click="getClaimList"
          clearable
        >
          <el-select
            v-model="queryInfo.qparam"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="用户名" value="1"></el-option>
            <el-option label="用户ID" value="2"></el-option>
            <el-option label="文献名" value="3"></el-option>
            <el-option label="文献ID" value="4"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getClaimList"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!--        待借记录列表区-->
    <el-table :data="claimList"  @sort-change="onSortChange"  border stripe ><!--最后一个属性为表格隔行变色-->
      <!--        index指定此列为索引列-->
      <el-table-column label="#" type="index" > </el-table-column>
      <el-table-column label="认领ID" prop="rID" sortable="custom" :sort-orders="['ascending', 'descending']" ></el-table-column>
      <el-table-column label="文献名称"  prop="name" width="600">
        <template  slot-scope="scope">
            <el-button class="claim_btn" type="text" @click="jumpPassage(scope.row.rID)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="文献ID" prop="aID" sortable="custom" :sort-orders="['ascending', 'descending']"></el-table-column>
      <el-table-column label="用户名称" prop="uName" width="150">
        <template  slot-scope="scope">
          <el-button class="claim_btn" type="text" @click="jumpUser(scope.row.uID)">{{scope.row.uName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="uID" sortable="custom" :sort-orders="['ascending', 'descending']"></el-table-column>
      <el-table-column label="状态更改日期" prop="updateDate" sortable="custom" :sort-orders="['ascending', 'descending']"> </el-table-column>
      <el-table-column label="此记录状态" prop="rCondition" width="100"></el-table-column>
      <!--        在这里使用插槽作用域-->

      <el-table-column label="通过认领/驳回认领" class="orderRow" width="170">
        <template slot-scope="scope">
          <!-- 通过按钮-->
          <span v-if="scope.row.rCondition!=='已认领'">
              <el-button type="primary" plain  size="mini" @click="passByrID(scope.row.rID)">通过</el-button>
          </span>

          <!-- 驳回按钮-->
          <span v-if="scope.row.rCondition!=='已驳回'">
            <el-button type="warning"  plain size="mini" @click="rejectByrID(scope.row.rID)">驳回</el-button>
            </span>
        </template>
      </el-table-column>
    </el-table>
    <!--      分页区-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</div>

</template>

<script>
export default {
  name: "Super",
//页面测试数据
  data() {
    return {
      queryInfo: {
        query: "", //搜索关键字
        qsort: 41, //记录排序参数，10 11 rID升、降序；20 21 uID升、降序；30 31aID升、降序；40 41 updateDate升、降序；默认41
        qparam: 3, //搜索认领记录选项参数 1按用户名 2用户ID 3文献名 4文献ID搜索，默认文献名搜索
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
      },
      claimList: [],
      // claimList: [
      //   //0未认领 1审核中 2已驳回 3已认领，此表不要未认领记录
      //   {
      //     rID:"1",
      //     uID:"1",uName:"AAA",
      //     aID:"2140",name:"AI人工智能",
      //     updateDate:"2019-03-03",
      //     rCondition:"审核中"
      //   },
      //   {
      //     rID:"2",
      //     uID:"1",uName:"BBB",
      //     aID:"123",name:"编译原理",
      //     updateDate:"2020-03-10",
      //     rCondition:"已驳回"
      //   },
      //   {
      //     rID:"3",
      //     uID:"4",uName:"CCC",
      //     aID:"123",name:"挖掘聚类",
      //     updateDate:"2021-01-10",
      //     rCondition:"已认领"
      //   },
      // ],
      total: 3, //此为一共几条记录,现在定义死了，以后会随着API获取更改


    };
  },
  mounted()
  {
    //顶子刷新依然金色
    if(this.$route.path==="/Super")
    {
      const tmpA=document.getElementById('Passage');
      const tmpB=document.getElementById('Welcome');
      const tmpC=document.getElementById('User');
      const tmpD=document.getElementById('Super');
      tmpA.style.color="white"
      tmpB.style.color="white"
      tmpC.style.color="white"
      tmpD.style.color="gold"
    }
  },
  created() {
    this.getClaimList();
  }, //生命周期函数，再次发起获取数据请求*/
  methods: {
    async getClaimList() {
      await new Promise((resolve) => {
        this.$http
          .post("manager/get/claim/table", JSON.stringify(this.queryInfo))
          .then((res) => {
            console.log("????")
            console.log(this.queryInfo);
            console.log(res);
            if (res.data.success === false)
              this.$message.error("获取认领列表失败");
            else {
              this.$message.success("获取认领列表成功！");
              this.borrowList = [];
              console.log(res.data.claimList)
              this.claimList = []
              for (let i = 0; i < res.data.claimList.length; i++) {
                if (res.data.claimList[i].rCondition === 0)
                  res.data.claimList[i].rCondition = "未认领";
                else if (res.data.claimList[i].rCondition === 1)
                  res.data.claimList[i].rCondition = "审核中";
                else if (res.data.claimList[i].rCondition === 2)
                  res.data.claimList[i].rCondition = "已认领";
                else if (res.data.claimList[i].rCondition === 3)
                  res.data.claimList[i].rCondition = "已驳回";
                this.claimList.push(res.data.claimList[i]);
              }
              this.total = res.data.total;
            }
          });
        resolve();
      });
    },

    //获取申借记录列表函数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getClaimList();
    }, //函数用来监听pagesize的改变情况
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getClaimList();
    }, //函数用来监听页码值改变的事件
    onSortChange({ prop, order }) {
      if (prop === "rID" && order === "ascending")
        this.queryInfo.qsort = 10;
      else if (prop === "rID" && order === "descending")
        this.queryInfo.qsort = 11;
      else if (prop === "uID" && order === "ascending")
        this.queryInfo.qsort = 20;
      else if (prop === "uID" && order === "descending")
        this.queryInfo.qsort = 21;
      else if (prop === "aID" && order === "ascending")
        this.queryInfo.qsort = 30;
      else if (prop === "aID" && order === "descending")
        this.queryInfo.qsort = 31;
      // else if (prop === "aID" && order === "descending")
      //   this.queryInfo.qsort = 31;
      else if (prop === "updateDate" && order === "ascending")
        this.queryInfo.qsort = 40;
      else this.queryInfo.qsort = 41;//默认日期降序

      this.getClaimList();
      //与后端连接后，解除此行注释
    },
    //通过认领
    async passByrID(rID) {
      await new Promise((resolve) => {
        this.$http
          .post("manager/accept/claim", JSON.stringify({ rID }))
          .then((res) => {
            if (res.data.success === false)
              this.$message.error("认领通过记录提交失败");
            else
            {
              this.$message.success("认领审核通过成功！");
              this.getClaimList();
            }

            //进行删除借阅记录操作
          });
      });
    },
    //驳回认领
    async rejectByrID(rID) {
      await new Promise((resolve) => {
        this.$http
          .post("manager/refuse/claim", JSON.stringify({ rID }))
          .then((res) => {
            if (res.data.success === false)
              this.$message.error("认领驳回记录提交失败");
            else
            {
              this.$message.success("认领审核驳回成功！");
              this.getClaimList();
            }

            //进行删除借阅记录操作
          });
      });
    },
    jumpPassage(rID){
      //this.codeUrl='/Passage'+'?rID='+rID
      this.codeUrl='/'+rID;
      this.$router.push({path:this.codeUrl})
    },
    //跳转到其他作者门户
    jumpUser(uID){
      window.sessionStorage.setItem("uID",uID);
      this.$router.push({path:"/Introduce"})
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
}
.claim_btn:hover{
  color:lightseagreen !important;
  text-decoration-line: underline;
}

</style>
