<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/12
  Time: 14:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <%
        String handleType=request.getParameter("handleType");
        String id=request.getParameter("id");
    %>
    <title>企业台账</title>
    <script type="text/javascript">
        var handleType='<%=handleType%>';
        var id='<%=id%>';
    </script>
    <style>
        .menuDiv h3{
            cursor: pointer;
        }
    </style>
</head>
<body>
<div class="wrap">
    <div class="menu-left left">
        <div class="menuDiv">
            <h3><a href="javascript:;">基础信息</a></h3>
            <ul>
                <li class="curLi"><a href="javascript:loadPageInEnterprise('basicInfo/enterpriseInfo.jsp?handleType=<%=handleType%>&id=<%=id%>')">基本信息</a></li>
                <li><a href="javascript:loadPageInEnterprise('basicInfo/grasPortList.jsp?id=<%=id%>')">废气排口</a></li>
                <li><a href="javascript:loadPageInEnterprise('basicInfo/waterPortList.jsp?id=<%=id%>')">废水排口</a></li>
                <li><a href="javascript:loadPageInEnterprise('basicInfo/noisePortList.jsp?id=<%=id%>')">噪声源</a></li>
                <li><a href="javascript:loadPageInEnterprise('basicInfo/fumesPortList.jsp?id=<%=id%>')">油烟排口(适用于酒店)</a></li>
                <li><a href="javascript:loadPageInEnterprise('basicInfo/mainProductList.jsp?id=<%=id%>')">主要产品及规模</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">企业阀值管理</a></h3>
            <ul>
                <li><a href="javascript:loadPageInEnterprise('portThreshold/wasteWaterPT.jsp?id=<%=id%>')">废水阈值管理</a></li>
                <li><a href="javascript:loadPageInEnterprise('portThreshold/hepwgPT.jsp?id=<%=id%>')">火电厂废气阈值管理</a></li>
                <li><a href="javascript:loadPageInEnterprise('portThreshold/bwgPT.jsp?id=<%=id%>')">锅炉废气阈值管理</a></li>
                <li><a href="javascript:loadPageInEnterprise('portThreshold/fgPT.jsp?id=<%=id%>')">油烟阈值管理</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">生产设备信息</a></h3>
            <ul>
                <li><a href="javascript:loadPageInEnterprise('proDeviceInfo/boilerList.jsp?id=<%=id%>')">燃煤锅炉信息</a></li>
                <li><a href="javascript:loadPageInEnterprise('proDeviceInfo/kilnList.jsp?id=<%=id%>')">窑炉信息</a></li>
                <li><a href="javascript:loadPageInEnterprise('proDeviceInfo/otherProductList.jsp?id=<%=id%>')">其他生产设备信息</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3 onclick="loadPageInEnterprise('portStatusHistory/portStatusHistory.jsp?id=<%=id%>')"><a href="javascript:void(0)">超标记录</a></h3>
            <ul>
                <li class="curLi"><a href="javascript:loadPageInEnterprise('portStatusHistory/portStatusHistory.jsp?id=<%=id%>')">超标记录</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">污染防治设施建设和运营信息</a></h3>
            <ul>
                <li><a href="javascript:loadPageInEnterprise('/watercontrolfacility.jsp')">水污染治理设施建设和运营情况</a></li>
                <li><a href="javascript:loadPageInEnterprise('/gascontrolfacility.jsp')">大气污染治理设施建设和运营情况</a></li>
                <li><a href="javascript:loadPageInEnterprise('/solid_control_facility.jsp')">固体废物贮存及治理设施建设和运营情况</a></li>
                <li><a href="javascript:loadPageInEnterprise('/sound_control_facility.jsp')">噪声污染治理设施建设和运营情况</a></li>
                <li><a href="javascript:;">监测设备信息</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">建设项目环评及其他许可情况</a></h3>
            <ul>
                <li><a href="javascript:;">建设项目环评及验收信息</a></li>
                <li><a href="javascript:;">排污许可证信息</a></li>
                <li><a href="javascript:;">清洁生产审核</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">突发环境事件应急预案</a></h3>
            <ul>
                <li><a href="javascript:loadPageInEnterprise('/enterpriseplan.jsp')">突发环境事件应急预案</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">环境监管信息</a></h3>
            <ul>
                <li><a href="javascript:;">信访投诉</a></li>
                <li><a href="javascript:;">现场检查（勘察）笔录</a></li>
                <li><a href="javascript:;">行政处罚</a></li>
                <li><a href="javascript:;">存在的问题及整改情况</a></li>
                <li><a href="javascript:;">排污收费</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">其他环境信息</a></h3>
            <ul>
                <li><a href="javascript:;">环境自行监测方案</a></li>
                <li><a href="javascript:;">其他环境信息</a></li>
            </ul>
        </div>
        <div class="menuDiv">
            <h3><a href="javascript:;">自查自报</a></h3>
            <ul>
                <li><a href="javascript:;">自查自报</a></li>
            </ul>
        </div>
    </div>
    <div class="main-right right">
        <%--<jsp:include page="enterpriseInfo.jsp"></jsp:include>--%>
    </div>
</div>
<script src="<%=request.getContextPath()%>/container/gov/enterprise/scripts/pageset.js"></script>
<script src="<%=request.getContextPath()%>/container/gov/enterprise/scripts/mainEnterprise.js"></script>
<script type="text/javascript">
    var mSwitch = new MenuSwitch("menuDiv");
    mSwitch.setDefault(0);
    mSwitch.setPrevious(false);
    mSwitch.init();
    $(function(){
        loadPageInEnterprise('basicInfo/enterpriseInfo.jsp?handleType='+handleType+'&id='+id);
    });
    function loadPageInEnterprise(url){
        var headUrl = rootPath +"/container/gov/enterprise/";
        //$(".main-right").load(url);
        $('.main-right').html(pageUtils.loading()); // 设置页面加载时的loading图片
        $('.main-right').load(headUrl+url); // ajax加载页面
    }
</script>
</body>
</html>
