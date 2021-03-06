package com.harmonywisdom.dshbcbp.dispatch.bean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 执法管理列表
 * 注：处罚加了单独的字段：punishStatus
 */
@Entity
@Table(name = "HW_DISPATCH_TASK")
public class DispatchTask implements Serializable {
    private static final long serialVersionUID = 1L;

    //**************************  事件状态  ****************************//
    /**
     * 未调度
     */
    public static final String status_1="1";
    /**
     * 已发送
     */
    public static final String status_2="2";
    /**
     *已反馈
     */
    public static final String status_3="3";
    /**
     *已处罚
     */
    public static final String status_4="4";
    /**
     *已办结
     */
    public static final String status_5="5";
    //**************************  事件状态  ****************************//

    @Id
    @Column(length = 32)
    private String id;

    /**
     * 1:未调度
     * 2:已发送
     * 3:已反馈
     * 4:已处罚
     * 5:已办结
     * 状态
     */
    @Column(name = "status", length = 2)
    private String status;

    /**
     * 处罚状态：
     * 1 已处罚
     * 0 未处罚
     */
    @Column(name = "punish_status", length = 2)
    private String punishStatus;



    /**
     * 办结时间
     */
    @Column(name = "over_time")
    private Date overTime;

    /**
     * 办结意见
     */
    @Column(name = "over_suggestion")
    private String overSuggestion;

    //--------------  查看状态  --------------------------//
    /**
     * 监察大队查看状态：
     * 1 已查看
     * 其他 未查看
     */
    @Column(name = "monitor_master_self_read_status", length = 2)
    private String monitorMasterSelfReadStatus;

    /**
     * 环保站查看状态：
     * 1 已查看
     * 其他 未查看
     */
    @Column(name = "huan_bao_zhan_self_read_status", length = 2)
    private String huanBaoZhanSelfReadStatus;
    //--------------  查看状态  --------------------------//


    //--------------  现场监察监测报告  --------------------------//
    /**
     * 现场监察报告是否填写状态：0未报送，1已报送
     */
    @Column(name = "monitor_report_status", length = 2)
    private String monitorReportStatus;
    /**
     * 现场监察报告读取状态：0未读，1已读
     */
    @Column(name = "monitor_report_read_status", length = 2)
    private String monitorReportReadStatus;
    /**
     * 报送人
     */
    @Column(name = "submit_person")
    private String submitPerson;
    @Column(name = "submit_person_phone")
    private String submitPersonPhone;
    /**
     * 检测报告备注
     */
    @Column(name = "monitor_report_remark")
    private String monitorReportRemark;
    //--------------  现场监察监测报告  --------------------------//

    @Column(name = "monitor_case_id")
    private String monitorCaseId;

    /**
     * 监察大队领导人员列表
     */
    @Column(name = "monitor_mastor_person_list")
    private String monitorMasterPersonList;
    @Column(name = "monitor_mastor_person_name_list")
    private String monitorMasterPersonNameList;


    /**
     * 选择的发送给环保站的人员  污控室人员列表
     */
    @Column(name="env_pro_sta_person_list")
    private String envProStaPersonList;
    @Column(name="env_pro_sta_person_name_list")
    private String envProStaPersonNameList;


    /**
     * 事件来源，信息来源
     * 监察大队办公司： 1：12369   2：区长热线   3：市长热线   4：现场监察
     * 监控中心：0
     */
    @Column(name = "source")
    private String source;


    /**
     * 企业，投诉对象
     */
    @Column(name = "enterprise_id")
    private String enterpriseId;
    @Column(name = "enterprise_name")
    private String enterpriseName;

    /**
     * 事件时间,接电时间
     */
    @Column(name = "event_time")
    private Date eventTime;

    /**
     * 网格级别
     */
    @Column(name = "block_level_id")
    private String blockLevelId;
    @Column(name = "block_level_name")
    private String blockLevelName;
    /**
     * 所属网格
     */
    @Column(name = "block_id", length = 32)
    private String blockId;
    @Column(name = "block_name")
    private String blockName;

    /**
     * 接电人
     */
    @Column(name = "answer")
    private String answer;

    /**
     * 监管人员
     */
    @Column(name = "supervisor")
    private String supervisor;
    @Column(name = "supervisor_phone")
    private String supervisorPhone;

    /**
     * 原因
     * 1.异常
     * 2.超标
     */
    @Column(name = "reason", length = 2)
    private String reason;

    /**
     * 事件原因
     */
    @Column(name = "case_reason",columnDefinition = "longtext")
    private String caseReason;

    /**
     * 排口名称
     */
    @Column(name = "port_name")
    private String portName;
    /**
     * 污染源类型
     */
    @Column(name = "pollutant_type")
    private String pollutantType;

    /**
     * 超标项
     */
    @Column(name = "over_obj")
    private String overObj;


