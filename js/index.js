var csv_file_API = 'CN_Daily.csv';
var csv_file_API_pro='WD_pro.csv';
var csv_file_API_vncc='CN_vncc.csv';
var jsonData;
$.ajax({
  type: 'GET',
  url: csv_file_API,
  dataType: 'text',
  success: function (data) {
    jsonData = $.csv.toObjects(data);
    console.log(jsonData[1]);
    console.log(jsonData[1].today_confirm)


  },
  error: function (e) {
    alert('An error occurred while processing API calls');
    console.log("API call Failed: ", e);
  },
});
// 柱状图1模块
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  console.log(document.querySelector(".bar .chart"));
  // 指定配置和数据
  var pro_total_confirm=new Array();
  var pro_today_confirm=new Array();
  var pro_name=new Array();
  $.ajax({
    type: 'GET',
    url: csv_file_API_pro,
    dataType: 'text',
    success: function (data) {
      jsonData = $.csv.toObjects(data);
      var j=0;
      for(i=0;i<jsonData.length;i++)
      {
        if(jsonData[i].country=='中国'&&jsonData[i].name!='台湾')
        {
          pro_total_confirm[j]=jsonData[i].total_confirm;
          pro_today_confirm[j]=jsonData[i].today_confirm;
          pro_name[j]=jsonData[i].name;
          j++;
        }
      }
      myChart.setOption(option);
    },
    error: function (e) {
      alert('An error occurred while processing API calls');
      console.log("API call Failed: ", e);
    },
  });
  var option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: pro_name,//姓名############
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
            // width: 1,
            // type: "solid"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "累计确诊",
        type: "bar",
        barWidth: "35%",
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          barBorderRadius: 5
        }
      }
    ]
  };

  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });

  // 数据变化
  var dataAll = [
    { year: "当日确诊", data: pro_today_confirm },//数据######################
    { year: "累计确诊", data: pro_total_confirm }//数据######################
  ];

  $(".bar h2 ").on("click", "a", function() {
    option.series[0].data = dataAll[$(this).index()].data;
    myChart.setOption(option);
  });
})();

// 折线图定制
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line .chart"));

  // (1)准备数据
  var confirm=new Array();
  var heal=new Array();
  var date=new Array();

  $.ajax({
    type: 'GET',
    url: csv_file_API,
    dataType: 'text',
    success: function (data) {
      jsonData = $.csv.toObjects(data);
      for(i=0;i<jsonData.length;i++)
      {
        confirm[i]=jsonData[i].total_heal;
        heal[i]=jsonData[i].total_confirm;
        date[i]=jsonData[i].date;
      }
      $("li[id='title_confirm']").html(jsonData[jsonData.length-1].total_confirm);
      $("li[id='title_heal']").html(jsonData[jsonData.length-1].total_heal);

      myChart.setOption(option);
    },
    error: function (e) {
      alert('An error occurred while processing API calls');
      console.log("API call Failed: ", e);
    },
  });

  var data = {
    year: [
      confirm,
      heal
    ]
  };

  // 2. 指定配置和数据
  var option = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }

    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [
      {
        name: "累计治愈",
        type: "line",
        stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data: data.year[0]
      },
      {
        name: "累计确诊",
        type: "line",
        stack: "总量",
        smooth: true,
        data: data.year[1]
      }
    ]
  };
  // 3. 把配置和数据给实例对象
  myChart.setOption(option);

  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

