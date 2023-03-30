<template>
  <div style="width:80%;margin:0 auto;">
<!--    概览卡片-->
    <el-card>
      <!--概览头部-->
      <div style="height:20px;">
        <span class="iconfont_bing"></span>
        <span style="font-size:16px; margin-top:8px;display: inline-block;float:left;font-weight:bold">统计概览</span>
      </div>
      <el-divider></el-divider>
      <div class="clearfix">

        <span class="sum_box">
          <div style="float:left;width:120px;text-align: left;">
            <div style="font-size: 20px;color: black">{{sumForm.ASP}}/100</div>
            <div style="font-size: 14px;margin-top:10px;color:#6c6c6c;">综合影响力</div>
            <div style="font-size: 14px;margin-top:10px;color:grey;">
              <el-popover
                placement="bottom"
                title="综合影响力"
                width="200"
                trigger="click"
                content="由于版权原因，此统计数据仅代表该作者在本网站的综合影响力。该数据由被关注、被阅读、被引用等数据经计算得出。">
                   <el-button slot="reference" icon="el-icon-more" size="mini" circle style="border-color: lightgray;"></el-button>
              </el-popover>
            </div>
          </div>
          <div class="icon-box"><i class="el-icon-trophy"></i></div>
        </span>

        <span class="sum_box">
          <div style="float:left;width:120px;text-align: left;">
            <div style="font-size: 20px;color: black">{{sumForm.browses}}</div>
            <div style="font-size: 14px;margin-top:10px;color:#6c6c6c;">被浏览量</div>
            <div style="font-size: 14px;margin-top:10px;color:grey;">
              <el-popover
                placement="bottom"
                title="被浏览次数"
                width="200"
                trigger="click"
                content="由于版权原因，此统计数据仅代表该作者在本网站的作品总浏览量。">
                   <el-button slot="reference" icon="el-icon-more" size="mini" circle style="border-color: lightgray;"></el-button>
              </el-popover>
            </div>
          </div>
          <div class="icon-box"><i class="el-icon-view"></i></div>
        </span>
        <span class="sum_box">
          <div style="float:left;width:120px;text-align: left;">
            <div style="font-size: 20px;color: black">{{sumForm.downloads}}</div>
            <div style="font-size: 14px;margin-top:10px;color:#6c6c6c;">被下载量</div>
            <div style="font-size: 14px;margin-top:10px;color:grey;">
              <el-popover
                placement="bottom"
                title="被下载次数"
                width="200"
                trigger="click"
                content="由于版权原因，此统计数据仅代表该作者在本网站的作品总下载量。">
             <el-button slot="reference" icon="el-icon-more" size="mini" circle style="border-color: lightgray;"></el-button>
  </el-popover>
            </div>
          </div>
          <div class="icon-box"><i class="el-icon-download"></i></div>
        </span>
        <span class="sum_box">
          <div style="float:left;width:120px;text-align: left;">
            <div style="font-size: 20px;color: black">{{sumForm.collect}}</div>
            <div style="font-size: 14px;margin-top:10px;color:#6c6c6c;">被收藏量</div>
            <div style="font-size: 14px;margin-top:10px;color:grey;">
              <el-popover
                placement="bottom"
                title="被收藏文章数"
                width="200"
                trigger="click"
                content="此统计数据代表该作者在本网站的作品被他人收藏数">
             <el-button slot="reference" icon="el-icon-more" size="mini" circle style="border-color: lightgray;"></el-button>
  </el-popover>
            </div>
          </div>
          <div class="icon-box"><i class="el-icon-star-off"></i></div>
        </span>
