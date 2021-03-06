package com.harmonywisdom.dshbcbp.office.action;

import com.harmonywisdom.dshbcbp.office.bean.PubInfoRelTable;
import com.harmonywisdom.dshbcbp.office.service.PubInfoRelTableService;
import com.harmonywisdom.dshbcbp.utils.MyDateUtils;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.dao.Direction;
import com.harmonywisdom.framework.dao.QueryCondition;
import com.harmonywisdom.framework.dao.QueryOperator;
import com.harmonywisdom.framework.dao.QueryParam;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.lang.StringUtils;

public class PubInfoRelTableAction extends BaseAction<PubInfoRelTable, PubInfoRelTableService> {
    @AutoService
    private PubInfoRelTableService pubInfoRelTableService;

    @Override
    protected PubInfoRelTableService getService() {
        return pubInfoRelTableService;
    }

    @Override
    protected QueryCondition getQueryCondition() {
        String StrGrade = request.getParameter("grades");
        String enterpriseReleaseStatus = request.getParameter("enterpriseStatus");
        String mobileOperType = request.getParameter("mobileOperType");

        QueryParam param = new QueryParam();
        if(enterpriseReleaseStatus != null && !"".equals(enterpriseReleaseStatus)){
            param.andParam(new QueryParam("status",QueryOperator.EQ,enterpriseReleaseStatus));
        }
        if (StringUtils.isNotBlank(entity.getOrgId())) {
            param.andParam(new QueryParam("orgId", QueryOperator.EQ, entity.getOrgId()));
        }
        if (StringUtils.isNotBlank(entity.getTitle())) {
            param.andParam(new QueryParam("title", QueryOperator.LIKE, entity.getTitle()));
        }
        if (StringUtils.isNotBlank(entity.getPubOrgName())) {
            param.andParam(new QueryParam("pubOrgName", QueryOperator.LIKE, entity.getPubOrgName()));
        }
        if (StringUtils.isNotBlank(entity.getType())) {
            param.andParam(new QueryParam("type", QueryOperator.LIKE, entity.getType()));
        }
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        if(StringUtils.isNotBlank(startTime)){
            param.andParam(new QueryParam("pubTime", QueryOperator.GE, MyDateUtils.getFullDate(startTime,true)));
        }
        if(StringUtils.isNotBlank(endTime)){
            param.andParam(new QueryParam("pubTime", QueryOperator.LE,MyDateUtils.getFullDate(endTime,false)));
        }
        if("1".equals(mobileOperType)){//下拉
//            log.debug("下拉："+DateUtil.dateToStr(entity.getMobileTimestamp(),"yyyy-MM-dd HH:mm:ss"));
            if (null!=entity.getMobileTimestamp()){
                param.andParam(new QueryParam("mobileTimestamp",QueryOperator.GT, entity.getMobileTimestamp()));
            }
        }else if("2".equals(mobileOperType)){//上拉
//            log.debug("上拉："+DateUtil.dateToStr(entity.getMobileTimestamp(),"yyyy-MM-dd HH:mm:ss"));
            if (null!=entity.getMobileTimestamp()){
                param.andParam(new QueryParam("mobileTimestamp",QueryOperator.LT, entity.getMobileTimestamp()));
            }
        }

        QueryCondition condition = new QueryCondition();
        if (param.getField() != null) {
            condition.setParam(param);
        }
        condition.setPaging(getPaging());
        condition.setOrderBy("pubTime", Direction.DESC);
        condition.setOrderBy("status", Direction.ASC);
        if (StringUtils.isNotEmpty(mobileOperType)){
            condition.setOrderBy("mobileTimestamp", Direction.DESC);
        }
        return condition;
    }
}