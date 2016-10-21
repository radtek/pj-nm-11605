package com.harmonywisdom.dshbcbp.composite.action;

import com.harmonywisdom.dshbcbp.attachment.service.AttachmentService;
import com.harmonywisdom.dshbcbp.common.dict.util.DateUtil;
import com.harmonywisdom.dshbcbp.composite.bean.EnterprisePlan;
import com.harmonywisdom.dshbcbp.composite.service.EnterprisePlanService;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.dao.QueryCondition;
import com.harmonywisdom.framework.dao.QueryOperator;
import com.harmonywisdom.framework.dao.QueryParam;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.lang.StringUtils;

public class EnterprisePlanAction extends BaseAction<EnterprisePlan, EnterprisePlanService> {
    @AutoService
    private EnterprisePlanService enterprisePlanService;
    @AutoService
    private AttachmentService attachmentService;

    @Override
    protected EnterprisePlanService getService() {
        return enterprisePlanService;
    }

    @Override
    protected QueryCondition getQueryCondition() {
        QueryParam param=new QueryParam();
        if (StringUtils.isNotBlank(entity.getAttnPerson())) {
            param.andParam(new QueryParam("attnPerson", QueryOperator.LIKE,entity.getAttnPerson()));
        }
        String recordDate = request.getParameter("recordDate");
        if (StringUtils.isNotBlank(recordDate)) {
            param.andParam(new QueryParam("recordDate", QueryOperator.EQ, DateUtil.strToDate(recordDate,"yyyy-MM-dd")));
        }
        QueryCondition condition=new QueryCondition();
        if (param.getField()!=null) {
            condition.setParam(param);
        }
        condition.setPaging(getPaging());
        return condition;
    }

    @Override
    public void save() {
        //获取删除的附件IDS

        String attachmentIdsRemoveId = request.getParameter("removeId");
        if(StringUtils.isNotBlank(attachmentIdsRemoveId)){
            //删除附件
            attachmentService.removeByIds(attachmentIdsRemoveId.split(","));
        }
        super.save();
        if (StringUtils.isNotBlank(entity.getAttachmentIds())){
            attachmentService.updateBusinessId(entity.getId(),entity.getAttachmentIds().split(","));
        }
    }

    /**
     * 删除实体时删除关联的附件
     */
    @Override
    public void delete() {
        String deleteId = request.getParameter("deletedId");
        if(StringUtils.isNotBlank(deleteId)){
            attachmentService.removeByBusinessIds(deleteId);
        }
        super.delete();
    }
}