<!--        <span class="sum_box">-->
<!--          <div style="float:left;width:120px;text-align: left;">-->
<!--            <div style="font-size: 20px;color: black">{{sumForm.numFollow}}</div>-->
<!--            <div style="font-size: 14px;margin-top:10px;color:#6c6c6c;">被关注量</div>-->
<!--            <div style="font-size: 14px;margin-top:10px;color:grey;">-->
<!--              <el-popover-->
<!--                placement="bottom"-->
<!--                title="被关注人数"-->
<!--                width="200"-->
<!--                trigger="click"-->
<!--                content="此统计数据代表该作者在本网站的被关注人数。">-->
<!--             <el-button slot="reference" icon="el-icon-more" size="mini" circle style="border-color: lightgray;"></el-button>-->
<!--  </el-popover>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="icon-box"><i class="el-icon-thumb"></i></div>-->
<!--        </span>-->
      </div>
    </el-card>
    <el-card style="text-align: left;">
      <!--统计历史头部-->
      <div style="height:20px;">
        <span class="iconfont_history"></span>
        <span style="font-size:16px; margin-top:8px;display: inline-block;float:left;font-weight:bold">统计历史</span>
        <div style="float:right; font-size:14px; color:dimgrey">
          统计粒度:
          <el-select style="width:80px;height:30px;" v-model="optionValue" placeholder="统计粒度" @change="initGraph">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-divider></el-divider>

      <div v-if="ifNone===false" class="echart-box" id="echarts"></div>
      <div v-else>
        <div v-if="realuID===uID" style="font-size: 20px;text-align: center;
        color:lightseagreen;font-style: italic;margin-bottom: 10px;">
          抱歉，可能是因为您尚未实名认领您的作品，用户您尚没有被浏览、被收藏、被下载统计记录。
        </div>
        <div v-else style="font-size: 20px;text-align: center;
        color:lightseagreen;font-style: italic;margin-bottom: 10px;">
          抱歉，可能是因为该作者尚未实名认领他的作品，该作者尚没有被浏览、被收藏、被下载统计记录。
        </div>
        <div class="img-cantainer"><img style="width: 100%;height:100%;" src="../assets/CSS/statistics.png" alt=""></div>
      </div>
    </el-card>
    <el-card style="text-align: left;">
      <!--统计历史头部-->

      <div  class="echart-box" id="echarts_"></div>
      <div  class="echart-box" id="echarts__"></div>

    </el-card>
  </div>

