package com.harmonywisdom.dshbcbp.dispatch.dao;

import com.harmonywisdom.dshbcbp.dispatch.bean.DispatchTask;
import com.harmonywisdom.framework.dao.DefaultDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DispatchTaskDAO extends DefaultDAO<DispatchTask, String> {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void test(){
        String sql="select * from AQIDataPublishLive";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
        System.out.println(maps);
    }

    /**
     * 求总数
     * @param countSql
     * @return
     */
    public long getCount(String countSql) {
        long count = 0;
        List<Object> list = this.queryNativeSQL(countSql);
        if (list != null && list.size() > 0) {
            count = Long.parseLong(String.valueOf(list.get(0)));
        }
        return count;

    }
}