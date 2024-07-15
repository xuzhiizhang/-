var new_confirm_csv = 'new_confirm.csv';
var act_confirm_csv='active_confirm.csv';
var confirm_csv='total_confirm.csv';
var confirm_csv_seir='total_confirm_seir.csv';
var jsonData;


//新增确诊
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".line .chart"));
    console.log("test1");
    // (1)准备数据
    var confirm=new Array();
    var date=new Array();

    $.ajax({
        type: 'GET',
        url: new_confirm_csv,
        dataType: 'text',
        success: function (data) {
            jsonData = $.csv.toObjects(data);
            for(i=0;i<jsonData.length;i++)
            {
                confirm[i]=jsonData[i].new_confirm;
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
            confirm
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
                name: "速度",
                type: "line",
                stack: "总量",
                // 是否让线条圆滑显示
                smooth: true,
                data: data.year[0]
            },
        ]
    };
    // 3. 把配置和数据给实例对象
    myChart.setOption(option);

    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

//累计——SEIR
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".apple .chart"));

    // (1)准备数据
    var confirm=new Array();
    var date=new Array();

    $.ajax({
        type: 'GET',
        url: confirm_csv_seir,
        dataType: 'text',
        success: function (data) {
            jsonData = $.csv.toObjects(data);
            for(i=0;i<jsonData.length;i++)
            {
                confirm[i]=jsonData[i].total_confirm;
                date[i]=jsonData[i].date;
            }
            myChart.setOption(option);
        },
        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },
    });

    var data = {
        year: [
            confirm
        ]
    };

    // 2. 指定配置和数据
    var option = {
        color: ["#90D2D1"],
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
                name: "速度",
                type: "line",
                stack: "总量",
                // 是否让线条圆滑显示
                smooth: true,
                data: data.year[0]
            }
        ]
    };
    // 3. 把配置和数据给实例对象
    myChart.setOption(option);

    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

//当前确诊
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".line1 .chart"));
    var active=new Array();
    var date=new Array();
    $.ajax({
        type: 'GET',
        url: act_confirm_csv,
        dataType: 'text',
        success: function (data) {
            jsonData = $.csv.toObjects(data);
            for(i=0;i<jsonData.length;i++)
            {
                active[i]=jsonData[i].active_confirm;
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
                name: "速度",
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
                data:active
            },

        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 累计确诊
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".line2 .chart"));

    // (1)准备数据
    var confirm=new Array();
    var date=new Array();

    $.ajax({
        type: 'GET',
        url: confirm_csv,
        dataType: 'text',
        success: function (data) {
            jsonData = $.csv.toObjects(data);
            for(i=0;i<jsonData.length;i++)
            {
                confirm[i]=jsonData[i].total_confirm;
                date[i]=jsonData[i].date;
            }
            myChart.setOption(option);
        },
        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },
    });

    var data = {
        year: [
            confirm
        ]
    };

    // 2. 指定配置和数据
    var option = {
        color: ["#9F4fFF"],
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
                name: "速度",
                type: "line",
                stack: "总量",
                // 是否让线条圆滑显示
                smooth: true,
                data: data.year[0]
            }
        ]
    };
    // 3. 把配置和数据给实例对象
    myChart.setOption(option);

    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

(function() {
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    var point = new BMap.Point(230.31829, 43.335);
    var point = new BMap.Point(256.31829, 43.335);
    var marker = new BMap.Marker(point);        // 创建标注
    map.addOverlay(marker);                     // 将标注添加到地图中

    map.centerAndZoom(point, 10);
//添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));

    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放




    //坐标转换完之后的回调函数
    translateCallback = function (data){
        if(data.status === 0) {
            var marker = new BMap.Marker(data.points[0]);
            bm.addOverlay(marker);
            var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
            marker.setLabel(label); //添加百度label
            bm.setCenter(data.points[0]);
        }
    }

    setTimeout(function(){
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, translateCallback)
    }, 1000);



})();


