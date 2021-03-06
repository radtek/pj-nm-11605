package com.harmonywisdom.dshbcbp.office.action;

import com.harmonywisdom.apportal.sdk.org.IOrg;
import com.harmonywisdom.apportal.sdk.person.IPerson;
import com.harmonywisdom.dshbcbp.alert.service.MessageService;
import com.harmonywisdom.dshbcbp.attachment.service.AttachmentService;
import com.harmonywisdom.dshbcbp.office.bean.Task;
import com.harmonywisdom.dshbcbp.office.service.TaskService;
import com.harmonywisdom.dshbcbp.utils.ApportalUtil;
import com.harmonywisdom.dshbcbp.utils.MyDateUtils;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.dao.Direction;
import com.harmonywisdom.framework.dao.QueryCondition;
import com.harmonywisdom.framework.dao.QueryOperator;
import com.harmonywisdom.framework.dao.QueryParam;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.lang.StringUtils;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class TaskAction extends BaseAction<Task, TaskService> {
    @AutoService
    private TaskService taskService;
    @AutoService
    private AttachmentService attachmentService;
    @AutoService
    private MessageService messageService;
    @Override
    protected TaskService getService() {
        return taskService;
    }

    @Override
    protected QueryCondition getQueryCondition() {
        QueryParam param=new QueryParam();

        String mobileOperType = request.getParameter("mobileOperType");

        if(StringUtils.isNotBlank(entity.getTaskType())){
            param.andParam(new QueryParam("taskType", QueryOperator.EQ,entity.getTaskType()));
        }
        if(StringUtils.isNotBlank(entity.getTaskStatus())){
            if(entity.getTaskStatus().equals("00")){
                param.andParam(new QueryParam("taskStatus", QueryOperator.NE,"0"));
            }else{
                param.andParam(new QueryParam("taskStatus", QueryOperator.EQ,entity.getTaskStatus()));
            }
        }
        if(StringUtils.isNotBlank(entity.getDispatchDutyLeaderId())){
            param.andParam(new QueryParam("dispatchDutyLeaderId", QueryOperator.EQ,entity.getDispatchDutyLeaderId()));
        }
        if(StringUtils.isNotBlank(entity.getDispatchDutyLeader())){
            param.andParam(new QueryParam("dispatchDutyLeader", QueryOperator.LIKE,entity.getDispatchDutyLeader()));
        }
        if(StringUtils.isNotBlank(entity.getDispatchDutyDepartmentCode())){
            param.andParam(new QueryParam("dispatchDutyDepartmentCode", QueryOperator.EQ,entity.getDispatchDutyDepartmentCode()));
        }
        if(StringUtils.isNotBlank(entity.getDispatchDutyDepartment())){
            param.andParam(new QueryParam("dispatchDutyDepartment", QueryOperator.LIKE,entity.getDispatchDutyDepartment()));
        }
        if(StringUtils.isNotBlank(entity.getParentTaskId())){
            param.andParam(new QueryParam("parentTaskId", QueryOperator.EQ,entity.getParentTaskId()));
        }
        if(StringUtils.isNotBlank(entity.getParentTaskName())){
            param.andParam(new QueryParam("parentTaskName", QueryOperator.LIKE,"%"+entity.getParentTaskName()+"%"));
        }
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        if(StringUtils.isNotBlank(startTime)){
            param.andParam(new QueryParam("taskPubTime", QueryOperator.GE, MyDateUtils.getFullDate(startTime,true)));
        }
        if(StringUtils.isNotBlank(endTime)){
            param.andParam(new QueryParam("taskPubTime", QueryOperator.LE,MyDateUtils.getFullDate(endTime,false)));
        }

        QueryCondition condition=new QueryCondition();
        if (param.getField()!=null) {
            condition.setParam(param);
        }
        condition.setPaging(getPaging());
        condition.setOrderBy("taskPubTime", Direction.DESC);
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
        IPerson iPerson = ApportalUtil.getPerson(request);
        if(StringUtils.isBlank(entity.getId())){
            entity.setTaskCreatorId(iPerson.getUserId());
            entity.setTaskCreator(iPerson.getUserName());
            entity.setTaskCreateTime(new Date());
        }

        super.save();

        if (StringUtils.isNotBlank(entity.getAttachmentIds())){
            attachmentService.updateBusinessId(entity.getId(),entity.getAttachmentIds().split(","));
        }

        if(StringUtils.isNotBlank(entity.getTaskType()) && !entity.getTaskType().equals(Task.TASK_TYPE_BIG)){
            Task task = taskService.findById(entity.getParentTaskId());
            task.setIsHaveChild("1");
            if(!"0".equals(entity.getTaskStatus())){
                task.setTaskStatus(entity.getTaskStatus());
            }
            if(StringUtils.isNotBlank(entity.getTaskStatus()) && "1".equals(entity.getTaskStatus())){
                entity.setTaskPubTime(new Date());
                entity.setTaskPubUserId(iPerson.getUserId());
                entity.setWarnStatus("1");

                Calendar ca=Calendar.getInstance();
                ca.setTime(entity.getTaskPubTime());
                ca.add(Calendar.DAY_OF_MONTH,entity.getWarnFrequency());
                entity.setWarnTime(ca.getTime());

                if(entity.getTaskType().equals(Task.TASK_TYPE_LITTLE)){
                    taskService.sendMessage(entity,"新任务提醒!");
                }
            }
            taskService.update(task);
            taskService.update(entity);
        }
    }

    /**
     * 删除实体时删除关联的附件
     */
    @Override
    public void delete() {
        String deleteId = request.getParameter("deletedId");
        super.delete();
        if(StringUtils.isNotBlank(deleteId)){
            attachmentService.removeByBusinessIds(deleteId);
        }
    }

    public void getDispatchDutyLeaders(){
        String orgCode = request.getParameter("orgCode");
        List<IPerson> iPersons = ApportalUtil.getIPersonListByOrgCode(orgCode);
        write(iPersons);
    }

    public void getDispatchDutyDepartments(){
        String orgCode = request.getParameter("orgCode");
        List<IOrg> iOrgs = ApportalUtil.getIOrgChildListByOrgCode(orgCode);
        write(iOrgs);
    }
}