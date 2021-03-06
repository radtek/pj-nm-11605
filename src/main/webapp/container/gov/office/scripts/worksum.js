//@ sourceURL=worksum.js
var gridTable = $('#table'),
    removeBtn = $('#remove'),
    updateBtn = $('#update'),
    form = $("#workSumForm"),
    formTitlePlan = "任务计划",
    formTitleSchedule = "任务进度",
    formTitleSumup = "任务总结",
    selections = [];
var workType = {
    1: "工作计划",
    2: "工作进度",
    3: "工作总结"
}
var currentType = 1;
function changeTab(type) {
    if (currentType != type) {
        removeBtn.prop('disabled', true);
        updateBtn.prop('disabled', true);
        currentType = type;
        $('#s_type').val(type);
        $('.titleName').html(workType[type]);
        //resetQuery();
        gridTable.bootstrapTable('refreshOptions', {pageNumber: 1, pageSize: pageUtils.PAGE_SIZE});
    } else {
        return false;
    }
}
function initTable() {
    gridTable.bootstrapTable({
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        sidePagination: "server",
        url: rootPath + "/action/S_office_WorkSum_list.action",
        height: pageUtils.getTableHeight() - 45,
        method: 'post',
        pagination: true,
        clickToSelect: true,//单击行时checkbox选中
        queryParams: pageUtils.localParams,
        columns: [
            {
                title: "全选",
                checkbox: true,
                align: 'center',
                radio: false,  //  true 单选， false多选
                valign: 'middle'
            }, {
                title: 'ID',
                field: 'id',
                align: 'center',
                valign: 'middle',
                sortable: false,
                visible: false
            },
            {
                title: '标题',
                field: 'title',
                editable: false,
                sortable: false,
                align: 'center',
                isDown: true
            }, {
                title: '类型',
                field: 'type',
                sortable: false,
                align: 'center',
                editable: false,
                formatter: function (value, row, index) {
                    return workType[value];
                },
                isDown: true
            }, {
                title: '发布部门',
                field: 'pubOrgName',
                sortable: false,
                align: 'center',
                editable: false,
                isDown: true
            }, {
                title: '创建时间',
                field: 'createTime',
                sortable: false,
                align: 'center',
                editable: false,
                /*formatter: function (value, row, index) {
                    return pageUtils.sub10(value);
                },*/
                isDown: true
            },
            {
                title: '发布时间',
                field: 'pubTime',
                sortable: false,
                align: 'center',
                editable: false,
                /*formatter: function (value, row, index) {
                    return pageUtils.sub16(value);
                },*/
                isDown: true
            },{
                title: '发布状态',
                field: 'publishStatus',
                sortable: false,
                align: 'center',
                editable: false,
                formatter: function (value, row, index) {
                    switch (value) {
                        case "1":
                            return '<span style="color: green;">已发布</span>';
                            break;
                        default:
                            return '<span style="color: red;">未发布</span>';
                    }
                },
                isDown: true
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
        //有选中数据，启用删除按钮
        removeBtn.prop('disabled', !gridTable.bootstrapTable('getSelections').length);
        //选中一条数据启用修改按钮
        updateBtn.prop('disabled', !(gridTable.bootstrapTable('getSelections').length == 1));
    });


    $(window).resize(function () {
        // 重新设置表的高度
        gridTable.bootstrapTable('resetView', {
            height: pageUtils.getTableHeight() - 45
        });
    });

    gridTable.BootstrapExport($('#export'), {
        fileName: '工作总结',  //自定义文件名
    });
}

// 生成列表操作方法
function operateFormatter(value, row, index) {
    return '<button type="button" class="btn btn-md btn-warning view" data-toggle="modal" data-target="#workSumForm">查看</button>';
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

function getHeight() {
    return $(window).height() - $('h1').outerHeight(true);
}
initTable();
/**============列表工具栏处理============**/
//初始化按钮状态
removeBtn.prop('disabled', true);
updateBtn.prop('disabled', true);

/**
 * 列表工具栏 新增和更新按钮打开form表单，并设置表单标识
 */
$("#add").bind('click', function () {
    $('#publishBtn').attr('disabled', false);
    resetForm();
    $("#createTime").val((new Date()).format("yyyy-MM-dd"))
});
$("#update").bind("click", function () {
    var entity = getSelections()[0];
    if (orgId == entity.pubOrgId) {
        if (entity.publishStatus == 1) {
            $('#publishBtn').attr('disabled', true);
        } else {
            $('#publishBtn').attr('disabled', false);
        }
        setFormData(entity);
        $('#typeName').val(workType[entity.type]);
        form.modal('show');
    } else {
        Ewin.alert('非本单位提交文件，不可修改！');
    }
});
/**
 * 列表工具栏 删除按钮
 */
removeBtn.click(function () {
    var ids = getIdSelections();
    var entity = getSelections()[0];
    if (entity.pubOrgId == orgId) {
        Ewin.confirm({message: "确认要删除选择的数据吗？"}).on(function (e) {
            if (!e) {
                return;
            }
            deleteWorkSum(ids, function (msg) {
                gridTable.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                removeBtn.prop('disabled', true);
            });
        });
    } else {
        removeBtn.prop('disabled', true);
        Ewin.alert({message: "没有操作权限！"}).on(function (e) {
            if (!e) {
                return;
            }
        });
    }
});

/**============列表搜索相关处理============**/
//搜索
$("#search").click(function () {
    gridTable.bootstrapTable('refreshOptions', {pageNumber: 1, pageSize: pageUtils.PAGE_SIZE});
});
//重置按钮处理
$("#reset").click(function () {
    resetQuery();
    $('#s_type').val(currentType);
    gridTable.bootstrapTable('refreshOptions', {pageNumber: 1, pageSize: pageUtils.PAGE_SIZE});
});

/**============表单初始化相关代码============**/
//初始化表单验证
var ef = form.easyform({
    success: function (ef) {
        var worksum = $("#workSumForm").find("form").formSerializeObject();
        worksum.publishStatus = pubType ? 1 : 0;
        worksum.attachmentIds = getAttachmentIds();
        saveWorkSum(worksum, function (msg) {
            form.modal('hide');
            if (pubType) {
                Ewin.alert('发布成功！');
            } else {
                Ewin.alert('保存成功！');
            }
            gridTable.bootstrapTable('refresh');
        });
    }
});
var pubType = false;
//表单弹出框 保存按钮
$("#saveWorkSum").bind('click', function () {
    pubType = false;
    //验证表单，验证成功后触发ef.success方法保存数据
    ef.submit(false);
});
$('#publishBtn').bind('click', function () {
    pubType = true;
    //验证表单，验证成功后触发ef.success方法保存数据
    ef.submit(false);
});
//初始化日期组件
$('.form_datetime').datetimepicker({
    language:   'zh-CN',
    autoclose: 1,
    minView: 2
});

function deleteWorkSum(ids, callback) {
    $.ajax({
        url: rootPath + "/action/S_office_WorkSum_delete.action",
        type: "post",
        data: $.param({deletedId: ids}, true),//阻止深度序列化，向后台传递数组
        dataType: "json",
        success: callback
    });
}

function saveWorkSum(worksum, callback) {
    $.ajax({
        url: rootPath + "/action/S_office_WorkSum_save.action",
        type: "post",
        data: worksum,
        dataType: "json",
        success: callback
    });
}

/**
 * 刷新表单数据
 * @param meeting
 */
function setFormData(entity) {
    resetForm();
    if (!entity) {
        return false
    }
    if(entity.type == 1){
        form.find(".form-title").text("修改" + formTitlePlan);
    }else if(entity.type == 2){
        form.find(".form-title").text("修改" + formTitleSchedule);
    }else if(entity.type == 3){
        form.find(".form-title").text("修改" + formTitleSumup);
    }
    var id = entity.id;
    var inputs = form.find('.form-control');
    $.each(inputs, function (k, v) {
        var tagId = $(v).attr('name');
        var value = entity[tagId];
        if (v.tagName == 'SELECT') {
            $(v).find("option[value='" + value + "']").attr("selected", true);
        } else {
            $(v).val(value);
        }
    });
    form.find("#publishBtn").show();
    uploader = new qq.FineUploader(getUploaderOptions(id));
}
function setFormView(entity) {
    setFormData(entity);
    if (entity.publishStatus == 1) {
        $('#publishBtn').attr('disabled', true);
    } else {
        $('#publishBtn').attr('disabled', false);
    }
    $('#typeName').val(workType[entity.type]);
    if(entity.type == 1){
        form.find(".form-title").text("查看" + formTitlePlan);
    }else if(entity.type == 2){
        form.find(".form-title").text("查看" + formTitleSchedule);
    }else if(entity.type == 3){
        form.find(".form-title").text("查看" + formTitleSumup);
    }
    var fuOptions = getUploaderOptions(entity.id);
    fuOptions.callbacks.onSessionRequestComplete = function () {
        $("#fine-uploader-gallery").find(".qq-upload-delete").hide();
        $("#fine-uploader-gallery").find("[qq-drop-area-text]").attr('qq-drop-area-text', "暂无附件信息!");
    };
    uploader = new qq.FineUploader(fuOptions);
    $(".qq-upload-button").hide();
    disabledForm(true);
    form.find(".needHide").hide();
    form.find("#publishBtn").hide();
    form.find(".btn-cancel").text("关闭");
}
function disabledForm(disabled) {
    // form.find(".needEdit").attr("disabled", disabled);
    form.find("input").attr("disabled",disabled);
    if (!disabled) {
        //初始化日期组件
        $('#pubTimeContent').datetimepicker({
            language:   'zh-CN',
            autoclose: 1,
            startView:2,//月视图
            todayBtn:true,
            todayHighlight:true,
            minView: 2
        });
    }else{
        $('#pubTimeContent').datetimepicker('remove');
    }


}

/**
 * 重置表单
 */
function resetForm() {
    if(currentType == 1){
        form.find(".form-title").text("新增" + formTitlePlan);
    }else if(currentType == 2){
        form.find(".form-title").text("新增" + formTitleSchedule);
    }else if(currentType == 3){
        form.find(".form-title").text("新增" + formTitleSumup);
    }
    form.find("input[type!='radio'][type!='checkbox'],textarea").val("");
    uploader = new qq.FineUploader(getUploaderOptions());
    $('#type').val(currentType);
    $('#typeName').val(workType[currentType]);
    $('#pubOrgId').val(orgId);
    $('#pubOrgName').val(orgName);
    disabledForm(false);
    form.find("#publishBtn").show();
    form.find("#saveWorkSum").show();
    form.find(".btn-cancel").text("取消");
}


//附件相关js
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
            onComplete: function (id, fileName, msg, request) {
                uploader.setUuid(id, msg.id);
            },
            onDeleteComplete: function (id) {
                var file = uploader.getUploads({id: id});
                var removeIds = $("#removeId").val();
                if (removeIds) {
                    removeIds += ("," + file.uuid)
                } else {
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
                businessId: bussinessId
            }
        },
        session: {
            endpoint: rootPath + '/action/S_attachment_Attachment_listAttachment.action',
            params: {
                businessId: bussinessId
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: rootPath + "/action/S_attachment_Attachment_delete.action",
            method: "POST"
        },
        validation: {
            itemLimit: 5
        },
        debug: true
    };
}


/**
 * 绑定下载按钮事件
 */
$("#fine-uploader-gallery").on('click', '.qq-upload-download-selector', function () {
    var uuid = uploader.getUuid($(this.closest('li')).attr('qq-file-id'));
    window.location.href = rootPath + "/action/S_attachment_Attachment_download.action?id=" + uuid;
});

