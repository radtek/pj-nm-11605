package com.harmonywisdom.dshbcbp.composite.bean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 建设项目
 */
@Entity
@Table(name = "HW_BUILD_PROJECT")
public class BuildProject implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * `mobile_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mobile_timestamp",columnDefinition = "CURRENT_TIMESTAMP")
    private Date mobileTimestamp;

    @Id
    @Column(length = 32)
    private String id;
    /**
     * 项目名称
     */
    @Column(name = "NAME",length = 100)
    private String name;
    /**
     * 环境保护管理类型:
     * 1:报告书
     * 2:报告表
     * 3:登记表
     */
    @Column(name = "ENV_MANAG_TYPE",length = 100)
    private String envManagType;
    /**
     *建设性质
     */
    @Column(name = "BUILD_NATURE",length = 100)
    private String buildNature;
    /**
     *行政区
     */
    @Column(name = "AREA",length = 100)
    private String area;
    /**
     *建设地点
     */
    @Column(name = "BUILD_ADDRESS",length = 100)
    private String buildAddress;
    /**
     *行业类型
     */
    @Column(name = "INDUSTRY_TYPE",length = 100)
    private String industryType;
    /**
     *建设内容及规模
     */
    @Column(name = "CONTENT",length = 100)
    private String content;
    /**
     *总投资
     */
    @Column(name = "INVESTMENT",length = 100)
    private String investment;
    /**
     *环保投资
     */
    @Column(name = "ENV_INVESTMENT",length = 100)
    private String envInvestment;
    /**
     *所占比例
     */
    @Column(name = "PROPORTION",length = 100)
    private Double proportion;
    /**
     *建设单位名称
     */
    @Column(name = "BUILDER_NAME",length = 100)
    private String builderName;
    /**
     *建设单位联系电话
     */
    @Column(name = "BUILDER_TEL",length = 100)
    private String builderTel;
    /**
     *建设单位地址
     */
    @Column(name = "BUILDER_ADDRESS",length = 100)
    private String builderAddress;
    /**
     *邮政编码
     */
    @Column(name = "BUILDER_ZIP_CODE",length = 100)
    private String builderZipCode;
    /**
     *法人代表
     */
    @Column(name = "BUILDER_AP",length = 100)
    private String builderAP;
    /**
     *联系人
     */
    @Column(name = "BUILDER_LINKMAN",length = 100)
    private String builderLinkman;
    /**
     *竣工验收单位
     */
    @Column(name = "ACCEPT_ORG",length = 100)
    private String acceptOrg;
    /**
     *竣工验收时间
     */
    @Column(name = "ACCEPT_TIME")
    private Date acceptTime;
    /**
     *附件
     */
    @Transient
    private String attachmentIds;
    /**
     *企业id
     */
    @Column(name = "ENTERPRISE_ID",length = 100)
    private String enterpriseId;
    /**
     * 批复时间
     */
    @Column(name = "REPLY_TIME")
    private Date replyTime;
    /**
     * 是否验收
     * 0否
     * 1是
     */
    @Column(name = "IS_ACCEPTANCE",length = 100)
    private String isAcceptance;
    /**
     * 是否环评
     * 0否
     * 1是
     */
    @Column(name = "IS_EIA",length = 100)
    private String isEIA;
    /**
     *环评批复时间
     */
    @Column(name = "REPLY_EIA_TIME")
    private Date replyEIATime;

    /**
     *验收批复时间
     */
    @Column(name = "REPLY_ACC_TIME")
    private Date replyAccTime;
    @Transient
    private String startDate;
    @Transient
    private String endDate;
    @Transient
    private ProjectEIA projectEIA;
    @Transient
    private ProjectAcceptance projectAcceptance;

    public Date getReplyEIATime() {
        return replyEIATime;
    }

    public void setReplyEIATime(Date replyEIATime) {
        this.replyEIATime = replyEIATime;
    }

    public Date getReplyAccTime() {
        return replyAccTime;
    }

    public void setReplyAccTime(Date replyAccTime) {
        this.replyAccTime = replyAccTime;
    }

    public String getIsAcceptance() {
        return isAcceptance;
    }

    public void setIsAcceptance(String isAcceptance) {
        this.isAcceptance = isAcceptance;
    }

    public String getIsEIA() {
        return isEIA;
    }

    public void setIsEIA(String isEIA) {
        this.isEIA = isEIA;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }


    public Date getReplyTime() {
        return replyTime;
    }

    public void setReplyTime(Date replyTime) {
        this.replyTime = replyTime;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnvManagType() {
        return envManagType;
    }

    public void setEnvManagType(String envManagType) {
        this.envManagType = envManagType;
    }

    public String getEnvInvestment() {
        return envInvestment;
    }

    public void setEnvInvestment(String envInvestment) {
        this.envInvestment = envInvestment;
    }

    public String getBuildNature() {
        return buildNature;
    }

    public void setBuildNature(String buildNature) {
        this.buildNature = buildNature;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getBuildAddress() {
        return buildAddress;
    }

    public void setBuildAddress(String buildAddress) {
        this.buildAddress = buildAddress;
    }

    public String getIndustryType() {
        return industryType;
    }

    public void setIndustryType(String industryType) {
        this.industryType = industryType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getInvestment() {
        return investment;
    }

    public void setInvestment(String investment) {
        this.investment = investment;
    }


    public Double getProportion() {
        return proportion;
    }

    public void setProportion(Double proportion) {
        this.proportion = proportion;
    }

    public String getBuilderName() {
        return builderName;
    }

    public void setBuilderName(String builderName) {
        this.builderName = builderName;
    }

    public String getBuilderTel() {
        return builderTel;
    }

    public void setBuilderTel(String builderTel) {
        this.builderTel = builderTel;
    }

    public String getBuilderAddress() {
        return builderAddress;
    }

    public void setBuilderAddress(String builderAddress) {
        this.builderAddress = builderAddress;
    }

    public String getBuilderZipCode() {
        return builderZipCode;
    }

    public void setBuilderZipCode(String builderZipCode) {
        this.builderZipCode = builderZipCode;
    }

    public String getBuilderAP() {
        return builderAP;
    }

    public void setBuilderAP(String builderAP) {
        this.builderAP = builderAP;
    }

    public String getBuilderLinkman() {
        return builderLinkman;
    }

    public void setBuilderLinkman(String builderLinkman) {
        this.builderLinkman = builderLinkman;
    }

    public String getAcceptOrg() {
        return acceptOrg;
    }

    public void setAcceptOrg(String acceptOrg) {
        this.acceptOrg = acceptOrg;
    }

    public Date getAcceptTime() {
        return acceptTime;
    }

    public void setAcceptTime(Date acceptTime) {
        this.acceptTime = acceptTime;
    }

    public String getAttachmentIds() {
        return attachmentIds;
    }

    public void setAttachmentIds(String attachmentIds) {
        this.attachmentIds = attachmentIds;
    }

    public String getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(String enterpriseId) {
        this.enterpriseId = enterpriseId;
    }

    public ProjectEIA getProjectEIA() {
        return projectEIA;
    }

    public void setProjectEIA(ProjectEIA projectEIA) {
        this.projectEIA = projectEIA;
    }

    public ProjectAcceptance getProjectAcceptance() {
        return projectAcceptance;
    }

    public void setProjectAcceptance(ProjectAcceptance projectAcceptance) {
        this.projectAcceptance = projectAcceptance;
    }

    public Date getMobileTimestamp() {
        return mobileTimestamp;
    }

    public void setMobileTimestamp(Date mobileTimestamp) {
        this.mobileTimestamp = mobileTimestamp;
    }
}