// 饼形图定制
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  var confirm=1253277;
  var input=18386;
  var dead=15618;
  var heal=285435;
  var suspect=9;
  $.ajax({
    type: 'GET',
    url: csv_file_API,
    dataType: 'text',
    success: function (data) {
      jsonData = $.csv.toObjects(data);
      confirm=jsonData[jsonData.length-1].total_confirm;
      input=jsonData[jsonData.length-1].total_input;
      dead=jsonData[jsonData.length-1].total_dead;
      heal=jsonData[jsonData.length-1].total_heal;
      suspect=jsonData[jsonData.length-1].total_suspect;
      console.log(confirm);
      myChart.setOption(option);
    },
    error: function (e) {
      alert('An error occurred while processing API calls');
      console.log("API call Failed: ", e);
    },
  });
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      position: function(p) {
        //其中p为当前鼠标的位置
        return [p[0] + 10, p[1] - 10];
      }
    },
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "确诊病例分布",
        type: "pie",
        center: ["50%", "42%"],
        radius: ["40%", "60%"],
        color: [
          "#065aab",
          "#066eab",
          "#0682ab",
          "#0696ab",
          "#06a0ab",
          "#06b4ab",
          "#06c8ab",
          "#06dcab",
          "#06f0ab"
        ],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: confirm, name: "确诊" },
          { value: input, name: "无症状" },
          { value: heal, name: "治愈" },
          { value: suspect, name: "疑似" },
          { value: dead, name: "死亡" }
        ]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });


})();
// 学习进度柱状图模块
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".bar1 .chart"));
  var cityname=["上海", "吉林", "长春", "武汉", "贵州"];
  var confirm=[702, 350, 610, 793, 664];
  var confirm_percent=[70, 34, 60, 78, 69];
  var total=0;
  $.ajax({
    type: 'GET',
    url: csv_file_API_pro,
    dataType: 'text',
    success: function (data) {
      jsonData = $.csv.toObjects(data);
      var j=0;
      var tmp_confirm=new Array();
      for(i=0;i<jsonData.length;i++)
      {
        if(jsonData[i].country=='中国'&&jsonData[i].name!='台湾'&&jsonData[i].name!='香港')
        {
          tmp_confirm[j]=new Map;
          tmp_confirm[j].name=jsonData[i].name;
          tmp_confirm[j].value=jsonData[i].total_confirm;
          total+=parseInt(tmp_confirm[j].value);
          j++;
        }
      }
      tmp_confirm.sort();
      console.log(total);
      for(i=0;i<5;i++)
      {
        cityname[i]=tmp_confirm[i].name;
        confirm[i]=tmp_confirm[i].value;
        confirm_percent[i]=parseInt(confirm[i]/total*100);
      }
      console.log(cityname);
      console.log(confirm);
      console.log(confirm_percent);
      myChart.setOption(option);
    },
    error: function (e) {
      alert('An error occurred while processing API calls');
      console.log("API call Failed: ", e);
    },
  });
  var data = [70, 34, 60, 78, 69];
  var titlename = ["上海", "吉林", "长春", "武汉", "贵州"];
  var valdata = [702, 350, 610, 793, 664];
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  var option = {
    //图标位置
    grid: {
      top: "10%",
      left: "15%",
      bottom: "10%"
    },
    xAxis: {
      show: false
    },
    yAxis: [
      {
        show: true,
        data: cityname,
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#fff",

          rich: {
            lg: {
              backgroundColor: "#339911",
              color: "#fff",
              borderRadius: 14,
              // padding: 5,
              align: "center",
              width: 15,
              height: 15
            }
          }
        }
      },
      {
        show: true,
        inverse: true,
        data: confirm,
        axisLabel: {
          textStyle: {
            fontSize: 10,
            color: "#fff"
          }
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: confirm_percent,
        barCategoryGap: 50,
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: function(params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num];
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: "{c}%"
          }
        }
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        barCategoryGap: 50,
        data: [100, 100, 100, 100, 100],
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
// 折线图 优秀作品
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line1 .chart"));
  var vncc=new Array();
  var date=new Array();
  $.ajax({
    type: 'GET',
    url: csv_file_API_vncc,
    dataType: 'text',
    success: function (data) {
      jsonData = $.csv.toObjects(data);
      for(i=0;i<jsonData.length;i++)
      {
        vncc[i]=jsonData[i].confirm;
        date[i]=jsonData[i].date;
      }

      myChart.setOption(option);
    },
    error: function (e) {
      alert('An error occurred while processing API calls');
      console.log("API call Failed: ", e);
    },
  });


  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: date
      },
      {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: "bottom",
        offset: 20
      }
    ],

    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },

        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "接种人数",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#0184d5",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data:vncc
      },

    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

// 点位分布统计模块
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie1  .chart"));
  // 2. 指定配置项和数据
  var province=new Array();
  var name=new Array();
  $.ajax({
    type: 'GET',
    url: csv_file_API_pro,
    dataType: 'text',
    success: function (data) {
      jsonData = $.csv.toObjects(data);
      var j=0;
      for(i=0;i<jsonData.length;i++)
      {
        if(jsonData[i].country=='中国'&&jsonData[i].name!='台湾'&&jsonData[i].name!='香港'&&jsonData[i].total_confirm>=3000)
        {
          province[j]=new Map;
          province[j].value=jsonData[i].total_confirm;
          province[j].name=jsonData[i].name;
          j++;
        }
      }
      myChart.setOption(option);
    },
    error: function (e) {
      alert('An error occurred while processing API calls');
      console.log("API call Failed: ", e);
    },
  });
  var option = {
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: [
      {
        name: "各省确诊人数分布",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["10%", "70%"],
        center: ["50%", "42%"],
        roseType: "radius",
        data: province,
        // 修饰饼形图文字相关的样式 label对象
        label: {
          fontSize: 10
        },
        // 修饰引导线样式
        labelLine: {
          // 连接到图形的线长度
          length: 10,
          // 连接到文字的线长度
          length2: 10
        }
      }
    ]
  };


  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();
