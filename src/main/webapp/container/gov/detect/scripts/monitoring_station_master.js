var gridTable = $('#table'),
    diaoDuButton = $('#diaoDuButton'),
    removeBtn = $('#remove'),
    updateBtn = $('#update'),
    form = $("#demoForm"),
    formTitle = "委托监测",
    selections = [];




/**============grid 列表初始化相关代码============**/
function initTable() {
    gridTable.bootstrapTable({
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        sidePagination:"server",
        url: rootPath+"/action/S_exelaw_TrustMonitor_list.action?module=monitoring_station_master",
        height: pageUtils.getTableHeight(),
        method:'post',
        pagination:true,
        clickToSelect:true,//单击行时checkbox选中
        queryParams:pageUtils.localParams,
        columns: [
            {
                title:"全选",
                checkbox: true,
                align: 'center',
                radio:false,  //  true 单选， false多选
                valign: 'middle'
            },
            {
                title: 'ID',
                field: 'id',
                align: 'center',
                valign: 'middle',
                sortable: false,
                visible:false
            },
            {
                title: '企业名称',
                field: 'enterpriseName',
                editable: false,
                sortable: false,
                align: 'center',
                // events: sendEvents,
                formatter: function (value, row, index) {
                    var isNewDiv=""
                    if (row.selfReadStatusForMonitorMaster!='1'){
                        isNewDiv='<div id="isNew">&nbsp;</div>'
                    }
                    return '<div style="padding: 8px;" class="send">'+value+isNewDiv+'</div>';
                }
            },
            {
                title: '监测内容',
                field: 'monitorContent',
                sortable: false,
                align: 'center',
                editable: false,
                formatter: function (value, entity, index) {
                    if(entity.monitorContent==1){
                        value="水源地监测报告";
                    }else if(entity.monitorContent==2){
                        value="大气污染防治监测报告";
                    }else if(entity.monitorContent==3){
                        value="水污染防治监测报告";
                    }else if(entity.monitorContent==4){
                        value="噪声监测报告";
                    }else if(entity.monitorContent==5){
                        value="土壤污染防治监测报告";
                    }
                    return value;
                }
            },
            {
                title: '监测时间',
                field: 'monitorTime',
                editable: false,
                sortable: false,
                align: 'center'
            },
            {
                title: '申请人',
                field: 'applicant',
                editable: false,
                sortable: false,
                align: 'center'
            },
            {
                title: '联系方式',
                field: 'applicantPhone',
                editable: false,
                sortable: false,
                align: 'center'
            },
            {
                field: 'status',
                title: '发送状态',
                align: 'center',
                formatter:function (value, row, index) {
                    if (value>=6){
                        value="已发送"
                    }else {
                        value="未发送"
                    }
                    return value;
                }
            },
            {
                field: 'feedbackStatus',
                title: '反馈状态',
                align: 'center',
                formatter:function (value, row, index) {
                    if (row.status==7){
                        value="已反馈"
                    }else {
                        value="未反馈"
                    }
                    return value;
                }
            },
            {
                field: 'monitoringStationPersonNameList',
                title: '发送至',
                align: 'center'

            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: operateFormatter
            }

        ]
    });
    // sometimes footer render error.
    setTimeout(function () {
        gridTable.bootstrapTable('resetView');
    }, 200);

    //列表checkbox选中事件
    gridTable.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
        //选中一条数据启用修改按钮
        diaoDuButton.prop('disabled', !(gridTable.bootstrapTable('getSelections').length== 1));

        //有选中数据，启用删除按钮
        removeBtn.prop('disabled', !gridTable.bootstrapTable('getSelections').length);
        //选中一条数据启用修改按钮
        updateBtn.prop('disabled', !(gridTable.bootstrapTable('getSelections').length== 1));
    });

    $(window).resize(function () {
        // 重新设置表的高度
        gridTable.bootstrapTable('resetView', {
            height: pageUtils.getTableHeight()
        });
    });
}

// 生成列表操作方法
function operateFormatter(value, row, index) {
    return '<button type="button" class="btn btn-md btn-warning view" data-toggle="modal" data-target="#lookOverFeedbackDetailForm">查看</button>';
}

