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
    <title>传输有效率(统计六家平均值)</title>
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
        .ui-autocomplete { z-index:2147483647; }
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
                                <input class="form-control" size="16" id="start_createTime"  type="text" value="" readonly placeholder="开始时间">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                            -
                            <div class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm" data-link-field="sendTime">
                                <input class="form-control" size="16" id="end_createTime"  type="text" value="" readonly placeholder="结束时间">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>
                    </form>
                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i class="btnIcon query-icon"></i><span>查询</span></button>
                <button type="button" class="btn btn-default" onclick="resetQuery()"><i class="glyphicon glyphicon-repeat"></i><span>重置</span></button>
    </div>
    <div class="tableBox">
        <div class="chart-box">
            <div class="chart-list">
                <ul class="clearfix">
                    <li id="columnBtn" data-checked="1"><a href="javascript:;">柱状图</a></li>
                    <li  id="pieBtn" data-checked="2"><a href="javascript:;">饼状图</a></li>
                    <li id="lineBtn" data-checked="3"><a href="javascript:;">折线图</a></li>
                </ul>
            </div>
            <div id="container" style="min-width:100%;min-height:100%;text-align: center;width:90%;"></div>
        </div>
        </div>
        </div>
    </div>
</div>

<%--传输有效率列表--%>
<div class="modal fade" id="transportListForm" data-backdrop="static" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 1017px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">传输有效率列表</h4>
            </div>
            <div class="modal-body">
                <div class="tableBox">
                    <table id="transportTable" class="table table-striped table-responsive">
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="closeBtn" class="btn btn-default btn-cancel" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>


<script src="${pageContext.request.contextPath}/container/gov/statistics/scripts/transport_efficient_statistics.js"></script>
<script type="text/javascript">
    $('.modal-body').attr('style','max-height: '+pageUtils.getFormHeight()+'px;overflow-y: auto;overflow-x: hidden;padding:10px;');
    $( function() {

        $( "#s_name" ).autocomplete({
            source: function( request, response ) {
                $.ajax( {
                    url: rootPath + "/action/S_enterprise_Enterprise_list.action",
                    dataType: "json",
                    type:'post',
                    data: {
                        name: request.term
                    },
                    success: function( data ) {
                        for(var i = 0;i<data.rows.length;i++){
                            console.log(data.rows[i].name);
                            var result = [];
                            for(var i = 0; i <  data.rows.length; i++) {
//                                result.push(data.rows[i].name);
                                var ui={};
                                ui.id=data.rows[i].id;
                                ui.value=data.rows[i].name;
                                result.push(ui);
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
