/**
 * Created by Administrator on 2016/10/13.
 */
//@ sourceURL=excessive_ratio.js
$(function(){

    var highchartLeft = $("#panel-left");
    var highchartRight = $("#panel-right");
    var highchart1 = $("#container1");
    var highchart2 = $("#container2");

    //默认获取上半年时间，和去年上半年时间
    var year = new Date().getFullYear();
    var startXdate = year-1 + '-'+ '01' + '-'+ '01';
    var lastXdate = year-1 + '-'+ '06' + '-'+ '30';
    var startSdate = year +　'-'+'01' + '-'+'01';
    var lastSdate = year + '-'+ '06' + '-'+ '30';

    //初始化日期组件
    $('.form_datetime1').datetimepicker({
        language:   'zh-CN',
        autoclose: 1,
        startView: 3,//月视图
        minView: 3,
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked'
    });
    /**
     * 设定日期选项在同一年
     */
    $("#start_createTime").bind("change",function () {
        var startTime = $(this).val();
        if (!startTime) {
            return;
        }
        var year = startTime.substr(0, 4);
        var years = parseInt(year) +1;
        var month = parseInt(startTime.substr(5, 2));
        var endTimeStartMonth = month;
        if (month == 12) {
            endTimeStartMonth = month;
        }else{
            endTimeStartMonth = month+3
        }
        $('.form_datetime2').datetimepicker('setStartDate', year+"-"+endTimeStartMonth);
        $('.form_datetime2').datetimepicker('setEndDate', years+"-"+"01");
    });

    $("#startTime").bind('change',function(){
        var nowYear = $("#startTime").val();
        $("#endtime").val(nowYear-1);

    });
 
    $('.form_datetime2').datetimepicker({
        language:   'zh-CN',
        startView: 3,//月视图
        minView: 3,
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked'
    });



    $('.form_datetimes').datetimepicker({
        language:   'zh-CN',
        autoclose: 1,
        startView: 4,//月视图
        minView: 4

    });


    //执行初始化
    initPage();
    var valueChart = '1';

    function initPage(){
        $('#columnBtn').css('background','#0099FF');
        // getColumnRatio();
        search(valueChart,'',startXdate,lastXdate,startSdate,lastSdate);

    }


    //查询按钮
    $("#search").bind('click',function(){
        var name = $("#s_name").val();
        var startTime = $("#start_createTime").val();
        var endTime = $("#end_createTime").val();
        if(startTime!=""){
            startSdate = startTime;
        }
        if(endTime!=""){
            lastSdate = endTime;
        }
        var dateStr = startSdate;
        var arr = dateStr.split("-");
        var lastDate = new Date(parseInt(arr[0])-1, parseInt(arr[1])-1);
        var lastMonth = lastDate.getMonth()+1;
        if (lastMonth < 10) {
            lastMonth = "0" + lastMonth;
        }
        var startXdate = lastDate.getFullYear() + "-" + lastMonth;

        var dateLtr2 = lastSdate;
        var arr2 = dateLtr2.split("-");
        var lastDate2 = new Date(parseInt(arr2[0])-1, parseInt(arr2[1])-1);
        var lastMonth2 = lastDate2.getMonth()+1;
        if (lastMonth2 < 10) {
            lastMonth2 = "0" + lastMonth2;
        }
        var lastXdate = lastDate2.getFullYear() + "-" + lastMonth2;

        search(valueChart,name,startXdate,lastXdate,startSdate,lastSdate);

    });


    function search(valueChart,name,startXdate,lastXdate,startSdate,lastSdate){
        if(valueChart == '2'){
            getPieRatio1(name,startXdate,lastXdate,startSdate,lastSdate);
            getPieRatio2(name,startXdate,lastXdate,startSdate,lastSdate);
        }else if(valueChart == '3'){
            getLineRatio(name,startXdate,lastXdate,startSdate,lastSdate);
        }else{
            getColumnRatio(name,lastXdate,lastSdate,startSdate,lastSdate);
        }
    }

    //同期对比上半年按钮
    $("#sbYear").bind('click',function(){
       var year = $("#startTime").val();
        var startXdate = year-1 + '-'+ '01' + '-'+ '01';
        var lastXdate = year-1 + '-'+ '06' + '-'+ '30';
        var startSdate = year +　'-'+'01' + '-'+'01';
        var lastSdate = year + '-'+ '06' + '-'+ '30';
        search(valueChart,'',startXdate,lastXdate,startSdate,lastSdate);
    });

    //同期对比下半年按钮查询
    $("#xbYear").bind('click',function(){
        var year = $("#startTime").val();
        var startXdate = year-1 + '-'+ '07' + '-'+ '01';
        var lastXdate = year-1 + '-'+ '12' + '-'+ '31';
        var startSdate = year +　'-'+'07' + '-'+'01';
        var lastSdate = year + '-'+ '12' + '-'+ '31';
        search(valueChart,'',startXdate,lastXdate,startSdate,lastSdate);
    });


    
    //柱状图按钮
    $("#columnBtn").bind('click',function(){
        valueChart = $("#columnBtn").attr("data-checked");
        $('#columnBtn').css('background','#0099FF');
        $("#pieBtn").css('background','#fff');
        $("#lineBtn").css('background','#fff');
        search(valueChart,'',startXdate,lastXdate,startSdate,lastSdate);
    });


    //饼状图按钮
    $("#pieBtn").bind('click',function(){
        valueChart = $("#pieBtn").attr("data-checked");
        $("#pieBtn").css('background','#0099FF');
        $('#columnBtn').css('background-color','#fff');
        $("#lineBtn").css('background','#fff');
        search(valueChart,'',startXdate,lastXdate,startSdate,lastSdate);

    });

    //线状图按钮
    $("#lineBtn").bind('click',function(){
        valueChart = $("#lineBtn").attr("data-checked");
        $('#columnBtn').css('background','#fff');
        $("#pieBtn").css('background','#fff');
        $("#lineBtn").css('background','#0099FF');
        search(valueChart,'',startXdate,lastXdate,startSdate,lastSdate);
    });
    //柱状图获取后台数据
    function getColumnRatio(name,startXdate,lastXdate,startSdate,lastSdate){
        // var categories = ["1月","2月","3月","4月","5月","6月"];
        // var series = [];
        //
        // var tYear = {name: "2015年上半年", data: [1,2,3,3,4,3.55]};
        // var yYear = {name: "2016年上半年", data: [2,3,1.2,4.5,3.7,2.8]};
        // series.push(tYear);
        // series.push(yYear);
        // loadColumnChart(categories, series);
        $.ajax({
            url:rootPath + "/action/S_port_PortStatusHistory_getColumnRatio.action",
            type:'post',
            data:{name:name,startSdate:startSdate,lastSdate:lastSdate},
            dataType:'json',
            success:function(data) {
                var categories = data.x;
                var series = [];
                var list = data.y1;
                var ylist = [];
                var list2 = data.y2;
                var ylist2 = [];
                if (list && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        ylist.push(parseInt(list[i]));
                    }
                }
                if (list2 && list.length > 0) {
                    for (var i = 0; i < list2.length; i++) {
                        ylist2.push(parseInt(list2[i]));
                    }
                }
                var preMonth = [];//定义查询月份的数组
                var preValue1 = [];//定义对应月份为0的一组数据
                var preValue2 = [];//定义对应月份为0的一组数据

                var startMonth = startSdate.substring(5, 7);
                if (startMonth < 10) {
                    var sMonth = startMonth.substring(1)
                } else {
                    sMonth = startMonth;
                }
                var endMonth = lastSdate.substring(5, 7);
                if (endMonth < 10) {
                    var lasMonth = endMonth.substring(1);
                } else {
                    lasMonth = endMonth
                }
                for (var i = parseInt(sMonth); i <= parseInt(lasMonth); i++) {
                    preMonth.push(i);
                    preValue1.push(0);
                    preValue2.push(0);
                }
                var month = categories;//后台取出的2组数据
                var value = ylist;
                var arr_value = ylist2;
                if (month && month.length > 0) {
                    for (var i = 0; i < month.length; i++) {
                        var m = month[i];
                        for (var j = 0; j < preMonth.length; j++) {
                            if (m == preMonth[j]) {
                                preValue1[j] = value[i];
                            }
                        }
                        for (var k = 0; k < preMonth.length; k++) {
                            if (m == preMonth[k]) {
                                preValue2[k] = arr_value[i];
                            }
                        }

                    }
                }
                var series1 = {name: "上一年同期超标次数", color: 'rgb(124, 181, 236)', data: preValue1};
                var series2 = {name: "当前年份超标次数", color: '#FF8800', data: preValue2};
                series.push(series1);
                series.push(series2);
                loadColumnChart(preMonth, series,startSdate,lastSdate);
            }
        });
    }
    //饼状图获取后台数据
    function getPieRatio1(name,startXdate,lastXdate,startSdate,lastSdate){
       $.ajax({
           url:rootPath + "/action/S_port_PortStatusHistory_getColumnRatio.action",
           type:'post',
           data:{name:name,startSdate:startSdate,lastSdate:lastSdate},
           dataType:'json',
           success:function(data) {
               var categories = data['x'];
               var series1 = data['y1'];
               var series = [{
                   name:"超标次数:(次)",
                   data:[]
               }];
               var preMonth = [];//定义查询月份的数组
               var preValue = [];//定义对应月份为0的一组数据

               var startMonth= startSdate.substring(5,7);
               if(startMonth < 10){
                   var sMonth = startMonth.substring(1)
               }else{
                   sMonth = startMonth;
               }
               var endMonth= lastSdate.substring(5,7);
               if(endMonth <10){
                   var lasMonth = endMonth.substring(1);
               }else{
                   lasMonth = endMonth
               }

               for(var i =  parseInt(sMonth); i <=  parseInt(lasMonth); i++){
                   preMonth.push(i);
                   preValue.push(0);
               }
               console.log(preMonth);
               console.log(preValue);
               var month = categories;//后台取出的2组数据
               var value = series1;
               if(month && month.length>0){
                   for(var i = 0; i < month.length;i++){
                       var m = month[i];
                       for (var j = 0; j < preMonth.length; j++){
                           if (m == preMonth[j]) {
                               preValue[j] = value[i];
                           }
                       }

                   }
               }
               console.log(preMonth);
               console.log(preValue);

               for (var i = 0; i < preValue.length; i++) {

                   series[0].data.push({name:preMonth[i],y: parseInt(preValue[i])});
               }
               loadPieChart1(series,startXdate,lastXdate);
           }
       });

    }

    function getPieRatio2(name,startXdate,lastXdate,startSdate,lastSdate){
        $.ajax({
            url:rootPath + "/action/S_port_PortStatusHistory_getColumnRatio.action",
            type:'post',
            data:{name:name,startSdate:startSdate,lastSdate:lastSdate},
            dataType:'json',
            success:function(data) {
                var categories = data['x'];
                var series1 = data['y2'];
                var series = [{
                    name:"超标次数:(次)",
                    data:[]
                }];

                var preMonth = [];//定义查询月份的数组
                var preValue = [];//定义对应月份为0的一组数据
                var startMonth= startSdate.substring(5,7);
                if(startMonth < 10){
                    var sMonth = startMonth.substring(1)
                }else{
                    sMonth = startMonth;
                }
                var endMonth= lastSdate.substring(5,7);
                if(endMonth <10){
                    var lasMonth = endMonth.substring(1);
                }else{
                    lasMonth = endMonth
                }

                for(var i =  parseInt(sMonth); i <=  parseInt(lasMonth); i++){
                    preMonth.push(i);
                    preValue.push(0);
                }
                console.log(preMonth);
                console.log(preValue);
                var month = categories;//后台取出的2组数据
                var value = series1;
                if(month && month.length>0){
                    for(var i = 0; i < month.length;i++){
                        var m = month[i];
                        for (var j = 0; j < preMonth.length; j++){
                            if (m == preMonth[j]) {
                                preValue[j] = value[i];
                            }
                        }

                    }
                }
                console.log(preMonth);
                console.log(preValue);

                for (var i = 0; i < preValue.length; i++) {

                    series[0].data.push({name:preMonth[i],y: parseInt(preValue[i])});
                }
                loadPieChart2(series,startSdate,lastSdate);
            }
        });


    }


    //线状图获取后台数据
    function  getLineRatio(name,startXdate,lastXdate,startSdate,lastSdate){
        // var categories = ["1月","2月","3月","4月","5月","6月"];
        // var series = [];
        //
        // var tYear = {name: "20165年上半年", data: [1,2,3,3,4,3.55]};
        // var yYear = {name: "2016年上半年", data: [2,3,1.2,4.5,3.7,2.8]};
        // series.push(tYear);
        // series.push(yYear);
        $.ajax({
            url:rootPath + "/action/S_port_PortStatusHistory_getColumnRatio.action",
            type:'post',
            data:{name:name,startSdate:startSdate,lastSdate:lastSdate},
            dataType:'json',
            success:function(data) {
                var categories = data.x;
                var series = [];
                var list = data.y1;
                var ylist = [];
                var list2 = data.y2;
                var ylist2 = [];
                if (list && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        ylist.push(parseInt(list[i]));
                    }
                }
                if (list2 && list.length > 0) {
                    for (var i = 0; i < list2.length; i++) {
                        ylist2.push(parseInt(list2[i]));
                    }
                }
                var preMonth = [];//定义查询月份的数组
                var preValue1 = [];//定义对应月份为0的一组数据
                var preValue2 = [];//定义对应月份为0的一组数据
                var startMonth = startSdate.substring(5, 7);
                if (startMonth < 10) {
                    var sMonth = startMonth.substring(1)
                } else {
                    sMonth = startMonth;
                }
                var endMonth = lastSdate.substring(5, 7);
                if (endMonth < 10) {
                    var lasMonth = endMonth.substring(1);
                } else {
                    lasMonth = endMonth
                }
                for (var i =  parseInt(sMonth); i <=  parseInt(lasMonth); i++) {
                    preMonth.push(i);
                    preValue1.push(0);
                    preValue2.push(0);
                }
                var month = categories;//后台取出的2组数据
                var value = ylist;
                var arr_value = ylist2;
                if (month && month.length > 0) {
                    for (var i = 0; i < month.length; i++) {
                        var m = month[i];
                        for (var j = 0; j < preMonth.length; j++) {
                            if (m == preMonth[j]) {
                                preValue1[j] = value[i];
                            }
                        }
                        for (var k = 0; k < preMonth.length; k++) {
                            if (m == preMonth[k]) {
                                preValue2[k] = arr_value[i];
                            }
                        }

                    }
                }
                var series1 = {name: "上一年同期超标次数", color: 'rgb(124, 181, 236)', data: preValue1};
                var series2 = {name: "当前年份超标次数", color: '#FF8800', data: preValue2};
                series.push(series1);
                series.push(series2);
                loadLineChart(preMonth, series,startSdate,lastSdate);
            }
            
        });
        

    }


    //柱状图highchart
    function loadColumnChart(categories,series,startSdate,lastSdate){
        if(startSdate == '2016-01-01'){
            titleSub = '2015年上半年与2016年上半年超标统计对比分析'
        }else{
            titleSub = startSdate+'至'+lastSdate+'同期超标统计对比分析';
        }
        highchartLeft.highcharts({
            chart: {
                type: 'column',
                margin: 75,
                options3d: {
//                        enabled: true,
                    enabled: false,
                    alpha: 10,
                    beta: 25,
                    depth: 70
                }
            },
            title: {
                text: titleSub
            },
            // subtitle: {
            //     text: 'Notice the difference between a 0 value and a null point'
            // },
            xAxis: {
                categories: categories,
                title: {
                    text: '月份'
                }
            },
            yAxis: {
                allowDecimals:false,//是否允许为小数
                min: 0,
                title: {
                    text: '超标次数(次)'
                }
            },
            exporting: {
                enabled:false
            },
            tooltip: {
                headerFormat: '<small>{point.key}月</small><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series : {
                    cursor: 'pointer',
                    events : {
                        click: function(e) {
                            console.log(e.point.category);
                            $("#excessiveRatioListForm").modal('show');
                            var year = startSdate.substr(0,4);
                            var month = parseInt(e.point.category);
                            if(month < 10){
                                month =  "0"+month;
                            }else{
                                month;
                            }
                            var firstTime = year + "-" + month + "-" + "01";
                            var d=new Date(year,month,0);
                            var lastTime =  year + "-" + month + "-"+d.getDate();
                            var year2 = year - 1;
                            var lastStartTime = year2 + "-" + month + "-" + "01";
                            var d=new Date(year,month,0);
                            var lastEndTime = year2 + "-" + month + "-"+d.getDate();

                            initlawTable(lastStartTime,lastEndTime,firstTime,lastTime);
                        }
                    }
                }
            },
            series:  series
        });

    }

    //饼状图1highchart
    function loadPieChart1(series,startXdate,lastXdate){
        if(startXdate == '2015-01-01'){
            titleSub = '2015年上半年超标统计对比分析'
        }else{
            titleSub = startXdate+'至'+lastXdate+'同期超标统计对比分析';
        }
        highchart1.highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: titleSub
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}月</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                },
                series : {
                    cursor: 'pointer',
                    events : {
                        click: function(e) {
                            console.log(e.point.name);
                            $("#excessiveRatioListForm2").modal('show');
                            var year = startSdate.substr(0,4);
                            var month = parseInt(e.point.name);
                            if(month < 10){
                                month =  "0"+month;
                            }else{
                                month;
                            }
                            
                            var year2 = year - 1;
                            var firstTime = year2 + "-" + month + "-" + "01";
                            var d=new Date(year,month,0);
                            var lastTime =  year2 + "-" + month + "-"+d.getDate();
                            initlawTable2(firstTime,lastTime);
                        }
                    }
                }
            },
            exporting: {
                enabled:false
            },
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<small>{point.key}月</small><table>',
                pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                '<td style="text-align: right"><b>{point.y} 次</b></td></tr>',
                footerFormat: '</table>',
                valueDecimals: 0
            },
            series:  series
        });

    }
    //饼状图2
    function loadPieChart2(series,startSdate,lastSdate){
        if(startSdate == '2016-01-01'){
            titleSub = '2016年上半年超标统计对比分析'
        }else{
            titleSub = startSdate+'至'+lastSdate+'同期超标统计对比分析';
        }
        highchart2.highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: titleSub
            },
            // subtitle: {
            //     text: 'Notice the difference between a 0 value and a null point'
            // },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}月</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                },
                series : {
                    cursor: 'pointer',
                    events : {
                        click: function(e) {
                            console.log(e.point.name);
                            $("#excessiveRatioListForm2").modal('show');
                            var year = startSdate.substr(0,4);
                            var month = parseInt(e.point.name);
                            if(month < 10){
                                month =  "0"+month;
                            }else{
                                month;
                            }

                            var firstTime = year + "-" + month + "-" + "01";
                            var d=new Date(year,month,0);
                            var lastTime = year + "-" + month + "-"+d.getDate();

                            initlawTable2(firstTime,lastTime);
                        }
                    }
                }
            },
            exporting: {
                enabled:false
            },
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<small>{point.key}月</small><table>',
                pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                '<td style="text-align: right"><b>{point.y} 次</b></td></tr>',
                footerFormat: '</table>',
                valueDecimals: 0
            },

            series:  series
        });

    }

    

    
    //线状图highchart
    function loadLineChart(categories, series,startSdate,lastSdate){
        if(startSdate == '2016-01-01'){
            titleSub = '2015年上半年与2016年上半年超标统计对比分析'
        }else{
            titleSub = startSdate+'至'+lastSdate+'同期超标统计对比分析';
        }
        highchartRight.highcharts({
            chart: {
                type: 'line',
                margin: 75,
                options3d: {
                    enabled: false,
                    alpha: 10,
                    beta: 25,
                    depth: 70
                }
            },
            title: {
                text: titleSub
            },
            // subtitle: {
            //     text: 'Notice the difference between a 0 value and a null point'
            // },
            plotOptions: {
                line: {
                    depth: 25,
                    dataLabels: {
                        enabled: true
                    }
                },
                series : {
                    cursor: 'pointer',
                    events : {
                        click: function(e) {
                            console.log(e.point.category);
                            $("#excessiveRatioListForm").modal('show');
                            var year = startSdate.substr(0,4);
                            var month = parseInt(e.point.category);
                            if(month < 10){
                                month =  "0"+month;
                            }else{
                                month;
                            }
                            var firstTime = year + "-" + month + "-" + "01";
                            var d=new Date(year,month,0);
                            var lastTime =  year + "-" + month + "-"+d.getDate();
                            var year2 = year - 1;
                            var lastStartTime = year2 + "-" + month + "-" + "01";
                            var d=new Date(year,month,0);
                            var lastEndTime = year2 + "-" + month + "-"+d.getDate();

                            initlawTable(lastStartTime,lastEndTime,firstTime,lastTime);
                        }
                    }
                }
            },
            xAxis: {
                categories: categories,
                title: {
                    text: '月份'
                }
            },
            yAxis: {
                allowDecimals:false,//是否允许为小数
                min: 0,
                title: {
                    text: '超标次数(次)'
                }
            },
            exporting: {
                enabled:false
            },
            tooltip: {
                headerFormat: '<small>{point.key}月</small><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series:  series
        });

    }


    /********************  查询超标异常记录列表 (柱状图)（线状图） ********************/
    var excessiveRatioTable = $('#excessiveRatioTable');
    function initlawTable(lastStartTime,lastEndTime,firstTime,lastTime) {
        excessiveRatioTable.bootstrapTable('destroy');
        excessiveRatioTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            sidePagination:"server",
            url: rootPath+"/action/S_port_PortStatusHistory_excessiveRatiolist.action?lastStartTime="+lastStartTime +"&lastEndTime="+lastEndTime+"&firstTime="+firstTime+"&lastTime="+lastTime+"&strStatus="+"1",
            method:'post',
            pagination:true,
            clickToSelect:true,//单击行时checkbox选中
            queryParams:pageUtils.localParams,
            columns: [
                {
                    title: '企业名称',
                    field: 'enterpriseName',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '排口编号',
                    field: 'portNumber',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '排口名称',
                    field: 'portName',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '超标时间',
                    field: 'time',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '监测指标',
                    field: 'pollutantName',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '超标值',
                    field: 'liveValue',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '标准值',
                    field: 'standardValue',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '状态',
                    field: 'portStatus',
                    editable: false,
                    sortable: false,
                    align: 'center',
                    formatter: statusFormatter
                }

            ]
        });
        // sometimes footer render error.
        setTimeout(function () {
            excessiveRatioTable.bootstrapTable('resetView');
        }, 200);

        $(window).resize(function () {
            // 重新设置表的高度
            excessiveRatioTable.bootstrapTable('resetView', {
                height: pageUtils.getTableHeight()
            });
        });
    }

    var statusType = {
        '1':'超标',
        '2':'异常'
    }
    function statusFormatter(value, row, index){
        return statusType[value];
    }


    /********************  查询超标异常记录列表（饼状图）  ********************/
    var excessiveRatioTable2 = $('#excessiveRatioTable2');
    function initlawTable2(firstTime,lastTime) {
        excessiveRatioTable2.bootstrapTable('destroy');
        excessiveRatioTable2.bootstrapTable({
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            sidePagination:"server",
            url: rootPath+"/action/S_port_PortStatusHistory_list.action?startTime="+firstTime+"&endTime="+lastTime+"&strStatus="+"1",
            method:'post',
            pagination:true,
            clickToSelect:true,//单击行时checkbox选中
            queryParams:pageUtils.localParams,
            columns: [
                {
                    title: '企业名称',
                    field: 'enterpriseName',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '排口编号',
                    field: 'portNumber',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '排口名称',
                    field: 'portName',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '超标时间',
                    field: 'time',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '监测指标',
                    field: 'pollutantName',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '超标值',
                    field: 'liveValue',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '标准值',
                    field: 'standardValue',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '状态',
                    field: 'portStatus',
                    editable: false,
                    sortable: false,
                    align: 'center',
                    formatter: statusFormatter
                }

            ]
        });
        // sometimes footer render error.
        setTimeout(function () {
            excessiveRatioTable2.bootstrapTable('resetView');
        }, 200);

        $(window).resize(function () {
            // 重新设置表的高度
            excessiveRatioTable2.bootstrapTable('resetView', {
                height: pageUtils.getTableHeight()
            });
        });
    }


});