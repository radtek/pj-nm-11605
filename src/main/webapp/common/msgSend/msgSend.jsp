<%@ page language="java" pageEncoding="utf8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>发送</title>
    <link href="<%=request.getContextPath()%>/common/scripts/ztree-3.5.24/metrStyle-cd/metroStyle.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/common/scripts/ztree-3.5.24/jquery.ztree.all.js"></script>
    <script src="<%=request.getContextPath()%>/common/scripts/slimScroll/jquery.slimscroll.js"></script>
    <style type="text/css">
        .Node-frame-menubar {
            width: 100%;
            float: left;
            position: relative;
            left: 0px;
            border-right: 1px solid #e5e5e5;
            padding: 10px;
            color: #337ab7;
        }
        .highlight{background:#31b0d5;font-weight:bold;color:#31b0d5; font-size:24px;}
        .selectPeople {
            z-index: 2061;
        }
    </style>
</head>
<body>
<div id="msgSendBoday"></div>
<%--短信发送--%>
<div id="selectOrgPeopleDialog">
    <div class="modal fade selectPeople" id="[Id]" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" style="width:[width];min-width: 800px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">[title]</h4>
                </div>
                <div class="msg-modal-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="Node-frame-menubar" style="height: 450px;">
                                <div class="form-inline padd" style="padding-bottom: 0px;">
                                    <div class="input-group" style="margin-bottom: 0px;">
                                        <input type="text" id="[SearchInputId]" placeholder="请输入搜索条件"  class="form-control" style="font-size:12px"/>
                                        <span class="input-group-btn">
                                            <button id="[SearchBtnId]" type="button" class="btn btn-info">搜索</button>
                                        </span>
                                    </div>
                                </div>
                                <div class="scrollContent" id="[ScrollContent]">
                                    <ul id="[ChoseZtreeId]" class="ztree"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h3 class="panel-title" style="text-align: center">已选系统用户列表</h3>
                                        </div>
                                        <div class="mainBox">
                                            <div class="tableBox">
                                                <table id="[SelectTableId]" class="table table-striped table-responsive">
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="mainBox"  style="width: 100%">
                                <div class="tableBox">
                                    <table id="[SelectTableId]" class="table table-striped table-responsive">
                                    </table>
                                </div>
                            </div>--%>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary sendToButton" data-toggle="modal">[btnok]</button>
                    <button type="button" class="btn btn-default cancelButton" data-dismiss="modal">[btncl]</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
</div>

<div  id="selectContactsDialog">
    <div class="modal fade selectPeople" id="[Id]" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" style="width:[width];min-width: 800px;max-height: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">[title]</h4>
                </div>
                <div class="contact-modal-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="Node-frame-menubar" style="height: 550px;">
                                <div class="form-inline padd" style="padding-bottom: 0px;">
                                    <div class="input-group" style="margin-bottom: 0px;">
                                        <input type="text" id="[SearchInputId]" placeholder="请输入搜索条件"  class="form-control" style="font-size:12px"/>
                                        <span class="input-group-btn">
                                            <button id="[SearchBtnId]" type="button" class="btn btn-info">搜索</button>
                                        </span>
                                    </div>
                                </div>
                                <div class="scrollContent" id="[ScrollContent]">
                                    <ul id="[ChoseZtreeId]" class="ztree"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="form-horizontal" style="width: 100%;padding-right: 10px;">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-heading">
                                                <h3 class="panel-title" style="text-align: center">短信发送内容</h3>
                                            </div>
                                            <textarea id="[MsgContentsId]" class="form-control" rows="3" placeholder="请在这里填写需要发送短信的内容"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-heading">
                                                <h3 class="panel-title" style="text-align: center">已选列表</h3>
                                            </div>
                                            <div class="mainBox">
                                                <div class="tableBox">
                                                    <table id="[SelectTableId]" class="table table-striped table-responsive selectContactsTable">
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary sendToButton" data-toggle="modal">[btnok]</button>
                    <button type="button" class="btn btn-default cancelButton" data-dismiss="modal">[btncl]</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
</div>
<script src="<%=request.getContextPath()%>/common/msgSend/scripts/selectPeople.js"></script>
<script src="<%=request.getContextPath()%>/common/msgSend/scripts/jsMap.js"></script>
<script src="<%=request.getContextPath()%>/common/msgSend/scripts/orgCodeConfig.js"></script>
<script src="<%=request.getContextPath()%>/common/msgSend/scripts/selectTree.js"></script>
<%--<script src="<%=request.getContextPath()%>/common/msgSend/scripts/getpy.js"></script>--%>

</body>
</html>