</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Statistics",
  data() {
    return {
      realuID:"",
      uID:"",
      sumForm:{
        downloads:"",
        browses:"",//被浏览次数
        collect:"",//被收藏文章数
        numFollow:"",//被关注人数
        ASP:"",//综合影响力
      },
      ifNone:false,
      options: [{value: 0, label: "日"}, {value: 1, label: "月"}, {value: 2, label: "年"}],
      optionValue:0,
      option : {
        legend: {
          // show:true,
          // data: ['被浏览量', '被下载量', '被收藏量']
          // //设置图表有多少条不同折线，即图例
        },
        color:['lightseagreen','cornflowerblue','gold','#ffb0bd'],
        // title: {
        //   text: '统计历史'//图表标题
        // },
        tooltip: {
          trigger: 'axis',//鼠标放上去触发
          //鼠标放上去的提示信息
          formatter:function(params){
            //console.log(params)
            //params是echarts封装的参数
            console.log("!!!")
            console.log(params[0]);
            return (params[0].data.value[0] +  "<br>"+params[0].seriesName+": "+params[0].data.value[1])

          }


        },

        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true//是否显示刻度标签
          //坐标图的网格配置，控制图表大小
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
          //工具箱组件，可以保存为图片
        },
        xAxis: {
          type: 'time',
          splitNumber:12,
          boundaryGap: false,//折线是否要和坐标轴有缝隙，一般没有.

        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle:{
              color: ['lightgray'],
              type: 'solid',
              width:1,
            }
          },
          axisLine:{show:true,lineStyle:{color:"grey"}}


        },

        //系列图表设置，决定显示哪种形式图表
        series: [
          {
            name: '被浏览次数',
            type: 'bar',
            stack: 'Total',
            barGap: 5,
            barWidth: 25,
            data: [
              //  {value:["2021-12",1]},
              // {value:["2021-11",0]},
              // {value:["2021-10",0]},
              // {value:["2021-9",0]},
              // {value:["2020-12",3]},
              // {value:["2021-12",1]},
              // {value:["2020-11-15",150]},
              // {value:["2020-12-31",80]},
              // {value:["2021-01-09",70]},
              // {value:["2021-05-16",20]},
              // {value:["2021-08-21",310]},
              // {value:["2021-11-02",450]},
            ],
          },
          {
            name: '被下载次数',
            type: 'bar',
            stack: 'Total',
            data: [
              // {value:["2021-12",1]},
              // {value:["2021-11",0]},
             // {value:["2021-12-9",0]},
             // {value:["2019-11-15",5]},
              // {value:["2020-12-31",15]},
              // {value:["2021-01-15",8]},
              // {value:["2021-05-16",6]},
              // {value:["2021-05-21",32]},
              // {value:["2021-09-02",10]},
            ],
          },
          {
            name: '被收藏次数',
            type: 'bar',
            stack: 'Total',
            data: [
            //  {value:["2018-08-05",12]},
              // {value:["2019-04-15",15]},
              // {value:["2020-11-30",15]},
              // {value:["2021-02-15",18]},
              // {value:["2021-03-16",16]},
              // {value:["2021-04-21",42]},
              // {value:["2021-08-02",20]},
            ],
          },
          // {
          //   name: '被关注量',
          //   type: 'line',
          //   stack: 'Total',
          //   data: [
          //     {value:["2018-09-09",22]},
          //     {value:["2019-10-15",25]},
          //     {value:["2020-11-31",35]},
          //     {value:["2021-02-15",28]},
          //     {value:["2021-04-16",26]},
          //     {value:["2021-04-21",52]},
          //     {value:["2021-08-02",20]},
          //   ],
          // }
        ]
      },

      tmp1:[],
      tmp2:[],
      tmp1_:[],
      tmp2_:[],


    }
  },
  mounted()
  {
    //顶子刷新依然金色
    if(this.$route.path==="/Statistics")
    {

      const tmpA=document.getElementById('Passage');
      const tmpB=document.getElementById('Welcome');
      const tmpC=document.getElementById('User');
      const tmpD=document.getElementById('Super');

      const tmp0=document.getElementById('Introduce');
      const tmp1=document.getElementById('Myupload');
      const tmp2=document.getElementById('Statistics');
      const tmp3=document.getElementById('Collect');
      const tmp4=document.getElementById('Follow');

      tmpA.style.color="white"
      tmpB.style.color="white"
      tmpC.style.color="gold"
      tmpD.style.color="white"
      tmp0.style.color="grey"
      tmp1.style.color="grey"
      tmp2.style.color="#1E9992"
      tmp3.style.color="grey"
      tmp4.style.color="grey"



    }
    // if (location.href.indexOf("#reloaded")<=0) {
    //   location.href = location.href + "#reloaded"+"#reloaded";
    //   location.reload();
    // }

  },
  created() {
    this.realuID=window.sessionStorage.getItem("realuID");
    this.uID=window.sessionStorage.getItem("uID");

    this.$nextTick(() => {
      //  执行echarts方法
      this.initGraph();

    })

  },
  methods:{
    initGraph(){
     this.getStatistics();//先给表格赋值
      this.getGraph();
      this.getGraph_();
    },
    async getGraph() {
      var myChart=echarts.init(document.getElementById("echarts_"));
      const uID=parseInt (window.sessionStorage.getItem("uID"));
      var option = {
        title: { text: '知识图谱' },
        tooltip: {
          formatter: function (x) {
            return x.data.des;
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 80,
            roam: true,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            // edgeLabel: {
            //   normal: {
            //     textStyle: {
            //       fontSize: 20
            //     }
            //   }
            // },
            force: {
              repulsion: 2500,
              edgeLength: [10, 50]
            },
            draggable: true,
            itemStyle: {
              normal: {
                color: '#4b565b'
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#4b565b'

              }
            },
            edgeLabel: {
              normal: {
                show: true,
                formatter: function (x) {
                  return x.data.name;
                }
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                }
              }
            },
            data: [


            ],

            links: [

            ]
          }
        ]
      };

            await new Promise((resolve) => {
        this.$http
          .post("/tupu", JSON.stringify({uID:uID}))
          .then((res) => {
            if (res.data.success === false) {
              this.ifNone=true;
              //this.$message.error("统计信息获取失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "统计信息获取成功",
                showClose: true,
                type: "success",
              });
              this.tmp1=res.data.data;
              this.tmp2=res.data.links;
              console.log("coming");
              console.log(this.tmp1)
              this.$echarts.init(document.getElementById("echarts_")).hideLoading();
              this.$echarts.init(document.getElementById("echarts_")).setOption(
                {
                  title: { text: '关注关系知识图谱' },
                  tooltip: {
                    formatter: function (x) {
                      return x.data.des;
                    }
                  },
                  series: [
                    {
                      type: 'graph',
                      layout: 'force',
                      symbolSize: 80,
                      roam: true,
                      edgeSymbol: ['circle', 'arrow'],
                      edgeSymbolSize: [4, 10],
                      force: {
                        repulsion: 2500,
                        edgeLength: [10, 50]
                      },
                      draggable: true,
                      itemStyle: {
                        normal: {
                          color: '#4b565b'
                        }
                      },
                      lineStyle: {
                        normal: {
                          width: 2,
                          color: '#4b565b'

                        }
                      },
                      edgeLabel: {
                        normal: {
                          show: true,
                          formatter: function (x) {
                            return x.data.name;
                          }
                        }
                      },
                      label: {
                        normal: {
                          show: true,
                          textStyle: {
                          }
                        }
                      },
                      "data":this.tmp1,
                      "links": this.tmp2,
                    }
                  ]
                }
              )


            }
          });
        resolve();
      });
      option.data=this.tmp1;
      option.links=this.tmp2;
      console.log(option);
      myChart.setOption(option);
    },
    async getGraph_() {
      var myChart=echarts.init(document.getElementById("echarts__"));
      const uID=parseInt (window.sessionStorage.getItem("uID"));
      var option = {
        title: { text: '知识图谱' },
        tooltip: {
          formatter: function (x) {
            return x.data.des;
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 80,
            roam: true,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            // edgeLabel: {
            //   normal: {
            //     textStyle: {
            //       fontSize: 20
            //     }
            //   }
            // },
            force: {
              repulsion: 2500,
              edgeLength: [10, 50]
            },
            draggable: true,
            itemStyle: {
              normal: {
                color: '#4b565b'
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#4b565b'

              }
            },
            edgeLabel: {
              normal: {
                show: true,
                formatter: function (x) {
                  return x.data.name;
                }
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                }
              }
            },
            data: [


            ],

            links: [

            ]
          }
        ]
      };

      await new Promise((resolve) => {
        this.$http
          .post("/tupu1", JSON.stringify({uID:uID}))
          .then((res) => {
            if (res.data.success === false) {
              this.ifNone=true;
              //this.$message.error("统计信息获取失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "统计信息获取成功",
                showClose: true,
                type: "success",
              });
              this.tmp1_=res.data.data;
              this.tmp2_=res.data.links;
              console.log("coming");
              console.log(this.tmp1)
              this.$echarts.init(document.getElementById("echarts__")).hideLoading();
              this.$echarts.init(document.getElementById("echarts__")).setOption(
                {
                  title: { text: '同机构关系图谱' },
                  tooltip: {
                    formatter: function (x) {
                      return x.data.des;
                    }
                  },
                  series: [
                    {
                      type: 'graph',
                      layout: 'force',
                      symbolSize: 80,
                      roam: true,
                      edgeSymbol: ['circle', 'arrow'],
                      edgeSymbolSize: [4, 10],
                      force: {
                        repulsion: 2500,
                        edgeLength: [10, 50]
                      },
                      draggable: true,
                      itemStyle: {
                        normal: {
                          color: '#4b565b'
                        }
                      },
                      lineStyle: {
                        normal: {
                          width: 2,
                          color: '#4b565b'

                        }
                      },
                      edgeLabel: {
                        normal: {
                          show: true,
                          formatter: function (x) {
                            return x.data.name;
                          }
                        }
                      },
                      label: {
                        normal: {
                          show: true,
                          textStyle: {
                          }
                        }
                      },
                      "data":this.tmp1_,
                      "links": this.tmp2_,
                    }
                  ]
                }
              )


            }
          });
        resolve();
      });
      option.data=this.tmp1_;
      option.links=this.tmp2_;
      console.log(option);
      myChart.setOption(option);
    },
    async getStatistics() {
      //初始化echarts实例对象
      var myChart=echarts.init(document.getElementById("echarts"));
      const uID=parseInt (window.sessionStorage.getItem("uID"));
      const optionValue=this.optionValue;


      await new Promise((resolve) => {
        this.$http
          .post("/get/statistic", JSON.stringify({uID,optionValue}))
          .then((res) => {
            if (res.data.success === false) {
              this.ifNone=true;
              //this.$message.error("统计信息获取失败");
              return console.log(res.data.message);
            } else {
              this.$message({
                message: "统计信息获取成功",
                showClose: true,
                type: "success",
              });

              console.log(res.data);
              this.sumForm=res.data.sumForm;
              this.ifNone=res.data.ifNone;
              this.option.series[0].data=res.data.series[0].data;
              this.option.series[1].data=res.data.series[1].data;
              this.option.series[2].data=res.data.series[2].data;
              // this.option.series[3].data=res.data.numFollow;
              this.$echarts.init(document.getElementById("echarts")).hideLoading();
              this.$echarts.init(document.getElementById("echarts")).setOption({
                legend: {
                  // show:true,
                  // data: ['被浏览量', '被下载量', '被收藏量']
                  // //设置图表有多少条不同折线，即图例
                },
                color:['lightseagreen','gold','cornflowerblue',],
                // title: {
                //   text: '统计历史'//图表标题
                // },
                tooltip: {
                  trigger: 'axis',//鼠标放上去触发
                  //鼠标放上去的提示信息
                  formatter:function(params){
                    //console.log(params)
                    //params是echarts封装的参数
                    return (params[0].data.value[0] +  "<br>"+params[0].seriesName+": "+params[0].data.value[1]+"<br>"+
                      params[1].seriesName+": "+params[1].data.value[1]+"<br>"+
                      params[2].seriesName+": "+params[2].data.value[1]+"<br>")

                  }


                },

                grid: {
                  left: '3%',
                  right: '3%',
                  bottom: '3%',
                  containLabel: true//是否显示刻度标签
                  //坐标图的网格配置，控制图表大小
                },
                toolbox: {
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                  }
                  //工具箱组件，可以保存为图片
                },
                xAxis: {
                  type: 'time',
                  splitNumber:12,
                  boundaryGap: false,//折线是否要和坐标轴有缝隙，一般没有.

                },
                yAxis: {
                  type: 'value',
                  splitLine: {
                    show: true,
                    lineStyle:{
                      color: ['lightgray'],
                      type: 'solid',
                      width:1,
                    }
                  },
                  axisLine:{show:true,lineStyle:{color:"grey"}}


                },

                //系列图表设置，决定显示哪种形式图表
                series: [
                  {
                    name: '被浏览次数',
                    type: 'bar',
                    //stack: 'Total',
                    barGap: 0,
                    barWidth: 25,
                   // areaStyle: {},
                    data: res.data.series[0].data
                  },
                  {
                    name: '被下载次数',
                    type: 'bar',
                    barGap: 0,
                    barWidth: 25,
                    //stack: 'Total',
                   // areaStyle: {},
                    data: res.data.series[1].data
                  },
                  {
                    name: '被收藏次数',
                    type: 'bar',
                    barGap: 0,
                    barWidth: 25,
                    //stack: 'Total',
                    //areaStyle: {},
                    data: res.data.series[2].data,
                  },

                ]
              })
              console.log("???");
              console.log(res.data.series);
            }
          });
        resolve();
      });

    },
  }
}
</script>

