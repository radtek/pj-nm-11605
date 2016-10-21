<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>会议通知系统</title>
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
                    <%--<p>--%>
                        <%--<label for="s_title">会议标题：</label> <input type="text" id="s_title" class="form-control" />--%>
                        <%--<label for="s_time">日期：</label> <input type="text" id="s_time" class="form-control" />--%>
                    <%--</p>--%>

                        <form class="form-inline">
                            <div class="form-group">
                                <label for="s_title">会议标题：</label> <input type="text" id="s_title" style="width: 180px;" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="s_time">日期：</label>
                                <div id="s_timeContent" class="input-group date form_datetime" data-date="" data-date-format="yyyy-mm-dd" data-link-field="time">
                                    <input class="form-control" size="16" id="s_time" name="s_time"  type="text" value="" readonly>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                </div>
                            </div>
                        </form>
                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i class="btnIcon query-icon"></i><span>查询</span></button>
                <p class="btnListP">
                    <button id="add" type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#scfForm">
                        <i class="btnIcon add-icon"></i><span>新建</span>
                    </button>
                    <button id="update" type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#scfForm">
                        <i class="btnIcon edit-icon"></i><span>修改</span>
                    </button>
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
<!--添加表单-->
<div class="modal fade" data-backdrop="static" id="scfForm" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 800px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">添加会议通知</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="title" class="col-sm-2 control-label">会议标题*：</label>
                        <div class="col-sm-4">
                            <input type="hidden" id="id" name="id">
                            <input type="hidden" id="removeId" name="removeId">
                            <input type="text" id="title" name="title" class="form-control"
                                   data-message="会议标题不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="address" class="col-sm-2 control-label">会议地点*：</label>
                        <div class="col-sm-4">
                            <input type="text" id="address" name="address" class="form-control"
                                   data-message="会议地点不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="type" class="col-sm-2 control-label">会议类型*：</label>
                        <div class="col-sm-4">
                            <select style="width: 100%" class="form-control"  id="type" name="type">
                                <option value="1">会场会议</option>
                                <option value="2">视频会议</option>
                            </select>
                        </div>
                        <label for="pubOrgName" class="col-sm-2 control-label">发布单位*：</label>
                        <div class="col-sm-4">
                            <input type="text" id="pubOrgName" name="pubOrgName" class="form-control"
                                   data-message="发布单位不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="linkMan" class="col-sm-2 control-label">联系人*：</label>
                        <div class="col-sm-4">
                            <input type="text" id="linkMan" name="linkMan" class="form-control"
                                   data-message="联系人不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="linkPhone" class="col-sm-2 control-label">联系方式*：</label>
                        <div class="col-sm-4">
                            <input type="text" id="linkPhone" name="linkPhone" class="form-control"
                                   data-message="联系方式不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="time" class="col-sm-2 control-label">会议时间*：</label>
                        <div class="col-sm-4">
                        <div id="timeContent" class="input-group date form_date" data-date="" data-link-field="time" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
                            <input class="form-control" id="time" name="time" size="16" type="text" value="" readonly
                                   data-message="会议时间不能为空"
                                   data-easytip="position:top;class:easy-red;">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                            </div>
                    </div>
                    <div class="form-group">
                        <label for="content" class="col-sm-2 control-label">会议内容*：</label>
                        <div class="col-sm-10">
                            <textarea  id="content" name="content" class="form-control" rows="5"
                                       data-message="会议内容不能为空"
                                       data-easytip="position:top;class:easy-red;"
                            ></textarea>
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
                <button type="button" class="btn btn-primary" id="save">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/container/gov/office/scripts/meetingnotice.js"></script>
</body>
</html>
