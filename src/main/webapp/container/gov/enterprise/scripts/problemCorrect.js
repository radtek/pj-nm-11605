var DemoPage = function () {
    var gridTable = $('#table'),
        removeBtn = $('#remove'),
        updateBtn = $('#update'),
        form = $("#demoForm"),
        formTitle = "存在的问题及整改情况";

    //保存ajax请求
    function saveAjax(entity, callback) {
        $.ajax({
            url: rootPath + "/action/S_exelaw_ProblemCorrect_save.action?enterpriseId="+enterpriseId,
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
            url: rootPath + "/action/S_exelaw_ProblemCorrect_delete.action",
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
            url: rootPath+"/action/S_exelaw_ProblemCorrect_list.action?enterpriseId="+enterpriseId,
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
                    title: '台账编号',
                    field: 'id',
                    align: 'center',
                    valign: 'middle',
                    sortable: false
                },
                {
                    title: '创建时间',
                    field: 'createTime',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '问题类型',
                    field: 'problemType',
                    editable: false,
                    sortable: false,
                    align: 'center',
                    formatter:function (value, row, index) {
                        if(value==1){
                            value="安全隐患"
                        }else if(value==2){
                            value="总量减排"
                        }else if(value==3){
                            value="非法排污"
                        }else if(value==4){
                            value="未批先建"
                        }
                        return value
                    }
                },
                {
                    title: '问题描述',
                    field: 'problemDesc',
                    editable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    title: '问题进度',
                    field: 'progress',
                    editable: false,
                    sortable: false,
                    align: 'center',
                    formatter:function (value, row, index) {
                        if(value==2){
                            value="已消耗"
                        }else{
                            value="暂存"
                        }
                        return value
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
        var queryParams = $("#queryBox").find("form").formSerializeObject();
        gridTable.bootstrapTable('refresh',{
            query:queryParams
        });
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
            entity.attachmentIds = getAttachmentIds();
            entity.progress = 1;
            saveAjax(entity,function (msg) {
                form.modal('hide');
                gridTable.bootstrapTable('refresh');
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
        $(".noEdit").show();
        form.find("#save").hide();
        form.find(".btn-cancel").text("关闭");
    }
    function disabledForm(disabled) {
        form.find("input").attr("disabled",disabled);
        form.find("textarea").attr("disabled",disabled);
        form.find("select").attr("disabled",disabled);
        if (!disabled) {
            //初始化日期组件
            $('#createTimeContent').datetimepicker({
                language:   'zh-CN',
                autoclose: 1,
                minView: 2
            });
            $('#openDateContent').datetimepicker({
                language:   'zh-CN',
                autoclose: 1,
                minView: 2
            });
        }else{
            $('#createTimeContent').datetimepicker('remove');
            $('#openDateContent').datetimepicker('remove');
        }

    }
    /**
     * 重置表单
     */
    function resetForm() {
        form.find(".form-title").text("新增"+formTitle);
        form.find("input[type!='radio'][type!='checkbox']").val("");
        form.find("textarea").val("");
        uploader = new qq.FineUploader(getUploaderOptions());
        disabledForm(false);
        $(".noEdit").hide();
        form.find("#save").show();
        form.find(".btn-cancel").text("取消");
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

    /**
     * 绑定下载按钮事件
     */
    $("#fine-uploader-gallery").on('click', '.qq-upload-download-selector', function () {
        var uuid = uploader.getUuid($(this.closest('li')).attr('qq-file-id'));
        window.location.href = rootPath+"/action/S_attachment_Attachment_download.action?id=" + uuid;
    });


}();