window.operateEvents = {
    'click .view': function (e, value, entity, index) {
        $("#lookOverFeedbackDetailForm").find("input").attr("disabled",true);
        $("#lookOverFeedbackDetailForm").find("textarea").attr("disabled",true);
        $("#enterpriseName_lookOverFeedbackDetailForm").val(entity.enterpriseName);
        $("#monitorContent_lookOverFeedbackDetailForm").val(entity.monitorContent);
        $("#applyOrg_lookOverFeedbackDetailForm").val(entity.applyOrgId);
        $("#applicant_lookOverFeedbackDetailForm").val(entity.applicant);
        $("#applicantPhone_lookOverFeedbackDetailForm").val(entity.applicantPhone);
        $("#monitorTime_lookOverFeedbackDetailForm").val(entity.monitorTime);
        $("#trustOrgAddress_lookOverFeedbackDetailForm").val(entity.trustOrgAddress);
        $("#monitorAddress_lookOverFeedbackDetailForm").val(entity.monitorAddress);
        $("#monitorContentDetail_lookOverFeedbackDetailForm").val(entity.monitorContentDetail);

        $("#auditor_lookOverFeedbackDetailForm").val(entity.auditor);
        $("#auditorPhone_lookOverFeedbackDetailForm").val(entity.auditorPhone);
        $("#auditTime_lookOverFeedbackDetailForm").val(entity.auditTime);
        $("#auditSuggestion_lookOverFeedbackDetailForm").val(entity.auditSuggestion);
        $("#masterShouLiPersonName_lookOverFeedbackDetailForm").val(entity.masterShouLiPersonName);
        $("#masterShouLiTime_lookOverFeedbackDetailForm").val(entity.masterShouLiTime);
        $("#masterShouLiYiJian_lookOverFeedbackDetailForm").val(entity.masterShouLiYiJian);

        if(entity.monitorContent==1){
            $("#lookOverFeedbackDetailForm").find("[name=monitorContent]").val("水源地监测报告")
        }else if(entity.monitorContent==2){
            $("#lookOverFeedbackDetailForm").find("[name=monitorContent]").val("大气污染防治监测报告")
        }else if(entity.monitorContent==3){
            $("#lookOverFeedbackDetailForm").find("[name=monitorContent]").val("水污染防治监测报告")
        }else if(entity.monitorContent==4){
            $("#lookOverFeedbackDetailForm").find("[name=monitorContent]").val("噪声监测报告")
        }else if(entity.monitorContent==5){
            $("#lookOverFeedbackDetailForm").find("[name=monitorContent]").val("土壤污染防治监测报告")
        }

        $("#monitor").val(entity.monitor);
        $("#monitorPhone").val(entity.monitorPhone);
        $("#feedbackContent").val(entity.feedbackContent);

        uploaderToggle(".bUploader")
        var fuOptions = getUploaderOptions(entity.id);
        fuOptions.callbacks.onSessionRequestComplete = function () {
            $("#fine-uploader-gallery").find(".qq-upload-delete").hide();
            $("#fine-uploader-gallery").find("[qq-drop-area-text]").attr('qq-drop-area-text',"暂无上传的附件");
        };
        uploader = new qq.FineUploader(fuOptions);
        bindDownloadSelector();
        $(".qq-upload-button").hide();
    }
};

// 列表操作事件
/*window.sendEvents = {
    'click .send': function (e, value, row, index) {
        var url=rootPath + "/action/S_exelaw_TrustMonitor_updateSelfReadStatusForMonitorMaster.action";
        pageUtils.updateSelfReadStatus(url,row.id,1)
        setFormData(row);
    }
};*/


/**
 * 获取列表所有的选中数据id
 * @returns {*}
 */
function getIdSelections() {
    return $.map(gridTable.bootstrapTable('getSelections'), function (row) {
        return row.id
    });
}

/**
 *  获取列表所有的选中数据
 * @returns {*}
 */
function getSelections() {
    return $.map(gridTable.bootstrapTable('getSelections'), function (row) {
        return row;
    });
}

initTable();
/**============列表工具栏处理============**/
//初始化按钮状态
diaoDuButton.prop('disabled', true);
removeBtn.prop('disabled', true);
updateBtn.prop('disabled', true);

$("#diaoDuButton").bind("click",function () {
    var row=getSelections()[0];
    var url=rootPath + "/action/S_exelaw_TrustMonitor_updateSelfReadStatusForMonitorMaster.action";
    pageUtils.updateSelfReadStatus(url,row.id,1)
    setFormData(row);
    form.find("[name=masterShouLiPersonName]").val(userName)
    form.find("[name=masterShouLiTime]").val((new Date()).format("yyyy-MM-dd hh:mm"))
    form.find("[name=masterShouLiYiJian]").attr("disabled",false)
});




/**============列表搜索相关处理============**/
//搜索按钮处理
$("#search").click(function () {
    gridTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
});
//重置搜索
$("#searchFix").click(function () {
    resetQuery();
    $("#s_enterpriseSelf").val(enterpriseSelf)
    gridTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
});

//初始化日期组件
$('.form_datetime').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
});

