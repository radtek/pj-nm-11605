package com.harmonywisdom.dshbcbp.office.service.impl;

import com.harmonywisdom.dshbcbp.office.bean.MeetingNotice;
import com.harmonywisdom.dshbcbp.office.dao.MeetingNoticeDAO;
import com.harmonywisdom.dshbcbp.office.service.MeetingNoticeService;
import com.harmonywisdom.framework.dao.BaseDAO;
import com.harmonywisdom.framework.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("meetingNoticeService")
public class MeetingNoticeServiceImpl extends BaseService<MeetingNotice, String> implements MeetingNoticeService {
    @Autowired
    private MeetingNoticeDAO meetingNoticeDAO;

    @Override
    protected BaseDAO<MeetingNotice, String> getDAO() {
        return meetingNoticeDAO;
    }

    @Override
    public void updateMeeting(String pesonIds, String pesonNames,String id) {
        meetingNoticeDAO.executeJPQL("update MeetingNotice set personIds=?,personNames=? where id=?",pesonIds,pesonNames,id);
    }

    @Override
    public void updateMeetingIsSms(String id) {
        meetingNoticeDAO.executeJPQL("update MeetingNotice set isSms=1 where id=?",id);

    }


}