    /**
     * 超标值
     */
    @Column(name = "over_value")
    private String overValue;
    /**
     * 超标阈值
     */
    @Column(name = "thr_value")
    private String thrValue;

    /**
     * 事件内容
     */
    @Column(name = "content")
    private String content;

    /**
     * 处理人、发送人
     */
    @Column(name = "sender_id", length = 32)
    private String senderId;
    @Column(name = "sender_name", length = 20)
    private String senderName;
    @Column(name = "send_time")
    private Date sendTime;
    @Column(name = "send_phone")
    private String sendPhone;

    /**
     * 举报人
     */
    @Column(name = "informer")
    private String informer;
    @Column(name = "informer_phone")
    private String informerPhone;

    /**
     * 调度人
     */
    @Column(name = "dispatch_person_name", length = 20)
    private String dispatchPersonName;
    /**
     * 调度时间
     */
    @Column(name = "dispatch_time")
    private Date dispatchTime;
    /**
     * 调度内容
     */
    @Column(name = "dispatch_content")
    private String dispatchContent;

    /**
     * 备注
     */
    @Column(name = "send_remark")
    private String sendRemark;

    /**
     * 最后修改时间，每次修改的时候都需要修改该字段
     */
    @Column(name = "update_time")
    private Date updateTime;



    ///////////////////////////////////////////////////

    /**
     * 投诉对象负责人
     */
    @Column(name = "target_linkman", length = 20)
    private String targetLinkman;

    @Column(name = "target_linkphone", length = 11)
    private String targetLinkPhone;



    /**
     * 处理人id
     */
    @Column(name = "handler_id", length = 32)
    private String handlerId;
    /**
     * 处理人姓名
     */
    @Column(name = "handler_name", length = 32)
    private String handlerName;
    /**
     * 处理人电话
     */
    @Column(name = "handler_phone", length = 11)
    private String handlerPhone;

