package com.harmonywisdom.dshbcbp.port.action;

import com.harmonywisdom.apportal.sdk.person.IPerson;
import com.harmonywisdom.dshbcbp.attachment.service.AttachmentService;
import com.harmonywisdom.dshbcbp.port.bean.NoisePort;
import com.harmonywisdom.dshbcbp.port.service.NoisePortService;
import com.harmonywisdom.dshbcbp.utils.ApportalUtil;
import com.harmonywisdom.dshbcbp.utils.CommonUtil;
import com.harmonywisdom.dshbcbp.utils.Constants;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.dao.Direction;
import com.harmonywisdom.framework.dao.QueryCondition;
import com.harmonywisdom.framework.dao.QueryOperator;
import com.harmonywisdom.framework.dao.QueryParam;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.lang.StringUtils;
import org.springframework.util.Assert;

import java.util.Date;
import java.util.List;

public class NoisePortAction extends BaseAction<NoisePort, NoisePortService> {
    @AutoService
    private NoisePortService noisePortService;

    @Override
    protected NoisePortService getService() {
        return noisePortService;
    }

    @AutoService
    private AttachmentService attachmentService;

    @Override
    protected QueryCondition getQueryCondition() {
        QueryParam param = new QueryParam();
        if (StringUtils.isNotBlank(entity.getEnterpriseId())) {
            param.andParam(new QueryParam("enterpriseId", QueryOperator.EQ,entity.getEnterpriseId()));
        }
        if (StringUtils.isNotBlank(entity.getType())) {
            param.andParam(new QueryParam("type", QueryOperator.EQ,entity.getType()));
        }
        if (StringUtils.isNotBlank(entity.getNumber())) {
            param.andParam(new QueryParam("number", QueryOperator.LIKE,"%"+entity.getNumber()+"%"));
        }
        if (StringUtils.isNotBlank(entity.getName())) {
            param.andParam(new QueryParam("name", QueryOperator.LIKE,"%"+entity.getName()+"%"));
        }

        QueryCondition condition = new QueryCondition();
        if (param.getField() != null) {
            condition.setParam(param);
        }
        condition.setPaging(getPaging());
        condition.setOrderBy("createTime", Direction.DESC);
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
        if(entity.getCreateTime()==null){
            entity.setCreateTime(new Date());
        }

        String entityId = entity.getId();
        super.save();
        IPerson iPerson = ApportalUtil.getPerson(request);
        if(StringUtils.isNotBlank(entityId)){
            CommonUtil.insertBaseOpLog(iPerson.getPersonId(), Constants.OPTYPE_UPDATE,"企业台账","噪声排口信息",entity.getId());
        }else{
            CommonUtil.insertBaseOpLog(iPerson.getPersonId(), Constants.OPTYPE_ADD,"企业台账","噪声排口信息",entity.getId());
        }

        if(StringUtils.isNotBlank(entity.getAttachmentId())){
            attachmentService.updateBusinessId(entity.getId(),entity.getAttachmentId().split(","));

        }
    }

    /**
     * 删除实体时删除关联的附件
     */
    @Override
    public void delete() {
        String[] deleteIds = request.getParameterValues("deletedId");
        Assert.notEmpty(deleteIds, "ID为空，无法删除。请指定要删除的记录的主键值");
        StringBuffer sb = new StringBuffer();
        if(deleteIds.length>0){
            for(int i = 0; i < deleteIds.length; i++){
                noisePortService.delete(deleteIds[i]);
                if(i==0){
                    sb.append(deleteIds[i]);
                }else{
                    sb.append(","+deleteIds[i]);
                }
            }
            String deleteId =sb.toString();
            attachmentService.removeByBusinessIds(deleteId);
        }
        IPerson iPerson = ApportalUtil.getPerson(request);
        CommonUtil.insertAllOpLog(iPerson.getPersonId(), Constants.OPTYPE_DELETE,"企业台账","噪声排口","FumesPort",sb.toString(),null);
        write(Boolean.TRUE, "删除成功");
    }

    /**
     * 根据ID获取排口信息
     */
    public void getEntityById(){
        write(noisePortService.findById(entity.getId()));
    }

    public void findByIds(){
        String[] ids = request.getParameterValues("ids");
        if (ids != null && ids.length > 0) {
            List<NoisePort> list = getService().findByIds(ids);
            write(list);
        }
    }

    /**
     * 获取噪声排口实时数据
     */
    public void realTimeNoisesPort(){
        List<NoisePort> list = noisePortService.findAll();
        write(list);

    }

    /**
     * 一张图圈选噪声监测
     */
    public void circleQueryNoise(){
        String radius = request.getParameter("radius");
        String longitude = request.getParameter("longitude");
        String latitude = request.getParameter("latitude");
        List<NoisePort> noisePorts = getService().circleQueryNoise(radius,longitude,latitude);
        write(noisePorts);
    }


}