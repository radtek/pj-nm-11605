package com.harmonywisdom.dshbcbp.dispatch.service.impl;

import com.harmonywisdom.dshbcbp.dispatch.bean.DispatchTask;
import com.harmonywisdom.dshbcbp.dispatch.dao.DispatchTaskDAO;
import com.harmonywisdom.dshbcbp.dispatch.service.DispatchTaskService;
import com.harmonywisdom.dshbcbp.utils.EntityUtil;
import com.harmonywisdom.framework.dao.BaseDAO;
import com.harmonywisdom.framework.dao.Paging;
import com.harmonywisdom.framework.dao.QueryResult;
import com.harmonywisdom.framework.service.BaseService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("dispatchTaskService")
public class DispatchTaskServiceImpl extends BaseService<DispatchTask, String> implements DispatchTaskService {
    @Autowired
    private DispatchTaskDAO dispathTaskDAO;

    @Override
    protected BaseDAO<DispatchTask, String> getDAO() {
        return dispathTaskDAO;
    }


    /**
     * 执法统计
     * highchart获取数据
     * @param firstTime
     * @param lastTime
     * @return
     */
    @Override
    public List<Object[]> getByColumnData(String name, String lawType, String firstTime, String lastTime) {
        String whereSql = "AND 1=1 ";
        if(name != null && !"".equals(name)){
            whereSql += "AND enterprise_name LIKE '%" + name + "%'";
        }else if(lawType != null && !"".equals(lawType)) {
            whereSql += "AND source = '" + lawType + "'";
        }
        whereSql += "GROUP BY MONTH";
        List<Object[]> list = getDAO().queryNativeSQL("SELECT DATE_FORMAT(event_time,'%Y-%m')AS MONTH,\n" +
                "(SELECT COUNT(*) FROM `hw_dispatch_task` t0 WHERE DATE_FORMAT(t0.event_time,'%Y-%m') = DATE_FORMAT(t.event_time,'%Y-%m')) AS yjf\n" +
                "FROM `hw_dispatch_task` t WHERE DATE_FORMAT(event_time,'%Y-%m-%d')> '"+firstTime+"' AND DATE_FORMAT(event_time,'%Y-%m-%d')<= '"+lastTime+"'" + whereSql);
        return list;
    }

    /**
     * 执法同期对比分析获取数据
     * @param startSdate
     * @param lastSdate
     * @param name
     * @param lawType
     * @return
     */
    @Override
    public List<Object[]> findByColumnRatio(String startSdate, String lastSdate, String name, String lawType) {
        String strsStart = startSdate.substring(5,7);
        String currentYear = startSdate.substring(0,4);
        String lastYear = String.valueOf((Integer.parseInt(currentYear) -1));
        String strEnd = lastSdate.substring(5,7);
        String whereSql = "AND 1=1 ";
        if(name != null && !"".equals(name)){
            whereSql += "AND enterprise_name LIKE '%" + name + "%'";
        }else if(lawType != null && !"".equals(lawType)) {
            whereSql += "AND source = '" + lawType + "' ";
        }
        whereSql += "GROUP BY DATE_FORMAT(t.`event_time`,'%m')";
        List<Object[]> list = getDAO().queryNativeSQL("SELECT DATE_FORMAT(t.`event_time`,'%m')AS MONTH," +
                "IFNULL((SELECT COUNT(*) AS b\n" +
                "FROM hw_dispatch_task t2 \n" +
                "WHERE DATE_FORMAT(t2.event_time,'%Y') = '"+lastYear+"' \n" +
                "AND DATE_FORMAT(t2.event_time,'%m') = DATE_FORMAT(t.`event_time`,'%m') \n" +
                "GROUP BY DATE_FORMAT(t.`event_time`,'%Y-%m')),0) AS s,\n" +
                "IFNULL((SELECT COUNT(*) AS b\n" +
                "FROM hw_dispatch_task t2 \n" +
                "WHERE DATE_FORMAT(t2.event_time,'%Y') = '"+currentYear+"' \n" +
                "AND DATE_FORMAT(t2.event_time,'%m') = DATE_FORMAT(t.`event_time`,'%m') \n" +
                "GROUP BY DATE_FORMAT(t.`event_time`,'%Y-%m')),0) AS c\n" +
                "FROM hw_dispatch_task t\n" +
                " WHERE DATE_FORMAT(t.`event_time`,'%m')>= '"+strsStart+"' AND DATE_FORMAT(t.`event_time`,'%m')<= '"+strEnd+"'" + whereSql);
        //List<Object[]> lastYearList = getDAO().queryNativeSQL("");
        //List<Object[]> currentYearList = getDAO().queryNativeSQL("");
        return list;
    }

    @Override
    public String updateDispatchTask(DispatchTask dispatchTask) {
        Map<String,Object> map = EntityUtil.getUpdateMap(dispatchTask);
        return String.valueOf(dispathTaskDAO.executeJPQL(String.valueOf(map.get("upStr")),(Map<String, Object>)map.get("valMap")));
    }

    /**
     * 执法同期对比查询列表
     * @param params
     * @param paging
     * @return
     */
    @Override
    public QueryResult<DispatchTask> lawRatiogrid(Map<String, String> params, Paging paging) {

        QueryResult<DispatchTask> result = new QueryResult<DispatchTask>();
        List<DispatchTask> rows = new ArrayList<DispatchTask>();

        //分页条件
        int startIndex = paging.getStartIndex();
        int endIndex =  paging.getPageSize();

        StringBuilder whereSql = new StringBuilder(" where 1=1 ");
        String firstTime = params.get("firstTime");
        firstTime=firstTime.substring(0,7);
        if (StringUtils.isNotBlank(firstTime)) {
            whereSql.append(" and DATE_FORMAT(t.event_time, '%Y-%m') = '").append(firstTime).append("'");
        }
//        if(StringUtils.isNotBlank(params.get("lastStartTime")) || StringUtils.isNotBlank(params.get("lastEndTime"))){
//            whereSql.append("OR (t.event_time >= '").append(params.get("lastStartTime")).append("' and t.event_time <= '").append(params.get("lastEndTime")+"')");
//        }

        String countSql = "select count(*) from HW_DISPATCH_TASK t" +whereSql.toString();
        String querySql = "select t.id,t.event_time,t.enterprise_name,t.source,t.block_name,t.case_reason,t.sender_name from HW_DISPATCH_TASK t " +whereSql.toString()+"limit " + startIndex+","+endIndex;

        long total = dispathTaskDAO.getCount(countSql);
        List<Object[]> list = dispathTaskDAO.queryNativeSQL(querySql);

        if (list != null && list.size() > 0) {
            DispatchTask data = null;
            for (Object[] lawValue : list) {
                data = new DispatchTask();
                data.setId(String.valueOf(lawValue[0])); //id
                //事件时间eventTime
                Date date = null;
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");

                try {
                    date = sdf.parse(String.valueOf(lawValue[1]));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                data.setEventTime(date);
                //企业名称
                data.setEnterpriseName(lawValue[2]==null ? "" : String.valueOf(lawValue[2]));
                //信息来源
                data.setSource(lawValue[3]==null ? "" : String.valueOf(lawValue[3]));
                //所属网格

                data.setBlockName(lawValue[4]==null ? "" : String.valueOf(lawValue[4]));
                //原因
                data.setReason(lawValue[5]==null ? "" : String.valueOf(lawValue[5]));
                //发送人
                data.setSenderName(lawValue[6]==null ? "" : String.valueOf(lawValue[6]));
                rows.add(data);
            }
        }

        result.setRows(rows);
        result.setTotal(total);
        return result;
    }
}