/**============配置组织发送弹出框============**/
var options = {
    params:{
        orgCode:[orgCodeConfig.org.jianCeZhanZhiNengBuMen.orgCode],//组织机构代码(必填，组织机构代码)
        type:3 //1默认加载所有，2只加载当前机构下人员，3只加载当前机构下的组织机构及人员
    },
    choseMore:false,
    title:"人员选择",//弹出框标题(可省略，默认值：“组织机构人员选择”)
    width:"60%",        //宽度(可省略，默认值：850)
}
var model = $.fn.MsgSend.init(1,options,function(e,data){
    var d=pageUtils.sendParamDataToString(data)
    console.log("发送："+d)
    $.ajax({
        url: rootPath + "/action/S_exelaw_TrustMonitor_saveToMonitoringStationPersonList.action",
        type:"post",
        data:d,
        success:function (ret) {
            form.modal('hide');
            gridTable.bootstrapTable("refresh")

            var receivers = [];
            $.each(data.personObj,function (i,v) {
                var receiver1 = {receiverId:v.userId,receiverName:v.name};
                receivers.push(receiver1);
            })
            var msg = {
                'msgType':12,
                'title':'污染纠纷现场监测',
                'content':data.sourceId.monitorContentDetail,
                'businessId':ret
            };
            pageUtils.sendMessage(msg, receivers);

            pageUtils.saveOperationLog({opType:'4',opModule:'污染纠纷现场监测',opContent:'发送数据',refTableId:''})
        }
    });
});

var ef_sendButton = form.easyform({
    success:function (ef_sendButton) {
        var entity = $("#demoForm").find("form").formSerializeObject();
        entity.id=$("#demoForm").find("#id").val();
        //TODO 委托监测短信内容
        entity.monitorContentDetail=$("#monitorContentDetail").val();
        entity.smsContent=entity.monitorContentDetail
        entity.isSendSms=$("#isSendSms").is(':checked');
        model.open(entity);

        entity.masterShouLiPersonName=form.find("[name=masterShouLiPersonName]").val()
        entity.masterShouLiTime=form.find("[name=masterShouLiTime]").val()
        entity.masterShouLiYiJian=form.find("[name=masterShouLiYiJian]").val();
        $.ajax({
            url: rootPath + "/action/S_exelaw_TrustMonitor_updateMasterPishi.action",
            type:"post",
            data:entity,
            // dataType:"json",
            success:function (msg) {
                console.log(msg)
            }
        });
    }
});

//表单 保存按钮
$("#sendButton").bind('click',function () {
    ef_sendButton.submit(false);
});
/**
 * 设置表单数据
 * @param entity
 * @returns {boolean}
 */
function setFormData(entity) {
    $("#demoForm").find("input").attr("disabled",true)
    $("#demoForm").find("textarea").attr("disabled",true)
    $("#demoForm").find("select").attr("disabled",true)
    $("#id").attr("disabled",false);
    for(p in entity){
        var selector="#"+p
        $(selector).val(entity[p])
    }

    if(entity.monitorContent==1){
        form.find("[name=monitorContent]").val("水源地监测报告")
    }else if(entity.monitorContent==2){
        form.find("[name=monitorContent]").val("大气污染防治监测报告")
    }else if(entity.monitorContent==3){
        form.find("[name=monitorContent]").val("水污染防治监测报告")
    }else if(entity.monitorContent==4){
        form.find("[name=monitorContent]").val("噪声监测报告")
    }else if(entity.monitorContent==5){
        form.find("[name=monitorContent]").val("土壤污染防治监测报告")
    }

    uploaderToggle(".aUploader")
    var fuOptions = getUploaderOptions(entity.id);
    fuOptions.callbacks.onSessionRequestComplete = function () {
        $("#fine-uploader-gallery").find(".qq-upload-delete").hide();
        $("#fine-uploader-gallery").find("[qq-drop-area-text]").attr('qq-drop-area-text',"暂无上传的附件");
    };
    uploader = new qq.FineUploader(fuOptions);
    bindDownloadSelector();
    $(".qq-upload-button").hide();
}
function setFormView(entity) {
    setFormData(entity);
    form.find(".form-title").text("查看"+formTitle);
    disabledForm(true);
    var fuOptions = getUploaderOptions(entity.id);
    fuOptions.callbacks.onSessionRequestComplete = function () {
        $("#fine-uploader-gallery").find(".qq-upload-delete").hide();
        $("#fine-uploader-gallery").find("[qq-drop-area-text]").attr('qq-drop-area-text',"暂无上传的附件");
    };
    uploader = new qq.FineUploader(fuOptions);
    $(".qq-upload-button").hide();
    form.find("#save").hide();
    form.find(".btn-cancel").text("关闭");
}

//表单附件相关js
var uploader;//附件上传组件对象
/**
 * 获取上传组件options
 * @param bussinessId
 * @returns options
 */
