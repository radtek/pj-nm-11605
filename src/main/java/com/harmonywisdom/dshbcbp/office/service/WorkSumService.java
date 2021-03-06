package com.harmonywisdom.dshbcbp.office.service;

import com.harmonywisdom.dshbcbp.office.bean.WorkSum;
import com.harmonywisdom.framework.dao.QueryCondition;
import com.harmonywisdom.framework.dao.QueryResult;
import com.harmonywisdom.framework.service.IBaseService;

public interface WorkSumService extends IBaseService<WorkSum, String> {

    QueryResult<WorkSum> find(QueryCondition var1,WorkSum entity);
}