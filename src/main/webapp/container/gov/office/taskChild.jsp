<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String parentTaskId = request.getParameter("parentTaskId");
    String role = request.getParameter("role");
%>
<!DOCTYPE html>
<html>
<head>
    <title>子任务</title>
    <style>
        #headTitle{
            overflow:hidden;
            vertical-align:middle;
        }
        #headTitle a{
            float:right;
            display:inline-block;
            text-decoration:none;
            text-align:center;
        }
        .tooltipSpan{
            cursor: pointer;
        }
    </style>
    <script>
        var parentTaskId='<%=parentTaskId==null?"":parentTaskId%>';
        var role='<%=role==null?"":role%>';
        var taskStatus="",taskRSV = false,reviewerRSV = false,feedbackerRSV = false;
        var parentEntity;
        $(function(){
            if(role.length>0){
                $('.creator').hide();
                $('.noCreator').show();
                taskStatus = '00';
                taskRSV = true;
                if(role=='reviewer'){
                    $('.reviewer').show();
                    $('.feedbacker').hide();
                    reviewerRSV = true;
                    //dispatchDutyLeaderId = userId;
                }else if(role=='feedbacker'){
                    $('.feedbacker').show();
                    $('.reviewer').hide();
                    feedbackerRSV = true;
                    //dispatchDutyDepartmentCode = orgCode;
                }
            }
            $.ajax({
                url: rootPath + "/action/S_office_Task_load.action",
                type:"post",
                data:{id:parentTaskId},
                dataType:"json",
                success:function(data){
                    if(data){
                        parentEntity = data;
                        $('#headTitle').show();
                        $('#headParentTaskName').html(parentEntity.taskName);
                    }
                }
            });
        })
        function backToParent(){
            var url = rootPath + "/container/gov/office/task.jsp?parentTaskId=" + parentEntity.parentTaskId+"&role="+role;
            pageUtils.toUrl(url);
        }
    </script>
</head>
<body>
<div class="content content1 clearfix">
    <div class="wrap">
        <div class="mainBox">
            <div id="headTitle" href="javascript:void(0)" class="list-group-item active" style="z-index: 0;cursor: default;font-size: 15px;display: none;">
                任务类型：<span id="headParentTaskName"></span>
                <a class="btn btn-info" href="javascript:backToParent()">
                    <span class="glyphicon glyphicon-backward"></span> 返回
                </a>
            </div>
            <div class="dealBox">
                <div class="sideTitle left">
                        <span class="blueMsg">
                            <img class="tipImg" src="<%=request.getContextPath()%>/common/images/searchTip.png" alt=""/>
                            <span class="text">查询</span>
                        </span>
                </div>
                <div class="queryBox marginLeft0">
                        <form >
                            <div class="form-inline">
                                <div class="form-group">
                                    <label for="">任务名称：</label> <input type="text" name="taskName" style="width: 242px;" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="taskStatus">&nbsp;任务状态：</label>
                                    <select id="taskStatus" name="taskStatus" class="form-control" style="width: 170px;">
                                        <option class="creator" value="">全部</option>
                                        <option class="noCreator" style="display: none;" value="00">全部</option>
                                        <option class="creator" value="0">未发布</option>
                                        <option value="1">未完成</option>
                                        <option value="2">已完成</option>
                                        <option value="3">已办结</option>
                                    </select>
                                </div>
                            </div>
                            <p></p>
                            <div class="form-inline">
                                <div class="form-group">
                                    <label for="">发布时间：</label>
                                    <div id="" class="input-group date form_datetime searDate" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                        <input class="form-control" size="16" name="start_publishTime"  type="text" value="" readonly>
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                    </div>
                                    -
                                    <div class="input-group date form_datetime searDate" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                        <input class="form-control" size="16" name="end_publishTime" type="text" value="" readonly>
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    <p></p>
                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i class="btnIcon query-icon"></i><span>查询</span></button>
                <button id="searchFix" type="button" class="btn btn-default queryBtn" ><i class="glyphicon glyphicon-repeat"></i><span>重置</span></button>
                <p class="btnListP">
                    <button id="add" type="button" class="btn btn-sm btn-success creator" data-toggle="modal" data-target="#taskChildForm">
                        <i class="btnIcon add-icon"></i><span>新增子任务</span>
                    </button>
                    <button id="update" type="button" class="btn btn-sm btn-warning creator">
                        <i class="btnIcon edit-icon"></i><span>修改</span>
                    </button>
                    <button id="remove" type="button" class="btn btn-sm btn-danger creator">
                        <i class="btnIcon delf-icon"></i><span>删除</span>
                    </button>
                    <button id="overBtn" type="button" class="btn btn-sm btn-info creator">
                        <i class="glyphicon glyphicon-floppy-saved"></i><span>办结</span>
                    </button>
                    <%--<button id="addFeedback" type="button" style="display: none;" class="btn btn-sm btn-success feedbacker" data-toggle="modal" data-target="#feedbackForm">
                        <i class="btnIcon add-icon"></i><span>新增反馈</span>
                    </button>--%>
                </p>
            </div>
            <div class="tableBox">
                <table id="table" class="table table-striped table-responsive">
                </table>
            </div>
        </div>
    </div>
