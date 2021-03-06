<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>监察大队办公室</title>
    <%--<%@include file="/common/msgSend/msgSend.jsp"%>--%>
    <style>
        .ui-autocomplete { z-index:2147483647;}
    </style>
    <script>
        $('.modal-body').attr('style','max-height: '+pageUtils.getFormHeight()+'px;overflow-y: auto;overflow-x: hidden;padding:10px;');
    </script>
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
                    <%--<img id="imageabc12" alt="" src="/dshbcbp/common/images/user.jpg" style="width:100px;height: 88px;"/>--%>
                </div>
                <div class="queryBox marginLeft0">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="">举报对象：</label> <input type="text" id="search_enterpriseName" name="enterpriseName" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="search_source">信息来源：</label>
                            <select id="search_source" name="source" class="form-control caseSource" style="width: 266px;">
                                <option value="">全部</option>
                            </select>
                        </div>
                    </form>
                    <p></p>
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="">接电时间：</label>
                            <div class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                <input class="form-control" size="16" id="start_connTime" name="startConnTime"  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                            -
                            <div class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                <input class="form-control" size="16" id="end_connTime" name="endConnTime"  type="text" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>

                    </form>

                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i class="btnIcon query-icon"></i><span>查询</span></button>
                <button id="searchFix" type="button" class="btn btn-default queryBtn" ><i class="glyphicon glyphicon-repeat"></i><span>重置</span></button>
                <p class="btnListP">
                    <button id="add" type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#eventMsg">
                        <i class="btnIcon add-icon"></i><span>新建</span>
                    </button>
                    <%--<button id="update" type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#eventMsg">
                        <i class="btnIcon edit-icon"></i><span>处置</span>
                    </button>--%>
                    <button id="remove" type="button" class="btn btn-sm btn-danger">
                        <i class="btnIcon delf-icon"></i><span>删除</span>
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
                    <input type="hidden" id="status" name="status">
                    <div class="form-group">
                        <label for="eventTime" class="col-sm-2 control-label">事件时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <div id="datetimepicker1" class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd hh:ii">
                                <input class="form-control" size="16" type="text" value="" id="eventTime" name="eventTime" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>

                        <label for="answer" class="col-sm-2 control-label">接收人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="answer" name="answer" class="form-control"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="enterpriseName" class="col-sm-2 control-label">举报对象<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="enterpriseName" name="enterpriseName" class="form-control" data-message="举报对象不能为空"
                                   data-easytip="position:top;class:easy-red;"/>
                            <input type="hidden" id="enterpriseId" name="enterpriseId"/>
                        </div>

                        <label for="source" class="col-sm-2 control-label">信息来源<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select id="source" name="source" class="form-control caseSource">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">所属网格：</label>
                        <div class="col-sm-4">
                            <select id="blockLevelId" name="blockLevelId" class="form-control s_blockLevelId" style="display: none">
                            </select>
                            <select id="blockId" name="blockId" class="form-control s_blockId">
                            </select>
                        </div>

                        <label for="supervisor" class="col-sm-2 control-label">监管人员：</label>
                        <div class="col-sm-4">
                            <input type="text" id="supervisor" name="supervisor" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="informer" class="col-sm-2 control-label">举报人姓名：</label>
                        <div class="col-sm-4">
                            <input type="text" id="informer" name="informer" class="form-control"/>
                        </div>

                        <label for="informerPhone" class="col-sm-2 control-label">联系方式：</label>
                        <div class="col-sm-4">
                            <input type="text" id="informerPhone" name="informerPhone" class="form-control"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="content" class="col-sm-2 control-label">事件详情<span class="text-danger">*</span>：</label>
                        <div class="col-sm-10">
                            <textarea id="content" name="content" class="form-control" rows="4" cols="50" placeholder="" data-message="不能为空"
                                      data-easytip="position:top;class:easy-red;"></textarea>
                        </div>
                    </div>
                    <hr/>

                    <div class="form-group">
                        <label for="senderName" class="col-sm-2 control-label">处理人<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="senderName" name="senderName" class="form-control" data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>

                        <label for="" class="col-sm-2 control-label">联系方式<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="sendPhone" name="sendPhone" class="form-control" data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="attachment" class="col-sm-2 control-label">附件：</label>
                        <div class="col-sm-10">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp" flush="false" ></jsp:include>
                            <div id="fine-uploader-gallery" class="uploaderToggle aUploader"></div>
                        </div>
                    </div>


                </form>
            </div>
            <div class="modal-footer">
                <%--<input type="checkbox" id="isSendSms"><label for="isSendSms">同时发送短信</label>--%>
                <%--<button type="button" class="btn btn-primary" id="smsSend">短信发送</button>--%>
                <button type="button" class="btn btn-primary" id="save">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>



