<template>
  <div class="main-box">
<!--    搜索-->
    <div class="head-box">
      <div style="display:inline-block;width: 10%">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="display:inline-block;width: 70%">
      <el-input
        style="height: 30px"
        prefix-icon="iconfont el-icon-search"
        placeholder="在此处搜索你要查找的论文/专利/博文"
        v-model="searchInfo.query"
        clearable>
      </el-input>
      </div>
      <div style="display:inline-block;margin-left: 10px">
        <el-button size="medium" type="primary" @click="getArticleList">搜索</el-button>
      </div>
    </div>
    <div style="margin-top: 0px">
      <el-row :gutter="20">
        <el-col :span="5" style="margin-top: 20px;margin-left: 20px">
          <el-button  type="primary" style="margin-bottom: 10px ;width: 60%" @click="getArticleList">确认检索</el-button>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <div v-if="searchInfo.qway===3">
            <el-submenu index="1" :disabled="true">
              <template slot="title">
                <span>学科</span>
              </template>
            </el-submenu>
    </div>
            <div v-else>
              <el-submenu index="1" :disabled="false">
                <template slot="title">
                  <span>学科</span>
                </template>
                <el-menu-item v-for="(item,i) in subjectList" index="i"  class="el-menu-item-result">
                  <el-tooltip class="item" effect="dark"  placement="right">
                    <div slot="content">{{item.name_short}}</div>
                  <el-checkbox v-model="item.checked" >{{item.name}}</el-checkbox>
                </el-tooltip>
                </el-menu-item>
              </el-submenu>
            </div>
            <div>
            <el-submenu index="2">
              <template slot="title">
                <span>发表年度</span>
              </template>
              <el-menu-item v-for="(item,i) in yearList" index="i" class="el-menu-item-result">
                <el-checkbox v-model="item.checked" ><p>{{item.name}}</p></el-checkbox>
              </el-menu-item>
            </el-submenu>
            </div>
            <div v-if="searchInfo.qway===2">
            <el-submenu index="3" :disabled="true">
              <template slot="title">
                <span>标签</span>
              </template>
            </el-submenu>
            </div>
            <div v-else>
              <el-submenu index="3" :disabled="false">
                <template slot="title">
                  <span>标签</span>
                </template>
                <el-menu-item v-for="(item,i) in tagList" index="i" class="el-menu-item-result">
                  <el-tooltip class="item" effect="dark"  placement="right">
                    <div slot="content">{{item.name_short}}</div>
                    <el-checkbox v-model="item.checked" >{{item.name}}</el-checkbox>
                  </el-tooltip>
                </el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-col>

      <el-card class="box-card">
        <el-table :data="articleInform"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}"
                  @sort-change="onSortChange"
                  border stripe
        ><!--最后一个属性为表格隔行变色-->
          <!--        index指定此列为索引列-->
          <el-table-column label="#" type="index" width="50"> </el-table-column>


          <el-table-column label="文献标题" prop="name" >
            <template slot-scope="scope">
              <span class="button-jump" @click="JumpArticle(scope.row.aID)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="作者"
            prop="authors"

          >
            <template slot-scope="scope">
              <span v-for="(item,i) in scope.row.authors" >{{item}};</span>
            </template>
          </el-table-column>
          <el-table-column label="日期" prop="public_time" width="100"
                           sortable="custom"
                           :sort-orders="['ascending', 'descending']"> </el-table-column>
          <el-table-column label="浏览次数" prop="browses" width="110"
                           sortable="custom"
                           :sort-orders="['ascending', 'descending']">
          </el-table-column>
          <el-table-column label="下载量" prop="downloads" width="100"
                           sortable="custom"
                           :sort-orders="['ascending', 'descending']">
          </el-table-column>
          <el-table-column label="操作" class="orderRow" width="200px">
            <template slot-scope="scope">
              <!-- 下载按钮-->
              <el-dialog title="分享链接" :visible.sync="dialogVisible" >
                <h3>http://124.71.149.102/#/{{dialogID}}</h3>
              </el-dialog>
                <el-button
                  type="primary"
                  icon="el-icon-download"
                  size="mini"
                  @click="download(scope.row)"
                >
                </el-button>


              <!-- 分享按钮-->

                <el-button
                  type="success"
                  icon="el-icon-share"
                  size="mini"
                  @click="Dialog(scope.row.aID)"
                ></el-button>
