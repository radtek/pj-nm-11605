package com.harmonywisdom.dshbcbp.exelaw.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 问题整改
 */
@Entity
@Table(name = "HW_PROBLEM_CORRECT")
public class ProblemCorrect implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(length = 32)
    private String id;

    /**
     * 台账编号
     */
    @Column(name = "code", length = 32)
    private String code;
    /**
     * 存在的问题
     */
    @Column(name = "problem")
    private String problem;
    /**
     * 整改情况
     */
    @Column(name = "correct_desc")
    private String correctDesc;
    /**
     * 进度
     */
    @Column(name = "progress")
    private Double progress;

    @Column(name = "attachment_id", length = 32)
    private String attachmentId;

    @Column(name = "create_time")
    private Date createTime;
    /**
     * 问题类型
     */
    @Column(name = "problem_type", length = 2)
    private String problemType;

    @Column(name = "enterprise_id", length = 32)
    private String enterpriseId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public String getCorrectDesc() {
        return correctDesc;
    }

    public void setCorrectDesc(String correctDesc) {
        this.correctDesc = correctDesc;
    }

    public Double getProgress() {
        return progress;
    }

    public void setProgress(Double progress) {
        this.progress = progress;
    }

    public String getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(String attachmentId) {
        this.attachmentId = attachmentId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getProblemType() {
        return problemType;
    }

    public void setProblemType(String problemType) {
        this.problemType = problemType;
    }

    public String getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(String enterpriseId) {
        this.enterpriseId = enterpriseId;
    }


}