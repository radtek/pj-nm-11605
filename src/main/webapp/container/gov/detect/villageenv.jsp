<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>农村生态环境监管</title>
    <script type="text/javascript">
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
                </div>
                <div class="queryBox marginLeft0">
                    <form class="form-inline" id="searchform">
                        <label >乡镇名称：</label> <input type="text" name="name" class="form-control"/>
                        <label >网格负责人：</label> <input type="text" name="principal" class="form-control"/>
                   </form>
                </div>
                <button type="button" id="search" class="btn btn-md btn-success queryBtn"><i
                        class="btnIcon query-icon"></i><span>查询</span></button>
                <button type="button" id="searchFix" class="btn btn-default"><i
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
                    <button id="export" type="button" class="btn btn-sm btn-success">
                        <span class="glyphicon glyphicon-export"></span>导出
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
<div class="modal fade" data-backdrop="static" id="scfForm" data-form-type="add" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 800px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">添加农村生态环境监管</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">乡镇名称<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="hidden" id="id" name="id" class="form-control">
                            <input type="hidden" id="removeId" name="removeId" class="form-control">
                            <input type="text" id="name" name="name" class="form-control"
                                   data-message="乡镇名称不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="address" class="col-sm-2 control-label">所属区域<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="address" name="address" class="form-control"
                                   data-message="所属区域不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="blockLevelId" class="col-sm-2 control-label">所属网格<span class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <select class="form-control needshow" id="blockLevelId" name="blockLevelId">
                            </select>
                        </div>

                        <label for="blockId" class="col-sm-2 control-label"></label>
                        <div class="col-sm-4">
                            <select class="form-control needshow" id="blockId" name="blockId">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="principal" class="col-sm-2 control-label">网格负责人<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="text" id="principal" name="principal" class="form-control"
                                   data-message="网格负责人不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                        <label for="principalPhone" class="col-sm-2 control-label">联系方式<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-4">
                            <input type="principalPhone" id="principalPhone" name="principalPhone" class="form-control"
                                   data-message="联系方式不能为空"
                                   data-easytip="position:top;class:easy-red;"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="points" class="col-sm-2 control-label">位置标绘<span
                                class="text-danger">*</span>：</label>
                        <div class="col-sm-10">
                            <div class="input-group" style="display:none">
                                <textarea id="points" type="hidden" name="points" class="form-control"
                                          rows="3"></textarea>
                            </div>
                            <input type="checkbox" name="cheackPoints" id="cheackPoints">标绘
                            <button type="button" id="lookPoints" class="btn btn-info" style="display: none" onclick="lookMapBtn()">查看标绘</button>
                            <button type="button" id="editPoints" class="btn btn-primary " style="display: none" onclick="initMapBtn()">标绘</button>

                        </div>
                    </div>
                    <div class="form-group">
                        <label for="description" class="col-sm-2 control-label">农村环境详情<span class="text-danger">*</span>：</label>
                        <div class="col-sm-10">
                            <textarea id="description" name="description" class="form-control" rows="5"
                                      data-message="农村环境详情不能为空"
                                      data-easytip="position:top;class:easy-red;"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="attachment" class="col-sm-2 control-label">附件：</label>
                        <div class="col-sm-10">
                            <jsp:include page="/common/scripts/fine-uploader-5.11.8/templates/upload-template.jsp"
                                         flush="false"></jsp:include>
                            <div id="fine-uploader-gallery"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="save">保存</button>
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="lookVideo" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" style="width: 60%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title1">视频</h4>
            </div>
            <div class="content content1 clearfix">
                <jsp:include page="/container/gov/detect/video.jsp" flush="true"></jsp:include>
                <div class="modal-footer">
                    <%--<button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">关闭</button>--%>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/common/gis/map_mark.jsp" %>
<script src="<%=request.getContextPath()%>/container/gov/detect/scripts/villageenv.js"></script>
<%--<script>
    $(function () {
        initMapBtn();
    });
    /*初始化标注按钮*/
    function initMapBtn() {
        $('#mapMarkBtn').bind('click', function () {
            //设置标绘模式
            //绑定markDialog关闭事件
            MapMarkDialog.closed(function (mark) {
                if (mark) {
                    $("#points").val(mark);
                } else {
                    Ewin.alert({message: "请选择坐标"});
                    return false;
                }
            });
            MapMarkDialog.setMode("polygon");
            MapMarkDialog.open();
        })
    }
</script>--%>
</body>
</html>
