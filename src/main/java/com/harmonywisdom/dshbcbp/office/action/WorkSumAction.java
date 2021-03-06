package com.harmonywisdom.dshbcbp.office.action;

import com.harmonywisdom.apportal.sdk.org.IOrg;
import com.harmonywisdom.dshbcbp.attachment.service.AttachmentService;
import com.harmonywisdom.dshbcbp.office.bean.WorkSum;
import com.harmonywisdom.dshbcbp.office.service.WorkSumService;
import com.harmonywisdom.dshbcbp.utils.ApportalUtil;
import com.harmonywisdom.dshbcbp.utils.MyDateUtils;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.dao.*;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.lang.StringUtils;

import java.util.Date;

public class WorkSumAction extends BaseAction<WorkSum, WorkSumService> {
    @AutoService
    private WorkSumService workSumService;

    @AutoService
    private AttachmentService attachmentService;
    @Override
    protected WorkSumService getService() {
        return workSumService;
    }

    @Override
    protected QueryCondition getQueryCondition() {
        QueryParam param=new QueryParam();

        /*if (StringUtils.isNotBlank(entity.getPubOrgId())) {
            param.andParam(new QueryParam("pubOrgId", QueryOperator.EQ,entity.getPubOrgId()));
            param.orParam(new QueryParam("otherCouldLook", QueryOperator.EQ,"1"));
        }*/
        if (StringUtils.isNotBlank(entity.getTitle())) {
            param.andParam(new QueryParam("title", QueryOperator.LIKE,"%"+entity.getTitle()+"%"));
        }
        if (StringUtils.isNotBlank(entity.getType())) {
            param.andParam(new QueryParam("type", QueryOperator.EQ,entity.getType()));
        }
        if (StringUtils.isNotBlank(entity.getPubOrgName())) {
            param.andParam(new QueryParam("pubOrgName", QueryOperator.LIKE,"%"+entity.getPubOrgName()+"%"));
        }
        IOrg iOrg = ApportalUtil.getIOrgOfCurrentUser(request);
        if(iOrg!=null){this.entity.setPubOrgId(iOrg.getOrgId());}
        if (StringUtils.isNotBlank(entity.getPublishStatus())) {
            param.andParam(new QueryParam("publishStatus", QueryOperator.EQ,entity.getPublishStatus()));
            param.andParam(new QueryParam("pubOrgId", QueryOperator.EQ,entity.getPubOrgId()));
        }else{
            param.andParam(new QueryParam("publishStatus", QueryOperator.EQ,"1"));
            QueryParam otherparam=new QueryParam();
            otherparam.andParam(new QueryParam("pubOrgId", QueryOperator.EQ,entity.getPubOrgId()));
            otherparam.andParam(new QueryParam("publishStatus", QueryOperator.EQ,"0"));
            param.andParam(otherparam);
        }
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        if(StringUtils.isNotBlank(startTime)){
            param.andParam(new QueryParam("pubTime", QueryOperator.GE, MyDateUtils.getFullDate(startTime,true)));
        }
        if(StringUtils.isNotBlank(endTime)){
            param.andParam(new QueryParam("pubTime", QueryOperator.LE,MyDateUtils.getFullDate(endTime,false)));
        }

        QueryCondition condition=new QueryCondition();
        if (param.getField()!=null) {
            condition.setParam(param);
        }
        condition.setPaging(getPaging());
        condition.setOrderBy("pubTime", Direction.DESC);
        return condition;
    }

    @Override
    public void list() {
        QueryCondition var1 = this.getQueryCondition();
        QueryResult<WorkSum> queryResult = new QueryResult<WorkSum>();
        try {
            queryResult = var1!=null?this.getService().find(var1,this.entity):this.getService().findBySample(this.entity, this.getPaging(), this.getOrderBy(), this.getDirection());
        } catch (Exception var2) {
            this.log.error(var2.getMessage(), var2);
            queryResult = new QueryResult();
        }
        write(queryResult);
    }

    @Override
    public void save() {
        //获取删除的附件IDS
        String attachmentIdsRemoveId = request.getParameter("removeId");
        if(StringUtils.isNotBlank(attachmentIdsRemoveId)){
            //删除附件
            attachmentService.removeByIds(attachmentIdsRemoveId.split(","));
        }
        if(StringUtils.isNotBlank(entity.getPublishStatus()) && "1".equals(entity.getPublishStatus())){
            entity.setPubTime(new Date());
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