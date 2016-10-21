<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/12
  Time: 18:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>执法统计</title>
    <style type="text/css">
        .chart-list {
            text-align: center;
            height: 42px;
        }
        .chart-list li {
            float: left;
            width: 33.33%;
            height: 100%;
        }

    </style>

</head>
<body>
<div class="content content1 clearfix">
    <div class="wrap">
        <div class="mainBox">
            <div class="dealBox">
                <div class="sideTitle left">
                        <span class="blueMsg">
                            <img class="tipImg" src="<%=request.getContextPath()%>/common/images/searchTip.png" alt=""/>
                            <span class="text">查询</span>
                        </span>
                </div>
                <div class="queryBox marginLeft0">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="s_name" class="ui-widget">企业名称：</label> <input type="text" id="s_name" style="width: 180px;" class="form-control" />
                            <%--<input id="selCompanyBtn" style="color: #fff;background-color: #449d44;border-color: #398439; width:15%;" type="button" value="选择" class="form-control" data-toggle="modal" data-target="#demoForm"/>--%>
                        </div>
                        <div class="form-group">
                            <label for="">日期：</label>
                            <div id="datetimepicker1" class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm" data-link-field="sendTime">
                                <input class="form-control" size="16" id="start_createTime"  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                            -
                            <div class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm" data-link-field="sendTime">
                                <input class="form-control" size="16" id="end_createTime"  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>
                    </form>
                    <p></p>
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="">执法类型：</label>
                            <select class="form-control" name="" id="">
                                <option value="1">信访</option>
                                <option value="2">例行检查</option>
                                <option value="3">12369</option>
                                <option value="4">区长热线</option>
                                <option value="5">市长热线</option>
                            </select>

                        </div>
                    </form>
                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i class="btnIcon query-icon"></i><span>查询</span></button>
            </div>
        <div class="tableBox">
            <div class="chart-box">
                <div class="chart-list">
                    <ul class="clearfix">
                        <li id="columnBtn"><a href="javascript:;">柱状图</a></li>
                        <li  id="pieBtn"><a href="javascript:;">饼状图</a></li>
                        <li id="lineBtn"><a href="javascript:;">折线图</a></li>
                    </ul>
                </div>
                <div id="container" style="min-width:100%;min-height:100%;text-align: center;width:90%;"></div>
                <%--<div class="chart-content">--%>
                    <%--<div class="chartBox chartBox1">--%>
                        <%--<div class="chart">--%>
                            <%--<img src="<%=request.getContextPath()%>/common/images/tree/chart1.png" alt=""/>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                    <%--<div class="chartBox chartBox2">--%>
                        <%--<div class="chart">--%>
                            <%--<img src="<%=request.getContextPath()%>/common/images/tree/chart2.png" alt=""/>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                    <%--<div class="chartBox chartBox3">--%>
                        <%--<div class="chart">--%>
                            <%--<img src="<%=request.getContextPath()%>/common/images/tree/chart3.png" alt=""/>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="<%=request.getContextPath()%>/container/gov/statistics/scripts/law_statistics.js"></script>
<script type="text/javascript">
    $( function() {

        $( "#s_name" ).autocomplete({
            source: function( request, response ) {
                $.ajax( {
                    url: rootPath + "/action/S_enterprise_Enterprise_list.action",
                    dataType: "json",
                    data: {
                        name: request.term
                    },
                    success: function( data ) {
                        for(var i = 0;i<data.rows.length;i++){
                            console.log(data.rows[i].name);
                            var result = [];
                            for(var i = 0; i <  data.rows.length; i++) {
                                result.push(data.rows[i].name);
                            }
                            response( result);
                        }
                    }
                } );
            },
        } );
    } );

</script>

</body>
</html>
