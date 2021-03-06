<%@ page import="com.harmonywisdom.apportal.common.configuration.ConfigureManager" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@include file="/common/common_include.jsp"%>
    <script>
        var menuCode = '${param.menuCode}';
    </script>
    <title>东胜环保</title>
</head>
<body style="overflow: hidden">
<div class="container">
    <div class="banner clearfix">
        <div class="logoDiv left">
            <img src="<%=request.getContextPath()%>/common/images/indexlogo.png" alt=""/>
        </div>
        <div class="opDiv right">
            <ul>
                <li><a href="#"><img src="<%=request.getContextPath()%>/common/images/mail-icon.png" alt=""/><span class="text">发送短信</span></a></li>
                <li class="divider"><i class="short-divider"></i></li>
                <li class="user"><a href="javascript:;"><img src="<%=request.getContextPath()%>/common/images/user.jpg" alt=""/><span class="text"><%=userName%></span></a></li>
                <li><a href="#" class="msg-icon"><span class="new-icon">0</span></a></li>
                <li class="divider"><i class="long-divider"></i></li>
                <li><a href="#"><img src="<%=request.getContextPath()%>/common/images/loginout-icon.png" onclick='window.location.href = "${pageContext.request.contextPath}/container/company/login/login.jsp";' alt="退出登陆"/></a></li>
            </ul>
        </div>
    </div>
    <div class="box box5">
        <div class="nav-menu linear ">
            <ul id="level2Menu" class="navList">
                <%--<li class="list1 linear-hover"><a href="javascript:;">日程安排</a></li>
                <li class="list2"><a href="javascript:;">委托监测</a></li>
                <li class="list2"><a href="javascript:;">企业委托监测</a></li>
                <li class="list2"><a href="javascript:;">空气质量监测</a></li>--%>
            </ul>
        </div>
        <div id="level2content" class="content show clearfix" style="margin: 5px 5px 8px;">
        </div>
        <div class="siderNav">
            <ul>
                <%--<li><a href="compre-supervision.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-composite-icon.png" alt=""/></dt><dd>综合监管</dd></dl></a></li>
                <li><a href="pollution-23.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-monitor-icon.png" alt=""/></dt><dd>污染源监控</dd></dl></a></li>
                <li><a href="compre-dispatch.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-dispatch-icon.png" alt=""/></dt><dd>综合调度</dd></dl></a></li>
                <li><a href="law-supervision.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-exelaw-icon.png" alt=""/></dt><dd>执法监管</dd></dl></a></li>
                <li><a href="compre-monitor.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-detect-icon.png" alt=""/></dt><dd>综合监测</dd></dl></a></li>
                <li><a href="daily-office.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-office-icon.png" alt=""/></dt><dd>日常办公</dd></dl></a></li>
                <li><a href="compre-statistics.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-statistics-icon.png" alt=""/></dt><dd>综合统计</dd></dl></a></li>
                <li><a href="foreign-mission.html"><dl><dt><img src="<%=request.getContextPath()%>/common/images/side-dsyjt-icon.png" alt=""/></dt><dd>对外宣教</dd></dl></a></li>--%>
            </ul>
        </div>
    </div>
</div>
<script src="common/scripts/main_css.js"></script>
<script src="common/scripts/main.js"></script>
<script>
</script>
</body>
</html>
