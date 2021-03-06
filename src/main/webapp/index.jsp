<%@ page import="com.harmonywisdom.apportal.common.configuration.ConfigureManager" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@include file="/common/common_include.jsp"%>
    <title>东胜环保</title>
    <style>
        .myText{
            font-size: 25px;
            font-weight:900;
            color: black;
        }
    </style>
</head>
<body>
<div class="main clearfix">
    <div class="banner clearfix">
        <div class="logoDiv left">
            <img src="<%=request.getContextPath()%>/common/images/indexlogo.png" alt=""/>
        </div>
        <div class="opDiv right">
            <ul>
                <li><a type="button" href="javascript:void(0);" id="apkDownBtn" title="扫一扫二维码下载"  data-toggle="modal" data-target="#apkModal"><img width="30" height="30" src="<%=request.getContextPath()%>/container/apk/images/appDownload.png" alt="扫一扫二维码下载"/><span class="text">扫码下载</span></a></li>
                <li><a href="javascript:void(0);" id="mainSmsSendBtn"><img src="<%=request.getContextPath()%>/common/images/mail-icon.png" alt=""/><span class="text">发送短信</span></a></li>
                <li class="divider"><i class="short-divider"></i></li>
                <li class="user" id="userinfo"><a href="javascript:void(0);" id="updatePasswordBtn"><img src="<%=request.getContextPath()%>/common/images/user.png" alt=""/><span class="text"><%=userName%></span></a></li>
                <li><a href="javascript:void(0);" class="msg-icon" id="msgListBtn"><span class="new-icon" id="msgCountSpan">0</span></a></li>
                <li class="divider"><i class="long-divider"></i></li>
                <li><a href="javascript:void(0);"><img src="<%=request.getContextPath()%>/common/images/loginout-icon.png" onclick='window.location.href = "<%=ConfigureManager.getInstance().getSsoConfig().getSsoGateWaySite()%>/logout.action";' alt="退出登陆"/></a></li>
            </ul>
        </div>
    </div>
    <div class="main-content">
        <div class="link-list">
            <ul class="clearfix">
                <%--<li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/composite-img.png" alt=""/></a></li>
                <li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/exelaw-img.png" alt=""/></a></li>
                <li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/statistics-img.png" alt=""/></a></li>
                <li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/monitor-img.png" alt=""/></a></li>
                <li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/dispatch-img.png" alt=""/></a></li>
                <li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/office-img.png" alt=""/></a></li>
                <li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/dsyjt-img.png" alt=""/></a></li>
                <li><a href="main.jsp?SToken=${param.SToken}"><img src="<%=request.getContextPath()%>/common/images/detect-img.png" alt=""/></a></li>--%>
            </ul>
        </div>
        <div class="bg-icon">
            <img src="<%=request.getContextPath()%>/common/images/bg-icon.png" alt=""/>
        </div>
    </div>
</div>
<div class="modal fade" id="apkModal" data-backdrop="static" data-form-type="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 315px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title form-title">扫一扫下载客户端</h4>
            </div>
            <div class="modal-body" style="display: table-cell; vertical-align:middle; text-align:center; display: block;border: 1px solid #eee; ">
                <img style="vertical-align:middle;" src="<%=request.getContextPath()%>/container/apk/images/appDownload.png" alt="扫一扫二维码下载"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<p class="copyrightP"><span>版权所有：鄂尔多斯市东胜区环境保护局</span><span>技术支持：航天正通汇智科技股份有限公司</span></p>
<%@include file="/common/msgSend/msgSend.jsp"%>
<%--<%@include file="/common/paizhao/paizhao.jsp"%>--%>
<%@include file="/container/gov/alert/message_dialog.jsp"%>
<%@include file="/common/updatePassword/updatePassword.jsp"%>
<%@include file="/common/portAlert/portAlert.jsp"%>
<!--样式js-->
<script>
    function loadHeight(){
        var main = document.querySelector(".main");
        var mainContent = document.querySelector(".main-content");
        mainContent.style.height=(main.offsetHeight - 76)+"px";//右侧列表宽度自适应
    }
    window.onload=loadHeight();
    window.onresize=loadHeight();
    //加载主菜单
    pageUtils.loadMenu(function (mainMenu) {
        //加载一级主菜单
        for (var i = 0; i < mainMenu.length; i++) {
            var menu = mainMenu[i];
            var li = $('<li><a href="main.jsp?menuCode=' + menu.code + '&SToken=' + SToken + '" style="text-decoration:none;"><img src="<%=request.getContextPath()%>/common/images/side-' + menu.code + '-icon.png" alt="' + menu.text + '"/><p class="myText">' + menu.text + '</p></a></li>');
            $(".link-list>ul").append(li);
        }
    });
    //定义短信发送modal
    var options = {
        title: "短信发送",//弹出框标题(可省略，默认值：“人员选择”)
        width:'60%'
    };
    var model = $.fn.MsgSend.init(2,options,function(e,data){ //短信发送第一个参数为2

    });
    $("#mainSmsSendBtn").bind('click', function () {
        model.open();//打开dialog,
    });
    if (MessageDialog) {
        MessageDialog.modal({"userId":userId,countElement:$("#msgCountSpan")});
        $("#userinfo").bind("click", function () {
            MessageDialog.testSendMsg();
        });
        $("#msgListBtn").bind("click",function () {
            MessageDialog.modal("show");
        });
    }

    function initCacheData() {
        $.ajax({
            url: rootPath + "/action/S_alert_MsgSend_getOrgZtree.action",//"/container/gov/dispatch/selectPeople.json"
            type:"post",
            traditional:true,
            data:{"orgCode":["dsgov"]},
            dataType:"json",
            success:function (data) {
                console.log(data)
            }
        });
    }
    initCacheData();


</script>
</body>
</html>
