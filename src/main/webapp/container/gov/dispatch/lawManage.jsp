<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>执法管理</title>
    <script src="<%=request.getContextPath()%>/common/scripts/dict.js"></script>

    <link href="<%=request.getContextPath()%>/common/scripts/ztree-3.5.24/metrStyle-cd/metroStyle.css" rel="stylesheet">

    <script src="<%=request.getContextPath()%>/common/scripts/ztree-3.5.24/jquery.ztree.all.js"></script>
    <script src="<%=request.getContextPath()%>/common/scripts/slimScroll/jquery.slimscroll.js"></script>
</head>
<style>

    .Node-frame-menubar {
        width: 227px;
        height: 500px;
        float: left;
        position: relative;
        left: 0px;
        border-right: 1px solid #e5e5e5;
        padding: 10px;
        color: #337ab7;
    }


</style>
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
                            <label for="enterpriseName">企业名称：</label> <input type="text" id="search_enterpriseName" name="search_enterpriseName" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="search_source">信息来源：</label>
                            <select id="search_source" name="search_source" class="form-control" style="width: 266px;">
                                <option value="1">12369</option>
                                <option value="2">区长热线</option>
                                <option value="3">市长热线</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="search_status">反馈状态：</label>
                            <select id="search_status" name="search_source" class="form-control" style="width: 266px;">
                                <option value="1">12369</option>
                                <option value="2">区长热线</option>
                                <option value="3">市长热线</option>
                            </select>
                        </div>
                    </form>
                    <p></p>
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="">事件时间：</label>
                            <div id="" class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="">
                                <input class="form-control" size="16" id="start_eventTime"  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                            -
                            <div class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                <input class="form-control" size="16" id="end_eventTime"  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="">所属区域：</label>
                            <div id="" class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                <input class="form-control" size="16" id=""  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                            -
                            <div class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                <input class="form-control" size="16" id=""  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>

                    </form>

                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i class="btnIcon query-icon"></i><span>查询</span></button>
                <p class="btnListP">
                    <button id="dealWith" type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#eventMsg">
                        <i class="btnIcon edit-icon"></i><span>处置</span>
                    </button>
                    <button id="feedback" type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#feedbackForm">
                        <i class="btnIcon edit-icon"></i><span>反馈</span>
                    </button>
                    <button id="overBtn" type="button" class="btn btn-sm btn-danger">
                        <i class="btnIcon delf-icon"></i><span>办结</span>
                    </button>
                </p>
            </div>
            <div class="tableBox">
                <table id="table" class="table table-striped table-responsive">
                </table>
            </div>
        </div>
    </div>
</div>