<!--查看 执法反馈列表-->
<div class="modal fade" id="feedbackListDialog" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 868px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="">执法反馈列表</h4>
            </div>
            <div class="tableBox">
                <table id="feedbackRecordTable" class="table table-striped table-responsive">
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<%--查看执法反馈详情--%>
<div class="modal fade" id="feedbackForm" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabe3" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" style="width:842px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="">执法反馈</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <input type="hidden" id="dispatchId" name="dispatchId">
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
                            <div  class="input-group date form_datetime lookover" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="exeTime">
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
                            <div id="fine-uploader-gallery" class="uploaderToggle bUploader"></div>
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

<%--新增现场监察--%>
<div class="modal fade" data-backdrop="static" id="addSiteMonitoringDialog" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 1111111">
    <div class="modal-dialog" style="width: 800px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title" id="">现场监察</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="enterpriseName" class="col-sm-2 control-label">企业名称<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="hidden" id="dispatchId_addSiteMonitoringDialog" name="dispatchId">
                            <input type="text" id="" name="enterpriseName" class="form-control"
                                   data-message="企业名称不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>

                        <label for="blockId" class="col-sm-2 control-label">所属网格<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="hidden" id="" name="blockLevelId" class="form-control s_blockLevelId">
                            <select id="" name="blockId" class="form-control s_blockId" data-message="所属网格不能为空"
                                    data-easytip="position:top;class:easy-red;">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="checkPeople" class="col-sm-2 control-label">监察人员<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="checkPeople" name="checkPeople" class="form-control"
                                   data-message="监察人员不为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="monitoringTime" class="col-sm-2 control-label">监察时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <div id="" class="input-group date form_datetime lookover" data-date="" data-date-format="yyyy-mm-dd">
                                <input class="form-control" id="monitoringTime" name="monitoringTime" size="16" type="text" value=""
                                       data-message="监察时间不能为空"
                                       data-easytip="position:top;class:easy-red;"
                                />
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="isNotProblem" class="col-sm-3 control-label">是否存在问题<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4 radio">
                            <label><input id="isNotProblem1" type="radio" value="1" name="isNotProblem" class="isRadio">是</label>
                            <label><input id="isNotProblem2" type="radio" value="2" name="isNotProblem" class="isRadio" checked>否</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="sendRemark" class="col-sm-2 control-label">初报：</label>
                        <div class="col-sm-10">
                            <textarea  id="sendRemark" name="sendRemark" class="form-control" rows="5"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="xuBao" class="col-sm-2 control-label">续报：</label>
                        <div class="col-sm-10">
                            <textarea  id="xuBao" name="xuBao" class="form-control" rows="5"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="attachmentIds" class="col-sm-2 control-label">初报附件：</label>
                        <div class="col-sm-10">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp" flush="false" ></jsp:include>
                            <div id="fine-uploader-gallery" class="uploaderToggle dUploader"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="attachment" class="col-sm-2 control-label">续报附件：</label>
                        <div class="col-sm-10">
                            <div id="fine-uploader-gallery2"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="save">保存</button>
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div class="modal fade" data-backdrop="static" id="siteMonitoringReportDialog" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 800px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title" id="">现场监察</h4>
            </div>
            <div class="modal-body">
                <div class="tableBox">
                    <table id="table_siteMonitoringReportDialog" class="table table-striped table-responsive">
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div class="modal fade" id="overDialog" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabe3" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" style="width:842px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="">查看办结</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="overTime" class="col-sm-2 control-label">办结时间<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="overTime" name="overTime" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="overSuggestion" class="col-sm-2 control-label">办结意见：</label>
                        <div class="col-sm-10">
                            <textarea id="overSuggestion" name="overSuggestion" class="form-control" rows="4" cols="50" placeholder="" disabled></textarea>
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
<%@include file="/common/paizhao/paizhao.jsp"%>
<script>
    pageUtils.appendOptionFromDictCode(".caseSource",{code:"caseSource"})
</script>
<script src="<%=request.getContextPath()%>/common/scripts/dict.js"></script>
<script src="<%=request.getContextPath()%>/common/scripts/uploaderUtil.js"></script>
<script src="<%=request.getContextPath()%>/container/gov/dispatch/scripts/loadBlockLevelAndBlockOption.js"></script>
<script src="<%=request.getContextPath()%>/container/gov/dispatch/scripts/monitorOffice.js"></script>
</body>
</html>
