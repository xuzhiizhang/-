// 基于准备好的dom，初始化echarts图表
var myChart = echarts.init(document.getElementById('chart'));

//各省份的数据
var allData = [{
    name: '北京'
}, {
    name: '天津'
}, {
    name: '上海'
}, {
    name: '重庆'
}, {
    name: '河北'
}, {
    name: '河南'
}, {
    name: '云南'
}, {
    name: '辽宁'
}, {
    name: '黑龙江'
}, {
    name: '湖南'
}, {
    name: '安徽'
}, {
    name: '山东'
}, {
    name: '新疆'
}, {
    name: '江苏'
}, {
    name: '浙江'
}, {
    name: '江西'
}, {
    name: '湖北'
}, {
    name: '广西'
}, {
    name: '甘肃'
}, {
    name: '山西'
}, {
    name: '内蒙古'
}, {
    name: '陕西'
}, {
    name: '吉林'
}, {
    name: '福建'
}, {
    name: '贵州'
}, {
    name: '广东'
}, {
    name: '青海'
}, {
    name: '西藏'
}, {
    name: '四川'
}, {
    name: '宁夏'
}, {
    name: '海南'
}, {
    name: '台湾'
}, {
    name: '香港'
}, {
    name: '澳门'
}];
for (var i = 0; i < allData.length; i++) {
    allData[i].value = Math.round(Math.random() * 100);
}


loadMap('json/data-1527045631990-r1dZ0IM1X.json', 'china');//初始化全国地图

var timeFn = null;

//单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
myChart.on('click', function(params) {
    alert('aa')
    // clearTimeout(timeFn);
    // //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
    // timeFn = setTimeout(function() {
    //     var name = params.name; //地区name
    //     var mapCode = provinces[name]; //地区的json数据
    //     if (!mapCode) {
    //         alert('无此区域地图显示');
    //         return;
    //     }
    //
    //     loadMap(mapCode, name);
    //
    // }, 250);
});

/**
 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
 @params {String} mapCode:json数据的地址
 @params {String} name: 地图名称
 */
function loadMap(mapCode, name) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                title: {
                    text: '地图下钻',
                    subtext: '双击返回中国地图',
                    left: 'center'
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'map']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        if (params.data) return params.name + '：' + params.data['value']
                    },
                },
                visualMap: {
                    type: 'continuous',
                    text: ['', ''],
                    showLabel: true,
                    left: '50',
                    min: 0,
                    max: 100,
                    inRange: {
                        color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
                    },
                    splitNumber: 0
                },
                series: [{
                    name: 'MAP',
                    type: 'map',
                    mapType: name,
                    selectedMode: 'false',//是否允许选中多个区域
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: allData
                }]
            };
            myChart.setOption(option);

        } else {
            alert('无法加载该地图');
        }
    });
}