<!--              收藏按钮-->

                <el-button v-if="scope.row.iscollect===false"
                  type="warning"
                  icon="el-icon-star-off"
                  size="mini"
                  @click="collect(scope.row.aID)"
                ></el-button>
              <el-button v-else
                         type="warning"
                         icon="el-icon-star-on"
                         size="mini"
                         @click="collect(scope.row.aID)"></el-button>

            </template>
          </el-table-column>
        </el-table>
        <!--      分页区-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchInfo.pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="searchInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {
  name: "Result",

  data() {
    return {
      queryInfo: {
        aID:'1',
        uID:2,
      },
      options: [{
        value: 0,
        label: '标题'
      }, {
        value: 1,
        label: '作者'
      }, {
        value: 2,
        label: '主题标签'
      }, {
        value: 3,
        label: '学科'
      }],
      value:0,
      searchInfo: {
        query: '', //搜索关键字
        qway:0,//检索方式
        qsort: 10, //记录排序参数
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
        query_subject: ['jdsd'],//通过学科筛选，显示对应学科所有文献
        query_year:['2019'],//通过年份筛选，显示对应年份所有文献
        query_tag:[],//通过标签筛选，显示对应标签所有文献
      },
      subjectList: [
        {
          id:1,
          name:'jdsd',
          checked:false
        },
        {
          id:2,
          name:'dfg',
          checked:false
        },
      ],//通过学科筛选，显示对应学科所有文献
      yearList:[
        {
          name:'2019',
          checked:false,
        },
        {
          name:'2020',
          checked:false,
        }
      ],//通过年份筛选，显示对应年份所有文献
      tagList:[],//通过标签筛选，显示对应标签所有文献
      total: 3, //此为一共几条记录,现在定义死了，以后会随着API获取更改
      subject:["计算机","软件"],//检索文件根据学科分类
      year_article:["2019","2020"],//检索文件根据年份分类
      tag_article:["AI","深度学习"],//检索文件根据标签分类
      articleInform:[
      //   {
      //   // aID:'1',
      //   //   browses:'1',//浏览次数
      //   //   downloads:'2',
      //   // authors:["zzzzzi","dasds"],
      //   //   public_time:'2021-10-19',
      //   // name:'吃饭睡觉打豆豆',
      //   //   download_url:'',
      // },
      //   {
      //     aID:'2',
      //     authors:["zzzzzi","dasds"],
      //     public_time:'2021-10-16',
      //     name:'拒绝早起',
      //     browses:'1',//浏览次数
      //     downloads:'2',
      //     download_url:'',
      //   },
      ],
      dialogID:'1',
      dialogVisible:false,
      isLogin:false,
      artile:[],
    }
  },
  mounted()
  {
    //顶子刷新依然金色
    if(this.$route.path==="/Result")
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
  },
  created() {
    if(window.sessionStorage.getItem("realuID")!==null){
      this.isLogin = true;
      this.queryInfo.uID=window.sessionStorage.getItem("uID");
    }
    else{
      this.isLogin = false;
    }
    this.getParams();
    this.getArticleList();
    for(let i=0;i<this.searchInfo.query_subject.length;i++){
      for(let j=0;j<this.subjectList.length;j++){
        if(this.searchInfo.query_subject[i]===this.subjectList[j].name){
          this.subjectList[j].checked = true;
        }
      }
    }
    for(let i=0;i<this.searchInfo.query_year.length;i++){
      for(let j=0;j<this.yearList.length;j++){
        if(this.searchInfo.query_year[i]===this.yearList[j].name){
          this.yearList[j].checked = true;
        }
      }
    }
    for(let i=0;i<this.searchInfo.query_tag.length;i++){
      for(let j=0;j<this.tagList.length;j++){
        if(this.searchInfo.query_tag[i]===this.tagList[j].name){
          this.tagList[j].checked = true;
        }
      }
    }
  }, //生命周期函数，再次发起获取数据请求*/
  methods: {
    async collect(ID) {
      if(this.isLogin===false){
        this.$message.error("请先登录");
        return;
      }
      else{
        this.queryInfo.aID = ID;
      this.queryInfo.uID = window.sessionStorage.getItem("realuID");
        await new Promise((resolve) => {
          let s = this.queryInfo;
          this.$http
            .post("/collect/", JSON.stringify({searchInfo: s}))
            .then(async (res) => {
              console.log(res);
              if (res.data.success === false) {
                return console.log(res.data.message);
              }
              this.$message.success(res.data.message);
              await new Promise((resolve) => {
                let s = this.queryInfo;
                this.$http
                  .post("/isCollect/", JSON.stringify({searchInfo: s}))
                  .then(async (res) => {
                    console.log(res);
                    if (res.data.success === false) {
                      this.$message.success(res.data.message);
                      return console.log(res.data.message);
                    }

                    await new Promise((resolve) => {
                      this.$http
                        .post("/add/statistic/number", JSON.stringify({aID: ID, action: 2}))
                        .then((res) => {
                          console.log(res);
                          if (res.data.success === false) {
                            return console.log(res.data.message);
                          }
                        });
                      resolve();
                    });


                  });
                resolve();
              });
            });
          resolve();
        });
      }
      for(let i=0;i<this.articleInform.length;i++){
        if(ID===this.articleInform[i].aID){
          this.articleInform[i].iscollect = this.articleInform[i].iscollect !== true;
          return;
        }

      }
    },
    Dialog(ID){
      this.dialogID = ID;
      this.dialogVisible = true;
    },
    JumpArticle(r) {
      let codeUrl = '/' + r;
      this.$router.push({
        path: codeUrl
      })
    },
    async download(item) {
      let searchInfo = {};
      searchInfo.aID = item.aID;
      searchInfo.download_url = item.download_url;
      this.$http.post("/articleDownload/", JSON.stringify({searchInfo})).then(res => {
        if (res.data.success === false) {
          this.$message.error("下载失败");
          return;
        }
        const data = res.data.data;

        const fileName = this.title + ".pdf";
        const url = window.URL.createObjectURL(
          this.dataURLtoBlob(data)
        );

        console.log(url)
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
          type: "success"
        })
        // this.downloads++; 当前页面下载量的更新
      })
      await new Promise((resolve) => {
        this.$http
          .post("/add/statistic/number", JSON.stringify({aID:item.aID,action:1}))
          .then((res) => {
            console.log(res);
            if (res.data.success === false) {
              return console.log(res.data.message);
            }
          });
        resolve();
      });
    },
    dataURLtoBlob(dataurl) {
      var bstr = atob(dataurl)
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: "application/octet-stream" });
    },
    getParams(){
      this.searchInfo.query = this.$route.query.query;
      this.searchInfo.qway = parseInt(this.$route.query.qway);
      this.value = this.searchInfo.qway;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getArticleList() {
       this.searchInfo.qway = this.value;
       this.searchInfo.query_subject = [];
      this.searchInfo.query_year = [];
      this.searchInfo.query_tag = [];
       for(let i=0;i<this.subjectList.length;i++){
         if(this.subjectList[i].checked === true){
           this.searchInfo.query_subject.push(this.subjectList[i].name_short);
         }
      }
       console.log(this.searchInfo.query_subject);
      for(let i=0;i<this.yearList.length;i++){
        if(this.yearList[i].checked === true){
          this.searchInfo.query_year.push(this.yearList[i].name);
        }
      }
      for(let i=0;i<this.tagList.length;i++){
        if(this.tagList[i].checked === true){
          this.searchInfo.query_tag.push(this.tagList[i].name_short);
        }
      }
       if(this.searchInfo.query.length!==0){
         await new Promise((resolve) => {
           let s = this.searchInfo
           this.$http
             .post("/getArticleList/", JSON.stringify({searchInfo: s}))
             .then(async (res) => {
               console.log(res);
               if (res.status !== 200)
                 this.$message.error("获取检索文献列表失败！");
               else {
                 this.$message.success("获取检索文献列表成功！");
                 this.article = [];
                 this.article = res.data.data.articleInform;
                 this.articleInform = [];
                 if(this.isLogin===true){
                   for(let i=0;i<this.article.length;i++){
                     this.queryInfo.aID = this.article[i].aID;
                     this.queryInfo.uID = window.sessionStorage.getItem("realuID");
                     await new Promise((resolve) => {
                       let s = this.queryInfo;
                       this.$http
                         .post("/isCollect/", JSON.stringify({searchInfo: s}))
                         .then((res) => {
                           console.log(res);
                           if (res.data.success === false) {
                             return console.log(res.data.message);
                           }
                           else{
                             console.log(res.data.data.is_collect);
                             if(res.data.data.is_collect===0){
                               let a=this.article[i];
                               a.iscollect = false;
                               this.articleInform.push(a);
                             }
                             else{
                               let a=this.article[i];
                               a.iscollect = true;
                               this.articleInform.push(a);
                             }
                           }
                         });
                       resolve();
                     });
                   }
                   console.log("1111");
                   console.log(this.articleInform);
                 }
                 else{
                   this.articleInform = this.article;
                 }
               }
             });
           resolve();
         });


         await new Promise((resolve) => {
           let s = this.searchInfo;
           this.$http
             .post("/getTotal/", JSON.stringify({searchInfo: s}))
             .then((res) => {
               console.log(res);
               if (res.data.success === false) {
                 this.$message.error("获取总数失败");
                 return console.log(res.data.message);
               }
               this.subjectList = [];
               this.yearList = [];
               this.tagList = [];
               this.total = res.data.data.total;
               for (let i = 0; i < res.data.data.subject.length; i++) {
                 this.subject.push(res.data.data.subject[i]);
                 let sub = {};
                 sub.id = i;
                 sub.name_short = res.data.data.subject[i];
                 if(res.data.data.subject[i].length>=20){
                   sub.name = res.data.data.subject[i].substring(0,20).concat(".",".",".");
                 }
                 else{
                   sub.name = res.data.data.subject[i]
                 }
                 sub.checked = false;
                 for(let j = 0;j<this.searchInfo.query_subject.length;j++){
                   if(this.searchInfo.query_subject[j]===res.data.data.subject[i]){
                     sub.checked = true;
                     break;
                   }
                 }
                 this.subjectList.push(sub);
               }
               for (let i = 0; i < res.data.data.year_article.length; i++) {
                 this.year_article.push(res.data.data.year_article[i]);
                 let year = {};
                 year.id = i;
                 year.name = res.data.data.year_article[i];
                 year.checked = false;
                 for(let j = 0;j<this.searchInfo.query_year.length;j++){
                   if(this.searchInfo.query_year[j]===res.data.data.year_article[i]){
                    year.checked = true;
                     break;
                   }
                 }
                 this.yearList.push(year);
               }
               for (let i = 0; i < res.data.data.tag_article.length; i++) {
                 this.tag_article.push(res.data.data.tag_article[i]);
                 let tag = {};
                 tag.id = i;
                 tag.name_short = res.data.data.tag_article[i];
                 if(res.data.data.tag_article[i].length>=20){
                   tag.name = res.data.data.tag_article[i].substring(0,18).concat(".",".",".");
                 }
                 else{
                   tag.name = res.data.data.tag_article[i]
                 }
                 tag.checked = false;
                 for(let j = 0;j<this.searchInfo.query_tag.length;j++){
                   if(this.searchInfo.query_tag[j]===res.data.data.tag_article[i]){
                     tag.checked = true;
                     break;
                   }
                 }
                 this.tagList.push(tag);
               }
             });
           resolve();
         });

       }
       else {
         alert("检索内容不能为空！");
       }

    },

    handleSizeChange(newSize) {
      this.searchInfo.pagesize = newSize;
      this.getArticleList();
    }, //函数用来监听pagesize的改变情况
    handleCurrentChange(newPage) {
      this.searchInfo.pagenum = newPage;
      this.getArticleList();
    }, //函数用来监听页码值改变的事件

    onSortChange({ prop, order }) {
      if (prop === "public_time" && order === "ascending") this.searchInfo.qsort = 11;
      else if (prop === "public_time" && order === "descending")
        this.searchInfo.qsort = 10;
      else if (prop === "browses" && order === "ascending")
        this.searchInfo.qsort = 21;
      else if (prop === "browses" && order === "descending")
        this.searchInfo.qsort = 20;
      else if (prop === "downloads" && order === "ascending")
        this.searchInfo.qsort = 31;
      else if (prop === "downloads" && order === "descending")
        this.searchInfo.qsort = 30;
      else this.searchInfo.qsort = 11;

      this.getArticleList();
    },

  }
}
</script>

<style Lang="less" scoped>
.main-box{
  width:100%;
}

.head-box{
  width:100%;
  padding:15px 15px 15px 15px;
  background-color: white;
  margin: 0 15px;
}
.sort-style{
  margin-top: 20px;
}

.el-menu-item-result {
  color:lightseagreen !important;
}

.sort-col{
  margin-left: 20px;
}

.big-card{
  width: 100%;
}

.img-style{
  display: flex;
  justify-content: center;
  align-items: center;
}

img{
  width: 100%;
}

.edit-button{
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

.button-jump{
  color:gray !important;
}

.button-jump:hover{
  color:lightseagreen !important;
}


</style>
