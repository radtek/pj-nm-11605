package com.harmonywisdom.dshbcbp.port.service;

import com.harmonywisdom.dshbcbp.port.bean.WaterPortHistory;
import com.harmonywisdom.framework.service.IBaseService;

import java.util.List;

public interface WaterPortHistoryService extends IBaseService<WaterPortHistory, String> {
    public void saveWaterPortHistoryDataList();
}