    /**
     * `mobile_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mobile_timestamp",columnDefinition = "CURRENT_TIMESTAMP")
    private Date mobileTimestamp;


    @Transient
    private String attachmentIds;

    public String getAttachmentIds() {
        return attachmentIds;
    }

    public void setAttachmentIds(String attachmentIds) {
        this.attachmentIds = attachmentIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMonitorMasterPersonList() {
        return monitorMasterPersonList;
    }

    public void setMonitorMasterPersonList(String selectPeopleIds) {
        this.monitorMasterPersonList = selectPeopleIds;
    }

    public String getMonitorCaseId() {
        return monitorCaseId;
    }

    public void setMonitorCaseId(String monitorCaseId) {
        this.monitorCaseId = monitorCaseId;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(String enterpriseId) {
        this.enterpriseId = enterpriseId;
    }

    public String getEnterpriseName() {
        return enterpriseName;
    }

    public void setEnterpriseName(String enterpriseName) {
        this.enterpriseName = enterpriseName;
    }

    public Date getEventTime() {
        return eventTime;
    }

    public void setEventTime(Date eventTime) {
        this.eventTime = eventTime;
    }

    public String getBlockLevelName() {
        return blockLevelName;
    }

    public void setBlockLevelName(String blockLevelName) {
        this.blockLevelName = blockLevelName;
    }

    public String getBlockName() {
        return blockName;
    }

    public void setBlockName(String blockName) {
        this.blockName = blockName;
    }


    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
        this.supervisor = supervisor;
    }

    public String getSupervisorPhone() {
        return supervisorPhone;
    }

    public void setSupervisorPhone(String supervisorPhone) {
        this.supervisorPhone = supervisorPhone;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getOverValue() {
        return overValue;
    }

    public void setOverValue(String overValue) {
        this.overValue = overValue;
    }

    public String getThrValue() {
        return thrValue;
    }

    public void setThrValue(String thrValue) {
        this.thrValue = thrValue;
    }

    public String getSendPhone() {
        return sendPhone;
    }

    public void setSendPhone(String sendPhone) {
        this.sendPhone = sendPhone;
    }

    public String getBlockLevelId() {
        return blockLevelId;
    }

    public void setBlockLevelId(String blockLevelId) {
        this.blockLevelId = blockLevelId;
    }

    public String getBlockId() {
        return blockId;
    }

    public void setBlockId(String blockId) {
        this.blockId = blockId;
    }


    public String getTargetLinkman() {
        return targetLinkman;
    }

    public void setTargetLinkman(String targetLinkman) {
        this.targetLinkman = targetLinkman;
    }

    public String getTargetLinkPhone() {
        return targetLinkPhone;
    }

    public void setTargetLinkPhone(String targetLinkPhone) {
        this.targetLinkPhone = targetLinkPhone;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public Date getSendTime() {
        return sendTime;
    }

    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }

    public String getSendRemark() {
        return sendRemark;
    }

    public void setSendRemark(String sendRemark) {
        this.sendRemark = sendRemark;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getHandlerId() {
        return handlerId;
    }

    public void setHandlerId(String handlerId) {
        this.handlerId = handlerId;
    }

    public String getHandlerName() {
        return handlerName;
    }

    public void setHandlerName(String handlerName) {
        this.handlerName = handlerName;
    }

    public String getHandlerPhone() {
        return handlerPhone;
    }

    public void setHandlerPhone(String handlerPhone) {
        this.handlerPhone = handlerPhone;
    }

    public String getEnvProStaPersonList() {
        return envProStaPersonList;
    }

    public void setEnvProStaPersonList(String envProStaPersonList) {
        this.envProStaPersonList = envProStaPersonList;
    }

    public String getMonitorReportStatus() {
        return monitorReportStatus;
    }

    public void setMonitorReportStatus(String monitorReportStatus) {
        this.monitorReportStatus = monitorReportStatus;
    }

    public String getMonitorReportReadStatus() {
        return monitorReportReadStatus;
    }

    public void setMonitorReportReadStatus(String monitorReportReadStatus) {
        this.monitorReportReadStatus = monitorReportReadStatus;
    }

    public String getSubmitPerson() {
        return submitPerson;
    }

    public void setSubmitPerson(String submitPerson) {
        this.submitPerson = submitPerson;
    }

    public String getSubmitPersonPhone() {
        return submitPersonPhone;
    }

    public void setSubmitPersonPhone(String submitPersonPhone) {
        this.submitPersonPhone = submitPersonPhone;
    }

    public String getMonitorReportRemark() {
        return monitorReportRemark;
    }

    public void setMonitorReportRemark(String monitorReportRemark) {
        this.monitorReportRemark = monitorReportRemark;
    }

    public String getMonitorMasterSelfReadStatus() {
        return monitorMasterSelfReadStatus;
    }

    public void setMonitorMasterSelfReadStatus(String monitorMasterSelfReadStatus) {
        this.monitorMasterSelfReadStatus = monitorMasterSelfReadStatus;
    }

    public String getHuanBaoZhanSelfReadStatus() {
        return huanBaoZhanSelfReadStatus;
    }

    public void setHuanBaoZhanSelfReadStatus(String huanBaoZhanSelfReadStatus) {
        this.huanBaoZhanSelfReadStatus = huanBaoZhanSelfReadStatus;
    }

    public String getEnvProStaPersonNameList() {
        return envProStaPersonNameList;
    }

    public void setEnvProStaPersonNameList(String envProStaPersonNameList) {
        this.envProStaPersonNameList = envProStaPersonNameList;
    }

    public String getMonitorMasterPersonNameList() {
        return monitorMasterPersonNameList;
    }

    public void setMonitorMasterPersonNameList(String monitorMastorPersonNameList) {
        this.monitorMasterPersonNameList = monitorMastorPersonNameList;
    }

    public Date getOverTime() {
        return overTime;
    }

    public void setOverTime(Date overTime) {
        this.overTime = overTime;
    }

    public String getDispatchContent() {
        return dispatchContent;
    }

    public void setDispatchContent(String dispatchContent) {
        this.dispatchContent = dispatchContent;
    }

    public String getDispatchPersonName() {
        return dispatchPersonName;
    }

    public void setDispatchPersonName(String dispatchPersonName) {
        this.dispatchPersonName = dispatchPersonName;
    }

    public Date getDispatchTime() {
        return dispatchTime;
    }

    public void setDispatchTime(Date dispatchTime) {
        this.dispatchTime = dispatchTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getCaseReason() {
        return caseReason;
    }

    public void setCaseReason(String eventReason) {
        this.caseReason = eventReason;
    }

    public String getOverSuggestion() {
        return overSuggestion;
    }

    public void setOverSuggestion(String overSuggestion) {
        this.overSuggestion = overSuggestion;
    }

    public String getInformer() {
        return informer;
    }

    public void setInformer(String informer) {
        this.informer = informer;
    }

    public String getInformerPhone() {
        return informerPhone;
    }

    public void setInformerPhone(String informerPhone) {
        this.informerPhone = informerPhone;
    }

    public String getPortName() {
        return portName;
    }

    public void setPortName(String portName) {
        this.portName = portName;
    }

    public String getPollutantType() {
        return pollutantType;
    }

    public void setPollutantType(String pollutantType) {
        this.pollutantType = pollutantType;
    }

    public String getOverObj() {
        return overObj;
    }

    public void setOverObj(String overObj) {
        this.overObj = overObj;
    }

    public Date getMobileTimestamp() {
        return mobileTimestamp;
    }

    public void setMobileTimestamp(Date mobileTimestamp) {
        this.mobileTimestamp = mobileTimestamp;
    }

    public String getPunishStatus() {
        return punishStatus;
    }

    public void setPunishStatus(String punishStatus) {
        this.punishStatus = punishStatus;
    }
}