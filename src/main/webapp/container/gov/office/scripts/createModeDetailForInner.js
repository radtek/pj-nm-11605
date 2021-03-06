//@ sourceURL=createModeDetailForInner
var gridTable = $('#table'),
    removeBtn = $('#remove'),
    updateBtn = $('#update'),
    form = $("#demoForm"),
    formTitle = "指标任务";


//保存ajax请求
function saveAjax(entity, callback) {
    $.ajax({
        url: rootPath + "/action/S_office_CreateModeDetail_save.action?type="+type,
        type:"post",
        data:entity,
        dataType:"json",
        success:callback
    });
}
/**
 * 删除请求
 * @param ids 多个,号分隔
 * @param callback
 */
function deleteAjax(ids, callback) {
    $.ajax({
        url: rootPath + "/action/S_office_CreateModeDetail_delete.action",
        type:"post",
        data:$.param({deletedId:ids},true),//阻止深度序列化，向后台传递数组
        dataType:"json",
        success:callback
    });
}
/**============grid 列表初始化相关代码============**/
function initTable() {
    gridTable.bootstrapTable({
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        sidePagination:"server",
        url: rootPath+"/action/S_office_CreateModeDetail_list.action?createModeId="+createModeId,
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
                title: '任务名称',
                field: 'createModeName',
                editable: false,
                sortable: false,
                align: 'center'
            },
            {
                title: '指标内容',
                field: 'content',
                editable: false,
                sortable: false,
                align: 'center',
                formatter:function (value, row, index) {
                    return value;
                }
            },
            {
                title: '责任部门',
                field: 'responsibleDepartmentName',
                editable: false,
                sortable: false,
                align: 'center'
            },
            {
                title: '上报状态',
                field: 'completeStatus',
                editable: false,
                sortable: false,
                align: 'center',
                formatter:function (value, row, index) {
                    if(value=='1'){
                        value='完成'
                    }else {
                        value="未完成"
                    }
                    return value;
                }
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
    console.log(22)

    //列表checkbox选中事件
    gridTable.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
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
    return '<button type="button" class="btn btn-md btn-warning view" data-toggle="modal" data-target="#demoForm">查看</button>';
}
// 列表操作事件
window.operateEvents = {
    'click .view': function (e, value, row, index) {
        setFormView(row);
    }
};
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
removeBtn.prop('disabled', true);
updateBtn.prop('disabled', true);
/**
 * 列表工具栏 新增和更新按钮打开form表单，并设置表单标识
 */
$("#add").bind('click',function () {
    resetForm();
});
$("#update").bind("click",function () {
    setFormData(getSelections()[0]);
});
/**
 * 列表工具栏 删除按钮
 */
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

/**============列表搜索相关处理============**/
//搜索按钮处理
$("#search").click(function () {
    gridTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
});
//重置搜索
$("#searchFix").click(function () {
    resetQuery();
    $("#type").val(type)
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

/**============表单初始化相关代码============**/

//初始化表单验证
var ef = form.easyform({
    success:function (ef) {
        var entity = $("#demoForm").find("form").formSerializeObject();
        entity.attachmentIds = getAttachmentIds([uploader,uploader2,uploader3]);
        entity.createModeId=createModeId
        console.log(entity)
        saveAjax(entity,function (ret) {
            form.modal('hide');
            gridTable.bootstrapTable('refresh');

            $.ajax({
                url: rootPath + "/action/S_office_CreateModeDetail_getUserIdByOrgid.action?orgId="+entity.responsibleDepartmentId,
                type:"post",
                success:function (msg) {
                    var p=JSON.parse(msg)
                    var receivers = [];
                    $.each(p,function (i,v) {
                        var receiver1 = {receiverId:v.userId,receiverName:v.userName};
                        receivers.push(receiver1);
                    })
                    var msg = {
                        'msgType':5,
                        'title':entity.createModeName,
                        'content':entity.content,
                        'businessId':ret.id
                    };
                    pageUtils.sendMessage(msg, receivers);
                }
            });
        });
    }
});

//表单 保存按钮
$("#save").bind('click',function () {
    //验证表单，验证成功后触发ef.success方法保存数据
    ef.submit(false);
});
/**
 * 设置表单数据
 * @param entity
 * @returns {boolean}
 */
function setFormData(entity) {
    resetForm();
    if (!entity) {return false}
    form.find(".form-title").text("修改"+formTitle);
    var id = entity.id;
    $("#removeId").val("");
    for(p in entity){
        var selector="#"+p
        $(selector).val(entity[p])
    }

    uploader = new qq.FineUploader(getUploaderOptions(id));
    uploader2 = new qq.FineUploader(getUploaderOptions2(id));
    if(type==2){
        uploader3 = new qq.FineUploader(getUploaderOptions3(id));
    }
}
function setFormView(entity) {
    setFormData(entity);
    form.find(".form-title").text("查看"+formTitle);
    disabledForm(form,true);
    var fuOptions = getUploaderOptions(entity.id);
    fuOptions.callbacks.onSessionRequestComplete = function () {
        $("#fine-uploader-gallery").find(".qq-upload-delete").hide();
        $("#fine-uploader-gallery").find("[qq-drop-area-text]").attr('qq-drop-area-text',"暂无上传的附件");
    };
    uploader = new qq.FineUploader(fuOptions);

    var fuOptions2 = getUploaderOptions2(entity.id);
    fuOptions2.callbacks.onSessionRequestComplete = function () {
        $("#fine-uploader-gallery2").find(".qq-upload-delete").hide();
        $("#fine-uploader-gallery2").find("[qq-drop-area-text]").attr('qq-drop-area-text',"暂无上传的附件");
    };
    uploader2 = new qq.FineUploader(fuOptions2);

    if(type==2){
        var fuOptions3 = getUploaderOptions3(entity.id);
        fuOptions3.callbacks.onSessionRequestComplete = function () {
            $("#fine-uploader-gallery3").find(".qq-upload-delete").hide();
            $("#fine-uploader-gallery3").find("[qq-drop-area-text]").attr('qq-drop-area-text',"暂无上传的附件");
        };
        uploader3 = new qq.FineUploader(fuOptions3);
    }

    $(".qq-upload-button").hide();
    form.find("#save").hide();
    form.find(".btn-cancel").text("关闭");
}
function disabledForm(dialogSelector,disabled) {
    dialogSelector.find("input").attr("disabled",disabled);
    dialogSelector.find("textarea").attr("disabled",disabled);
    dialogSelector.find("select").attr("disabled",disabled);
    if (!disabled) {
        //初始化日期组件
        $('.lookover').datetimepicker({
            language:   'zh-CN',
            autoclose: 1,
            minView: 2
        });
    }else{
        $('.lookover').datetimepicker('remove');
    }
}
/**
 * 重置表单
 */
function resetForm() {
    form.find(".form-title").text("新增"+formTitle);
    form.find("input[type!='radio'][type!='checkbox']").val("");
    form.find("textarea").val("");
    $("#createModeName").val(createModeName)
    $("#deadline").val(deadline)
    uploader = new qq.FineUploader(getUploaderOptions());
    uploader2 = new qq.FineUploader(getUploaderOptions2());
    if(type==2){
        uploader3 = new qq.FineUploader(getUploaderOptions3());
    }
    disabledForm(form,false);
    form.find("#save").show();
    form.find(".btn-cancel").text("取消");
}

//表单附件相关js
var uploader;//附件上传组件对象
var uploader2;
var uploader3;
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
            endpoint: rootPath + '/Upload?type=1',
            params: {
                businessId:bussinessId
            }
        },
        session:{
            endpoint: rootPath + '/action/S_attachment_Attachment_listAttachment.action',
            params: {
                businessId:bussinessId,
                attachmentType:1
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
function getUploaderOptions2(bussinessId) {
    return {
        element: document.getElementById("fine-uploader-gallery2"),
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
                uploader2.setUuid(id, msg.id);
            },
            onDeleteComplete:function (id) {
                var file = uploader2.getUploads({id:id});
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
            endpoint: rootPath + '/Upload?type=2',
            params: {
                businessId:bussinessId
            }
        },
        session:{
            endpoint: rootPath + '/action/S_attachment_Attachment_listAttachment.action',
            params: {
                businessId:bussinessId,
                attachmentType:2
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
function getUploaderOptions3(bussinessId) {
    return {
        element: document.getElementById("fine-uploader-gallery3"),
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
                uploader3.setUuid(id, msg.id);
            },
            onDeleteComplete:function (id) {
                var file = uploader3.getUploads({id:id});
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
            endpoint: rootPath + '/Upload?type=3',
            params: {
                businessId:bussinessId
            }
        },
        session:{
            endpoint: rootPath + '/action/S_attachment_Attachment_listAttachment.action',
            params: {
                businessId:bussinessId,
                attachmentType:3
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
function getAttachmentIds(_uploader) {
    var ids = [];
    $.each(_uploader,function (i,v) {
        if(v!=undefined){
            var attachments = v.getUploads();
            if (attachments && attachments.length) {
                for (var i = 0 ; i < attachments.length; i++){
                    ids.push(attachments[i].uuid);
                }
            }
        }
    })
    if (ids.length>0){
        return ids=ids.join(",");
    }else {
        return ''
    }
}

/**
 * 绑定下载按钮事件
 */
$("#fine-uploader-gallery").on('click', '.qq-upload-download-selector', function () {
    var uuid = uploader.getUuid($(this.closest('li')).attr('qq-file-id'));
    window.location.href = rootPath+"/action/S_attachment_Attachment_download.action?id=" + uuid;
});
$("#fine-uploader-gallery2").on('click', '.qq-upload-download-selector', function () {
    var uuid = uploader2.getUuid($(this.closest('li')).attr('qq-file-id'));
    window.location.href = rootPath+"/action/S_attachment_Attachment_download.action?id=" + uuid;
});
$("#fine-uploader-gallery3").on('click', '.qq-upload-download-selector', function () {
    var uuid = uploader3.getUuid($(this.closest('li')).attr('qq-file-id'));
    window.location.href = rootPath+"/action/S_attachment_Attachment_download.action?id=" + uuid;
});