<!--查看已反馈状态表单-->
<div class="modal fade" id="feedbackStatusForm" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" style="width:842px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="">执法详情</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">事件时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input class="form-control" size="16" type="text" id="feedbackStatusForm_eventTime">
                        </div>

                        <label for="answer" class="col-sm-2 control-label">接电人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="feedbackStatusForm_answer" name="answer" class="form-control"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="enterpriseId" class="col-sm-2 control-label">企业名称<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select id="feedbackStatusForm_enterpriseId" name="enterpriseId" class="form-control">
                                <option value="1">aa</option>
                                <option value="2">bb</option>
                                <option value="3">cc</option>
                            </select>
                        </div>

                        <label for="source" class="col-sm-2 control-label">信息来源<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select id="feedbackStatusForm_source" name="source" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="blockLevelId" class="col-sm-2 control-label">所属网格<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select id="feedbackStatusForm_blockLevelId" name="blockLevelId" class="form-control">
                                <option value="1">网格级别1</option>
                                <option value="2">网格级别2</option>
                                <option value="3">网格级别3</option>
                            </select>
                        </div>

                        <label for="blockId" class="col-sm-2 control-label"></label>
                        <div class="col-sm-4">
                            <select id="feedbackStatusForm_blockId" name="blockId" class="form-control">
                                <option value="1">网格1</option>
                                <option value="2">网格2</option>
                                <option value="3">网格3</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="supervisor" class="col-sm-2 control-label">监管人员<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="feedbackStatusForm_supervisor" name="supervisor" class="form-control"/>
                        </div>

                        <label for="supervisorPhone" class="col-sm-2 control-label">联系方式<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="feedbackStatusForm_supervisorPhone" name="supervisorPhone" class="form-control"
                            />
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="senderName" class="col-sm-2 control-label">发送人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="feedbackStatusForm_senderName" name="senderName" class="form-control" disabled
                            />
                        </div>

                        <label for="sendTime" class="col-sm-2 control-label">发送时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="feedbackStatusForm_sendTime" name="sendTime" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="overValue" class="col-sm-2 control-label">超标值：</label>
                        <div class="col-sm-4">
                            <input type="text" id="feedbackStatusForm_overValue" name="overValue" class="form-control"
                            />
                        </div>

                        <label for="thrValue" class="col-sm-2 control-label">超标阀值：</label>
                        <div class="col-sm-4">
                            <input type="text" id="feedbackStatusForm_thrValue" name="thrValue" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="content" class="col-sm-2 control-label">事件内容：</label>
                        <div class="col-sm-10">
                            <textarea id="feedbackStatusForm_content" name="content" class="form-control" rows="4" cols="50" placeholder=""></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="sendRemark" class="col-sm-2 control-label">备注：</label>
                        <div class="col-sm-10">
                            <textarea id="feedbackStatusForm_sendRemark" name="sendRemark" class="form-control" rows="4" cols="50" placeholder=""></textarea>
                        </div>
                    </div>
                    <hr/>
                    <div class="modal-header">
                        <h4 class="modal-title" id="">执法记录-现场回传</h4>
                    </div>
                    <div class="tableBox">
                        <table id="tableStatus" class="table table-striped table-responsive">
                        </table>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!--查看反馈表单-->
<div class="modal fade" id="seeFeedbackForm" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabe3" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" style="width:842px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="">执执法记录-现场回传</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="lawerName" class="col-sm-2 control-label">现场执法人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="seeFeedbackForm_lawerName" name="lawerName" class="form-control"/>
                        </div>

                        <label for="phone" class="col-sm-2 control-label">联系方式<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="seeFeedbackForm_phone" name="phone" class="form-control"
                            />
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="exeTime" class="col-sm-2 control-label">执法时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input class="form-control" size="16" type="text" id="seeFeedbackForm_exeTime" name="exeTime" readonly>
                        </div>

                    </div>

                    <div class="form-group">
                        <label for="exeDesc" class="col-sm-2 control-label">执法详情：</label>
                        <div class="col-sm-10">
                            <textarea id="seeFeedbackForm_exeDesc" name="exeDesc" class="form-control" rows="4" cols="50" placeholder=""></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="attachment" class="col-sm-2 control-label">附件：</label>
                        <div class="col-sm-10">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp" flush="false" ></jsp:include>
                            <div id="fine-uploader-gallery3"></div>
                        </div>
                    </div>


                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!--反馈表单-->
<div class="modal fade" id="feedbackForm" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabe3" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" style="width:842px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="">执法反馈</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <input type="hidden" id="dispathId" name="dispathId">

                    <div class="form-group">
                        <label for="lawerName" class="col-sm-2 control-label">现场执法人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="lawerName" name="lawerName" class="form-control"/>
                        </div>

                        <label for="phone" class="col-sm-2 control-label">联系方式<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="phone" name="phone" class="form-control"
                            />
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="exeTime" class="col-sm-2 control-label">执法时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <div  class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="exeTime">
                                <input class="form-control" size="16" type="text" id="exeTime" name="exeTime" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>

                    </div>

                    <div class="form-group">
                        <label for="exeDesc" class="col-sm-2 control-label">执法详情：</label>
                        <div class="col-sm-10">
                            <textarea id="exeDesc" name="exeDesc" class="form-control" rows="4" cols="50" placeholder=""></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="attachment" class="col-sm-2 control-label">附件：</label>
                        <div class="col-sm-10">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp" flush="false" ></jsp:include>
                            <div id="fine-uploader-gallery2"></div>
                        </div>
                    </div>


                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="feedbackTo" data-toggle="modal" data-target="#feedbackForm">反馈</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!--事件信息-->
