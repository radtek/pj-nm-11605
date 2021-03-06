//@ sourceURL=contact.js
var gridTable = $('#table'),
    choseTable = $('#choseTable'),
    addBtn = $("#add"),
    removeBtn = $('#remove'),
    updateBtn = $('#update'),
    addPersonBtn = $('#addPerson'),
    refPersonBtn = $('#refPerson'),
    removePersonBtn = $('#removePerson'),
    form = $("#scfForm"),
    formTitle = "人员信息",
    thisOrgId="",
    thisOrgName="",
    selections = [];

var orgTreeObj;
function initZtree(data) {
    // data=JSON.parse(data)
    var setting = {
        height:500,
        width:200,
        view: {
            showLine: true
        },
        data:{
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentId",
                rootPId: "-1",
            }
        },
        // async: {
        //     enable: true,
        //     url:rootPath + "/action/S_alert_MsgSend_getOrgZtree.action",//"/container/gov/dispatch/selectPeople.json"
        //     autoParam:["id", "name=n", "level=lv"],
        //     otherParam:{orgCode:["dsgov"]},
        //     dataFilter: filter
        // },
        callback: {
            onClick: orgTreeOnClick,
            // onAsyncSuccess:function(event, treeId, treeNode, msg) {
            //     $('#orgScrollContent').slimScroll({
            //         height:"100%",
            //         railOpacity:.9,
            //         alwaysVisible:!1
            //     });
            //     $('#orgDiv').find('table').remove();
            //     orgTreeObj.expandAll(true);
            // }
        }
    };
    function orgTreeOnClick(event, treeId, treeNode){
        $('.hidden').val("");
        if(treeNode.parentId!="-1"){
            thisOrgId=treeNode.id;
            thisOrgName=treeNode.name;
            $('#s_orgId').val(treeNode.id);
            searchForm();
            addBtn.prop('disabled',false);
        }else{
            $('#s_orgId').val("");
            searchForm();
            addBtn.prop('disabled',true);
        }
    }
    function filter(treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        for (var i=0, l=childNodes.length; i<l; i++) {
            childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
        }
        return childNodes;
    }
    orgTreeObj = $.fn.zTree.init($("#orgZtree"), setting,data);
    var nodes = orgTreeObj.getNodes();
    if(nodes[0].children){
        $.each(nodes[0].children,function(k,v){
            orgTreeObj.expandNode(v, true, false, true);
        })
    };
    $('#orgScrollContent').slimScroll({
        height:"100%",
        railOpacity:.9,
        alwaysVisible:!1
    });
    $('#orgDiv').find('table').remove();
    //orgTreeObj.expandAll(true);
}

if (window.orgTreeObjData){
    initZtree(window.orgTreeObjData)
}else {
    $.ajax({
        url: rootPath + "/action/S_alert_MsgSend_getOrgZtree.action",//"/container/gov/dispatch/selectPeople.json"
        type:"post",
        traditional:true,
        data:{"orgCode":["dsgov"]},
        dataType:"json",
        success:function (data) {
            initZtree(data);
            window.orgTreeObjData=data;
        }
    });

}



