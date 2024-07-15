

var path_csv = 'track.csv';
var path1_csv = 'location.csv';
var path_graph = 'location.csv';
var jsonData;

var new_confirm_csv = 'new_confirm.csv';
var jsonData;





(function() {
    var no=new Array();
    var spottime=new Array();
    var address=new Array();
    var point=new Array();
    var lens=new Array();
    $.ajax({
        type: 'GET',
        url: path_csv,
        dataType: 'text',
        success: function (data) {
            jsonData = $.csv.toObjects(data);
            var j=1;
            for(i=0;i<jsonData.length;i++)
            {
                var tmp=jsonData[i].no;
                if(tmp==j)
                {
                    spottime[j-1]=jsonData[i].spottime;
                    address[j-1]=jsonData[i].address;
                    point[j-1]=jsonData[i].point;
                    lens[j-1]=jsonData[i].lens;
                    j++;
                }
            }
            var index=0;
            for(i=0;i<spottime.length;i++)
            {
                var top=parseInt(lens[i]);

                var items=new Array();
                for(j=0;j<top;j++)
                {
                    var new_index=index+j;

                    items[j]={content:jsonData[new_index].date,timestamp:jsonData[new_index].timestamp};
                }
                index+=top;


                Vbar.infos[i]={number: i+1, time:spottime[i], place:address[i]};

                Vbar.activities[i]={len:top,items: items};
            }

        },
        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },
    });
    var lengs=new Array();
    var num=new Array();
    var name=new Array();
    $.ajax({
        type: 'GET',
        url: path1_csv,
        dataType: 'text',
        success: function (data) {
            jsonData = $.csv.toObjects(data);
            var j=1;
            for(i=0;i<jsonData.length;i++)
            {
                var tmp=jsonData[i].no;
                name[i]=jsonData[i].location;
                if(tmp==j)
                {
                    num[j-1]=jsonData[i].no;
                    lengs[j-1]=jsonData[i].lens;

                    j++;
                }
            }
            var index=0;
            for(i=0;i<num.length;i++)
            {
                var top=parseInt(lengs[i]);
                var items1=new Array();
                for(j=0;j<top;j++)
                {
                    var new_index=index+j;

                    items1[j]={xloc:jsonData[new_index].pointx,
                        yloc:jsonData[new_index].pointy,
                        name:name[new_index]
                    };
                }
                index+=top;

                Vbar.location[i]={len:top,items1: items1};
            }

        },
        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },
    });

    var Vbar=new Vue({
        el:"#brief",
        provide(){
            return{
                reload:this.reload
            }
        },
    data(){
            return{
                cur:1 ,       //当前已经点击的按钮
                infos:[
                    {number:1, time:spottime[0], place:address[0]},
                    {number:2, time:spottime[1], place:address[1]},
                    {number:3, time:spottime[2], place:address[2]},
                    {number:4, time:spottime[3], place:address[3]}
                ],
                location:[
                    {len: 2,items1:[{
                            xloc: 120,
                            yloc: 30,
                            name:''
                        },{
                            xloc: 1,
                            yloc: 1,
                            name:''

                        }]
                    },
                    {
                        len: 1, items1: [{
                            xloc: 1,
                            yloc: 1,
                            name:''},{
                            xloc: 1,
                            yloc: 1,
                            name:''
                        }]
                    },
                ]
                ,
                isRouterAlive:true
            }
        },
        methods:{
            show(index){
                this.cur=index;
                console.log(index);
                index-=1;
                console.log(index);
                for(i=0;i<this.location[index].len;i++)
                {
                    console.log(this.location[index].items1.length);
                    var xloc=parseFloat(this.location[index].items1[i].xloc);
                    var yloc=parseFloat(this.location[index].items1[i].yloc);
                    console.log(this.location[index].items1[i].name);
                    var point = new BMap.Point(xloc, yloc);
                    if(i==0)
                    {
                        var map = new BMap.Map("allmap");    // 创建Map实例
                        map.centerAndZoom(point, 16);
                    }
                    var marker = new BMap.Marker(point);        // 创建标注
                    map.addOverlay(marker);                     // 将标注添加到地图中

                }
//添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes:[
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]}));

                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            },
            reload(){
                this.isRouterAlive = false ;
                this.$nextTick(function(){
                    this.isRouterAlive = true ;
                })
            }
        },
        mounted:function (){

        }
    })
})();
(function() {
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
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



})();


//观测点预测图
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