<style Lang="less" scoped>
.iconfont_bing{
  height:25px;
  width:25px;
  border-radius: 10px;
  background-image:url(../assets/CSS/bing.png);
  background-size: 100% 100%;
  margin:5px;
  display: inline-block;
  float:left;
}
.iconfont_history{
  height:25px;
  width:25px;
  border-radius: 10px;
  background-image:url(../assets/CSS/history.png);
  background-size: 100% 100%;
  margin:5px;
  display: inline-block;
  float:left;
}
.sum_box{
  display: inline-block;
  border: 1px #e0e0e0 solid;
  border-radius: 2px;
  margin: 15px;
  width:200px;
  height:90px;
  float:left;
  padding:10px;
}
.clearfix:after{
  content:"";
  display:block;
  height:0;
  clear:both;
  visibility:hidden;
}
.icon-box{
  float:right;
  width:18px;
  height:18px;
  border-radius: 50%;
  background-color: rgb(210,235,233);
  font-size:18px;
  padding:8px;
  color:#1E9992;

}
.echart-box{
  margin:0 auto 15px auto;
  width:100%;
  height:450px;
  float:left;
}
.img-cantainer {
  margin:0 auto;
  position: relative;
  width: 400px;
  height: 400px;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    min-height: 100%;
    min-width: 100%;
    transition: all .3s;
    transform: translateY(-50%);
    z-index: -1;
  }
}

</style>