//保存ajax请求
function saveAjax(entity, callback) {
    $.ajax({
        url: rootPath + "/action/S_office_Contacts_save.action",
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
        url: rootPath + "/action/S_office_Contacts_delete.action",
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
        url: rootPath+"/action/S_office_Contacts_list.action",
        height: pageUtils.getTableHeight(),
        method:'post',
        pagination:true,
        clickToSelect:true,//单击行时checkbox选中
        queryParams:function (param) {
            var temps = pageUtils.getBaseParams(param);
            temps.type = 0;
            return temps;
        },
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
                title: '名称',
                field: 'name',
                editable: false,
                sortable: false,
                align: 'center',
                isDown:true
            },
            /*{
                title: '头像',
                field: 'headImage',
                editable: false,
                sortable: false,
                align: 'center',
                isDown:false,
                formatter: function (value, row, index){
                    if(!value){value=options.defaultImgSrc}
                    return '<img src="'+value+'" align="absmiddle" style="width:32px;margin-top:4px;border-radius:0px;box-shadow:0px 0px 12px #7E7E7E;">';
                }
            },*/
            {
                title: '部门名称',
                field: 'department',
                sortable: false,
                align: 'center',
                editable: false,
                isDown:true
            },
            {
                title: '职务',
                field: 'position',
                sortable: false,
                align: 'center',
                editable: false,
                isDown:true
            },
            {
                title: '座机号码',
                field: 'tel',
                sortable: false,
                align: 'center',
                editable: false,
                isDown:true
            },{
                title: '手机号码',
                field: 'phone',
                sortable: false,
                align: 'center',
                editable: false,
                isDown:true
            },{
                title: '单位地址',
                field: 'address',
                sortable: false,
                align: 'center',
                editable: false,
                isDown:true
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
        removePersonBtn.prop('disabled', !gridTable.bootstrapTable('getSelections').length);
        //选中一条数据启用修改按钮
        updateBtn.prop('disabled', !(gridTable.bootstrapTable('getSelections').length== 1));
        refPersonBtn.prop('disabled', !(gridTable.bootstrapTable('getSelections').length== 1));
    });

    $(window).resize(function () {
        // 重新设置表的高度
        gridTable.bootstrapTable('resetView', {
            height: pageUtils.getTableHeight()
        });
    });

    gridTable.BootstrapExport($('#export'),{
        fileName:'通讯录',  //自定义文件名
    });
    /*$('#export').click(function(){
        downLoadObj.exportTable({
            fileName:'通讯录',
            type: 'excel',
            escape: false,
            exportDataType:'all'
        });
    })*/
}

