<template>
  <div>
    <div style="margin-top: 20px ;height:20%;margin-bottom: 30px">
      <div style="display:inline-block;width: 10%">
        <el-select v-model="queryInfo.qway" placeholder="请选择">
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
          placeholder="在此处搜索你要查找的论文/专利/博文"
          v-model="queryInfo.query"
          clearable>
        </el-input>
      </div>
      <div style="display:inline-block">
        <el-button size="medium" type="primary" @click="search()">搜索</el-button>
      </div>
    </div>
    <el-row :gutter="12"  align="middle" style="height: 80%">
      <el-col :span="5">
       <div style="height: 10%;margin-bottom:10px">
         <el-popover
           placement="left-start"
           trigger="hover"

           >
           <div v-for="(spe,j) in subjects " v-if="j>=0&&j<4" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
           <el-button slot="reference" style="width: 80%;height: 60px;">Physics</el-button><!--固定值确定了再改-->
         </el-popover>
  </div>
        <div style="height: 10%;margin-bottom:10px">
          <el-popover
            placement="left-start"
            trigger="hover"
          >
            <div v-for="(spe,j) in subjects " v-if="j>=4&&j<8" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
            <el-button slot="reference" style="width: 80%;height: 60px;">Atomic Physics</el-button><!--固定值确定了再改-->
          </el-popover>
        </div>
        <div style="height: 10%;margin-bottom:10px">
          <el-popover
            placement="left-start"
            trigger="hover"
          >
            <div v-for="(spe,j) in subjects " v-if="j>=8&&j<12" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
            <el-button slot="reference" style="width: 80%;height: 60px;">Data Analysis</el-button><!--固定值确定了再改-->
          </el-popover>
        </div>
        <div style="height: 10%;margin-bottom:10px">
          <el-popover
            placement="left-start"
            trigger="hover"
          >
            <div v-for="(spe,j) in subjects " v-if="j>=12&&j<16" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
            <el-button slot="reference" style="width: 80%;height: 60px;">Mathematical Theory</el-button><!--固定值确定了再改-->
          </el-popover>
        </div>
        <div style="height: 10%;margin-bottom:10px">
          <el-popover
            placement="left-start"
            trigger="hover"
          >
            <div v-for="(spe,j) in subjects " v-if="j>=16&&j<20" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
            <el-button slot="reference" style="width: 80%;height: 60px;">Algebra and Geometry</el-button><!--固定值确定了再改-->
          </el-popover>
        </div>
        <div style="height: 10%;margin-bottom:10px">
          <el-popover
            placement="left-start"
            trigger="hover"
          >
            <div v-for="(spe,j) in subjects " v-if="j>=20&&j<24" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
            <el-button slot="reference" style="width: 80%;height: 60px;">Information and Logic</el-button><!--固定值确定了再改-->
          </el-popover>
        </div>
      </el-col>
      <el-col :span="14">
        <el-carousel :interval="5000" arrow="always"
        height="350px" :autoplay="true">
          <el-carousel-item class="img1"></el-carousel-item>
          <el-carousel-item class="img2"></el-carousel-item>
          <el-carousel-item class="img3"></el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="5">
        <div style="height: 10%;margin-bottom:10px">
        <el-popover
          placement="left-start"
          trigger="hover"
        >
          <div v-for="(spe,j) in subjects " v-if="j>=24&&j<28" class="popover_sub"@click="search_menu(spe)">{{spe}}</div>
          <el-button slot="reference" style="width: 80%;height: 60px;">History</el-button><!--固定值确定了再改-->
        </el-popover>
      </div>
        <div style="height: 10%;margin-bottom:10px">
        <el-popover
          placement="left-start"
          trigger="hover"
        >
          <div v-for="(spe,j) in subjects " v-if="j>=28&&j<32" class="popover_sub"@click="search_menu(spe)">{{spe}}</div>
          <el-button slot="reference" style="width: 80%;height: 60px;">Management</el-button><!--固定值确定了再改-->
        </el-popover>
      </div>
        <div style="height: 10%;margin-bottom:10px">
        <el-popover
          placement="left-start"
          trigger="hover"
        >
          <div v-for="(spe,j) in subjects " v-if="j>=32&&j<36" class="popover_sub"@click="search_menu(spe)">{{spe}}</div>
          <el-button slot="reference" style="width: 80%;height: 60px;">Computer Theory</el-button><!--固定值确定了再改-->
        </el-popover>
      </div>
        <div style="height: 10%;margin-bottom:10px">
        <el-popover
          placement="left-start"
          trigger="hover"
        >
          <div v-for="(spe,j) in subjects " v-if="j>=36&&j<40" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
          <el-button slot="reference" style="width: 80%;height: 60px;">Computation</el-button><!--固定值确定了再改-->
        </el-popover>
      </div>
        <div style="height: 10%;margin-bottom:10px">
        <el-popover
          placement="left-start"
          trigger="hover"
        >
          <div v-for="(spe,j) in subjects " v-if="j>=40&&j<44" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
          <el-button slot="reference" style="width: 80%;height: 60px;">Emerging Technologies</el-button><!--固定值确定了再改-->
        </el-popover>
      </div>
        <div style="height: 10%;margin-bottom:10px">
        <el-popover
          placement="left-start"
          trigger="hover"
        >
          <div v-for="(spe,j) in subjects " v-if="j>=44&&j<48" class="popover_sub" @click="search_menu(spe)">{{spe}}</div>
          <el-button slot="reference" style="width: 80%;height: 60px;">Biology</el-button><!--固定值确定了再改-->
        </el-popover>
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Passage",
  data() {
    return {
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
      queryInfo: {
        query: '', //搜索关键字
        qway:2,//检索方式
        qsort: 10, //记录排序参数
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
        query_subject: [],//通过学科筛选，显示对应学科所有文献
        query_year:[],//通过年份筛选，显示对应年份所有文献
        query_tag:[],//通过标签筛选，显示对应标签所有文献
      },
      search_input:'',
      subjects:[
        "1","1","1","1","2","2","2","2",
        "3","3","3","3","4","4","4","4",
        "1","1","1","1","1","1","1","1",
        "1","1","1","1","1","1","1","1",
        "1","1","1","1","1","1","1","1",
        "1","1","1","1","1","1","1","1",
      ]
    }
  },
  mounted()
  {
    //顶子刷新依然金色
    if(this.$route.path==="/Passage")
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
    this.getSubjectList();
  }, /*生命周期函数，再次发起获取数据请求*/
  methods: {
    getSubjectList(){
      axios.post("/getsubject/",)
          .then((res) => {
            console.log(res);
            if (res.status !== 200)
              this.$message.error("获取学科列表失败！");
            else {
              this.$message.success("获取学科列表成功！");
              this.subjects = [];
              for (let i = 0; i < res.data.data.subjects.length; i++) {
                this.subjects.push(res.data.data.subjects[i]);
              }
            }
          });
    },
    search_menu(spe){
      this.queryInfo.query = spe;
      this.queryInfo.qway = 3;
      this.search();
    },
    search(){
      if(this.queryInfo.query.length!==0){
        this.$router.push({
          path:'/result',
          query:{
            query :this.queryInfo.query,
            qway:this.queryInfo.qway,
          }
        })
      }
      else{
        alert("检索内容不能为空！");
      }

    }
  }
}
</script>

<style Lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.popover_sub {
  text-align:center;
  width: 100%;
  height: 40px;
  font-size: medium;
  line-height: 40px;
  margin-bottom: 5px;
}
.popover_sub:hover{
  background-color: #D0EBE0;
  color: #1da099;

}
.img1 {
  background-image: url(轮播1.png);
  background-size: 100% 100%;
}
.img2 {
  background-image: url(轮播2.png);
  background-size: 100% 100%;
}
.img3 {
  background-image: url(轮播3.png);
  background-size: 100% 100%;
}
</style>
