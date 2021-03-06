<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>通用标绘dialog</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/common/gis/css/map_mark.css" type="text/css">
</head>
<body style="overflow: hidden;">

<!--选择坐标dialog-->
<div class="modal fade" id="markDialog" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close modalClose" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">地图标绘</h4>
            </div>
            <div class="modal-body" style="padding: 0;">
                <iframe name="mapFrame" src="${pageContext.request.contextPath}/common/gis/map.jsp" style="overflow: hidden;" frameborder="0"></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="markDialogOK">确定</button>
                <button type="button" class="btn btn-default modalClose" id="markDialogCancel">取消</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/common/gis/script/map_mark.js"></script>
</body>
</html>
