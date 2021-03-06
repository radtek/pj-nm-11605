package com.harmonywisdom.dshbcbp.dispatch.action;

import com.alibaba.fastjson.JSON;
import com.harmonywisdom.apportal.sdk.org.IOrg;
import com.harmonywisdom.apportal.sdk.org.OrgServiceUtil;
import com.harmonywisdom.apportal.sdk.org.domain.Org;
import com.harmonywisdom.apportal.sdk.person.PersonServiceUtil;
import com.harmonywisdom.apportal.sdk.person.domain.Person;
import com.harmonywisdom.dshbcbp.attachment.service.AttachmentService;
import com.harmonywisdom.dshbcbp.common.dict.util.DateUtil;
import com.harmonywisdom.dshbcbp.composite.bean.Block;
import com.harmonywisdom.dshbcbp.composite.bean.BlockLevel;
import com.harmonywisdom.dshbcbp.composite.service.BlockLevelService;
import com.harmonywisdom.dshbcbp.composite.service.BlockService;
import com.harmonywisdom.dshbcbp.dispatch.bean.Feedback;
import com.harmonywisdom.dshbcbp.dispatch.bean.MonitorCase;
import com.harmonywisdom.dshbcbp.dispatch.bean.OrgPerson;
import com.harmonywisdom.dshbcbp.dispatch.service.DispatchTaskService;
import com.harmonywisdom.dshbcbp.dispatch.service.FeedbackService;
import com.harmonywisdom.dshbcbp.dispatch.service.MonitorCaseService;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.dao.*;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


public class MonitorCaseAction extends BaseAction<MonitorCase, MonitorCaseService> {

    @AutoService
    private MonitorCaseService monitorCaseService;

    @AutoService
    private DispatchTaskService dispatchTaskService;

    @AutoService
    private FeedbackService feedbackService;

    @AutoService
    private BlockLevelService blockLevelService;

    @AutoService
    private BlockService blockService;

    @AutoService
    private AttachmentService attachmentService;

    @Override
    protected MonitorCaseService getService() {
        return monitorCaseService;
    }

    public void queryAlertEnterpriseList(){
        MonitorCase m=new MonitorCase();
        m.setSource("0");
        m.setPortAlertStatus("0");
        List<MonitorCase> list = monitorCaseService.findBySample(m);
        write(list);
    }

    public void setPortAlertStatus(){
        MonitorCase m = monitorCaseService.findById(entity.getId());
        m.setPortAlertStatus(request.getParameter("portAlertStatus"));
        monitorCaseService.update(m);
        write("ok");
    }

    /**
     * 监控中心
     */
    public void updateSelfReadStatus(){
        String id = request.getParameter("id");
        String selfReadStatus = request.getParameter("selfReadStatus");
        MonitorCase byId = monitorCaseService.findById(id);
        byId.setSelfReadStatus(selfReadStatus);
        monitorCaseService.update(byId);
        write("ok");
    }

    public void sendSms(){
        String monitorCaseId = request.getParameter("sourceId");
        MonitorCase mc = monitorCaseService.findByObjectId(monitorCaseId);

        String[] ids = this.getParamValues("ids");
        String jsonIds = JSON.toJSONString(ids);
        mc.setSmsPersonId(jsonIds);
        String[] names = this.getParamValues("names");
        mc.setSmsPersonName(DispatchTaskAction.arrayToString(names,false));
        monitorCaseService.update(mc);
        write(mc);
    }

    /**
     * 根据角色 执法大队领导 得到 人员
     */
    public void getExelawLeaderPersonList(){
        OrgPerson orgPerson=new OrgPerson();
        IOrg orgByOrgCode = OrgServiceUtil.getOrgByOrgCode("0170001300");
        orgPerson.setId(orgByOrgCode.getOrgId());
        orgPerson.setName(orgByOrgCode.getOrgName());
        orgPerson.setParent(true);

        List<OrgPerson> children=new ArrayList<>();
        List<Person> exelawLeaderPersonList = PersonServiceUtil.getPersonByRoleCode("exelawLeader");
        for (Person person : exelawLeaderPersonList) {
            OrgPerson child=new OrgPerson();
            child.setId(person.getUserId());
            child.setName(person.getUserName());
            child.setParent(false);
            Map extattrMap = person.getExtattrMap();
            if (extattrMap!=null){
                Object job = extattrMap.get("job");
                if (job!=null){
                    child.setJob(job.toString());
                }
            }
            children.add(child);
        }
        orgPerson.setChildren(children);
        write(orgPerson);

    }