function getUploaderOptions(bussinessId) {
    return {
        element: document.getElementById("fine-uploader-gallery"),
        template: 'qq-template',
        chunking: {
            enabled: false,
            concurrent: {
                enabled: true
            }
        },
        resume: {
            enabled: false
        },
        retry: {
            enableAuto: false,
            showButton: false
        },
        failedUploadTextDisplay: {
            mode: 'custom'
        },
        callbacks: {
            onComplete:function (id,fileName,msg,request) {
                uploader.setUuid(id, msg.id);
            },
            onDeleteComplete:function (id) {
                var file = uploader.getUploads({id:id});
                var removeIds = $("#removeId").val();
                if (removeIds) {
                    removeIds+= ("," + file.uuid)
                }else{
                    removeIds = file.uuid;
                }
                $("#removeId").val(removeIds);
            },
            onAllComplete: function (succeed) {
                var self = this;
                $.each(succeed, function (k, v) {
                    $('.qq-upload-download-selector', self.getItemByFileId(v)).toggleClass('qq-hide', false);
                });
            }
        },
        request: {
            endpoint: rootPath + '/Upload',
            params: {
                businessId:bussinessId
            }
        },
        session:{
            endpoint: rootPath + '/action/S_attachment_Attachment_listAttachment.action',
            params: {
                businessId:bussinessId
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: rootPath + "/action/S_attachment_Attachment_delete.action",
            method:"POST"
        },
        validation: {
            itemLimit: 5
        },
        debug: true
    };
}
/**
 * 获取附件列表ids
 * @returns {*}
 */
function getAttachmentIds() {
    var attachments = uploader.getUploads();
    if (attachments && attachments.length) {
        var ids = [];
        for (var i = 0 ; i < attachments.length; i++){
            ids.push(attachments[i].uuid);
        }
        return ids.join(",");
    }
    return "";
}



$(document).ready(function () {
    var optionsSetting={code:"orgId",name:"orgName"}
    ajaxLoadOption(rootPath+"/action/S_exelaw_TrustMonitor_getEnvironmentalProtectionStationList.action","#applyOrgId",optionsSetting)
})

/************  企业委托监测 ***************/
var enterpriseSelfDialog=$("#enterpriseSelfDialog")
var options_enterpriseSelfDialog = {
    params:{
        orgCode:[orgCodeConfig.org.jianCeZhan.orgCode],//组织机构代码(必填，组织机构代码)
        type:2  //1默认加载所有，2只加载当前机构下人员，3只加载当前机构下的组织机构及人员
    },
    choseMore:false,
    title:"人员选择",//弹出框标题(可省略，默认值：“组织机构人员选择”)
    width:"60%",        //宽度(可省略，默认值：850)
}

var model_enterpriseSelfDialog = $.fn.MsgSend.init(1,options_enterpriseSelfDialog,function(e,data){
    var d=pageUtils.sendParamDataToString(data)
    console.log("发送："+d)
    $.ajax({
        url: rootPath + "/action/S_exelaw_TrustMonitor_saveToMonitoringStationPersonList.action",
        type:"post",
        data:d,
        success:function (msg) {
            enterpriseSelfDialog.modal('hide');
            gridTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
        },
        error:function (msg) {
            console.error(msg)
        }
    });
});
var ef = enterpriseSelfDialog.easyform({
    success:function (ef) {
        var entity = enterpriseSelfDialog.find("form").formSerializeObject();
        $.ajax({
            url: rootPath + "/action/S_exelaw_TrustMonitor_saveEnterpriseSelfData.action",
            type:"post",
            data:entity,
            // dataType:"json",
            success:function (msg) {
                msg=JSON.parse(msg)
                model_enterpriseSelfDialog.open(msg.id);
                gridTable.bootstrapTable('refresh');
            },
            error:function (msg) {
                console.error(msg)
            }
        });
    }
});

$("#sendButton_enterpriseSelfDialog").bind('click',function () {
    ef.submit(false);
});

$("#add").click(function () {
    enterpriseSelfDialog.find("input").val("")
    enterpriseSelfDialog.find("textarea").val("")

    $("#enterpriseSelf").val("1")
})

$("#update").click(function () {
    var entity=getSelections()[0]
    $("#trustMonitorId").val(entity.id)
    $("#enterpriseSelf").val(entity.enterpriseSelf)
    for(p in entity){
        var selector="#"+p+"_enterpriseSelfDialog"
        $(selector).val(entity[p])
    }
})

function deleteAjax(ids, callback) {
    $.ajax({
        url: rootPath + "/action/S_exelaw_TrustMonitor_delete.action",
        type:"post",
        data:$.param({deletedId:ids},true),//阻止深度序列化，向后台传递数组
        dataType:"json",
        success:callback
    });
}

removeBtn.click(function () {
    var ids = getIdSelections();
    Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        deleteAjax(ids,function (msg) {
            gridTable.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
            removeBtn.prop('disabled', true);
        });
    });


});
