package com.harmonywisdom.dshbcbp.enterprise.bean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 大气污染治理设施
 */
@Entity
@Table(name = "HW_GAS_CONTROL_FACILITY")
public class GasControlFacility implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(length = 32)
    private String id;

    /**
     * 设施名称
     **/
    @Column(name = "name", length = 50)
    private String name;
    /**
     * 建设日期
     **/
    @Column(name = "CREATE_TIME")
    private Date createTime;
    /**
     * 运行状态
     * 0:异常
     * 1:正常
     **/
    @Column(name = "STATUS", length = 1)
    private String status;
    /**
     * 投运日期
     **/
    @Column(name = "OPEN_DATE")
    private Date openDate;
    /**
     * 处理工艺
     **/
    @Column(name = "CRAFTS", length = 50)
    private String crafts;
    /**
     * 设计处理能力
     **/
    @Column(name = "ABILITY", length = 50)
    private String ability;
    /**
     * 附件
     **/
    @Transient
    private String attachmentId;
    /**
     * 企业id
     **/
    @Column(name = "ENTERPRISE_ID", length = 32)
    private String enterpriseId;

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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getOpenDate() {
        return openDate;
    }

    public void setOpenDate(Date openDate) {
        this.openDate = openDate;
    }

    public String getCrafts() {
        return crafts;
    }

    public void setCrafts(String crafts) {
        this.crafts = crafts;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(String attachmentId) {
        this.attachmentId = attachmentId;
    }

    public String getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(String enterpriseId) {
        this.enterpriseId = enterpriseId;
    }
}