    @Deprecated
    public void getOrgPersonList(){
        List<OrgPerson> orgPersonList=new LinkedList<OrgPerson>();

        List<Org> allNotDelOrg = OrgServiceUtil.getAllNotDelOrg();
        for (Org org : allNotDelOrg) {

            OrgPerson orgPerson=new OrgPerson();
            orgPerson.setParent(true);
            orgPerson.setId(org.getOrgId());
            orgPerson.setName(org.getOrgName());

            List<Person> personByOrgId = PersonServiceUtil.getPersonByOrgId(org.getOrgId());
            List<OrgPerson> children=new LinkedList<OrgPerson>();
            for (Person person : personByOrgId) {
                OrgPerson child=new OrgPerson();
                child.setId(person.getPersonId());
                child.setName(person.getUserName());
                Map extattrMap = person.getExtattrMap();
                if (extattrMap!=null){
                    Object job = extattrMap.get("job");
                    if (job!=null){
                        child.setJob(job.toString());
                    }
                }
                children.add(child);

            }
            orgPerson.setChildren(children);

            orgPersonList.add(orgPerson);
        }
        write(orgPersonList);

    }

    /**
     * 根据monitorCaseId查询环保站反馈列表
     */
    public void queryFeedbackListByMonitorCaseId(){
        String monitorCaseId = request.getParameter("id");
        if (StringUtils.isNotEmpty(monitorCaseId)){
            MonitorCase monitorCase = monitorCaseService.findById(monitorCaseId);
            String dispatchId = monitorCase.getDispatchId();
            if (StringUtils.isNotEmpty(dispatchId)){
                Feedback fb=new Feedback();
                fb.setDispatchId(dispatchId);
                QueryResult<Feedback> queryResult = feedbackService.findBySample(fb, getPaging());
                write(queryResult);
            }
        }
    }

    @Override
    protected QueryCondition getQueryCondition() {
        QueryParam params = new QueryParam();
        String enterpriseName = entity.getEnterpriseName();
        String reason = entity.getReason();
        String startConnTime = entity.getStartConnTime();
        String endConnTime = entity.getEndConnTime();
        String startSendTime = entity.getStartSendTime();
        String endSendTime = entity.getEndSendTime();
        String blockLevelId = entity.getBlockLevelId();
        String blockId = entity.getBlockId();

        String source = entity.getSource();
        if ("0".equals(source)){ //监测中心的查询
            params.andParam(new QueryParam("source",QueryOperator.EQ,"0"));

            String status_search = request.getParameter("status_search");
            if ("0".equals(status_search)){//监控中心 未调度
                params.andParam(new QueryParam("status",QueryOperator.EQ,"0"));
            }else {//监控中心 已调度
                params.andParam(new QueryParam("status",QueryOperator.NE,"0"));
            }
        }else {//监察大队办公室的查询
            if(null==source){
                params.andParam(new QueryParam("source",QueryOperator.NE,"0"));
            }else {
                params.andParam(new QueryParam("source",QueryOperator.EQ,source));
            }
        }

        if(StringUtils.isNotEmpty(enterpriseName)){
            params.andParam(new QueryParam("enterpriseName",QueryOperator.LIKE,"%"+enterpriseName+"%"));
        }
        if (StringUtils.isNotEmpty(reason)){
            params.andParam(new QueryParam("reason",QueryOperator.EQ,reason));
        }
        if (StringUtils.isNotEmpty(startConnTime)){
            params.andParam(new QueryParam("eventTime",QueryOperator.GE, DateUtil.strToDate(startConnTime,"yyyy-MM-dd HH:mm")));
        }
        if (StringUtils.isNotEmpty(endConnTime)){
            params.andParam(new QueryParam("eventTime",QueryOperator.LE,DateUtil.strToDate(endConnTime,"yyyy-MM-dd HH:mm")));
        }
        if (StringUtils.isNotEmpty(startSendTime)){
            params.andParam(new QueryParam("sendTime",QueryOperator.GE, DateUtil.strToDate(startSendTime,"yyyy-MM-dd HH:mm")));
        }
        if (StringUtils.isNotEmpty(endSendTime)){
            params.andParam(new QueryParam("sendTime",QueryOperator.LE,DateUtil.strToDate(endSendTime,"yyyy-MM-dd HH:mm")));
        }
        if (StringUtils.isNotEmpty(blockLevelId)){
            params.andParam(new QueryParam("blockLevelId",QueryOperator.EQ,blockLevelId));
        }
        if (StringUtils.isNotEmpty(blockId)){
            params.andParam(new QueryParam("blockId",QueryOperator.EQ,blockId));
        }

        QueryCondition condition = new QueryCondition();
        if (params.getField() != null) {
            condition.setParam(params);
        }

        condition.setPaging(getPaging());
        condition.setOrderBy("eventTime", Direction.DESC);
        return condition;
    }

