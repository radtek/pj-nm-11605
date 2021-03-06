package com.harmonywisdom.dshbcbp.composite.action;

import com.harmonywisdom.dshbcbp.attachment.service.AttachmentService;
import com.harmonywisdom.dshbcbp.common.dict.util.DateUtil;
import com.harmonywisdom.dshbcbp.composite.bean.PollutantLicense;
import com.harmonywisdom.dshbcbp.composite.service.PollutantLicenseService;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.dao.QueryCondition;
import com.harmonywisdom.framework.dao.QueryOperator;
import com.harmonywisdom.framework.dao.QueryParam;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.lang.StringUtils;

public class PollutantLicenseAction extends BaseAction<PollutantLicense, PollutantLicenseService> {
    @AutoService
    private PollutantLicenseService pollutantLicenseService;
    @AutoService
    private AttachmentService attachmentService;
    @Override
    protected PollutantLicenseService getService() {
        return pollutantLicenseService;
    }

    @Override
    protected QueryCondition getQueryCondition() {
        String endDate = request.getParameter("endStartDate");
        String endCreateDate = request.getParameter("endEndDate");
        QueryParam param=new QueryParam();
        if(StringUtils.isNotBlank(entity.getEnterpriseId())){
            param.andParam(new QueryParam("enterpriseId", QueryOperator.LIKE,entity.getEnterpriseId()));
        }
        if (StringUtils.isNotBlank(entity.getType())) {
            param.andParam(new QueryParam("type", QueryOperator.LIKE,entity.getType()));
        }
        if (StringUtils.isNotEmpty(endDate)){
            param.andParam(new QueryParam("endDate", QueryOperator.GE, DateUtil.strToDate(endDate,"yyyy-MM-dd")));
        }
        if (StringUtils.isNotEmpty(endCreateDate)){
            param.andParam(new QueryParam("endDate", QueryOperator.LE, DateUtil.strToDate(endCreateDate,"yyyy-MM-dd")));
        }
        QueryCondition condition=new QueryCondition();
        if (param.getField()!=null) {
            condition.setParam(param);
        }
        condition.setPaging(getPaging());
        return condition;
    }

    @Override
    public void save() {//获取删除的附件IDS

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