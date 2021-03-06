<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%--<jsp:include page="/common/common_include.jsp" flush="true"/>--%>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8">
    <title>污染源实时监控</title>
</head>
<body>
<div class="content content1 clearfix">
    <div class="wrap">
        <div class="mainBox">
            <a id="headTitle" href="javascript:void(0)" class="list-group-item active" style="cursor: default;z-index: 0">排污企业列表</a>
            <div class="dealBox">
                <div class="sideTitle left">
                        <span class="blueMsg" ><%--onclick="model.open()"--%>
                            <img class="tipImg" src="<%=request.getContextPath()%>/common/images/searchTip.png" alt=""/>
                            <span class="text">查询</span>
                        </span>
                </div>
                <div class="queryBox marginLeft0">
                    <form role="form" id="searchform">
                        <div class="form-inline">
                            <div class="form-group">
                                <label for="name">&nbsp;&nbsp;企业名称：</label><input type="text" id="name" name="name" class="form-control" />
                                <label for="status" class="labelMarginLeft">污染状态：</label>
                                <select style="width: 300px;" class="form-control" id="pollutantStatus" name="pollutantStatus">
                                    <option value="">全部</option>
                                    <option value="0">未超标</option>
                                    <option value="1">已超标</option>
                                    <option value="2">异常</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <p></p>
                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i class="btnIcon query-icon"></i><span>查询</span></button>
                <button id="resetSearch" type="button" class="btn btn-default queryBtn" ><i class="glyphicon glyphicon-repeat"></i><span>重置</span></button>
            </div>
            <div class="tableBox">
                <table id="table" class="table table-striped table-responsive">
                </table>
            </div>
        </div>
    </div>
</div>
<%--<%@include file="/common/msgSend/msgSend.jsp"%>--%>
<%--<%@include file="/common/gis/map_dialog.jsp"%>--%>
<%@include file="/container/gov/composite/enterprise_plotting.jsp" %>
<script type="text/javascript" src="<%=request.getContextPath()%>/container/gov/monitor/enterpriseMointor/scripts/mainMonitor.js"></script>
</body>
</html>