</div>

<!--添加表单-->
<div class="modal fade" id="taskChildForm" data-backdrop="static" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 903px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <%--<label for="" class="col-sm-2 control-label">年度任务<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="firstTaskName" name="firstTaskName" class="form-control" readonly
                                   data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>--%>
                        <label for="" class="col-sm-2 control-label">任务类型<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="hidden" id="parentTaskId" name="parentTaskId" class="form-control"/>
                            <input type="text" id="parentTaskName" name="parentTaskName" class="form-control" readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">工作任务<span class="text-danger">*</span>：</label>
                        <div class="col-sm-10">
                            <input type="hidden" id="id" name="id">
                            <textarea type="text" rows="4" id="taskContent" name="taskContent" class="form-control"
                                   data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">完成时限<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <div class="input-group date form_datetime editDatetime" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="sendTime">
                                <input class="form-control" size="16" id="taskDeadline" name="taskDeadline" type="text" value="" data-message="不能为空"
                                       data-easytip="position:top;class:easy-red;" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dutyLeader" class="col-sm-2 control-label">责任领导<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="dutyLeader" name="dutyLeader" class="form-control"
                                   data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="dutyDepartment" class="col-sm-2 control-label">责任单位<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="dutyDepartment" name="dutyDepartment" class="form-control"
                                   data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dispatchDutyLeader" class="col-sm-2 control-label">调度责任领导<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" readonly id="dispatchDutyLeader" name="dispatchDutyLeader" class="form-control"
                                   data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"/>
                        </div>
                        <label for="dispatchDutyDepartment" class="col-sm-2 control-label">调度责任科室<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" readonly id="dispatchDutyDepartment" name="dispatchDutyDepartment" class="form-control"
                                   data-message="不能为空"
                                   data-easytip="position:top;class:easy-red;"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="warnFrequency" class="col-sm-2 control-label">提醒频次<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select class="form-control" id="warnFrequency" name="warnFrequency">
                                <option value="30">一月一次</option>
                                <option value="15">半月一次</option>
                                <option value="7">一周一次</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="taskRemark" class="col-sm-2 control-label">任务备注：</label>
                        <div class="col-sm-10">
                            <textarea type="text" rows="3" id="taskRemark" name="taskRemark" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">附件</label>
                        <div class="col-sm-10">
                            <input type="hidden" id="removeId" name="removeId" class="form-control">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp" flush="false" ></jsp:include>
                            <div id="fine-uploader-gallery"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-warning needHide" id="publish">发布</button>
                <button type="button" class="btn btn-primary" id="save">保存</button>
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<%--反馈表单--%>
<div class="modal fade" id="feedbackForm" style="z-index: 9999;" data-backdrop="static" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 903px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">任务进展情况<span class="text-danger">*</span>：</label>
                        <div class="col-sm-10">
                            <input type="hidden" id="feedbackId" name="id" class="form-control">
                            <textarea type="text" rows="4" id="feedbackContent" name="feedbackContent" class="form-control"
                                      data-message="不能为空"
                                      data-easytip="position:top;class:easy-red;"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">上报材料：</label>
                        <div class="col-sm-10">
                            <div id="feedback-uploader-gallery"></div>
                        </div>
                    </div>
                    <div id="reviewDiv" style="display: none;">
                        <div class="modal-header" style="margin-bottom: 15px;">
                            <h4 class="modal-title">审核信息</h4>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">审核状态<span class="text-danger">*</span>：</label>
                            <div class="col-sm-4">
                                <select class="form-control review" id="reviewStatus" name="reviewStatus">
                                    <option value="2">通过</option>
                                    <option value="3">不通过</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">审核意见<span class="text-danger">*</span>：</label>
                            <div class="col-sm-10">
                            <textarea type="text" rows="4" id="reviewOpinion" name="reviewOpinion" class="form-control review"
                                      data-message="不能为空"
                                      data-easytip="position:top;class:easy-red;"
                            ></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success reviewer" id="feedbackFormReviewBtn">确定</button>
                <button type="button" class="btn btn-success feedbacker" id="feedbackFormSubBtn">提交</button>
                <button type="button" class="btn btn-primary feedbacker" id="feedbackFormSaveBtn">保存</button>
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="feedbackListModal" style="z-index: 9000;" data-backdrop="static" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 900px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">反馈列表</h4>
            </div>
            <div class="modal-body">
                <div class="tableBox">
                    <table id="feedbackTable" class="table table-striped table-responsive">
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/container/gov/office/scripts/taskChild.js"></script>
</body>
</html>
