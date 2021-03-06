package com.harmonywisdom.dshbcbp.common.dict.bean;

import java.util.HashMap;

/**
 * Created by hotleave on 15-3-9.
 */
public class DictBean extends HashMap<String, String> implements Comparable<DictBean> {
    public static final String CODE = "code";
    public static final String NAME = "name";
    public static final String PARENTCODE = "parentCode";
    public static final String ICON = "icon";
    public static final String ICONOPEN = "iconOpen";
    public static final String ICONCLOSE = "iconClose";

    private double serial;

    public String getCode() {
        return get(CODE);
    }

    public void setCode(String code) {
        put(CODE, code);
    }

    public String getName() {
        return get(NAME);
    }

    public void setName(String name) {
        put(NAME, name);
    }

    public String getParentCode() {
        return get(PARENTCODE);
    }

    public void setParentCode(String parentCode) {
        put(PARENTCODE, parentCode);
    }

    public String getIcon() {
        return get(ICON);
    }

    public void setIcon(String icon) {
        put(ICON, icon);
    }

    public String getIconOpen() {
        return get(ICONOPEN);
    }

    public void setIconOpen(String iconOpen) {
        put(ICONOPEN, iconOpen);
    }

    public String getIconClose() {
        return get(ICONCLOSE);
    }

    public void setIconClose(String iconClose) {
        put(ICONCLOSE, iconClose);
    }

    public double getSerial() {
        return serial;
    }

    public void setSerial(double serial) {
        this.serial = serial;
    }

    @Override
    public int compareTo(DictBean o) {
        double target = o.getSerial();
        return serial > target ? 1 : (serial < target ? -1 : 0);
    }
}