    /**
     * 监察大队办公室 新增或修改事件信息 都必须是 未调度状态 的事件信息
     */
    @Override
    public void save() {

        String sendType = request.getParameter("sendType");
        if ("#smsSend".equals(sendType)){
            write(entity);
            return;
        }else if ("#save".equals(sendType)){
            if (!MonitorCase.status_0.equals(entity.getStatus())){
                log.error("新增或修改事件信息 都必须是 未调度状态 的事件信息");
                return;
            }
            //获取删除的附件IDS
            String attachmentIdsRemoveId = request.getParameter("removeId");
            if(org.apache.commons.lang.StringUtils.isNotBlank(attachmentIdsRemoveId)){
                //删除附件
                attachmentService.removeByIds(attachmentIdsRemoveId.split(","));
            }

            String blockLevelId = entity.getBlockLevelId();
            if (StringUtils.isNotEmpty(blockLevelId)){
                BlockLevel bl = blockLevelService.findById(blockLevelId);
                entity.setBlockLevelName(bl.getName());
            }

            String blockId = entity.getBlockId();
            if (StringUtils.isNotEmpty(blockId)){
                Block b = blockService.findById(blockId);
                entity.setBlockName(b.getOrgName());
            }


            super.save();
            if (org.apache.commons.lang.StringUtils.isNotBlank(entity.getAttachmentIds())){
                attachmentService.updateBusinessId(entity.getId(),entity.getAttachmentIds().split(","));
            }
        }

    }

    public void saveMonitor(){
        String sendType = request.getParameter("sendType");
        if ("#smsSend".equals(sendType)){
            write(entity);
            return;
        }else if ("#save".equals(sendType)){
            if (!MonitorCase.status_0.equals(entity.getStatus())){
                log.error("新增或修改事件信息 都必须是 未调度状态 的事件信息");
                return;
            }

            String id = entity.getId();
            MonitorCase mc = monitorCaseService.findById(id);
            mc.setSenderName(entity.getSenderName());
            mc.setSendTime(entity.getSendTime());
            mc.setContent(entity.getContent());
            mc.setSendRemark(entity.getSendRemark());
            monitorCaseService.update(mc);
            write(mc);
        }
    }

    /**
     * 删除实体时删除关联的附件
     */
    @Override
    public void delete() {
        String deleteId = request.getParameter("deletedId");
        if(org.apache.commons.lang.StringUtils.isNotBlank(deleteId)){
            attachmentService.removeByBusinessIds(deleteId);
        }
        super.delete();
    }

    public void updateEntity(){
        write(String.format("{\"success\": true, \"id\": \"%s\"}", monitorCaseService.updateMonitorCase(entity)));
    }
}