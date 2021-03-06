<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <script src="<%=request.getContextPath()%>/common/scripts/ztree-3.5.24/jquery.ztree.all.js"></script>
    <script src="<%=request.getContextPath()%>/common/scripts/slimScroll/jquery.slimscroll.js"></script>
    <title>网格人员</title>
    <script type="text/javascript">
        $('.modal-body').attr('style','max-height: '+pageUtils.getFormHeight()+'px;overflow-y: auto;overflow-x: hidden;padding:10px;');
    </script>
</head>

<body>
<div class="content content1 clearfix">
    <div class="wrap">
        <div class="menu-left left">
            <div class="scrollContent">
                <div id="ztree" class="ztree blockTree">
                </div>
            </div>
        </div>
        <div class="main-right right">
            <div class="dealBox">
                <div class="sideTitle left">
                        <span class="blueMsg">
                            <img class="tipImg" src="<%=request.getContextPath()%>/common/images/searchTip.png" alt=""/>
                            <span class="text">查询</span>
                        </span>
                </div>
                <div class="queryBox marginLeft0">
                    <form class="form-inline" id="searchform">
                        <div class="form-group">
                            <label>网格名称：</label> <input type="text" name="orgName" style="width: 180px;"
                                                        class="form-control"/>
                        </div>
                    </form>
                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i
                        class="btnIcon query-icon"></i><span>查询</span></button>
                <button id="searchFix" type="button" class="btn btn-default queryBtn"><i
                        class="glyphicon glyphicon-repeat"></i><span>重置</span></button>
                <br/><br>
                <p class="btnListP">
                    <button id="add" type="button" class="btn btn-sm btn-success" data-toggle="modal"
                            data-target="#scfForm">
                        <i class="btnIcon add-icon"></i><span>新建</span>
                    </button>
                    <button id="update" type="button" class="btn btn-sm btn-warning" data-toggle="modal"
                            data-target="#scfForm">
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
<div class="modal fade" data-backdrop="static" id="scfForm" data-form-type="add" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 900px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">网格人员</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="orgName" class="col-sm-2 control-label">网格名称<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="hidden" id="id" name="id">
                            <input type="hidden" id="removeId" name="removeId">
                            <input type="hidden" id="blockLevelId" name="blockLevelId">
                            <input type="hidden" id="blockLevelName" name="blockLevelName">
                            <input type="text" id="orgName" name="orgName" class="form-control"
                                   data-message="单位名称不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="blockLevelId" class="col-sm-2 control-label">上级网格：</label>
                        <div class="col-sm-4">
                            <select id="parentBlockId" name="parentBlockId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <%--<div class="form-group">
                        <label for="principal" class="col-sm-2 control-label">姓名<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="principal" name="principal" class="form-control"
                                   data-message="名称不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="principalPhone" class="col-sm-2 control-label">联系方式<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="principalPhone" name="principalPhone" class="form-control"
                                   data-easyform="regex:^1(3|4|5|7|8)\d{9}$;"
                                   data-message="联系方式格式不正确"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>--%>
                    <div class="form-group">
                        <label for="blockLeader" class="col-sm-2 control-label">网格长<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="blockLeader" name="blockLeader" class="form-control"
                                   data-message="网格长不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="blockLeaderTel" class="col-sm-2 control-label">联系电话<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="blockLeaderTel" name="blockLeaderTel" class="form-control"
                                   data-easyform="regex:^1(3|4|5|7|8)\d{9}$;"
                                   data-message="联系电话格式不正确"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="principal" class="col-sm-2 control-label">环保负责人<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="principal" name="principal" class="form-control"
                                   data-message="环保负责人不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="principalPhone" class="col-sm-2 control-label">联系电话<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="principalPhone" name="principalPhone" class="form-control"
                                   data-easyform="regex:^1(3|4|5|7|8)\d{9}$;"
                                   data-message="联系电话格式不正确"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="areaPoints" class="col-sm-2 control-label">管辖区域标绘<span class="text-danger"></span>：</label>
                        <div class="col-sm-10">
                            <div class="input-group" style="display:none">
                                <textarea id="areaPoints" type="hidden" name="areaPoints" class="form-control"
                                          rows="3"></textarea>&nbsp;&nbsp;&nbsp;
                            </div>
                            <input type="checkbox" name="cheackPoints" id="cheackPoints">标绘
                            <button type="button" id="lookPoints" class="btn btn-info" style="display: none" onclick="lookMapBtn()">查看标绘</button>
                            <button type="button" id="editPoints" class="btn btn-primary " style="display: none" onclick="initMapBtn()">标绘</button>

                        </div>
                    </div>
                    <div class="form-group">
                        <label for="orgAddress" class="col-sm-2 control-label">管辖区域<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-10">
                            <input type="text" id="orgAddress" name="orgAddress" class="form-control"
                                   data-message="详细地址不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <%--<label for="position" class="col-sm-2 control-label">职务<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="position" name="position" class="form-control"
                                   data-message="职务不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>--%>
                    </div>
                    <div class="form-group">
                        <label for="blockDuty" class="col-sm-2 control-label">网格职责<span class="text-danger">*</span>：</label>
                        <div class="col-sm-10">
                            <textarea  id="blockDuty" name="blockDuty" class="form-control" rows="5"
                                       data-message="网格职责不能为空"
                                       data-easytip="position:top;class:easy-red;"
                            ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">附件：</label>
                        <div class="col-sm-10">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp"
                                         flush="false"></jsp:include>
                            <div id="fine-uploader-gallery"></div>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="save">保存</button>
                <button type="button" class="btn btn-default  btn-cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<%@include file="/common/gis/map_mark.jsp" %>
<script src="<%=request.getContextPath()%>/container/gov/detect/scripts/supervision.js"></script>
</body>
</html>