<div class="modal fade" id="eventMsg" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" style="width:842px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="demoFormTitle">事件信息</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <input type="hidden" id="id" name="id">
                    <input type="hidden" id="removeId" name="removeId">
                    <div class="form-group">
                        <label for="eventTime" class="col-sm-2 control-label">事件时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <div id="datetimepicker1" class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="eventTime">
                                <input class="form-control" size="16" type="text" id="eventTime" name="eventTime" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>

                        <label for="answer" class="col-sm-2 control-label">接电人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="answer" name="answer" class="form-control"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="enterpriseId" class="col-sm-2 control-label">企业名称<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select id="enterpriseId" name="enterpriseId" class="form-control">
                                <option value="1">aa</option>
                                <option value="2">bb</option>
                                <option value="3">cc</option>
                            </select>
                        </div>

                        <label for="source" class="col-sm-2 control-label">信息来源<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select id="source" name="source" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="blockLevelId" class="col-sm-2 control-label">所属网格<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select id="blockLevelId" name="blockLevelId" class="form-control">
                                <option value="1">网格级别1</option>
                                <option value="2">网格级别2</option>
                                <option value="3">网格级别3</option>
                            </select>
                        </div>

                        <label for="blockId" class="col-sm-2 control-label"></label>
                        <div class="col-sm-4">
                            <select id="blockId" name="blockId" class="form-control">
                                <option value="1">网格1</option>
                                <option value="2">网格2</option>
                                <option value="3">网格3</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="supervisor" class="col-sm-2 control-label">监管人员<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="supervisor" name="supervisor" class="form-control"/>
                        </div>

                        <label for="supervisorPhone" class="col-sm-2 control-label">联系方式<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="supervisorPhone" name="supervisorPhone" class="form-control"
                            />
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="senderName" class="col-sm-2 control-label">发送人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="senderName" name="senderName" class="form-control" disabled
                            />
                        </div>

                        <label for="sendTime" class="col-sm-2 control-label">发送时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="sendTime" name="sendTime" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="overValue" class="col-sm-2 control-label">超标值：</label>
                        <div class="col-sm-4">
                            <input type="text" id="overValue" name="overValue" class="form-control"
                            />
                        </div>

                        <label for="thrValue" class="col-sm-2 control-label">超标阀值：</label>
                        <div class="col-sm-4">
                            <input type="text" id="thrValue" name="thrValue" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="content" class="col-sm-2 control-label">事件内容：</label>
                        <div class="col-sm-10">
                            <textarea id="content" name="content" class="form-control" rows="4" cols="50" placeholder=""></textarea>
                        </div>
                    </div>
                    <hr/>
                    <div class="form-group">
                        <label for="sendRemark" class="col-sm-2 control-label">备注：</label>
                        <div class="col-sm-10">
                            <textarea id="sendRemark" name="sendRemark" class="form-control" rows="4" cols="50" placeholder=""></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="attachment" class="col-sm-2 control-label">附件：</label>
                        <div class="col-sm-10">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp" flush="false" ></jsp:include>
                            <div id="fine-uploader-gallery"></div>
                        </div>
                    </div>


                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="dispatch" >调度</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!--人员选择-->
<div class="modal fade" id="selectPeopleForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" style="width:882px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="demoFormTitle2">人员选择</h4>
                <input id="dispathTaskId" type="hidden"/>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="Node-frame-menubar">
                            <div class="scrollContent" >
                                <ul id="treeDemo1" class="ztree"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="mainBox">
                            <div class="tableBox">
                                <table id="selectPeopleTable" class="table table-striped table-responsive">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div class="modal-footer" style="clear: both;">
                <button type="button" class="btn btn-primary" id="sendTo" onclick="sendToBtn(2)" data-toggle="modal" data-target="#selectPeopleForm,#eventMsg">发送</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>




<script src="<%=request.getContextPath()%>/container/gov/dispatch/scripts/lawManage.js"></script>
<script src="<%=request.getContextPath()%>/container/gov/dispatch/scripts/selectPeople.js"></script>
<script src="<%=request.getContextPath()%>/common/scripts/map.js"></script>
</body>
</html>