// 生成列表操作方法
function operateFormatter(value, row, index) {
    return '<button type="button" class="btn btn-md btn-warning view" data-toggle="modal" data-target="#scfForm">查看</button>';
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
addBtn.prop('disabled', true);
removeBtn.prop('disabled', true);
updateBtn.prop('disabled', true);
addPersonBtn.prop('disabled', true);
removePersonBtn.prop('disabled', true);
refPersonBtn.prop('disabled', true);
/**
 * 列表工具栏 新增和更新按钮打开form表单，并设置表单标识
 */
addBtn.bind('click',function () {
    resetForm();
    form.find('#orgId').val(thisOrgId);
    form.find('#department').val(thisOrgName);
    form.find('#type').val("0");
    form.find('#sort').val("0");
});
updateBtn.bind("click",function () {
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
addPersonBtn.click(function(){
    choseTable.bootstrapTable('refresh');
});
refPersonBtn.click(function(){
    var ids = getIdSelections();
    model.open(ids[0]);
});
removePersonBtn.click(function () {
    var ids = getIdSelections();
    Ewin.confirm({ message: "确认要将所选人员从当前网格中移除？" }).on(function (e) {
        if (!e) {
            return;
        }
        $.ajax({
            url: rootPath + "/action/S_office_Contacts_removeContactFromBlock.action",
            type:"post",
            async:false,
            data:$.param({deletedId:ids},true),//阻止深度序列化，向后台传递数组
            dataType:"json",
            success:function (data) {
                searchForm();
                removePersonBtn.prop('disabled', true);
            }
        });
    });
});
$('#addPersonToBlock').click(function(){
    $.ajax({
        url: rootPath + "/action/S_office_Contacts_addContactsToBlock.action",
        type:"post",
        async:false,
        data:$.param({
            ids:getChoseTableIdSelections(),
            blockLevelId:$('#s_blockLevelId').val(),
            blockId:$('#s_blockId').val(),
        },true),
        //阻止深度序列化，向后台传递数组
        dataType:"json",
        success:function (data) {
            $('#chosePersonForm').modal('hide');
            searchForm();
            $('#addPersonToBlock').prop('disabled', true);
        }
    });
});

/**============列表搜索相关处理============**/
//搜索按钮处理
$("#search").click(function () {
    $("#s_orgId").val(" ");
    searchForm();
});
$("#chosePersonFormSearch").click(function(){
    choseTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
});
function searchForm(){
    gridTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
}
//重置按钮处理
$("#reset").click(function () {
    $(".queryBox").find("input[type!='radio'][type!='checkbox']").val("");
    gridTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
});
$("#chosePersonFormReset").click(function () {
    $('#searchChosePersonform')[0].reset();
    choseTable.bootstrapTable('refreshOptions',{pageNumber:1,pageSize:pageUtils.PAGE_SIZE});
});
/**============表单初始化相关代码============**/

//初始化表单验证
var ef = form.easyform({
    success:function (ef) {
        form.modal('hide');
        var entity = $("#scfForm").find("form").formSerializeObject();
        entity.attachmentIds = getAttachmentIds();
        saveAjax(entity,function (msg) {
            Ewin.alert('保存成功！');
            gridTable.bootstrapTable('refresh');
            searchForm();
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
    setHeadImage(entity.headImage);
    var inputs = form.find('.form-control');
    $.each(inputs,function(k,v){
        var tagId = $(v).attr('name');
        var value = entity[tagId];
        if(v.tagName=='SELECT'){
            if(tagId=="blockLevelId" && value!=null){
                var childData = blockTreeObj.getNodeByParam("id", value, null).children;
                $('#blockId').empty();
                $.each(childData,function(k,v){
                    $('#blockId').append($("<option>").val(v.id).text(v.name));
                });
            }
            if(value==null) value="";
            $(v).find("option[value='"+value+"']").attr("selected",true);
        }else{
            $(v).val(value);
        }
    });

    uploader = new qq.FineUploader(getUploaderOptions(id));
}
function setFormView(entity) {
    setFormData(entity);
    form.find(".form-title").text("查看"+formTitle);
    disabledForm(true);
    var fuOptions = getUploaderOptions(entity.id);
    fuOptions.callbacks.onSessionRequestComplete = function () {
        $("#fine-uploader-gallery").find(".qq-upload-delete").hide();
        $("#fine-uploader-gallery").find("[qq-drop-area-text]").attr('qq-drop-area-text',"");
    };
    uploader = new qq.FineUploader(fuOptions);
    $(".qq-upload-button").hide();
    form.find("#save").hide();
    form.find(".btn-cancel").text("关闭");
}
function disabledForm(disabled) {
    form.find(".form-control").attr("disabled",disabled);
    disabledType = disabled;
    if (!disabled) {
        $('#image-uploader-gallery').addClass('upHeadImage');
        //初始化日期组件
        $('#pubTimeContent').datetimepicker({
            language:   'zh-CN',
            autoclose: 1,
            minView: 2,
            pickerPosition: "bottom-left"
        });
    }else{
        $('#image-uploader-gallery').removeClass('upHeadImage');
        $('#pubTimeContent').datetimepicker('remove');
    }

}
/**
 * 重置表单
 */
function resetForm() {
    form.find(".form-title").text("新增"+formTitle);
    form.find('form')[0].reset();
    setHeadImage(null);
    $('#blockLevelId').find('option[value=""]').attr("selected",true);
    $('#blockId').empty();
    form.find("input[type!='radio'][type!='checkbox']").val("");
    uploader = new qq.FineUploader(getUploaderOptions());
    //imgUploader = new qq.FineUploader(getHeadimageUploaderOptions());
    disabledForm(false);
    form.find("#save").show();
    form.find(".btn-cancel").text("取消");
}

//表单附件相关js
var uploader;//附件上传组件对象
var imgUploader;

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
function getHeadimageUploaderOptions(bussinessId) {
    return {
        element: document.getElementById("image-uploader-gallery"),
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
                imgUploader.setUuid(id, msg.id);
                if (msg.success) {
                    imgUploader.append('<img id="logoimg" style="width:200px;hight:300px;"  src="' + rootPath+"/action/S_attachment_Attachment_download.action?id="+msg.id+ '">');
                }
            },
            onDeleteComplete:function (id) {
                var file = imgUploader.getUploads({id:id});
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
            endpoint: rootPath + '/Upload?type=head',
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
            acceptFiles: ['.jpeg', '.jpg', '.gif', '.png'],
            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
            itemLimit: 1
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

/**
 * 绑定下载按钮事件
 */
$("#fine-uploader-gallery").on('click', '.qq-upload-download-selector', function () {
    var uuid = uploader.getUuid($(this.closest('li')).attr('qq-file-id'));
    window.location.href = rootPath+"/action/S_attachment_Attachment_download.action?id=" + uuid;
});

