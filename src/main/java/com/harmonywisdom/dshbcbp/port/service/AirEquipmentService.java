package com.harmonywisdom.dshbcbp.port.service;


import com.harmonywisdom.dshbcbp.port.bean.AirEquipment;
import com.harmonywisdom.dshbcbp.utils.ZNodeDTO;
import com.harmonywisdom.framework.service.IBaseService;

import java.util.List;


public interface AirEquipmentService extends IBaseService<AirEquipment, String> {


    /**
     * 根据文本区查询空气质量
     * @param searchText
     * @return
     */
    List<ZNodeDTO> searchNode(String searchText);

    List<AirEquipment> findByIds(String...ids);

    /**
     * 一张图圈选空气质量到地图
     * @param radius
     * @param longitude
     * @param latitude
     * @return
     */
    List<AirEquipment> circleQueryAirs(String radius, String longitude, String latitude);
}